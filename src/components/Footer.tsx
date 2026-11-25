import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/config';
import { MessageCircle, Clock, MapPin, Phone } from 'lucide-react';
import { FacebookIcon } from '@/components/Icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-smokedSoy text-ricePaper border-t border-toastedSesame/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-toastedSesame/15">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-toastedSesame/40 bg-smokedSoy-950 p-0.5">
                <Image
                  src="/assets/brand/logo.webp"
                  alt="Wok & Toss Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-warmPorcelain">
                WOK &amp; TOSS
              </span>
            </div>
            <p className="text-sm text-ricePaper/80 leading-relaxed font-sans">
              Hot, saucy, wok-tossed Chinese, made fresh for you. Freshly prepared to order across Rawalpindi and Islamabad.
            </p>
            <div className="text-xs text-toastedSesame font-medium tracking-wide">
              &quot;Wok says toss.&quot;
            </div>
            <div className="pt-2 flex items-center space-x-4">
              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-smokedSoy-100 border border-toastedSesame/30 flex items-center justify-center text-ricePaper hover:text-toastedSesame hover:border-toastedSesame transition-colors"
                aria-label="Wok & Toss on Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-smokedSoy-100 border border-toastedSesame/30 flex items-center justify-center text-ricePaper hover:text-roastedChilli hover:border-roastedChilli transition-colors"
                aria-label="Wok & Toss on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Operating Hours & Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-warmPorcelain tracking-wide border-l-2 border-roastedChilli pl-3">
              Hours and contact
            </h3>
            <ul className="space-y-3 text-sm text-ricePaper/85 font-sans">
              <li className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-toastedSesame mt-0.5 shrink-0" />
                <div>
                  <span className="block font-medium text-warmPorcelain">Operating hours</span>
                  <span className="text-xs text-ricePaper/70">{siteConfig.openingHoursDisplay}</span>
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-toastedSesame mt-0.5 shrink-0" />
                <div>
                  <span className="block font-medium text-warmPorcelain">WhatsApp line</span>
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-toastedSesame hover:underline"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-toastedSesame mt-0.5 shrink-0" />
                <div>
                  <span className="block font-medium text-warmPorcelain">Service coverage</span>
                  <span className="text-xs text-ricePaper/70">Rawalpindi &amp; Islamabad (Twin Cities)</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Sections */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-warmPorcelain tracking-wide border-l-2 border-roastedChilli pl-3">
              Explore Wok &amp; Toss
            </h3>
            <ul className="space-y-2 text-sm text-ricePaper/80 font-sans">
              <li>
                <Link href="/menu" className="hover:text-toastedSesame transition-colors">
                  Complete menu
                </Link>
              </li>
              <li>
                <Link href="/spice-guide" className="hover:text-toastedSesame transition-colors">
                  Spice guide
                </Link>
              </li>
              <li>
                <Link href="/how-to-order" className="hover:text-toastedSesame transition-colors">
                  How ordering works
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-toastedSesame transition-colors">
                  Service area &amp; about
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-roastedChilli hover:text-roastedChilli-light transition-colors font-medium flex items-center space-x-1"
                >
                  <span>Request today&apos;s menu</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Twin Cities Local Notice */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-warmPorcelain tracking-wide border-l-2 border-roastedChilli pl-3">
              Twin Cities delivery
            </h3>
            <p className="text-xs text-ricePaper/75 leading-relaxed font-sans">
              Craving fresh Chinese food in Islamabad or Rawalpindi? Send &quot;MENU&quot; on WhatsApp, specify your area and party size, and our team will share the latest availability and delivery arrangements.
            </p>
            <div className="p-3 bg-smokedSoy-950/70 rounded-lg border border-toastedSesame/20 text-xs text-toastedSesame/90">
              <span className="font-semibold block text-warmPorcelain">Direct WhatsApp ordering:</span>
              High-heat wok cooking prepared fresh to order and coordinated directly via WhatsApp.
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ricePaper/60 font-sans gap-4">
          <p>
            &copy; {currentYear} Wok &amp; Toss Chinese Food. All rights reserved. Rawalpindi &amp; Islamabad, Pakistan.
          </p>
          <div className="flex items-center space-x-4">
            <span>Daily 12:30 PM – 11:00 PM</span>
            <span>•</span>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-toastedSesame hover:underline"
            >
              WhatsApp: {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
