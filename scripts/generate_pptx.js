import pptxgen from 'pptxgenjs';
import path from 'path';
import fs from 'fs';

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9'; // 10" x 5.625"
pres.title = 'KiberQoriqchi — Kiberxavfsizlik Akademiyasi';
pres.author = 'KiberQoriqchi Team';
pres.company = 'CyberShield Academy';

// Theme Colors
const C = {
  darkBg: '070E16',
  darkCard: '0E1A26',
  darkBorder: '1C2E42',
  lightBg: 'F4F6F9',
  lightCard: 'FFFFFF',
  lightBorder: 'E2E8F0',
  cyan: '0EA5E9',
  blue: '0284C7',
  green: '10B981',
  greenDark: '059669',
  red: 'EF4444',
  orange: 'F59E0B',
  white: 'FFFFFF',
  textDark: '0F172A',
  textMuted: '64748B',
  textLightMuted: '94A3B8'
};

// ── SLIDE 1: Muqova (Title / Hero Cover) ──────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.darkBg };

  // Decorative glow bar
  s.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 0.1,
    fill: { color: C.cyan }
  });

  // Badge
  s.addShape(pres.ShapeType.roundRect, {
    x: 1.0, y: 1.0, w: 3.6, h: 0.45, r: 0.2,
    fill: { color: '0E2A38' },
    line: { color: C.cyan, width: 1 }
  });
  s.addText('🛡️ KIBERXAVFSIZLIK AKADEMIYASI', {
    x: 1.0, y: 1.0, w: 3.6, h: 0.45,
    fontSize: 11, bold: true, color: C.cyan, align: 'center', valign: 'middle'
  });

  // Main Title
  s.addText('KiberQoriqchi', {
    x: 0.95, y: 1.6, w: 8.0, h: 1.2,
    fontSize: 54, bold: true, color: C.white, fontFace: 'Arial Black'
  });

  // Subtitle
  s.addText('Kiberxavflarni tushunish, himoyalanish va amaliy bilim olish uchun zamonaviy milliy web-platforma.', {
    x: 1.0, y: 2.85, w: 8.0, h: 0.8,
    fontSize: 18, color: C.textLightMuted, lineSpacingMultiple: 1.2
  });

  // Feature pills (3 in a row)
  const pills = [
    { text: '✓  100% O‘zbek tilida', x: 1.0 },
    { text: '✓  Brauzerda jonli laboratoriya', x: 3.8 },
    { text: '✓  APK & Telefon tahlili', x: 6.8 }
  ];
  pills.forEach(p => {
    s.addShape(pres.ShapeType.roundRect, {
      x: p.x, y: 3.8, w: 2.7, h: 0.5, r: 0.1,
      fill: { color: C.darkCard },
      line: { color: C.darkBorder, width: 1 }
    });
    s.addText(p.text, {
      x: p.x, y: 3.8, w: 2.7, h: 0.5,
      fontSize: 12, bold: true, color: C.green, align: 'center', valign: 'middle'
    });
  });

  // Website URL bar
  s.addText('🌐 kiber-xavfsizlik-boyicha-sayt.vercel.app', {
    x: 1.0, y: 4.75, w: 6.0, h: 0.4,
    fontSize: 13, color: C.cyan, bold: true
  });
}

