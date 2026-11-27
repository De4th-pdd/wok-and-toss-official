import type { Metadata, Viewport } from 'next';
import { Newsreader, Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import DishCustomizeModal from '@/components/DishCustomizeModal';
import FloatingCartBar from '@/components/FloatingCartBar';
import ScrollToTop from '@/components/ScrollToTop';
import { CartProvider } from '@/context/CartContext';
import { siteConfig } from '@/lib/config';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#171715',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Wok & Toss | Chinese Food in Rawalpindi & Islamabad',
    template: '%s | Wok & Toss Chinese Food',
  },
  description:
    'Craving chowmein, fried rice or bold Chinese gravies? Explore Wok & Toss’s spice levels and order via WhatsApp in Rawalpindi & Islamabad.',
  keywords: [
    'Chinese food in Rawalpindi',
    'Chinese food in Islamabad',
    'Chowmein in Rawalpindi',
    'Fried rice in Islamabad',
    'Chinese gravies in Rawalpindi',
    'Chinese food delivery in the Twin Cities',
    'Wok & Toss menu',
    'Wok and Toss',
    'Chilli Dry Chicken Rawalpindi',
    'Kung Pao Chicken Islamabad',
    'Chinese food WhatsApp order',
  ],
  authors: [{ name: 'Wok & Toss Chinese Food' }],
  creator: 'Wok & Toss',
  publisher: 'Wok & Toss',
  formatDetection: {
    telephone: true,
    email: false,
    address: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Wok & Toss | Chinese Food in Rawalpindi & Islamabad',
    description:
      'Freshly wok-tossed Chinese, delivered hot across Rawalpindi & Islamabad. Browse authentic chowmein, gravies, fried rice and order on WhatsApp.',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Wok & Toss Chinese Food — Fresh Wok Cooking',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wok & Toss | Chinese Food in Rawalpindi & Islamabad',
    description:
      'Craving chowmein, fried rice or bold Chinese gravies? Explore spice levels and order via WhatsApp across the Twin Cities.',
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-192.png',
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Verified Restaurant / FoodEstablishment JSON-LD
  const restaurantJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    image: `${siteConfig.url}/assets/brand/logo.webp`,
    telephone: siteConfig.telephone,
    servesCuisine: siteConfig.cuisine,
    url: siteConfig.url,
    menu: `${siteConfig.url}/menu`,
    areaServed: [
      {
        '@type': 'City',
        name: 'Rawalpindi',
      },
      {
        '@type': 'City',
        name: 'Islamabad',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '12:30',
        closes: '23:00',
      },
    ],
    sameAs: [
      siteConfig.facebookUrl,
      siteConfig.whatsappUrl,
      siteConfig.instagramUrl,
    ],
  };

  return (
    <html lang="en" className={`${newsreader.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-warmPorcelain text-smokedSoy selection:bg-roastedChilli selection:text-warmPorcelain">
        <CartProvider>
          <ScrollToTop />
          <Header />
          <main className="flex-1 pt-18">{children}</main>
          <Footer />
          <CartDrawer />
          <DishCustomizeModal />
          <FloatingCartBar />
        </CartProvider>
      </body>
    </html>
  );
}
