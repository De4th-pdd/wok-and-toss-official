'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function FloatingCartBar() {
  const { totalCount, subtotal, openCart, isCartOpen } = useCart();

  if (totalCount === 0 || isCartOpen) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden animate-slideUp">
      <button
        type="button"
        onClick={openCart}
        className="w-full py-3.5 px-5 rounded-2xl bg-smokedSoy-950 text-warmPorcelain border border-toastedSesame/40 shadow-2xl flex items-center justify-between hover:bg-smokedSoy transition-all duration-200"
        aria-label="View Order Tray"
      >
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-roastedChilli flex items-center justify-center text-warmPorcelain shadow-md">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-warmPorcelain text-smokedSoy font-bold text-xs flex items-center justify-center border border-roastedChilli">
              {totalCount}
            </span>
          </div>
          <div className="text-left">
            <span className="block text-xs font-semibold text-toastedSesame">
              {totalCount} {totalCount === 1 ? 'item' : 'items'} in Tray
            </span>
            <span className="block font-serif text-sm font-bold text-warmPorcelain">
              Rs. {subtotal.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-xs font-bold text-warmPorcelain bg-roastedChilli/90 hover:bg-roastedChilli px-3.5 py-1.5 rounded-xl shadow-sm">
          <span>View Tray</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </button>
    </div>
  );
}
