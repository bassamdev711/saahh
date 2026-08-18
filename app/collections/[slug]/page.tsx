import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CollectionQuickActions from '@/components/CollectionQuickActions'
import prisma from '@/lib/prisma'
import { getCurrency } from '@/lib/currency'
import { getStoreConfig } from '@/lib/store-config'

export const dynamic = 'force-dynamic'

async function getCollection(slug: string) {
  return prisma.collection.findUnique({
    where: { slug },
    select: { id: true, name: true, slug: true, description: true, imageUrl: true },
  })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params
    const [collection, store] = await Promise.all([getCollection(decodeURIComponent(slug)), getStoreConfig()])
    if (!collection) return { title: 'التصنيف غير موجود | أورڤِن' }
    return {
      title: `${collection.name} | ${store.name}`,
      description: collection.description || `استكشف مجموعة ${collection.name} من ${store.name}.`,
    }
  } catch {
    return { title: 'تصنيف ORVÉN | أورڤِن' }
  }
}

type CollectionProduct = {
  id: string
  slug: string
  name: string
  brand: string | null
  price: unknown
  compareAtPrice: unknown
  imageUrl: string | null
  stock: number
  featured: boolean
}

type CollectionLink = { name: string; slug: string; imageUrl: string | null }

function formatPrice(value: unknown, currency: string) {
  const amount = Number(value)
  return Number.isFinite(amount) ? `${amount.toLocaleString('ar-SA')} ${currency}` : `— ${currency}`
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  let collection: Awaited<ReturnType<typeof getCollection>> = null

  try {
    collection = await getCollection(decodedSlug)
  } catch (error) {
    console.error('ORVÉN collection query failed:', error)
    notFound()
  }
  if (!collection) notFound()

  let currency = 'ر.ي'
  try {
    currency = await getCurrency()
  } catch {}

  let products: CollectionProduct[] = []
  try {
    products = await prisma.product.findMany({
      where: { isActive: true, stock: { gt: 0 }, collectionId: collection.id },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        slug: true,
        name: true,
        brand: true,
        price: true,
        compareAtPrice: true,
        imageUrl: true,
        stock: true,
        featured: true,
      },
    })
  } catch (error) {
    console.error('ORVÉN collection products query failed:', error)
  }

  let collectionLinks: CollectionLink[] = []
  try {
    collectionLinks = await prisma.collection.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      select: { name: true, slug: true, imageUrl: true },
    })
  } catch (error) {
    console.error('ORVÉN collection links query failed:', error)
  }

  return (
    <main className="min-h-screen bg-brand text-surface" dir="rtl">
      <Navbar />

      <section className="relative overflow-hidden border-b border-accent/20 bg-brand px-4 pb-14 pt-28 md:px-10 md:pb-20 md:pt-36">
        {collection.imageUrl ? <img src={collection.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale" /> : null}
        <div className="absolute inset-0 bg-gradient-to-l from-brand via-brand/95 to-brand/80" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(183,154,99,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(183,154,99,.12)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 flex items-center gap-3 text-[10px] tracking-[0.25em] text-surface/45">
            <Link href="/products" className="transition-colors hover:text-accent">ORVÉN / ARCHIVE</Link>
            <span className="text-accent">/</span>
            <span className="text-accent">{collection.slug.toUpperCase()}</span>
          </div>
          <div className="grid items-end gap-8 md:grid-cols-[1fr_300px] md:gap-20">
            <div>
              <p className="mb-5 font-mono text-[10px] tracking-[0.32em] text-accent">COLLECTION / {collection.slug.toUpperCase()}</p>
              <h1 className="text-5xl font-black leading-none md:text-8xl">{collection.name}</h1>
              <p className="mt-7 max-w-2xl text-sm leading-8 text-surface/60 md:text-base">{collection.description || 'مجموعة من ساعات ORVÉN صيغت بتفاصيل دقيقة وحضور لا يبهت.'}</p>
            </div>
            <div className="border-r border-accent/30 pr-7">
              <p className="font-mono text-[10px] tracking-[0.25em] text-accent">THE ROOM</p>
              <p className="mt-5 font-serif text-5xl text-surface">{products.length}</p>
              <p className="mt-2 text-xs text-surface/45">قطع معروضة في هذه القاعة</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-accent/20 bg-[#171b1d] px-4 py-5 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto pb-1">
          <Link href="/products" className="shrink-0 border border-surface/20 px-4 py-2 text-[10px] tracking-widest text-surface/65 transition-colors hover:border-accent hover:text-accent">كل القاعات</Link>
          {collectionLinks.map((link) => (
            <Link key={link.slug} href={`/collections/${link.slug}`} className={`shrink-0 border px-4 py-2 text-[10px] tracking-widest transition-colors ${link.slug === collection.slug ? 'border-accent bg-accent text-brand' : 'border-surface/15 text-surface/60 hover:border-accent hover:text-accent'}`}>
              {link.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-surface px-4 py-14 text-foreground md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between border-b border-foreground/15 pb-6">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-accent">THE EXHIBITION / {collection.slug.toUpperCase()}</p>
              <h2 className="mt-3 text-3xl font-black md:text-5xl">قطع القاعة</h2>
            </div>
            <p className="font-mono text-[10px] tracking-widest text-foreground/40">{products.length} OBJECTS</p>
          </div>

          {products.length === 0 ? (
            <div className="py-20 text-center text-foreground/55">لا توجد قطع متاحة في هذه القاعة حاليًا.</div>
          ) : (
            <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 md:gap-x-7 md:gap-y-16">
              {products.map((product, index) => (
                <article key={product.id} className="group relative">
                  <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10" aria-label={`عرض ${product.name}`} />
                  <div className="relative aspect-[4/5] overflow-hidden border border-foreground/10 bg-[#e4e0d7]">
                    <div className="absolute inset-3 z-10 border border-accent/20" />
                    <span className="absolute right-5 top-5 z-10 font-mono text-[9px] tracking-[0.2em] text-foreground/45">{String(index + 1).padStart(2, '0')} / {collection.slug.toUpperCase()}</span>
                    {product.imageUrl ? <img src={product.imageUrl} alt={product.name} loading={index < 4 ? 'eager' : 'lazy'} className="h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-105" /> : <div className="watch-dial absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full" />}
                    <span className="absolute bottom-5 left-5 z-10 border border-brand/25 bg-surface/85 px-2 py-1 font-mono text-[8px] tracking-widest text-brand backdrop-blur-sm">{product.featured ? 'CURATOR’S CHOICE' : 'TIMEPIECE'}</span>
                  </div>
                  <div className="pt-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[9px] tracking-[0.2em] text-accent">{product.brand || 'ORVÉN'}</p>
                        <h3 className="mt-2 text-lg font-bold leading-snug">{product.name}</h3>
                      </div>
                      <p className="shrink-0 text-sm font-semibold text-brand">{formatPrice(product.price, currency)}</p>
                    </div>
                    <CollectionQuickActions product={{ id: product.id, name: product.name, slug: product.slug, price: Number(product.price), imageUrl: product.imageUrl || '', stock: product.stock }} />
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
