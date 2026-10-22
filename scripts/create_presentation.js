import pptxgen from 'pptxgenjs';
import path from 'path';
import fs from 'fs';

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9'; // 10 x 5.625 inches
pres.title = 'KiberQoriqchi — Web Platformasi Prezentatsiyasi';
pres.author = 'Abduraxmonov Bexruz';
pres.company = 'CyberShield Academy';

// Theme Colors
const C = {
  bgLight: 'F4F6F9',
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

const TOTAL_SLIDES = 13;

// Helper for Slide Header
function addHeader(slide, num, title, subtitle, isDark = false) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 0.25, w: 2.2, h: 0.3, r: 0.15,
    fill: { color: isDark ? '064E3B' : 'ECFDF5' },
    line: { color: C.green, width: 1 }
  });
  slide.addText(`SLAYD ${num} / ${TOTAL_SLIDES}`, {
    x: 0.6, y: 0.25, w: 2.2, h: 0.3,
    fontSize: 9.5, bold: true, color: isDark ? '34D399' : C.greenDark, align: 'center', valign: 'middle'
  });

  slide.addText(title, {
    x: 0.6, y: 0.6, w: 8.8, h: 0.45,
    fontSize: 20, bold: true, color: isDark ? C.textLight : C.textDark
  });

  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.6, y: 1.05, w: 8.8, h: 0.3,
      fontSize: 11, color: isDark ? C.textLightMuted : C.textMuted
    });
  }
}

// Helper to add screenshot with clean border
function addScreenshot(slide, imgName, x, y, w, h, captionText = null) {
  const p = getImg(imgName);
  if (fs.existsSync(p)) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x - 0.04, y: y - 0.04, w: w + 0.08, h: h + (captionText ? 0.38 : 0.08), r: 0.1,
      fill: { color: '0D1A26' },
      line: { color: C.greenDark, width: 1.5 }
    });
    slide.addImage({ path: p, x, y, w, h });
    if (captionText) {
      slide.addText(captionText, {
        x: x, y: y + h + 0.04, w: w, h: 0.3,
        fontSize: 9, color: 'BAE6FD', align: 'center', valign: 'middle'
      });
    }
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// 1. TITUL SLAYDI (Bosh sahifa haqiqiy katta rasmi bilan)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgDark };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.green } });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 0.5, w: 3.4, h: 0.36, r: 0.15,
    fill: { color: '064E3B' },
    line: { color: C.green, width: 1 }
  });
  s.addText('🛡️ KIBERXAVFSIZLIK AKADEMIYASI', {
    x: 0.6, y: 0.5, w: 3.4, h: 0.36,
    fontSize: 10, bold: true, color: '34D399', align: 'center', valign: 'middle'
  });

  s.addText('KiberQoriqchi', {
    x: 0.55, y: 1.0, w: 4.8, h: 0.8,
    fontSize: 44, bold: true, color: C.textLight, fontFace: 'Arial Black'
  });

  s.addText('Kiberxavflarni tushunish, amaliy himoyalanish va milliy kiber-madaniyatni shakllantirish platformasi.', {
    x: 0.6, y: 1.85, w: 4.6, h: 0.7,
    fontSize: 12.5, color: C.textLightMuted, lineSpacingMultiple: 1.2
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 2.7, w: 4.6, h: 0.85, r: 0.15,
    fill: { color: '0D1A26' },
    line: { color: '1E3A52', width: 1 }
  });
  s.addText([
    { text: '🌐 Rasmiy Sayt Manzili:\n', options: { fontSize: 10, color: C.textLightMuted, bold: true } },
    { text: 'https://kiber-xavfsizlik-boyicha-sayt.vercel.app/', options: { fontSize: 11, color: C.cyan, bold: true } }
  ], {
    x: 0.75, y: 2.75, w: 4.3, h: 0.75
  });

  s.addText('Muallif: Abduraxmonov Bexruz   |   100% O‘zbek tilida', {
    x: 0.6, y: 3.75, w: 4.6, h: 0.35,
    fontSize: 11, bold: true, color: C.green
  });

  addScreenshot(s, '01_home_hero.png', 5.5, 0.6, 3.9, 4.4, '📸 Saytning jonli bosh sahifasi (Hero ekrani)');
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. LOYIHA HAQIDA (2 ta rasm: An'anaviy va KiberQoriqchi)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '02', 'Loyiha haqida: Muammo va Yechim', 'Nega KiberQoriqchi platformasi yaratildi va qanday real muammolarni hal qiladi?');

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 1.45, w: 4.2, h: 3.8, r: 0.15,
    fill: { color: C.cardLight },
    line: { color: C.border, width: 1.5 }
  });
  s.addText([
    { text: '🚨 Raqamli muhitdagi 3 ta asosiy muammo:\n\n', options: { fontSize: 13, bold: true, color: 'DC2626' } },
    { text: '1. Fishing va soxta to‘lovlar:\n', options: { fontSize: 11, bold: true, color: C.textDark } },
    { text: 'Fuqarolar soxta Click/Payme havolalari orqali karta pullaridan ayrilmoqda.\n\n', options: { fontSize: 9.5, color: C.textMuted } },
    { text: '2. Zararli Telegram APK troyanlari:\n', options: { fontSize: 11, bold: true, color: C.textDark } },
    { text: 'Telegram orqali kelgan ilovalar SMS va parollarni o\'g\'irlamoqda.\n\n', options: { fontSize: 9.5, color: C.textMuted } },
    { text: '3. Amaliy ta\'lim yo\'qligi:\n', options: { fontSize: 11, bold: true, color: C.textDark } },
    { text: 'Mavjud manbalar faqat quruq nazariya yoki chet tillarida.\n\n', options: { fontSize: 9.5, color: C.textMuted } },
    { text: '✅ KiberQoriqchi yechimi: ', options: { fontSize: 11, bold: true, color: C.greenDark } },
    { text: 'Ona tilimizda virtual laboratoriyalar va jonli himoya vositalari!', options: { fontSize: 9.5, color: C.textDark } }
  ], {
    x: 0.8, y: 1.6, w: 3.8, h: 3.5,
    lineSpacingMultiple: 1.1
  });

  addScreenshot(s, '03_paths.png', 5.1, 1.45, 4.3, 3.5, '📸 KiberQoriqchi — tizimli ta\'lim yo\'nalishlari interfeysi');
}

