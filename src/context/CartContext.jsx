import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'cybershield_guest_cart';
const CART_API = '/api/cart';

const readGuestCart = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.items) ? parsed.items : [];
  } catch {
    return [];
  }
};

const writeGuestCart = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, updatedAt: Date.now() }));
  } catch {
    // Ignore storage errors.
  }
};

const getCsrfToken = async () => {
  const response = await fetch('/api/cart/csrf', {
    credentials: 'include',
    headers: { Accept: 'application/json' }
  });

  if (!response.ok) {
    throw new Error('CSRF token olishda xatolik yuz berdi.');
  }

  const data = await response.json();
  return data.csrfToken;
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const syncLocalCart = (nextItems) => {
    setItems(nextItems);
    writeGuestCart(nextItems);
  };

  const refreshCart = async () => {
    try {
      setLoading(true);
      const guestCart = readGuestCart();

      const response = await fetch(CART_API, {
        credentials: 'include',
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Savatni yuklashda xatolik.');
      }

      const data = await response.json();
      const serverItems = Array.isArray(data.items) ? data.items : [];

      if (guestCart.length > 0 && serverItems.length === 0) {
        const csrfToken = await getCsrfToken();
        const mergeResponse = await fetch(`${CART_API}/merge`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-csrf-token': csrfToken
          },
          body: JSON.stringify({ guestCart: guestCart })
        });

        if (!mergeResponse.ok) {
          throw new Error('Guest savati birlashtirilmadi.');
        }

        const merged = await mergeResponse.json();
        if (Array.isArray(merged.items)) {
          syncLocalCart(merged.items);
          setError('');
          return;
        }
      }

      if (Array.isArray(data.items)) {
        syncLocalCart(data.items);
      }
      setError('');
    } catch (err) {
      setError(err.message || 'Savatni o`qishda xatolik.');
      const guestCart = readGuestCart();
      if (guestCart.length) {
        syncLocalCart(guestCart);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = async (productId, quantity = 1, name = 'Mahsulot') => {
    try {
      const csrfToken = await getCsrfToken();
      const response = await fetch(`${CART_API}/items`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'x-csrf-token': csrfToken
        },
        body: JSON.stringify({ productId, quantity, name })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Mahsulot savatga qo`shilmadi.');
      }

      if (Array.isArray(data.items)) {
        syncLocalCart(data.items);
      }
      setError('');
      setIsCartOpen(true);
      return data;
    } catch (err) {
      const guestCart = readGuestCart();
      const next = [...guestCart];
      const index = next.findIndex((item) => item.productId === productId);
      const safeQty = Number(quantity) > 0 ? Number(quantity) : 1;

      if (index >= 0) {
        next[index] = { ...next[index], quantity: next[index].quantity + safeQty };
      } else {
        next.push({ productId, quantity: safeQty, name });
      }

      syncLocalCart(next);
      setError(err.message || 'Mahsulot qo`shishda xatolik.');
      return { ok: true, fallback: true };
    }
  };

  const updateQuantity = async (productId, nextQuantity) => {
    if (!Number.isInteger(nextQuantity) || nextQuantity < 0) {
      return;
    }

    try {
      const csrfToken = await getCsrfToken();
      const response = await fetch(`${CART_API}/items/${encodeURIComponent(productId)}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'x-csrf-token': csrfToken
        },
        body: JSON.stringify({ quantity: nextQuantity })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Miqdor yangilanmadi.');
      }

      if (Array.isArray(data.items)) {
        syncLocalCart(data.items);
      }
      setError('');
    } catch (err) {
      const guestCart = readGuestCart();
      const next = guestCart
        .map((item) => item.productId === productId ? { ...item, quantity: nextQuantity } : item)
        .filter((item) => item.quantity > 0);
      syncLocalCart(next);
      setError(err.message || 'Miqdor yangilanmadi.');
    }
  };

  const removeItem = async (productId) => {
    try {
      const csrfToken = await getCsrfToken();
      const response = await fetch(`${CART_API}/items/${encodeURIComponent(productId)}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'x-csrf-token': csrfToken
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Mahsulot o`chirilmadi.');
      }

      if (Array.isArray(data.items)) {
        syncLocalCart(data.items);
      }
      setError('');
    } catch (err) {
      const next = readGuestCart().filter((item) => item.productId !== productId);
      syncLocalCart(next);
      setError(err.message || 'Mahsulot o`chirilmadi.');
    }
  };

  const clearCart = async () => {
    try {
      const csrfToken = await getCsrfToken();
      const response = await fetch(CART_API, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'x-csrf-token': csrfToken
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Savat tozalana olmadi.');
      }

      syncLocalCart(Array.isArray(data.items) ? data.items : []);
      setError('');
    } catch (err) {
      syncLocalCart([]);
      setError(err.message || 'Savat tozalana olmadi.');
    }
  };

  const subtotal = useMemo(() => items.reduce((sum, item) => {
    const price = Number(item.unitPrice || 0);
    return sum + (price * Number(item.quantity || 0));
  }, 0), [items]);

  const count = useMemo(() => items.reduce((sum, item) => sum + Number(item.quantity || 0), 0), [items]);

  return (
    <CartContext.Provider value={{
      items,
      count,
      subtotal,
      loading,
      error,
      setError,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      refreshCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
