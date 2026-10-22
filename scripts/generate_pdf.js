import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const htmlFile = path.resolve('public', 'prezentatsiya.html');
const outPdf = path.resolve('KiberQoriqchi_Prezentatsiya.pdf');
const publicPdf = path.resolve('public', 'KiberQoriqchi_Prezentatsiya.pdf');

async function generatePDF() {
  console.log('Generating PDF from:', htmlFile);
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('file:///' + htmlFile.replace(/\\/g, '/'), { waitUntil: 'networkidle2', timeout: 30000 });

  await page.pdf({
    path: outPdf,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
  });

  await browser.close();
  fs.copyFileSync(outPdf, publicPdf);
  console.log('✅ Generated PDF in root:', outPdf);
  console.log('✅ Copied PDF to public folder:', publicPdf);
}

generatePDF().catch(err => {
  console.error('❌ Error generating PDF:', err);
  process.exit(1);
});
