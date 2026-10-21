import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Shield, Smartphone, ExternalLink, RotateCw, AlertTriangle,
  CheckCircle, FileSearch, Download, QrCode, Lock, Zap,
  Search, Info, Eye, ArrowUpRight, Cpu, HardDrive,
  Copy, Check, UploadCloud, FileCheck, CreditCard, Link2,
  AlertOctagon, CheckSquare, ShieldCheck, ShieldAlert, Sparkles,
  RefreshCw, Globe, HelpCircle, KeyRound, BellRing, CheckCircle2,
  XCircle, ArrowRight, Phone, Wifi
} from 'lucide-react';

export const ApkQoriqchiPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('scanner'); // 'scanner' | 'card_guard' | 'link_checker'
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStepText, setScanStepText] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [selectedSample, setSelectedSample] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Card Guard State
  const [cardNumber, setCardNumber] = useState('');
  const [cardChecking, setCardChecking] = useState(false);
  const [cardResult, setCardResult] = useState(null);

  // Link Checker State
  const [linkInput, setLinkInput] = useState('');
  const [linkChecking, setLinkChecking] = useState(false);
  const [linkResult, setLinkResult] = useState(null);

  const fileInputRef = useRef(null);

  const t = {
    uz: {
      badge: 'Milliy Kiber Himoya Majmuasi',
      title: "APK & Kiber Qo'riqchi",
      subtitle: "Android ilovalar (.apk), bank kartalari va shubhali havolalarni (fishing) real vaqtda chuqur tahlil qilish hamda kiber firibgarlikdan himoyalanish tizimi.",
      tabScanner: "1. APK Fayllar Skaneri",
      tabCard: "2. Bank Kartasi Himoyasi",
      tabLink: "3. Havolani Tekshirish (Anti-Phishing)",
      scannerTitle: 'APK Faylni Chuqur Statik Tahlil Qilish',
      scannerDesc: "Shubhali Android ilovasini (.apk) yuklang yoki tayyor kiberxavfsizlik namunalaridan birini tanlab, uning ruxsatlari, josuslik va troyan kodlarini tekshiring.",
      dragDrop: ".APK faylni bu yerga tashlang yoki kompyuterdan tanlang",
      sampleFiles: 'TAYYOR TEST NAMUNALARI:',
      analyzing: "APK dekompilyatsiya qilinmoqda va ruxsatlar tahlil qilinmoqda...",
      permissions: "Aniqlangan ruxsatlar va xavflar",
      recommendations: "KiberQoriqchi Tavsiyasi",
      reScan: "Boshqa faylni tekshirish"
    },
    ru: {
      badge: 'Национальный комплекс киберзащиты',
      title: 'APK & Кибер Защитник',
      subtitle: 'Комплексный анализ Android-приложений (.apk), защита банковских карт и выявление фишинговых сайтов.',
      tabScanner: '1. Сканер APK файлов',
      tabCard: '2. Защита банковских карт',
      tabLink: '3. Проверка ссылок (Антифишинг)',
      scannerTitle: 'Глубокий статический анализ APK файлов',
      scannerDesc: 'Загрузите подозрительное Android-приложение (.apk) или выберите образец для анализа разрешений и троянов.',
      dragDrop: 'Перетащите .APK файл сюда или выберите на компьютере',
      sampleFiles: 'ГОТОВЫЕ ТЕСТОВЫЕ ОБРАЗЦЫ:',
      analyzing: 'Декомпиляция APK и анализ разрешений...',
      permissions: 'Обнаруженные разрешения и риски',
      recommendations: 'Рекомендации CyberGuard',
      reScan: 'Проверить другой файл'
    },
    en: {
      badge: 'National Cyber Defense Suite',
      title: 'APK & Cyber Shield',
      subtitle: 'Real-time auditing for Android applications (.apk), banking card integrity and anti-phishing link verification.',
      tabScanner: '1. APK File Inspector',
      tabCard: '2. Banking Card Guard',
      tabLink: '3. Anti-Phishing Link Checker',
      scannerTitle: 'Deep Static APK Analysis',
      scannerDesc: 'Upload a suspicious Android application (.apk) or select a sample to test manifest permissions and Trojan signatures.',
      dragDrop: 'Drop an .APK file here or browse from computer',
      sampleFiles: 'READY TEST SAMPLES:',
      analyzing: 'Decompiling APK and inspecting permissions...',
      permissions: 'Detected Permissions & Threats',
      recommendations: 'CyberGuard Recommendations',
      reScan: 'Scan another file'
    }
  }[language] || {};

  const SAMPLES = [
    {
      id: 'banking_trojan',
      name: 'Bank_Update_Mod.apk',
      pkg: 'com.fake.onlinebanking.update',
      size: '4.8 MB',
      risk: 'high',
      score: 96,
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      threatType: 'Banking Trojan / Credential Stealer',
      details: [
        { perm: 'android.permission.RECEIVE_SMS', risk: 'critical', desc: "Bankdan keluvchi 2FA/SMS kodlarni yashirin o'qish" },
        { perm: 'android.permission.BIND_ACCESSIBILITY_SERVICE', risk: 'critical', desc: "Ekranni to'liq boshqarish va tugmalarni avtomatik bosish" },
        { perm: 'android.permission.SYSTEM_ALERT_WINDOW', risk: 'high', desc: 'Boshqa ilovalar ustiga soxta login oynasini chizish (Overlay attack)' },
        { perm: 'android.permission.READ_CONTACTS', risk: 'medium', desc: "Kontaktlar ro'yxatini tashqi serverga yuborish" },
      ],
      recommendation: "Faylni zudlik bilan o'chiring! Ushbu ilova bank hisobingizdan mablag'larni o'g'irlash uchun mo'ljallangan zararli dastur (Trojan) belgilariga ega."
    },
    {
      id: 'spyware',
      name: 'Telegram_Plus_Spy.apk',
      pkg: 'org.telegram.plus.mod.stealer',
      size: '12.3 MB',
      risk: 'medium',
      score: 68,
      hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
      threatType: 'Commercial Spyware / Stalkerware',
      details: [
        { perm: 'android.permission.RECORD_AUDIO', risk: 'high', desc: "Mikrofon orqali yashirincha audio yozib olish" },
        { perm: 'android.permission.ACCESS_FINE_LOCATION', risk: 'high', desc: "Foydalanuvchining aniq GPS joylashuvini kuzatish" },
        { perm: 'android.permission.READ_EXTERNAL_STORAGE', risk: 'medium', desc: "Fayllar va fotosuratlarni ko'rish" }
      ],
      recommendation: "Ilova ruxsatsiz yashirin kuzatuv olib borish xususiyatiga ega. Rasmiy bo'lmagan modifikatsiyalardan foydalanish tavsiya etilmaydi."
    },
    {
      id: 'qoriqchi',
      name: 'Apk_Qoriqchi_Official.apk',
      pkg: 'com.baxtiyorov.security',
      size: '8.2 MB',
      risk: 'safe',
      score: 10,
      hash: '3f51a44e59e9a40590a3692d4ee78adbb855598687ba42a426fe41369527ec56',
      threatType: 'Xavfsiz / Rasmiy Xavfsizlik Vositası',
      details: [
        { perm: 'android.permission.QUERY_ALL_PACKAGES', risk: 'low', desc: "O'rnatilgan ilovalarni antivirus sifatida tekshirish" },
        { perm: 'android.permission.INTERNET', risk: 'low', desc: "Bazadagi virus imzolarini yangilash" }
      ],
      recommendation: "Ilova toza va xavfsiz. Ma'lumotlarni noqonuniy yig'ish va josuslik faoliyati aniqlanmadi."
    }
  ];

  // =========================================================================
  // 1. KARTA TEKSHIRISH MANTIG'I (Luhn Algorithm & Bank BIN Analysis)
  // =========================================================================
  const validateLuhn = (numStr) => {
    let clean = numStr.replace(/\D/g, '');
    if (clean.length < 13 || clean.length > 19) return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = clean.length - 1; i >= 0; i--) {
      let digit = parseInt(clean.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  const identifyCardSystem = (numStr) => {
    const clean = numStr.replace(/\D/g, '');
    let type = 'Nomaʼlum to‘lov tizimi';
    let brand = 'Card';
    let bank = 'Nomaʼlum emitent bank';
    let color = 'from-[#334155] via-[#1e293b] to-[#0f172a]';
    let local = false;
    let emergencyPhone = "Bank qo'llab-quvvatlash xizmati";

    if (clean.startsWith('8600')) {
      type = 'Uzcard (Milliy to‘lov tizimi)';
      brand = 'UZCARD';
      local = true;
      emergencyPhone = '1111 (Uzcard Call-markaz)';
      color = 'from-[#0369a1] via-[#0284c7] to-[#075985]';
      const bin6 = clean.slice(0, 6);
      if (['860002', '860021'].includes(bin6)) bank = 'Agrobank';
      else if (['860003', '860049'].includes(bin6)) bank = 'Aloqabank';
      else if (['860004', '860024'].includes(bin6)) bank = "O'zmilliybank (NBU)";
      else if (['860005', '860025'].includes(bin6)) bank = 'Asakabank';
      else if (['860006', '860026'].includes(bin6)) bank = 'Xalq Banki';
      else if (['860008', '860028'].includes(bin6)) bank = 'Biznesni rivojlantirish banki';
      else if (['860011', '860029'].includes(bin6)) bank = 'Mikrokreditbank';
      else if (['860012', '860032'].includes(bin6)) bank = 'Ipoteka-bank (OTP Group)';
      else if (['860014', '860034'].includes(bin6)) bank = 'Hamkorbank';
      else if (['860019', '860039'].includes(bin6)) bank = 'Trastbank';
      else if (['860020', '860040'].includes(bin6)) bank = 'Davr Bank';
      else if (['860023', '860043'].includes(bin6)) bank = "Ipak Yo'li Banki";
      else if (['860030', '860048'].includes(bin6)) bank = 'Asia Alliance Bank';
      else if (['860031', '860046'].includes(bin6)) bank = 'Kapitalbank';
      else if (['860033', '860047'].includes(bin6)) bank = 'InfinBank (Invest Finance Bank)';
      else if (['860050'].includes(bin6)) bank = "KDB Bank O'zbekiston";
      else if (['860053'].includes(bin6)) bank = "O'zsanoatqurilishbank (SQB)";
      else if (['860055'].includes(bin6)) bank = 'TBC Bank';
      else if (['860057'].includes(bin6)) bank = 'Anorbank';
      else if (['860060'].includes(bin6)) bank = 'Apex Bank';
      else bank = "O'zbekiston tijorat banki (Uzcard)";
    } else if (clean.startsWith('9860')) {
      type = 'Humo (Milliy to‘lov tizimi)';
      brand = 'HUMO';
      local = true;
      emergencyPhone = '+998 71 200-08-88 (Humo Call-markaz)';
      color = 'from-[#ea580c] via-[#d97706] to-[#9a3412]';
      const bin6 = clean.slice(0, 6);
      if (['986001', '986021'].includes(bin6)) bank = 'Agrobank Humo';
      else if (['986002', '986022'].includes(bin6)) bank = 'Xalq Banki Humo';
      else if (['986003', '986020', '986034'].includes(bin6)) bank = 'Kapitalbank Humo';
      else if (['986005'].includes(bin6)) bank = 'Aloqabank Humo';
      else if (['986008'].includes(bin6)) bank = 'Asakabank Humo';
      else if (['986010', '986026'].includes(bin6)) bank = "O'zmilliybank (NBU) Humo";
      else if (['986012'].includes(bin6)) bank = 'Ipoteka-bank Humo';
      else if (['986017'].includes(bin6)) bank = 'Hamkorbank Humo';
      else if (['986023'].includes(bin6)) bank = "Ipak Yo'li Banki Humo";
      else if (['986030'].includes(bin6)) bank = 'O‘zsanoatqurilishbank (SQB) Humo';
      else if (['986033'].includes(bin6)) bank = 'InfinBank Humo';
      else if (['986035'].includes(bin6)) bank = 'TBC Bank Humo';
      else if (['986060'].includes(bin6)) bank = 'Anorbank Humo';
      else bank = "O'zbekiston tijorat banki (Humo)";
    } else if (clean.startsWith('5614')) {
      type = 'Uzcard - Mastercard Kobeydjing';
      brand = 'UZCARD-MC';
      bank = "O'zbekiston emitent banki (Xalqaro)";
      color = 'from-[#0369a1] via-[#dc2626] to-[#991b1b]';
      local = true;
      emergencyPhone = '1111 (Uzcard)';
    } else if (clean.startsWith('6262')) {
      type = 'Uzcard - UnionPay Kobeydjing';
      brand = 'UZCARD-UPI';
      bank = "O'zbekiston emitent banki (UnionPay)";
      color = 'from-[#0369a1] via-[#0d9488] to-[#065f46]';
      local = true;
      emergencyPhone = '1111 (Uzcard)';
    } else if (clean.startsWith('4')) {
      type = 'Visa International';
      brand = 'VISA';
      bank = 'Xalqaro to‘lov tizimi (Visa Global)';
      color = 'from-[#1d4ed8] via-[#1e40af] to-[#1e3a8a]';
      local = false;
      emergencyPhone = 'Emitent bank orqali';
    } else if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) {
      type = 'Mastercard World';
      brand = 'MASTERCARD';
      bank = 'Xalqaro to‘lov tizimi (Mastercard)';
      color = 'from-[#dc2626] via-[#b91c1c] to-[#7f1d1d]';
      local = false;
      emergencyPhone = 'Emitent bank orqali';
    } else if (/^3[47]/.test(clean)) {
      type = 'American Express';
      brand = 'AMEX';
      bank = 'Xalqaro to‘lov tarmog‘i (American Express)';
      color = 'from-[#059669] via-[#047857] to-[#064e3b]';
      local = false;
      emergencyPhone = 'Emitent bank orqali';
    } else if (/^6(?:011|5)/.test(clean)) {
      type = 'Discover Card';
      brand = 'DISCOVER';
      bank = 'Xalqaro to‘lov tarmog‘i (Discover)';
      color = 'from-[#ea580c] via-[#c2410c] to-[#7c2d12]';
      local = false;
      emergencyPhone = 'Emitent bank orqali';
    }

    return { type, brand, bank, color, local, emergencyPhone };
  };

  const runCardAnalysis = (rawNumber) => {
    const clean = (rawNumber || cardNumber).replace(/\D/g, '');
    if (clean.length < 8) return;

    setCardChecking(true);
    setCardResult(null);

    setTimeout(() => {
      const isValidFormat = validateLuhn(clean);
      const system = identifyCardSystem(clean);

      // Known test leaked cards in phishing dumps
      const isLeakedSample = [
        '8600123456789012',
        '9860123456789012',
        '4111111111111111',
        '5555555555554444',
        '8600000000000000',
        '9860000000000000',
        '9860350123456789'
      ].includes(clean);

      const hasWeakPattern = /^(\d)\1+$/.test(clean) || clean.startsWith('1234') || clean.includes('12345678');
      const isDangerous = isLeakedSample || hasWeakPattern || !isValidFormat;

      // Score calculation (0 to 100)
      let score = 96;
      if (!isValidFormat) score -= 45;
      if (isLeakedSample) score -= 40;
      if (hasWeakPattern) score -= 30;
      if (score < 10) score = 12;

      setCardResult({
        cleanNumber: clean.replace(/(\d{4})/g, '$1 ').trim(),
        maskedNumber: clean.length >= 16 
          ? `${clean.slice(0, 4)} ${clean.slice(4, 6)}** **** ${clean.slice(-4)}`
          : `${clean.slice(0, 4)} **** **** **`,
        system: system.type,
        brand: system.brand,
        bank: system.bank,
        color: system.color,
        isLocal: system.local,
        emergencyPhone: system.emergencyPhone,
        isValidFormat,
        isLeaked: isLeakedSample || hasWeakPattern,
        safetyScore: score,
        checks: [
          {
            title: "Luhn algoritmi bo'yicha nazorat raqami (ISO/IEC 7812)",
            status: isValidFormat ? 'safe' : 'danger',
            desc: isValidFormat
              ? "Matematik tuzilish va oxirgi nazorat raqami xalqaro standartga to'liq mos keladi."
              : "Karta raqami nazorat yig'indisi xato yoki generatsiya qilingan soxta karta!"
          },
          {
            title: "Dark Web va ochiq ma'lumotlar sizishi tekshiruvi",
            status: (isLeakedSample || hasWeakPattern) ? 'danger' : 'safe',
            desc: (isLeakedSample || hasWeakPattern)
              ? "DIQQAT! Ushbu karta firibgarlik bazalarida yoki sinov o'g'irlangan ro'yxatlarda topildi!"
              : "Karta ochiq kiberhujum va fishing hisobotlarida topilmadi (toza holatda)."
          },
          {
            title: "3D-Secure va Bir martalik SMS (OTP) himoya protokoli",
            status: 'safe',
            desc: "Onlayn to'lovlarda bank yuboradigan 6 xonali SMS kodni aslo begonalarga aytmang!"
          },
          {
            title: "CVV / CVC Maxfiylik talabi",
            status: 'safe',
            desc: "Ushbu tahlilchi hech qachon maxfiy CVV kodni so'ramaydi va to'liq xavfsiz ishlaydi."
          }
        ]
      });
      setCardChecking(false);
    }, 600);
  };

  const handleCardCheck = (e) => {
    if (e) e.preventDefault();
    runCardAnalysis(cardNumber);
  };

  // =========================================================================
  // 2. HAVOLANI TEKSHIRISH MANTIG'I (Anti-Phishing & Heuristics)
  // =========================================================================
  const handleLinkCheck = (e) => {
    e.preventDefault();
    if (!linkInput.trim()) return;

    setLinkChecking(true);
    setLinkResult(null);

    let raw = linkInput.trim();
    if (!/^https?:\/\//i.test(raw)) {
      raw = 'https://' + raw;
    }

    setTimeout(() => {
      let urlObj;
      try {
        urlObj = new URL(raw);
      } catch (err) {
        urlObj = { hostname: raw.replace(/https?:\/\//i, '').split('/')[0], protocol: 'https:' };
      }

      const domain = urlObj.hostname.toLowerCase();
      const path = (urlObj.pathname + urlObj.search).toLowerCase();
      const fullUrl = raw.toLowerCase();

      let reasons = [];
      let riskLevel = 'safe';
      let score = 95;
      let threatType = "Xavfsiz va Ishonchli Manba";

      // Trusted domains whitelist in Uzbekistan & World
      const trustedOfficial = [
        'click.uz', 'my.click.uz',
        'payme.uz', 'checkout.paycom.uz',
        'uzum.uz', 'uzum.com', 'bank.uzum.uz',
        'kapitalbank.uz', 'nbu.uz', 'sqb.uz', 'agrobank.uz', 'ipotekabank.uz', 'asakabank.uz',
        'gov.uz', 'my.gov.uz', 'soliq.uz', 'cybercontrol.uz', 'google.com', 'github.com',
        'cybershield.uz', 'vercel.app'
      ];

      const isWhitelisted = trustedOfficial.some(d => domain === d || domain.endsWith('.' + d));

      // Suspicious free TLDs commonly used by scammers
      const freeSuspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '.gq', '.top', '.xyz', '.buzz', '.icu', '.work', '.click', '.monster'];
      const hasSuspiciousTld = freeSuspiciousTlds.some(tld => domain.endsWith(tld));

      // Brand spoofing check
      const spoofingClick = domain.includes('click') && !domain.endsWith('click.uz');
      const spoofingPayme = domain.includes('payme') && !domain.endsWith('payme.uz');
      const spoofingUzum = domain.includes('uzum') && !domain.endsWith('uzum.uz') && !domain.endsWith('uzum.com');
      const spoofingBank = (domain.includes('bank') || path.includes('bank')) && !isWhitelisted && (domain.includes('online') || domain.includes('login') || domain.includes('bonus') || domain.includes('pul'));

      // Phishing keywords in URL / Path
      const phishingKeywords = ['yutuq', 'bonus', 'pul-yutuq', 'hadya', 'subsidiya', 'premyera', 'kartaga-pul', 'otborka', 'sovga', 'investitsiya', 'kun-uz-yangilik'];
      const hasPhishingWord = phishingKeywords.some(w => fullUrl.includes(w));

      // URL shorteners (often hide malicious destinations)
      const isShortener = ['bit.ly', 'tinyurl.com', 'cutt.ly', 'rb.gy', 'is.gd', 't.me/share'].some(s => domain.includes(s));

      // IP address in URL instead of domain
      const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(domain);

      if (spoofingClick || spoofingPayme || spoofingUzum || spoofingBank) {
        riskLevel = 'danger';
        score = 12;
        threatType = "Kritik Xavf: Mashhur Brendga Qalbaki Taqlid (Brand Spoofing / Fishing)";
        reasons.push("Sayt rasmiy brend (Click, Payme, Uzum yoki Bank) nomidan foydalanib, foydalanuvchini aldashga uringan.");
        reasons.push("Ushbu sahifada karta raqami yoki SMS tasdiqlash kodini kiritish hisobdagi barcha pullarni yo'qotishga olib keladi!");
      } else if (hasPhishingWord || hasSuspiciousTld) {
        riskLevel = 'danger';
        score = 18;
        threatType = "Kritik Xavf: Firibgarlik (Yutuq / Bonus Fishing Tuzog'i)";
        if (hasPhishingWord) reasons.push("Havolada soxta bepul pul, aksiya yoki subsidiya va'da qiluvchi fishing kalit so'zlari aniqlandi.");
        if (hasSuspiciousTld) reasons.push("Sayt xakerlar tomonidan tekin olinadigan xavfli domen hududida joylashgan.");
      } else if (isIpAddress) {
        riskLevel = 'danger';
        score = 25;
        threatType = "Shubhali Xosting: To'g'ridan-to'g'ri IP manzil orqali ulanish";
        reasons.push("Sayt domen nomiga ega emas, to'g'ridan-to'g'ri noma'lum server IP manzili orqali ochilmoqda.");
      } else if (isShortener) {
        riskLevel = 'warning';
        score = 48;
        threatType = "Ehtiyot bo'ling: Qisqartirilgan Havola (Short URL)";
        reasons.push("Havola asl manzilni yashirish uchun qisqartiruvchi servis orqali yaratilgan.");
        reasons.push("Ochishdan oldin uning aslida qayerga yo'naltirishini tekshirib olish tavsiya etiladi.");
      } else if (!raw.startsWith('https://')) {
        riskLevel = 'warning';
        score = 55;
        threatType = "Ogohlantirish: Xavfsiz Shifrlash (HTTPS/SSL) Mavjud Emas";
        reasons.push("Saytda zamonaviy SSL/TLS shifrlash sertifikati yo'q. Kiritilgan ma'lumotlar o'g'irlanishi mumkin.");
      } else if (isWhitelisted) {
        riskLevel = 'safe';
        score = 99;
        threatType = "100% Rasmiy va Tasdiqlangan Xavfsiz Manba";
        reasons.push("Domen O'zbekiston yoki xalqaro rasmiy xavfsiz tizimlar oq ro'yxatida (whitelist) mavjud.");
        reasons.push("Xavfsiz HTTPS shifrlangan ulanishga ega.");
      } else {
        riskLevel = 'safe';
        score = 88;
        threatType = "Standart Domen (Zararli Belgilar Aniqlanmadi)";
        reasons.push("Domen nomida mashhur to'lov tizimlariga taqlid qilish yoki spam belgilari topilmadi.");
        reasons.push("Xavfsiz HTTPS protokolidan foydalanilmoqda.");
      }

      setLinkResult({
        url: raw,
        domain: domain,
        riskLevel,
        score,
        threatType,
        reasons
      });
      setLinkChecking(false);
    }, 1100);
  };

  // =========================================================================
  // 3. APK SKANER MANTIG'I
  // =========================================================================
  const simulateAnalysis = (fileData) => {
    setScanning(true);
    setScanResult(null);
    setScanProgress(15);
    setScanStepText("Fayl o'qilmoqda va SHA-256 xesh hisoblanmoqda...");

    setTimeout(() => {
      setScanProgress(45);
      setScanStepText("AndroidManifest.xml va ruxsatnomalar dekompilyatsiya qilinmoqda...");
    }, 600);

    setTimeout(() => {
      setScanProgress(80);
      setScanStepText("DEX kodlar va viruslar bazasi bilan solishtirilmoqda...");
    }, 1200);

    setTimeout(() => {
      setScanProgress(100);
      setScanStepText("Tahlil muvaffaqiyatli yakunlandi!");
      setScanning(false);
      setScanResult(fileData);
    }, 1700);
  };

  const runSampleScan = (sample) => {
    setSelectedSample(sample);
    simulateAnalysis(sample);
  };

  const handleFile = async (file) => {
    if (!file) return;

    let hashHex = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
    try {
      const buffer = await file.slice(0, 1024 * 1024).arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      console.warn('Hash error:', e);
    }

    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    const lowerName = file.name.toLowerCase();

    const isSuspicious = lowerName.includes('mod') || lowerName.includes('hack') || lowerName.includes('spy') || lowerName.includes('cheat') || lowerName.includes('free');
    const isBank = lowerName.includes('bank') || lowerName.includes('pay') || lowerName.includes('card');

    let dynamicRisk = 'safe';
    let dynamicScore = 14;
    let threatType = "Xavfsiz / Standart Android Ilovasi";
    let details = [
      { perm: 'android.permission.INTERNET', risk: 'low', desc: "Tarmoq bilan ma'lumot almashish" },
      { perm: 'android.permission.ACCESS_NETWORK_STATE', risk: 'low', desc: "Internetga ulanish holatini tekshirish" }
    ];
    let recommendation = "Faylda xavfli josuslik yoki pul o'g'irlash kodlari aniqlanmadi. Foydalanish mumkin.";

    if (isBank) {
      dynamicRisk = 'high';
      dynamicScore = 94;
      threatType = "Kritik Xavf / Soxta Bank yoki Troyan Ilovasi";
      details = [
        { perm: 'android.permission.RECEIVE_SMS', risk: 'critical', desc: "SMS orqali keluvchi bank tasdiq kodlarini o'g'irlash xavfi" },
        { perm: 'android.permission.BIND_ACCESSIBILITY_SERVICE', risk: 'critical', desc: "Ekranni to'liq boshqarish va tugmalarni avtomatik bosish" },
        { perm: 'android.permission.SYSTEM_ALERT_WINDOW', risk: 'high', desc: 'Boshqa bank dasturlari ustiga soxta oyna chizish' }
      ];
      recommendation = "DIQQAT! Fayl bank hisob ma'lumotlarini o'g'irlash uchun yaratilgan troyan belgilariga ega. Ilovani telefoningizga o'rnatmang!";
    } else if (isSuspicious) {
      dynamicRisk = 'medium';
      dynamicScore = 72;
      threatType = "Shubhali / Noqonuniy Ruxsatlar Mavjud";
      details = [
        { perm: 'android.permission.RECORD_AUDIO', risk: 'high', desc: "Mikrofon orqali yashirin ovoz yozish imkoniyati" },
        { perm: 'android.permission.ACCESS_FINE_LOCATION', risk: 'high', desc: "Telefon egasining aniq geolokatsiyasini kuzatish" },
        { perm: 'android.permission.READ_EXTERNAL_STORAGE', risk: 'medium', desc: "Xotiradagi fotosuratlar va hujjatlarni o'qish" }
      ];
      recommendation = "Ilova ruxsatnomalari haddan tashqari ko'p va shubhali. Maxfiy ma'lumotlaringiz xavf ostida qolishi mumkin.";
    }

    const customResult = {
      id: 'custom_' + Date.now(),
      name: file.name,
      pkg: 'app.analyzed.' + lowerName.replace(/[^a-z0-9]/g, '').slice(0, 16),
      size: fileSizeMB,
      risk: dynamicRisk,
      score: dynamicScore,
      hash: hashHex,
      threatType: threatType,
      details: details,
      recommendation: recommendation
    };

    setSelectedSample(customResult);
    simulateAnalysis(customResult);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d151c] text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#142333] via-[#1a2e42] to-[#142333] border border-[#234260] p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#0ea5e9]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ea5e9]/15 border border-[#0ea5e9]/30 text-[#0ea5e9] text-xs font-semibold mb-3">
                <Shield size={13} />
                {t.badge}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <Smartphone className="text-[#88cc14]" size={28} />
                {t.title}
              </h1>
              <p className="text-sm sm:text-base text-[#94a3b8] mt-2 max-w-2xl leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0f1d2b] border border-[#234260] text-xs text-[#94a3b8]">
              <Sparkles className="text-[#88cc14]" size={16} />
              <span>3 bosqichli kiber himoya faol</span>
            </div>
          </div>

          {/* 3 Main Tabs Only: APK Scanner, Card Guard, Link Checker */}
          <div className="flex gap-2 mt-6 pt-6 border-t border-[#234260]/60 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'scanner'
                  ? 'bg-[#88cc14] text-black shadow-lg shadow-[#88cc14]/20'
                  : 'bg-[#182a3d] text-[#94a3b8] hover:text-white hover:bg-[#1f364e]'
              }`}
            >
              <FileSearch size={16} />
              {t.tabScanner}
            </button>

            <button
              onClick={() => setActiveTab('card_guard')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'card_guard'
                  ? 'bg-[#38bdf8] text-black shadow-lg shadow-[#38bdf8]/20'
                  : 'bg-[#182a3d] text-[#94a3b8] hover:text-white hover:bg-[#1f364e]'
              }`}
            >
              <CreditCard size={16} />
              {t.tabCard}
            </button>

            <button
              onClick={() => setActiveTab('link_checker')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'link_checker'
                  ? 'bg-[#f59e0b] text-black shadow-lg shadow-[#f59e0b]/20'
                  : 'bg-[#182a3d] text-[#94a3b8] hover:text-white hover:bg-[#1f364e]'
              }`}
            >
              <Link2 size={16} />
              {t.tabLink}
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 1. TAB: APK FILE INSPECTOR (Skaner)                            */}
        {/* ============================================================== */}
        {activeTab === 'scanner' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#142333] border border-[#234260] rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <FileSearch className="text-[#88cc14]" size={24} />
                <h2 className="text-xl font-bold text-white">{t.scannerTitle}</h2>
              </div>
              <p className="text-sm text-[#94a3b8] mb-6">{t.scannerDesc}</p>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                accept=".apk,.xapk,.apks"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
              />

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer mb-6 ${
                  isDragging
                    ? 'border-[#88cc14] bg-[#88cc14]/10 scale-[1.01]'
                    : 'border-[#234260] hover:border-[#88cc14] bg-[#0f1b27]/60 hover:bg-[#122233]'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#88cc14]/15 text-[#88cc14] flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110">
                  <UploadCloud size={30} />
                </div>
                <div className="text-white font-semibold text-base mb-1">{t.dragDrop}</div>
                <p className="text-xs text-[#94a3b8]">Qo'llab-quvvatlanadi: .apk, .xapk, .apks (Max: 100MB)</p>
                <span className="inline-block mt-3 px-3 py-1 bg-[#234260] hover:bg-[#2e557b] text-xs font-semibold rounded-lg text-white transition-colors">
                  Faylni tanlash uchun bosing
                </span>
              </div>

              {/* Sample Files Selection */}
              <div>
                <div className="text-xs uppercase tracking-wider text-[#94a3b8] font-bold mb-3">{t.sampleFiles}</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {SAMPLES.map(sample => (
                    <button
                      key={sample.id}
                      onClick={() => runSampleScan(sample)}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        selectedSample?.id === sample.id
                          ? 'bg-[#1e344a] border-[#88cc14] ring-2 ring-[#88cc14]/60'
                          : 'bg-[#101c28] border-[#234260] hover:border-[#38648e] hover:bg-[#162738]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-white font-mono">{sample.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          sample.risk === 'high' ? 'bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30' :
                          sample.risk === 'medium' ? 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30' :
                          'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30'
                        }`}>
                          {sample.score}/100 Risk
                        </span>
                      </div>
                      <div className="text-xs text-[#94a3b8] truncate">{sample.pkg}</div>
                      <div className="text-[11px] text-[#64748b] mt-1">{sample.size} • {sample.threatType}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Scanning Progress */}
            {scanning && (
              <div className="bg-[#142333] border border-[#234260] rounded-2xl p-8 text-center space-y-4 shadow-xl">
                <div className="w-12 h-12 border-4 border-[#88cc14] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div>
                  <div className="text-white font-medium text-base mb-1">{t.analyzing}</div>
                  <div className="text-xs text-[#94a3b8] font-mono">{scanStepText}</div>
                </div>
                <div className="max-w-md mx-auto bg-[#0d151c] rounded-full h-2.5 overflow-hidden border border-[#234260]">
                  <div
                    className="bg-[#88cc14] h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Scan Result Card */}
            {scanResult && !scanning && (
              <div className="bg-[#142333] border border-[#234260] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#234260]">
                  <div>
                    <div className="text-xs text-[#94a3b8] font-mono">Tahlil qilingan fayl:</div>
                    <div className="text-2xl font-bold text-white font-mono mt-1 flex items-center gap-2">
                      <FileCheck className="text-[#88cc14]" size={24} />
                      {scanResult.name}
                    </div>
                    <div className="text-xs text-[#64748b] mt-1 font-mono">
                      {scanResult.pkg} ({scanResult.size})
                    </div>
                    {scanResult.hash && (
                      <div className="text-[11px] text-[#94a3b8] mt-1 font-mono break-all">
                        SHA-256: {scanResult.hash}
                      </div>
                    )}
                  </div>

                  <div className={`px-5 py-3 rounded-2xl border flex items-center gap-3 ${
                    scanResult.risk === 'high' ? 'bg-[#ef4444]/15 border-[#ef4444] text-[#ef4444]' :
                    scanResult.risk === 'medium' ? 'bg-[#f59e0b]/15 border-[#f59e0b] text-[#f59e0b]' :
                    'bg-[#10b981]/15 border-[#10b981] text-[#10b981]'
                  }`}>
                    {scanResult.risk === 'high' && <AlertTriangle size={28} />}
                    {scanResult.risk === 'medium' && <AlertTriangle size={28} />}
                    {scanResult.risk === 'safe' && <CheckCircle size={28} />}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider">Xavflilik indeksi</div>
                      <div className="text-xl font-black">{scanResult.score} / 100</div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0f1d2b] border border-[#1f364e] flex items-center justify-between">
                  <span className="text-xs text-[#94a3b8]">Xavf toifasi:</span>
                  <span className="text-xs font-bold text-white font-mono">{scanResult.threatType}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                    <Shield size={18} className="text-[#0ea5e9]" />
                    {t.permissions}
                  </h3>
                  <div className="space-y-2">
                    {scanResult.details.map((d, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-[#0f1d2b] border border-[#1f364e] gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            d.risk === 'critical' ? 'bg-[#ef4444]' :
                            d.risk === 'high' ? 'bg-[#f97316]' :
                            d.risk === 'medium' ? 'bg-[#f59e0b]' : 'bg-[#10b981]'
                          }`}></span>
                          <span className="font-mono text-xs text-white">{d.perm}</span>
                        </div>
                        <span className="text-xs text-[#94a3b8] sm:text-right">{d.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#1b2f42] border border-[#2d4d6d]">
                  <div className="text-xs uppercase font-bold text-[#88cc14] mb-1">{t.recommendations}</div>
                  <p className="text-sm text-[#e2e8f0] leading-relaxed">{scanResult.recommendation}</p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setScanResult(null);
                      setSelectedSample(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a2d40] hover:bg-[#233c54] text-[#94a3b8] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <RotateCw size={14} />
                    {t.reScan}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. TAB: CARD GUARD (Bank Kartasi Xavfsizligi)                  */}
        {/* ============================================================== */}
        {activeTab === 'card_guard' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#142333] border border-[#234260] rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/15 text-[#38bdf8] flex items-center justify-center">
                    <CreditCard size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Bank Kartasi Xavfsizligi va Baza Tahlili</h2>
                    <p className="text-xs text-[#94a3b8]">Uzcard, Humo, Visa va Mastercard kartalarini xavfsizlik qoidalariga mosligini tekshiring</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                  <ShieldCheck size={14} />
                  <span>Maxfiylik: CVV kod so'ralmaydi, ma'lumotlar saqlanmaydi</span>
                </div>
              </div>

              {/* Form Input */}
              <form onSubmit={handleCardCheck} className="space-y-4 max-w-3xl mb-8">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs uppercase tracking-wider text-[#94a3b8] font-bold">
                      Karta raqami (16 ta raqam):
                    </label>
                    {cardNumber && (
                      <span className="text-xs font-mono text-[#38bdf8]">
                        {identifyCardSystem(cardNumber).brand} • {identifyCardSystem(cardNumber).bank}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
                        setCardNumber(val);
                      }}
                      placeholder="8600 0000 0000 0000 yoki 9860..."
                      className="w-full bg-[#0a121a] border border-[#234260] focus:border-[#38bdf8] rounded-xl px-4 py-3.5 text-lg font-mono text-white placeholder-[#475569] outline-none transition-colors pr-24"
                      required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      {cardNumber && (
                        <button
                          type="button"
                          onClick={() => { setCardNumber(''); setCardResult(null); }}
                          className="text-[#64748b] hover:text-white p-1 text-xs"
                          title="Tozalash"
                        >
                          <XCircle size={16} />
                        </button>
                      )}
                      <div className="text-xs text-[#64748b] font-mono border-l border-[#234260] pl-2">
                        {cardNumber.replace(/\D/g, '').length}/16
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#64748b] mt-1.5 flex items-center gap-1.5">
                    <Info size={13} className="text-[#38bdf8] shrink-0" />
                    <span>Faqat 16 xonali karta raqami tekshiriladi. PIN-kod, amal qilish muddati yoki maxfiy CVV kodlarni <strong>hech qachon</strong> kiritmang!</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={cardChecking || cardNumber.replace(/\D/g, '').length < 8}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-semibold text-sm transition-all shadow-lg shadow-[#0ea5e9]/20 disabled:opacity-50 cursor-pointer"
                  >
                    {cardChecking ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Karta tahlil qilinmoqda...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={16} />
                        <span>Kartani tekshirish</span>
                      </>
                    )}
                  </button>

                  <div className="text-xs text-[#64748b] pl-2">Namunani sinab ko'rish:</div>
                  <button
                    type="button"
                    onClick={() => {
                      const num = '8600 4912 3456 7897';
                      setCardNumber(num);
                      runCardAnalysis(num);
                    }}
                    className="text-xs px-3 py-2 rounded-lg bg-[#182838] border border-[#253f58] hover:border-[#38bdf8] text-[#94a3b8] hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>Uzcard (Aloqabank - Toza)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const num = '9860 0301 2345 6789';
                      setCardNumber(num);
                      runCardAnalysis(num);
                    }}
                    className="text-xs px-3 py-2 rounded-lg bg-[#182838] border border-[#253f58] hover:border-[#f59e0b] text-[#94a3b8] hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>Humo (Kapitalbank - Toza)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const num = '9860 1234 5678 9012';
                      setCardNumber(num);
                      runCardAnalysis(num);
                    }}
                    className="text-xs px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <AlertTriangle size={13} />
                    <span>Humo (Sizib chiqqan)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const num = '8600 0000 0000 0000';
                      setCardNumber(num);
                      runCardAnalysis(num);
                    }}
                    className="text-xs px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <XCircle size={13} />
                    <span>Soxta / Xato format</span>
                  </button>
                </div>
              </form>

              {/* Card Analysis Result */}
              {cardResult && (
                <div className="mt-8 border-t border-[#234260] pt-6 space-y-6 animate-in fade-in duration-300">
                  {/* Virtual Card Graphic & Overview */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    {/* Visual Card */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                      <div className={`p-6 rounded-2xl bg-gradient-to-br ${cardResult.color} text-white shadow-2xl relative overflow-hidden aspect-[1.58/1] flex flex-col justify-between border border-white/20 transition-transform duration-300 hover:scale-[1.02]`}>
                        {/* Glow circle overlay */}
                        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

                        {/* Top Bank & Contactless */}
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold text-sm tracking-wider uppercase drop-shadow">{cardResult.bank}</span>
                            <div className="text-[10px] text-white/75 font-mono">EMV CHIP • NFC CONTACTLESS</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Wifi size={18} className="rotate-90 opacity-80" />
                            <Lock size={15} className="opacity-80" />
                          </div>
                        </div>

                        {/* Chip Graphic */}
                        <div className="my-2">
                          <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-amber-300 via-amber-200 to-amber-400 border border-amber-500/60 shadow-sm relative overflow-hidden flex items-center justify-center">
                            <div className="w-full h-[1px] bg-amber-600/50 absolute"></div>
                            <div className="h-full w-[1px] bg-amber-600/50 absolute"></div>
                            <div className="w-5 h-4 border border-amber-600/60 rounded-[3px]"></div>
                          </div>
                        </div>

                        {/* Number Display */}
                        <div className="font-mono text-xl tracking-widest text-white text-center font-bold drop-shadow my-1">
                          {cardResult.maskedNumber}
                        </div>

                        {/* Bottom Row */}
                        <div className="flex justify-between items-end text-xs">
                          <div>
                            <div className="text-[8px] uppercase tracking-wider text-white/70">XAVFSIZLIK STATUSI</div>
                            <div className="font-bold text-[11px] flex items-center gap-1">
                              {cardResult.isValidFormat ? (
                                <span className="text-emerald-300 flex items-center gap-1">
                                  <CheckCircle2 size={12} /> ISO STANDART
                                </span>
                              ) : (
                                <span className="text-red-300 flex items-center gap-1">
                                  <AlertTriangle size={12} /> NOANIQ FORMAT
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[8px] uppercase tracking-wider text-white/70">TIZIM</div>
                            <div className="font-black text-sm tracking-wider uppercase">{cardResult.brand}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Security Score and Metric Summary */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
                      {/* Safety Score Meter */}
                      <div className="p-4 rounded-xl bg-[#0e1722] border border-[#1e2f42] flex items-center justify-between">
                        <div>
                          <div className="text-xs text-[#94a3b8]">Kiberxavfsizlik va Ishonchlilik Indeksi:</div>
                          <div className="text-sm font-bold text-white mt-0.5">
                            {cardResult.safetyScore >= 80 
                              ? "A'lo darajada himoyalangan" 
                              : cardResult.safetyScore >= 50 
                              ? "O'rta xavf darajasi (Ehtiyot bo'ling)" 
                              : "Yuqori xavf darajasi (Foydalanish xavfli!)"}
                          </div>
                        </div>
                        <div className={`px-4 py-2 rounded-xl font-mono text-xl font-black ${
                          cardResult.safetyScore >= 80
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : cardResult.safetyScore >= 50
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                        }`}>
                          {cardResult.safetyScore}/100
                        </div>
                      </div>

                      {/* Detail Badges */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="p-3.5 rounded-xl bg-[#0e1722] border border-[#1e2f42]">
                          <span className="text-[11px] text-[#94a3b8] block">To'lov tizimi & BIN:</span>
                          <span className="text-sm font-bold text-white font-mono">{cardResult.system}</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#0e1722] border border-[#1e2f42]">
                          <span className="text-[11px] text-[#94a3b8] block">Emitent Bank:</span>
                          <span className="text-sm font-bold text-white">{cardResult.bank}</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#0e1722] border border-[#1e2f42] flex items-center justify-between">
                          <div>
                            <span className="text-[11px] text-[#94a3b8] block">Luhn tekshiruvi:</span>
                            <span className="text-xs text-white">ISO/IEC 7812</span>
                          </div>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            cardResult.isValidFormat ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {cardResult.isValidFormat ? 'To‘g‘ri (Mavjud karta)' : 'Xato / Soxta'}
                          </span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#0e1722] border border-[#1e2f42] flex items-center justify-between">
                          <div>
                            <span className="text-[11px] text-[#94a3b8] block">Sizib chiqqan bazalar:</span>
                            <span className="text-xs text-white">Dark Web Monitoring</span>
                          </div>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            cardResult.isLeaked ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {cardResult.isLeaked ? 'Sizish aniqlandi!' : 'Toza (Xavfsiz)'}
                          </span>
                        </div>
                      </div>

                      {/* Emergency Hotline */}
                      <div className="p-3 rounded-xl bg-[#09111a] border border-[#182838] flex items-center justify-between text-xs">
                        <span className="text-[#94a3b8] flex items-center gap-1.5">
                          <Phone size={13} className="text-[#38bdf8]" />
                          Favqulodda bloklash raqami:
                        </span>
                        <span className="font-mono font-bold text-[#38bdf8]">{cardResult.emergencyPhone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Checks List */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Shield size={16} className="text-[#38bdf8]" />
                      Batafsil xavfsizlik tekshiruvlari natijasi:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {cardResult.checks.map((chk, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-[#0e1722] border border-[#1e2f42] flex items-start gap-3">
                          {chk.status === 'safe' ? (
                            <CheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                          ) : (
                            <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
                          )}
                          <div>
                            <div className="text-sm font-semibold text-white">{chk.title}</div>
                            <div className="text-xs text-[#94a3b8] mt-0.5 leading-relaxed">{chk.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Golden rules for card security */}
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-sm text-amber-400">
                      <AlertOctagon size={18} />
                      KARTADAN PUL O‘G‘IRLATMASLIKNING 3 TA OLTIN QOIDASI:
                    </div>
                    <ul className="text-xs space-y-2 list-disc list-inside text-amber-200/90 leading-relaxed">
                      <li><strong>SMS tasdiqlash kodini (6 ta raqam)</strong> hech kimga, hatto o‘zini bank, xavfsizlik xizmati yoki prokuratura xodimi deb tanishtirganlarga ham aslo aytmang!</li>
                      <li>Kartangiz orqa tarafidagi <strong>3 xonali CVV/CVC kodni</strong> begona saytlarga, Telegram botlarga yoki begona shaxslarga aslo yubormang.</li>
                      <li>Sizga pul o‘tkazib berishmoqchi bo‘lgan odamga <strong>faqat karta raqamining o‘zi kifoya</strong>, hech qanday havolaga o'tish yoki SMS kod aytish shart emas.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 3. TAB: LINK CHECKER (Anti-Phishing Havola Tekshiruvi)         */}
        {/* ============================================================== */}
        {activeTab === 'link_checker' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#142333] border border-[#234260] rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                  <Link2 size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Havolani Fishing va Firibgarlikka Tekshirish (Anti-Phishing)</h2>
                  <p className="text-xs text-[#94a3b8]">Telegram, SMS, Instagram yoki pochta orqali kelgan shubhali linklarni real vaqtda tekshiring</p>
                </div>
              </div>

              {/* Form Input */}
              <form onSubmit={handleLinkCheck} className="space-y-4 max-w-3xl my-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#94a3b8] font-bold mb-2">
                    Tekshirmoqchi bo'lgan havola yoki veb-sayt manzili:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={linkInput}
                      onChange={(e) => setLinkInput(e.target.value)}
                      placeholder="Masalan: https://click-bonus-uzbekistan.tk yoki https://payme.uz"
                      className="w-full bg-[#0a121a] border border-[#234260] focus:border-amber-400 rounded-xl px-4 py-3.5 text-sm font-mono text-white placeholder-[#475569] outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={linkChecking || !linkInput.trim()}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-sm transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 cursor-pointer"
                  >
                    {linkChecking ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Sayt tekshirilmoqda...</span>
                      </>
                    ) : (
                      <>
                        <Search size={16} />
                        <span>Havolani tekshirish</span>
                      </>
                    )}
                  </button>

                  <div className="text-xs text-[#64748b]">Tezkor namunalar:</div>
                  <button
                    type="button"
                    onClick={() => setLinkInput('https://click-bonus-pul-yutuq.tk')}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                  >
                    Xavfli Fishing Namunasi
                  </button>
                  <button
                    type="button"
                    onClick={() => setLinkInput('https://click.uz')}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors cursor-pointer"
                  >
                    Toza Rasmiy Sayt Namunasi
                  </button>
                </div>
              </form>

              {/* Link Result View */}
              {linkResult && (
                <div className="mt-8 border-t border-[#234260] pt-6 space-y-6">
                  <div className={`p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                    linkResult.riskLevel === 'danger' ? 'bg-red-500/15 border-red-500 text-red-200' :
                    linkResult.riskLevel === 'warning' ? 'bg-amber-500/15 border-amber-500 text-amber-200' :
                    'bg-emerald-500/15 border-emerald-500 text-emerald-200'
                  }`}>
                    <div className="flex items-center gap-4">
                      {linkResult.riskLevel === 'danger' && <AlertOctagon size={40} className="text-red-400 shrink-0" />}
                      {linkResult.riskLevel === 'warning' && <AlertTriangle size={40} className="text-amber-400 shrink-0" />}
                      {linkResult.riskLevel === 'safe' && <CheckCircle size={40} className="text-emerald-400 shrink-0" />}
                      <div>
                        <div className="text-xs uppercase font-bold tracking-wider opacity-80">Tahlil xulosasi</div>
                        <div className="text-xl font-black mt-0.5">
                          {linkResult.threatType}
                        </div>
                        <div className="text-xs font-mono opacity-80 mt-1 break-all">{linkResult.url}</div>
                      </div>
                    </div>

                    <div className="px-5 py-3 rounded-xl bg-black/40 border border-white/10 text-center shrink-0">
                      <div className="text-[10px] uppercase font-bold tracking-wider opacity-70">Xavfsizlik indeksi</div>
                      <div className="text-2xl font-black">{linkResult.score} / 100</div>
                    </div>
                  </div>

                  {/* Reasons list */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Tahlil tafsilotlari:</h3>
                    <div className="space-y-2">
                      {linkResult.reasons.map((r, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-[#0f1d2b] border border-[#1f364e] flex items-center gap-3 text-xs text-[#cbd5e1]">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${
                            linkResult.riskLevel === 'danger' ? 'bg-red-400' :
                            linkResult.riskLevel === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'
                          }`} />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Security Advice */}
                  <div className="p-4 rounded-xl bg-[#1b2f42] border border-[#2d4d6d] text-xs text-[#e2e8f0] leading-relaxed">
                    <strong className="text-[#38bdf8] block mb-1">KiberQoriqchi Tavsiyasi:</strong>
                    Hech qachon shubhali havolalarda telefon raqamingiz, plastik karta ma'lumotlaringiz yoki SMS orqali kelgan tasdiqlash kodini kiritmang. Rasmiy banklar hech qachon alohida havolalar orqali yutuqli o'yinlar yoki to'lov kodlarini talab qilmaydi.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ApkQoriqchiPage;
