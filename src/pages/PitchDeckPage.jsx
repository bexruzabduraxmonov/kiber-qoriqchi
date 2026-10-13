import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Send, Shield, Loader2, Trash2, ChevronDown,
  Copy, Check, RotateCcw, Lock, Wifi, AlertTriangle,
  Eye, Terminal, Globe, Plus, Key
} from 'lucide-react';

// ── API ──────────────────────────────────────────────────────────────────────
const getSystemPrompt = (language = 'uz') => {
  const prompts = {
    uz: `Siz CyberGuard AI — kiber xavfsizlik bo'yicha mutaxassis AI yordamchisisiz.
Faqat quyidagi mavzularda yordam bering:
- Phishing, fishing hujumlari
- Parollar, 2FA, autentifikatsiya
- Malware, ransomware, virus, trojan
- VPN, firewall, tarmoq xavfsizligi
- Social engineering, OSINT
- Web xavfsizligi: XSS, SQLi, CSRF, OWASP Top 10
- Penetration testing, ethical hacking
- Kriptografiya, SSL/TLS
- Incident response, digital forensics
- O'zbekiston va MDH kiber xavfsizligi
Javoblarni O'zbek tilida bering. Texnik terminlarni izohlab, amaliy misollar keltiring.
Boshqa mavzularda: "Men faqat kiber xavfsizlik bo'yicha yordam bera olaman" — deb javob bering.`,
    ru: `Вы — CyberGuard AI, специалист по кибербезопасности.
Помогайте только по следующим темам:
- Фишинг и phishing-атаки
- Пароли, 2FA, аутентификация
- Malware, ransomware, virus, trojan
- VPN, firewall, сетевая безопасность
- Social engineering, OSINT
- Веб-безопасность: XSS, SQLi, CSRF, OWASP Top 10
- Penetration testing, ethical hacking
- Криптография, SSL/TLS
- Incident response, digital forensics
- Кибербезопасность в Узбекистане и СНГ
Отвечайте на русском языке, объясняйте термины и приводите практические примеры.
Если тема не связана с кибербезопасностью: "Я могу помогать только в сфере кибербезопасности".`,
    en: `You are CyberGuard AI, a cybersecurity expert assistant.
Only help with these topics:
- Phishing and social engineering attacks
- Passwords, 2FA, authentication
- Malware, ransomware, viruses, trojans
- VPN, firewall, network security
- Social engineering, OSINT
- Web security: XSS, SQLi, CSRF, OWASP Top 10
- Penetration testing, ethical hacking
- Cryptography, SSL/TLS
- Incident response, digital forensics
- Cybersecurity in Uzbekistan and CIS countries
Answer in English, explain technical terms clearly, and give practical examples.
If the topic is unrelated, say: "I can only help with cybersecurity topics."`
  };

  return prompts[language] || prompts.uz;
};

