#!/usr/bin/env python3
"""Production post-launch crawl audit for JHB Curtain Cleaning.

Uses only the Python standard library so the audit can run in CI without
changing the project dependency graph.
"""

from __future__ import annotations

import concurrent.futures
import html.parser
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from dataclasses import asdict, dataclass
from pathlib import Path

BASE = os.environ.get("BASE", "https://www.jhbcurtaincleaning.co.za").rstrip("/")
REPORT_PATH = Path(os.environ.get("REPORT_PATH", "postlaunch-audit.json"))
TIMEOUT = float(os.environ.get("HTTP_TIMEOUT", "20"))
MAX_WORKERS = int(os.environ.get("MAX_WORKERS", "8"))
USER_AGENT = "JHBCurtainCleaning-PostLaunchAudit/1.0"
BASE_HOST = urllib.parse.urlparse(BASE).netloc.lower()
APEX_HOST = BASE_HOST.removeprefix("www.")
INTERNAL_HOSTS = {BASE_HOST, APEX_HOST, f"www.{APEX_HOST}"}


@dataclass
class FetchResult:
    requested_url: str
    final_url: str
    status: int
    content_type: str
    body: str
    error: str | None = None


@dataclass
class PageResult:
    url: str
    final_url: str
    status: int
    title: str
    description: str
    canonicals: list[str]
    robots: str
    h1_count: int
    jsonld_count: int
    internal_links: list[str]
    warnings: list[str]
    errors: list[str]


