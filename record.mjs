// Records the homepage product-demo clips for EN and TH.
// - Logs in as the demo student (Emma), saves auth, then records each flow in a
//   fresh context with the locale cookie pre-set (so SSR renders the right
//   language from frame 1 -- no English flash in the Thai videos).
// - Adds a soft cursor so clicks/scroll read as a real walkthrough.
// - Converts Playwright's webm to web-friendly mp4 and regenerates a matching
//   poster (first settled frame) so there's no stale amber flash before play.
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import ffmpeg from "ffmpeg-static";
import fs from "node:fs";
import path from "node:path";

const BASE = "http://localhost:3000";
const OUT = path.resolve("public/demo");
const TMP = path.resolve("C:/tmp/rec");
const SIZE = { width: 1280, height: 800 };
const PW = "SpotlightDemo123!";
const EMAIL = "demo.student@spotlightsapp.com";

fs.mkdirSync(TMP, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

// --- 1) Login once, capture the authenticated storage state ---------------
const loginCtx = await browser.newContext({ viewport: SIZE });
const lp = await loginCtx.newPage();
await lp.goto(`${BASE}/login`, { waitUntil: "domcontentloaded" });
await lp.fill('input[type="email"]', EMAIL);
await lp.fill('input[type="password"]', PW);
await lp.click('button[type="submit"]');
await lp.waitForURL(/\/(dashboard|jobs|explore)?/, { timeout: 15000 }).catch(() => {});
await lp.waitForTimeout(2500);
// Warm server route + data caches so recorded pages paint quickly (less blank lead).
for (const u of ["/dashboard", "/explore", "/jobs/new-grad-swe-google", "/events", "/companies/google", "/inbox"]) {
  await lp.goto(`${BASE}${u}`, { waitUntil: "domcontentloaded" }).catch(() => {});
  await lp.waitForTimeout(400);
}
const storageState = await loginCtx.storageState();
await loginCtx.close();

// Soft cursor injected into every recorded page.
const CURSOR_INIT = `
  (() => {
    const c = document.createElement('div');
    c.id = '__cur';
    Object.assign(c.style, {
      position: 'fixed', top: '0', left: '0', width: '22px', height: '22px',
      borderRadius: '50%', background: 'rgba(58,120,194,0.35)',
      border: '2px solid rgba(58,120,194,0.9)', zIndex: '2147483647',
      pointerEvents: 'none', transform: 'translate(-50%,-50%)',
      transition: 'left .55s cubic-bezier(.22,.61,.36,1), top .55s cubic-bezier(.22,.61,.36,1)',
      left: '640px', top: '420px',
    });
    const add = () => document.body && document.body.appendChild(c);
    if (document.body) add(); else addEventListener('DOMContentLoaded', add);
    window.__moveCur = (x, y) => { c.style.left = x + 'px'; c.style.top = y + 'px'; };
  })();
`;

function sleep(p, ms) { return p.waitForTimeout(ms); }

async function moveTo(page, selector, nth = 0) {
  const el = page.locator(selector).nth(nth);
  await el.scrollIntoViewIfNeeded().catch(() => {});
  const box = await el.boundingBox();
  if (!box) return null;
  const x = Math.round(box.x + box.width / 2);
  const y = Math.round(box.y + Math.min(box.height / 2, 40));
  await page.evaluate(([x, y]) => window.__moveCur?.(x, y), [x, y]);
  await page.mouse.move(x, y);
  await sleep(page, 650);
  return el;
}

async function smoothScroll(page, to, steps = 24) {
  for (let i = 1; i <= steps; i++) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "auto" }), Math.round((to * i) / steps));
    await sleep(page, 28);
  }
}

