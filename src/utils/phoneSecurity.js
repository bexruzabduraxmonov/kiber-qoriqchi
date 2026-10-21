const STORAGE_KEY = 'cybershield_phone_scans';

const MODEL_NAMES = {
  'SM-A556B': 'Samsung A55',
  'SM-A556E': 'Samsung A55',
  'SM-A5560': 'Samsung A55',
  'SM-A546B': 'Samsung A54',
  'SM-A546E': 'Samsung A54',
  'SM-A346B': 'Samsung A34',
  'SM-A256B': 'Samsung A25',
  'SM-A165F': 'Samsung A16',
  'SM-S921B': 'Samsung S24',
  'SM-S931B': 'Samsung S25',
  'SM-S911B': 'Samsung S23',
  'SM-S918B': 'Samsung S23 Ultra',
  'SM-A536B': 'Samsung A53',
  'SM-A515F': 'Samsung A51',
  'SM-G991B': 'Samsung S21',
  '2201117TG': 'Xiaomi Redmi Note 11',
  '22101316G': 'Xiaomi 13',
  '23021RAA2Y': 'Xiaomi Redmi Note 12',
  '2312DRA50G': 'Xiaomi Redmi Note 13',
  '2409BRN2CG': 'Xiaomi Redmi 14C',
  'CPH2573': 'OPPO Reno 11',
  'CPH2581': 'OPPO Find X7',
  'RMX3630': 'Realme C53',
  'RMX3760': 'Realme Note 50',
  'V2348': 'vivo V30',
  'Pixel 8': 'Google Pixel 8',
  'Pixel 9': 'Google Pixel 9',
};

function prettyModel(raw) {
  if (!raw) return '';
  const trimmed = String(raw).replace(/\s+Build\/.*$/i, '').trim();
  if (MODEL_NAMES[trimmed]) return MODEL_NAMES[trimmed];
  const samsung = trimmed.match(/^SM-[A-Z0-9]+/i);
  if (samsung && MODEL_NAMES[samsung[0].toUpperCase()]) return MODEL_NAMES[samsung[0].toUpperCase()];
  if (/iPhone/i.test(trimmed)) {
    const ios = trimmed.match(/iPhone(?:\s*OS)?\s*([\d_]+)?/i);
    return ios ? 'iPhone' : 'iPhone';
  }
  return trimmed
    .replace(/_/g, ' ')
    .replace(/\bK\b/, '')
    .trim();
}

function parseUserAgent(ua) {
  const info = {
    model: '',
    os: 'Unknown',
    osVersion: '',
    browser: 'Unknown',
    isMobile: /Mobi|Android|iPhone|iPad|iPod/i.test(ua),
  };

  if (/Android/i.test(ua)) {
    info.os = 'Android';
    const ver = ua.match(/Android\s([\d.]+)/);
    if (ver) info.osVersion = ver[1];
    const model =
      ua.match(/;\s([^;)]+?)\sBuild\//i) ||
      ua.match(/Android\s[\d.]+;\s([^)]+)\)/i);
    if (model) info.model = prettyModel(model[1].replace(/;\s*wv$/i, ''));
  } else if (/iPhone|iPad|iPod/i.test(ua)) {
    info.os = /iPad/i.test(ua) ? 'iPadOS' : 'iOS';
    const ver = ua.match(/OS\s([\d_]+)/);
    if (ver) info.osVersion = ver[1].replace(/_/g, '.');
    info.model = /iPad/i.test(ua) ? 'iPad' : 'iPhone';
    info.isMobile = true;
  } else if (/Windows NT 10/i.test(ua)) {
    info.os = 'Windows';
    info.osVersion = /Windows NT 10\.0/i.test(ua) ? '10/11' : '10';
    info.model = 'Windows PC';
  } else if (/Mac OS X/i.test(ua)) {
    info.os = 'macOS';
    const ver = ua.match(/Mac OS X\s([\d_]+)/);
    if (ver) info.osVersion = ver[1].replace(/_/g, '.');
    info.model = 'Mac';
  } else if (/Linux/i.test(ua)) {
    info.os = 'Linux';
    info.model = 'Linux PC';
  }

  if (/Edg\//i.test(ua)) info.browser = 'Edge';
  else if (/OPR\/|Opera/i.test(ua)) info.browser = 'Opera';
  else if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) info.browser = 'Chrome';
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) info.browser = 'Safari';
  else if (/Firefox\//i.test(ua)) info.browser = 'Firefox';

  const chromeVer = ua.match(/Chrome\/(\d+)/);
  if (chromeVer) info.browserVersion = chromeVer[1];
  const firefoxVer = ua.match(/Firefox\/(\d+)/);
  if (firefoxVer) info.browserVersion = firefoxVer[1];
  const safariVer = ua.match(/Version\/(\d+)/);
  if (info.browser === 'Safari' && safariVer) info.browserVersion = safariVer[1];

  return info;
}

