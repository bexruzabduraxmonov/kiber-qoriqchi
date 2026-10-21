import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import crypto from 'node:crypto';

import {
  PRODUCT_CATALOG,
  sanitizeCartItem,
  calculateCartTotals,
  isCartExpired,
  mergeCarts,
  CART_TTL_MS
} from './cartService.js';

const app = express();
const PORT = Number(process.env.PORT || 4000);
const cartStore = new Map();
const csrfTokens = new Map();

const cartRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Juda ko`p so`rovlar. Iltimos, 15 daqiqadan keyin qayta urinib ko`ring.' }
});

const createSessionId = (req) => {
  const sessionId = req.cookies?.sessionId || req.headers['x-session-id'] || crypto.randomUUID();
  return sessionId;
};

const getCartForSession = (sessionId) => {
  const existing = cartStore.get(sessionId);
  if (!existing) {
    const emptyCart = { items: [], updatedAt: Date.now() };
    cartStore.set(sessionId, emptyCart);
    return emptyCart;
  }

  return existing;
};

const saveCartForSession = (sessionId, items) => {
  cartStore.set(sessionId, {
    items,
    updatedAt: Date.now()
  });
};

const buildCartResponse = (sessionId) => {
  const cart = getCartForSession(sessionId);
  const totals = calculateCartTotals(cart.items, PRODUCT_CATALOG);

  const safeItems = cart.items.map((item) => {
    const product = PRODUCT_CATALOG[item.productId];
    const safe = sanitizeCartItem(item);
    if (!product || !safe.valid) {
      return null;
    }
    return {
      productId: safe.productId,
      quantity: safe.quantity,
      name: product.name,
      unitPrice: product.price,
      total: product.price * safe.quantity
    };
  }).filter(Boolean);

  return {
    sessionId,
    items: safeItems,
    subtotal: totals.subtotal,
    total: totals.total,
    currency: 'UZS',
    count: safeItems.reduce((sum, item) => sum + item.quantity, 0),
    updatedAt: cart.updatedAt
  };
};

const requireValidCsrf = (req, res, next) => {
  if (req.method === 'GET') {
    return next();
  }

  const cookieToken = req.cookies?.csrfToken;
  const headerToken = req.get('x-csrf-token');

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({ ok: false, error: 'CSRF token noto`g`ri.' });
  }

  return next();
};

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false
}));

app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use('/api/cart', cartRateLimiter);
app.use('/api/cart', requireValidCsrf);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Cart API is alive.' });
});

app.get('/api/products', (req, res) => {
  const products = Object.values(PRODUCT_CATALOG).map((product) => ({
    ...product,
    price: Number(product.price),
    stock: Number(product.stock)
  }));

  res.json({ ok: true, products });
});

app.get('/api/cart/csrf', (req, res) => {
  const token = crypto.randomBytes(32).toString('hex');
  const sessionId = createSessionId(req);
  csrfTokens.set(sessionId, token);

  res.cookie('csrfToken', token, {
    httpOnly: false,
    sameSite: 'lax',
    secure: false,
    maxAge: 60 * 60 * 1000
  });

  res.json({ ok: true, csrfToken: token, sessionId });
});

app.get('/api/cart', (req, res) => {
  const sessionId = createSessionId(req);
  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: CART_TTL_MS
  });

  const cart = buildCartResponse(sessionId);
  res.json({ ok: true, ...cart });
});

app.post('/api/cart/merge', (req, res) => {
  const sessionId = createSessionId(req);
  const guestItems = Array.isArray(req.body?.guestCart) ? req.body.guestCart : [];
  const existing = getCartForSession(sessionId).items || [];
  const mergedItems = mergeCarts(guestItems, existing);
  saveCartForSession(sessionId, mergedItems);

  const response = buildCartResponse(sessionId);
  res.json({ ok: true, ...response, merged: true });
});

app.post('/api/cart/items', (req, res) => {
  const sessionId = createSessionId(req);
  const item = sanitizeCartItem(req.body || {});

  if (!item.valid) {
    return res.status(400).json({ ok: false, error: item.error });
  }

  const product = PRODUCT_CATALOG[item.productId];
  if (!product) {
    return res.status(404).json({ ok: false, error: 'Mahsulot topilmadi.' });
  }

  const current = getCartForSession(sessionId);
  const items = Array.isArray(current.items) ? current.items : [];
  const foundIndex = items.findIndex((entry) => entry.productId === item.productId);

  if (foundIndex >= 0) {
    items[foundIndex].quantity = Math.min(items[foundIndex].quantity + item.quantity, 10);
  } else {
    items.push({ productId: item.productId, quantity: item.quantity, name: product.name });
  }

  saveCartForSession(sessionId, items);
  const response = buildCartResponse(sessionId);
  return res.json({ ok: true, ...response, message: 'Mahsulot savatga qo`shildi.' });
});

app.patch('/api/cart/items/:productId', (req, res) => {
  const sessionId = createSessionId(req);
  const { productId } = req.params;
  const quantity = Number.parseInt(req.body?.quantity ?? '1', 10);

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    return res.status(400).json({ ok: false, error: 'Miqdor 1 dan 10 gacha bo`lishi kerak.' });
  }

  const current = getCartForSession(sessionId);
  const items = (current.items || []).filter((item) => item.productId !== productId);

  if (!items.length && Number(quantity) === 0) {
    saveCartForSession(sessionId, []);
    return res.json({ ok: true, ...buildCartResponse(sessionId), message: 'Savat bo`sh.' });
  }

  items.push({ productId, quantity, name: PRODUCT_CATALOG[productId]?.name || productId });
  saveCartForSession(sessionId, items);
  return res.json({ ok: true, ...buildCartResponse(sessionId), message: 'Miqdor yangilandi.' });
});

app.delete('/api/cart/items/:productId', (req, res) => {
  const sessionId = createSessionId(req);
  const { productId } = req.params;
  const current = getCartForSession(sessionId);
  const items = (current.items || []).filter((item) => item.productId !== productId);
  saveCartForSession(sessionId, items);

  return res.json({ ok: true, ...buildCartResponse(sessionId), message: 'Mahsulot savatdan o`chirildi.' });
});

app.delete('/api/cart', (req, res) => {
  const sessionId = createSessionId(req);
  saveCartForSession(sessionId, []);
  return res.json({ ok: true, ...buildCartResponse(sessionId), message: 'Savat tozalandi.' });
});

setInterval(() => {
  const now = Date.now();
  for (const [sessionId, cart] of cartStore.entries()) {
    if (isCartExpired(cart, now)) {
      cartStore.delete(sessionId);
      csrfTokens.delete(sessionId);
    }
  }
}, 60 * 1000);

app.listen(PORT, () => {
  console.log(`Cart API listening on http://localhost:${PORT}`);
});
