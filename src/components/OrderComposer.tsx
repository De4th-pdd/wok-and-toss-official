'use client';

import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, MenuItem, SpiceLevel } from '@/data/menu';
import { useCart } from '@/context/CartContext';
import { siteConfig } from '@/lib/config';
import WhatsAppIcon from './WhatsAppIcon';
import {
  Plus,
  Minus,
  MapPin,
  Users,
  Edit3,
  Flame,
  ShieldCheck,
  ShoppingBag,
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
  const { addToCart } = useCart();
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
- Payment method: Advance Bank Transfer / Easypaisa

Please confirm today's availability, delivery charges, and timing.`;
  }, [selectedDish, hasMultiSize, selectedSize, quantity, selectedSpice, totalPrice, deliveryArea, peopleCount]);

  const whatsappLink = useMemo(() => {
    return `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
      generatedMessage
    )}`;
  }, [generatedMessage]);

  const handleAddComposerToTray = () => {
    addToCart(
      selectedDish,
      hasMultiSize ? selectedSize : 'Standard',
      selectedSpice,
      selectedDish.spiceHeatValue || 3,
      quantity,
      deliveryArea ? `Delivery area: ${deliveryArea}` : ''
    );
  };

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
      className={`bg-smokedSoy text-ricePaper p-6 sm:p-10 rounded-3xl border border-toastedSesame/30 shadow-2xl relative overflow-hidden ${className}`}
      id="order-composer"
    >
      <div className="max-w-3xl mb-8">
        <span className="text-xs font-semibold text-toastedSesame block mb-1 uppercase tracking-wider">
          Quick order composer
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-warmPorcelain">
          {headingText}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-ricePaper/80 font-sans">
          {subheadingText}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Dish Selector */}
          <div>
            <label
              htmlFor="composer-dish-select"
              className="block text-xs font-bold uppercase tracking-wider text-toastedSesame mb-2"
            >
              1. Select dish
            </label>
            <select
              id="composer-dish-select"
              value={selectedDishId}
              onChange={(e) => handleDishChange(e.target.value)}
              className="w-full bg-smokedSoy-100 border border-toastedSesame/30 rounded-xl px-4 py-3 text-warmPorcelain text-sm focus:ring-2 focus:ring-wokCopper outline-none cursor-pointer"
            >
              {MENU_ITEMS.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                  className="bg-smokedSoy text-warmPorcelain"
                >
                  {item.name} {item.customerPrice ? `— Rs. ${item.customerPrice.toLocaleString()}` : '— (Price confirmed via WhatsApp)'}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-ricePaper/70 font-sans">
              {selectedDish.description}
            </p>
          </div>

          {/* 2. Portion Size (if applicable) & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Portion Size */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-toastedSesame mb-2">
                2. Portion size
              </label>
              {hasMultiSize ? (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSize('Medium')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide border transition-all ${
                      selectedSize === 'Medium'
                        ? 'bg-roastedChilli text-warmPorcelain border-roastedChilli shadow-md'
                        : 'bg-smokedSoy-100 text-ricePaper/80 border-toastedSesame/20 hover:text-warmPorcelain'
                    }`}
                  >
                    Medium
                    {selectedDish.customerPrice && (
                      <span className="block text-[10px] opacity-80">
                        Rs. {selectedDish.customerPrice.toLocaleString()}
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSize('Large')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide border transition-all ${
                      selectedSize === 'Large'
                        ? 'bg-roastedChilli text-warmPorcelain border-roastedChilli shadow-md'
                        : 'bg-smokedSoy-100 text-ricePaper/80 border-toastedSesame/20 hover:text-warmPorcelain'
                    }`}
                  >
                    Large
                    {selectedDish.customerPriceLarge && (
                      <span className="block text-[10px] opacity-80">
                        Rs. {selectedDish.customerPriceLarge.toLocaleString()}
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <div className="bg-smokedSoy-100/60 border border-toastedSesame/20 rounded-xl px-4 py-2.5 text-xs text-ricePaper/80">
                  <span className="font-semibold text-warmPorcelain">Standard portion</span>
                  <span className="block text-[11px] text-toastedSesame mt-0.5">
                    {selectedDish.portionSize || 'Individual serving'}
                  </span>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-toastedSesame mb-2">
                3. Quantity
              </label>
              <div className="flex items-center space-x-3 bg-smokedSoy-100 border border-toastedSesame/30 rounded-xl px-4 py-2">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 rounded text-ricePaper hover:text-warmPorcelain hover:bg-smokedSoy-50 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center font-serif text-base font-bold text-warmPorcelain">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 rounded text-ricePaper hover:text-warmPorcelain hover:bg-smokedSoy-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 4. Heat Customization */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-toastedSesame flex items-center space-x-1">
                <Flame className="w-3.5 h-3.5 text-roastedChilli" />
                <span>4. Heat customization</span>
              </label>
              <span className="text-xs text-ricePaper/60">
                Default: {selectedDish.spiceLevel}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SPICE_OPTIONS.map((spice) => {
                const isSelected = selectedSpice === spice;
                return (
                  <button
                    key={spice}
                    type="button"
                    onClick={() => setSelectedSpice(spice)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                      isSelected
                        ? 'bg-roastedChilli text-warmPorcelain border-roastedChilli shadow-md font-semibold'
                        : 'bg-smokedSoy-100 text-ricePaper/80 border-toastedSesame/20 hover:text-warmPorcelain'
                    }`}
                  >
                    {spice}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Delivery Neighborhood & 6. Party Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="composer-delivery-area"
                className="block text-xs font-bold uppercase tracking-wider text-toastedSesame mb-2 flex items-center space-x-1"
              >
                <MapPin className="w-3.5 h-3.5 text-roastedChilli" />
                <span>5. Delivery sector / area</span>
              </label>
              <input
                id="composer-delivery-area"
                type="text"
                placeholder="e.g. F-7, Bahria Phase 4, Saddar..."
                value={deliveryArea}
                onChange={(e) => setDeliveryArea(e.target.value)}
                className="w-full bg-smokedSoy-100 border border-toastedSesame/30 rounded-xl px-4 py-3 text-warmPorcelain text-sm placeholder:text-ricePaper/40 focus:ring-2 focus:ring-wokCopper outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="composer-people-count"
                className="block text-xs font-bold uppercase tracking-wider text-toastedSesame mb-2 flex items-center space-x-1"
              >
                <Users className="w-3.5 h-3.5 text-roastedChilli" />
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
              * Delivery charges via inDrive vary by distance and are confirmed upfront on WhatsApp. Advance payment via Bank Transfer or Easypaisa.
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleAddComposerToTray}
              className="w-full py-3 px-4 rounded-xl bg-smokedSoy-100 hover:bg-smokedSoy-50 text-warmPorcelain border border-toastedSesame/40 text-xs font-bold tracking-wide transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-toastedSesame" />
              <span>Add to Order Tray</span>
            </button>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold tracking-wide shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 text-center cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Send order request via WhatsApp</span>
            </a>

            <div className="p-3 rounded-lg bg-smokedSoy-100/40 border border-toastedSesame/15 text-[11px] text-ricePaper/75 flex items-start space-x-2 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
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
