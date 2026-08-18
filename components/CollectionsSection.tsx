import prisma from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpLeft } from 'lucide-react'

type CollectionCard = {
  id: string
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
}

export const revalidate = 3600

export default async function CollectionsSection({ brandName = 'أورڤِن' }: { brandName?: string }) {
  let collections: CollectionCard[] = []
  try {
    collections = await prisma.collection.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' }, take: 4 })
  } catch (error) {
    console.error('Failed to load collections:', error)
  }

  if (collections.length === 0) return null

  return (
    <section className="relative py-20 md:py-28 bg-surface overflow-hidden" dir="rtl">
      <div className="absolute top-0 left-0 w-48 h-48 border-l border-t border-accent/20" />
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-5">
          <div>
            <span className="editorial-rule text-accent tracking-[0.3em] uppercase text-[10px] font-bold mb-5">أطياف الوقت / {brandName}</span>
            <h2 className="font-display text-4xl md:text-6xl text-foreground leading-tight">اختر إيقاعك</h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-3 text-brand font-bold text-sm border-b border-brand/30 hover:border-brand transition-colors pb-2">استكشف الدار <ArrowLeft size={16} /></Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {collections.map((collection, index) => (
            <Link key={collection.id} href={`/products?collection=${collection.slug}`} className={`group relative h-[270px] md:h-[470px] overflow-hidden bg-brand border border-foreground/10 ${index === 0 ? 'md:col-span-5' : index === 1 ? 'md:col-span-3 md:mt-12' : index === 2 ? 'md:col-span-4' : 'md:col-span-4 md:-mt-8'}`}>
              {collection.imageUrl ? <Image src={collection.imageUrl} alt={collection.name} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(183,154,99,.35),transparent_30%),linear-gradient(135deg,#111417,#344044)]" />}
              <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/25 to-transparent" />
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-[9px] font-mono tracking-[0.25em] text-surface/65"><span>0{index + 1} / COLLECTION</span><ArrowUpLeft size={15} className="text-accent transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1" /></div>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <h3 className="text-xl md:text-2xl font-bold text-surface mb-2 transition-transform duration-500 group-hover:-translate-y-1">{collection.name}</h3>
                {collection.description && <p className="text-surface/65 text-sm line-clamp-2 max-w-sm opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">{collection.description}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