// ── SLIDE 2: Taqqoslash (An'anaviy vs KiberQoriqchi) ───────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.lightBg };

  // Slide Title
  s.addText("An'anaviy ta'lim", {
    x: 0.8, y: 0.5, w: 4.0, h: 0.6,
    fontSize: 26, bold: true, color: 'DC2626', align: 'center'
  });
  s.addText("KiberQoriqchi akademiyasi", {
    x: 5.2, y: 0.5, w: 4.0, h: 0.6,
    fontSize: 26, bold: true, color: C.greenDark, align: 'center'
  });

  // Left Card (An'anaviy)
  s.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 1.2, w: 4.0, h: 3.8, r: 0.15,
    fill: { color: C.white },
    line: { color: 'FCA5A5', width: 1.5 }
  });
  s.addText([
    { text: '❌  Quruq nazariy ma\'ruzalar\n\n', options: { fontSize: 14, bold: true, color: '991B1B' } },
    { text: 'Faqat kitobiy ma\'lumotlar va slaydlar o\'qitiladi, amaliy ko\'nikma berilmaydi.\n\n', options: { fontSize: 12, color: C.textDark } },
    { text: '❌  Chet tillaridagi to\'siq\n\n', options: { fontSize: 14, bold: true, color: '991B1B' } },
    { text: 'Asosiy platformalar faqat ingliz yoki rus tilida, mahalliy aholiga tushunish qiyin.\n\n', options: { fontSize: 12, color: C.textDark } },
    { text: '❌  Himoya vositalarining yo\'qligi\n\n', options: { fontSize: 14, bold: true, color: '991B1B' } },
    { text: 'Kundalik Telegram viruslari va bank fishingini tekshirish imkoni yo\'q.', options: { fontSize: 12, color: C.textDark } }
  ], {
    x: 1.1, y: 1.5, w: 3.4, h: 3.2,
    lineSpacingMultiple: 1.1
  });

  // Right Card (KiberQoriqchi)
  s.addShape(pres.ShapeType.roundRect, {
    x: 5.2, y: 1.2, w: 4.0, h: 3.8, r: 0.15,
    fill: { color: C.white },
    line: { color: '86EFAC', width: 2 }
  });
  s.addText([
    { text: '✅  Brauzerda jonli amaliyot\n\n', options: { fontSize: 14, bold: true, color: C.greenDark } },
    { text: 'Real laboratoriyalar (CTF) va xavfsiz qumloq (sandbox) muhiti.\n\n', options: { fontSize: 12, color: C.textDark } },
    { text: '✅  100% Ona tilimizda\n\n', options: { fontSize: 14, bold: true, color: C.greenDark } },
    { text: 'Barcha tushunchalar, masalalar va AI maslahatchi o\'zbek tilida so\'zlashadi.\n\n', options: { fontSize: 12, color: C.textDark } },
    { text: '✅  Jonli tahlil qurollari\n\n', options: { fontSize: 14, bold: true, color: C.greenDark } },
    { text: 'APK Qo\'riqchi, telefon xavfsizlik paneli va bank kartasi fishing tekshiruvi.', options: { fontSize: 12, color: C.textDark } }
  ], {
    x: 5.5, y: 1.5, w: 3.4, h: 3.2,
    lineSpacingMultiple: 1.1
  });
}

// ── SLIDE 3: Raqamli muhitda 3 ta asosiy muammo ───────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.lightBg };

  s.addText('Raqamli muhitda 3 ta asosiy muammo', {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 28, bold: true, color: C.greenDark
  });
  s.addText('Kiberxavfsizlikni o‘rganish va kundalik hayotda eng ko‘p uchraydigan tahdidlar', {
    x: 0.8, y: 1.05, w: 8.4, h: 0.4,
    fontSize: 14, color: C.textMuted
  });

  const problems = [
    {
      num: '01',
      title: 'Phishing (Fishing)',
      desc: 'Soxta havola, xabar yoki to\'lov saytlari orqali fuqarolarning karta ma\'lumotlarini o\'g\'irlash holatlari keskin oshgan.',
      icon: '🎣',
      x: 0.8
    },
    {
      num: '02',
      title: 'Zaif parollar & 2FA yo\'qligi',
      desc: 'Oddiy yoki bir xil parollardan foydalanish, ikki bosqichli himoyaning yo\'qligi hisoblarni osonlikcha buzishga olib keladi.',
      icon: '🔑',
      x: 3.7
    },
    {
      num: '03',
      title: 'Zararli APK & Troyanlar',
      desc: 'Telegram va ijtimoiy tarmoqlarda "yordam puli" niqobi ostida tarqalayotgan virusli APK fayllar SMS va parollarni o\'g\'irlaydi.',
      icon: '🦠',
      x: 6.6
    }
  ];

  problems.forEach(p => {
    s.addShape(pres.ShapeType.roundRect, {
      x: p.x, y: 1.6, w: 2.6, h: 3.1, r: 0.15,
      fill: { color: C.white },
      line: { color: C.lightBorder, width: 1.5 }
    });
    // Header band inside card
    s.addShape(pres.ShapeType.roundRect, {
      x: p.x, y: 1.6, w: 2.6, h: 0.9, r: 0.15,
      fill: { color: 'FEE2E2' },
      line: { color: 'FEE2E2', width: 0 }
    });
    s.addText(p.icon + '  ' + p.num, {
      x: p.x + 0.2, y: 1.7, w: 2.2, h: 0.7,
      fontSize: 22, bold: true, color: 'DC2626'
    });
    s.addText(p.title, {
      x: p.x + 0.2, y: 2.6, w: 2.2, h: 0.6,
      fontSize: 15, bold: true, color: C.textDark
    });
    s.addText(p.desc, {
      x: p.x + 0.2, y: 3.25, w: 2.2, h: 1.3,
      fontSize: 11, color: C.textMuted, lineSpacingMultiple: 1.15
    });
  });

  // Footer banner
  s.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 4.85, w: 8.4, h: 0.5, r: 0.1,
    fill: { color: 'ECFDF5' },
    line: { color: 'A7F3D0', width: 1 }
  });
  s.addText('🎯 Maqsad — foydalanuvchini faqat ogohlantirish emas, balki himoyalanishni amalda o‘rgatish.', {
    x: 0.8, y: 4.85, w: 8.4, h: 0.5,
    fontSize: 12, bold: true, color: C.greenDark, align: 'center', valign: 'middle'
  });
}

