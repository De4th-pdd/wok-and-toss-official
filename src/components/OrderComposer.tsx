'use client';

import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, MenuItem, SpiceLevel } from '@/data/menu';
import { siteConfig } from '@/lib/config';
import {
  Send,
  Plus,
  Minus,
  MapPin,
  Users,
  Edit3,
  Flame,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

interface OrderComposerProps {
  initialDishId?: string;
  className?: string;
  headingText?: string;
  subheadingText?: string;
}

export default function OrderComposer({
  initialDishId = 'classic-chicken-chowmein',
  className = '',
  headingText = 'Draft your WhatsApp order',
  subheadingText = 'Choose a dish, select your portion size, adjust heat, and preview your message before sending.',
}: OrderComposerProps) {
  const [selectedDishId, setSelectedDishId] = useState<string>(initialDishId);
  const [selectedSize, setSelectedSize] = useState<'Medium' | 'Large'>('Medium');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSpice, setSelectedSpice] = useState<SpiceLevel>('Mild');
  const [deliveryArea, setDeliveryArea] = useState<string>('');
  const [peopleCount, setPeopleCount] = useState<number>(2);

  // Find selected dish object
  const selectedDish: MenuItem = useMemo(() => {
    return (
      MENU_ITEMS.find((item) => item.id === selectedDishId) || MENU_ITEMS[0]
    );
  }, [selectedDishId]);

  // When selectedDish changes, adjust default spice to dish default if applicable
  const handleDishChange = (dishId: string) => {
    setSelectedDishId(dishId);
    setSelectedSize('Medium');
    const dish = MENU_ITEMS.find((item) => item.id === dishId);
    if (dish) {
      setSelectedSpice(dish.spiceLevel);
    }
  };

  const hasMultiSize = Boolean(selectedDish.customerPriceLarge);

  // Pricing calculation
  const unitPrice = useMemo(() => {
    if (selectedDish.priceConfirmationStatus !== 'confirmed' || selectedDish.customerPrice === null) {
      return null;
    }
    if (hasMultiSize && selectedSize === 'Large' && selectedDish.customerPriceLarge) {
      return selectedDish.customerPriceLarge;
    }
    return selectedDish.customerPrice;
  }, [selectedDish, hasMultiSize, selectedSize]);

  const totalPrice = useMemo(() => {
    return unitPrice ? unitPrice * quantity : null;
  }, [unitPrice, quantity]);

  // Construct structured, polite WhatsApp message
  const generatedMessage = useMemo(() => {
    const sizeStr = hasMultiSize ? ` (${selectedSize})` : '';
    const priceStr = totalPrice
      ? `\n- Estimated subtotal: Rs. ${totalPrice.toLocaleString()}`
      : '\n- Price: Please confirm today’s retail price';
    const areaStr = deliveryArea.trim()
      ? deliveryArea.trim()
      : '[Area/Sector to be added]';

    return `Hi Wok & Toss! I'd like to place an order:

- Item: ${selectedDish.name}${sizeStr}
- Quantity: ${quantity} portion${quantity > 1 ? 's' : ''}
- Preferred heat: ${selectedSpice}${priceStr}
- Delivery area: ${areaStr}
- Ordering for: ${peopleCount} ${peopleCount === 1 ? 'person' : 'people'}

Please confirm today's availability, delivery charges, and timing.`;
  }, [selectedDish, hasMultiSize, selectedSize, quantity, selectedSpice, totalPrice, deliveryArea, peopleCount]);

  const whatsappLink = useMemo(() => {
    return `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
      generatedMessage
    )}`;
  }, [generatedMessage]);

  const SPICE_OPTIONS: SpiceLevel[] = [
    'Not Spicy',
    'Mild',
    'Low to Medium',
    'Medium',
    'Spicy',
    'Extra Spicy',
  ];

  return (
    <div
      className={`bg-smokedSoy text-ricePaper rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-toastedSesame/30 ${className}`}
      id="order-composer"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-xs text-toastedSesame font-medium tracking-wide block uppercase">
              Interactive order composer
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-warmPorcelain mt-1">
              {headingText}
            </h3>
            <p className="mt-2 text-sm text-ricePaper/80 font-sans leading-relaxed">
              {subheadingText}
            </p>
          </div>

          {/* 1. Dish Selector */}
          <div>
            <label
              htmlFor="composer-dish-select"
              className="block text-xs font-semibold text-ricePaper mb-2"
            >
              1. Select dish
            </label>
            <div className="relative">
              <select
                id="composer-dish-select"
                value={selectedDishId}
                onChange={(e) => handleDishChange(e.target.value)}
                className="w-full bg-smokedSoy-100 border border-toastedSesame/30 rounded-xl px-4 py-3 text-warmPorcelain text-sm focus:ring-2 focus:ring-wokCopper focus:border-wokCopper outline-none cursor-pointer"
              >
                {MENU_ITEMS.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                    className="bg-smokedSoy text-warmPorcelain"
                  >
                    {item.name} —{' '}
                    {item.customerPrice
                      ? `Rs. ${item.customerPrice.toLocaleString()}`
                      : 'Price on request'}{' '}
                    ({item.spiceLevel})
                  </option>
                ))}
              </select>
            </div>

            {/* Dish allergen and unconfirmed price notice */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              {selectedDish.allergens && selectedDish.allergens.length > 0 && (
                <span className="text-ricePaper/70 bg-smokedSoy-950/80 px-2.5 py-1 rounded-md border border-toastedSesame/20">
                  <strong className="text-toastedSesame font-medium">Allergens:</strong>{' '}
                  {selectedDish.allergens.join(', ')}
                </span>
              )}
              {selectedDish.priceConfirmationStatus !== 'confirmed' && (
                <span className="inline-flex items-center space-x-1 text-amber-300 bg-amber-950/50 px-2.5 py-1 rounded-md border border-amber-800/40">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Price confirmed upon inquiry</span>
                </span>
              )}
            </div>
          </div>

          {/* 2. Portion Size & Quantity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Portion Size */}
            <div>
              <label className="block text-xs font-semibold text-ricePaper mb-2">
                2. Portion size
              </label>
              {hasMultiSize ? (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSize('Medium')}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                      selectedSize === 'Medium'
                        ? 'bg-roastedChilli text-warmPorcelain border-roastedChilli shadow-md'
                        : 'bg-smokedSoy-100 text-ricePaper/70 border-toastedSesame/20 hover:text-warmPorcelain'
                    }`}
                  >
                    Medium{' '}
                    {selectedDish.customerPrice
                      ? `(Rs. ${selectedDish.customerPrice.toLocaleString()})`
                      : ''}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSize('Large')}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                      selectedSize === 'Large'
                        ? 'bg-roastedChilli text-warmPorcelain border-roastedChilli shadow-md'
                        : 'bg-smokedSoy-100 text-ricePaper/70 border-toastedSesame/20 hover:text-warmPorcelain'
                    }`}
                  >
                    Large{' '}
                    {selectedDish.customerPriceLarge
                      ? `(Rs. ${selectedDish.customerPriceLarge.toLocaleString()})`
                      : ''}
                  </button>
                </div>
              ) : (
                <div className="px-4 py-2.5 rounded-xl bg-smokedSoy-100 border border-toastedSesame/20 text-xs text-ricePaper/80">
                  Standard: {selectedDish.portionSize || 'Full Platter / Gravy (Serves 2-3)'}
                </div>
              )}
            </div>

            {/* Quantity Controls */}
            <div>
              <label className="block text-xs font-semibold text-ricePaper mb-2">
                3. Quantity
              </label>
              <div className="flex items-center space-x-3 bg-smokedSoy-100 border border-toastedSesame/30 rounded-xl px-4 py-1.5">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-lg bg-smokedSoy-50 hover:bg-smokedSoy text-warmPorcelain flex items-center justify-center transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center font-bold text-warmPorcelain text-sm">
                  {quantity} {quantity === 1 ? 'portion' : 'portions'}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-8 h-8 rounded-lg bg-smokedSoy-50 hover:bg-smokedSoy text-warmPorcelain flex items-center justify-center transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 3. Heat Level Selection (Standardized 6 Tiers) */}
          <div>
            <label className="block text-xs font-semibold text-ricePaper mb-2 flex items-center space-x-1.5">
              <Flame className="w-3.5 h-3.5 text-roastedChilli" />
              <span>4. Preferred spice level (0–5 Heat Scale)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {SPICE_OPTIONS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedSpice(lvl)}
                  className={`px-2.5 py-2 rounded-xl text-xs font-semibold transition-all text-center border ${
                    selectedSpice === lvl
                      ? 'bg-roastedChilli text-warmPorcelain border-roastedChilli shadow-md'
                      : 'bg-smokedSoy-100 text-ricePaper/70 border-toastedSesame/20 hover:text-warmPorcelain hover:bg-smokedSoy-50'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Delivery Area & Number of People */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="composer-delivery-area"
                className="block text-xs font-semibold text-ricePaper mb-2 flex items-center space-x-1"
              >
                <MapPin className="w-3.5 h-3.5 text-toastedSesame" />
                <span>5. Delivery area / sector</span>
              </label>
              <input
                id="composer-delivery-area"
                type="text"
                value={deliveryArea}
                onChange={(e) => setDeliveryArea(e.target.value)}
                placeholder="e.g. Bahria Phase 4, Saddar, F-7, DHA"
                className="w-full bg-smokedSoy-100 border border-toastedSesame/30 rounded-xl px-4 py-3 text-warmPorcelain text-sm placeholder:text-ricePaper/40 focus:ring-2 focus:ring-wokCopper outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="composer-people-count"
                className="block text-xs font-semibold text-ricePaper mb-2 flex items-center space-x-1"
              >
                <Users className="w-3.5 h-3.5 text-toastedSesame" />
                <span>6. Ordering for</span>
              </label>
              <select
                id="composer-people-count"
                value={peopleCount}
                onChange={(e) => setPeopleCount(Number(e.target.value))}
                className="w-full bg-smokedSoy-100 border border-toastedSesame/30 rounded-xl px-4 py-3 text-warmPorcelain text-sm focus:ring-2 focus:ring-wokCopper outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <option
                    key={num}
                    value={num}
                    className="bg-smokedSoy text-warmPorcelain"
                  >
                    {num} {num === 1 ? 'person' : 'people'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Live Message Preview Box & WhatsApp Send */}
        <div className="lg:col-span-5 bg-smokedSoy-950 p-6 sm:p-8 rounded-2xl border border-toastedSesame/30 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-toastedSesame/20 text-xs text-toastedSesame">
              <div className="flex items-center space-x-2">
                <Edit3 className="w-4 h-4 text-roastedChilli" />
                <span className="font-semibold">Live WhatsApp message preview</span>
              </div>
              <span className="text-xs bg-smokedSoy-100 px-2 py-0.5 rounded text-ricePaper/70">
                Editable in WhatsApp
              </span>
            </div>

            <div className="mt-4 bg-smokedSoy/90 p-4 rounded-xl border border-toastedSesame/15 font-sans text-xs sm:text-sm text-warmPorcelain/95 whitespace-pre-wrap leading-relaxed shadow-inner">
              {generatedMessage}
            </div>

            {/* Calculated Subtotal */}
            {totalPrice ? (
              <div className="mt-4 p-3.5 rounded-xl bg-smokedSoy-100/70 border border-toastedSesame/20 flex items-center justify-between text-xs">
                <span className="text-ricePaper/70">Estimated order subtotal:</span>
                <span className="font-serif text-base font-bold text-warmPorcelain">
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>
            ) : (
              <div className="mt-4 p-3.5 rounded-xl bg-smokedSoy-100/70 border border-toastedSesame/20 flex items-center justify-between text-xs">
                <span className="text-ricePaper/70">Estimated subtotal:</span>
                <span className="text-amber-300 text-xs font-semibold italic">
                  Price confirmed on WhatsApp
                </span>
              </div>
            )}

            <div className="mt-2 text-[11px] text-ricePaper/60">
              * Delivery charges vary by distance from dispatch point and are confirmed upfront on WhatsApp.
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-roastedChilli hover:bg-roastedChilli-hover text-warmPorcelain font-bold tracking-wide shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 text-center"
            >
              <Send className="w-4 h-4 text-warmPorcelain" />
              <span>Send order request via WhatsApp</span>
            </a>

            <div className="p-3 rounded-lg bg-smokedSoy-100/40 border border-toastedSesame/15 text-[11px] text-ricePaper/75 flex items-start space-x-2 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-toastedSesame shrink-0 mt-0.5" />
              <span>
                <strong>Direct order confirmation:</strong> Sending this message opens official WhatsApp (+92 319 1932923) with your request. Our dispatch team will confirm dish availability, delivery fee, and time before preparation begins.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
