import { cache } from 'react'
import prisma from '@/lib/prisma'

export type StoreConfig = {
  name: string
  nameLatin: string
  tagline: string
  description: string
  logoUrl: string | null
  faviconUrl: string | null
  ogImageUrl: string | null
  storeUrl: string | null
  locale: string
  currencyCode: string
}

export const DEFAULT_STORE_CONFIG: StoreConfig = {
  name: 'ساهه',
  nameLatin: 'SAHHH',
  tagline: 'ساعات مختارة لمن يقدّر التفاصيل الهادئة.',
  description: 'اكتشف مجموعة مختارة من الساعات المصممة حول الدقة، الخامة، والحضور الذي يزداد قيمة مع الوقت.',
  logoUrl: null,
  faviconUrl: null,
  ogImageUrl: null,
  storeUrl: null,
  locale: 'ar',
  currencyCode: 'USD',
}

type StoreSettingsRecord = {
  storeName: string | null
  storeNameLatin: string | null
  storeTagline: string | null
  storeDescription: string | null
  logoUrl: string | null
  faviconUrl: string | null
  ogImageUrl: string | null
  storeUrl: string | null
  locale: string
  currencyCode: string
}

function normalizeStoreConfig(settings: StoreSettingsRecord | null | undefined): StoreConfig {
  const legacyIdentity = [settings?.storeName, settings?.storeNameLatin, settings?.storeTagline, settings?.storeDescription]
    .filter(Boolean)
    .join(' ')
    .match(/your store|متجرك|طيف|عطر|عطور|perfume|fragrance/i)
  const useWatchIdentity = Boolean(legacyIdentity)

  return {
    ...DEFAULT_STORE_CONFIG,
    name: useWatchIdentity ? DEFAULT_STORE_CONFIG.name : (settings?.storeName?.trim() || DEFAULT_STORE_CONFIG.name),
    nameLatin: useWatchIdentity ? DEFAULT_STORE_CONFIG.nameLatin : (settings?.storeNameLatin?.trim() || DEFAULT_STORE_CONFIG.nameLatin),
    tagline: useWatchIdentity ? DEFAULT_STORE_CONFIG.tagline : (settings?.storeTagline?.trim() || DEFAULT_STORE_CONFIG.tagline),
    description: useWatchIdentity ? DEFAULT_STORE_CONFIG.description : (settings?.storeDescription?.trim() || DEFAULT_STORE_CONFIG.description),
    logoUrl: settings?.logoUrl || null,
    faviconUrl: settings?.faviconUrl || null,
    ogImageUrl: settings?.ogImageUrl || null,
    storeUrl: settings?.storeUrl || null,
    locale: settings?.locale || DEFAULT_STORE_CONFIG.locale,
    currencyCode: settings?.currencyCode || DEFAULT_STORE_CONFIG.currencyCode,
  }
}

export const getStoreConfig = cache(async (): Promise<StoreConfig> => {
  try {
    const settings = await prisma.storeSettings.findUnique({
      where: { id: 'singleton' },
      select: {
        storeName: true,
        storeNameLatin: true,
        storeTagline: true,
        storeDescription: true,
        logoUrl: true,
        faviconUrl: true,
        ogImageUrl: true,
        storeUrl: true,
        locale: true,
        currencyCode: true,
      },
    })

    return normalizeStoreConfig(settings)
  } catch {
    return DEFAULT_STORE_CONFIG
  }
})

export function getSiteUrl(storeUrl?: string | null): URL {
  const candidate = storeUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://example-store.vercel.app'
  try {
    return new URL(candidate)
  } catch {
    return new URL('https://example-store.vercel.app')
  }
}
