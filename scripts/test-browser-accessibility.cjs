const fs = require("node:fs");
const puppeteer = require("puppeteer-core");

const BASE = process.env.BASE || "https://jhb-curtain-cleaning-greenfield.vercel.app";
const CHROME_PATH = process.env.CHROME_PATH;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function axeAudit(page, route) {
  await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
  const result = await page.evaluate(async () => {
    const report = await window.axe.run(document, {
      resultTypes: ["violations"],
    });
    return report.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.map((n) => n.target),
    }));
  });
  const blocking = result.filter((v) => v.impact === "critical" || v.impact === "serious");
  assert(!blocking.length, `${route} has serious/critical axe violations: ${JSON.stringify(blocking)}`);
  console.log(`PASS axe ${route}: no serious/critical violations`);
}

async function proveAnalyticsStart(browser, route, expectedEvent) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle2" });
  await new Promise((resolve) => setTimeout(resolve, 300));
  const events = await page.evaluate(() => (window.dataLayer || []).map((item) => {
    try { return Array.from(item); } catch { return item; }
  }));
  const hasExpected = events.some((item) => Array.isArray(item) && item[0] === "event" && item[1] === expectedEvent);
  const manualPageViews = events.filter((item) => Array.isArray(item) && item[0] === "event" && item[1] === "page_view");
  assert(hasExpected, `${route} did not queue direct-load ${expectedEvent}: ${JSON.stringify(events)}`);
  assert(manualPageViews.length === 0, `${route} emitted manual page_view event(s): ${JSON.stringify(manualPageViews)}`);
  console.log(`PASS analytics ${route}: ${expectedEvent} queued on direct load; no manual page_view event`);
  await page.close();
}

async function overlap(page, targetSelector) {
  return page.evaluate((selector) => {
    const target = document.querySelector(selector);
    const sticky = document.querySelector(".mobile-cta");
    if (!target) throw new Error(`Missing target ${selector}`);
    if (!sticky) throw new Error("Missing .mobile-cta");
    target.scrollIntoView({ block: "center", inline: "nearest" });
    const a = target.getBoundingClientRect();
    const b = sticky.getBoundingClientRect();
    const intersects = a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    const style = getComputedStyle(sticky);
    return {
      intersects,
      target: { top: a.top, bottom: a.bottom, left: a.left, right: a.right },
      sticky: { top: b.top, bottom: b.bottom, left: b.left, right: b.right },
      stickyPosition: style.position,
      viewportHeight: innerHeight,
    };
  }, targetSelector);
}

async function clickContinue(page) {
  const clicked = await page.evaluate(() => {
    const button = [...document.querySelectorAll("button")].find((b) => b.textContent?.trim() === "Continue");
    if (!button) return false;
    button.click();
    return true;
  });
  assert(clicked, "Residential wizard Continue button missing");
  await new Promise((resolve) => setTimeout(resolve, 100));
}

async function proveResidentialMobile(browser) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true });
  await page.goto(`${BASE}/quote`, { waitUntil: "networkidle2" });
  await axeAudit(page, "/quote");

  await page.click(".choice");
  await clickContinue(page);
  await page.click(".choice");
  await clickContinue(page);
  await page.type("textarea", "Synthetic accessibility check");
  await clickContinue(page);
  await clickContinue(page);
  await page.type("input", "Roodepoort");
  await clickContinue(page);
  const contactInputs = await page.$$("input");
  assert(contactInputs.length >= 3, "Residential contact inputs missing");
  await contactInputs[0].type("Accessibility Check");
  await contactInputs[1].type("+27750119200");
  await contactInputs[2].type("info@jhbcurtaincleaning.co.za");
  await clickContinue(page);

  const geometry = await overlap(page, ".consent-box .checkbox");
  assert(!geometry.intersects, `Residential consent is obstructed by sticky CTA: ${JSON.stringify(geometry)}`);
  assert(geometry.stickyPosition === "fixed", "Expected mobile CTA to be fixed at mobile viewport");
  console.log("PASS mobile /quote: consent remains unobstructed by sticky CTA");
  await page.close();
}

async function proveCommercialMobile(browser) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true });
  await page.goto(`${BASE}/commercial-assessment`, { waitUntil: "networkidle2" });
  await axeAudit(page, "/commercial-assessment");
  const geometry = await overlap(page, ".consent-box .checkbox");
  assert(!geometry.intersects, `Commercial consent is obstructed by sticky CTA: ${JSON.stringify(geometry)}`);
  console.log("PASS mobile /commercial-assessment: consent remains unobstructed by sticky CTA");
  await page.close();
}

async function proveKeyboard(browser, route) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle2" });

  const visited = [];
  for (let i = 0; i < 18; i += 1) {
    await page.keyboard.press("Tab");
    const state = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return { body: true };
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return {
        body: false,
        tag: el.tagName,
        text: (el.textContent || el.getAttribute("aria-label") || el.getAttribute("name") || "").trim().slice(0, 80),
        visible: rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none",
        outline: style.outlineStyle,
        boxShadow: style.boxShadow,
      };
    });
    assert(!state.body, `${route} keyboard traversal lost focus to body at Tab ${i + 1}`);
    assert(state.visible, `${route} focused a non-visible element at Tab ${i + 1}: ${JSON.stringify(state)}`);
    const hasIndicator = state.outline !== "none" || (state.boxShadow && state.boxShadow !== "none");
    assert(hasIndicator, `${route} focused element has no visible focus indicator: ${JSON.stringify(state)}`);
    visited.push(`${state.tag}:${state.text}`);
  }
  assert(new Set(visited).size >= 8, `${route} keyboard traversal did not move through enough unique controls`);
  console.log(`PASS keyboard ${route}: ${new Set(visited).size} unique focus targets with visible focus indicators`);
  await page.close();
}

async function main() {
  assert(CHROME_PATH && fs.existsSync(CHROME_PATH), `Chrome executable not found: ${CHROME_PATH || "unset"}`);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  try {
    await proveAnalyticsStart(browser, "/quote", "quote_start");
    await proveAnalyticsStart(browser, "/commercial-assessment", "commercial_start");
    await proveResidentialMobile(browser);
    await proveCommercialMobile(browser);
    await proveKeyboard(browser, "/quote");
    await proveKeyboard(browser, "/commercial-assessment");
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