function buildFallbackReply(input, language = 'uz') {
  const text = (input || '').toLowerCase();
  const templates = {
    uz: {
      phish: `Phishing hujumini aniqlash uchun quyidagilarni tekshiring:\n\n- Yuboruvchi e-pochtasi va domen nomi g'alati ko'rinadi\n- Turtki chiquvchi havolalar real saytga o'xshamaydi\n- So'rov tugmasi yoki login formi tez-tez "tezkor" yoki "yakuniy daqiqa" so'zlari bilan keladi\n- E-pochtada imlo xatolari, katta qizmli linklar yoki qo'shimcha fayllar bo'ladi\n\nAgar shubha tug'ilsa, havolani ochmang, tekshirish uchun alohida browser oching va 2FA yoqilgan bo'lsin.`,
      password: `Kuchli parol quyidagilarni o'z ichiga olishi kerak:\n\n- Kamida 12 ta belgi\n- Katta-kichik harflar, raqamlar va maxsus belgilar\n- So'zlukka kiruvchi ma'lumotlar emas\n- Har bir xizmat uchun alohida parol\n\n2FA (ikki bosqichli autentifikatsiya) qo'shishni tavsiya qilaman. Bu xavfsizlikni sezilarli darajada oshiradi.`,
      web: `Asosiy web xavfsizlik muammolari:\n\n- XSS: foydalanuvchi kiritgan HTML/JS kodini sahifada ishlatish\n- SQLi: so'rovga zararli SQL qo'shish orqali ma'lumotlarni o'qish yoki o'zgartirish\n- CSRF: boshqa saytda foydalanuvchi nomidan buyruq yuborish\n\nHimoya qilish uchun: input filter, prepared statements, SameSite cookies, CSP va validatsiya ishlatilishi kerak.`,
      network: `Tarmoq xavfsizligi uchun quyidagilar muhim:\n\n- VPN foydalansangiz, ma'lumotlar shifrlanadi\n- Firewall ishlatilsa, kiruvchi va chiquvchi trafik nazorat qilinadi\n- Portlar va xizmatlar cheklanishi kerak\n- Doimiy logging va monitoring ko'rsatkichlari kuzatiladi\n\nYaxshi himoya - to'g'ri konfiguratsiya, patching va monitoring kombinatsiyasi.`,
      social: `Social engineering odamning ishonchiga asoslanadi. Bu narsalar ko'pincha muhim:\n\n- Taklif yoki favqulodda vaziyatdan tezkor harakatga undash\n- Ism-sharif, lavozim yoki nomdan foydalanish\n- Ma'lumotlar to'plash uchun qochirishga harakat qilish\n\nHimoya: ma'lumotlarni tekshirish, ayrim so'rovlarni tasdiqlash va xavfsizlik ta'limi.`,
      pentest: `Penetration testing - ruxsatli tekshiruv. Uning bosqichlari:\n\n1. Reconnaissance va ma'lumot yig'ish\n2. Vulnerability scanning\n3. Exploitation va hujum sinovlari\n4. Post-exploitation va ma'lumotlarni baholash\n5. Hisobot va keng qamrovli himoya tavsiyalarini tayyorlash\n\nHar doim faqat ruxsat berilgan tizimlarda ishlash kerak.`,
      default: `Men CyberGuard AI bo'lib, faqat kiber xavfsizlik bo'yicha yordam beraman.\n\nMisollar:\n- Phishing qanday aniqlanadi?\n- Parolni qanday mustahkam qilish kerak?\n- XSS, SQLi va CSRF nimaga olib keladi?\n- VPN, firewall va 2FA nima?\n- Pen testing qanday amalga oshiriladi?\n\nIltimos, bitta aniq savol bering, men uningga asoslangan, amaliy javob beraman.`
    },
    ru: {
      phish: `Чтобы распознать фишинг, проверьте следующее:\n\n- Адрес отправителя и домен выглядят странно\n- Ссылки ведут не на настоящий сайт\n- Призывы к действию часто содержат слова вроде "срочно" или "последний шанс"\n- В письме есть опечатки, длинные ссылки или вложения\n\nЕсли есть сомнения, не открывайте ссылку, проверьте её через отдельный браузер и включите 2FA.`,
      password: `Надёжный пароль должен включать:\n\n- минимум 12 символов\n- большие и маленькие буквы, цифры и спецсимволы\n- не использовать словарные фразы\n- отдельный пароль для каждого сервиса\n\nРекомендую включить 2FA. Это заметно повышает безопасность.`,
      web: `Ключевые веб-уязвимости:\n\n- XSS: внедрение HTML/JS через пользовательский ввод\n- SQLi: добавление вредоносного SQL в запрос\n- CSRF: выполнение действия от имени пользователя на другом сайте\n\nДля защиты используют input validation, prepared statements, SameSite cookies, CSP и фильтрацию данных.`,
      network: `Для сетевой безопасности важно:\n\n- VPN шифрует трафик\n- Firewall контролирует входящий и исходящий трафик\n- Порты и службы должны быть ограничены\n- Нужны логирование и постоянный мониторинг\n\nХорошая защита — это грамотная настройка, patching и мониторинг.`,
      social: `Социальная инженерия строится на доверии. Часто используются:\n\n- Тревожные призывы и срочность\n- Использование имени, должности или авторитета\n- Сбор информации под видом помощи\n\nЗащита: верификация данных, проверка запросов и обучение сотрудников.`,
      pentest: `Penetration testing — это разрешённое тестирование. Этапы:\n\n1. Reconnaissance и сбор информации\n2. Поиск уязвимостей\n3. Эксплуатация и проверка атаки\n4. Пост-эксплуатация и анализ\n5. Подготовка отчёта и рекомендаций\n\nРаботать нужно только в разрешённых системах.`,
      default: `Я CyberGuard AI и помогаю только в сфере кибербезопасности.\n\nПримеры:\n- Как распознать фишинг?\n- Как сделать надёжный пароль?\n- Что такое XSS, SQLi и CSRF?\n- Что делают VPN, firewall и 2FA?\n- Как проводится penetration testing?\n\nСформулируйте один конкретный вопрос, и я дам практический ответ.`
    },
    en: {
      phish: `To spot phishing, check for these signs:\n\n- Sender address and domain look suspicious\n- Links lead to a fake or lookalike website\n- Urgent wording like "act now" or "final notice" is common\n- Emails include typos, odd attachments, or long URLs\n\nIf in doubt, do not click the link; verify it in a separate browser and enable 2FA.`,
      password: `A strong password should include:\n\n- At least 12 characters\n- Upper and lower case letters, numbers, and symbols\n- Avoid dictionary words or personal info\n- Use a unique password for every service\n\nUse 2FA wherever possible to improve protection.`,
      web: `Common web security issues include:\n\n- XSS: injecting HTML/JS through user input\n- SQLi: inserting harmful SQL into a query\n- CSRF: performing actions on behalf of a logged-in user\n\nProtect with validation, prepared statements, SameSite cookies, CSP, and strict input filtering.`,
      network: `Network security depends on:\n\n- VPN for encrypted traffic\n- Firewall for blocking unwanted traffic\n- Limiting ports and services\n- Logging and continuous monitoring\n\nGood defense combines proper configuration, patching, and monitoring.`,
      social: `Social engineering relies on trust. Common patterns include:\n\n- Urgent or high-pressure requests\n- Fake authority or impersonation\n- Requests for private information under false pretences\n\nDefense: verify requests, train users, and validate any unusual action.`,
      pentest: `Penetration testing is a controlled security assessment. It usually includes:\n\n1. Reconnaissance and intelligence gathering\n2. Vulnerability scanning\n3. Exploitation testing\n4. Post-exploitation analysis\n5. Reporting and remediation guidance\n\nIt must be performed only on systems you are authorized to test.`,
      default: `I am CyberGuard AI and I help only with cybersecurity topics.\n\nExamples:\n- How do I detect phishing?\n- How do I create a strong password?\n- What are XSS, SQLi, and CSRF?\n- What are VPN, firewall, and 2FA?\n- How does penetration testing work?\n\nAsk one clear question and I will give a practical answer.`
    }
  };

  const topicTemplates = [
    { test: /phish|fishing|aniqlash|email/i, key: 'phish' },
    { test: /parol|password|2fa|auth|login/i, key: 'password' },
    { test: /xss|sqli|csrf|owasp|web/i, key: 'web' },
    { test: /vpn|firewall|tarmoq|network|traffic/i, key: 'network' },
    { test: /social|engineering|osint|inson/i, key: 'social' },
    { test: /pen|pentest|ethical hacking|hacking/i, key: 'pentest' }
  ];

  const langTemplates = templates[language] || templates.uz;
  const match = topicTemplates.find(({ test }) => test.test(text));
  if (match) return langTemplates[match.key];
  return langTemplates.default;
}

