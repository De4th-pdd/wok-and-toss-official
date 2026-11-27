import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import SpiceGuideSection from '@/components/SpiceGuideSection';
import { ArrowLeft } from 'lucide-react';

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
    <div className="bg-smokedSoy min-h-screen text-ricePaper pb-20">
      {/* Editorial Header */}
      <section className="bg-smokedSoy-950 text-ricePaper pt-24 sm:pt-28 pb-12 border-b border-toastedSesame/20 relative overflow-hidden">
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
            
            <span className="text-xs font-semibold text-toastedSesame block mb-1 uppercase tracking-wider">
              Heat scale
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-warmPorcelain">
              The Wok &amp; Toss Spice Guide
            </h1>
            <p className="mt-4 text-base sm:text-lg text-ricePaper/85 leading-relaxed font-sans font-light">
              We never lump Chinese cooking into a generic one-size-fits-all heat scale. Our spice profiles are tailored specifically for noodles, chicken gravies, and beef or prawn wok reductions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Guide Component (Duplicate header suppressed) */}
      <SpiceGuideSection hideHeader={true} />
    </div>
  );
}
