import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

import prisma from "@/lib/prisma";
import { getSiteUrl, getStoreConfig } from "@/lib/store-config";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700"],
  variable: "--font-tajawal",
});

export async function generateMetadata(): Promise<Metadata> {
  const store = await getStoreConfig()
  const brandTitle = `${store.name} | ${store.nameLatin || 'ORVÉN'} — دار الساعات المعاصرة`
  const brandDescription = store.description || 'أورڤِن — دار ساعات معاصرة تصنع قطعًا نادرة، تجمع بين دقة الحركة وهدوء الحضور.'
  const socialImage = store.ogImageUrl || '/orven-og.svg'
  const brandIcon = store.faviconUrl || '/orven-mark.svg'

  return {
    metadataBase: getSiteUrl(store.storeUrl),
    title: {
      default: brandTitle,
      template: `%s — ${store.nameLatin || 'ORVÉN'}`,
    },
    description: brandDescription,
    applicationName: 'ORVÉN — أورڤِن',
    generator: 'ORVÉN Atelier',
    creator: 'ORVÉN',
    publisher: 'ORVÉN',
    keywords: ['ORVÉN', 'أورڤِن', 'ساعات فاخرة', 'ساعات معاصرة', 'ساعات أوتوماتيك', 'دار ساعات'],
    alternates: { canonical: '/' },
    themeColor: '#111517',
    manifest: '/manifest.webmanifest',
    openGraph: {
      type: 'website',
      locale: 'ar_SA',
      siteName: 'ORVÉN — أورڤِن',
      title: brandTitle,
      description: brandDescription,
      images: [{ url: socialImage, width: 1200, height: 630, alt: 'ORVÉN — أورڤِن، دار الساعات المعاصرة' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: brandTitle,
      description: brandDescription,
      images: [socialImage],
    },
    icons: {
      icon: [{ url: brandIcon, type: 'image/svg+xml' }],
      shortcut: brandIcon,
      apple: [{ url: brandIcon, type: 'image/svg+xml' }],
    },
  }
}

import { CartProvider } from "@/components/CartProvider";
import { CheckoutProvider } from "@/components/CheckoutProvider";
import { CartAnimationProvider } from "@/components/CartAnimationProvider";
import { ToastProvider } from "@/components/ToastProvider";
import { ConfirmProvider } from "@/components/ConfirmProvider";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import AnnouncementBar from "@/components/AnnouncementBar";
import VisitorTracker from "@/components/VisitorTracker";
import SplashScreen from "@/components/SplashScreen";
import MobileBottomNav from "@/components/MobileBottomNav";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = await getStoreConfig()
  let currency = "ر.س"
  try {
    const paymentSettings = await prisma.paymentSettings.findUnique({
      where: { id: 'singleton' },
      select: { currency: true }
    })
    if (paymentSettings?.currency) {
      currency = paymentSettings.currency
    }
  } catch {}

  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-surface text-foreground overflow-x-hidden pb-16 md:pb-0">
        <SplashScreen storeName={store.name} storeNameLatin={store.nameLatin} />
        <VisitorTracker />
        <CurrencyProvider currency={currency}>
          <ToastProvider>
            <ConfirmProvider>
              <CartAnimationProvider>
                <CheckoutProvider>
                  <CartProvider>
                    <FavoritesProvider>
                      <AnnouncementBar />
                      {children}
                      <MobileBottomNav />

                    </FavoritesProvider>
                  </CartProvider>
                </CheckoutProvider>
              </CartAnimationProvider>
            </ConfirmProvider>
          </ToastProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
