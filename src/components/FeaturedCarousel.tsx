'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    title: 'Wok & Toss Brand Cover',
    subtitle: 'Chinese Food • Freshly Tossed',
    src: '/assets/slides/slide-1-cover.webp',
  },
  {
    title: 'Soups & Crispy Fried',
    subtitle: 'Hot & Sour Broths, Wings & Drumsticks',
    src: '/assets/slides/slide-2-soups-fried.webp',
  },
  {
    title: 'Chicken & Beef Rice Bowls',
    subtitle: 'Signature Gravies Served with Rice',
    src: '/assets/slides/slide-3-rice-bowls.webp',
  },
  {
    title: 'Bowls & Wok Fried Rice',
    subtitle: 'Classic Prawn, Egg & Beef Fried Rice',
    src: '/assets/slides/slide-4-bowls-rice.webp',
  },
  {
    title: 'Chowmein & Wok Boxes',
    subtitle: 'Signature Charred Noodles & Lunch Combos',
    src: '/assets/slides/slide-5-chowmein.webp',
  },
  {
    title: 'Gourmet Loaded Chips',
    subtitle: 'Crisp Fries Topped with Wok Reductions',
    src: '/assets/slides/slide-6-chips.webp',
  },
  {
    title: 'Sauce Dishes & Entrees',
    subtitle: 'Full Chicken & Beef Gravies',
    src: '/assets/slides/slide-7-sauce-dishes.webp',
  },
  {
    title: 'Prawns & Grand Platters',
    subtitle: 'Seafood Specials & Family Sharing Boxes',
    src: '/assets/slides/slide-8-prawns-platters.webp',
  },
  {
    title: 'Student Deals & Combos',
    subtitle: 'Budget Chowmein & Appetizer Combos',
    src: '/assets/slides/slide-9-student-deals.webp',
  },
];

export default function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 bg-smokedSoy text-ricePaper overflow-hidden border-t border-toastedSesame/20" id="brand-archives">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-toastedSesame block mb-1">
            Brand archive
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-warmPorcelain">
            Original menu &amp; spice graphics
          </h2>
          <p className="mt-3 text-sm text-ricePaper/75 leading-relaxed font-sans">
            Reference the original black-and-gold visual slides that establish Wok &amp; Toss’s dish categories and heat profiles.
          </p>
        </div>

        {/* Carousel Showcase */}
        <div className="mt-10 relative max-w-xl mx-auto">
          <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-2xl overflow-hidden border border-toastedSesame/30 bg-smokedSoy-950 shadow-xl p-2 sm:p-3">
            <Image
              src={SLIDES[currentIndex].src}
              alt={SLIDES[currentIndex].title}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-contain p-2"
              priority={currentIndex === 0}
            />
          </div>

          {/* Slide Caption (Unobtrusive & outside the slide image) */}
          <div className="mt-4 text-center">
            <span className="text-xs text-toastedSesame font-medium block">
              Slide {currentIndex + 1} of {SLIDES.length}
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-warmPorcelain mt-0.5">
              {SLIDES[currentIndex].title}
            </h3>
            <p className="text-xs text-ricePaper/70 mt-0.5">
              {SLIDES[currentIndex].subtitle}
            </p>
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-smokedSoy-950/90 border border-toastedSesame/40 text-warmPorcelain hover:text-toastedSesame hover:bg-smokedSoy flex items-center justify-center shadow-lg transition-all focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-smokedSoy-950/90 border border-toastedSesame/40 text-warmPorcelain hover:text-toastedSesame hover:bg-smokedSoy flex items-center justify-center shadow-lg transition-all focus:outline-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="mt-6 flex justify-center items-center gap-2 overflow-x-auto pb-2 max-w-2xl mx-auto px-4">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-12 h-16 rounded-md overflow-hidden border transition-all shrink-0 ${
                currentIndex === index
                  ? 'border-roastedChilli scale-105 shadow-md'
                  : 'border-toastedSesame/20 opacity-60 hover:opacity-100'
              }`}
              aria-label={`View slide ${index + 1}`}
            >
              <Image
                src={slide.src}
                alt={slide.title}
                width={48}
                height={64}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
