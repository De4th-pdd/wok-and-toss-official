import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/config';
import {
  Clock,
  MapPin,
  Phone,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Bike,
} from 'lucide-react';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Service Area & Contact',
  description:
    'Verified contact information, operating hours, and service areas for Wok & Toss Chinese Food in Rawalpindi and Islamabad. Order directly via WhatsApp.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="bg-warmPorcelain min-h-screen text-smokedSoy pb-24">
      {/* Editorial Header */}
      <section className="bg-smokedSoy text-ricePaper pt-24 sm:pt-28 pb-14 border-b border-toastedSesame/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-toastedSesame hover:text-warmPorcelain transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to home</span>
            </Link>
            
            <span className="text-xs font-semibold text-toastedSesame block mb-1 uppercase tracking-wider">
              Service area &amp; business info
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-warmPorcelain">
              About Wok &amp; Toss &amp; delivery coverage
            </h1>
            <p className="mt-4 text-base sm:text-lg text-ricePaper/80 leading-relaxed font-sans font-light">
              Crafting hot, saucy, wok-tossed Chinese food fresh for customers across Rawalpindi and Islamabad.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Verified Business Information */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-warmPorcelain-card p-6 sm:p-8 rounded-3xl border border-ricePaper-dark/80 shadow-sm space-y-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-smokedSoy">
                  Operating details
                </h2>
                <p className="mt-2 text-sm text-mutedText leading-relaxed font-sans">
                  Wok &amp; Toss delivers freshly prepared high-heat Chinese meals directly to customers across the Twin Cities.
                </p>
              </div>

              <div className="space-y-4 text-sm font-sans">
                <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-warmPorcelain border border-ricePaper-dark/60">
                  <Clock className="w-5 h-5 text-roastedChilli mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-smokedSoy block">Operating hours</span>
                    <span className="text-mutedText">Every day, 12:30 PM – 11:00 PM</span>
                    <span className="text-xs text-mutedText block mt-0.5">
                      Open Monday through Sunday for lunch, dinner, and late-evening cravings.
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-warmPorcelain border border-ricePaper-dark/60">
                  <MapPin className="w-5 h-5 text-roastedChilli mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-smokedSoy block">Service area</span>
                    <span className="text-mutedText">Rawalpindi and Islamabad, Pakistan</span>
                    <span className="text-xs text-mutedText/80 block mt-0.5">
                      Delivering across both cities. Confirm your specific sector or neighborhood via WhatsApp.
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-warmPorcelain border border-ricePaper-dark/60">
                  <Phone className="w-5 h-5 text-roastedChilli mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-smokedSoy block">WhatsApp ordering line</span>
                    <a
                      href={siteConfig.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-roastedChilli font-semibold hover:underline"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                    <span className="text-xs text-mutedText/80 block mt-0.5">
                      Direct channel for menu orders, custom spice adjustments, and delivery dispatch.
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-warmPorcelain border border-ricePaper-dark/60">
                  <InstagramIcon className="w-5 h-5 text-roastedChilli mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-smokedSoy block">Official Instagram</span>
                    <a
                      href={siteConfig.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-roastedChilli font-semibold hover:underline"
                    >
                      @wok_toss_pk
                    </a>
                    <span className="text-xs text-mutedText/80 block mt-0.5">
                      Follow for real customer order reels and daily specials.
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-warmPorcelain border border-ricePaper-dark/60">
                  <FacebookIcon className="w-5 h-5 text-roastedChilli mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-smokedSoy block">Official Facebook page</span>
                    <a
                      href={siteConfig.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-roastedChilli font-semibold hover:underline break-all"
                    >
                      facebook.com/1303363079535418
                    </a>
                  </div>
                </div>
              </div>

              {/* Physical Location Notice */}
              <div className="p-4 rounded-2xl bg-ricePaper/60 border border-toastedSesame/30 text-xs text-mutedText leading-relaxed flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Kitchen model:</strong> Wok &amp; Toss operates as a dedicated delivery and takeaway kitchen serving Rawalpindi and Islamabad. All orders are seared fresh over high-heat wok burners and dispatched directly via inDrive or prepared for coordinated pickup.
                </span>
              </div>
            </div>

            {/* Delivery & Fulfillment Transparency */}
            <div className="bg-warmPorcelain-card p-6 sm:p-8 rounded-3xl border border-ricePaper-dark/80 shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-bold text-smokedSoy">
                Delivery &amp; Fulfillment Policy
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-3.5 rounded-xl bg-warmPorcelain border border-ricePaper-dark/60">
                  <span className="font-bold text-smokedSoy block mb-0.5">Service Coverage</span>
                  <p className="text-mutedText">Rawalpindi and Islamabad across all accessible residential sectors and commercial zones.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-warmPorcelain border border-ricePaper-dark/60">
                  <span className="font-bold text-smokedSoy block mb-0.5">Delivery Charges</span>
                  <p className="text-mutedText">Calculated based on actual distance via inDrive. Confirmed transparently upfront on WhatsApp.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-warmPorcelain border border-ricePaper-dark/60">
                  <span className="font-bold text-smokedSoy block mb-0.5">Estimated Prep &amp; Delivery</span>
                  <p className="text-mutedText">Typically 45–75 minutes. Dishes are seared fresh to order, not pre-cooked or held under warming lamps.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-warmPorcelain border border-ricePaper-dark/60">
                  <span className="font-bold text-smokedSoy block mb-0.5">Payment Methods</span>
                  <p className="text-mutedText">Advance payment only via Bank Transfer or Easypaisa upon order confirmation. No COD.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-warmPorcelain border border-ricePaper-dark/60">
                  <span className="font-bold text-smokedSoy block mb-0.5">Minimum Order</span>
                  <p className="text-mutedText">No fixed minimum order amount. From a single chowmein box to full family spreads.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-warmPorcelain border border-ricePaper-dark/60">
                  <span className="font-bold text-smokedSoy block mb-0.5">Self-Pickup Option</span>
                  <p className="text-mutedText">Pickup coordination is available directly on WhatsApp (+92 319 1932923) once meal is ready.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Rebalanced Brand Identity & Direct WhatsApp Trigger */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-smokedSoy text-ricePaper p-6 sm:p-8 rounded-3xl border border-toastedSesame/30 shadow-xl flex flex-col items-center text-center">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-toastedSesame/50 mb-4 bg-smokedSoy-950 p-1 shadow-lg">
                <Image
                  src="/assets/brand/logo.webp"
                  alt="Wok & Toss Chinese Food Logo"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="font-serif text-2xl font-bold text-warmPorcelain">
                WOK &amp; TOSS
              </h3>
              <span className="text-xs text-toastedSesame font-medium mt-1">
                Chinese Food • Freshly Tossed
              </span>

              <p className="mt-4 text-xs sm:text-sm text-ricePaper/80 leading-relaxed font-sans">
                &quot;Freshly wok-tossed Chinese, delivered hot across Rawalpindi &amp; Islamabad.&quot;
              </p>

              <div className="mt-6 w-full pt-6 border-t border-toastedSesame/20 space-y-2.5">
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-bold tracking-wide shadow-md transition-all duration-200"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Order on WhatsApp</span>
                </a>

                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-smokedSoy-100 hover:bg-smokedSoy-50 text-warmPorcelain border border-toastedSesame/30 text-xs font-semibold transition-all"
                >
                  <InstagramIcon className="w-4 h-4 text-toastedSesame" />
                  <span>Follow @wok_toss_pk</span>
                </a>

                <a
                  href={siteConfig.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-smokedSoy-100 hover:bg-smokedSoy-50 text-warmPorcelain border border-toastedSesame/30 text-xs font-semibold transition-all"
                >
                  <FacebookIcon className="w-4 h-4 text-toastedSesame" />
                  <span>Visit Facebook profile</span>
                </a>
              </div>
            </div>

            {/* Quick Ordering Checklist */}
            <div className="bg-warmPorcelain-card p-6 rounded-3xl border border-ricePaper-dark/80 shadow-sm space-y-3">
              <h4 className="font-serif text-lg font-bold text-smokedSoy">
                When you message on WhatsApp:
              </h4>
              <ul className="space-y-2.5 text-xs text-mutedText font-sans">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>State the dishes and heat levels you want.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Provide your delivery area, street address, or sector.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Indicate whether you prefer Delivery (via inDrive) or Self-Pickup.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Receive payment details for advance Bank Transfer or Easypaisa.</span>
                </li>
              </ul>
            </div>

            {/* Rebalanced Column Card: Twin Cities Delivery Guarantee */}
            <div className="bg-warmPorcelain-card p-6 rounded-3xl border border-ricePaper-dark/80 shadow-sm space-y-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-roastedChilli-light flex items-center justify-center text-roastedChilli">
                  <Bike className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base font-bold text-smokedSoy">
                  Twin Cities Delivery via inDrive
                </h4>
              </div>
              <p className="text-xs text-mutedText leading-relaxed">
                We coordinate dispatch via inDrive to ensure your order arrives immediately upon coming off the wok burner. Distance fares are calculated live and shared transparently before your order is confirmed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