function getClaudeKey() {
  if (typeof window !== 'undefined') {
    const inStorage = window.localStorage.getItem('cyberguard_claude_key') || window.localStorage.getItem('cyberguard_api_key');
    if (inStorage) return inStorage.trim();
  }
  return (
    import.meta.env.VITE_CLAUDE_KEY ||
    import.meta.env.VITE_ANTHROPIC_API_KEY ||
    import.meta.env.VITE_CLAUDE_API_KEY ||
    ''
  ).trim();
}

// ── Suggestion cards ─────────────────────────────────────────────────────────
const getSuggestions = (language = 'uz') => {
  const map = {
    uz: [
      { icon: Lock, title: 'Parol xavfsizligi', desc: 'Kuchli parol yaratish va saqlash usullari', color: '#88cc14' },
      { icon: AlertTriangle, title: 'Phishing hujumi', desc: 'Fishing xatlarini qanday aniqlayman?', color: '#f59e0b' },
      { icon: Wifi, title: 'Tarmoq himoyasi', desc: 'VPN, firewall va shifrlash haqida', color: '#0ea5e9' },
      { icon: Eye, title: 'Social Engineering', desc: 'Inson omili — asosiy zaiflik', color: '#a855f7' },
      { icon: Globe, title: 'Web xavfsizligi', desc: 'XSS, SQLi, CSRF — OWASP Top 10', color: '#06b6d4' },
    ],
    ru: [
      { icon: Lock, title: 'Безопасность паролей', desc: 'Как создавать и хранить сильные пароли', color: '#88cc14' },
      { icon: AlertTriangle, title: 'Фишинг', desc: 'Как распознать фишинговые письма?', color: '#f59e0b' },
      { icon: Wifi, title: 'Сетевая защита', desc: 'VPN, firewall и шифрование', color: '#0ea5e9' },
      { icon: Eye, title: 'Социальная инженерия', desc: 'Человеческий фактор как основная слабость', color: '#a855f7' },
      { icon: Globe, title: 'Веб-безопасность', desc: 'XSS, SQLi, CSRF — OWASP Top 10', color: '#06b6d4' },
    ],
    en: [
      { icon: Lock, title: 'Password security', desc: 'How to create and store strong passwords', color: '#88cc14' },
      { icon: AlertTriangle, title: 'Phishing attacks', desc: 'How do I spot phishing emails?', color: '#f59e0b' },
      { icon: Wifi, title: 'Network protection', desc: 'VPN, firewall, and encryption basics', color: '#0ea5e9' },
      { icon: Eye, title: 'Social engineering', desc: 'Human factor as the main weakness', color: '#a855f7' },
      { icon: Globe, title: 'Web security', desc: 'XSS, SQLi, CSRF — OWASP Top 10', color: '#06b6d4' },
    ]
  };

  return map[language] || map.uz;
};

