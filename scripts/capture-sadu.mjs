const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

(async () => {
  const outDir = path.resolve("public/works/sadu-media/screens");
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  await page.goto("https://www.sadumedia.com/about/", {
    waitUntil: "networkidle",
    timeout: 90000,
  });
  await page.waitForTimeout(2500);

  // Hero / top of about
  await page.screenshot({
    path: path.join(outDir, "01-hero.png"),
    type: "png",
  });

  // Scroll through page and capture key sections
  const scrolls = [
    { name: "02-manifesto", y: 700 },
    { name: "03-standards", y: 1400 },
    { name: "04-ahl-al-fazaa", y: 2100 },
    { name: "05-clients", y: 2800 },
    { name: "06-closing", y: 3600 },
  ];

  for (const s of scrolls) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), s.y);
    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(outDir, `${s.name}.png`),
      type: "png",
    });
  }

  // Full page for poster crop
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(outDir, "full-page.png"),
    fullPage: true,
    type: "png",
  });

  // Also homepage hero for variety
  await page.goto("https://www.sadumedia.com/", {
    waitUntil: "networkidle",
    timeout: 90000,
  });
  await page.waitForTimeout(2500);
  await page.screenshot({
    path: path.join(outDir, "07-home-hero.png"),
    type: "png",
  });
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: "instant" }));
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(outDir, "08-home-works.png"),
    type: "png",
  });

  await browser.close();
  console.log("screenshots done", fs.readdirSync(outDir));
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