// ── SLIDE 4: KiberQoriqchi — xavfsizlik bilimlari platformasi ──────────────
{
  const s = pres.addSlide();
  s.background = { color: C.lightBg };

  s.addText('KiberQoriqchi — operatsion xavfsizlik platformasi', {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 28, bold: true, color: C.greenDark
  });
  s.addText('Nazariyadan — haqiqiy amaliyotga o‘tishning yaxlit 3 bosqichli tizimi', {
    x: 0.8, y: 1.05, w: 8.4, h: 0.4,
    fontSize: 14, color: C.textMuted
  });

  const solutions = [
    {
      step: '1. Nazariya',
      title: 'Kiber-Savodxonlik',
      desc: 'Kiberxavfsizlik asoslarini sodda, qiziqarli va tushunarli ko\'rinishda 0 dan o\'rganish.',
      features: ['Kibergigiyena asoslari', 'Phishing turlarini fosh qilish', 'Parol va 2FA qoidalari'],
      x: 0.8
    },
    {
      step: '2. Amaliyot',
      title: 'Virtual Laboratoriyalar',
      desc: 'Real hayotdagi xavflarni xavfsiz sandbox muhitida sinab ko\'rish va bartaraf etish.',
      features: ['CTF (Bayroqni tut) topshiriqlari', 'Web zaifliklar (SQLi, XSS)', 'Linux va tarmoq sinovlari'],
      x: 3.7
    },
    {
      step: '3. Nazorat & Himoya',
      title: 'Jonlihimoya Asboblari',
      desc: 'Qurilma va fayllarni real vaqtda tekshiruvchi innovatsion o\'zbekcha vositalar.',
      features: ['APK Qo\'riqchi dekompilyatori', 'Telefon sozlamalarini 1-klikda tuzatish', 'CyberGuard AI maslahatchi'],
      x: 6.6
    }
  ];

  solutions.forEach(p => {
    s.addShape(pres.ShapeType.roundRect, {
      x: p.x, y: 1.6, w: 2.6, h: 3.6, r: 0.15,
      fill: { color: C.white },
      line: { color: 'BAE6FD', width: 1.5 }
    });
    s.addText(p.step, {
      x: p.x + 0.2, y: 1.8, w: 2.2, h: 0.35,
      fontSize: 12, bold: true, color: C.blue
    });
    s.addText(p.title, {
      x: p.x + 0.2, y: 2.15, w: 2.2, h: 0.45,
      fontSize: 16, bold: true, color: C.textDark
    });
    s.addText(p.desc, {
      x: p.x + 0.2, y: 2.65, w: 2.2, h: 0.9,
      fontSize: 11, color: C.textMuted, lineSpacingMultiple: 1.15
    });
    // Checkmarks
    const featText = p.features.map(f => '✔ ' + f).join('\n');
    s.addText(featText, {
      x: p.x + 0.2, y: 3.65, w: 2.2, h: 1.3,
      fontSize: 10, bold: true, color: C.greenDark, lineSpacingMultiple: 1.2
    });
  });
}

