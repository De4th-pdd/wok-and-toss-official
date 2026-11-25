'use client';

import React from 'react';
import OrderComposer from '@/components/OrderComposer';

export default function OrderStepSection() {
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
      title: 'Order confirmation',
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

        {/* Interactive WhatsApp Order Composer */}
        <div className="mt-16">
          <OrderComposer />
        </div>
      </div>
    </section>
  );
}
