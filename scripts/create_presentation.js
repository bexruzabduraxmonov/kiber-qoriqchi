import pptxgen from 'pptxgenjs';
import path from 'path';
import fs from 'fs';

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9'; // 10 x 5.625 inches
pres.title = 'KiberQoriqchi — Web Platformasi Prezentatsiyasi';
pres.author = 'KiberQoriqchi';
pres.company = 'CyberShield Academy';

// Color Palette: Oq, qora, yashil va kiber-aksentlar
const C = {
  bgLight: 'F8FAFC',
  bgDark: '070E16',
  cardLight: 'FFFFFF',
  cardDark: '0F172A',
  green: '10B981',       // Zumrad yashil
  greenDark: '059669',
  greenBg: 'ECFDF5',
  greenBorder: '6EE7B7',
  cyan: '0EA5E9',
  cyanDark: '0284C7',
  textDark: '0F172A',
  textMuted: '475569',
  textLight: 'F8FAFC',
  textLightMuted: '94A3B8',
  border: 'E2E8F0',
  red: 'EF4444',
  amber: 'F59E0B'
};

const IMG_DIR = path.resolve('public', 'screenshots');
const getImg = (name) => path.join(IMG_DIR, name);

// Helper for Slide Header
function addHeader(slide, num, title, subtitle, isDark = false) {
  // Badge
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 0.35, w: 2.4, h: 0.32, r: 0.15,
    fill: { color: isDark ? '064E3B' : 'ECFDF5' },
    line: { color: C.green, width: 1 }
  });
  slide.addText(`SLAYD ${num} / 12`, {
    x: 0.8, y: 0.35, w: 2.4, h: 0.32,
    fontSize: 9.5, bold: true, color: isDark ? '34D399' : C.greenDark, align: 'center', valign: 'middle'
  });

  // Title
  slide.addText(title, {
    x: 0.8, y: 0.72, w: 8.4, h: 0.5,
    fontSize: 22, bold: true, color: isDark ? C.textLight : C.textDark
  });

  // Subtitle
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.8, y: 1.18, w: 8.4, h: 0.32,
      fontSize: 12, color: isDark ? C.textLightMuted : C.textMuted
    });
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// 1. TITUL SLAYDI (Bosh sahifa haqiqiy rasmi bilan)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgDark };

  // Top accent bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.08,
    fill: { color: C.green }
  });

  // Badge
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 0.6, w: 3.2, h: 0.38, r: 0.15,
    fill: { color: '064E3B' },
    line: { color: C.green, width: 1 }
  });
  s.addText('🛡️ KIBERXAVFSIZLIK AKADEMIYASI', {
    x: 0.8, y: 0.6, w: 3.2, h: 0.38,
    fontSize: 10, bold: true, color: '34D399', align: 'center', valign: 'middle'
  });

  // Main Title
  s.addText('KiberQoriqchi', {
    x: 0.75, y: 1.1, w: 4.8, h: 0.8,
    fontSize: 44, bold: true, color: C.textLight, fontFace: 'Arial Black'
  });

  s.addText('Kiberxavflarni tushunish, amaliy himoyalanish va milliy kiber-madaniyatni shakllantirish platformasi.', {
    x: 0.8, y: 1.95, w: 4.6, h: 0.8,
    fontSize: 13, color: C.textLightMuted, lineSpacingMultiple: 1.2
  });

  // Real Website Badge
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 2.85, w: 4.6, h: 0.85, r: 0.15,
    fill: { color: '0D1A26' },
    line: { color: '1E3A52', width: 1 }
  });
  s.addText([
    { text: 'Rasmiy Web Manzil:\n', options: { fontSize: 10, color: C.textLightMuted, bold: true } },
    { text: 'https://kiber-xavfsizlik-boyicha-sayt.vercel.app/', options: { fontSize: 11, color: C.cyan, bold: true } }
  ], {
    x: 0.95, y: 2.92, w: 4.3, h: 0.7
  });

  // Quick Stats row
  s.addText('✔ 100% O‘zbek tilida   ✔ Jonli Laboratoriyalar   ✔ APK Skaneri', {
    x: 0.8, y: 3.85, w: 4.6, h: 0.35,
    fontSize: 11, bold: true, color: C.green
  });

  // Real Screenshot on Right Side
  const heroImg = getImg('01_home_hero.png');
  if (fs.existsSync(heroImg)) {
    // Border frame around screenshot
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.5, y: 0.7, w: 3.9, h: 4.3, r: 0.15,
      fill: { color: '0D1A26' },
      line: { color: C.green, width: 2 }
    });
    s.addImage({
      path: heroImg,
      x: 5.55, y: 0.75, w: 3.8, h: 4.2
    });
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. LOYIHA HAQIDA (Muammo va Yechim)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '02', 'Loyiha haqida: Muammo va Yechim', 'Nega KiberQoriqchi platformasi yaratildi va u qanday ehtiyojni qoplaydi?');

  // Left: 3 Muammo
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 4.0, h: 3.5, r: 0.15,
    fill: { color: C.cardLight },
    line: { color: 'FCA5A5', width: 1.5 }
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 4.0, h: 0.55, r: 0.15,
    fill: { color: 'FEE2E2' },
    line: { color: 'FEE2E2', width: 0 }
  });
  s.addText('🚨 Kiber muhitdagi 3 ta asosiy muammo', {
    x: 1.0, y: 1.65, w: 3.6, h: 0.45,
    fontSize: 13, bold: true, color: 'DC2626'
  });
  s.addText([
    { text: '1. Fishing va soxta to‘lovlar:\n', options: { fontSize: 12, bold: true, color: C.textDark } },
    { text: 'Fuqarolar soxta havolalar orqali karta pullaridan ayrilmoqda.\n\n', options: { fontSize: 10.5, color: C.textMuted } },
    { text: '2. Zararli Telegram APK fayllari:\n', options: { fontSize: 12, bold: true, color: C.textDark } },
    { text: 'Ijtimoiy tarmoqlarda virusli dasturlar shaxsiy SMS va ma\'lumotlarni o\'g\'irlamoqda.\n\n', options: { fontSize: 10.5, color: C.textMuted } },
    { text: '3. Amaliy ta\'lim yo\'qligi:\n', options: { fontSize: 12, bold: true, color: C.textDark } },
    { text: 'Mavjud manbalar chet tilida yoki faqat quruq nazariyadan iborat.', options: { fontSize: 10.5, color: C.textMuted } }
  ], {
    x: 1.0, y: 2.25, w: 3.6, h: 2.7,
    lineSpacingMultiple: 1.1
  });

  // Right: Bizning Yechim
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.6, w: 4.0, h: 3.5, r: 0.15,
    fill: { color: C.cardLight },
    line: { color: C.greenBorder, width: 2 }
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.6, w: 4.0, h: 0.55, r: 0.15,
    fill: { color: C.greenBg },
    line: { color: C.greenBg, width: 0 }
  });
  s.addText('✅ KiberQoriqchi platformasi yechimi', {
    x: 5.4, y: 1.65, w: 3.6, h: 0.45,
    fontSize: 13, bold: true, color: C.greenDark
  });
  s.addText([
    { text: '1. 100% Ona tilimizda interaktiv ta\'lim:\n', options: { fontSize: 12, bold: true, color: C.textDark } },
    { text: 'Kiberxavfsizlik asoslari va kibergigiyena sodda tilda tushuntiriladi.\n\n', options: { fontSize: 10.5, color: C.textMuted } },
    { text: '2. Virtual amaliy laboratoriyalar (CTF):\n', options: { fontSize: 12, bold: true, color: C.textDark } },
    { text: 'Foydalanuvchi brauzerning o\'zida real zaifliklarni bartaraf etishni mashq qiladi.\n\n', options: { fontSize: 10.5, color: C.textMuted } },
    { text: '3. Real himoya vositalari:\n', options: { fontSize: 12, bold: true, color: C.textDark } },
    { text: 'Telegramdan kelgan APK fayl va telefonni 1-klikda tekshirish imkoniyati.', options: { fontSize: 10.5, color: C.textMuted } }
  ], {
    x: 5.4, y: 2.25, w: 3.6, h: 2.7,
    lineSpacingMultiple: 1.1
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 3. BOSH SAHIFA (Katta real screenshot va uning elementlari)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '03', 'Bosh sahifa: Haqiqiy interfeys va elementlar', 'Saytning bosh sahifasi (Hero qismi) va asosiy harakatga undovchi tugmalar');

  const homeImg = getImg('01_home_hero.png');
  if (fs.existsSync(homeImg)) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y: 1.6, w: 5.8, h: 3.5, r: 0.1,
      fill: { color: C.cardDark },
      line: { color: C.greenDark, width: 1.5 }
    });
    s.addImage({
      path: homeImg,
      x: 0.85, y: 1.65, w: 5.7, h: 3.4
    });
  }

  // Right callouts
  const callouts = [
    { title: '1. Interaktiv Hero matni', desc: '"Kiberxavfsizlikni amalda o‘rganing" bosh shiori va qisqa ta\'rif.' },
    { title: '2. Asosiy harakat (CTA)', desc: '"Hoziroq boshlash" va yo\'nalishlarga yo\'llovchi dinamik tugmalar.' },
    { title: '3. Til almashtirgich (UZ/RU/EN)', desc: 'Yuqori o\'ng burchakda 3 ta tilda to\'liq lokalizatsiya.' },
    { title: '4. Profil va Ballar', desc: 'Foydalanuvchining login va ballar hisoblagichi paneli.' }
  ];

  callouts.forEach((c, idx) => {
    const yPos = 1.6 + idx * 0.88;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.8, y: yPos, w: 2.4, h: 0.78, r: 0.1,
      fill: { color: C.cardLight },
      line: { color: C.border, width: 1 }
    });
    s.addText(c.title, {
      x: 6.9, y: yPos + 0.08, w: 2.2, h: 0.28,
      fontSize: 10.5, bold: true, color: C.greenDark
    });
    s.addText(c.desc, {
      x: 6.9, y: yPos + 0.36, w: 2.2, h: 0.38,
      fontSize: 9, color: C.textMuted
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 4. SAYT MENYUSI (Haqiqiy navigatsiya)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '04', 'Sayt menyusi: Haqiqiy navigatsiya tuzilishi', 'Platformadagi asosiy bo‘limlar va ularning o‘zaro bog‘liqligi');

  const navImg = getImg('02_navbar.png');
  if (fs.existsSync(navImg)) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y: 1.55, w: 8.4, h: 0.8, r: 0.1,
      fill: { color: C.cardDark },
      line: { color: C.cyan, width: 1.5 }
    });
    s.addImage({
      path: navImg,
      x: 0.85, y: 1.6, w: 8.3, h: 0.7
    });
  }

  // 4 Cards explaining the nav items
  const navItems = [
    { name: '1. Yo‘nalishlar', desc: 'Kibergigiyena, Web xavfsizlik, Tarmoq himoyasi va Linux kasbiy yo\'llari.', x: 0.8 },
    { name: '2. Amaliyot & Lablar', desc: 'Virtual kiber-laboratoriya xonalari (CTF) va interaktiv zaiflik testlari.', x: 2.95 },
    { name: '3. APK Qo‘riqchi & Xavfsizlik', desc: 'Android APK fayllarini tahlil qilish va smartfon xavfsizlik konsoli.', x: 5.1 },
    { name: '4. Reyting & AI Assistent', desc: 'Talabalar musobaqa jadvali (Leaderboard) va CyberGuard AI kiber-maslahatchi.', x: 7.25 }
  ];

  navItems.forEach(n => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: n.x, y: 2.6, w: 2.0, h: 2.4, r: 0.15,
      fill: { color: C.cardLight },
      line: { color: C.border, width: 1.5 }
    });
    s.addText(n.name, {
      x: n.x + 0.1, y: 2.8, w: 1.8, h: 0.5,
      fontSize: 12, bold: true, color: C.greenDark, align: 'center'
    });
    s.addText(n.desc, {
      x: n.x + 0.15, y: 3.35, w: 1.7, h: 1.4,
      fontSize: 10, color: C.textMuted, align: 'center', lineSpacingMultiple: 1.15
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 5. KIBERXAVFSIZLIK BO'LIMLARI (Paths - Yo'nalishlar)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '05', 'Kiberxavfsizlik bo‘limlari va o‘quv yo‘nalishlari', 'Saytda mavjud bo‘lgan kasbiy ta\'lim yo‘nalishlari va ularning vazifalari');

  const pathsImg = getImg('03_paths.png');
  if (fs.existsSync(pathsImg)) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y: 1.6, w: 5.4, h: 3.5, r: 0.1,
      fill: { color: C.cardDark },
      line: { color: C.greenDark, width: 1.5 }
    });
    s.addImage({
      path: pathsImg,
      x: 0.85, y: 1.65, w: 5.3, h: 3.4
    });
  }

  // Right Side Explanation
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.4, y: 1.6, w: 2.8, h: 3.5, r: 0.15,
    fill: { color: C.cardLight },
    line: { color: C.border, width: 1.5 }
  });
  s.addText('Yo‘nalishlar vazifasi:', {
    x: 6.55, y: 1.75, w: 2.5, h: 0.35,
    fontSize: 13, bold: true, color: C.greenDark
  });
  s.addText([
    { text: '• Boshlang‘ich kibergigiyena:\n', options: { fontSize: 10.5, bold: true, color: C.textDark } },
    { text: 'Parollar, 2FA, fishingni aniqlash.\n\n', options: { fontSize: 9.5, color: C.textMuted } },
    { text: '• Web xavfsizlik (OWASP):\n', options: { fontSize: 10.5, bold: true, color: C.textDark } },
    { text: 'SQL injection, XSS, CSRF tushunchalari.\n\n', options: { fontSize: 9.5, color: C.textMuted } },
    { text: '• Tarmoq & Linux:\n', options: { fontSize: 10.5, bold: true, color: C.textDark } },
    { text: 'Portlar, IP manzillar, server himoyasi.\n\n', options: { fontSize: 9.5, color: C.textMuted } },
    { text: '• Penetration testing:\n', options: { fontSize: 10.5, bold: true, color: C.textDark } },
    { text: 'Axloqiy xakkerlik asoslari.', options: { fontSize: 9.5, color: C.textMuted } }
  ], {
    x: 6.55, y: 2.15, w: 2.5, h: 2.8,
    lineSpacingMultiple: 1.1
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 6. AMALIY IMKONIYATLAR (APK Qo'riqchi & Xavfsizlik Paneli)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '06', 'Amaliy imkoniyatlar: APK Qo‘riqchi va Himoya Vositalari', 'Foydalanuvchilar o‘z qurilmalari va shubhali fayllarini real vaqtda tekshirishi mumkin');

  // Left screenshot: APK Qo'riqchi
  const apkImg = getImg('05_apk_qoriqchi.png');
  if (fs.existsSync(apkImg)) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y: 1.6, w: 4.0, h: 2.4, r: 0.1,
      fill: { color: C.cardDark },
      line: { color: C.greenDark, width: 1.5 }
    });
    s.addImage({
      path: apkImg,
      x: 0.85, y: 1.65, w: 3.9, h: 2.3
    });
  }
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 4.1, w: 4.0, h: 1.1, r: 0.1,
    fill: { color: C.cardLight },
    line: { color: C.border, width: 1 }
  });
  s.addText([
    { text: '📱 APK Qo‘riqchi Moduli:\n', options: { fontSize: 11, bold: true, color: C.greenDark } },
    { text: 'Telegram orqali yuborilgan noma\'lum APK fayllarni statik dekompilyatsiya qilib, SMS va parollarni o\'g\'irlovchi troyanlarni aniqlaydi.', options: { fontSize: 9.5, color: C.textMuted } }
  ], {
    x: 0.9, y: 4.15, w: 3.8, h: 0.98
  });

  // Right screenshot: Security Phone Panel
  const secImg = getImg('06_security_phone.png');
  if (fs.existsSync(secImg)) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.2, y: 1.6, w: 4.0, h: 2.4, r: 0.1,
      fill: { color: C.cardDark },
      line: { color: C.cyan, width: 1.5 }
    });
    s.addImage({
      path: secImg,
      x: 5.25, y: 1.65, w: 3.9, h: 2.3
    });
  }
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 4.1, w: 4.0, h: 1.1, r: 0.1,
    fill: { color: C.cardLight },
    line: { color: C.border, width: 1 }
  });
  s.addText([
    { text: '🔒 Telefon Xavfsizlik Paneli:\n', options: { fontSize: 11, bold: true, color: C.cyanDark } },
    { text: 'Ochiq USB debugging, ekran qulfi va ruxsatnomalarni 1-klikda tekshiradi hamda "1-Click Fix" orqali zaiflikni tuzatadi.', options: { fontSize: 9.5, color: C.textMuted } }
  ], {
    x: 5.3, y: 4.15, w: 3.8, h: 0.98
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 7. SAYT QANDAY ISHLAYDI? (Bosqichma-bosqich jarayon)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '07', 'Sayt qanday ishlaydi? (Foydalanish oqimi)', 'Foydalanuvchi platformaga kirgandan so‘ng bilim olish va himoyalanish zanjiri');

  const steps = [
    {
      num: '1',
      title: 'Saytga kirish',
      desc: 'Brauzer orqali ro‘yxatdan o‘tish yoki to‘g‘ridan-to‘g‘ri mehmon sifatida platformaga ulanish.',
      icon: '🌐'
    },
    {
      num: '2',
      title: 'Yo‘nalishni tanlash',
      desc: 'Boshlang‘ich kibergigiyena, web xavfsizlik yoki CTF laboratoriyalarini tanlash.',
      icon: '🎯'
    },
    {
      num: '3',
      title: 'Amaliy laboratoriya',
      desc: 'Brauzer qumlog‘ida (sandbox) real zaifliklarni bartaraf etib bayroq (flag) topish.',
      icon: '🧪'
    },
    {
      num: '4',
      title: 'Himoyani qo‘llash',
      desc: 'O‘z smartfoni yoki APK fayllarini testdan o‘tkazib, real kiber-himoyaga ega bo‘lish.',
      icon: '🛡️'
    }
  ];

  steps.forEach((st, idx) => {
    const xPos = 0.8 + idx * 2.15;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.8, w: 2.0, h: 3.1, r: 0.15,
      fill: { color: C.cardLight },
      line: { color: C.greenBorder, width: 1.5 }
    });
    // Step number pill
    s.addShape(pres.shapes.OVAL, {
      x: xPos + 0.65, y: 2.05, w: 0.7, h: 0.7,
      fill: { color: C.greenDark }
    });
    s.addText(st.num, {
      x: xPos + 0.65, y: 2.05, w: 0.7, h: 0.7,
      fontSize: 16, bold: true, color: C.white, align: 'center', valign: 'middle'
    });
    s.addText(st.title, {
      x: xPos + 0.1, y: 2.9, w: 1.8, h: 0.45,
      fontSize: 12, bold: true, color: C.textDark, align: 'center'
    });
    s.addText(st.desc, {
      x: xPos + 0.1, y: 3.4, w: 1.8, h: 1.3,
      fontSize: 9.5, color: C.textMuted, align: 'center', lineSpacingMultiple: 1.15
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 8. TEXNOLOGIYALAR (Faqat aniqlangan haqiqiy texnologiyalar)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '08', 'Texnologiyalar: Loyihaning haqiqiy texnik asosi', 'Kod bazasi (package.json va arxitektura) orqali 100% aniqlangan texnologiyalar');

  const techs = [
    { name: 'React 18 & Vite', category: 'Frontend Asosi', desc: 'Zamonaviy SPA arxitekturasi, tezkor render va komponentli strukturasi.', color: C.cyanDark },
    { name: 'Tailwind CSS', category: 'Stil va Dizayn', desc: 'Javobgar (responsive) interfeys, neon kiber dizayn va qulay mobil moslashuv.', color: C.greenDark },
    { name: 'Lucide Icons & Canvas Confetti', category: 'UI & Gamifikatsiya', desc: 'Vektorli piktogrammalar va yutuqlarni nishonlovchi animatsiya effektlari.', color: C.amber },
    { name: 'Vercel Edge Cloud', category: 'Infratuzilma & Xosting', desc: 'Global CDN, 24/7 uzluksiz ishlovchi bulutli serverlar va HTTPS xavfsizligi.', color: C.textDark }
  ];

  techs.forEach((t, idx) => {
    const yPos = 1.6 + idx * 0.88;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y: yPos, w: 8.4, h: 0.76, r: 0.12,
      fill: { color: C.cardLight },
      line: { color: C.border, width: 1 }
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 1.0, y: yPos + 0.14, w: 2.2, h: 0.48, r: 0.1,
      fill: { color: 'F1F5F9' },
      line: { color: t.color, width: 1.5 }
    });
    s.addText(t.name, {
      x: 1.05, y: yPos + 0.14, w: 2.1, h: 0.48,
      fontSize: 11, bold: true, color: t.color, align: 'center', valign: 'middle'
    });
    s.addText([
      { text: `${t.category}: `, options: { bold: true, color: C.textDark } },
      { text: t.desc, options: { color: C.textMuted } }
    ], {
      x: 3.4, y: yPos + 0.12, w: 5.6, h: 0.52,
      fontSize: 10.5
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 9. AFZALLIKLARI (Saytning haqiqiy imkoniyatlariga asoslangan)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '09', 'Afzalliklari: KiberQoriqchi nega ustun?', 'Xorijiy analoglar va an\'anaviy kurslarga nisbatan real afzalliklar');

  const advantages = [
    { title: '1. 100% Mahalliy kontekst va Ona tili', desc: 'O\'zbekiston bank tizimi (Click, Payme, Uzcard) fishingiga qarshi maxsus yo\'riqnomalar va o\'zbek tilidagi tushuntirishlar.' },
    { title: '2. Faqat nazariya emas — Jonli Himoya', desc: 'Platformada nafaqat o\'qiladi, balki APK fayllar va smartfon zaifliklari amalda tekshiriladi.' },
    { title: '3. Qulay va Tejamkor (Freemium)', desc: 'Asosiy kibergigiyena darslari aholi uchun bepul, xalqaro qimmat kartalar talab qilinmaydi.' },
    { title: '4. Sun\'iy Intellekt Maslahatchisi', desc: 'CyberGuard AI assistenti istalgan kiber-savolga o\'zbek tilida 24/7 professional javob beradi.' }
  ];

  advantages.forEach((adv, idx) => {
    const xPos = idx % 2 === 0 ? 0.8 : 5.2;
    const yPos = idx < 2 ? 1.6 : 3.35;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: yPos, w: 4.0, h: 1.55, r: 0.15,
      fill: { color: C.cardLight },
      line: { color: C.greenBorder, width: 1.5 }
    });
    s.addText(adv.title, {
      x: xPos + 0.2, y: yPos + 0.15, w: 3.6, h: 0.35,
      fontSize: 12, bold: true, color: C.greenDark
    });
    s.addText(adv.desc, {
      x: xPos + 0.2, y: yPos + 0.55, w: 3.6, h: 0.85,
      fontSize: 10, color: C.textMuted, lineSpacingMultiple: 1.15
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 10. KAMCHILIKLAR VA RIVOJLANTIRISH (Ochiq tahlil)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '10', 'Kamchiliklar va Rivojlantirish Rejalari', 'Haqiqiy holatni ochiq baholash va kelajakdagi takomillashtirish bosqichlari');

  // Left: Aniqlangan Kamchiliklar
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 4.0, h: 3.5, r: 0.15,
    fill: { color: C.cardLight },
    line: { color: 'FCD34D', width: 1.5 }
  });
  s.addText('⚠️ Hozirgi Kamchiliklar (MVP)', {
    x: 1.0, y: 1.8, w: 3.6, h: 0.4,
    fontSize: 13, bold: true, color: 'B45309'
  });
  s.addText([
    { text: '1. Dinamik Server-Side Sandboxing:\n', options: { fontSize: 11, bold: true, color: C.textDark } },
    { text: 'Hozirda laboratoriyalar veb-simulyatsiya asosida; to\'liq Docker konteynerli serverlar talab etiladi.\n\n', options: { fontSize: 9.5, color: C.textMuted } },
    { text: '2. Mobil Ilova Mavjud Emas:\n', options: { fontSize: 11, bold: true, color: C.textDark } },
    { text: 'Hozircha sayt faqat veb-brauzer orqali ishlaydi, mahalliy Android ilova ishlab chiqilmoqda.\n\n', options: { fontSize: 9.5, color: C.textMuted } },
    { text: '3. Avtomatlashtirilgan Telegram Bot:\n', options: { fontSize: 11, bold: true, color: C.textDark } },
    { text: 'Telegram orqali fayl tekshirish boti hali integratsiya qilinmoqda.', options: { fontSize: 9.5, color: C.textMuted } }
  ], {
    x: 1.0, y: 2.3, w: 3.6, h: 2.6,
    lineSpacingMultiple: 1.15
  });

  // Right: Rivojlantirish
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.6, w: 4.0, h: 3.5, r: 0.15,
    fill: { color: C.cardLight },
    line: { color: C.greenBorder, width: 1.5 }
  });
  s.addText('🚀 Rivojlantirish Yo‘l Xaritasi', {
    x: 5.4, y: 1.8, w: 3.6, h: 0.4,
    fontSize: 13, bold: true, color: C.greenDark
  });
  s.addText([
    { text: '1. Telegram Xavfsizlik Boti (2026 Q3):\n', options: { fontSize: 11, bold: true, color: C.textDark } },
    { text: 'Foydalanuvchilar shubhali APK yoki havolani botga yuborib 2 soniyada natija oladi.\n\n', options: { fontSize: 9.5, color: C.textMuted } },
    { text: '2. B2B Korporativ Trening Moduli:\n', options: { fontSize: 11, bold: true, color: C.textDark } },
    { text: 'Banklar va kompaniyalar xodimlari uchun maxsus kiber-audit va fishing simulyatsiyasi.\n\n', options: { fontSize: 9.5, color: C.textMuted } },
    { text: '3. Milliy Kiber-Olimpiada va CTF:\n', options: { fontSize: 11, bold: true, color: C.textDark } },
    { text: 'Talabalar o\'rtasida respublika miqyosida sovrinli kiber-musobaqalar o\'tkazish.', options: { fontSize: 9.5, color: C.textMuted } }
  ], {
    x: 5.4, y: 2.3, w: 3.6, h: 2.6,
    lineSpacingMultiple: 1.15
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 11. XULOSA (Loyiha natijasi va jamiyatga foydasi)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '11', 'Xulosa: KiberQoriqchi natijasi va jamiyatga foydasi', 'Kiberxavfsizlik — faqat texnologiya emas, balki to‘g‘ri odatlar va amaliy bilimdir');

  const summaryCards = [
    { num: '32M+', label: 'Aholi kiber-xavflardan himoyalanish madaniyatiga ega bo‘ladi.' },
    { num: '1-Click', label: 'Smartfon va APK xavfsizligini tekshirish uchun oson milliy yechim.' },
    { num: '100%', label: 'Ona tilimizda yangi avlod kiberxavfsizlik mutaxassislari tayyorlanadi.' }
  ];

  summaryCards.forEach((sc, idx) => {
    const xPos = 0.8 + idx * 2.85;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.7, w: 2.7, h: 1.6, r: 0.15,
      fill: { color: C.cardLight },
      line: { color: C.greenBorder, width: 2 }
    });
    s.addText(sc.num, {
      x: xPos, y: 1.9, w: 2.7, h: 0.6,
      fontSize: 28, bold: true, color: C.greenDark, align: 'center'
    });
    s.addText(sc.label, {
      x: xPos + 0.15, y: 2.5, w: 2.4, h: 0.65,
      fontSize: 10.5, color: C.textDark, align: 'center'
    });
  });

  // Bottom quote banner
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 3.6, w: 8.4, h: 1.4, r: 0.15,
    fill: { color: 'ECFDF5' },
    line: { color: C.greenBorder, width: 1.5 }
  });
  s.addText([
    { text: '«KiberQoriqchi — shunchaki veb-sayt emas, balki Raqamli O‘zbekistonni kiber-tahdidlardan himoya qiluvchi ishonchli milliy qalqondir!»\n', options: { fontSize: 13, bold: true, color: C.greenDark } },
    { text: 'Platforma foydalanuvchini xavfni tanish → chorani tanlash → xavfsiz harakat qilish bosqichlariga o‘rgatadi.', options: { fontSize: 11, color: C.textDark } }
  ], {
    x: 1.0, y: 3.8, w: 8.0, h: 1.0,
    align: 'center', lineSpacingMultiple: 1.2
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 12. RAHMAT (Sayt manzili va haqiqiy bosh sahifa rasmi)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgDark };

  // Top accent bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.08,
    fill: { color: C.green }
  });

  s.addText('E’tiboringiz uchun rahmat!', {
    x: 0.8, y: 0.9, w: 5.0, h: 0.7,
    fontSize: 34, bold: true, color: C.textLight
  });

  s.addText('KiberQoriqchi platformasi orqali raqamli xavfsizlikni birgalikda ta’minlaymiz.', {
    x: 0.8, y: 1.65, w: 4.8, h: 0.5,
    fontSize: 12, color: C.textLightMuted
  });

  // Website details card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 2.3, w: 4.8, h: 2.2, r: 0.15,
    fill: { color: '0D1A26' },
    line: { color: C.green, width: 1.5 }
  });
  s.addText([
    { text: '🌐 Sayt havolasi:\n', options: { fontSize: 11, bold: true, color: C.green } },
    { text: 'https://kiber-xavfsizlik-boyicha-sayt.vercel.app/\n\n', options: { fontSize: 12, bold: true, color: C.cyan } },
    { text: '📩 Aloqa va Hamkorlik:\n', options: { fontSize: 11, bold: true, color: C.green } },
    { text: 'Telegram: @cybershield_uz  |  Email: contact@cybershield.uz\n\n', options: { fontSize: 10, color: C.textLight } },
    { text: '🛡️ "Xavfsiz internet — ongli foydalanuvchidan boshlanadi!"', options: { fontSize: 10, italic: true, color: '34D399' } }
  ], {
    x: 1.0, y: 2.45, w: 4.4, h: 1.9,
    lineSpacingMultiple: 1.15
  });

  // Right Side: Real Screenshot & QR code
  const fullHomeImg = getImg('01_home_hero.png');
  if (fs.existsSync(fullHomeImg)) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.9, y: 0.8, w: 3.5, h: 4.2, r: 0.15,
      fill: { color: '0D1A26' },
      line: { color: C.green, width: 2 }
    });
    s.addImage({
      path: fullHomeImg,
      x: 5.95, y: 0.85, w: 3.4, h: 4.1
    });
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// EXPORT PPTX
// ══════════════════════════════════════════════════════════════════════════════
const rootPPTX = path.resolve('KiberQoriqchi_Prezentatsiya.pptx');
const publicPPTX = path.resolve('public', 'KiberQoriqchi_Prezentatsiya.pptx');

pres.writeFile({ fileName: rootPPTX }).then(f => {
  console.log('✅ Generated PPTX in root:', f);
  fs.copyFileSync(rootPPTX, publicPPTX);
  console.log('✅ Copied PPTX to public folder:', publicPPTX);
}).catch(err => {
  console.error('❌ Error writing PPTX:', err);
});
