import React from 'react';
import Link from 'next/link';
import { CATEGORIES, MENU_ITEMS } from '@/data/menu';
import { ArrowRight, Flame } from 'lucide-react';

export default function CategoryBrowser() {
  return (
    <section className="py-20 bg-warmPorcelain text-smokedSoy border-t border-ricePaper-dark/50" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold text-mutedText block mb-1">
              Explore our menu categories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-smokedSoy">
              Popular menu categories
            </h2>
            <p className="mt-2 text-base text-mutedText max-w-xl font-sans">
              From high-flame wok chowmein to slow-simmered master broths and sizzling gravies, explore our verified Chinese selections.
            </p>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full border border-smokedSoy/20 hover:border-smokedSoy hover:bg-smokedSoy hover:text-warmPorcelain transition-all text-sm font-semibold self-start md:self-auto shrink-0"
          >
            <span>View all 52 dishes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8-Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat) => {
            const count = MENU_ITEMS.filter((m) => m.category === cat.id).length;

            return (
              <Link
                key={cat.id}
                href={`/menu?category=${cat.id}`}
                className="group bg-warmPorcelain-card p-6 rounded-2xl border border-ricePaper-dark/80 hover:border-toastedSesame/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-toastedSesame font-medium mb-3">
                    <span className="inline-flex items-center space-x-1">
                      <Flame className="w-3.5 h-3.5 text-roastedChilli" />
                      <span>{count} dishes</span>
                    </span>
                    <span className="text-mutedText group-hover:text-roastedChilli group-hover:translate-x-1 transition-all">
                      &rarr;
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-smokedSoy group-hover:text-roastedChilli transition-colors leading-snug">
                    {cat.label}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-mutedText leading-relaxed line-clamp-2">
                    {cat.tagline}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-ricePaper-dark/50 flex items-center justify-between text-xs font-semibold text-roastedChilli">
                  <span>Browse category</span>
                  <span>&rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