// ── SLIDE 5: Jonli Imkoniyatlar (3 Ta Telefon/Ekran Mockupi) ───────────────
{
  const s = pres.addSlide();
  s.background = { color: C.lightBg };

  s.addText('Jonli platforma vositalari', {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 28, bold: true, color: C.greenDark
  });
  s.addText('Saytda to\'liq ishlab turgan 3 ta asosiy himoya va tahlil vositasi', {
    x: 0.8, y: 1.05, w: 8.4, h: 0.4,
    fontSize: 14, color: C.textMuted
  });

  const mockups = [
    {
      title: 'APK Qo‘riqchi',
      subtitle: 'Android ilovalar tahlili',
      color: C.greenDark,
      bg: 'ECFDF5',
      items: [
        '📱 Noma\'lum APK fayllarni statik tekshirish',
        '🚨 Xavfli SMS, Kamera ruxsatlarini fosh qilish',
        '🔍 Shubhali URL va troyan signaturalari',
        '⚡ Test uchun tayyor APK namunalar'
      ],
      x: 0.8
    },
    {
      title: 'Telefon Xavfsizlik Paneli',
      subtitle: 'Qurilma sozlamalari auditi',
      color: C.blue,
      bg: 'F0F9FF',
      items: [
        '🔒 Ekran qulfi va biometrika tekshiruvi',
        '⚠️ Ochiq USB Debugging zaifligini aniqlash',
        '🛠️ "1-Click Fix" orqali zaiflikni tuzatish',
        '🛡️ APK Blokator qalqonini faollashtirish'
      ],
      x: 3.7
    },
    {
      title: 'Bank Kartasi & Kiber-Laboratoriya',
      subtitle: 'To\'lov xavfsizligi va CTF',
      color: C.orange,
      bg: 'FFFBEB',
      items: [
        '💳 Luhn algoritmi asosida karta tekshiruvi',
        '🎣 Fishing to\'lov sahifalarini aniqlash',
        '🏆 Virtual CTF laboratoriyalari (10+ xona)',
        '🤖 CyberGuard AI milliy maslahatchi'
      ],
      x: 6.6
    }
  ];

  mockups.forEach(m => {
    // Phone outline
    s.addShape(pres.ShapeType.roundRect, {
      x: m.x, y: 1.6, w: 2.6, h: 3.6, r: 0.25,
      fill: { color: C.white },
      line: { color: 'CBD5E1', width: 2 }
    });
    // Top bar
    s.addShape(pres.ShapeType.roundRect, {
      x: m.x + 0.15, y: 1.75, w: 2.3, h: 0.65, r: 0.15,
      fill: { color: m.bg },
      line: { color: m.color, width: 1 }
    });
    s.addText(m.title, {
      x: m.x + 0.2, y: 1.78, w: 2.2, h: 0.35,
      fontSize: 13, bold: true, color: m.color, align: 'center'
    });
    s.addText(m.subtitle, {
      x: m.x + 0.2, y: 2.1, w: 2.2, h: 0.25,
      fontSize: 9, color: C.textMuted, align: 'center'
    });

    // Content inside phone
    const bodyText = m.items.map(it => it).join('\n\n');
    s.addText(bodyText, {
      x: m.x + 0.2, y: 2.55, w: 2.2, h: 2.4,
      fontSize: 10, color: C.textDark, lineSpacingMultiple: 1.1
    });
  });
}

