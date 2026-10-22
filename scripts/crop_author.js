import puppeteer from 'puppeteer-core';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const slidePath = path.resolve('public', 'screenshots', 'author_slide.png');
const outPortrait = path.resolve('public', 'screenshots', 'author_portrait.png');

async function cropAuthor() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 558 });
  await page.setContent(`
    <html>
      <body style="margin:0; padding:0; background:transparent;">
        <img id="img" src="file:///${slidePath.replace(/\\/g, '/')}" style="position:absolute; top:0; left:0; width:1024px; height:558px;" />
      </body>
    </html>
  `);

  // Crop author photo area
  // Photo is from x ~ 605, y ~ 20, width ~ 230, height ~ 300
  await page.screenshot({
    path: outPortrait,
    clip: { x: 605, y: 18, width: 230, height: 305 }
  });

  await browser.close();
  console.log('✅ Cropped author portrait saved to:', outPortrait);
}

cropAuthor().catch(console.error);