// --- 2) Flow definitions ---------------------------------------------------
const FLOWS = {
  dashboard: async (p) => {
    await p.goto(`${BASE}/dashboard`, { waitUntil: "domcontentloaded" });
    await sleep(p, 1200);
    await smoothScroll(p, 260);
    await sleep(p, 700);
    await moveTo(p, "a:has-text('See all'), a[href*='/explore']");
    await smoothScroll(p, 0, 12);
    await sleep(p, 900);
  },
  jobs: async (p) => {
    // Consolidated: browse/search roles, then open the full role detail + apply.
    await p.goto(`${BASE}/explore`, { waitUntil: "domcontentloaded" });
    await sleep(p, 1100);
    await smoothScroll(p, 160);
    await moveTo(p, "input");
    await sleep(p, 500);
    const href = await p.locator("main a[href^='/jobs/']").first().getAttribute("href").catch(() => null);
    await moveTo(p, "main a[href^='/jobs/']", 0);
    await sleep(p, 700);
    // The card's absolute Link overlay doesn't navigate under automation; go directly.
    await p.goto(`${BASE}${href || "/jobs/new-grad-swe-google"}`, { waitUntil: "domcontentloaded" });
    await sleep(p, 1300);
    await smoothScroll(p, 320);
    await sleep(p, 700);
    await moveTo(p, "button:has-text('Apply'), button:has-text('สมัคร')");
    await sleep(p, 1000);
  },
  events: async (p) => {
    await p.goto(`${BASE}/events`, { waitUntil: "domcontentloaded" });
    await sleep(p, 1100);
    await smoothScroll(p, 220);
    await sleep(p, 600);
    const card = await moveTo(p, "main a[href^='/events/']", 0);
    await sleep(p, 500);
    if (card) {
      await card.click().catch(() => {});
      await p.waitForURL("**/events/**", { timeout: 12000 }).catch(() => {});
      await sleep(p, 1300);
      await smoothScroll(p, 300);
      await sleep(p, 700);
      await moveTo(p, "button:has-text('Register'), button:has-text('ลงทะเบียน')");
      await sleep(p, 900);
    }
  },
  company: async (p) => {
    await p.goto(`${BASE}/companies/google`, { waitUntil: "domcontentloaded" });
    await sleep(p, 1200);
    await smoothScroll(p, 320);
    await sleep(p, 700);
    await moveTo(p, "main a[href^='/jobs/']", 0);
    await sleep(p, 900);
  },
  inbox: async (p) => {
    await p.goto(`${BASE}/inbox`, { waitUntil: "domcontentloaded" });
    await sleep(p, 1400);
    // Target the conversation list item by name (not the topbar avatar button,
    // whose accessible name is "Open profile menu").
    const conv = p.getByRole("button", { name: /Jordan/i }).first();
    const box = await conv.boundingBox().catch(() => null);
    if (box) {
      await p.evaluate(([x, y]) => window.__moveCur?.(x, y), [Math.round(box.x + box.width / 2), Math.round(box.y + box.height / 2)]);
      await sleep(p, 650);
      await conv.click().catch(() => {});
      await sleep(p, 1400);
    }
    const composer = p.locator("textarea, input[type='text']").last();
    const cbox = await composer.boundingBox().catch(() => null);
    if (cbox) {
      await p.evaluate(([x, y]) => window.__moveCur?.(x, y), [Math.round(cbox.x + 60), Math.round(cbox.y + cbox.height / 2)]);
      await composer.click().catch(() => {});
      await composer.type("Thanks, looking forward to it!", { delay: 55 }).catch(() => {});
      await sleep(p, 1100);
    }
  },
};

function ff(args) { execFileSync(ffmpeg, args, { stdio: "ignore" }); }

// First "content" second of a clip: blank/white frames encode tiny (~7KB),
// real content frames are 60KB+. Used to trim the blank loading lead.
function detectStart(src, max = 12) {
  const probe = path.join(TMP, "probe.png");
  for (let t = 0; t <= max; t++) {
    try {
      ff(["-y", "-ss", String(t), "-i", src, "-frames:v", "1", probe]);
      if (fs.statSync(probe).size > 60000) return Math.max(0, t - 1);
    } catch { /* keep scanning */ }
  }
  return 0;
}

const CAP = { jobs: 15, inbox: 13 }; // seconds; others use default

async function record(locale, name, fn) {
  const ctx = await browser.newContext({
    viewport: SIZE,
    storageState,
    recordVideo: { dir: TMP, size: SIZE },
    deviceScaleFactor: 1,
  });
  await ctx.addCookies([{ name: "spotlight.locale", value: locale, domain: "localhost", path: "/" }]);
  await ctx.addInitScript(CURSOR_INIT);
  const page = await ctx.newPage();
  try { await fn(page); } catch (e) { console.log(`  ! ${name} ${locale}:`, e.message); }
  const vpath = await page.video().path();
  await ctx.close(); // finalizes the webm

  const suffix = locale === "th" ? "-th" : "";
  const mp4 = path.join(OUT, `${name}${suffix}.mp4`);
  const png = path.join(OUT, `${name}${suffix}.png`);
  const start = detectStart(vpath);
  const dur = CAP[name] ?? 11;
  // Trim the blank loading lead so the clip opens on real content.
  ff(["-y", "-ss", String(start), "-i", vpath, "-t", String(dur),
      "-movflags", "+faststart", "-pix_fmt", "yuv420p",
      "-vf", "scale=1280:800", "-c:v", "libx264", "-crf", "23", mp4]);
  // Poster = a settled content frame (images decoded): no blank/amber flash.
  ff(["-y", "-ss", "1.4", "-i", mp4, "-frames:v", "1", png]);
  fs.rmSync(vpath, { force: true });
  console.log(`  ok ${name}${suffix}.mp4 + .png (lead ${start}s, ${dur}s)`);
}

// --- 3) Record every flow in both locales ---------------------------------
for (const locale of ["en", "th"]) {
  console.log(`== ${locale} ==`);
  for (const [name, fn] of Object.entries(FLOWS)) {
    await record(locale, name, fn);
  }
}

await browser.close();
console.log("done");