// ── SLIDE 6: Biznes Model ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.lightBg };

  s.addText('Biznes model', {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 32, bold: true, color: C.greenDark
  });
  s.addText('B2C va B2B segmentlarini birlashtiruvchi barqaror daromad modeli', {
    x: 0.8, y: 1.1, w: 8.4, h: 0.4,
    fontSize: 15, color: C.textMuted
  });

  // Card 1: Bepul
  s.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 1.7, w: 2.6, h: 3.4, r: 0.15,
    fill: { color: C.white },
    line: { color: C.lightBorder, width: 1.5 }
  });
  s.addText('Boshlang‘ich ta‘lim', {
    x: 1.0, y: 1.9, w: 2.2, h: 0.4,
    fontSize: 16, bold: true, color: C.textDark, align: 'center'
  });
  s.addText('Aholiga bepul kibergigiyena, asosiy testlar va 5 ta laboratoriya.', {
    x: 1.0, y: 2.3, w: 2.2, h: 0.8,
    fontSize: 11, color: C.textMuted, align: 'center'
  });
  s.addShape(pres.ShapeType.roundRect, {
    x: 1.1, y: 4.2, w: 2.0, h: 0.6, r: 0.3,
    fill: { color: C.greenDark }
  });
  s.addText('0$ / Bepul', {
    x: 1.1, y: 4.2, w: 2.0, h: 0.6,
    fontSize: 16, bold: true, color: C.white, align: 'center', valign: 'middle'
  });

  // Card 2: PRO Obuna
  s.addShape(pres.ShapeType.roundRect, {
    x: 3.7, y: 1.7, w: 2.6, h: 3.4, r: 0.15,
    fill: { color: C.white },
    line: { color: C.greenDark, width: 2 }
  });
  s.addText('PRO Obuna (B2C)', {
    x: 3.9, y: 1.9, w: 2.2, h: 0.4,
    fontSize: 16, bold: true, color: C.greenDark, align: 'center'
  });
  s.addText('Ilg\'or CTF xonalar, Red/Blue Team kurslari, chuqur APK dekompilyatsiya, rasmiy sertifikat.', {
    x: 3.9, y: 2.3, w: 2.2, h: 0.8,
    fontSize: 11, color: C.textMuted, align: 'center'
  });
  s.addShape(pres.ShapeType.roundRect, {
    x: 4.0, y: 4.2, w: 2.0, h: 0.6, r: 0.3,
    fill: { color: C.greenDark }
  });
  s.addText('15$ / oylik', {
    x: 4.0, y: 4.2, w: 2.0, h: 0.6,
    fontSize: 16, bold: true, color: C.white, align: 'center', valign: 'middle'
  });

  // Card 3: B2B Korporativ
  s.addShape(pres.ShapeType.roundRect, {
    x: 6.6, y: 1.7, w: 2.6, h: 3.4, r: 0.15,
    fill: { color: C.white },
    line: { color: C.lightBorder, width: 1.5 }
  });
  s.addText('Korporativ (B2B)', {
    x: 6.8, y: 1.9, w: 2.2, h: 0.4,
    fontSize: 16, bold: true, color: C.blue, align: 'center'
  });
  s.addText('Banklar va kompaniyalar xodimlari uchun kiber-audit, fishing simulyatsiyalari va hisobot.', {
    x: 6.8, y: 2.3, w: 2.2, h: 0.8,
    fontSize: 11, color: C.textMuted, align: 'center'
  });
  s.addShape(pres.ShapeType.roundRect, {
    x: 6.9, y: 4.2, w: 2.0, h: 0.6, r: 0.3,
    fill: { color: C.blue }
  });
  s.addText('500$+ / korxona', {
    x: 6.9, y: 4.2, w: 2.0, h: 0.6,
    fontSize: 15, bold: true, color: C.white, align: 'center', valign: 'middle'
  });
}

// ── SLIDE 7: Raqobatchilar Analizi ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  s.addText('Raqobatchilar analizi', {
    x: 0.8, y: 0.4, w: 8.4, h: 0.6,
    fontSize: 30, bold: true, color: C.greenDark
  });

  // Table
  const tableData = [
    [
      { text: 'Xususiyatlar', options: { bold: true, fill: 'F1F5F9' } },
      { text: 'KiberQoriqchi', options: { bold: true, fill: '10B981', color: 'FFFFFF' } },
      { text: 'TryHackMe', options: { bold: true, fill: 'F1F5F9' } },
      { text: 'Oddiy maqola', options: { bold: true, fill: 'F1F5F9' } },
      { text: 'An\'anaviy kurs', options: { bold: true, fill: 'F1F5F9' } }
    ],
    [
      { text: '100% O‘zbek tilida' },
      { text: '✔', options: { fill: 'ECFDF5', color: '059669', bold: true } },
      { text: '✖', options: { color: 'DC2626' } },
      { text: '△', options: { color: 'D97706' } },
      { text: '✔', options: { color: '059669' } }
    ],
    [
      { text: 'Brauzerda jonli laboratoriya' },
      { text: '✔', options: { fill: 'ECFDF5', color: '059669', bold: true } },
      { text: '✔', options: { color: '059669' } },
      { text: '✖', options: { color: 'DC2626' } },
      { text: '✖', options: { color: 'DC2626' } }
    ],
    [
      { text: 'APK & Telefon xavfsizlik vositasi' },
      { text: '✔', options: { fill: 'ECFDF5', color: '059669', bold: true } },
      { text: '✖', options: { color: 'DC2626' } },
      { text: '✖', options: { color: 'DC2626' } },
      { text: '✖', options: { color: 'DC2626' } }
    ],
    [
      { text: 'Mahalliy bank fishingidan himoya' },
      { text: '✔', options: { fill: 'ECFDF5', color: '059669', bold: true } },
      { text: '✖', options: { color: 'DC2626' } },
      { text: '△', options: { color: 'D97706' } },
      { text: '✖', options: { color: 'DC2626' } }
    ],
    [
      { text: 'CyberGuard AI assistenti' },
      { text: '✔', options: { fill: 'ECFDF5', color: '059669', bold: true } },
      { text: '✖', options: { color: 'DC2626' } },
      { text: '✖', options: { color: 'DC2626' } },
      { text: '✖', options: { color: 'DC2626' } }
    ],
    [
      { text: 'Qulay narx (Uzcard / Humo)' },
      { text: '✔', options: { fill: 'ECFDF5', color: '059669', bold: true } },
      { text: '✖ ($14+/oy)', options: { color: 'DC2626' } },
      { text: '✔ (Bepul)', options: { color: '059669' } },
      { text: '✖ (Qimmat)', options: { color: 'DC2626' } }
    ]
  ];

  s.addTable(tableData, {
    x: 0.8, y: 1.1, w: 8.4, h: 3.8,
    fontSize: 11,
    align: 'center',
    valign: 'middle',
    border: { pt: 1, color: 'E2E8F0' }
  });

  s.addText('Belgilar:  ✔ — to‘liq mavjud  |  ✖ — mavjud emas  |  △ — qisman', {
    x: 0.8, y: 5.05, w: 8.4, h: 0.35,
    fontSize: 10, color: C.textMuted, align: 'center'
  });
}