class PageParser(html.parser.HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.in_title = False
        self.title_parts: list[str] = []
        self.description = ""
        self.robots = ""
        self.canonicals: list[str] = []
        self.h1_count = 0
        self.anchors: list[str] = []
        self.in_jsonld = False
        self.jsonld_parts: list[str] = []
        self.jsonld_payloads: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {k.lower(): (v or "") for k, v in attrs}
        tag = tag.lower()
        if tag == "title":
            self.in_title = True
        elif tag == "meta":
            name = values.get("name", "").lower()
            if name == "description" and not self.description:
                self.description = values.get("content", "").strip()
            if name in {"robots", "googlebot"} and not self.robots:
                self.robots = values.get("content", "").strip()
        elif tag == "link":
            rel = {part.lower() for part in values.get("rel", "").split()}
            href = values.get("href", "").strip()
            if "canonical" in rel and href:
                self.canonicals.append(href)
        elif tag == "h1":
            self.h1_count += 1
        elif tag == "a":
            href = values.get("href", "").strip()
            if href:
                self.anchors.append(href)
        elif tag == "script" and values.get("type", "").lower() == "application/ld+json":
            self.in_jsonld = True
            self.jsonld_parts = []

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag == "title":
            self.in_title = False
        elif tag == "script" and self.in_jsonld:
            self.in_jsonld = False
            payload = "".join(self.jsonld_parts).strip()
            if payload:
                self.jsonld_payloads.append(payload)
            self.jsonld_parts = []

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title_parts.append(data)
        if self.in_jsonld:
            self.jsonld_parts.append(data)

    @property
    def title(self) -> str:
        return re.sub(r"\s+", " ", "".join(self.title_parts)).strip()


def request(url: str) -> FetchResult:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as response:
            raw = response.read()
            content_type = response.headers.get_content_type()
            charset = response.headers.get_content_charset() or "utf-8"
            try:
                body = raw.decode(charset, errors="replace")
            except LookupError:
                body = raw.decode("utf-8", errors="replace")
            return FetchResult(
                requested_url=url,
                final_url=response.geturl(),
                status=response.status,
                content_type=content_type,
                body=body,
            )
    except urllib.error.HTTPError as exc:
        try:
            body = exc.read().decode("utf-8", errors="replace")
        except Exception:
            body = ""
        return FetchResult(url, exc.geturl(), exc.code, exc.headers.get_content_type(), body, str(exc))
    except Exception as exc:
        return FetchResult(url, url, 0, "", "", f"{type(exc).__name__}: {exc}")


def normalize(url: str) -> str:
    parsed = urllib.parse.urlparse(url)
    scheme = parsed.scheme.lower() or "https"
    host = parsed.netloc.lower()
    path = re.sub(r"/{2,}", "/", parsed.path or "/")
    if path == "/":
        path = ""
    else:
        path = path.rstrip("/")
    return urllib.parse.urlunparse((scheme, host, path, "", "", ""))


def internal_url(href: str, page_url: str) -> str | None:
    href = href.strip()
    if not href or href.startswith(("#", "mailto:", "tel:", "sms:", "javascript:", "data:")):
        return None
    absolute = urllib.parse.urljoin(page_url, href)
    parsed = urllib.parse.urlparse(absolute)
    if parsed.scheme not in {"http", "https"}:
        return None
    if parsed.netloc.lower() not in INTERNAL_HOSTS:
        return None
    return urllib.parse.urlunparse(("https", BASE_HOST, parsed.path or "/", "", parsed.query, ""))


def parse_page(url: str) -> PageResult:
    fetched = request(url)
    errors: list[str] = []
    warnings: list[str] = []
    if fetched.status != 200:
        errors.append(f"HTTP {fetched.status or 'error'}")
        if fetched.error:
            errors.append(fetched.error)
        return PageResult(url, fetched.final_url, fetched.status, "", "", [], "", 0, 0, [], warnings, errors)

    if normalize(fetched.final_url) != normalize(url):
        errors.append(f"unexpected redirect to {fetched.final_url}")

    if "html" not in fetched.content_type:
        errors.append(f"unexpected content type {fetched.content_type}")
        return PageResult(url, fetched.final_url, fetched.status, "", "", [], "", 0, 0, [], warnings, errors)

    parser = PageParser()
    parser.feed(fetched.body)

    if not parser.title:
        errors.append("missing <title>")
    elif len(parser.title) > 70:
        warnings.append(f"long title ({len(parser.title)} chars)")

    if not parser.description:
        errors.append("missing meta description")
    elif len(parser.description) < 70:
        warnings.append(f"short meta description ({len(parser.description)} chars)")
    elif len(parser.description) > 180:
        warnings.append(f"long meta description ({len(parser.description)} chars)")

    if len(parser.canonicals) != 1:
        errors.append(f"expected exactly one canonical, found {len(parser.canonicals)}")
    elif normalize(parser.canonicals[0]) != normalize(url):
        errors.append(f"canonical mismatch: {parser.canonicals[0]}")

    if "noindex" in parser.robots.lower():
        errors.append("page is noindex")

    if parser.h1_count == 0:
        errors.append("missing H1")
    elif parser.h1_count > 1:
        warnings.append(f"multiple H1 elements ({parser.h1_count})")

    for index, payload in enumerate(parser.jsonld_payloads, start=1):
        try:
            json.loads(payload)
        except json.JSONDecodeError as exc:
            errors.append(f"invalid JSON-LD block {index}: {exc.msg}")

    links = sorted({u for href in parser.anchors if (u := internal_url(href, fetched.final_url))})
    return PageResult(
        url=url,
        final_url=fetched.final_url,
        status=fetched.status,
        title=parser.title,
        description=parser.description,
        canonicals=parser.canonicals,
        robots=parser.robots,
        h1_count=parser.h1_count,
        jsonld_count=len(parser.jsonld_payloads),
        internal_links=links,
        warnings=warnings,
        errors=errors,
    )


def fetch_sitemap() -> list[str]:
    result = request(f"{BASE}/sitemap.xml")
    if result.status != 200:
        raise RuntimeError(f"sitemap returned HTTP {result.status}: {result.error or ''}")
    try:
        root = ET.fromstring(result.body)
    except ET.ParseError as exc:
        raise RuntimeError(f"invalid sitemap XML: {exc}") from exc
    urls: list[str] = []
    for elem in root.iter():
        if elem.tag.endswith("loc") and elem.text:
            candidate = elem.text.strip()
            if urllib.parse.urlparse(candidate).netloc.lower() == BASE_HOST:
                urls.append(candidate)
    if not urls:
        raise RuntimeError("sitemap contains no live-domain URLs")
    return sorted(dict.fromkeys(urls))


def check_robots() -> tuple[list[str], list[str], dict[str, object]]:
    errors: list[str] = []
    warnings: list[str] = []
    url = f"{BASE}/robots.txt"
    result = request(url)
    if result.status != 200:
        errors.append(f"robots.txt returned HTTP {result.status}")
    text = result.body
    if re.search(r"(?im)^\s*disallow\s*:\s*/\s*$", text):
        errors.append("robots.txt globally disallows crawling")
    expected_sitemap = f"{BASE}/sitemap.xml"
    if expected_sitemap.lower() not in text.lower():
        warnings.append(f"robots.txt does not reference {expected_sitemap}")
    return errors, warnings, {"url": url, "status": result.status, "body": text}


def check_link(url: str) -> tuple[str, int, str, str | None]:
    result = request(url)
    return url, result.status, result.final_url, result.error


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    robots_errors, robots_warnings, robots = check_robots()
    errors.extend(robots_errors)
    warnings.extend(robots_warnings)

    try:
        sitemap_urls = fetch_sitemap()
    except Exception as exc:
        report = {"base": BASE, "errors": [str(exc), *errors], "warnings": warnings}
        REPORT_PATH.write_text(json.dumps(report, indent=2), encoding="utf-8")
        print(json.dumps(report, indent=2))
        return 1

    print(f"Auditing {len(sitemap_urls)} sitemap URLs on {BASE}")
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_WORKERS) as pool:
        page_results = list(pool.map(parse_page, sitemap_urls))

    all_internal_links: set[str] = set()
    for page in page_results:
        all_internal_links.update(page.internal_links)
        for message in page.errors:
            errors.append(f"{page.url}: {message}")
        for message in page.warnings:
            warnings.append(f"{page.url}: {message}")

    print(f"Checking {len(all_internal_links)} unique internal links")
    link_results: list[dict[str, object]] = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_WORKERS) as pool:
        for url, status, final_url, error in pool.map(check_link, sorted(all_internal_links)):
            link_results.append({"url": url, "status": status, "final_url": final_url, "error": error})
            if status == 0 or status >= 400:
                errors.append(f"broken internal link {url}: HTTP {status or 'error'} {error or ''}".strip())

    required_routes = {
        normalize(f"{BASE}/"),
        normalize(f"{BASE}/quote"),
        normalize(f"{BASE}/commercial-assessment"),
        normalize(f"{BASE}/services"),
        normalize(f"{BASE}/services/curtain-cleaning"),
        normalize(f"{BASE}/commercial/hotels-hospitality"),
        normalize(f"{BASE}/areas/johannesburg"),
        normalize(f"{BASE}/privacy"),
    }
    sitemap_normalized = {normalize(url) for url in sitemap_urls}
    missing_required = sorted(required_routes - sitemap_normalized)
    if missing_required:
        errors.append(f"required routes missing from sitemap: {missing_required}")

    report = {
        "base": BASE,
        "summary": {
            "sitemap_urls": len(sitemap_urls),
            "internal_links_checked": len(link_results),
            "errors": len(errors),
            "warnings": len(warnings),
        },
        "errors": errors,
        "warnings": warnings,
        "robots": robots,
        "pages": [asdict(page) for page in page_results],
        "links": link_results,
    }
    REPORT_PATH.write_text(json.dumps(report, indent=2), encoding="utf-8")

    for page in page_results:
        marker = "PASS" if not page.errors else "FAIL"
        print(f"{marker} {page.url} | title={len(page.title)} desc={len(page.description)} h1={page.h1_count} jsonld={page.jsonld_count}")
    for warning in warnings:
        print(f"WARN {warning}")
    for error in errors:
        print(f"ERROR {error}", file=sys.stderr)
    print(json.dumps(report["summary"], indent=2))
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
