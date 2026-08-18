'use client'

import { startTransition, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X, Loader2, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCurrency } from '@/components/CurrencyProvider'

type SearchProduct = {
  id: string
  slug: string
  name: string
  imageUrl: string | null
  price: number
  compareAtPrice: number | null
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const currency = useCurrency()

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      startTransition(() => {
        setQuery('')
        setResults([])
      })
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.products || [])
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchResults, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-[#07090a]/75 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed left-0 right-0 top-0 z-[101] overflow-hidden rounded-b-3xl border-b-2 border-accent/60 bg-[#f4f1ea] text-foreground shadow-[0_24px_70px_rgba(0,0,0,0.38)]"
            dir="rtl"
          >
            <div className="max-w-4xl mx-auto p-3 md:p-8">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center mb-4 md:mb-8">
                <Search className="absolute right-4 h-6 w-6 text-brand md:right-5" strokeWidth={2} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث عن ساعة، خامة، مقاس، أو إصدار..."
                  className="w-full border-2 border-brand/70 bg-[#fffdf8] py-3 pl-12 pr-12 text-base font-medium text-foreground shadow-[0_8px_24px_rgba(17,20,23,0.08)] outline-none placeholder:text-foreground/55 focus:border-accent focus:ring-2 focus:ring-accent/25 md:py-4 md:pl-14 md:pr-14 md:text-lg"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute left-3 rounded-full border border-brand/15 bg-brand/10 p-2 transition-colors hover:bg-accent/20 md:left-4"
                >
                  <X className="h-5 w-5 text-brand" strokeWidth={2} />
                </button>
              </form>

              <div className="min-h-[200px] max-h-[60vh] overflow-y-auto">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-40 text-brand">
                    <Loader2 className="w-8 h-8 animate-spin mb-4" />
                    <p className="text-sm font-bold animate-pulse">جاري البحث...</p>
                  </div>
                ) : query && results.length > 0 ? (
                  <div>
                    <h3 className="mb-4 px-2 text-sm font-bold text-brand">النتائج السريعة</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          onClick={onClose}
                          className="group flex items-center gap-3 rounded-xl border border-black/10 bg-[#ebe7de] p-2 transition-colors hover:border-accent/60 hover:bg-white md:p-3"
                        >
                          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-brand/15 bg-white md:h-16 md:w-16">
                            {product.imageUrl ? (
                              <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                              <span className="text-accent font-mono text-[9px] tracking-widest">ORVÉN</span>
                            )}
                          </div>
                          <div className="flex-grow">
                            <h4 className="line-clamp-1 text-sm font-bold text-foreground">{product.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-bold text-brand">{Number(product.price).toLocaleString('ar-SA')} {currency}</span>
                              {product.compareAtPrice && (
                                <span className="text-xs text-foreground/50 line-through">
                                  {Number(product.compareAtPrice).toLocaleString('ar-SA')} {currency}
                                </span>
                              )}
                            </div>
                          </div>
                          <ArrowLeft className="h-4 w-4 shrink-0 text-brand/60 transition-colors group-hover:text-brand" />
                        </Link>
                      ))}
                    </div>
                    {results.length === 8 && (
                      <div className="mt-6 text-center">
                        <button type="submit" onClick={handleSearchSubmit} className="text-brand font-bold hover:underline inline-flex items-center gap-1">
                          عرض جميع النتائج لـ &quot;{query}&quot; <ArrowLeft className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : query && results.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-center px-4">
                    <p className="mb-2 text-lg font-bold text-foreground">لم نجد نتائج مطابقة لـ &quot;{query}&quot;</p>
                    <p className="text-sm text-foreground/75">جرّب اسم خامة، مقاس، أو تصفح مجموعات الساعات.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-8 px-2 sm:grid-cols-2">
                    <div>
                      <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-brand">
                        <Search className="w-4 h-4" />
                        عمليات بحث شائعة
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {['ساعة أوتوماتيك', '316L ستيل', 'إصدارات محدودة', 'مقاس 40 MM', 'هدايا الوقت'].map((term) => (
                          <button 
                            key={term}
                            onClick={() => setQuery(term)}
                            className="rounded-full border border-brand/20 bg-[#e8e2d7] px-4 py-2 text-sm font-bold text-brand transition-colors hover:border-brand hover:bg-brand hover:text-white"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