// ── SLIDE 8: O'zbekistonda Bozor Imkoniyati ($50M+) ─────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: '064E3B' }; // Deep emerald green

  s.addText('O‘zbekistonda $50M+ kiber-bozor', {
    x: 0.8, y: 0.45, w: 8.4, h: 0.6,
    fontSize: 32, bold: true, color: C.white
  });

  // Left column (TAM / SAM / SOM in blue cards)
  const leftCards = [
    { num: '$50M+', label: 'TAM — Umumiy kiber-bozor hajmi', y: 1.25 },
    { num: '$15M', label: 'SAM — Maqsadli ta\'lim va audit bozori', y: 2.55 },
    { num: '$1.2M', label: 'SOM — 1-yilda erishiladigan bozor ulushi', y: 3.85 }
  ];
  leftCards.forEach(c => {
    s.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: c.y, w: 4.0, h: 1.1, r: 0.15,
      fill: { color: '0284C7' }
    });
    s.addText(c.num, {
      x: 1.0, y: c.y + 0.1, w: 3.6, h: 0.5,
      fontSize: 28, bold: true, color: C.white
    });
    s.addText(c.label, {
      x: 1.0, y: c.y + 0.6, w: 3.6, h: 0.4,
      fontSize: 11, color: 'BAE6FD'
    });
  });

  // Right column (Orange cards)
  const rightCards = [
    { num: '32M+', label: 'O‘zbekistondagi smartfon va internet egalari', y: 1.25 },
    { num: '25%', label: 'Kiberxavfsizlik sohasining yillik o‘sishi (CAGR)', y: 2.55 },
    { num: '95% / 5%', label: 'Himoyasiz foydalanuvchilar va ongli mutaxassislar nisbati', y: 3.85 }
  ];
  rightCards.forEach(c => {
    s.addShape(pres.ShapeType.roundRect, {
      x: 5.2, y: c.y, w: 4.0, h: 1.1, r: 0.15,
      fill: { color: 'EA580C' }
    });
    s.addText(c.num, {
      x: 5.4, y: c.y + 0.1, w: 3.6, h: 0.5,
      fontSize: 28, bold: true, color: C.white
    });
    s.addText(c.label, {
      x: 5.4, y: c.y + 0.6, w: 3.6, h: 0.4,
      fontSize: 11, color: 'FFEDD5'
    });
  });
}

// ── SLIDE 9: Test Jarayoni Muvaffaqiyatli O'tdi (Traction) ────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.lightBg };

  s.addText('Test jarayoni muvaffaqiyatli o‘tdi', {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 32, bold: true, color: C.greenDark
  });
  s.addText('MVP versiya allaqachon Vercel bulutida 24/7 rejimida ishlab turibdi', {
    x: 0.8, y: 1.1, w: 8.4, h: 0.4,
    fontSize: 15, color: C.textMuted
  });

  const stats = [
    { num: '10+', label: 'Tayyor interaktiv\nlaboratoriya xonasi', x: 0.8 },
    { num: '3', label: 'To‘liq qo‘llab-quvvatlanuvchi\ntillar (UZ, RU, EN)', x: 3.7 },
    { num: '98%', label: 'Dastlabki sinovchilardan\nolingan ijobiy baho', x: 6.6 }
  ];

  stats.forEach(st => {
    s.addShape(pres.ShapeType.roundRect, {
      x: st.x, y: 1.8, w: 2.6, h: 2.8, r: 0.15,
      fill: { color: C.white },
      line: { color: C.lightBorder, width: 1.5 }
    });
    s.addText(st.num, {
      x: st.x, y: 2.1, w: 2.6, h: 1.0,
      fontSize: 54, bold: true, color: C.greenDark, align: 'center'
    });
    s.addText(st.label, {
      x: st.x + 0.2, y: 3.3, w: 2.2, h: 0.9,
      fontSize: 13, bold: true, color: C.textDark, align: 'center', lineSpacingMultiple: 1.2
    });
  });
}

