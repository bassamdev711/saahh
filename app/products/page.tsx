import type { Metadata } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
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
    return { title: 'الساعات | أورڤِن', description: 'ORVÉN — دار الساعات المعاصرة.' }
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

  const collectionIndex = new Map(collections.map((collection, index) => [collection.slug, index + 1]))

  return (
    <main className="min-h-screen bg-brand text-surface" dir="rtl">
      <Navbar />

      <section className="relative overflow-hidden border-b border-accent/20 bg-brand px-4 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(183,154,99,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(183,154,99,.12)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-end gap-10 md:grid-cols-[1fr_280px] md:gap-20">
          <div>
            <div className="mb-8 flex items-center gap-4 font-mono text-[10px] tracking-[0.32em] text-accent">
              <span className="h-px w-12 bg-accent/70" />
              <span>ORVÉN / ARCHIVE 01</span>
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight text-surface md:text-8xl">
              كتالوج<br /><span className="font-light text-accent">الزمن</span>
            </h1>
            <p className="mt-8 max-w-xl text-sm leading-8 text-surface/55 md:text-base">
              مجموعة منتقاة من القطع الميكانيكية المعاصرة؛ كل ساعة هنا فصل مستقل من هندسة هادئة، صيغت لتُقرأ كعمل فني على المعصم.
            </p>
          </div>
          <div className="hidden border-r border-accent/30 pr-8 md:block">
            <p className="font-mono text-[10px] tracking-[0.25em] text-accent">THE ORVÉN ARCHIVE</p>
            <div className="my-6 h-px w-full bg-accent/20" />
            <p className="font-serif text-5xl text-surface">{products.length || '—'}</p>
            <p className="mt-2 text-xs tracking-widest text-surface/45">قطعة في المعرض</p>
            <p className="mt-8 font-mono text-[9px] leading-6 tracking-widest text-surface/40">AUTOMATIC MOVEMENT<br />316L STEEL / SAPPHIRE GLASS</p>
          </div>
        </div>
      </section>

      <section className="border-b border-accent/20 bg-[#171b1d] px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-accent">01 / COLLECTIONS</p>
              <h2 className="mt-3 text-2xl font-bold text-surface md:text-4xl">قاعات المجموعة</h2>
            </div>
            <p className="hidden max-w-xs text-left text-xs leading-6 text-surface/40 md:block">اختر قاعة لاستكشاف لغة مختلفة من لغات ORVÉN.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
            <Link href="/products" className={`group relative min-h-[150px] overflow-hidden border p-4 transition-all duration-500 md:min-h-[190px] ${!collectionSlug ? 'border-accent bg-accent text-brand' : 'border-surface/15 bg-brand hover:border-accent/70'}`}>
              <span className="absolute left-4 top-4 font-mono text-[9px] tracking-widest opacity-60">00</span>
              <span className="absolute bottom-4 right-4 text-lg font-bold">المعرض الكامل</span>
              <span className="absolute bottom-4 left-4 text-[9px] tracking-widest opacity-60">VIEW ALL</span>
            </Link>
            {collections.map((collection) => {
              const number = String(collectionIndex.get(collection.slug) || 0).padStart(2, '0')
              const active = collectionSlug === collection.slug
              return (
                <Link key={collection.slug} href={`/products?collection=${collection.slug}`} className={`group relative min-h-[150px] overflow-hidden border p-4 transition-all duration-500 md:min-h-[190px] ${active ? 'border-accent' : 'border-surface/15 hover:border-accent/70'}`}>
                  {collection.imageUrl ? <img src={collection.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-50 group-hover:grayscale-0" /> : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/50 to-transparent" />
                  <span className="relative z-10 font-mono text-[9px] tracking-widest text-accent">{number}</span>
                  <span className="absolute bottom-4 right-4 z-10 text-base font-bold text-surface">{collection.name}</span>
                  <span className="absolute bottom-4 left-4 z-10 font-mono text-[8px] tracking-widest text-surface/45">{collection.slug.toUpperCase()}</span>
                  {active ? <span className="absolute right-4 top-4 z-10 h-2 w-2 rounded-full bg-accent" /> : null}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface px-4 py-16 text-foreground md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between border-b border-foreground/15 pb-6">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-accent">02 / THE EXHIBITION</p>
              <h2 className="mt-3 text-3xl font-black md:text-5xl">الأعمال المعروضة</h2>
            </div>
            <p className="font-mono text-[10px] tracking-widest text-foreground/40">{products.length} OBJECTS</p>
          </div>

          {dataError ? (
            <div className="border border-accent/30 bg-brand px-6 py-16 text-center text-surface">
              <p className="font-mono text-xs tracking-[0.2em] text-accent">ORVÉN / DATABASE</p>
              <h2 className="mt-4 text-2xl font-bold">تعذر الاتصال بالكتالوج مؤقتًا</h2>
              <p className="mt-3 text-sm text-surface/70">قاعدة البيانات لم تُرجع السجلات. أعد تحميل الصفحة بعد لحظات.</p>
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center text-foreground/60">لا توجد منتجات في هذه القاعة حاليًا.</div>
          ) : (
            <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 md:gap-x-7 md:gap-y-14">
              {products.map((product, index) => (
                <article key={product.id} className="group relative">
                  <Link href={`/products/${product.slug}`} className="absolute inset-0 z-20" aria-label={`عرض ${product.name}`} />
                  <div className="relative aspect-[4/5] overflow-hidden border border-foreground/10 bg-[#e4e0d7]">
                    <div className="absolute inset-3 z-10 border border-accent/20" />
                    <span className="absolute right-5 top-5 z-10 font-mono text-[9px] tracking-[0.2em] text-foreground/45">{String(index + 1).padStart(2, '0')} / ORVÉN</span>
                    {product.imageUrl ? <img src={product.imageUrl} alt={product.name} loading={index < 4 ? 'eager' : 'lazy'} className="h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-105" /> : <div className="watch-dial absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full" />}
                    <span className="absolute bottom-5 left-5 z-10 border border-brand/25 bg-surface/80 px-2 py-1 font-mono text-[8px] tracking-widest text-brand backdrop-blur-sm">{product.featured ? 'CURATOR’S CHOICE' : 'TIMEPIECE'}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4 pt-4">
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.2em] text-accent">{product.brand || 'ORVÉN'}</p>
                      <h3 className="mt-2 text-lg font-bold leading-snug">{product.name}</h3>
                      <p className="mt-2 text-xs text-foreground/45">ساعة ميكانيكية / إصدار ORVÉN</p>
                    </div>
                    <div className="shrink-0 text-left">
                      <p className="text-sm font-semibold text-brand">{formatPrice(product.price, currency)}</p>
                      {product.compareAtPrice ? <p className="mt-1 text-[10px] text-foreground/35 line-through">{formatPrice(product.compareAtPrice, currency)}</p> : null}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 border-t border-foreground/10 pt-3 text-[9px] font-mono tracking-[0.15em] text-foreground/45">
                    <span>DETAILS</span><span className="h-px flex-1 bg-foreground/10 transition-colors group-hover:bg-accent/60" /><span>→</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
