const fs = require('fs');
const puppeteer = require('puppeteer');

const url = process.env.SCRAPE_URL;

if (!url) {
  console.error('SCRAPE_URL environment variable is required.');
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: '/usr/bin/chromium'
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  // 👇 Add waitForSelector
  await page.waitForSelector('h1', { timeout: 10000 }).catch(() => console.warn('No <h1> found'));

  const data = await page.evaluate(() => ({
    title: document.title,
    firstHeading: document.querySelector('h1')?.innerText || 'No H1 found'
  }));

  fs.writeFileSync('scraped_data.json', JSON.stringify(data, null, 2));
  await browser.close();
})();
