import React from 'react';
import Image from 'next/image';
import { MenuItem, formatCustomerPrice, getWhatsAppOrderUrl } from '@/data/menu';
import { MessageCircle, Flame, AlertCircle } from 'lucide-react';

interface DishCardProps {
  item: MenuItem;
}

export default function DishCard({ item }: DishCardProps) {
  const displayPrice = formatCustomerPrice(item);
  const whatsappUrl = getWhatsAppOrderUrl(item);

  // Map 6 standardized heat levels to badge colors
  const getSpiceBadgeStyle = (level: string) => {
    switch (level) {
      case 'Not Spicy':
        return 'bg-ricePaper text-mutedText-dark border-toastedSesame/30';
      case 'Mild':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'Low to Medium':
        return 'bg-orange-50 text-orange-900 border-orange-200';
      case 'Medium':
        return 'bg-orange-100 text-orange-950 border-orange-300';
      case 'Spicy':
        return 'bg-red-50 text-red-900 border-red-200';
      case 'Extra Spicy':
        return 'bg-roastedChilli-light text-roastedChilli border-roastedChilli/30 font-semibold';
      default:
        return 'bg-ricePaper text-mutedText border-toastedSesame/20';
    }
  };

  return (
    <article className="group bg-warmPorcelain-card rounded-2xl border border-ricePaper-dark/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      {/* Visual Header: Authentic photography or deliberate typography card */}
      {item.image ? (
        <div className="relative aspect-square w-full overflow-hidden bg-smokedSoy-950">
          <Image
            src={item.image}
            alt={`${item.name} at Wok & Toss Chinese Food`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getSpiceBadgeStyle(
                item.spiceLevel
              )} shadow-sm bg-warmPorcelain/95 backdrop-blur-sm`}
            >
              <Flame className="w-3 h-3 text-roastedChilli" />
              <span>{item.spiceLevel}</span>
            </span>
          </div>
          {item.portionSize && (
            <div className="absolute top-3 right-3 z-10">
              <span className="text-xs text-warmPorcelain bg-smokedSoy-950/85 backdrop-blur-sm px-2.5 py-1 rounded-md font-sans border border-toastedSesame/30 shadow-sm">
                {item.portionSize}
              </span>
            </div>
          )}
        </div>
      ) : (
        /* Deliberate typography-led card header (No fake stock photo) */
        <div className="p-5 pb-3 bg-gradient-to-br from-ricePaper/60 via-warmPorcelain to-ricePaper/30 border-b border-ricePaper-dark/40">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSpiceBadgeStyle(
                item.spiceLevel
              )}`}
            >
              <Flame className="w-3 h-3 text-roastedChilli" />
              <span>{item.spiceLevel}</span>
            </span>
            {item.portionSize && (
              <span className="text-xs text-mutedText font-sans">
                {item.portionSize}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-xl font-bold text-smokedSoy group-hover:text-roastedChilli transition-colors leading-snug">
            {item.name}
          </h3>
          <p className="mt-2 text-sm text-mutedText leading-relaxed line-clamp-3 font-sans">
            {item.description}
          </p>

          {/* Allergens badge list */}
          {item.allergens && item.allergens.length > 0 && (
            <div className="mt-3 text-[11px] text-mutedText flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-smokedSoy/70">Allergens:</span>
              <span className="text-mutedText-dark">{item.allergens.join(', ')}</span>
            </div>
          )}

          {/* Dish tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-md bg-ricePaper text-mutedText-dark font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Order Action */}
        <div className="mt-6 pt-4 border-t border-ricePaper-dark/50 flex items-center justify-between gap-3">
          <div>
            <span className="block text-xs text-mutedText font-medium">
              Price
            </span>
            <span
              className={`font-serif text-base font-bold ${
                item.priceConfirmationStatus === 'confirmed'
                  ? 'text-smokedSoy'
                  : 'text-roastedChilli font-sans text-xs italic flex items-center gap-1'
              }`}
            >
              {item.priceConfirmationStatus !== 'confirmed' && (
                <AlertCircle className="w-3 h-3 text-roastedChilli inline shrink-0" />
              )}
              {displayPrice}
            </span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-roastedChilli hover:bg-roastedChilli-hover text-warmPorcelain text-xs font-semibold tracking-wide shadow-sm hover:shadow transition-all duration-200 shrink-0"
            aria-label={`Order ${item.name} on WhatsApp`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Order</span>
          </a>
        </div>
      </div>
    </article>
  );
}
