import puppeteer from 'puppeteer-core';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUTPUT_DIR = path.resolve('public', 'screenshots');

async function captureMoreScreenshots() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const BASE_URL = 'https://kiber-xavfsizlik-boyicha-sayt.vercel.app/';
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  await wait(2000);

  // 10. Login modal/page
  console.log('Capturing Login...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const loginBtn = btns.find(b => b.innerText.includes('Kirish') || b.innerText.includes('Login'));
    if (loginBtn) loginBtn.click();
  });
  await wait(1500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '10_login.png') });

  // 11. Practice / Labs detail
  console.log('Capturing Practice Rooms detail...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const pBtn = btns.find(b => b.innerText.includes('Amaliyot') || b.innerText.includes('Practice'));
    if (pBtn) pBtn.click();
  });
  await wait(1500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '11_practice_rooms.png') });

  // 12. Case Study
  console.log('Capturing Case Study...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const csBtn = btns.find(b => b.innerText.includes('Hodisalar') || b.innerText.includes('Case'));
    if (csBtn) csBtn.click();
  });
  await wait(1500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '12_casestudy.png') });

  // 13. Security Phone Scan action
  console.log('Capturing Phone Security scanning...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const secBtn = btns.find(b => b.innerText.includes('Xavfsizlik') || b.innerText.includes('Security'));
    if (secBtn) secBtn.click();
  });
  await wait(1500);
  // Click scan button inside security page if available
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const scanBtn = btns.find(b => b.innerText.includes('Skaner') || b.innerText.includes('Tekshirish') || b.innerText.includes('Boshlash'));
    if (scanBtn) scanBtn.click();
  });
  await wait(2000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '13_security_scan.png') });

  console.log('Extra screenshots captured!');
  await browser.close();
}

captureMoreScreenshots().catch(console.error);
