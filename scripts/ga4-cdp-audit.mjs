#!/usr/bin/env node
/**
 * Local GA4 network-dispatch audit for JHB Curtain Cleaning.
 *
 * Connects to an already-running Chrome DevTools Protocol endpoint on
 * http://127.0.0.1:9222, opens an isolated tab, verifies production GA4
 * network dispatch, sends one clearly-labelled synthetic verification event,
 * and closes the tab. No forms are submitted and no PII is generated.
 */

const CDP_BASE = process.env.CDP_BASE || "http://127.0.0.1:9222";
const SITE = "https://www.jhbcurtaincleaning.co.za/";
const EXPECTED_ID = "G-E4ZJQ57W4Y";
const VERIFY_EVENT = "jhb_verification_ping";

function fail(message) {
  console.error(`FAIL ${message}`);
  process.exit(1);
}

async function httpJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.json();
}

async function main() {
  if (typeof WebSocket === "undefined") {
    fail("This script requires a Node version with the global WebSocket API (Node 22+ recommended). ");
  }

  try {
    await httpJson(`${CDP_BASE}/json/version`);
  } catch (error) {
    fail(`Chrome CDP is not reachable at ${CDP_BASE}: ${error.message}`);
  }
  console.log(`PASS Chrome CDP reachable at ${CDP_BASE}`);

  let target;
  try {
    target = await httpJson(`${CDP_BASE}/json/new?about:blank`, { method: "PUT" });
  } catch (error) {
    fail(`Could not create an isolated Chrome audit tab: ${error.message}`);
  }

  const targetId = target.id;
  const wsUrl = target.webSocketDebuggerUrl;
  if (!targetId || !wsUrl) fail("CDP target did not return an id/webSocketDebuggerUrl");

  let ws;
  let commandId = 0;
  const pending = new Map();
  const requests = [];

  const closeTarget = async () => {
    try { await fetch(`${CDP_BASE}/json/close/${encodeURIComponent(targetId)}`); } catch {}
  };

  try {
    ws = new WebSocket(wsUrl);
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("CDP WebSocket open timeout")), 10000);
      ws.addEventListener("open", () => { clearTimeout(timer); resolve(); }, { once: true });
      ws.addEventListener("error", () => { clearTimeout(timer); reject(new Error("CDP WebSocket error")); }, { once: true });
    });

    ws.addEventListener("message", (event) => {
      let msg;
      try { msg = JSON.parse(event.data); } catch { return; }
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message || "CDP command failed"));
        else resolve(msg.result || {});
        return;
      }
      if (msg.method === "Network.requestWillBeSent") {
        const url = msg.params?.request?.url || "";
        try {
          const parsed = new URL(url);
          const host = parsed.hostname.toLowerCase();
          if (host.endsWith("google-analytics.com") || host === "analytics.google.com") {
            requests.push({
              host,
              path: parsed.pathname,
              tid: parsed.searchParams.get("tid"),
              eventName: parsed.searchParams.get("en"),
            });
          }
        } catch {}
      }
    });

    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const id = ++commandId;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
      setTimeout(() => {
        if (pending.has(id)) {
          pending.delete(id);
          reject(new Error(`CDP timeout: ${method}`));
        }
      }, 15000);
    });

    await send("Network.enable");
    await send("Page.enable");
    await send("Runtime.enable");

    const url = `${SITE}?verification_source=local_ga4_cdp_audit`;
    await send("Page.navigate", { url });
    await new Promise((resolve) => setTimeout(resolve, 7000));

    const pageView = requests.find((r) => r.tid === EXPECTED_ID && r.eventName === "page_view");
    const anyExpected = requests.find((r) => r.tid === EXPECTED_ID);
    if (!anyExpected) {
      fail(`No GA4 collection request observed for expected Measurement ID ${EXPECTED_ID}`);
    }
    console.log(`PASS production dispatched GA4 traffic for ${EXPECTED_ID}`);
    if (pageView) console.log("PASS GA4 page_view network dispatch observed");
    else console.log("WARN expected GA4 ID dispatched, but no explicit page_view request was observed in the capture window");

    const evalResult = await send("Runtime.evaluate", {
      expression: `(() => {
        if (typeof window.gtag !== 'function') return {ok:false, reason:'window.gtag unavailable'};
        window.gtag('event', '${VERIFY_EVENT}', {
          debug_mode: true,
          verification_source: 'local_cdp_audit',
          non_interaction: true
        });
        return {ok:true};
      })()`,
      returnByValue: true,
      awaitPromise: true,
    });
    const resultValue = evalResult?.result?.value;
    if (!resultValue?.ok) fail(`Could not dispatch verification event: ${resultValue?.reason || "unknown"}`);

    await new Promise((resolve) => setTimeout(resolve, 5000));
    const ping = requests.find((r) => r.tid === EXPECTED_ID && r.eventName === VERIFY_EVENT);
    if (!ping) fail(`Verification event ${VERIFY_EVENT} was not observed on the GA4 collection network path`);

    console.log(`PASS synthetic ${VERIFY_EVENT} dispatched to ${EXPECTED_ID}`);
    console.log("PASS no lead form or CRM submission was performed");
    console.log("PASS GA4 local network-dispatch audit completed");
  } finally {
    try { ws?.close(); } catch {}
    await closeTarget();
  }
}

main().catch((error) => {
  console.error(`FAIL ${error.message}`);
  process.exitCode = 1;
});
