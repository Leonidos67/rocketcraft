const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const outDir = path.resolve('public/works/sadu-media/screens');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.25,
  });

  await page.goto('https://www.sadumedia.com/about/', {
    waitUntil: 'domcontentloaded',
    timeout: 90000,
  });
  await page.waitForTimeout(4000);

  // Dismiss cookies if present
  try {
    const accept = page.getByText('Accept', { exact: true }).first();
    if (await accept.isVisible({ timeout: 2000 })) {
      await accept.click();
      await page.waitForTimeout(500);
    }
  } catch (_) {}

  // Let intro animation settle
  await page.waitForTimeout(3500);

  await page.screenshot({ path: path.join(outDir, '01-about-hero.png'), type: 'png' });

  const shots = [
    { name: '02-mission.png', y: 0.18 },
    { name: '03-clients.png', y: 0.38 },
    { name: '04-story.png', y: 0.58 },
    { name: '05-cta.png', y: 0.82 },
  ];

  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (const shot of shots) {
    await page.evaluate((top) => window.scrollTo(0, top), Math.floor(height * shot.y));
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(outDir, shot.name), type: 'png' });
  }

  // Homepage hero + works
  await page.goto('https://www.sadumedia.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 90000,
  });
  await page.waitForTimeout(4500);
  try {
    const accept = page.getByText('Accept', { exact: true }).first();
    if (await accept.isVisible({ timeout: 1500 })) await accept.click();
  } catch (_) {}
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(outDir, '00-home-hero.png'), type: 'png' });
  await page.evaluate(() => window.scrollTo(0, Math.floor(document.documentElement.scrollHeight * 0.35)));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(outDir, '06-home-works.png'), type: 'png' });

  await browser.close();
  console.log('ok', fs.readdirSync(outDir));
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
