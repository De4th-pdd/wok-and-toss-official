import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import SpiceGuideSection from '@/components/SpiceGuideSection';
import { siteConfig } from '@/lib/config';
import { MessageCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Spice Guide & Heat Levels',
  description:
    'Explore the official Wok & Toss spice scale: from mild garlic-soy chowmein to blistering firecracker chicken gravies. Tailor your heat level via WhatsApp in Rawalpindi & Islamabad.',
  alternates: {
    canonical: '/spice-guide',
  },
};

export default function SpiceGuidePage() {
  return (
    <div className="bg-smokedSoy min-h-screen text-ricePaper pb-24">
      {/* Editorial Header */}
      <section className="bg-smokedSoy-950 text-ricePaper pt-16 pb-14 border-b border-toastedSesame/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-roastedChilli/15 rounded-full blur-3xl pointer-events-none" />
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
              Heat scale
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-warmPorcelain">
              The Wok &amp; Toss Spice Guide
            </h1>
            <p className="mt-4 text-base sm:text-lg text-ricePaper/85 leading-relaxed font-sans font-light">
              We never lump Chinese cooking into a generic one-size-fits-all heat scale. Our spice profiles are tailored specifically for noodles, chicken gravies, and beef/prawn wok reductions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Guide Component */}
      <SpiceGuideSection />

      {/* Culinary Spice Promise */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-smokedSoy-950/90 rounded-3xl border border-toastedSesame/30 p-8 sm:p-10 shadow-xl">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-roastedChilli/20 border border-roastedChilli/40 flex items-center justify-center shrink-0 mt-1">
              <ShieldCheck className="w-5 h-5 text-roastedChilli" />
            </div>
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-warmPorcelain">
                Spice adjustment policy
              </h2>
              <p className="text-sm text-ricePaper/85 leading-relaxed font-sans">
                As stated directly on our brand graphics: <span className="text-toastedSesame font-medium">&quot;Spice levels can be adjusted by contacting Wok &amp; Toss on WhatsApp.&quot;</span> Whether you have family members who prefer zero chili or cravers who demand extra bird&apos;s eye heat, seasoning and heat levels are customized for each order.
              </p>
              <div className="pt-2">
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-roastedChilli hover:bg-roastedChilli-hover text-warmPorcelain text-xs font-bold tracking-wide transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Request custom spice on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
