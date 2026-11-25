import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import OrderStepSection from '@/components/OrderStepSection';
import { ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Order via WhatsApp',
  description:
    'Learn how to order authentic wok-tossed Chinese food from Wok & Toss in Rawalpindi & Islamabad via WhatsApp. Simple 5-step process from menu to fresh delivery.',
  alternates: {
    canonical: '/how-to-order',
  },
};

export default function HowToOrderPage() {
  return (
    <div className="bg-warmPorcelain min-h-screen text-smokedSoy pb-24">
      {/* Editorial Header */}
      <section className="bg-smokedSoy text-ricePaper pt-16 pb-14 border-b border-toastedSesame/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-toastedSesame hover:text-warmPorcelain transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to home</span>
            </Link>
            
            <span className="text-xs font-semibold text-toastedSesame block mb-1">
              Ordering process
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-warmPorcelain">
              How to order at Wok &amp; Toss
            </h1>
            <p className="mt-4 text-base sm:text-lg text-ricePaper/80 leading-relaxed font-sans font-light">
              We operate a direct WhatsApp ordering model. Every meal is cooked to order specifically for your household, ensuring genuine wok hei and personalized spice levels.
            </p>
          </div>
        </div>
      </section>

      {/* Main Order Steps & Interactive Composer */}
      <OrderStepSection />

      {/* Why We Use WhatsApp Ordering Notice */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-warmPorcelain-card rounded-3xl border border-ricePaper-dark/80 p-8 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-roastedChilli/10 border border-roastedChilli/30 flex items-center justify-center shrink-0 mt-1">
              <ShieldAlert className="w-5 h-5 text-roastedChilli" />
            </div>
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-smokedSoy">
                Why WhatsApp ordering?
              </h2>
              <p className="text-sm text-mutedText leading-relaxed font-sans">
                Unlike mass-production fast food chains, Wok &amp; Toss customizes every wok batch. Our dispatch team confirms live delivery availability for your specific Twin Cities sector, verifies current daily dish selections, and ensures your spice preferences are passed directly for fresh wok preparation.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-mutedText-dark font-sans pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-roastedChilli shrink-0" />
                  <span>Real-time daily availability confirmation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-roastedChilli shrink-0" />
                  <span>Direct communication with our order fulfillment team</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-roastedChilli shrink-0" />
                  <span>Full control to edit your message and order details before dispatch</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Delivery & Fulfillment Information */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-warmPorcelain-card rounded-3xl border border-ricePaper-dark/80 p-8 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-smokedSoy mb-6">
            Delivery &amp; Fulfillment Transparency
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-sans">
            <div className="p-4 rounded-2xl bg-warmPorcelain border border-ricePaper-dark/60">
              <span className="font-bold text-smokedSoy block mb-1 text-sm">Service Area</span>
              <p className="text-mutedText">Rawalpindi and Islamabad across all major sectors and neighborhoods.</p>
            </div>
            <div className="p-4 rounded-2xl bg-warmPorcelain border border-ricePaper-dark/60">
              <span className="font-bold text-smokedSoy block mb-1 text-sm">Delivery Charges</span>
              <p className="text-mutedText">Calculated based on actual distance and rider routing. Confirmed on WhatsApp with zero hidden fees.</p>
            </div>
            <div className="p-4 rounded-2xl bg-warmPorcelain border border-ricePaper-dark/60">
              <span className="font-bold text-smokedSoy block mb-1 text-sm">Estimated Prep &amp; Delivery</span>
              <p className="text-mutedText">Typically 45–75 minutes. Every meal is seared fresh to order over high flame.</p>
            </div>
            <div className="p-4 rounded-2xl bg-warmPorcelain border border-ricePaper-dark/60">
              <span className="font-bold text-smokedSoy block mb-1 text-sm">Payment Methods</span>
              <p className="text-mutedText">Cash on Delivery (COD) and Online Bank Transfer upon order dispatch.</p>
            </div>
            <div className="p-4 rounded-2xl bg-warmPorcelain border border-ricePaper-dark/60">
              <span className="font-bold text-smokedSoy block mb-1 text-sm">Minimum Order</span>
              <p className="text-mutedText">No fixed minimum order amount. We cater from individual boxes to family spreads.</p>
            </div>
            <div className="p-4 rounded-2xl bg-warmPorcelain border border-ricePaper-dark/60">
              <span className="font-bold text-smokedSoy block mb-1 text-sm">Self-Pickup</span>
              <p className="text-mutedText">Pickup coordination is available upon request when placing your order on WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
