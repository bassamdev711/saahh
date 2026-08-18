'use client'

import { ShoppingBag, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCart } from './CartProvider'
import { useToast } from './ToastProvider'

type QuickProduct = {
  id: string
  name: string
  slug: string
  price: number
  imageUrl: string
  stock: number
}

export default function CollectionQuickActions({ product }: { product: QuickProduct }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const add = () => {
    if (product.stock <= 0) {
      showToast('error', 'نعتذر، هذه القطعة نفدت من المخزون.')
      return false
    }

    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      maxStock: product.stock,
    })
    return true
  }

  const handleAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (add()) showToast('success', 'تمت إضافة القطعة إلى السلة')
  }

  const handleBuy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (add()) router.push('/checkout')
  }

  return (
    <div className="relative z-30 mt-5 grid grid-cols-2 gap-2">
      <button type="button" onClick={handleAdd} className="flex h-11 items-center justify-center gap-2 border border-brand px-2 text-[10px] font-bold text-brand transition-colors hover:bg-brand hover:text-surface">
        <ShoppingBag size={14} strokeWidth={1.7} />
        <span>أضف للسلة</span>
      </button>
      <button type="button" onClick={handleBuy} className="flex h-11 items-center justify-center gap-2 bg-brand px-2 text-[10px] font-bold text-surface transition-colors hover:bg-accent hover:text-brand">
        <Zap size={14} strokeWidth={1.7} />
        <span>اشترِ الآن</span>
      </button>
    </div>
  )
}
