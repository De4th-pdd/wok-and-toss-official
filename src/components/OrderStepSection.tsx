'use client';

import React from 'react';
import OrderComposer from '@/components/OrderComposer';

interface OrderStepSectionProps {
  hideHeader?: boolean;
}

export default function OrderStepSection({ hideHeader = false }: OrderStepSectionProps) {
  const steps = [
    {
      number: '1',
      title: 'Browse and choose',
      description: 'Explore Chinese chowmein, sizzling gravies, fried rice, and simmered broths.',
    },
    {
      number: '2',
      title: 'Customize order',
      description: 'Select your preferred heat level (1–5), portion size (Medium/Large), and quantity.',
    },
    {
      number: '3',
      title: 'Submit order tray',
      description: 'Review your itemized tray with delivery address or pickup request and advance payment method.',
    },
    {
      number: '4',
      title: 'Order confirmation',
      description: 'Our team verifies live availability, inDrive delivery fare, and provides payment account details.',
    },
    {
      number: '5',
      title: 'Fresh delivery',
      description: 'Your food is tossed fresh on high-heat wok burners and delivered piping hot across Rawalpindi & Islamabad.',
    },
  ];

  return (
    <section className="py-16 bg-warmPorcelain text-smokedSoy border-t border-ricePaper-dark/50" id="how-to-order">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (hidden on dedicated page) */}
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-mutedText block mb-2 uppercase tracking-wider">
              Direct WhatsApp ordering
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-smokedSoy">
              How to order at Wok &amp; Toss
            </h2>
            <p className="mt-4 text-base sm:text-lg text-mutedText leading-relaxed font-sans">
              Every order is cooked fresh from scratch. We operate directly via WhatsApp so you can customize spice, confirm delivery area, and get real-time availability.
            </p>
          </div>
        )}

        {/* 5-Step Process with equal card heights */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
          {steps.map((st) => (
            <div
              key={st.number}
              className="bg-warmPorcelain-card p-6 rounded-2xl border border-ricePaper-dark/80 relative shadow-sm flex flex-col justify-between h-full"
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

        {/* Interactive WhatsApp Order Composer */}
        <div className="mt-14">
          <OrderComposer />
        </div>
      </div>
    </section>
  );
}
