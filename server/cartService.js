export const CART_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export const PRODUCT_CATALOG = Object.freeze({
  'course-beginner': {
    id: 'course-beginner',
    name: 'Cyber Basics',
    price: 249000,
    stock: 12,
    category: 'course'
  },
  'course-redteam': {
    id: 'course-redteam',
    name: 'Red Team Essentials',
    price: 399000,
    stock: 8,
    category: 'course'
  },
  'lab-ctf': {
    id: 'lab-ctf',
    name: 'CTF Lab Access',
    price: 179000,
    stock: 20,
    category: 'lab'
  },
  'bundle-pro': {
    id: 'bundle-pro',
    name: 'CyberGuard Pro Bundle',
    price: 650000,
    stock: 5,
    category: 'bundle'
  }
});

const normalizeText = (value = '') => {
  return String(value)
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);
};

export const sanitizeCartItem = (item = {}) => {
  const productId = String(item.productId || '').trim();
  const quantity = Number.parseInt(item.quantity ?? 1, 10);
  const safeName = normalizeText(item.name || 'Mahsulot');

  if (!productId || !/^[a-z0-9_-]+$/i.test(productId)) {
    return {
      productId,
      quantity: Number.isFinite(quantity) ? quantity : 1,
      name: safeName,
      valid: false,
      error: 'Mahsulot ID noto`g`ri.'
    };
  }

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    return {
      productId,
      quantity: Number.isFinite(quantity) ? quantity : 1,
      name: safeName,
      valid: false,
      error: 'Miqdor 1 dan 10 gacha bo`lishi kerak.'
    };
  }

  return {
    productId,
    quantity,
    name: safeName || 'Mahsulot',
    valid: true,
    error: null
  };
};

export const calculateCartTotals = (items = [], catalog = PRODUCT_CATALOG) => {
  const normalizedItems = [];
  let subtotal = 0;

  for (const item of items) {
    const safeItem = sanitizeCartItem(item);
    if (!safeItem.valid) {
      continue;
    }

    const product = catalog[safeItem.productId];
    if (!product) {
      continue;
    }

    const quantity = Math.min(Math.max(safeItem.quantity, 1), product.stock || 10);
    const unitPrice = Number(product.price) || 0;
    const total = unitPrice * quantity;

    subtotal += total;
    normalizedItems.push({
      productId: safeItem.productId,
      quantity,
      name: product.name || safeItem.name,
      unitPrice,
      total
    });
  }

  return {
    subtotal,
    total: subtotal,
    currency: 'UZS',
    items: normalizedItems,
    warnings: []
  };
};

export const isCartExpired = (cart, now = Date.now()) => {
  if (!cart || !cart.updatedAt) {
    return true;
  }

  return now - Number(cart.updatedAt) > CART_TTL_MS;
};

export const mergeCarts = (guestItems = [], userItems = []) => {
  const merged = new Map();

  for (const item of [...guestItems, ...userItems]) {
    const safe = sanitizeCartItem(item);
    if (!safe.valid) {
      continue;
    }

    const current = merged.get(safe.productId) || { productId: safe.productId, quantity: 0 };
    current.quantity += safe.quantity;
    current.quantity = Math.min(current.quantity, 10);
    merged.set(safe.productId, current);
  }

  return Array.from(merged.values());
};