const getQuickQuestions = (language = 'uz') => {
  const map = {
    uz: [
      'Phishing xatolarini qanday aniqlash mumkin?',
      'Kuchli parol qanday bo’lishi kerak?',
      'VPN va firewall nima vazifa bajaradi?',
      'Social engineeringdan qanday himoyalanam?',
      'XSS, SQLi va CSRF nima va ularni qanday himoya qilish kerak?'
    ],
    ru: [
      'Как распознать фишинговые письма?',
      'Какой должен быть надежный пароль?',
      'Что делают VPN и firewall?',
      'Как защититься от социальной инженерии?',
      'Что такое XSS, SQLi и CSRF и как их защитить?'
    ],
    en: [
      'How can I detect phishing emails?',
      'What makes a strong password?',
      'What do VPN and firewall do?',
      'How can I protect myself from social engineering?',
      'What are XSS, SQLi, and CSRF and how do I prevent them?'
    ]
  };

  return map[language] || map.uz;
};

// ── Claude API (Anthropic) ───────────────────────────────────────────────────
async function askClaude(messages, language = 'uz') {
  const key = getClaudeKey();
  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || '';

  if (!key || key === 'YOUR_CLAUDE_API_KEY_HERE') {
    return buildFallbackReply(lastUserMessage || "kiber xavfsizlik haqida umumiy ma'lumot", language);
  }

  const API_URL = 'https://api.anthropic.com/v1/messages';
  const systemPrompt = getSystemPrompt(language);

  // Anthropic messages format: alternating user and assistant roles
  const anthropicMessages = [];
  for (const m of messages) {
    const role = m.role === 'assistant' ? 'assistant' : 'user';
    const content = typeof m.content === 'string' ? m.content : String(m.content || '');
    if (!content.trim()) continue;

    if (anthropicMessages.length > 0 && anthropicMessages[anthropicMessages.length - 1].role === role) {
      anthropicMessages[anthropicMessages.length - 1].content += '\n\n' + content;
    } else {
      anthropicMessages.push({ role, content });
    }
  }

  while (anthropicMessages.length > 0 && anthropicMessages[0].role !== 'user') {
    anthropicMessages.shift();
  }

  if (anthropicMessages.length === 0) {
    anthropicMessages.push({ role: 'user', content: lastUserMessage || "Kiber xavfsizlik haqida ma'lumot bering" });
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
        system: systemPrompt,
        messages: anthropicMessages,
      }),
    });

    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      throw new Error(e?.error?.message || `HTTP error ${res.status}`);
    }

    const d = await res.json();
    const replyText = d?.content
      ?.filter(item => item.type === 'text')
      ?.map(item => item.text)
      ?.join('\n');

    return replyText || 'Javob olinmadi.';
  } catch (error) {
    console.warn('Claude API call failed:', error);
    if (error.message && !error.message.includes('Failed to fetch')) {
      throw error;
    }
    return buildFallbackReply(lastUserMessage || "kiber xavfsizlik haqida umumiy ma'lumot", language);
  }
}

