'use client';

import React, { useState } from 'react';
import { MENU_ITEMS } from '@/data/menu';
import { Send, Edit3, Users, MapPin, Plus, Minus, Info } from 'lucide-react';

export default function OrderStepSection() {
  const [selectedDishId, setSelectedDishId] = useState<string>(MENU_ITEMS[0]?.id || 'classic-chicken-chowmein');
  const [selectedSize, setSelectedSize] = useState<'Medium' | 'Large'>('Medium');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSpice, setSelectedSpice] = useState<string>('Mild');
  const [deliveryArea, setDeliveryArea] = useState<string>('Rawalpindi / Islamabad');
  const [peopleCount, setPeopleCount] = useState<number>(2);

  const selectedDish = MENU_ITEMS.find((d) => d.id === selectedDishId) || MENU_ITEMS[0];
  const hasMultiSize = Boolean(selectedDish?.customerPriceLarge);

  // Price calculations
  const unitPrice = hasMultiSize && selectedSize === 'Large'
    ? selectedDish?.customerPriceLarge
    : selectedDish?.customerPrice;

  const totalPrice = unitPrice ? unitPrice * quantity : null;

  const priceSummary = totalPrice
    ? `Rs. ${totalPrice.toLocaleString()} (Rs. ${unitPrice?.toLocaleString()} x ${quantity})`
    : `(Please confirm today's price)`;

  const generatedMessage = `Hi Wok & Toss! Please confirm my order request:
• Dish: ${selectedDish?.name || 'Classic Chicken Chowmein'}${hasMultiSize ? ` (${selectedSize})` : ''}
• Quantity: ${quantity}
• Preferred Spice: ${selectedSpice}
• Delivery Area: ${deliveryArea}
• Ordering for: ${peopleCount} ${peopleCount === 1 ? 'person' : 'people'}
• Estimated Total: ${priceSummary}
Please confirm availability and delivery time for my area. Thank you!`;

  const waUrl = `https://wa.me/923191932923?text=${encodeURIComponent(generatedMessage)}`;

  const steps = [
    {
      number: '1',
      title: 'Browse and choose',
      description: 'Explore verified Chinese chowmein, sizzling gravies, fried rice, and master soups.',
    },
    {
      number: '2',
      title: 'Customize order',
      description: 'Select your preferred heat level, portion size (Medium/Large), and quantity.',
    },
    {
      number: '3',
      title: 'Send on WhatsApp',
      description: 'Send your draft message with delivery neighborhood and party count.',
    },
    {
      number: '4',
      title: 'Kitchen confirmation',
      description: 'Our team verifies live availability, current prices, and estimated delivery timing.',
    },
    {
      number: '5',
      title: 'Fresh delivery',
      description: 'Your food is tossed fresh on high-heat wok burners and delivered piping hot across the Twin Cities.',
    },
  ];

  return (
    <section className="py-20 bg-warmPorcelain text-smokedSoy border-t border-ricePaper-dark/50" id="how-to-order">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold text-mutedText block mb-2">
            Direct kitchen ordering
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-smokedSoy">
            How to order at Wok &amp; Toss
          </h2>
          <p className="mt-4 text-base sm:text-lg text-mutedText leading-relaxed font-sans">
            Every order is cooked fresh from scratch. We operate directly via WhatsApp so you can customize spice, confirm delivery area, and get real-time availability.
          </p>
        </div>

        {/* 5-Step Process */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((st) => (
            <div
              key={st.number}
              className="bg-warmPorcelain-card p-6 rounded-2xl border border-ricePaper-dark/80 relative shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-3xl font-bold text-toastedSesame/60 block">
                  {st.number}
                </span>
                <h3 className="font-serif text-lg font-bold text-smokedSoy mt-2">
                  {st.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-mutedText leading-relaxed">
                  {st.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive WhatsApp Order Builder */}
        <div className="mt-16 bg-smokedSoy text-ricePaper rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-toastedSesame/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Input Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs text-toastedSesame font-medium block">
                  Interactive order composer
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-warmPorcelain mt-1">
                  Draft your WhatsApp order
                </h3>
                <p className="mt-2 text-sm text-ricePaper/80 font-sans">
                  Choose a dish, adjust quantity, portion size, and heat level. We format a clean message for you to review and send.
                </p>
              </div>

              {/* 1. Dish Selector */}
              <div>
                <label htmlFor="dish-select" className="block text-xs font-semibold text-ricePaper mb-2">
                  1. Select dish
                </label>
                <select
                  id="dish-select"
                  value={selectedDishId}
                  onChange={(e) => {
                    setSelectedDishId(e.target.value);
                    setSelectedSize('Medium'); // Reset to default size on dish switch
                  }}
                  className="w-full bg-smokedSoy-100 border border-toastedSesame/30 rounded-xl px-4 py-3 text-warmPorcelain text-sm focus:ring-2 focus:ring-wokCopper focus:border-wokCopper outline-none"
                >
                  {MENU_ITEMS.map((item) => (
                    <option key={item.id} value={item.id} className="bg-smokedSoy text-warmPorcelain">
                      {item.name} ({item.spiceLevel})
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Portion Size & Quantity Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Size Selector */}
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
                        Medium {selectedDish.customerPrice ? `(Rs. ${selectedDish.customerPrice.toLocaleString()})` : ''}
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
                        Large {selectedDish.customerPriceLarge ? `(Rs. ${selectedDish.customerPriceLarge.toLocaleString()})` : ''}
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

              {/* 3. Spice Selection */}
              <div>
                <label className="block text-xs font-semibold text-ricePaper mb-2">
                  4. Preferred spice level
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {['Not Spicy', 'Mild', 'Low to Medium', 'Medium', 'Spicy', 'Extra Spicy'].map((lvl) => (
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
                  <label htmlFor="delivery-area" className="block text-xs font-semibold text-ricePaper mb-2 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-toastedSesame" />
                    <span>5. Delivery area / sector</span>
                  </label>
                  <input
                    id="delivery-area"
                    type="text"
                    value={deliveryArea}
                    onChange={(e) => setDeliveryArea(e.target.value)}
                    placeholder="e.g. Bahria Phase 4, Saddar, F-7, DHA"
                    className="w-full bg-smokedSoy-100 border border-toastedSesame/30 rounded-xl px-4 py-3 text-warmPorcelain text-sm focus:ring-2 focus:ring-wokCopper outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="people-count" className="block text-xs font-semibold text-ricePaper mb-2 flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5 text-toastedSesame" />
                    <span>6. Ordering for</span>
                  </label>
                  <select
                    id="people-count"
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(Number(e.target.value))}
                    className="w-full bg-smokedSoy-100 border border-toastedSesame/30 rounded-xl px-4 py-3 text-warmPorcelain text-sm focus:ring-2 focus:ring-wokCopper outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num} className="bg-smokedSoy text-warmPorcelain">
                        {num} {num === 1 ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Right: Live Preview Box & Dispatch Action */}
            <div className="lg:col-span-5 bg-smokedSoy-950 p-6 sm:p-8 rounded-2xl border border-toastedSesame/30 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-toastedSesame/20 text-xs text-toastedSesame">
                  <div className="flex items-center space-x-2">
                    <Edit3 className="w-4 h-4 text-roastedChilli" />
                    <span className="font-semibold">Live WhatsApp message preview</span>
                  </div>
                  <span className="text-xs bg-smokedSoy-100 px-2 py-0.5 rounded text-ricePaper/70">
                    Editable in app
                  </span>
                </div>

                <div className="mt-4 bg-smokedSoy/90 p-4 rounded-xl border border-toastedSesame/15 font-sans text-xs sm:text-sm text-warmPorcelain/95 whitespace-pre-wrap leading-relaxed">
                  {generatedMessage}
                </div>

                {/* Estimated Total Pill */}
                {totalPrice && (
                  <div className="mt-4 p-3 rounded-xl bg-smokedSoy-100/70 border border-toastedSesame/20 flex items-center justify-between text-xs">
                    <span className="text-ricePaper/70">Estimated order subtotal:</span>
                    <span className="font-serif text-base font-bold text-warmPorcelain">
                      Rs. {totalPrice.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-roastedChilli hover:bg-roastedChilli-hover text-warmPorcelain font-bold tracking-wide shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4 text-warmPorcelain" />
                  <span>Send order request via WhatsApp</span>
                </a>

                <div className="p-3 rounded-lg bg-smokedSoy-100/40 border border-toastedSesame/15 text-[11px] text-ricePaper/75 flex items-start space-x-2 leading-relaxed">
                  <Info className="w-4 h-4 text-toastedSesame shrink-0 mt-0.5" />
                  <span>
                    <strong>Kitchen confirmation process:</strong> Clicking opens official WhatsApp with this pre-filled message. Orders are confirmed directly by our dispatch team after verifying kitchen availability and delivery distance.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
