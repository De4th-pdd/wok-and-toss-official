import React from 'react';
import Image from 'next/image';
import { siteConfig } from '@/lib/config';
import { FacebookIcon } from '@/components/Icons';
import { MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface OrderSpotlightItem {
  id: string;
  title: string;
  area: string;
  image: string;
  description: string;
  tag: string;
}

const SPOTLIGHT_ORDERS: OrderSpotlightItem[] = [
  {
    id: 'combo-box',
    title: 'Chilli Dry & Chowmein Combo Spread',
    area: 'Rawalpindi delivery',
    image: '/assets/dishes/chilli-dry-and-chowmein-combo.webp',
    description: 'Sizzling green chili dry chicken paired with wok-tossed egg chowmein in heat-retaining delivery packaging.',
    tag: 'Popular Combo',
  },
  {
    id: 'lunch-feast',
    title: 'Twin Cities Lunch Box Feast',
    area: 'Islamabad delivery',
    image: '/assets/dishes/lunch-box-feast.webp',
    description: 'Freshly prepared chicken gravy, egg fried rice, and crisp starters prepared for a multi-person office lunch order.',
    tag: 'Group Order',
  },
  {
    id: 'signature-chowmein',
    title: 'Classic Chicken Chowmein Box',
    area: 'Twin Cities delivery',
    image: '/assets/dishes/signature-chowmein.webp',
    description: 'Wok-charred egg noodles with julienned chicken, shredded cabbage, and fragrant aged soy packed fresh off the flame.',
    tag: 'Bestseller',
  },
  {
    id: 'kung-pao-cashew',
    title: 'Kung Pao & Cashew Dinner Platter',
    area: 'Sector order',
    image: '/assets/dishes/kung-pao-cashew.webp',
    description: 'Spiced chicken stir-fry with roasted cashews, whole dried chilies, and scallions in a glossy savory reduction.',
    tag: 'Dinner Spread',
  },
];

export default function CustomerSpotlight() {
  return (
    <section className="py-20 bg-ricePaper/40 text-smokedSoy border-t border-ricePaper-dark/60" id="customer-spotlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold text-mutedText block mb-1 uppercase tracking-wider">
              Real Twin Cities deliveries
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-smokedSoy">
              Fresh orders on the move
            </h2>
            <p className="mt-2 text-base text-mutedText max-w-xl font-sans leading-relaxed">
              Real meals prepared for homes, workplaces, and weekend gatherings across Rawalpindi and Islamabad. No studio mockups or stock food images.
            </p>
          </div>

          <a
            href={siteConfig.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-smokedSoy/20 hover:border-smokedSoy hover:bg-smokedSoy hover:text-warmPorcelain transition-all text-xs font-semibold self-start md:self-auto shrink-0 shadow-sm"
          >
            <FacebookIcon className="w-3.5 h-3.5 text-roastedChilli" />
            <span>Follow our Facebook page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Grid of Real Customer Orders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPOTLIGHT_ORDERS.map((item) => (
            <div
              key={item.id}
              className="bg-warmPorcelain-card rounded-2xl border border-ricePaper-dark/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] w-full bg-smokedSoy-950 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-semibold bg-smokedSoy-950/85 text-warmPorcelain px-2.5 py-0.5 rounded-full border border-toastedSesame/30">
                      {item.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <span className="text-[10px] text-warmPorcelain/90 bg-smokedSoy/90 px-2 py-0.5 rounded">
                      {item.area}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="font-serif text-lg font-bold text-smokedSoy leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-mutedText leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0">
                <a
                  href={`https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
                    `Hi Wok & Toss! I'd like to ask about ordering the ${item.title}. Please share availability and current pricing for my area.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-warmPorcelain border border-ricePaper-dark/90 hover:border-roastedChilli hover:bg-roastedChilli hover:text-warmPorcelain text-xs font-semibold text-smokedSoy transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-roastedChilli" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Facebook & Verification Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-warmPorcelain border border-ricePaper-dark/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center space-x-3 text-xs sm:text-sm text-mutedText font-sans">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <p>
              <strong className="text-smokedSoy">Authentic food photography:</strong> Every photograph shows genuine Wok &amp; Toss customer portions seared fresh in Twin Cities woks.
            </p>
          </div>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-roastedChilli hover:bg-roastedChilli-hover text-warmPorcelain text-xs font-bold shrink-0 shadow transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Send &quot;MENU&quot; for today&apos;s specials</span>
          </a>
        </div>
      </div>
    </section>
  );
}
