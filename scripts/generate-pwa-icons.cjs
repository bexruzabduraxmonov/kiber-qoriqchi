const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  
  const svgPath = path.resolve(__dirname, '../public/logo-cybershield-badge.svg');
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  
  const sizes = [
    { name: 'icon-192.png', size: 192, pad: 0 },
    { name: 'icon-512.png', size: 512, pad: 0 },
    { name: 'icon-maskable-192.png', size: 192, pad: 20 },
    { name: 'icon-maskable-512.png', size: 512, pad: 50 },
    { name: 'apple-touch-icon.png', size: 180, pad: 0 }
  ];

  for (const item of sizes) {
    const fullSize = item.size;
    const innerSize = item.size - (item.pad * 2);
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: ${fullSize}px;
      height: ${fullSize}px;
      background: #0d151c;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    svg {
      width: ${innerSize}px;
      height: ${innerSize}px;
    }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>`;
    await page.setViewport({ width: fullSize, height: fullSize, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: 'load' });
    const outPath = path.resolve(__dirname, '../public', item.name);
    await page.screenshot({ path: outPath, omitBackground: false });
    console.log('Generated:', item.name);
  }

  await browser.close();
  console.log('All icons generated successfully!');
}

generateIcons().catch(err => {
  console.error(err);
  process.exit(1);
});