// ── SLIDE 10: Roadmap (2026 - 2029) ───────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.lightBg };

  s.addText('Roadmap', {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 32, bold: true, color: C.greenDark
  });
  s.addText('Platformani bosqichma-bosqich kengaytirish va rivojlantirish rejasi', {
    x: 0.8, y: 1.1, w: 8.4, h: 0.4,
    fontSize: 15, color: C.textMuted
  });

  const timeline = [
    { year: '2026 yil', num: '1-Bosqich', title: 'Web MVP va Laboratoriyalar', desc: 'Asosiy platforma, mavzular, testlar va APK tahlili', x: 0.8 },
    { year: '2027 yil', num: '2-Bosqich', title: 'Telegram Bot & Mobil Ilova', desc: 'Telegram orqali avtomatik tahlil va mobil ilovalar', x: 2.95 },
    { year: '2028 yil', num: '3-Bosqich', title: 'B2B Korporativ Audit', desc: 'Banklar va korxonalar uchun maxsus audit modullari', x: 5.1 },
    { year: '2029 yil', num: '4-Bosqich', title: 'Markaziy Osiyo & AI', desc: 'Qozog\'iston, Qirg\'iziston bozorlariga kengayish', x: 7.25 }
  ];

  timeline.forEach(t => {
    // Year label
    s.addText(t.year, {
      x: t.x, y: 1.7, w: 2.0, h: 0.4,
      fontSize: 14, bold: true, color: C.textMuted, align: 'center'
    });
    // Card
    s.addShape(pres.ShapeType.roundRect, {
      x: t.x, y: 2.2, w: 2.0, h: 2.6, r: 0.15,
      fill: { color: C.white },
      line: { color: C.greenDark, width: 1.5 }
    });
    s.addText(t.num, {
      x: t.x + 0.1, y: 2.35, w: 1.8, h: 0.4,
      fontSize: 16, bold: true, color: C.greenDark, align: 'center'
    });
    s.addText(t.title, {
      x: t.x + 0.1, y: 2.8, w: 1.8, h: 0.6,
      fontSize: 12, bold: true, color: C.textDark, align: 'center'
    });
    s.addText(t.desc, {
      x: t.x + 0.1, y: 3.45, w: 1.8, h: 1.1,
      fontSize: 10, color: C.textMuted, align: 'center'
    });
  });
}

// ── SLIDE 11: Bizning Jamoa ───────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.lightBg };

  s.addText('Bizning jamoa', {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 32, bold: true, color: C.greenDark
  });
  s.addText('Kiberxavfsizlik, dasturiy ta\'minot va sun\'iy intellekt muhandislari', {
    x: 0.8, y: 1.1, w: 8.4, h: 0.4,
    fontSize: 15, color: C.textMuted
  });

  const team = [
    { name: 'KiberQoriqchi Founder', role: 'Founder & CEO', exp: 'Kiberxavfsizlik mutaxassisi', x: 0.8 },
    { name: 'Frontend Engineer', role: 'Frontend Lead', exp: 'React, Vite, UI/UX 3+ yil', x: 2.95 },
    { name: 'Backend & Cloud', role: 'Backend Lead', exp: 'Node.js, Docker, Sandbox 4+ yil', x: 5.1 },
    { name: 'AI & Reverse Engineer', role: 'Security Analyst', exp: 'APK tahlili va LLM integratsiyasi', x: 7.25 }
  ];

  team.forEach(m => {
    s.addShape(pres.ShapeType.roundRect, {
      x: m.x, y: 1.8, w: 2.0, h: 3.0, r: 0.15,
      fill: { color: C.white },
      line: { color: C.lightBorder, width: 1.5 }
    });
    // Avatar circle placeholder
    s.addShape(pres.ShapeType.oval, {
      x: m.x + 0.45, y: 2.0, w: 1.1, h: 1.1,
      fill: { color: 'E2E8F0' },
      line: { color: C.greenDark, width: 2 }
    });
    s.addText('👤', {
      x: m.x + 0.45, y: 2.15, w: 1.1, h: 0.8,
      fontSize: 26, align: 'center'
    });
    s.addText(m.name, {
      x: m.x + 0.1, y: 3.3, w: 1.8, h: 0.4,
      fontSize: 12, bold: true, color: C.textDark, align: 'center'
    });
    s.addText(m.role, {
      x: m.x + 0.1, y: 3.7, w: 1.8, h: 0.3,
      fontSize: 11, bold: true, color: C.greenDark, align: 'center'
    });
    s.addText(m.exp, {
      x: m.x + 0.1, y: 4.05, w: 1.8, h: 0.6,
      fontSize: 9, color: C.textMuted, align: 'center'
    });
  });
}

