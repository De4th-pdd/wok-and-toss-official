'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { SpiceLevel, formatCustomerPrice } from '@/data/menu';
import { X, Flame, Plus, Minus, Check } from 'lucide-react';

const SPICE_OPTIONS: { level: SpiceLevel; heat: number; label: string; desc: string }[] = [
  { level: 'Mild', heat: 1, label: '1 - Mild', desc: 'Gentle, delicate aromatics with minimal heat' },
  { level: 'Low to Medium', heat: 2, label: '2 - Low to Med', desc: 'Balanced warmth, subtle pepper kick' },
  { level: 'Medium', heat: 3, label: '3 - Medium', desc: 'Authentic Wok & Toss house heat' },
  { level: 'Spicy', heat: 4, label: '4 - Spicy', desc: 'Sharp bird’s eye chili with wok flame' },
  { level: 'Extra Spicy', heat: 5, label: '5 - Extra Spicy', desc: 'Intense firecracker heat for chili lovers' },
];

export default function DishCustomizeModal() {
  const { customizingItem, closeCustomize, addToCart } = useCart();

  const [portion, setPortion] = useState<'Medium' | 'Large' | 'Standard'>('Medium');
  const [spiceLevel, setSpiceLevel] = useState<SpiceLevel>('Medium');
  const [spiceHeat, setSpiceHeat] = useState<number>(3);
  const [quantity, setQuantity] = useState<number>(1);
  const [instructions, setInstructions] = useState<string>('');

  useEffect(() => {
    if (customizingItem) {
      // Set default portion
      if (customizingItem.customerPriceLarge) {
        setPortion('Medium');
      } else {
        setPortion('Standard');
      }

      // Set default spice level
      setSpiceLevel(customizingItem.spiceLevel);
      setSpiceHeat(customizingItem.spiceHeatValue || 3);
      setQuantity(1);
      setInstructions('');
    }
  }, [customizingItem]);

  if (!customizingItem) return null;

  // Calculate live item price
  let unitPrice = customizingItem.customerPrice;
  if (portion === 'Large' && customizingItem.customerPriceLarge) {
    unitPrice = customizingItem.customerPriceLarge;
  }
  const hasConfirmedPrice =
    customizingItem.priceConfirmationStatus === 'confirmed' && unitPrice !== null;
  const totalPrice = hasConfirmedPrice ? (unitPrice as number) * quantity : null;

  const handleSpiceSelect = (opt: typeof SPICE_OPTIONS[0]) => {
    setSpiceLevel(opt.level);
    setSpiceHeat(opt.heat);
  };

  const handleAddToCart = () => {
    addToCart(
      customizingItem,
      portion,
      spiceLevel,
      spiceHeat,
      quantity,
      instructions
    );
    closeCustomize();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-smokedSoy-950/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-warmPorcelain-card rounded-2xl border border-ricePaper-dark/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="customize-dish-title"
      >
        {/* Header / Image banner */}
        <div className="relative">
          {customizingItem.image ? (
            <div className="relative w-full h-48 sm:h-56 bg-smokedSoy-950 overflow-hidden">
              <Image
                src={customizingItem.image}
                alt={customizingItem.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-smokedSoy-950 via-smokedSoy-950/30 to-transparent" />
            </div>
          ) : (
            <div className="h-24 bg-gradient-to-br from-smokedSoy via-smokedSoy-900 to-smokedSoy-950 p-4" />
          )}

          {/* Close Button */}
          <button
            type="button"
            onClick={closeCustomize}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-smokedSoy-950/70 hover:bg-smokedSoy-950 text-warmPorcelain transition-colors shadow-md"
            aria-label="Close customization modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Dish Title overlaid on bottom of banner */}
          <div className="absolute bottom-3 left-4 right-4 z-10 text-warmPorcelain">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-toastedSesame block">
              Customize Your Order
            </span>
            <h2 id="customize-dish-title" className="font-serif text-xl sm:text-2xl font-bold leading-tight">
              {customizingItem.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Description */}
          <p className="text-sm text-mutedText leading-relaxed">
            {customizingItem.description}
          </p>

          {/* Portion Size Selector (if item has Large option) */}
          {customizingItem.customerPriceLarge ? (
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-smokedSoy">
                Select Portion Size
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPortion('Medium')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    portion === 'Medium'
                      ? 'border-roastedChilli bg-roastedChilli-light/50 ring-1 ring-roastedChilli'
                      : 'border-ricePaper-dark/70 hover:border-toastedSesame/40 bg-ricePaper/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-smokedSoy">Medium</span>
                    {portion === 'Medium' && <Check className="w-4 h-4 text-roastedChilli" />}
                  </div>
                  <span className="text-xs font-bold text-roastedChilli mt-1 block">
                    Rs. {customizingItem.customerPrice?.toLocaleString()}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPortion('Large')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    portion === 'Large'
                      ? 'border-roastedChilli bg-roastedChilli-light/50 ring-1 ring-roastedChilli'
                      : 'border-ricePaper-dark/70 hover:border-toastedSesame/40 bg-ricePaper/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-smokedSoy">Large</span>
                    {portion === 'Large' && <Check className="w-4 h-4 text-roastedChilli" />}
                  </div>
                  <span className="text-xs font-bold text-roastedChilli mt-1 block">
                    Rs. {customizingItem.customerPriceLarge.toLocaleString()}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 rounded-xl bg-ricePaper/40 border border-ricePaper-dark/50">
              <span className="text-xs font-medium text-mutedText">Portion:</span>
              <span className="text-xs font-semibold text-smokedSoy">
                {customizingItem.portionSize || 'Standard Serving'}
              </span>
              <span className="text-xs font-bold text-roastedChilli">
                {formatCustomerPrice(customizingItem)}
              </span>
            </div>
          )}

          {/* Spice Level Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-smokedSoy flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-roastedChilli" />
                <span>Spice Level: {spiceLevel}</span>
              </label>
              <span className="text-xs text-mutedText">Heat: {spiceHeat} of 5</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SPICE_OPTIONS.map((opt) => {
                const isSelected = spiceLevel === opt.level;
                return (
                  <button
                    key={opt.level}
                    type="button"
                    onClick={() => handleSpiceSelect(opt)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-start space-x-2 ${
                      isSelected
                        ? 'border-roastedChilli bg-roastedChilli-light/60 ring-1 ring-roastedChilli'
                        : 'border-ricePaper-dark/70 hover:border-toastedSesame/40 bg-ricePaper/30'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {isSelected ? (
                        <div className="w-4 h-4 rounded-full bg-roastedChilli flex items-center justify-center text-warmPorcelain">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-ricePaper-dark" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-smokedSoy">{opt.label}</span>
                        <div className="flex">
                          {Array.from({ length: opt.heat }).map((_, i) => (
                            <span key={i} className="text-[10px] text-roastedChilli">🌶️</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-[11px] text-mutedText leading-tight mt-0.5">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Instructions / Allergy Notes */}
          <div className="space-y-2">
            <label
              htmlFor="special-instructions"
              className="block text-xs font-bold uppercase tracking-wider text-smokedSoy"
            >
              Special Instructions / Allergy Notes
            </label>
            <textarea
              id="special-instructions"
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Less oil, extra dry, no bell peppers, severe peanut allergy..."
              className="w-full px-3 py-2 text-xs text-smokedSoy bg-white border border-ricePaper-dark rounded-xl focus:outline-none focus:ring-1 focus:ring-roastedChilli placeholder:text-mutedText/60"
            />
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-smokedSoy">Quantity</span>
            <div className="flex items-center space-x-3 bg-ricePaper/60 border border-ricePaper-dark/80 rounded-xl px-3 py-1.5">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="p-1 rounded-md text-smokedSoy hover:bg-warmPorcelain disabled:opacity-40 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-serif font-bold text-base text-smokedSoy w-6 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 rounded-md text-smokedSoy hover:bg-warmPorcelain transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-ricePaper/40 border-t border-ricePaper-dark/60 flex items-center justify-between gap-4">
          <div>
            <span className="block text-[11px] text-mutedText font-medium">Subtotal</span>
            <span className="font-serif text-lg font-bold text-smokedSoy">
              {totalPrice !== null ? `Rs. ${totalPrice.toLocaleString()}` : 'Price on WhatsApp'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-3 px-5 rounded-xl bg-roastedChilli hover:bg-roastedChilli-hover text-warmPorcelain text-sm font-semibold tracking-wide shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-wokCopper text-center"
          >
            Add to Order Tray
          </button>
        </div>
      </div>
    </div>
  );
}