function osHealth(os, version) {
  const major = parseInt(String(version || '').split(/[._]/)[0], 10);
  const name = (os || '').toLowerCase();

  if (Number.isNaN(major)) {
    return { score: 6, status: 'unknown', labelKey: 'os_unknown' };
  }

  if (name.includes('android')) {
    if (major >= 14) return { score: 12, status: 'good', labelKey: 'os_current' };
    if (major >= 13) return { score: 10, status: 'good', labelKey: 'os_good' };
    if (major >= 12) return { score: 7, status: 'warn', labelKey: 'os_ok' };
    if (major >= 11) return { score: 4, status: 'warn', labelKey: 'os_old' };
    return { score: 1, status: 'bad', labelKey: 'os_critical' };
  }

  if (name.includes('ios') || name.includes('ipad')) {
    if (major >= 18) return { score: 12, status: 'good', labelKey: 'os_current' };
    if (major >= 17) return { score: 10, status: 'good', labelKey: 'os_good' };
    if (major >= 16) return { score: 7, status: 'warn', labelKey: 'os_ok' };
    if (major >= 15) return { score: 4, status: 'warn', labelKey: 'os_old' };
    return { score: 1, status: 'bad', labelKey: 'os_critical' };
  }

  if (name.includes('windows') || name.includes('mac')) {
    return { score: 8, status: 'warn', labelKey: 'os_computer' };
  }

  return { score: 6, status: 'unknown', labelKey: 'os_unknown' };
}

function browserHealth(browser, version) {
  const v = parseInt(version, 10);
  if (!v) return { score: 3, status: 'unknown' };
  if (browser === 'Chrome' || browser === 'Edge') {
    if (v >= 120) return { score: 6, status: 'good' };
    if (v >= 110) return { score: 4, status: 'warn' };
    return { score: 1, status: 'bad' };
  }
  if (browser === 'Safari') {
    if (v >= 17) return { score: 6, status: 'good' };
    if (v >= 16) return { score: 4, status: 'warn' };
    return { score: 1, status: 'bad' };
  }
  if (browser === 'Firefox') {
    if (v >= 120) return { score: 6, status: 'good' };
    if (v >= 110) return { score: 4, status: 'warn' };
    return { score: 1, status: 'bad' };
  }
  return { score: 3, status: 'unknown' };
}

export async function detectDevice() {
  const ua = navigator.userAgent || '';
  const parsed = parseUserAgent(ua);

  if (navigator.userAgentData) {
    try {
      const hints = await navigator.userAgentData.getHighEntropyValues([
        'model',
        'platform',
        'platformVersion',
        'uaFullVersion',
        'fullVersionList',
      ]);
      if (hints.model) parsed.model = prettyModel(hints.model) || parsed.model;
      if (hints.platform) parsed.os = hints.platform;
      if (hints.platformVersion) parsed.osVersion = hints.platformVersion;
      parsed.isMobile = Boolean(navigator.userAgentData.mobile);
      const list = hints.fullVersionList || [];
      const brand = list.find((item) => item.brand && !/not.a.brand/i.test(item.brand));
      if (brand) {
        parsed.browser = brand.brand.replace('Google ', '').replace('Microsoft ', '');
        parsed.browserVersion = String(brand.version || '').split('.')[0];
      }
    } catch {
      /* client hints may be denied */
    }
  }

  if (!parsed.model) {
    parsed.model = parsed.isMobile ? 'Smartfon' : 'Kompyuter';
  }

  return parsed;
}

