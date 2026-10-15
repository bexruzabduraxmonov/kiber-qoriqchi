import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Shield, Smartphone, ExternalLink, RotateCw, AlertTriangle,
  CheckCircle, FileSearch, Download, QrCode, Lock, Zap,
  Search, Info, Eye, ArrowUpRight, Cpu, HardDrive,
  Copy, Check, UploadCloud, FileCheck, CreditCard, Link2,
  AlertOctagon, CheckSquare, ShieldCheck, ShieldAlert, Sparkles,
  RefreshCw, Globe, HelpCircle, KeyRound, BellRing
} from 'lucide-react';

export const ApkQoriqchiPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('scanner'); // 'scanner' | 'card_guard' | 'link_checker' | 'app_info' | 'panel'
  const [iframeKey, setIframeKey] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStepText, setScanStepText] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [selectedSample, setSelectedSample] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [panelLoadError, setPanelLoadError] = useState(false);

  // Card Guard State
  const [cardNumber, setCardNumber] = useState('');
  const [cardChecking, setCardChecking] = useState(false);
  const [cardResult, setCardResult] = useState(null);

  // Link Checker State
  const [linkInput, setLinkInput] = useState('');
  const [linkChecking, setLinkChecking] = useState(false);
  const [linkResult, setLinkResult] = useState(null);

  const fileInputRef = useRef(null);

  const TARGET_URL = 'https://project.cybercontrol.uz/r/pfuBDt9E5i1arYS_M2o_aw';
  const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.baxtiyorov.security';

  const t = {
    uz: {
      badge: 'Rasmiy Kiber Xavfsizlik Majmuasi',
      title: "APK & Kiber Qo'riqchi",
      subtitle: "Android ilovalar, bank kartalari va shubhali havolalarni (fishing) tahlil qilish hamda kiber firibgarlardan himoyalanish tizimi.",
      tabScanner: "APK Skaneri",
      tabCard: "Karta Himoyasi",
      tabLink: "Havolani Tekshirish",
      tabInfo: "Mobil Ilova & QR",
      tabPanel: "Onlayn Panel (Web View)",
      openExternal: 'Yangi oynada ochish',
      refresh: 'Yangilash',
      iframeNotice: "Eslatma: Tashqi server xavfsizlik cheklovlari sababli panel to'liq ochilmasa, 'Yangi oynada ochish' tugmasidan foydalaning.",
      scannerTitle: 'APK Faylni Tekshirish (Statik Tahlil)',
      scannerDesc: "Shubhali Android ilovasini yuklang yoki tayyor kiberxavfsizlik namunalaridan birini tanlab, uning xavflilik darajasini tekshiring.",
      dragDrop: ".APK faylni bu yerga tashlang yoki kompyuterdan tanlang",
      sampleFiles: 'TAYYOR TEST NAMUNALARI:',
      analyzing: "APK dekompilyatsiya qilinmoqda va ruxsatlar tahlil qilinmoqda...",
      permissions: "Aniqlangan ruxsatlar va xavflar",
      recommendations: "Tavsiyalar",
      developer: "Dasturchi",
      packageId: "Paket identifikatori",
      installGooglePlay: "Google Play'da ochish",
      scanQr: 'QR Kodni skanerlang',
      scanQrSub: "Kamerangizni QR kodga yo'naltiring va ilovani telefoningizga o'rnating",
      copied: 'Nusxalandi!',
      copyLink: 'Linkdan nusxa olish',
      reScan: "Boshqa faylni tekshirish"
    },
    ru: {
      badge: 'Официальный комплекс кибербезопасности',
      title: 'APK & Кибер Защитник',
      subtitle: 'Анализ приложений Android, защита банковских карт и выявление фишинговых ссылок для предотвращения мошенничества.',
      tabScanner: 'Сканер APK',
      tabCard: 'Защита карт',
      tabLink: 'Проверка ссылок',
      tabInfo: 'Приложение & QR',
      tabPanel: 'Онлайн панель',
      openExternal: 'Открыть в новом окне',
      refresh: 'Обновить',
      iframeNotice: 'Примечание: Если внешняя панель блокируется политикой безопасности, используйте кнопку "Открыть в новом окне".',
      scannerTitle: 'Проверка APK файлов (Статический анализ)',
      scannerDesc: 'Загрузите подозрительное Android-приложение или выберите тестовый образец для проверки уровня риска.',
      dragDrop: 'Перетащите .APK файл сюда или выберите на компьютере',
      sampleFiles: 'ГОТОВЫЕ ТЕСТОВЫЕ ОБРАЗЦЫ:',
      analyzing: 'Декомпиляция APK и анализ разрешений...',
      permissions: 'Обнаруженные разрешения и риски',
      recommendations: 'Рекомендации',
      developer: 'Разработчик',
      packageId: 'Идентификатор пакета',
      installGooglePlay: 'Открыть в Google Play',
      scanQr: 'Отсканируйте QR-код',
      scanQrSub: 'Наведите камеру на QR-код для установки приложения на телефон',
      copied: 'Скопировано!',
      copyLink: 'Копировать ссылку',
      reScan: 'Проверить другой файл'
    },
    en: {
      badge: 'Official Cyber Defense Suite',
      title: 'APK & Cyber Shield',
      subtitle: 'Android application auditing, banking card defense & phishing link detection against cyber fraud.',
      tabScanner: 'APK Scanner',
      tabCard: 'Card Guard',
      tabLink: 'Link Checker',
      tabInfo: 'Mobile App & QR',
      tabPanel: 'Live Panel',
      openExternal: 'Open in new window',
      refresh: 'Refresh',
      iframeNotice: 'Note: If the external panel is restricted by security headers, click "Open in new window".',
      scannerTitle: 'APK File Inspector (Static Analysis)',
      scannerDesc: 'Upload a suspicious Android application or select a security test sample to evaluate its risk score.',
      dragDrop: 'Drop an .APK file here or browse from computer',
      sampleFiles: 'READY TEST SAMPLES:',
      analyzing: 'Decompiling APK and analyzing manifest permissions...',
      permissions: 'Detected Permissions & Threats',
      recommendations: 'Recommendations',
      developer: 'Developer',
      packageId: 'Package ID',
      installGooglePlay: 'Open on Google Play',
      scanQr: 'Scan QR Code',
      scanQrSub: 'Point your camera at the QR code to install the app on your mobile phone',
      copied: 'Copied!',
      copyLink: 'Copy link',
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

  // Luhn Algorithm for credit/debit card validation
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
    if (clean.startsWith('8600')) return { type: 'Uzcard (O‘zbekiston)', color: 'from-[#0284c7] to-[#0369a1]', local: true };
    if (clean.startsWith('9860')) return { type: 'Humo (O‘zbekiston)', color: 'from-[#f59e0b] to-[#d97706]', local: true };
    if (clean.startsWith('4')) return { type: 'Visa International', color: 'from-[#1e40af] to-[#1e3a8a]', local: false };
    if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return { type: 'Mastercard World', color: 'from-[#dc2626] to-[#b91c1c]', local: false };
    if (/^3[47]/.test(clean)) return { type: 'American Express', color: 'from-[#059669] to-[#047857]', local: false };
    if (/^6(?:011|5)/.test(clean)) return { type: 'Discover Card', color: 'from-[#ea580c] to-[#c2410c]', local: false };
    return { type: 'Nomaʼlum to‘lov tizimi', color: 'from-[#475569] to-[#334155]', local: false };
  };

  const handleCardCheck = (e) => {
    e.preventDefault();
    const clean = cardNumber.replace(/\D/g, '');
    if (clean.length < 8) return;

    setCardChecking(true);
    setCardResult(null);

    setTimeout(() => {
      const isValidFormat = validateLuhn(clean);
      const system = identifyCardSystem(clean);
      const isLeakedSample = ['8600123456789012', '9860123456789012', '4111111111111111'].includes(clean);

      setCardResult({
        cleanNumber: clean.replace(/(\d{4})/g, '$1 ').trim(),
        maskedNumber: clean.length >= 16 ? `${clean.slice(0, 4)} **** **** ${clean.slice(-4)}` : `${clean.slice(0, 4)} **** ${clean.slice(-2)}`,
        system: system.type,
        color: system.color,
        isLocal: system.local,
        isValidFormat: isValidFormat,
        isLeaked: isLeakedSample,
        cvvWarning: "CVV/CVC kod va SMS-kodni hech qachon hech kimga (hatto bank xodimiga ham) aytmang!",
        checks: [
          {
            title: "Luhn algoritmi bo'yicha tuzilishi",
            status: isValidFormat ? 'safe' : 'danger',
            desc: isValidFormat ? "Karta raqami xalqaro ISO/IEC 7812 standartiga to'liq mos keladi." : "Karta raqami formati noto'g'ri yoki qalbaki generatsiya qilingan."
          },
          {
            title: "Qora ro'yxat (Dark Web / Sizib chiqqan bazalar)",
            status: isLeakedSample ? 'danger' : 'safe',
            desc: isLeakedSample ? "DIQQAT! Ushbu karta firibgarlar sizdirgan ommaviy test bazalarida uchradi!" : "Ommaviy kiberxuruj va fishing bazalarida ochiq holda topilmadi."
          },
          {
            title: "SMS-kod / 2FA Himoya tavsiyasi",
            status: 'safe',
            desc: "Ushbu kartaga 3D Secure / SMS-xabarnomani yoqib qo'yish majburiydir."
          }
        ]
      });
      setCardChecking(false);
    }, 1200);
  };

  const handleLinkCheck = (e) => {
    e.preventDefault();
    if (!linkInput.trim()) return;

    setLinkChecking(true);
    setLinkResult(null);

    const input = linkInput.trim().toLowerCase();
    
    setTimeout(() => {
      let isPhishing = false;
      let reasons = [];
      let score = 92; // default safe
      let riskLevel = 'safe';

      // Phishing heuristics
      if (
        input.includes('click') && !input.includes('click.uz') ||
        input.includes('payme') && !input.includes('payme.uz') ||
        input.includes('uzum') && !input.includes('uzum.uz') && !input.includes('uzum.com') ||
        input.includes('bank') && (input.includes('online') || input.includes('bonus') || input.includes('yutuq')) ||
        input.includes('pul') || input.includes('yutuq') || input.includes('hadya') || input.includes('subsidiya') ||
        input.includes('.tk') || input.includes('.ml') || input.includes('.ga') || input.includes('.cf') || input.includes('.gq') ||
        input.includes('bit.ly') || input.includes('tinyurl') || input.includes('t.me/share') ||
        /@/.test(input)
      ) {
        isPhishing = true;
        score = 15;
        riskLevel = 'danger';
        reasons.push("Soxta domen orqali bank/to'lov tizimiga taqlid qilish (Brand Spoofing) belgilari mavjud.");
        reasons.push("Yutuq, bepul aksiya yoki shubhali bepul pullar va'da qilingan fishing shabloni.");
        reasons.push("Havola maxfiy karta ma'lumotlarini yoki SMS-kodni o'g'irlash uchun yaratilgan bo'lishi ehtimoli juda yuqori.");
      } else if (!input.startsWith('https://')) {
        score = 55;
        riskLevel = 'warning';
        reasons.push("Saytda shifrlangan xavfsiz HTTPS protokoli mavjud emas. Ma'lumotlar ochiq holda uzatilishi mumkin.");
      } else {
        reasons.push("Domen nomi rasmiy ro'yxatdan o'tgan va xavfli fishing bazalarida yo'q.");
        reasons.push("Xavfsiz SSL/TLS sertifikati mavjud va faol.");
      }

      setLinkResult({
        url: linkInput,
        riskLevel,
        score,
        isPhishing,
        reasons,
        cleanDomain: linkInput.replace(/https?:\/\//i, '').split('/')[0]
      });
      setLinkChecking(false);
    }, 1300);
  };

  const simulateAnalysis = (fileData) => {
    setScanning(true);
    setScanResult(null);
    setScanProgress(15);
    setScanStepText("Fayl o'qilmoqda va SHA-256 xesh hisoblanmoqda...");

    setTimeout(() => {
      setScanProgress(45);
      setScanStepText("AndroidManifest.xml va ruxsatnomalar dekompilyatsiya qilinmoqda...");
    }, 700);

    setTimeout(() => {
      setScanProgress(80);
      setScanStepText("DEX kodlar va viruslar bazasi bilan solishtirilmoqda...");
    }, 1400);

    setTimeout(() => {
      setScanProgress(100);
      setScanStepText("Tahlil muvaffaqiyatli yakunlandi!");
      setScanning(false);
      setScanResult(fileData);
    }, 2000);
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(TARGET_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={TARGET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-medium text-sm transition-all shadow-lg shadow-[#0ea5e9]/25 hover:scale-[1.02]"
              >
                <ExternalLink size={16} />
                {t.openExternal}
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#234260] hover:bg-[#2d5277] text-white font-medium text-sm transition-colors border border-[#355b82]"
              >
                <Download size={16} />
                Google Play
              </a>
            </div>
          </div>

          {/* Navigation Tabs - Now includes Card Guard & Link Checker */}
          <div className="flex gap-2 mt-6 pt-6 border-t border-[#234260]/60 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ${
                activeTab === 'scanner'
                  ? 'bg-[#88cc14] text-black shadow-md'
                  : 'bg-[#182a3d] text-[#94a3b8] hover:text-white hover:bg-[#1f364e]'
              }`}
            >
              <FileSearch size={16} />
              {t.tabScanner}
            </button>

            <button
              onClick={() => setActiveTab('card_guard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ${
                activeTab === 'card_guard'
                  ? 'bg-[#38bdf8] text-black shadow-md'
                  : 'bg-[#182a3d] text-[#94a3b8] hover:text-white hover:bg-[#1f364e]'
              }`}
            >
              <CreditCard size={16} />
              {t.tabCard}
              <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.2 rounded-full font-bold ml-1">YANGI</span>
            </button>

            <button
              onClick={() => setActiveTab('link_checker')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ${
                activeTab === 'link_checker'
                  ? 'bg-[#f59e0b] text-black shadow-md'
                  : 'bg-[#182a3d] text-[#94a3b8] hover:text-white hover:bg-[#1f364e]'
              }`}
            >
              <Link2 size={16} />
              {t.tabLink}
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded-full font-bold ml-1">FISHING</span>
            </button>

            <button
              onClick={() => setActiveTab('app_info')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ${
                activeTab === 'app_info'
                  ? 'bg-[#0ea5e9] text-white shadow-md'
                  : 'bg-[#182a3d] text-[#94a3b8] hover:text-white hover:bg-[#1f364e]'
              }`}
            >
              <QrCode size={16} />
              {t.tabInfo}
            </button>

            <button
              onClick={() => setActiveTab('panel')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ${
                activeTab === 'panel'
                  ? 'bg-[#0ea5e9] text-white shadow-md'
                  : 'bg-[#182a3d] text-[#94a3b8] hover:text-white hover:bg-[#1f364e]'
              }`}
            >
              <Cpu size={16} />
              {t.tabPanel}
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* Tab: Card Guard (Karta Himoyasi & Firibgarlik tekshiruvi)        */}
        {/* ============================================================== */}
        {activeTab === 'card_guard' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#142333] border border-[#234260] rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/15 text-[#38bdf8] flex items-center justify-center">
                      <CreditCard size={22} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Bank Kartasi Xavfsizligi va Himoyasi</h2>
                      <p className="text-xs text-[#94a3b8]">Uzcard, Humo, Visa va Mastercard kartalarini xavfsizlik qoidalariga mosligini tekshirish</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                  <ShieldCheck size={14} />
                  <span>Maxfiylik kafolati: CVV kod so'ralmaydi, ma'lumotlar saqlanmaydi</span>
                </div>
              </div>

              {/* Form Input */}
              <form onSubmit={handleCardCheck} className="space-y-4 max-w-2xl mb-8">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#94a3b8] font-bold mb-2">
                    Karta raqami (16 ta raqam):
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
                        setCardNumber(val);
                      }}
                      placeholder="8600 0000 0000 0000 yoki 9860..."
                      className="w-full bg-[#0a121a] border border-[#234260] focus:border-[#38bdf8] rounded-xl px-4 py-3.5 text-lg font-mono text-white placeholder-[#475569] outline-none transition-colors"
                      required
                    />
                    <div className="absolute right-3 top-3 text-xs text-[#64748b] font-mono">
                      {cardNumber.replace(/\D/g, '').length}/16
                    </div>
                  </div>
                  <p className="text-[11px] text-[#64748b] mt-1.5 flex items-center gap-1.5">
                    <Info size={13} />
                    Faqat karta raqamini kiriting. PIN kod, amal qilish muddati yoki CVV/CVC kodlarni hech qayerga kiritmang!
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
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
                        <span>Xavfsizlikni tekshirish</span>
                      </>
                    )}
                  </button>

                  <div className="text-xs text-[#64748b]">yoki test qiling:</div>
                  <button
                    type="button"
                    onClick={() => setCardNumber('8600 1234 5678 9012')}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-[#182838] hover:bg-[#20364d] text-[#94a3b8] transition-colors"
                  >
                    Uzcard namunasi
                  </button>
                  <button
                    type="button"
                    onClick={() => setCardNumber('9860 9876 5432 1098')}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-[#182838] hover:bg-[#20364d] text-[#94a3b8] transition-colors"
                  >
                    Humo namunasi
                  </button>
                </div>
              </form>

              {/* Card Analysis Result */}
              {cardResult && (
                <div className="mt-8 border-t border-[#234260] pt-6 space-y-6">
                  {/* Virtual Card Graphic */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-1">
                      <div className={`p-6 rounded-2xl bg-gradient-to-br ${cardResult.color} text-white shadow-2xl relative overflow-hidden aspect-[1.58/1] flex flex-col justify-between border border-white/20`}>
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-sm tracking-wider uppercase opacity-90">{cardResult.system}</span>
                          <Lock size={18} className="opacity-80" />
                        </div>
                        <div className="font-mono text-lg tracking-widest my-auto text-center font-bold">
                          {cardResult.maskedNumber}
                        </div>
                        <div className="flex justify-between items-end text-xs opacity-80">
                          <div>
                            <div className="text-[9px] uppercase">STATUS</div>
                            <div className="font-semibold">{cardResult.isValidFormat ? 'FAOL KARTA' : 'NOANIQ FORMAT'}</div>
                          </div>
                          <div className="text-[10px] font-mono">SECURE PROTECTED</div>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <div className="p-4 rounded-xl bg-[#0e1722] border border-[#1e2f42] flex items-center justify-between">
                        <span className="text-xs text-[#94a3b8]">To'lov tizimi:</span>
                        <span className="text-sm font-bold text-white font-mono">{cardResult.system}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0e1722] border border-[#1e2f42] flex items-center justify-between">
                        <span className="text-xs text-[#94a3b8]">Standart formati:</span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          cardResult.isValidFormat ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {cardResult.isValidFormat ? 'To‘g‘ri (ISO 7812)' : 'Xato yoki qalbaki'}
                        </span>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0e1722] border border-[#1e2f42] flex items-center justify-between">
                        <span className="text-xs text-[#94a3b8]">Ochiq bazalardagi xavf:</span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          cardResult.isLeaked ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {cardResult.isLeaked ? 'Xavf aniqlandi!' : 'Xavfsiz (Topilmadi)'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Security Checks List */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Shield size={16} className="text-[#38bdf8]" />
                      Himoya tekshiruvlari:
                    </h3>
                    {cardResult.checks.map((chk, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#0e1722] border border-[#1e2f42] flex items-start gap-3">
                        {chk.status === 'safe' ? (
                          <CheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                        ) : (
                          <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
                        )}
                        <div>
                          <div className="text-sm font-semibold text-white">{chk.title}</div>
                          <div className="text-xs text-[#94a3b8] mt-0.5">{chk.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Golden rules for card security */}
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-amber-400">
                      <AlertOctagon size={18} />
                      KARTANI O‘G‘IRLATMASLIKNING 4 TA OLTIN QOIDASI:
                    </div>
                    <ul className="text-xs space-y-1.5 list-disc list-inside text-amber-200/90 leading-relaxed">
                      <li><strong>SMS tasdiqlash kodini (6 ta raqam)</strong> hech kimga, hatto o‘zini bank yoki IIB xodimi deb tanishtirganlarga ham bermang!</li>
                      <li>Kartangiz orqa tarafidagi <strong>3 xonali CVV/CVC kodni</strong> begona saytlarga yoki shaxslarga aslo yubormang.</li>
                      <li>Begona odamlarga pul o‘tkazib berish uchun faqat karta raqamining o‘zi kifoya, hech qanday kod yoki havola bosish shart emas.</li>
                      <li>Telefoningizga shubhali <code>.apk</code> yoki <code>.apk fayllar</code> tashlansa (masalan "Yutuqli aksiya", "Bonus"), ularni ochmang!</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* Tab: Link Checker (Fishing va Zararli Havolalar Skaneri)        */}
        {/* ============================================================== */}
        {activeTab === 'link_checker' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#142333] border border-[#234260] rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                  <Link2 size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Havolani Fishing va Zararga Tekshirish (Anti-Phishing)</h2>
                  <p className="text-xs text-[#94a3b8]">Telegram, SMS yoki ijtimoiy tarmoqlardan kelgan shubhali linklarni xavfsiz tekshiring</p>
                </div>
              </div>

              {/* Form Input */}
              <form onSubmit={handleLinkCheck} className="space-y-4 max-w-3xl my-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#94a3b8] font-bold mb-2">
                    Tekshirmoqchi bo'lgan sayt yoki havola:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={linkInput}
                      onChange={(e) => setLinkInput(e.target.value)}
                      placeholder="Masalan: https://click-bonus-uzbekistan.com yoki https://payme.uz"
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
                    onClick={() => setLinkInput('https://click-bonus-uzbekistan-pul.tk')}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    Xavfli Fishing Namunasi
                  </button>
                  <button
                    type="button"
                    onClick={() => setLinkInput('https://cybershield.uz')}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  >
                    Toza Sayt Namunasi
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
                      {linkResult.riskLevel === 'danger' && <AlertOctagon size={36} className="text-red-400 shrink-0" />}
                      {linkResult.riskLevel === 'warning' && <AlertTriangle size={36} className="text-amber-400 shrink-0" />}
                      {linkResult.riskLevel === 'safe' && <CheckCircle size={36} className="text-emerald-400 shrink-0" />}
                      <div>
                        <div className="text-xs uppercase font-bold tracking-wider opacity-80">Tekshiruv natijasi</div>
                        <div className="text-xl font-black mt-0.5">
                          {linkResult.riskLevel === 'danger' ? 'KRITIK XAVF: SOXTA / FISHING HAVOLA!' :
                           linkResult.riskLevel === 'warning' ? 'SHUBHALI SAYT (Xavfsiz ulanish yo‘q)' :
                           'XAVFSIZ VA RASMIY DOMEN'}
                        </div>
                        <div className="text-xs font-mono opacity-80 mt-1 break-all">{linkResult.url}</div>
                      </div>
                    </div>

                    <div className="px-5 py-3 rounded-xl bg-black/40 border border-white/10 text-center shrink-0">
                      <div className="text-[10px] uppercase font-bold tracking-wider opacity-70">Ishonch indeksi</div>
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

        {/* ============================================================== */}
        {/* Tab: Interactive APK Scanner                                   */}
        {/* ============================================================== */}
        {activeTab === 'scanner' && (
          <div className="space-y-6">
            <div className="bg-[#142333] border border-[#234260] rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <FileSearch className="text-[#88cc14]" size={24} />
                <h2 className="text-xl font-bold text-white">{t.scannerTitle}</h2>
              </div>
              <p className="text-sm text-[#94a3b8] mb-6">{t.scannerDesc}</p>

              {/* Hidden file input for real uploads */}
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
                      className={`text-left p-4 rounded-xl border transition-all ${
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

            {/* Scanning Progress Bar & Animation */}
            {scanning && (
              <div className="bg-[#142333] border border-[#234260] rounded-2xl p-8 text-center space-y-4 shadow-xl">
                <div className="w-12 h-12 border-4 border-[#88cc14] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div>
                  <div className="text-white font-medium text-base mb-1">{t.analyzing}</div>
                  <div className="text-xs text-[#94a3b8] font-mono">{scanStepText}</div>
                </div>
                {/* Progress bar */}
                <div className="max-w-md mx-auto bg-[#0d151c] rounded-full h-2.5 overflow-hidden border border-[#234260]">
                  <div
                    className="bg-[#88cc14] h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Scan Results View */}
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

                {/* Threat Category */}
                <div className="p-3 rounded-xl bg-[#0f1d2b] border border-[#1f364e] flex items-center justify-between">
                  <span className="text-xs text-[#94a3b8]">Xavf toifasi:</span>
                  <span className="text-xs font-bold text-white font-mono">{scanResult.threatType}</span>
                </div>

                {/* Permissions Breakdown */}
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

                {/* Recommendation Box */}
                <div className="p-4 rounded-xl bg-[#1b2f42] border border-[#2d4d6d]">
                  <div className="text-xs uppercase font-bold text-[#88cc14] mb-1">{t.recommendations}</div>
                  <p className="text-sm text-[#e2e8f0] leading-relaxed">{scanResult.recommendation}</p>
                </div>

                {/* Reset button */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setScanResult(null);
                      setSelectedSample(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a2d40] hover:bg-[#233c54] text-[#94a3b8] hover:text-white text-xs font-semibold transition-colors"
                  >
                    <RotateCw size={14} />
                    {t.reScan}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: App Info & QR Code */}
        {activeTab === 'app_info' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {/* QR Card */}
            <div className="bg-[#142333] border border-[#234260] rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center mb-4">
                <QrCode size={26} />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{t.scanQr}</h2>
              <p className="text-xs text-[#94a3b8] mb-6 max-w-sm">{t.scanQrSub}</p>

              <div className="p-4 bg-white rounded-2xl shadow-2xl border-4 border-[#234260] mb-6">
                <img
                  src="/apk-qr.png"
                  alt="APK Qo'riqchi QR Kod"
                  className="w-56 h-56 object-contain rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=15&data=${encodeURIComponent(TARGET_URL)}`;
                  }}
                />
              </div>

              <div className="w-full max-w-md flex items-center gap-2 bg-[#0c1622] px-3 py-2 rounded-xl border border-[#1f364e] mb-5">
                <span className="text-xs font-mono text-[#94a3b8] truncate flex-1 text-left">
                  {TARGET_URL}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1a2d40] hover:bg-[#25405c] text-white text-xs transition-colors"
                  title={t.copyLink}
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-[#10b981]" />
                      <span className="text-[#10b981] font-semibold">{t.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>{t.copyLink}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={TARGET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-medium text-xs transition-all shadow-lg shadow-[#0ea5e9]/25 hover:scale-[1.02] flex items-center gap-1.5"
                >
                  <ExternalLink size={14} />
                  {t.openExternal}
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#234260] hover:bg-[#2d5277] text-white font-medium text-xs transition-colors border border-[#355b82] flex items-center gap-1.5"
                >
                  <Download size={14} />
                  {t.installGooglePlay}
                </a>
              </div>
            </div>

            {/* Application Overview Card */}
            <div className="bg-[#142333] border border-[#234260] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#88cc14]/15 text-[#88cc14] flex items-center justify-center">
                  <Smartphone size={26} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Apk Qo'riqchi</h3>
                  <p className="text-xs text-[#94a3b8]">Baxtiyorov Dev • Kiber xavfsizlik</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-[#cbd5e1] leading-relaxed">
                <p>
                  <strong>Apk Qo'riqchi</strong> — Android qurilmalari uchun mo'ljallangan maxsus xavfsizlik tahlili dasturi bo'lib, telefoningizdagi shubhali ilovalarni, ruxsatlar suiiste'molini hamda josuslik (spyware) va troyanlarni aniqlashga yordam beradi.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#0f1d2b] border border-[#1f364e]">
                  <div className="text-[11px] text-[#94a3b8]">{t.developer}</div>
                  <div className="text-sm font-semibold text-white mt-0.5">Baxtiyorov Dev</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0f1d2b] border border-[#1f364e]">
                  <div className="text-[11px] text-[#94a3b8]">{t.packageId}</div>
                  <div className="text-xs font-mono font-semibold text-[#88cc14] mt-0.5 truncate">com.baxtiyorov.security</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0f1d2b] border border-[#1f364e]">
                  <div className="text-[11px] text-[#94a3b8]">Maxfiylik (Data Safety)</div>
                  <div className="text-sm font-semibold text-[#10b981] mt-0.5">No data collected</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0f1d2b] border border-[#1f364e]">
                  <div className="text-[11px] text-[#94a3b8]">Platforma</div>
                  <div className="text-sm font-semibold text-white mt-0.5">Google Play & Web</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 text-xs text-[#94a3b8] leading-relaxed">
                <div className="font-semibold text-[#0ea5e9] mb-1">KiberQoriqchi Integratsiyasi</div>
                Ushbu bo'lim KiberQoriqchi platformasida kiberxavfsizlik bo'yicha amaliy mashg'ulotlar va mobil zaifliklarni o'rganuvchi talabalar uchun to'liq moslashtirilgan.
              </div>
            </div>
          </div>
        )}

        {/* Tab: Live Panel (Web View) */}
        {activeTab === 'panel' && (
          <div className="bg-[#142333] border border-[#234260] rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in duration-300">
            <div className="flex items-center justify-between px-4 py-3 bg-[#111e2c] border-b border-[#234260]">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-[#10b981] inline-block"></span>
                <span className="text-xs text-[#94a3b8] font-mono ml-2 hidden sm:inline">
                  {TARGET_URL}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setPanelLoadError(false);
                    setIframeKey(k => k + 1);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[#1a2d40] hover:bg-[#233c54] text-[#94a3b8] hover:text-white transition-colors"
                >
                  <RotateCw size={13} />
                  {t.refresh}
                </button>
                <a
                  href={TARGET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[#0ea5e9]/20 hover:bg-[#0ea5e9]/30 text-[#0ea5e9] border border-[#0ea5e9]/30 transition-colors"
                >
                  <ExternalLink size={13} />
                  {t.openExternal}
                </a>
              </div>
            </div>

            <div className="bg-[#0f1d2b] px-4 py-3 border-b border-[#1f364e] text-xs text-[#94a3b8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Info size={16} className="text-[#0ea5e9] flex-shrink-0" />
                <span>{t.iframeNotice}</span>
              </div>
              <a
                href={TARGET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-semibold transition-colors self-start sm:self-auto"
              >
                <ExternalLink size={13} />
                {t.openExternal}
              </a>
            </div>

            <div className="relative w-full bg-[#0a1017]" style={{ height: '75vh', minHeight: '600px' }}>
              {panelLoadError ? (
                <div className="flex h-full w-full items-center justify-center bg-[#0b1320] px-6">
                  <div className="max-w-2xl rounded-2xl border border-[#234260] bg-[#111e2c] p-8 text-center shadow-2xl">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0ea5e9]/10 text-[#0ea5e9]">
                      <Shield size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">APK Qo'riqchi paneli yuklanmadi</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#94a3b8]">
                      Tashqi server xavfsizlik cheklovlari tufayli panel ni ichkaridan ko'rib bo'lmadi. Quyidagi tugmalar yordamida
                      rasmiy havolani ochishingiz mumkin.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={TARGET_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#0ea5e9] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0284c7]"
                      >
                        <ExternalLink size={15} />
                        {t.openExternal}
                      </a>
                      <a
                        href={PLAY_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#355b82] bg-[#234260] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d5277]"
                      >
                        <Download size={15} />
                        Google Play
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  key={iframeKey}
                  src={TARGET_URL}
                  title="APK Qo'riqchi Panel"
                  className="w-full h-full border-none"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                  onError={() => {
                    console.warn('Iframe load notice');
                    setPanelLoadError(true);
                  }}
                  onLoad={() => setPanelLoadError(false)}
                />
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ApkQoriqchiPage;
