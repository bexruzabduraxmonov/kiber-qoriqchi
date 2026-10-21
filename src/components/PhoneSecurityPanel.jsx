import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import {
  QUESTION_DEFS,
  detectDevice,
  getPhoneScanLink,
  loadScans,
  removeScan,
  runAutoChecks,
  saveScan,
  scoreScan,
} from '../utils/phoneSecurity';

const COPY = {
  uz: {
    connect: 'Telefonni ulash',
    reconnect: 'Yana tekshirish',
    otherPerson: 'Boshqa odamni tekshirish',
    ownerPh: 'Ismingiz',
    ownerHint: 'Natija shu ism ostida saqlanadi — har bir odam alohida tekshiriladi.',
    thisDevice: 'Shu qurilmani tekshirish',
    qrTitle: 'Telefonni QR orqali ulash',
    qrHint: 'Kompyuterdan foydalanayotgan bo‘lsangiz, telefon kamerasi bilan QR kodni skanerlang. Telefon brauzerida shu sahifa ochiladi.',
    copyLink: 'Havolani nusxalash',
    copied: 'Nusxa olindi',
    notPhone: 'Hozir kompyuter ulangan. To‘liq natija uchun telefoningizdan kiring.',
    scanning: 'Telefon himoyasi tekshirilmoqda...',
    qTitle: 'Himoya odatlari',
    qSub: 'Brauzer ko‘ra olmaydigan narsalarni siz belgilaysiz. Haqiqiy ball shu javoblardan ham hisoblanadi.',
    yes: 'Ha',
    no: "Yo‘q",
    finish: 'Natijani hisoblash',
    protected: 'Himoyalangan',
    atRisk: 'Xavf bor',
    critical: 'Zaif',
    device: 'Qurilma',
    overall: 'Umumiy xavfsizlik',
    apps: 'Ilova monitoringi',
    password: 'Parol salomatligi',
    network: 'Tarmoq qalqoni',
    people: 'Tekshirilgan odamlar',
    empty: 'Hali hech kim telefonini ulamagan',
    threats: 'Topilgan kamchiliklar',
    secureApps: 'Ishonchli holat',
    risk: 'Xavf darajasi',
    recTitle: 'Nima qilish kerak',
    disclaimer: 'Tekshiruv brauzer ma’lumotlari (model, OS, HTTPS, 2FA/passkey) va sizning javoblaringiz asosida ishlaydi. Bu to‘liq antivirus o‘rnini bosmaydi.',
    questions: {
      lock: 'Ekran qulfi yoqilganmi? (PIN, grafik yoki barmoq izi)',
      twofa: 'Telegram, bank va pochtada 2FA yoqilganmi?',
      store: 'Ilovalarni faqat Play Store / App Store’dan o‘rnatasizmi?',
      updates: 'Telefon tizimi va ilovalari yangilab turiladimi?',
      phishing: 'SMS/Telegramdagi noma’lum havolani ochmaysizmi?',
      find: 'Telefonni topish / masofadan bloklash yoqilganmi?',
    },
    recs: {
      https: 'Faqat HTTPS saytlardan foydalaning.',
      webauthn: 'Brauzeringiz passkey/2FA ni to‘liq qo‘llab-quvvatlamaydi — yangilang.',
      biometrics: 'Barmoq izi yoki yuz tanishni yoqing.',
      lock: 'Darhol PIN yoki biometrik qulf qo‘ying.',
      twofa: 'Bank, Telegram va email’da 2FA yoqing.',
      store: 'APK ni noma’lum manbalardan o‘rnatmang.',
      updates: 'Tizim yangilanishlarini o‘rnating.',
      phishing: 'Shubhali SMS va “sovrin” havolalarini ochmang.',
      find: 'Find My Device / iPhone’ni topish ni yoqing.',
      os: 'Operatsion tizim eskirgan — yangilang yoki yangi telefon rejalashtiring.',
    },
    steps: [
      'Qurilma modeli aniqlanmoqda',
      'Operatsion tizim tekshirilmoqda',
      'HTTPS va xavfsiz kontekst',
      '2FA / passkey imkoniyati',
      'Brauzer va tarmoq holati',
      'Himoya balli yig‘ilmoqda',
    ],
  },
  ru: {
    connect: 'Подключить телефон',
    reconnect: 'Проверить снова',
    otherPerson: 'Проверить другого человека',
    ownerPh: 'Ваше имя',
    ownerHint: 'Результат сохранится на это имя — каждого человека проверяем отдельно.',
    thisDevice: 'Проверить это устройство',
    qrTitle: 'Подключить телефон по QR',
    qrHint: 'Если вы за компьютером, отсканируйте QR камерой телефона. Страница откроется в браузере телефона.',
    copyLink: 'Скопировать ссылку',
    copied: 'Скопировано',
    notPhone: 'Сейчас подключен компьютер. Для полного отчёта откройте страницу с телефона.',
    scanning: 'Проверяем защиту телефона...',
    qTitle: 'Привычки безопасности',
    qSub: 'То, что браузер не видит, отмечаете вы. Итоговый балл считается и по этим ответам.',
    yes: 'Да',
    no: 'Нет',
    finish: 'Посчитать результат',
    protected: 'Защищён',
    atRisk: 'Есть риск',
    critical: 'Уязвим',
    device: 'Устройство',
    overall: 'Общая безопасность',
    apps: 'Мониторинг приложений',
    password: 'Здоровье паролей',
    network: 'Сетевой щит',
    people: 'Проверенные люди',
    empty: 'Пока никто не подключал телефон',
    threats: 'Найденные пробелы',
    secureApps: 'Надёжность',
    risk: 'Уровень риска',
    recTitle: 'Что сделать',
    disclaimer: 'Проверка основана на данных браузера (модель, ОС, HTTPS, 2FA/passkey) и ваших ответах. Это не замена полноценному антивирусу.',
    questions: {
      lock: 'Включена ли блокировка экрана? (PIN, графический ключ или отпечаток)',
      twofa: 'Включён ли 2FA в Telegram, банке и почте?',
      store: 'Ставите приложения только из Play Store / App Store?',
      updates: 'Система и приложения обновляются?',
      phishing: 'Не открываете неизвестные ссылки из SMS/Telegram?',
      find: 'Включён поиск устройства / удалённая блокировка?',
    },
    recs: {
      https: 'Пользуйтесь только HTTPS-сайтами.',
      webauthn: 'Обновите браузер для поддержки passkey/2FA.',
      biometrics: 'Включите отпечаток или Face ID.',
      lock: 'Сразу поставьте PIN или биометрию.',
      twofa: 'Включите 2FA в банке, Telegram и почте.',
      store: 'Не ставьте APK из неизвестных источников.',
      updates: 'Установите обновления системы.',
      phishing: 'Не открывайте сомнительные SMS и «призы».',
      find: 'Включите «Найти устройство».',
      os: 'Система устарела — обновите или запланируйте новый телефон.',
    },
    steps: [
      'Определяем модель устройства',
      'Проверяем операционную систему',
      'HTTPS и безопасный контекст',
      'Поддержка 2FA / passkey',
      'Браузер и сеть',
      'Считаем защитный балл',
    ],
  },
  en: {
    connect: 'Connect phone',
    reconnect: 'Scan again',
    otherPerson: 'Check another person',
    ownerPh: 'Your name',
    ownerHint: 'The result is saved under this name — each person is checked separately.',
    thisDevice: 'Scan this device',
    qrTitle: 'Connect phone with QR',
    qrHint: 'If you are on a computer, scan the QR with your phone camera. This page will open in the phone browser.',
    copyLink: 'Copy link',
    copied: 'Copied',
    notPhone: 'A computer is connected now. Open this page on your phone for a full report.',
    scanning: 'Checking phone protection...',
    qTitle: 'Security habits',
    qSub: 'You confirm what the browser cannot see. The score uses these answers too.',
    yes: 'Yes',
    no: 'No',
    finish: 'Calculate result',
    protected: 'Protected',
    atRisk: 'At risk',
    critical: 'Weak',
    device: 'Device',
    overall: 'Overall security',
    apps: 'App monitoring',
    password: 'Password health',
    network: 'Network shield',
    people: 'Checked people',
    empty: 'Nobody has connected a phone yet',
    threats: 'Gaps found',
    secureApps: 'Secure state',
    risk: 'Risk score',
    recTitle: 'What to do',
    disclaimer: 'The check uses browser data (model, OS, HTTPS, 2FA/passkey) and your answers. It does not replace a full antivirus.',
    questions: {
      lock: 'Is screen lock on? (PIN, pattern, or fingerprint)',
      twofa: 'Is 2FA on for Telegram, bank, and email?',
      store: 'Do you install apps only from Play Store / App Store?',
      updates: 'Are the OS and apps kept updated?',
      phishing: 'Do you avoid unknown SMS/Telegram links?',
      find: 'Is Find My Device / remote lock enabled?',
    },
    recs: {
      https: 'Use HTTPS sites only.',
      webauthn: 'Update your browser for passkey/2FA support.',
      biometrics: 'Turn on fingerprint or Face ID.',
      lock: 'Set a PIN or biometric lock now.',
      twofa: 'Enable 2FA on bank, Telegram, and email.',
      store: 'Do not sideload APKs from unknown sources.',
      updates: 'Install system updates.',
      phishing: 'Do not open suspicious prize or SMS links.',
      find: 'Turn on Find My Device.',
      os: 'The OS is outdated — update it or plan a new phone.',
    },
    steps: [
      'Detecting device model',
      'Checking operating system',
      'HTTPS and secure context',
      '2FA / passkey support',
      'Browser and network',
      'Calculating protection score',
    ],
  },
};