// ── Markdown renderer ────────────────────────────────────────────────────────
function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g).map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**'))
      return <strong key={i} className="font-semibold text-white">{p.slice(2,-2)}</strong>;
    if (p.startsWith('`') && p.endsWith('`'))
      return <code key={i} className="bg-[#2d2d2d] text-[#88cc14] px-1.5 py-0.5 rounded text-[13px] font-mono">{p.slice(1,-1)}</code>;
    if (p.startsWith('*') && p.endsWith('*'))
      return <em key={i} className="italic text-[#adadad]">{p.slice(1,-1)}</em>;
    return p;
  });
}

function MarkdownBlock({ text }) {
  const lines = text.split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const ln = lines[i];
    if (ln.startsWith('### '))
      out.push(<h3 key={i} className="text-[15px] font-bold text-[#88cc14] mt-4 mb-1">{ln.slice(4)}</h3>);
    else if (ln.startsWith('## '))
      out.push(<h2 key={i} className="text-[17px] font-bold text-white mt-5 mb-2">{ln.slice(3)}</h2>);
    else if (ln.startsWith('# '))
      out.push(<h1 key={i} className="text-[20px] font-bold text-white mt-5 mb-2">{ln.slice(2)}</h1>);
    else if (ln.startsWith('---'))
      out.push(<hr key={i} className="border-[#3d3d3d] my-3" />);
    else if (ln.startsWith('- ') || ln.startsWith('* '))
      out.push(<li key={i} className="ml-5 text-[#ececec] list-disc text-[15px] leading-relaxed">{renderInline(ln.slice(2))}</li>);
    else if (/^\d+\. /.test(ln))
      out.push(<li key={i} className="ml-5 text-[#ececec] list-decimal text-[15px] leading-relaxed">{renderInline(ln.replace(/^\d+\. /, ''))}</li>);
    else if (ln.startsWith('```')) {
      let lang = ln.slice(3).trim();
      let code = '';
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) { code += lines[i] + '\n'; i++; }
      out.push(
        <div key={i} className="my-3 rounded-xl overflow-hidden border border-[#3d3d3d]">
          <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d]">
            <span className="text-xs text-[#888] font-mono">{lang || 'code'}</span>
          </div>
          <pre className="bg-[#1e1e1e] px-4 py-3 overflow-x-auto text-sm font-mono text-[#e6e6e6] leading-relaxed">{code}</pre>
        </div>
      );
    } else if (ln.trim() === '')
      out.push(<div key={i} className="h-1.5" />);
    else
      out.push(<p key={i} className="text-[#ececec] text-[15px] leading-relaxed">{renderInline(ln)}</p>);
    i++;
  }
  return <div className="space-y-0.5">{out}</div>;
}

// ── Typing dots ──────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex gap-1 items-center py-1">
      {[0,1,2].map(i => (
        <span key={i} className="w-2 h-2 rounded-full bg-[#888] animate-bounce"
          style={{ animationDelay: `${i*0.15}s`, animationDuration: '0.9s' }} />
      ))}
    </div>
  );
}