// ══════════════════════════════════════════════════════════════════════════════
// 3. BOSH SAHIFA (Katta haqiqiy screenshot va tahlil)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '03', 'Bosh sahifa: Haqiqiy interfeys va elementlar', 'Saytning bosh sahifasi (Hero) va asosiy harakatga undovchi elementlar');

  addScreenshot(s, '01_home_hero.png', 0.6, 1.45, 5.5, 3.8, '📸 Bosh sahifa — Hero bloki, neon kiber dizayn va asosiy tugmalar');

  const elements = [
    { title: '1. Sarlavha & Shior', desc: '"Kiberxavfsizlikni amalda o‘rganing" bosh shiori va yo\'nalish tavsifi.' },
    { title: '2. Boshlash Tugmasi', desc: '"Hoziroq boshlash" orqali darhol laboratoriyalarga yo\'l ochiladi.' },
    { title: '3. 3 Tilda Lokalizatsiya', desc: 'O\'zbek, Rus va Ingliz tillarida to\'liq moslashtirilgan interfeys.' },
    { title: '4. Profil va Ballar', desc: 'Foydalanuvchining login holati va yig\'ilgan ballar paneli.' }
  ];

  elements.forEach((el, idx) => {
    const yPos = 1.45 + idx * 0.95;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.4, y: yPos, w: 3.0, h: 0.82, r: 0.1,
      fill: { color: C.cardLight },
      line: { color: C.border, width: 1 }
    });
    s.addText(el.title, {
      x: 6.55, y: yPos + 0.08, w: 2.7, h: 0.3,
      fontSize: 11, bold: true, color: C.greenDark
    });
    s.addText(el.desc, {
      x: 6.55, y: yPos + 0.38, w: 2.7, h: 0.38,
      fontSize: 9.5, color: C.textMuted
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 4. SAYT MENYUSI (Haqiqiy navigatsiya va bo'limlar)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '04', 'Sayt menyusi: Haqiqiy navigatsiya tuzilishi', 'Platformadagi barcha bo‘limlar va ularning o‘zaro bog‘liqligi');

  addScreenshot(s, '02_navbar.png', 0.6, 1.45, 8.8, 1.0, '📸 Saytning haqiqiy Navbar komponenti');

  const navs = [
    { title: '1. Yo‘nalishlar (Paths)', desc: 'Kibergigiyena, Web xavfsizlik, Linux va Tarmoq himoyasi kasbiy yo\'llari.', x: 0.6 },
    { title: '2. Amaliyot (Practice)', desc: 'Virtual kiber-laboratoriya xonalari (CTF) va real zaifliklarni sinash.', x: 2.85 },
    { title: '3. APK Qo‘riqchi', desc: 'Android APK fayllarini tahlil qilish va zararli kodlarni fosh etish.', x: 5.1 },
    { title: '4. CyberGuard AI', desc: 'Kiberxavfsizlik bo‘yicha o‘zbek tilida 24/7 javob beruvchi sun\'iy intellekt.', x: 7.35 }
  ];

  navs.forEach(n => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: n.x, y: 2.8, w: 2.05, h: 2.4, r: 0.15,
      fill: { color: C.cardLight },
      line: { color: C.border, width: 1.5 }
    });
    s.addText(n.title, {
      x: n.x + 0.1, y: 2.95, w: 1.85, h: 0.5,
      fontSize: 12, bold: true, color: C.greenDark, align: 'center'
    });
    s.addText(n.desc, {
      x: n.x + 0.1, y: 3.5, w: 1.85, h: 1.5,
      fontSize: 10, color: C.textMuted, align: 'center', lineSpacingMultiple: 1.15
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 5. KIBERXAVFSIZLIK BO'LIMLARI (2 ta real screenshot: Paths va Practice)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '05', 'Kiberxavfsizlik bo‘limlari va o‘quv yo‘nalishlari', 'Saytda mavjud bo‘lgan kasbiy ta\'lim yo‘nalishlari va amaliy laboratoriya xonalari');

  addScreenshot(s, '03_paths.png', 0.6, 1.45, 4.25, 2.7, '📸 "Yo‘nalishlar" — Kibergigiyena, Web, Linux darslari');
  addScreenshot(s, '11_practice_rooms.png', 5.15, 1.45, 4.25, 2.7, '📸 "Amaliyot" — CTF xonalari va zaiflik laboratoriyalari');

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.45, w: 8.8, h: 0.85, r: 0.12,
    fill: { color: C.cardLight },
    line: { color: C.greenBorder, width: 1 }
  });
  s.addText([
    { text: '• Nazariya va Amaliyot uyg‘unligi: ', options: { bold: true, color: C.greenDark } },
    { text: 'O‘quvchi har bir mavzuni o‘rgangach, darhol virtual laboratoriya xonasiga kirib amalda sinab ko‘radi (SQLi, XSS, Brute force, Phishing).', options: { color: C.textDark } }
  ], {
    x: 0.8, y: 4.5, w: 8.4, h: 0.7,
    fontSize: 10.5
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 6. AMALIY IMKONIYATLAR (2 ta real screenshot: APK Qo'riqchi va Telefon Xavfsizligi)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '06', 'Amaliy imkoniyatlar: APK Qo‘riqchi va Telefon Paneli', 'Sayt ichidagi haqiqiy tahlil va himoya vositalari');

  addScreenshot(s, '05_apk_qoriqchi.png', 0.6, 1.45, 4.25, 2.7, '📸 "APK Qo‘riqchi" — Android ilovalarni tahlil qilish moduli');
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.45, w: 4.25, h: 0.85, r: 0.1,
    fill: { color: C.cardLight },
    line: { color: C.border, width: 1 }
  });
  s.addText([
    { text: '📱 APK Qo‘riqchi: ', options: { bold: true, color: C.greenDark } },
    { text: 'Faylni yuklab, uning so\'ragan ruxsatlari, SMS o\'g\'irlash kodlari va troyan signaturalarini fosh etish.', options: { color: C.textMuted } }
  ], {
    x: 0.75, y: 4.5, w: 3.95, h: 0.75,
    fontSize: 9.5
  });

  addScreenshot(s, '06_security_phone.png', 5.15, 1.45, 4.25, 2.7, '📸 "Telefon Xavfsizlik Paneli" — qurilma auditi va 1-Click Fix');
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.15, y: 4.45, w: 4.25, h: 0.85, r: 0.1,
    fill: { color: C.cardLight },
    line: { color: C.border, width: 1 }
  });
  s.addText([
    { text: '🔒 Smartfon Himoyasi: ', options: { bold: true, color: C.cyanDark } },
    { text: 'Ochiq USB debugging, ekran qulfi va xavfli ruxsatnomalarni 1-klikda tekshirish va to\'g\'irlash.', options: { color: C.textMuted } }
  ], {
    x: 5.3, y: 4.5, w: 3.95, h: 0.75,
    fontSize: 9.5
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 7. SAYT QANDAY ISHLAYDI? (Lab Room screenshot + 4 bosqich)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '07', 'Sayt qanday ishlaydi? (Foydalanish oqimi)', 'Foydalanuvchi platformaga kirgandan so‘ng bilim olish va himoyalanish zanjiri');

  addScreenshot(s, '09_lab_room.png', 0.6, 1.45, 4.6, 3.8, '📸 Haqiqiy virtual laboratoriya xonasi (Lab Room) interfeysi');

  const steps = [
    { num: '01', title: 'Saytga kirish', desc: 'Brauzer orqali kiber-platformaga kirish va tilni tanlash.' },
    { num: '02', title: 'Yo‘nalishni tanlash', desc: 'Kibergigiyena, Web xavfsizlik yoki CTF kursini tanlash.' },
    { num: '03', title: 'Amaliy laboratoriya', desc: 'Brauzerda real vaziyatlarni bartaraf etib bayroq (flag) topish.' },
    { num: '04', title: 'Qurilmani himoyalash', desc: 'APK yoki smartfonni skaner qilib, real himoyaga ega bo‘lish.' }
  ];

  steps.forEach((st, idx) => {
    const yPos = 1.45 + idx * 0.95;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.5, y: yPos, w: 3.9, h: 0.82, r: 0.1,
      fill: { color: C.cardLight },
      line: { color: C.greenBorder, width: 1.5 }
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.65, y: yPos + 0.16, w: 0.5, h: 0.5, r: 0.1,
      fill: { color: C.greenDark }
    });
    s.addText(st.num, {
      x: 5.65, y: yPos + 0.16, w: 0.5, h: 0.5,
      fontSize: 12, bold: true, color: C.white, align: 'center', valign: 'middle'
    });
    s.addText(st.title, {
      x: 6.3, y: yPos + 0.08, w: 3.0, h: 0.3,
      fontSize: 11, bold: true, color: C.textDark
    });
    s.addText(st.desc, {
      x: 6.3, y: yPos + 0.38, w: 3.0, h: 0.38,
      fontSize: 9.5, color: C.textMuted
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 8. TEXNOLOGIYALAR (CyberGuard AI screenshot + Haqiqiy Stak)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '08', 'Texnologiyalar: Loyihaning haqiqiy texnik asosi', 'Kod bazasi (package.json va arxitektura) orqali 100% tasdiqlangan texnologiyalar');

  addScreenshot(s, '08_cyberguard_ai.png', 0.6, 1.45, 4.4, 3.8, '📸 CyberGuard AI — o‘zbek tilidagi kiberxavfsizlik assistenti');

  const techs = [
    { name: 'React 18 & Vite', desc: 'Tezkor SPA arxitekturasi va modulli frontend.', col: C.cyanDark },
    { name: 'Tailwind CSS', desc: 'To‘liq moslashuvchan (responsive) qorong‘i kiber-interfeys.', col: C.greenDark },
    { name: 'Lucide Icons & Confetti', desc: 'Kiber piktogrammalar va gamifikatsiya effektlari.', col: C.amber },
    { name: 'Vercel Edge Cloud', desc: 'Global CDN, 24/7 uzluksiz ishlovchi bulutli serverlar.', col: C.textDark }
  ];

  techs.forEach((t, idx) => {
    const yPos = 1.45 + idx * 0.95;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.3, y: yPos, w: 4.1, h: 0.82, r: 0.1,
      fill: { color: C.cardLight },
      line: { color: C.border, width: 1 }
    });
    s.addText(t.name, {
      x: 5.45, y: yPos + 0.08, w: 3.8, h: 0.3,
      fontSize: 12, bold: true, color: t.col
    });
    s.addText(t.desc, {
      x: 5.45, y: yPos + 0.38, w: 3.8, h: 0.38,
      fontSize: 9.5, color: C.textMuted
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 9. AFZALLIKLARI (Leaderboard screenshot + 4 ta ustunlik)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '09', 'Afzalliklari: KiberQoriqchi nega ustun?', 'Saytning haqiqiy imkoniyatlariga asoslangan asosiy raqobat ustunliklari');

  addScreenshot(s, '07_leaderboard.png', 0.6, 1.45, 4.4, 3.8, '📸 "Leaderboard" — jonli reyting va musobaqa tizimi');

  const advs = [
    { title: '1. 100% Ona Tilimizda', desc: 'O‘zbekiston to‘lov tizimlari (Click, Payme, Uzcard) kiber-xavflariga moslangan.' },
    { title: '2. Ta\'lim + Jonli Himoya', desc: 'Faqat ma\'ruza emas — smartfon va fayllarni amalda tekshirish qurollari bor.' },
    { title: '3. Gamifikatsiya va Musobaqa', desc: 'Topshiriqlarni bajarish orqali ballar to‘plab umumiy reytingda ko‘tarilish.' },
    { title: '4. CyberGuard AI Maslahatchi', desc: 'Har qanday kiber-savolga o‘zbek tilida 24/7 tezkor va tushunarli javob.' }
  ];

  advs.forEach((a, idx) => {
    const yPos = 1.45 + idx * 0.95;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.3, y: yPos, w: 4.1, h: 0.82, r: 0.1,
      fill: { color: C.cardLight },
      line: { color: C.greenBorder, width: 1.5 }
    });
    s.addText(a.title, {
      x: 5.45, y: yPos + 0.08, w: 3.8, h: 0.3,
      fontSize: 11, bold: true, color: C.greenDark
    });
    s.addText(a.desc, {
      x: 5.45, y: yPos + 0.38, w: 3.8, h: 0.38,
      fontSize: 9.5, color: C.textMuted
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 10. KAMCHILIKLAR VA RIVOJLANTIRISH (Case Study screenshot + Rejalar)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '10', 'Kamchiliklar va Rivojlantirish Rejalari', 'Haqiqiy holatni ochiq baholash va kelajakdagi takomillashtirish bosqichlari');

  addScreenshot(s, '12_casestudy.png', 0.6, 1.45, 4.4, 3.8, '📸 "Hodisalar Tahlili" (Case Study) — real kiber-hujumlar tahlili');

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.3, y: 1.45, w: 4.1, h: 1.8, r: 0.12,
    fill: { color: C.cardLight },
    line: { color: 'FCD34D', width: 1.5 }
  });
  s.addText('⚠️ Aniqlangan Kamchiliklar (MVP):', {
    x: 5.45, y: 1.55, w: 3.8, h: 0.3,
    fontSize: 11, bold: true, color: 'B45309'
  });
  s.addText([
    { text: '• Dinamik Server Sandboxing: ', options: { bold: true, color: C.textDark } },
    { text: 'Hozircha veb-simulyatsiya; to‘liq Docker muhiti zarur.\n', options: { color: C.textMuted } },
    { text: '• Mahalliy ilova yo‘qligi: ', options: { bold: true, color: C.textDark } },
    { text: 'Android/iOS ilovasi ishlab chiqilmoqda.\n', options: { color: C.textMuted } },
    { text: '• Telegram bot: ', options: { bold: true, color: C.textDark } },
    { text: 'Avtomatik APK tekshiruvchi bot ulanmoqda.', options: { color: C.textMuted } }
  ], {
    x: 5.45, y: 1.9, w: 3.8, h: 1.25,
    fontSize: 9
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.3, y: 3.45, w: 4.1, h: 1.8, r: 0.12,
    fill: { color: C.cardLight },
    line: { color: C.greenBorder, width: 1.5 }
  });
  s.addText('🚀 Kelajakdagi Rivojlantirish:', {
    x: 5.45, y: 3.55, w: 3.8, h: 0.3,
    fontSize: 11, bold: true, color: C.greenDark
  });
  s.addText([
    { text: '• Telegram Xavfsizlik Boti: ', options: { bold: true, color: C.textDark } },
    { text: 'Shubhali faylni botga yuborib 2 soniyada natija olish.\n', options: { color: C.textMuted } },
    { text: '• B2B Korporativ Audit: ', options: { bold: true, color: C.textDark } },
    { text: 'Banklar va korxonalar uchun fishing simulyatsiyasi.\n', options: { color: C.textMuted } },
    { text: '• Respublika CTF Musobaqasi: ', options: { bold: true, color: C.textDark } },
    { text: 'Yoshlar o‘rtasida kiber-olimpiada o‘tkazish.', options: { color: C.textMuted } }
  ], {
    x: 5.45, y: 3.9, w: 3.8, h: 1.25,
    fontSize: 9
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 11. LOYIHANI KIM YARATDI? (MUALLIF: Abduraxmonov Bexruz — OXIRIDA)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: '0A192F' }; // To'q ko'k kiber fon

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 0.35, w: 2.2, h: 0.3, r: 0.15,
    fill: { color: '064E3B' },
    line: { color: C.green, width: 1 }
  });
  s.addText('11 · MUALLIF', {
    x: 0.6, y: 0.35, w: 2.2, h: 0.3,
    fontSize: 10, bold: true, color: '34D399', align: 'center', valign: 'middle'
  });

  s.addText('Loyihani kim yaratdi?', {
    x: 0.6, y: 0.75, w: 5.4, h: 0.5,
    fontSize: 22, bold: true, color: C.white
  });

  s.addText('Loyihaning barcha qismlari Abduraxmonov Bexruz tomonidan bajarilgan.', {
    x: 0.6, y: 1.25, w: 5.4, h: 0.9,
    fontSize: 20, bold: true, color: C.textLight, lineSpacingMultiple: 1.15
  });

  s.addText('ROLI:  Muallif, dizayner va dasturchi', {
    x: 0.6, y: 2.25, w: 5.4, h: 0.35,
    fontSize: 12, bold: true, color: '6EE7B7'
  });

  const tasks = [
    '• Loyiha g‘oyasi va arxitektura tuzilmasi',
    '• UI/UX dizayn va vizual interfeys',
    '• React, Vite va Tailwind CSS bilan dasturlash',
    '• O‘quv modullari, laboratoriyalar va Sezar shifri',
    '• Vercel bulutiga joylashtirish va CI/CD',
    '• Sinov va taqdimotga to‘liq tayyorlash'
  ];

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 2.7, w: 5.4, h: 2.45, r: 0.12,
    fill: { color: '0F243A' },
    line: { color: '1E3A52', width: 1.5 }
  });
  s.addText('Bajargan ishlari:', {
    x: 0.8, y: 2.8, w: 5.0, h: 0.3,
    fontSize: 12, bold: true, color: C.green
  });
  s.addText(tasks.join('\n'), {
    x: 0.8, y: 3.15, w: 5.0, h: 1.9,
    fontSize: 11, color: C.textLight, lineSpacingMultiple: 1.25
  });

  // Right Side: Author's Portrait Photo
  const portraitImg = getImg('author_portrait.png');
  const slideImg = getImg('author_slide.png');
  const chosenImg = fs.existsSync(portraitImg) ? portraitImg : slideImg;

  if (fs.existsSync(chosenImg)) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.35, y: 0.7, w: 3.1, h: 4.45, r: 0.15,
      fill: { color: '0D1A26' },
      line: { color: C.green, width: 2 }
    });
    s.addImage({
      path: chosenImg,
      x: 6.4, y: 0.75, w: 3.0, h: 4.35
    });
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// 12. XULOSA (Login screenshot + Natija)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, '12', 'Xulosa: Loyiha natijasi va jamiyatga foydasi', 'Kiberxavfsizlik — faqat texnologiya emas, balki to‘g‘ri odatlar va amaliy bilimdir');

  addScreenshot(s, '10_login.png', 0.6, 1.45, 4.4, 3.8, '📸 Ro‘yxatdan o‘tish va shaxsiy kabinet interfeysi');

  const metrics = [
    { num: '32M+', title: 'Aholi kiber-xavflardan himoyalanish madaniyatiga ega bo‘ladi.' },
    { num: '1-Click', title: 'Smartfon va APK xavfsizligini tekshirish uchun oson milliy yechim.' },
    { num: '100%', title: 'Ona tilimizda yangi avlod kiber-mutaxassislari tayyorlanadi.' }
  ];

  metrics.forEach((m, idx) => {
    const yPos = 1.45 + idx * 1.25;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.3, y: yPos, w: 4.1, h: 1.1, r: 0.12,
      fill: { color: C.cardLight },
      line: { color: C.greenBorder, width: 1.5 }
    });
    s.addText(m.num, {
      x: 5.5, y: yPos + 0.1, w: 1.4, h: 0.8,
      fontSize: 26, bold: true, color: C.greenDark, align: 'center', valign: 'middle'
    });
    s.addText(m.title, {
      x: 7.0, y: yPos + 0.15, w: 2.25, h: 0.8,
      fontSize: 10, color: C.textDark, valign: 'middle'
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// 13. RAHMAT (Full Page Screenshot + Aloqa)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgDark };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.green } });

  s.addText('E’tiboringiz uchun rahmat!', {
    x: 0.6, y: 0.65, w: 5.0, h: 0.65,
    fontSize: 34, bold: true, color: C.textLight
  });

  s.addText('KiberQoriqchi platformasi orqali raqamli xavfsizlikni birgalikda ta’minlaymiz.', {
    x: 0.6, y: 1.35, w: 4.8, h: 0.45,
    fontSize: 12, color: C.textLightMuted
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 1.95, w: 4.8, h: 3.1, r: 0.15,
    fill: { color: '0D1A26' },
    line: { color: C.green, width: 1.5 }
  });
  s.addText([
    { text: '🌐 Jonli Sayt Havolasi:\n', options: { fontSize: 11, bold: true, color: C.green } },
    { text: 'https://kiber-xavfsizlik-boyicha-sayt.vercel.app/\n\n', options: { fontSize: 12, bold: true, color: C.cyan } },
    { text: '👤 Loyiha Muallifi:\n', options: { fontSize: 11, bold: true, color: C.green } },
    { text: 'Abduraxmonov Bexruz (Muallif, dizayner va dasturchi)\n\n', options: { fontSize: 10.5, color: C.textLight } },
    { text: '🛡️ "Xavfsiz internet — ongli foydalanuvchidan boshlanadi!"', options: { fontSize: 11, italic: true, color: '34D399' } }
  ], {
    x: 0.8, y: 2.1, w: 4.4, h: 2.7,
    lineSpacingMultiple: 1.2
  });

  addScreenshot(s, '01_home_hero.png', 5.7, 0.65, 3.7, 4.4, '📸 KiberQoriqchi rasmiy web-platformasi');
}

// ══════════════════════════════════════════════════════════════════════════════
// EXPORT PPTX
// ══════════════════════════════════════════════════════════════════════════════
const rootPPTX = path.resolve('KiberQoriqchi_Prezentatsiya.pptx');
const publicPPTX = path.resolve('public', 'KiberQoriqchi_Prezentatsiya.pptx');
const desktopPPTX = 'C:\\Users\\User\\Desktop\\KiberQoriqchi_Prezentatsiya.pptx';

pres.writeFile({ fileName: rootPPTX }).then(f => {
  console.log('✅ Generated PPTX in root:', f);
  fs.copyFileSync(rootPPTX, publicPPTX);
  fs.copyFileSync(rootPPTX, desktopPPTX);
  console.log('✅ Copied PPTX to public and Desktop!');
}).catch(err => {
  console.error('❌ Error writing PPTX:', err);
});