function riskColor(risk) {
  if (risk === 'High') return '#ef4444';
  if (risk === 'Medium') return '#f59e0b';
  return '#88cc14';
}

function statusLabel(overall, c) {
  if (overall >= 80) return c.protected;
  if (overall >= 55) return c.atRisk;
  return c.critical;
}

function statusColor(overall) {
  if (overall >= 80) return '#88cc14';
  if (overall >= 55) return '#f59e0b';
  return '#ef4444';
}

export const PhoneSecurityPanel = () => {
  const { language, t } = useLanguage();
  const { userName } = useUser();
  const c = COPY[language] || COPY.uz;

  const [step, setStep] = useState('idle');
  const [owner, setOwner] = useState(userName || '');
  const [copied, setCopied] = useState(false);
  const [scanIndex, setScanIndex] = useState(0);
  const [device, setDevice] = useState(null);
  const [auto, setAuto] = useState(null);
  const [answers, setAnswers] = useState({});
  const [scans, setScans] = useState(() => loadScans());
  const [activeId, setActiveId] = useState(() => loadScans()[0]?.id || null);

  const scanLink = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return getPhoneScanLink();
  }, []);

  const qrSrc = scanLink
    ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&bgcolor=0d151c&color=88cc14&data=${encodeURIComponent(scanLink)}`
    : '';

  useEffect(() => {
    if (sessionStorage.getItem('cybershield_autostart_phone_scan') === '1') {
      sessionStorage.removeItem('cybershield_autostart_phone_scan');
      setStep('connect');
    }
  }, []);

  const active = scans.find((item) => item.id === activeId) || scans[0] || null;

  const headerStats = active
    ? [
        { label: c.threats, value: String(active.threatsFound), color: '#88cc14' },
        { label: c.secureApps, value: `${active.bars.apps}%`, color: '#0ea5e9' },
        { label: c.risk, value: active.risk, color: riskColor(active.risk) },
      ]
    : [
        { label: 'Threats blocked', value: '—', color: '#88cc14' },
        { label: 'Secure apps', value: '—', color: '#0ea5e9' },
        { label: 'Risk score', value: '—', color: '#f59e0b' },
      ];

  const startScan = async () => {
    const name = (owner || userName || '').trim() || (language === 'ru' ? 'Гость' : language === 'en' ? 'Guest' : 'Mehmon');
    setOwner(name);
    setStep('scanning');
    setScanIndex(0);
    setAnswers({});

    const found = await detectDevice();
    setDevice(found);

    const timers = c.steps.map((_, i) =>
      setTimeout(() => setScanIndex(i), 450 * i)
    );

    const result = await runAutoChecks(found);
    setAuto(result);

    window.setTimeout(() => {
      timers.forEach(clearTimeout);
      setStep('questions');
    }, 450 * c.steps.length + 350);
  };

  const finishScan = () => {
    if (!device || !auto) return;
    const scored = scoreScan({ auto, answers });
    const record = {
      id: `${Date.now()}`,
      ownerName: (owner || '').trim() || 'Mehmon',
      deviceName: device.model,
      os: device.os,
      osVersion: device.osVersion,
      browser: device.browser,
      isMobile: device.isMobile,
      scannedAt: new Date().toISOString(),
      checks: auto.checks,
      answers: { ...answers },
      ...scored,
    };
    const next = saveScan(record);
    setScans(next);
    setActiveId(record.id);
    setStep('result');
  };

  const barItems = active
    ? [
        { label: c.apps, value: active.bars.apps },
        { label: c.password, value: active.bars.password },
        { label: c.network, value: active.bars.network },
      ]
    : [
        { label: c.apps, value: 0 },
        { label: c.password, value: 0 },
        { label: c.network, value: 0 },
      ];

  const allAnswered = QUESTION_DEFS.every((q) => typeof answers[q.id] === 'boolean');

  return (
    <div className="mb-12 rounded-2xl border border-[#88cc14]/30 bg-[#1a232c] p-6 sm:p-8 shadow-[0_0_30px_rgba(136,204,20,0.08)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#88cc14]/10 border border-[#88cc14]/30">
            <i className="fa-solid fa-mobile-screen-button text-xl text-[#88cc14]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{t('mobile_title')}</h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {headerStats.map((stat) => (
            <div key={stat.label} className="rounded-full border border-[#2d3d4f] bg-[#0d151c] px-3 py-1.5">
              <span className="text-[#94a3b8]">{stat.label}: </span>
              <span style={{ color: stat.color }} className="font-bold">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[#94a3b8] max-w-3xl mb-6">{t('mobile_sub')}</p>

      <div className="grid xl:grid-cols-[1.5fr_0.9fr] gap-5">
        <div>
          {step === 'idle' && (
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: 'fa-shield-keyhole', colorKey: '#88cc14', tKey: 'mob_1_t', dKey: 'mob_1_d' },
                { icon: 'fa-mobile-screen-button', colorKey: '#0ea5e9', tKey: 'mob_2_t', dKey: 'mob_2_d' },
                { icon: 'fa-user-shield', colorKey: '#a855f7', tKey: 'mob_3_t', dKey: 'mob_3_d' },
                { icon: 'fa-wifi', colorKey: '#f59e0b', tKey: 'mob_4_t', dKey: 'mob_4_d' },
              ].map((item) => (
                <div
                  key={item.tKey}
                  className="group rounded-xl border border-[#2d3d4f] bg-[#0d151c] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/10"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${item.colorKey}18`, border: `1px solid ${item.colorKey}30` }}
                  >
                    <i className={`fa-solid ${item.icon} text-lg`} style={{ color: item.colorKey }} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{t(item.tKey)}</h3>
                  <p className="text-sm text-[#94a3b8] leading-relaxed">{t(item.dKey)}</p>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setStep('connect')}
                className="sm:col-span-2 rounded-xl border border-[#88cc14]/40 bg-[#88cc14]/10 px-5 py-4 text-left hover:bg-[#88cc14]/20 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-white font-bold">{c.connect}</div>
                    <div className="text-sm text-[#94a3b8] mt-1">{c.ownerHint}</div>
                  </div>
                  <i className="fa-solid fa-link text-[#88cc14] text-xl" />
                </div>
              </button>
            </div>
          )}

          {step === 'connect' && (
            <div className="rounded-xl border border-[#2d3d4f] bg-[#0d151c] p-5 space-y-5">
              <label className="block">
                <span className="text-xs text-[#94a3b8] uppercase tracking-wider">{c.ownerPh}</span>
                <input
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  placeholder={c.ownerPh}
                  className="mt-2 w-full rounded-lg border border-[#2d3d4f] bg-[#1a232c] px-4 py-3 text-white outline-none focus:border-[#88cc14]"
                />
              </label>
              <p className="text-sm text-[#94a3b8]">{c.ownerHint}</p>

              <div className="grid md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={startScan}
                  className="rounded-xl border border-[#88cc14]/40 bg-[#88cc14] px-4 py-4 text-[#0d151c] font-bold hover:bg-[#9ad62a] transition-colors"
                >
                  <i className="fa-solid fa-mobile-screen-button mr-2" />
                  {c.thisDevice}
                </button>
                <div className="rounded-xl border border-[#2d3d4f] p-4 flex flex-col items-center text-center">
                  <div className="text-sm font-bold text-white mb-2">{c.qrTitle}</div>
                  {qrSrc && (
                    <img src={qrSrc} alt="QR" className="w-[140px] h-[140px] rounded-lg border border-[#2d3d4f] bg-[#0d151c]" />
                  )}
                  <p className="text-xs text-[#94a3b8] mt-3">{c.qrHint}</p>
                  <button
                    type="button"
                    className="mt-3 text-xs text-[#0ea5e9] font-mono"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(scanLink);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1600);
                      } catch {
                        window.prompt(c.copyLink, scanLink);
                      }
                    }}
                  >
                    {copied ? c.copied : c.copyLink}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'scanning' && (
            <div className="rounded-xl border border-[#2d3d4f] bg-[#0d151c] p-6">
              <div className="text-white font-bold mb-1">{c.scanning}</div>
              <div className="text-sm text-[#94a3b8] mb-5">
                {device ? `${device.model} · ${device.os} ${device.osVersion || ''}`.trim() : '...'}
              </div>
              <div className="h-2 rounded-full bg-[#1b2430] overflow-hidden mb-5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#88cc14] to-[#0ea5e9] transition-all duration-500"
                  style={{ width: `${Math.min(100, ((scanIndex + 1) / c.steps.length) * 100)}%` }}
                />
              </div>
              <ul className="space-y-2">
                {c.steps.map((label, i) => (
                  <li key={label} className="flex items-center gap-3 text-sm">
                    <i className={`fa-solid ${i <= scanIndex ? 'fa-circle-check text-[#88cc14]' : 'fa-circle text-[#2d3d4f]'}`} />
                    <span className={i <= scanIndex ? 'text-white' : 'text-[#64748b]'}>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step === 'questions' && (
            <div className="rounded-xl border border-[#2d3d4f] bg-[#0d151c] p-5">
              <h3 className="text-white font-bold text-lg">{c.qTitle}</h3>
              <p className="text-sm text-[#94a3b8] mb-4">{c.qSub}</p>
              <div className="space-y-3">
                {QUESTION_DEFS.map((q) => (
                  <div key={q.id} className="rounded-lg border border-[#2d3d4f] p-3">
                    <div className="text-sm text-white mb-2">{c.questions[q.id]}</div>
                    <div className="flex gap-2">
                      {[true, false].map((val) => (
                        <button
                          key={String(val)}
                          type="button"
                          onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: val }))}
                          className={`px-4 py-1.5 rounded-full text-sm font-bold border ${
                            answers[q.id] === val
                              ? val
                                ? 'bg-[#88cc14] text-[#0d151c] border-[#88cc14]'
                                : 'bg-[#ef4444] text-white border-[#ef4444]'
                              : 'border-[#2d3d4f] text-[#94a3b8]'
                          }`}
                        >
                          {val ? c.yes : c.no}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                disabled={!allAnswered}
                onClick={finishScan}
                className="mt-4 w-full rounded-xl bg-[#88cc14] disabled:opacity-40 text-[#0d151c] font-bold py-3"
              >
                {c.finish}
              </button>
            </div>
          )}

          {step === 'result' && active && (
            <div className="space-y-4">
              {!active.isMobile && (
                <div className="rounded-xl border border-[#f59e0b]/40 bg-[#f59e0b]/10 px-4 py-3 text-sm text-[#f59e0b]">
                  {c.notPhone}
                </div>
              )}
              <div className="rounded-xl border border-[#2d3d4f] bg-[#0d151c] p-5">
                <div className="text-white font-bold mb-3">{c.recTitle}</div>
                <ul className="space-y-2">
                  {active.issues.length === 0 && (
                    <li className="text-sm text-[#88cc14]">
                      <i className="fa-solid fa-check mr-2" />
                      {c.protected}
                    </li>
                  )}
                  {active.issues.map((id) => (
                    <li key={id} className="text-sm text-[#94a3b8]">
                      <i className="fa-solid fa-triangle-exclamation text-[#f59e0b] mr-2" />
                      {c.recs[id]}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setStep('connect')}
                  className="rounded-lg border border-[#88cc14]/40 bg-[#88cc14]/10 px-4 py-2 text-sm font-bold text-[#88cc14]"
                >
                  {c.otherPerson}
                </button>
                <button
                  type="button"
                  onClick={startScan}
                  className="rounded-lg border border-[#2d3d4f] px-4 py-2 text-sm text-white"
                >
                  {c.reconnect}
                </button>
              </div>
              <p className="text-xs text-[#64748b]">{c.disclaimer}</p>
            </div>
          )}
        </div>

        <div className="min-h-[360px] rounded-2xl border border-[#2d3d4f] bg-[#0d151c] p-5 shadow-[0_0_24px_rgba(14,165,233,0.08)]">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#88cc14]/10 border border-[#88cc14]/30 flex items-center justify-center">
                <i className="fa-solid fa-mobile-screen-button text-xl text-[#88cc14]" />
              </div>
              <div>
                <div className="text-[10px] text-[#94a3b8] uppercase tracking-[0.28em]">{c.device}</div>
                <div className="text-white font-bold text-[1.15rem]">
                  {active ? active.deviceName : '—'}
                </div>
                <div className="text-xs text-[#94a3b8]">
                  {active ? `${active.ownerName} · ${active.os} ${active.osVersion || ''}`.trim() : c.empty}
                </div>
              </div>
            </div>
            <span
              className="rounded-full border px-2.5 py-1 text-[10px] font-bold"
              style={{
                color: active ? statusColor(active.overall) : '#64748b',
                borderColor: active ? `${statusColor(active.overall)}55` : '#2d3d4f',
                background: active ? `${statusColor(active.overall)}18` : 'transparent',
              }}
            >
              {active ? statusLabel(active.overall, c) : 'Offline'}
            </span>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#111827] border border-[#2d3d4f] p-4 mb-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#94a3b8] text-xs">{c.overall}</span>
              <span className="font-bold font-mono text-lg" style={{ color: statusColor(active?.overall || 0) }}>
                {active ? `${active.overall}%` : '0%'}
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-[#1b2430] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#88cc14] via-[#22c55e] to-[#0ea5e9] transition-all duration-700"
                style={{ width: `${active?.overall || 0}%` }}
              />
            </div>
          </div>

          <div className="space-y-5 mb-6">
            {barItems.map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between text-xs text-[#94a3b8] mb-1.5">
                  <span>{bar.label}</span>
                  <span className="font-mono text-white">{bar.value}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-[#1b2430] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#0ea5e9] to-[#88cc14] transition-all duration-700"
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="text-[10px] text-[#94a3b8] uppercase tracking-[0.2em] mb-2">{c.people}</div>
            {scans.length === 0 && <p className="text-sm text-[#64748b]">{c.empty}</p>}
            <div className="space-y-2 max-h-40 overflow-auto pr-1">
              {scans.map((item) => (
                <div
                  key={item.id}
                  className={`w-full flex items-center justify-between rounded-lg border px-3 py-2 ${
                    item.id === active?.id ? 'border-[#88cc14]/50 bg-[#88cc14]/10' : 'border-[#2d3d4f] bg-[#151c24]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveId(item.id);
                      setStep('result');
                    }}
                    className="flex-1 text-left"
                  >
                    <span className="text-white text-sm font-bold">{item.ownerName}</span>
                    <span className="block text-[11px] text-[#94a3b8]">{item.deviceName}</span>
                  </button>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-sm" style={{ color: statusColor(item.overall) }}>{item.overall}%</span>
                    <button
                      type="button"
                      aria-label="delete"
                      className="text-[#64748b] hover:text-[#ef4444] text-xs px-1"
                      onClick={() => {
                        const next = removeScan(item.id);
                        setScans(next);
                        setActiveId(next[0]?.id || null);
                        if (!next.length) setStep('idle');
                      }}
                    >
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
