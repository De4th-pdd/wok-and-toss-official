'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MENU_ITEMS, CATEGORIES } from '@/data/menu';
import DishCard from '@/components/DishCard';
import { Search, MessageCircle, Filter, ArrowLeft, Info, Flame, X } from 'lucide-react';
import { siteConfig } from '@/lib/config';

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSpiceFilter, setSelectedSpiceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && CATEGORIES.some((c) => c.id === cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const url = new URL(window.location.href);
    if (categoryId === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', categoryId);
    }
    window.history.replaceState(null, '', url.toString());
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Spice heat filter
      if (selectedSpiceFilter !== 'all') {
        const heatNum = parseInt(selectedSpiceFilter, 10);
        if (!isNaN(heatNum) && item.spiceHeatValue !== heatNum) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        const matchSpice = item.spiceLevel.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCategory && !matchSpice) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedSpiceFilter, searchQuery]);

  return (
    <div className="bg-warmPorcelain min-h-screen text-smokedSoy pb-24">
      {/* Editorial Header Banner */}
      <section className="bg-smokedSoy text-ricePaper pt-16 pb-16 border-b border-toastedSesame/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-roastedChilli/10 rounded-full blur-3xl pointer-events-none" />
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
              Kitchen catalog
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-warmPorcelain">
              The Wok &amp; Toss Menu
            </h1>
            <p className="mt-4 text-base sm:text-lg text-ricePaper/80 leading-relaxed font-sans font-light">
              Explore authentic Chinese chowmein, sizzling chicken and beef gravies, wok fried rice, and slow-simmered broths. Prepared fresh to order in Rawalpindi and Islamabad.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Transparency Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="p-4 sm:p-5 rounded-2xl bg-warmPorcelain-card border border-toastedSesame/40 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-roastedChilli shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-mutedText leading-relaxed">
              <span className="font-bold text-smokedSoy">Price confirmation:</span> All listed prices reflect verified Wok &amp; Toss retail rates. For unconfirmed items or daily specials, click &quot;Order&quot; or message &quot;MENU&quot; on WhatsApp to receive current rates and availability for your area.
            </p>
          </div>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-roastedChilli hover:bg-roastedChilli-hover text-warmPorcelain text-xs font-bold shrink-0 shadow transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Request today&apos;s menu</span>
          </a>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between pb-6 border-b border-ricePaper-dark">
          {/* Search Input */}
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-mutedText absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. Chowmein, Chilli Dry, Manchurian)..."
              className="w-full bg-warmPorcelain-card border border-ricePaper-dark/80 rounded-full pl-11 pr-10 py-2.5 text-sm text-smokedSoy placeholder:text-mutedText/60 focus:ring-2 focus:ring-wokCopper outline-none shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mutedText hover:text-smokedSoy"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Spice Filter Buttons */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
            <span className="text-xs font-medium text-mutedText shrink-0 flex items-center mr-1">
              <Filter className="w-3 h-3 mr-1 text-toastedSesame" />
              <span>Spice:</span>
            </span>
            {[
              { id: 'all', label: 'All heat' },
              { id: '0', label: 'Not Spicy' },
              { id: '1', label: 'Mild' },
              { id: '2', label: 'Low to Medium' },
              { id: '3', label: 'Medium' },
              { id: '4', label: 'Spicy' },
              { id: '5', label: 'Extra Spicy' },
            ].map((sp) => (
              <button
                key={sp.id}
                type="button"
                onClick={() => setSelectedSpiceFilter(sp.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shrink-0 border ${
                  selectedSpiceFilter === sp.id
                    ? 'bg-smokedSoy text-warmPorcelain border-smokedSoy shadow-sm'
                    : 'bg-warmPorcelain-card text-mutedText border-ricePaper-dark hover:text-smokedSoy'
                }`}
              >
                {sp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 flex items-center space-x-2 overflow-x-auto pb-3">
          <button
            type="button"
            onClick={() => handleCategorySelect('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all shrink-0 border ${
              selectedCategory === 'all'
                ? 'bg-roastedChilli text-warmPorcelain border-roastedChilli shadow-md'
                : 'bg-warmPorcelain-card text-mutedText border-ricePaper-dark hover:text-smokedSoy hover:bg-ricePaper/50'
            }`}
          >
            All dishes ({MENU_ITEMS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = MENU_ITEMS.filter((m) => m.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all shrink-0 border ${
                  selectedCategory === cat.id
                    ? 'bg-roastedChilli text-warmPorcelain border-roastedChilli shadow-md'
                    : 'bg-warmPorcelain-card text-mutedText border-ricePaper-dark hover:text-smokedSoy hover:bg-ricePaper/50'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Dish Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <DishCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-warmPorcelain-card rounded-3xl border border-ricePaper-dark p-8 max-w-lg mx-auto">
            <Flame className="w-10 h-10 text-roastedChilli mx-auto mb-3" />
            <h3 className="font-serif text-2xl font-bold text-smokedSoy">No dishes match your filter</h3>
            <p className="mt-2 text-sm text-mutedText">
              Try adjusting your search query or selecting &quot;All dishes&quot; to see our complete menu.
            </p>
            <button
              type="button"
              onClick={() => {
                handleCategorySelect('all');
                setSelectedSpiceFilter('all');
                setSearchQuery('');
              }}
              className="mt-6 px-6 py-2.5 rounded-full bg-smokedSoy text-warmPorcelain text-xs font-semibold hover:bg-smokedSoy-50 transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-warmPorcelain min-h-screen text-smokedSoy py-32 text-center">
          <p className="text-mutedText">Loading menu catalog...</p>
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
