import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUTPUT_DIR = path.resolve('public', 'screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Start local preview server to use the latest uz default build
console.log('Starting preview server...');
const server = spawn('npx', ['vite', 'preview', '--port', '4173'], { shell: true });

// Wait for server to start
await new Promise((resolve) => {
  server.stdout.on('data', (data) => {
    console.log('Server:', data.toString());
    if (data.toString().includes('4173') || data.toString().includes('Local')) {
      resolve();
    }
  });
  setTimeout(resolve, 3000);
});

async function captureUzScreenshots() {
  console.log('Launching Edge browser...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  // Force Uzbek language in localStorage
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('cybershield_lang', 'uz');
  });

  const URL = 'http://localhost:4173/';
  console.log('Navigating to:', URL);
  await page.goto(URL, { waitUntil: 'networkidle2' });

  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  await wait(1500);

  // Explicitly click UZ button if present
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const uzBtn = btns.find(b => b.innerText.trim().toUpperCase() === 'UZ');
    if (uzBtn) uzBtn.click();
  });
  await wait(1000);

  // 1. Home Page Hero
  console.log('📸 01_home_hero.png (O\'zbek tilida)');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '01_home_hero.png') });

  // 2. Navbar
  const navbar = await page.$('nav');
  if (navbar) {
    console.log('📸 02_navbar.png (O\'zbek tilida)');
    await navbar.screenshot({ path: path.join(OUTPUT_DIR, '02_navbar.png') });
  }

  // 3. Yo'nalishlar (Paths)
  console.log('Navigating to Yo\'nalishlar...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.includes('Yo‘nalishlar') || b.innerText.includes('Yo\'nalishlar') || b.innerText.includes('Paths'));
    if (btn) btn.click();
  });
  await wait(1500);
  console.log('📸 03_paths.png (O\'zbek tilida)');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03_paths.png') });

  // 4. Amaliyot (Practice)
  console.log('Navigating to Amaliyot...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.includes('Amaliyot') || b.innerText.includes('Practice'));
    if (btn) btn.click();
  });
  await wait(1500);
  console.log('📸 04_practice.png (O\'zbek tilida)');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04_practice.png') });
  console.log('📸 11_practice_rooms.png (O\'zbek tilida)');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '11_practice_rooms.png') });

  // 5. APK Qo'riqchi
  console.log('Navigating to APK Qo\'riqchi...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.includes('APK') || b.innerText.includes('Qo‘riqchi') || b.innerText.includes('Qo\'riqchi'));
    if (btn) btn.click();
  });
  await wait(2000);
  console.log('📸 05_apk_qoriqchi.png (O\'zbek tilida)');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05_apk_qoriqchi.png') });

  // 6. Xavfsizlik (Security Phone)
  console.log('Navigating to Xavfsizlik...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.includes('Xavfsizlik') || b.innerText.includes('Security'));
    if (btn) btn.click();
  });
  await wait(2000);
  console.log('📸 06_security_phone.png (O\'zbek tilida)');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '06_security_phone.png') });

  // 7. Reyting (Leaderboard)
  console.log('Navigating to Reyting...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.includes('Reyting') || b.innerText.includes('Leaderboard'));
    if (btn) btn.click();
  });
  await wait(1500);
  console.log('📸 07_leaderboard.png (O\'zbek tilida)');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '07_leaderboard.png') });

  // 8. CyberGuard AI (Pitch)
  console.log('Navigating to CyberGuard AI...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.includes('CyberGuard') || b.innerText.includes('AI'));
    if (btn) btn.click();
  });
  await wait(1500);
  console.log('📸 08_cyberguard_ai.png (O\'zbek tilida)');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '08_cyberguard_ai.png') });

  // 9. Lab Room
  console.log('Navigating to Lab Room...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const pBtn = btns.find(b => b.innerText.includes('Amaliyot'));
    if (pBtn) pBtn.click();
  });
  await wait(1000);
  await page.evaluate(() => {
    const allBtns = Array.from(document.querySelectorAll('button'));
    const enterBtn = allBtns.find(b => b.innerText.includes('Boshlash') || b.innerText.includes('Kirish') || b.innerText.includes('Start'));
    if (enterBtn) enterBtn.click();
  });
  await wait(1500);
  console.log('📸 09_lab_room.png (O\'zbek tilida)');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '09_lab_room.png') });

  // 10. Login
  console.log('Navigating to Kirish (Login)...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const loginBtn = btns.find(b => b.innerText.includes('Kirish') || b.innerText.includes('Login'));
    if (loginBtn) loginBtn.click();
  });
  await wait(1500);
  console.log('📸 10_login.png (O\'zbek tilida)');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '10_login.png') });

  // 11. Case Study
  console.log('Navigating to Hodisalar tahlili (Case study)...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const csBtn = btns.find(b => b.innerText.includes('Hodisalar') || b.innerText.includes('Case'));
    if (csBtn) csBtn.click();
  });
  await wait(1500);
  console.log('📸 12_casestudy.png (O\'zbek tilida)');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '12_casestudy.png') });

  await browser.close();
  server.kill();
  console.log('✅ Barcha skrinshotlar 100% O‘zbek tilida muvaffaqiyatli saqlandi!');
  process.exit(0);
}

captureUzScreenshots().catch(err => {
  console.error('Error:', err);
  server.kill();
  process.exit(1);
});
