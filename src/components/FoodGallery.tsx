'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import { Eye, Play } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    title: 'Chilli Dry & Chowmein Combo',
    category: 'Twin Cities Delivery Order',
    src: '/assets/dishes/chilli-dry-and-chowmein-combo.webp',
    aspect: 'aspect-[3/4]',
  },
  {
    title: 'Sizzling Chilli Dry Chicken',
    category: 'High-Heat Wok Toss',
    video: '/assets/video/chilli-chicken.mp4',
    poster: '/assets/video/chilli-chicken-poster.webp',
    aspect: 'aspect-[3/4]',
  },
  {
    title: 'Signature Chicken Chowmein',
    category: 'Wok-Charred Egg Noodles',
    src: '/assets/dishes/signature-chowmein.webp',
    aspect: 'aspect-square',
  },
  {
    title: 'Hot & Sour Master Broth',
    category: 'Slow-Simmered Daily',
    src: '/assets/dishes/hot-and-sour-soup.webp',
    aspect: 'aspect-square',
  },
  {
    title: 'Kung Pao Kick Chicken',
    category: 'Peanuts & Whole Red Chilies',
    src: '/assets/dishes/kung-pao-sauce.webp',
    aspect: 'aspect-square',
  },
  {
    title: '3-Compartment Takeaway Box',
    category: 'Lunch & Dinner Feast',
    src: '/assets/dishes/lunch-box-feast.webp',
    aspect: 'aspect-square',
  },
];

export default function FoodGallery() {
  const [showArchive, setShowArchive] = useState(false);

  return (
    <section className="py-20 bg-smokedSoy text-ricePaper overflow-hidden border-t border-toastedSesame/20" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold text-toastedSesame block mb-1">
              From our kitchen
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-warmPorcelain">
              Real food. Real wok craft.
            </h2>
            <p className="mt-2 text-base text-ricePaper/80 max-w-xl font-sans">
              No generic stock photos or AI-generated dishes. Every photo and clip depicts real orders prepared fresh in our kitchen.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowArchive(!showArchive)}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-toastedSesame/40 text-ricePaper hover:text-warmPorcelain hover:bg-smokedSoy-100 transition-colors text-xs font-semibold self-start md:self-auto shrink-0"
          >
            <Eye className="w-3.5 h-3.5 text-toastedSesame" />
            <span>{showArchive ? 'Hide brand slide archive' : 'View original menu slides archive'}</span>
          </button>
        </div>

        {/* Visual Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden border border-toastedSesame/20 bg-smokedSoy-950 shadow-md flex flex-col justify-end"
            >
              <div className={`relative w-full ${item.aspect} overflow-hidden`}>
                {item.video ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={item.poster}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={item.src!}
                    alt={`${item.title} - Wok & Toss`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-smokedSoy-950/90 via-smokedSoy-950/20 to-transparent" />

                {item.video && (
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-smokedSoy-950/80 border border-toastedSesame/40 flex items-center justify-center text-warmPorcelain">
                    <Play className="w-3 h-3 fill-warmPorcelain" />
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] text-toastedSesame font-medium block">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-warmPorcelain leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional Collapsible Archive Slider */}
        {showArchive && (
          <div className="mt-12 pt-12 border-t border-toastedSesame/20 animate-in fade-in duration-300">
            <FeaturedCarousel />
          </div>
        )}
      </div>
    </section>
  );
}
