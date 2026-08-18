import type { Metadata } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { getCurrency } from '@/lib/currency'
import { getStoreConfig } from '@/lib/store-config'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const store = await getStoreConfig()
    return {
      title: `الساعات | ${store.name}`,
      description: `اكتشف مختارات الساعات من ${store.name} — دقة، خامة، وحضور يدوم.`,
    }
  } catch {
    return {
      title: 'الساعات | أورڤِن',
      description: 'ORVÉN — دار الساعات المعاصرة.',
    }
  }
}

type ProductRow = {
  id: string
  slug: string
  name: string
  brand: string | null
  price: unknown
  compareAtPrice: unknown
  imageUrl: string | null
  featured: boolean
}

type CollectionRow = {
  name: string
  slug: string
  imageUrl: string | null
}

function formatPrice(value: unknown, currency: string) {
  const amount = Number(value)
  return Number.isFinite(amount) ? `${amount.toLocaleString('ar-SA')} ${currency}` : `— ${currency}`
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string }>
}) {
  let collectionSlug: string | undefined
  try {
    collectionSlug = (await searchParams)?.collection
  } catch {
    collectionSlug = undefined
  }

  let currency = 'ر.ي'
  try {
    currency = await getCurrency()
  } catch {
    currency = 'ر.ي'
  }

  let products: ProductRow[] = []
  let collections: CollectionRow[] = []
  let dataError = false

  try {
    products = await prisma.product.findMany({
      where: {
        isActive: true,
        stock: { gt: 0 },
        ...(collectionSlug ? { collection: { slug: collectionSlug } } : {}),
      },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        slug: true,
        name: true,
        brand: true,
        price: true,
        compareAtPrice: true,
        imageUrl: true,
        featured: true,
      },
    })
  } catch (error) {
    console.error('ORVÉN products query failed:', error)
    dataError = true
  }

  try {
    collections = await prisma.collection.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      select: { name: true, slug: true, imageUrl: true },
    })
  } catch (error) {
    console.error('ORVÉN collections query failed:', error)
  }

  return (
    <main className="min-h-screen bg-surface text-foreground font-sans" dir="rtl">
      <header className="sticky top-0 z-50 border-b border-accent/20 bg-brand/95 text-surface backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-10">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-mono text-lg tracking-[0.2em] text-accent">ORVÉN</span>
            <span className="text-sm tracking-[0.18em] text-surface">أورڤِن</span>
          </Link>
          <nav className="flex items-center gap-4 text-xs text-surface/75 md:gap-8 md:text-sm">
            <Link href="/" className="transition-colors hover:text-accent">الرئيسية</Link>
            <Link href="/cart" className="transition-colors hover:text-accent">السلة</Link>
            <Link href="/track" className="transition-colors hover:text-accent">تتبع الطلب</Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-foreground/10 bg-[#ebe7de] px-4 py-12 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-mono text-[10px] tracking-[0.3em] text-accent">ORVÉN / CATALOGUE 01</p>
          <h1 className="text-4xl font-black tracking-tight md:text-7xl">الساعات</h1>
          <p className="mt-4 max-w-xl text-sm leading-8 text-foreground/60 md:text-base">
            مجموعة من القطع الميكانيكية المعاصرة؛ صممت لتُقرأ كأعمال هادئة على المعصم.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-10">
        <div className="flex gap-3 overflow-x-auto pb-3">
          <Link href="/products" className={`shrink-0 border px-4 py-2 text-xs transition-colors ${!collectionSlug ? 'border-brand bg-brand text-surface' : 'border-foreground/20 hover:border-brand'}`}>
            الكل
          </Link>
          {collections.map((collection) => (
            <Link key={collection.slug} href={`/products?collection=${collection.slug}`} className={`shrink-0 border px-4 py-2 text-xs transition-colors ${collectionSlug === collection.slug ? 'border-brand bg-brand text-surface' : 'border-foreground/20 hover:border-brand'}`}>
              {collection.name}
            </Link>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-10">
        {dataError ? (
          <div className="border border-accent/30 bg-brand px-6 py-16 text-center text-surface">
            <p className="font-mono text-xs tracking-[0.2em] text-accent">ORVÉN / DATABASE</p>
            <h2 className="mt-4 text-2xl font-bold">تعذر الاتصال بالكتالوج مؤقتًا</h2>
            <p className="mt-3 text-sm text-surface/70">قاعدة البيانات لم تُرجع السجلات. أعد تحميل الصفحة بعد لحظات.</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center text-foreground/60">لا توجد منتجات في هذه المجموعة حاليًا.</div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {products.map((product, index) => (
              <article key={product.id} className="group relative flex min-h-[430px] flex-col overflow-hidden border border-foreground/10 bg-[#f4f1ea] transition-transform duration-500 hover:-translate-y-1">
                <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10" aria-label={`عرض ${product.name}`} />
                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_42%,#ffffff,#d9d5ca)]">
                  <span className="absolute left-4 top-4 z-20 font-mono text-[9px] tracking-[0.2em] text-foreground/40">OBJECT / {String(index + 1).padStart(2, '0')}</span>
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} loading={index < 4 ? 'eager' : 'lazy'} className="h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="watch-dial relative h-32 w-32 rounded-full"><span className="watch-hand absolute left-1/2 top-1/2 h-[2px] w-[34%] origin-left rotate-[28deg]" /></div>
                  )}
                </div>
                <div className="relative z-20 flex flex-1 flex-col items-center justify-center border-t border-foreground/10 p-5 text-center">
                  <p className="mb-2 font-mono text-[9px] tracking-[0.22em] text-accent">{product.brand || 'ORVÉN'}</p>
                  <h2 className="text-lg font-bold">{product.name}</h2>
                  <p className="mt-3 text-sm font-semibold text-brand">{formatPrice(product.price, currency)}</p>
                  {product.compareAtPrice ? <p className="mt-1 text-xs text-foreground/40 line-through">{formatPrice(product.compareAtPrice, currency)}</p> : null}
                  <span className="mt-4 border border-brand px-4 py-2 text-[11px] font-bold text-brand">استكشف القطعة</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-accent/20 bg-brand px-4 py-10 text-center text-surface md:px-10">
        <p className="font-mono text-sm tracking-[0.25em] text-accent">ORVÉN</p>
        <p className="mt-3 text-xs text-surface/60">الوقت، بصيغة أندر.</p>
      </footer>
    </main>
  )
}