// ── Copy button ──────────────────────────────────────────────────────────────
function CopyButton({ text, copiedText, copyText }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={copy}
      className="flex items-center gap-1.5 text-xs text-[#888] hover:text-[#ececec] transition-colors py-1 px-2 rounded-lg hover:bg-[#2d2d2d]">
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? copiedText : copyText}
    </button>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export const PitchDeckPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const ui = {
    uz: {
      newChat: 'Yangi suhbat',
      clear: 'Tozalash',
      copy: 'Nusxalash',
      copied: 'Nusxalandi',
      retry: 'Qayta so\'rash',
      scroll: 'Pastga',
      placeholder: 'CyberGuard AI ga xabar yozing...',
      hint: 'Enter — yuborish · Shift+Enter — yangi qator · CyberGuard AI xato qilishi mumkin',
      welcome: 'Kiber xavfsizlik bo\'yicha barcha savollaringizga javob beraman',
      quickTitle: 'AI uchun eng yaxshi savollar',
      model: 'Claude 3.5 Sonnet',
      back: 'Orqaga',
      apiKey: 'API Kalit',
      save: 'Saqlash',
      apiKeyTitle: 'Anthropic Claude API Kaliti'
    },
    ru: {
      newChat: 'Новый чат',
      clear: 'Очистить',
      copy: 'Копировать',
      copied: 'Скопировано',
      retry: 'Повторить',
      scroll: 'Вниз',
      placeholder: 'Напишите сообщение в CyberGuard AI...',
      hint: 'Enter — отправить · Shift+Enter — новая строка · CyberGuard AI может ошибаться',
      welcome: 'Отвечу на все ваши вопросы о кибербезопасности',
      quickTitle: 'Лучшие вопросы для ИИ',
      model: 'Claude 3.5 Sonnet',
      back: 'Назад',
      apiKey: 'API Ключ',
      save: 'Сохранить',
      apiKeyTitle: 'Ключ Anthropic Claude API'
    },
    en: {
      newChat: 'New chat',
      clear: 'Clear',
      copy: 'Copy',
      copied: 'Copied',
      retry: 'Ask again',
      scroll: 'Scroll down',
      placeholder: 'Message CyberGuard AI...',
      hint: 'Enter — send · Shift+Enter — new line · CyberGuard AI may be wrong',
      welcome: 'I can answer all your cybersecurity questions',
      quickTitle: 'Best AI questions',
      model: 'Claude 3.5 Sonnet',
      back: 'Back',
      apiKey: 'API Key',
      save: 'Save',
      apiKeyTitle: 'Anthropic Claude API Key'
    }
  }[language] || {
    newChat: 'Yangi suhbat',
    clear: 'Tozalash',
    copy: 'Nusxalash',
    copied: 'Nusxalandi',
    retry: 'Qayta so\'rash',
    scroll: 'Pastga',
    placeholder: 'CyberGuard AI ga xabar yozing...',
    hint: 'Enter — yuborish · Shift+Enter — yangi qator · CyberGuard AI xato qilishi mumkin',
    welcome: 'Kiber xavfsizlik bo\'yicha barcha savollaringizga javob beraman',
    quickTitle: 'AI uchun eng yaxshi savollar',
    model: 'Claude 3.5 Sonnet',
    back: 'Orqaga',
    apiKey: 'API Kalit',
    save: 'Saqlash',
    apiKeyTitle: 'Anthropic Claude API Kaliti'
  };
  const suggestions = getSuggestions(language);
  const quickQuestions = getQuickQuestions(language);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => (typeof window !== 'undefined' ? (window.localStorage.getItem('cyberguard_claude_key') || window.localStorage.getItem('cyberguard_api_key') || '') : ''));
  const [keySavedAlert, setKeySavedAlert] = useState(false);
  const endRef = useRef(null);
  const scrollRef = useRef(null);
  const taRef = useRef(null);

  const toBottom = () => endRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { toBottom(); }, [messages, loading]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const h = () => setShowScroll(el.scrollHeight - el.scrollTop - el.clientHeight > 300);
    el.addEventListener('scroll', h);
    return () => el.removeEventListener('scroll', h);
  }, []);

  const handleSaveApiKey = () => {
    if (typeof window !== 'undefined') {
      if (apiKeyInput.trim()) {
        window.localStorage.setItem('cyberguard_claude_key', apiKeyInput.trim());
        window.localStorage.setItem('cyberguard_api_key', apiKeyInput.trim());
      } else {
        window.localStorage.removeItem('cyberguard_claude_key');
        window.localStorage.removeItem('cyberguard_api_key');
      }
      setKeySavedAlert(true);
      setTimeout(() => setKeySavedAlert(false), 2000);
    }
    setShowKeyModal(false);
  };

  const send = async (text = input.trim()) => {
    if (!text || loading) return;
    setInput('');
    if (taRef.current) { taRef.current.style.height = 'auto'; }
    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setLoading(true);
    try {
      const reply = await askClaude(next, language);
      setMessages(p => [...p, { role: 'assistant', content: reply }]);
    } catch (e) {
      const errorMessage = language === 'ru' ? `❌ **Ошибка:** \`${e.message}\`` : language === 'en' ? `❌ **Error:** \`${e.message}\`` : `❌ **Xatolik:** \`${e.message}\``;
      setMessages(p => [...p, { role: 'assistant', content: errorMessage }]);
    } finally {
      setLoading(false);
      setTimeout(() => taRef.current?.focus(), 80);
    }
  };

  const onKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };
  const clear = () => setMessages([]);

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col bg-[#212121]" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2d2d2d] bg-[#212121] flex-shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={clear}
            className="flex items-center gap-2 text-sm text-[#ececec] hover:bg-[#2d2d2d] px-3 py-1.5 rounded-xl transition-colors font-medium">
            <Plus size={16} />
            {ui.newChat}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#88cc14] to-[#0ea5e9] flex items-center justify-center">
            <Shield size={13} className="text-white" />
          </div>
          <span className="text-[#ececec] text-sm font-semibold">CyberGuard AI</span>
          <span className="text-[10px] text-[#888] bg-[#2d2d2d] px-2 py-0.5 rounded-full">{ui.model}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowKeyModal(true)}
            title={ui.apiKey}
            className="flex items-center gap-1.5 text-xs text-[#888] hover:text-[#88cc14] hover:bg-[#2d2d2d] px-2.5 py-1.5 rounded-xl transition-colors"
          >
            <Key size={14} />
            <span className="hidden sm:inline">{ui.apiKey}</span>
          </button>
          {messages.length > 0 && (
            <button onClick={clear} title={ui.clear}
              className="p-2 rounded-xl text-[#666] hover:text-[#ef4444] hover:bg-[#2d2d2d] transition-colors">
              <Trash2 size={15} />
            </button>
          )}
          {onNavigate && (
            <button onClick={() => onNavigate('home')}
              className="text-sm text-[#666] hover:text-[#ececec] px-3 py-1.5 rounded-xl hover:bg-[#2d2d2d] transition-colors">
              ← {ui.back}
            </button>
          )}
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#3d3d3d transparent' }}>
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full px-4 pb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#88cc14] to-[#0ea5e9] flex items-center justify-center mb-6 shadow-2xl">
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">CyberGuard AI</h1>
            <p className="text-[#888] text-base mb-6 text-center max-w-sm">
              {ui.welcome}
            </p>

            <div className="mb-8 w-full max-w-2xl">
              <div className="text-xs uppercase tracking-[0.2em] text-[#6b7280] mb-3 text-center">{ui.quickTitle}</div>
              <div className="flex flex-wrap justify-center gap-2">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => send(q)}
                    disabled={loading}
                    className="px-3 py-2 rounded-full border border-[#3d3d3d] bg-[#2d2d2d] text-[12px] text-[#e5e7eb] hover:border-[#88cc14] hover:text-[#88cc14] transition-colors disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-2xl">
              {suggestions.map((s, i) => {
                const Icon = s.icon;
                return (
                  <button key={i} onClick={() => send(s.desc)} disabled={loading}
                    className="group flex flex-col gap-2 p-4 rounded-2xl bg-[#2d2d2d] hover:bg-[#383838] border border-transparent hover:border-[#4d4d4d] text-left transition-all duration-200 disabled:opacity-50">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: s.color + '22', color: s.color }}>
                      <Icon size={17} />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium leading-tight">{s.title}</div>
                      <div className="text-[#888] text-xs mt-0.5 leading-snug">{s.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-2">
            {messages.map((msg, idx) => (
              <div key={idx}>
                {msg.role === 'user' ? (
                  <div className="flex justify-end mb-1">
                    <div className="max-w-[75%] bg-[#2d2d2d] text-[#ececec] rounded-3xl rounded-br-md px-5 py-3 text-[15px] leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3 mb-3 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#88cc14] to-[#0ea5e9] flex items-center justify-center mt-0.5">
                      <Shield size={15} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <MarkdownBlock text={msg.content} />
                      <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CopyButton text={msg.content} copyText={ui.copy} copiedText={ui.copied} />
                        <button
                          onClick={() => {
                            const prev = messages.slice(0, idx);
                            setMessages(prev);
                            if (prev.length > 0) {
                              const lastUser = [...prev].reverse().find(m => m.role === 'user');
                              if (lastUser) send(lastUser.content);
                            }
                          }}
                          className="flex items-center gap-1.5 text-xs text-[#888] hover:text-[#ececec] transition-colors py-1 px-2 rounded-lg hover:bg-[#2d2d2d]">
                          <RotateCcw size={13} />
                          {ui.retry}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#88cc14] to-[#0ea5e9] flex items-center justify-center">
                  <Shield size={15} className="text-white" />
                </div>
                <div className="flex items-center">
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        )}
      </div>

      {showScroll && !isEmpty && (
        <div className="flex justify-center pb-2 flex-shrink-0">
          <button onClick={toBottom}
            className="flex items-center gap-1.5 text-xs text-[#888] hover:text-white bg-[#2d2d2d] hover:bg-[#383838] border border-[#3d3d3d] px-3 py-1.5 rounded-full transition-all">
            <ChevronDown size={14} />
            {ui.scroll}
          </button>
        </div>
      )}

      <div className="flex-shrink-0 px-4 pb-4 pt-2 bg-[#212121]">
        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-end gap-2 bg-[#2d2d2d] rounded-3xl border border-[#3d3d3d] px-4 py-3 focus-within:border-[#4d4d4d] transition-colors shadow-xl">
            <textarea
              ref={taRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder={ui.placeholder}
              rows={1}
              disabled={loading}
              className="flex-1 bg-transparent text-[#ececec] placeholder-[#555] text-[15px] resize-none outline-none leading-relaxed min-h-[28px] max-h-[200px] overflow-y-auto disabled:opacity-50"
              style={{ scrollbarWidth: 'none' }}
              onInput={e => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
              }}
            />

            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 disabled:bg-[#3d3d3d] disabled:cursor-not-allowed disabled:text-[#555] enabled:bg-white enabled:text-[#212121] enabled:hover:bg-[#e0e0e0]">
              {loading
                ? <Loader2 size={16} className="text-[#555] animate-spin" />
                : <Send size={16} />}
            </button>
          </div>

          <p className="text-center text-[#444] text-[11px] mt-2.5">
            {ui.hint}
          </p>
        </div>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#242424] border border-[#3d3d3d] rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-white font-semibold text-base">
                <div className="w-7 h-7 rounded-lg bg-[#88cc14]/20 text-[#88cc14] flex items-center justify-center">
                  <Key size={15} />
                </div>
                <h3>{ui.apiKeyTitle}</h3>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#888] hover:text-white hover:bg-[#333] transition-colors"
              >
                ✕
              </button>
            </div>
            
            <p className="text-xs text-[#999] mb-4 leading-relaxed">
              {language === 'ru' 
                ? 'Введите ваш Anthropic Claude API ключ (sk-ant-api03-...). Ключ сохраняется локально в браузере. Если оставить пустым, используется значение из .env или встроенный ответ.'
                : language === 'en'
                ? 'Enter your Anthropic Claude API key (sk-ant-api03-...). The key is stored locally in your browser. If empty, the key from .env or built-in responses will be used.'
                : "Anthropic Claude API kalitini kiriting (sk-ant-api03-...). Kalit brauzeringizda xavfsiz saqlanadi. Agar bo'sh qoldirilsa, .env dagi kalit yoki ichki tizim javoblari ishlatiladi."
              }
            </p>

            <div className="mb-4">
              <label className="block text-xs text-[#888] mb-1.5 font-medium">Claude API Key</label>
              <input
                type="password"
                value={apiKeyInput}
                onChange={e => setApiKeyInput(e.target.value)}
                placeholder="sk-ant-api03-..."
                className="w-full bg-[#181818] border border-[#3d3d3d] focus:border-[#88cc14] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none font-mono transition-colors"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#333]">
              <button
                type="button"
                onClick={() => {
                  setApiKeyInput('');
                  if (typeof window !== 'undefined') {
                    window.localStorage.removeItem('cyberguard_claude_key');
                    window.localStorage.removeItem('cyberguard_api_key');
                  }
                  setShowKeyModal(false);
                }}
                className="px-3 py-2 rounded-xl text-xs text-[#888] hover:text-[#ef4444] transition-colors"
              >
                {language === 'ru' ? 'Сбросить' : language === 'en' ? 'Reset' : 'Tozalash'}
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#aaa] hover:text-white hover:bg-[#333] transition-colors"
                >
                  {language === 'ru' ? 'Отмена' : language === 'en' ? 'Cancel' : 'Bekor qilish'}
                </button>
                <button
                  type="button"
                  onClick={handleSaveApiKey}
                  className="px-4 py-2 bg-[#88cc14] hover:bg-[#9de01b] text-black font-semibold rounded-xl text-xs transition-colors shadow-lg shadow-[#88cc14]/20"
                >
                  {ui.save}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {keySavedAlert && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#88cc14] text-black px-4 py-2.5 rounded-xl font-medium text-xs shadow-xl flex items-center gap-2">
          <Check size={14} />
          {language === 'ru' ? 'Ключ сохранён' : language === 'en' ? 'Key saved' : 'Kalit saqlandi'}
        </div>
      )}
    </div>
  );
};

export default PitchDeckPage;
