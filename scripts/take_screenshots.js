import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUTPUT_DIR = path.resolve('public', 'screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function takeScreenshots() {
  console.log('Launching browser at:', EDGE_PATH);
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  const BASE_URL = 'https://kiber-xavfsizlik-boyicha-sayt.vercel.app/';
  console.log('Navigating to:', BASE_URL);

  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  } catch (err) {
    console.log('Direct navigation warning, fallback to load:', err.message);
    await page.goto(BASE_URL, { waitUntil: 'load', timeout: 30000 });
  }

  // Helper wait
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  await wait(2000);

  // 1. Home Page Hero & Navbar
  console.log('Capturing: 01_home_hero.png');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '01_home_hero.png') });

  // Full page home
  console.log('Capturing: 01_home_full.png');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '01_home_full.png'), fullPage: false });

  // 2. Navigation bar close-up / header
  // Let's capture the navbar area
  const navbar = await page.$('nav');
  if (navbar) {
    console.log('Capturing: 02_navbar.png');
    await navbar.screenshot({ path: path.join(OUTPUT_DIR, '02_navbar.png') });
  }

  // 3. Navigate to Yo'nalishlar (Paths)
  console.log('Navigating to Paths...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText.includes('Yo\'nalishlar') || b.innerText.includes('Yo‘nalishlar') || b.innerText.includes('Paths'));
    if (btn) btn.click();
  });
  await wait(1500);
  console.log('Capturing: 03_paths.png');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03_paths.png') });

  // 4. Navigate to Amaliyot (Practice / Labs)
  console.log('Navigating to Practice...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText.includes('Amaliyot') || b.innerText.includes('Practice'));
    if (btn) btn.click();
  });
  await wait(1500);
  console.log('Capturing: 04_practice.png');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04_practice.png') });

  // 5. Navigate to APK Qo'riqchi
  console.log('Navigating to APK Qo\'riqchi...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText.includes('APK') || b.innerText.includes('Qo\'riqchi'));
    if (btn) btn.click();
  });
  await wait(2000);
  console.log('Capturing: 05_apk_qoriqchi.png');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05_apk_qoriqchi.png') });

  // 6. Navigate to Telefon Xavfsizligi / Security
  console.log('Navigating to Security...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText.includes('Xavfsizlik') || b.innerText.includes('Security'));
    if (btn) btn.click();
  });
  await wait(2000);
  console.log('Capturing: 06_security_phone.png');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '06_security_phone.png') });

  // 7. Navigate to Leaderboard (Reyting)
  console.log('Navigating to Leaderboard...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText.includes('Reyting') || b.innerText.includes('Leaderboard'));
    if (btn) btn.click();
  });
  await wait(1500);
  console.log('Capturing: 07_leaderboard.png');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '07_leaderboard.png') });

  // 8. Navigate to CyberGuard AI (pitch)
  console.log('Navigating to CyberGuard AI...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText.includes('CyberGuard') || b.innerText.includes('AI'));
    if (btn) btn.click();
  });
  await wait(1500);
  console.log('Capturing: 08_cyberguard_ai.png');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '08_cyberguard_ai.png') });

  // 9. Navigate to Lab Room (Click first room in practice)
  console.log('Navigating to Lab Room...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText.includes('Amaliyot') || b.innerText.includes('Practice'));
    if (btn) btn.click();
  });
  await wait(1000);
  await page.evaluate(() => {
    const card = document.querySelector('[class*="cursor-pointer"], button[class*="rounded"]');
    // find room start button or card
    const allBtns = Array.from(document.querySelectorAll('button'));
    const enterBtn = allBtns.find(b => b.innerText.includes('Boshlash') || b.innerText.includes('Kirish') || b.innerText.includes('Start'));
    if (enterBtn) enterBtn.click();
  });
  await wait(1500);
  console.log('Capturing: 09_lab_room.png');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '09_lab_room.png') });

  console.log('All screenshots captured successfully in:', OUTPUT_DIR);
  await browser.close();
}

takeScreenshots().catch(err => {
  console.error('Screenshot error:', err);
  process.exit(1);
});
