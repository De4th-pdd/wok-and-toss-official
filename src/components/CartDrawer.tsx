'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { siteConfig } from '@/lib/config';
import WhatsAppIcon from './WhatsAppIcon';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Bike,
  Store,
  CreditCard,
  AlertCircle,
  MapPin,
  User,
  Phone,
  Flame,
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalCount,
    hasUnconfirmedPrices,
  } = useCart();

  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Bank Transfer' | 'Easypaisa'>('Bank Transfer');
  const [validationError, setValidationError] = useState('');

  if (!isCartOpen) return null;

  const handleCheckoutWhatsApp = () => {
    if (!customerName.trim()) {
      setValidationError('Please enter your name.');
      return;
    }
    if (!customerPhone.trim()) {
      setValidationError('Please enter your phone number.');
      return;
    }
    if (fulfillment === 'delivery' && !deliveryAddress.trim()) {
      setValidationError('Please enter your delivery sector / address.');
      return;
    }
    setValidationError('');

    // Build the formatted order text
    const lines: string[] = [];
    lines.push('🥢 *NEW ORDER — WOK & TOSS CHINESE FOOD*');
    lines.push('──────────────────────────────');
    lines.push(`👤 *Customer:* ${customerName.trim()}`);
    lines.push(`📞 *Phone:* ${customerPhone.trim()}`);
    lines.push(
      `🚚 *Fulfillment:* ${
        fulfillment === 'delivery' ? 'Delivery via inDrive' : 'Self-Pickup'
      }`
    );
    if (fulfillment === 'delivery') {
      lines.push(`📍 *Delivery Address:* ${deliveryAddress.trim()}`);
    }
    lines.push(`💳 *Payment Method:* ${paymentMethod} (Advance Payment)`);
    lines.push('──────────────────────────────');
    lines.push('📦 *ORDER ITEMS:*');

    cartItems.forEach((item, idx) => {
      const portionText = item.portionSize ? ` (${item.portionSize})` : '';
      lines.push(`${idx + 1}. *${item.name}*${portionText}`);
      lines.push(`   • Heat: ${item.spiceLevel} (Level ${item.spiceHeatValue} of 5)`);
      if (item.instructions) {
        lines.push(`   • Note: ${item.instructions}`);
      }
      if (item.unitPrice && item.priceConfirmationStatus === 'confirmed') {
        const itemTotal = item.unitPrice * item.quantity;
        lines.push(
          `   • Qty: ${item.quantity} × Rs. ${item.unitPrice.toLocaleString()} = Rs. ${itemTotal.toLocaleString()}`
        );
      } else {
        lines.push(`   • Qty: ${item.quantity} (Price to be confirmed)`);
      }
      lines.push('');
    });

    lines.push('──────────────────────────────');
    if (!hasUnconfirmedPrices) {
      lines.push(`💰 *Food Subtotal:* Rs. ${subtotal.toLocaleString()}`);
    } else {
      lines.push(`💰 *Estimated Subtotal:* Rs. ${subtotal.toLocaleString()} (+ unconfirmed items)`);
    }

    if (fulfillment === 'delivery') {
      lines.push('🛵 *Delivery:* inDrive fare to be confirmed on WhatsApp');
    }
    lines.push('──────────────────────────────');
    lines.push(
      'Please confirm availability, delivery fare, and share account details for advance payment.'
    );

    const message = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/${siteConfig.phoneRaw}?text=${message}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-smokedSoy-950/70 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          className="w-screen max-w-md bg-warmPorcelain shadow-2xl flex flex-col border-l border-ricePaper-dark"
          aria-labelledby="cart-heading"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-smokedSoy text-warmPorcelain flex items-center justify-between border-b border-toastedSesame/30">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-5 h-5 text-toastedSesame" />
              <div>
                <h2 id="cart-heading" className="font-serif text-lg font-bold">
                  Your Order Tray
                </h2>
                <span className="text-xs text-toastedSesame/90">
                  {totalCount} {totalCount === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {cartItems.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-warmPorcelain/70 hover:text-warmPorcelain transition-colors px-2 py-1"
                  title="Clear all items"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={closeCart}
                className="p-1.5 rounded-lg text-warmPorcelain hover:bg-smokedSoy-50/50 transition-colors"
                aria-label="Close tray"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Content */}
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-ricePaper-dark/40 flex items-center justify-center text-mutedText">
                <ShoppingBag className="w-8 h-8 text-toastedSesame/70" />
              </div>
              <h3 className="font-serif text-xl font-bold text-smokedSoy">
                Your tray is empty
              </h3>
              <p className="text-sm text-mutedText max-w-xs">
                Explore our authentic noodles, chicken gravies, and soups to start building your order.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 rounded-full bg-smokedSoy text-warmPorcelain text-sm font-semibold hover:bg-smokedSoy-900 transition-colors shadow-md"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
              {/* Items List */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-mutedText block">
                  Items in Tray
                </span>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-warmPorcelain-card border border-ricePaper-dark/80 shadow-sm flex items-start space-x-3"
                  >
                    {/* Item Thumbnail */}
                    {item.image ? (
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-smokedSoy-950 shrink-0 border border-ricePaper-dark">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-ricePaper-dark/30 flex items-center justify-center shrink-0 border border-ricePaper-dark">
                        <Flame className="w-6 h-6 text-roastedChilli/70" />
                      </div>
                    )}

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif font-bold text-sm text-smokedSoy leading-tight truncate">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-mutedText hover:text-roastedChilli p-1 transition-colors shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px] text-mutedText">
                        {item.portionSize && (
                          <span className="px-1.5 py-0.5 rounded bg-ricePaper font-medium text-smokedSoy/90">
                            {item.portionSize}
                          </span>
                        )}
                        <span className="px-1.5 py-0.5 rounded bg-roastedChilli-light/50 text-roastedChilli font-semibold flex items-center gap-0.5">
                          🌶️ {item.spiceLevel}
                        </span>
                      </div>

                      {item.instructions && (
                        <p className="text-[11px] text-mutedText-dark italic mt-1 bg-ricePaper/40 p-1 rounded">
                          &quot;{item.instructions}&quot;
                        </p>
                      )}

                      {/* Quantity Stepper & Price */}
                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-ricePaper-dark/40">
                        <div className="flex items-center space-x-2 bg-ricePaper/60 rounded-lg p-0.5 border border-ricePaper-dark/70">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded text-smokedSoy hover:bg-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-smokedSoy w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded text-smokedSoy hover:bg-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-roastedChilli">
                          {item.unitPrice && item.priceConfirmationStatus === 'confirmed'
                            ? `Rs. ${(item.unitPrice * item.quantity).toLocaleString()}`
                            : 'Price on WhatsApp'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fulfillment Method Selection */}
              <div className="space-y-3 pt-2 border-t border-ricePaper-dark/60">
                <span className="text-xs font-bold uppercase tracking-wider text-mutedText block">
                  Fulfillment Method
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFulfillment('delivery')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 text-center transition-all ${
                      fulfillment === 'delivery'
                        ? 'border-roastedChilli bg-roastedChilli-light/50 text-roastedChilli ring-1 ring-roastedChilli font-semibold'
                        : 'border-ricePaper-dark/70 text-mutedText hover:border-toastedSesame/40 bg-ricePaper/30'
                    }`}
                  >
                    <Bike className="w-5 h-5" />
                    <span className="text-xs">Delivery (via inDrive)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFulfillment('pickup')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 text-center transition-all ${
                      fulfillment === 'pickup'
                        ? 'border-roastedChilli bg-roastedChilli-light/50 text-roastedChilli ring-1 ring-roastedChilli font-semibold'
                        : 'border-ricePaper-dark/70 text-mutedText hover:border-toastedSesame/40 bg-ricePaper/30'
                    }`}
                  >
                    <Store className="w-5 h-5" />
                    <span className="text-xs">Self-Pickup</span>
                  </button>
                </div>

                {fulfillment === 'delivery' ? (
                  <p className="text-[11px] text-mutedText leading-relaxed bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60 text-amber-900">
                    🛵 <strong>inDrive Delivery:</strong> Exact delivery fare varies by distance across Rawalpindi &amp; Islamabad and is confirmed on WhatsApp before dispatch.
                  </p>
                ) : (
                  <p className="text-[11px] text-mutedText leading-relaxed bg-blue-50/70 p-2.5 rounded-xl border border-blue-200/60 text-blue-900">
                    📍 <strong>Self-Pickup:</strong> Coordinate pickup timing and exact kitchen pickup location directly on WhatsApp (+92 319 1932923).
                  </p>
                )}
              </div>

              {/* Customer Contact & Address Form */}
              <div className="space-y-3 pt-2 border-t border-ricePaper-dark/60">
                <span className="text-xs font-bold uppercase tracking-wider text-mutedText block">
                  Your Contact Details
                </span>

                <div className="space-y-2">
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-mutedText absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs text-smokedSoy bg-white border border-ricePaper-dark rounded-xl focus:outline-none focus:ring-1 focus:ring-roastedChilli"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-mutedText absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="WhatsApp Phone Number (e.g. 0319 1932923) *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs text-smokedSoy bg-white border border-ricePaper-dark rounded-xl focus:outline-none focus:ring-1 focus:ring-roastedChilli"
                    />
                  </div>

                  {fulfillment === 'delivery' && (
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-mutedText absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Delivery Sector / Street / Landmark *"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs text-smokedSoy bg-white border border-ricePaper-dark rounded-xl focus:outline-none focus:ring-1 focus:ring-roastedChilli"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3 pt-2 border-t border-ricePaper-dark/60">
                <span className="text-xs font-bold uppercase tracking-wider text-mutedText block flex items-center justify-between">
                  <span>Advance Payment Method</span>
                  <span className="text-[10px] text-roastedChilli font-semibold normal-case">No COD</span>
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Bank Transfer')}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center space-x-2 ${
                      paymentMethod === 'Bank Transfer'
                        ? 'border-roastedChilli bg-roastedChilli-light/50 text-smokedSoy ring-1 ring-roastedChilli font-semibold'
                        : 'border-ricePaper-dark/70 text-mutedText bg-ricePaper/30'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-roastedChilli shrink-0" />
                    <span>Bank Transfer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Easypaisa')}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center space-x-2 ${
                      paymentMethod === 'Easypaisa'
                        ? 'border-roastedChilli bg-roastedChilli-light/50 text-smokedSoy ring-1 ring-roastedChilli font-semibold'
                        : 'border-ricePaper-dark/70 text-mutedText bg-ricePaper/30'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-600 text-[10px] font-bold text-white flex items-center justify-center shrink-0">
                      EP
                    </span>
                    <span>Easypaisa</span>
                  </button>
                </div>

                <p className="text-[11px] text-mutedText bg-ricePaper/40 p-2 rounded-lg">
                  🔒 <strong>Policy:</strong> Orders are prepared fresh upon receipt of advance bank transfer or Easypaisa receipt on WhatsApp.
                </p>
              </div>

              {/* Validation Error Message */}
              {validationError && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center space-x-2 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{validationError}</span>
                </div>
              )}
            </div>
          )}

          {/* Footer Subtotal & WhatsApp Submit CTA */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-ricePaper-dark/80 space-y-3">
              <div className="space-y-1.5 text-xs text-mutedText">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-smokedSoy">Food Subtotal:</span>
                  <span className="font-serif font-bold text-base text-smokedSoy">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span>Delivery Fare:</span>
                  <span className="text-mutedText-dark font-medium">
                    {fulfillment === 'delivery' ? 'Calculated via inDrive' : 'Self-Pickup'}
                  </span>
                </div>

                {hasUnconfirmedPrices && (
                  <p className="text-[11px] text-roastedChilli italic">
                    * Some items require price confirmation on WhatsApp.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleCheckoutWhatsApp}
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-bold tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2.5 focus:ring-2 focus:ring-emerald-400 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>Place Order on WhatsApp</span>
              </button>

              <p className="text-[10px] text-center text-mutedText">
                Sends itemized order to <strong>+92 319 1932923</strong>. No app download required.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