// ── SLIDE 12: Investitsiya va Xulosa ──────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: '064E3B' }; // Deep emerald green

  s.addText('Investitsiya: 80 000$', {
    x: 0.8, y: 0.5, w: 5.0, h: 0.6,
    fontSize: 32, bold: true, color: C.white
  });
  s.addText('12 oy  •  100 000+ faol foydalanuvchi  •  B2B integratsiya', {
    x: 0.8, y: 1.1, w: 8.4, h: 0.4,
    fontSize: 14, color: 'A7F3D0'
  });

  // Allocation cards
  const allocations = [
    { pct: '50%', title: 'AI & Virtual Lab Infratuzilmasi', sub: 'Bulutli sandbox konteynerlar va CyberGuard AI serverlari', y: 1.7 },
    { pct: '30%', title: 'Mobil Ilova & Telegram Bot', sub: 'Android / iOS ilovalari va avtomatik APK skaner boti', y: 2.8 },
    { pct: '20%', title: 'Marketing & Ta\'lim Hamkorliklari', sub: 'OTMlar, maktablar va banklar bilan hamkorlik kampaniyalari', y: 3.9 }
  ];

  allocations.forEach(a => {
    s.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: a.y, w: 5.5, h: 0.95, r: 0.15,
      fill: { color: '047857' }
    });
    s.addText(a.pct, {
      x: 1.0, y: a.y + 0.15, w: 1.0, h: 0.65,
      fontSize: 24, bold: true, color: C.white, align: 'center'
    });
    s.addText(a.title, {
      x: 2.1, y: a.y + 0.15, w: 4.0, h: 0.35,
      fontSize: 13, bold: true, color: C.white
    });
    s.addText(a.sub, {
      x: 2.1, y: a.y + 0.5, w: 4.0, h: 0.35,
      fontSize: 10, color: 'D1FAE5'
    });
  });

  // Right card: QR Code & Website Box
  s.addShape(pres.ShapeType.roundRect, {
    x: 6.7, y: 1.7, w: 2.5, h: 3.15, r: 0.15,
    fill: { color: C.white }
  });
  s.addText('Saytni ochish', {
    x: 6.8, y: 1.85, w: 2.3, h: 0.35,
    fontSize: 13, bold: true, color: C.textDark, align: 'center'
  });

  // Try adding qr image if exists
  const qrPath = path.resolve('public', 'apk-qr.png');
  if (fs.existsSync(qrPath)) {
    try {
      s.addImage({
        path: qrPath,
        x: 7.15, y: 2.25, w: 1.6, h: 1.6
      });
    } catch (e) {
      console.log('QR image add failed: ', e.message);
    }
  }

  s.addText('kiber-xavfsizlik-boyicha-sayt.vercel.app', {
    x: 6.8, y: 3.95, w: 2.3, h: 0.45,
    fontSize: 8.5, bold: true, color: C.blue, align: 'center'
  });
  s.addText('E’tiboringiz uchun rahmat!', {
    x: 6.8, y: 4.4, w: 2.3, h: 0.35,
    fontSize: 10, bold: true, color: C.greenDark, align: 'center'
  });
}

// Write to files
const outRoot = path.resolve('KiberQoriqchi_PitchDeck.pptx');
const outPublic = path.resolve('public', 'KiberQoriqchi_PitchDeck.pptx');

pres.writeFile({ fileName: outRoot }).then(f => {
  console.log('Successfully generated PPTX in root: ' + f);
  // Also copy to public for web downloading
  fs.copyFileSync(outRoot, outPublic);
  console.log('Copied to public folder: ' + outPublic);
}).catch(err => {
  console.error('Error generating PPTX:', err);
});
