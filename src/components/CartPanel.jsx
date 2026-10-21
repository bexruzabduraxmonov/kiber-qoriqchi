import React from 'react';
import { useCart } from '../context/CartContext';

const formatMoney = (value) => new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS', maximumFractionDigits: 0 }).format(value || 0);

export const CartPanel = () => {
  const { items, count, subtotal, loading, error, isCartOpen, setIsCartOpen, updateQuantity, removeItem, clearCart } = useCart();

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] flex justify-end bg-[#020d15]/70 backdrop-blur-sm">
      <div className="h-full w-full max-w-md border-l border-[#2d3d4f] bg-[#0d151c] p-5 shadow-[0_0_40px_rgba(0,0,0,0.45)]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#88cc14] font-mono">Savat</p>
            <h3 className="mt-1 text-2xl font-bold text-white">{count} mahsulot</h3>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2d3d4f] bg-[#101b26] text-white"
            aria-label="Close cart"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="space-y-3 overflow-y-auto pr-1">
          {loading && (
            <div className="rounded border border-[#2d3d4f] bg-[#101b26] p-4 text-sm text-[#94a3b8]">Savat yuklanmoqda...</div>
          )}

          {!loading && items.length === 0 && (
            <div className="rounded border border-dashed border-[#2d3d4f] bg-[#101b26] p-6 text-center text-[#94a3b8]">
              Savat bo`sh. Biror mahsulot qo`shing.
            </div>
          )}

          {items.map((item) => (
            <div key={item.productId} className="rounded-xl border border-[#2d3d4f] bg-[#101b26] p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{item.name || item.productId}</p>
                  <p className="mt-1 text-sm text-[#94a3b8]">{formatMoney(item.unitPrice || 0)} / dona</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="text-xs text-red-300 hover:text-red-100"
                >
                  O`chirish
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="flex items-center rounded border border-[#2d3d4f] bg-[#0d151c]">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, Number(item.quantity || 1) - 1)}
                    className="h-9 w-9 text-lg text-white"
                  >
                    −
                  </button>
                  <span className="min-w-[42px] text-center text-sm font-semibold text-white">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, Number(item.quantity || 1) + 1)}
                    className="h-9 w-9 text-lg text-white"
                  >
                    +
                  </button>
                </div>

                <div className="text-right font-bold text-[#88cc14]">{formatMoney((item.unitPrice || 0) * Number(item.quantity || 0))}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 border-t border-[#2d3d4f] pt-4">
          <div className="mb-3 flex items-center justify-between text-sm text-[#94a3b8]">
            <span>Umumiy summa</span>
            <span className="text-lg font-bold text-white">{formatMoney(subtotal)}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={clearCart}
              className="rounded-lg border border-[#2d3d4f] bg-[#101b26] px-3 py-2.5 text-sm font-semibold text-white"
            >
              Tozalash
            </button>
            <button
              type="button"
              className="rounded-lg bg-[#88cc14] px-3 py-2.5 text-sm font-bold text-[#0d151c]"
            >
              Buyurtma berish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
