import test from 'node:test';
import assert from 'node:assert/strict';

import { sanitizeCartItem, calculateCartTotals, isCartExpired } from '../server/cartService.js';

test('sanitizeCartItem rejects invalid quantity and dangerous values', () => {
  assert.deepEqual(sanitizeCartItem({ productId: 'p-1', quantity: 0, name: 'USB' }), {
    productId: 'p-1',
    quantity: 0,
    name: 'USB',
    valid: false,
    error: 'Miqdor 1 dan 10 gacha bo`lishi kerak.'
  });

  assert.deepEqual(sanitizeCartItem({ productId: 'p-1', quantity: 2, name: '<script>alert(1)</script>' }), {
    productId: 'p-1',
    quantity: 2,
    name: 'scriptalert(1)script',
    valid: true,
    error: null
  });
});

test('calculateCartTotals returns price and total based on server-side product catalog', () => {
  const catalog = {
    'p-1': { price: 120000, stock: 10 },
    'p-2': { price: 250000, stock: 5 }
  };

  const totals = calculateCartTotals([
    { productId: 'p-1', quantity: 2 },
    { productId: 'p-2', quantity: 1 }
  ], catalog);

  assert.equal(totals.subtotal, 490000);
  assert.equal(totals.total, 490000);
  assert.equal(totals.items.length, 2);
});

test('isCartExpired detects stale carts', () => {
  const now = Date.now();
  assert.equal(isCartExpired({ updatedAt: now - 8 * 24 * 60 * 60 * 1000 }, now), true);
  assert.equal(isCartExpired({ updatedAt: now - 2 * 24 * 60 * 60 * 1000 }, now), false);
});