export async function runAutoChecks(device) {
  const checks = [];

  const httpsOk = window.isSecureContext || location.protocol === 'https:' || location.hostname === 'localhost';
  checks.push({
    id: 'https',
    ok: httpsOk,
    points: httpsOk ? 8 : 0,
    max: 8,
  });

  const webauthn = typeof window.PublicKeyCredential !== 'undefined';
  let platformAuth = false;
  if (webauthn && PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
    try {
      platformAuth = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    } catch {
      platformAuth = false;
    }
  }
  checks.push({
    id: 'webauthn',
    ok: webauthn,
    points: webauthn ? 6 : 0,
    max: 6,
    extra: platformAuth,
  });
  checks.push({
    id: 'biometrics',
    ok: platformAuth,
    points: platformAuth ? 6 : 0,
    max: 6,
  });

  const os = osHealth(device.os, device.osVersion);
  checks.push({
    id: 'os',
    ok: os.status === 'good',
    warn: os.status === 'warn',
    points: os.score,
    max: 12,
    labelKey: os.labelKey,
  });

  const bh = browserHealth(device.browser, device.browserVersion);
  checks.push({
    id: 'browser',
    ok: bh.status === 'good',
    warn: bh.status === 'warn',
    points: bh.score,
    max: 6,
  });

  checks.push({
    id: 'mobile',
    ok: device.isMobile,
    points: device.isMobile ? 4 : 2,
    max: 4,
  });

  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const saveData = Boolean(conn?.saveData);
  const type = conn?.effectiveType || '';
  checks.push({
    id: 'network',
    ok: type !== 'slow-2g' && type !== '2g',
    points: type === 'slow-2g' || type === '2g' ? 1 : 4,
    max: 4,
    extra: { type: type || 'unknown', saveData },
  });

  const storageOk = (() => {
    try {
      localStorage.setItem('__cs_probe', '1');
      localStorage.removeItem('__cs_probe');
      return true;
    } catch {
      return false;
    }
  })();
  checks.push({
    id: 'storage',
    ok: storageOk,
    points: storageOk ? 2 : 0,
    max: 2,
  });

  const autoScore = checks.reduce((sum, item) => sum + item.points, 0);
  const autoMax = checks.reduce((sum, item) => sum + item.max, 0);

  return { checks, autoScore, autoMax, webauthn, platformAuth, httpsOk, connection: conn?.effectiveType || null };
}

export const QUESTION_DEFS = [
  { id: 'lock', weight: 10, bar: 'password' },
  { id: 'twofa', weight: 10, bar: 'password' },
  { id: 'store', weight: 10, bar: 'apps' },
  { id: 'updates', weight: 8, bar: 'apps' },
  { id: 'phishing', weight: 7, bar: 'network' },
  { id: 'find', weight: 5, bar: 'network' },
];

export function scoreScan({ auto, answers }) {
  const answerScore = QUESTION_DEFS.reduce((sum, q) => sum + (answers[q.id] ? q.weight : 0), 0);
  const answerMax = QUESTION_DEFS.reduce((sum, q) => sum + q.weight, 0);
  const overall = Math.round(((auto.autoScore + answerScore) / (auto.autoMax + answerMax)) * 100);

  const appPts = (answers.store ? 10 : 2) + (answers.updates ? 8 : 2) + (auto.checks.find((c) => c.id === 'os')?.points || 0);
  const appMax = 10 + 8 + 12;
  const passPts = (answers.lock ? 10 : 1) + (answers.twofa ? 10 : 2) + (auto.platformAuth ? 6 : 2);
  const passMax = 10 + 10 + 6;
  const netPts = (answers.phishing ? 7 : 1) + (answers.find ? 5 : 1) + (auto.httpsOk ? 8 : 0) + (auto.checks.find((c) => c.id === 'network')?.points || 0);
  const netMax = 7 + 5 + 8 + 4;

  const bars = {
    apps: Math.round((appPts / appMax) * 100),
    password: Math.round((passPts / passMax) * 100),
    network: Math.round((netPts / netMax) * 100),
  };

  const issues = [];
  if (!auto.httpsOk) issues.push('https');
  if (!auto.webauthn) issues.push('webauthn');
  if (!answers.lock) issues.push('lock');
  if (!answers.twofa) issues.push('twofa');
  if (!answers.store) issues.push('store');
  if (!answers.updates) issues.push('updates');
  if (!answers.phishing) issues.push('phishing');
  if (!answers.find) issues.push('find');
  const osCheck = auto.checks.find((c) => c.id === 'os');
  if (osCheck && !osCheck.ok) issues.push('os');
  if (!auto.platformAuth) issues.push('biometrics');

  let risk = 'Low';
  if (overall < 55) risk = 'High';
  else if (overall < 78) risk = 'Medium';

  return {
    overall,
    bars,
    issues,
    risk,
    answerScore,
    autoScore: auto.autoScore,
    threatsFound: issues.length,
  };
}

export function loadScans() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

export function saveScan(scan) {
  const list = loadScans().filter((item) => item.id !== scan.id);
  list.unshift(scan);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 20)));
  return list.slice(0, 20);
}

export function removeScan(id) {
  const list = loadScans().filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return list;
}

export function getPhoneScanLink() {
  const url = new URL(window.location.href);
  url.hash = 'phone-scan';
  return url.toString();
}
