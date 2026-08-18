import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import { useCart } from './CartProvider';
import { useToast } from './ToastProvider';
import { getImageSizes } from '@/lib/image-utils';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice: number | null;
    imageUrl: string;
    engName?: string;
    brand?: string;
  };
  currency: string;
  priority?: boolean;
}

export default function ProductCard({ product, currency, priority = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id: product.id, name: product.name, slug: product.slug, price: product.price, imageUrl: product.imageUrl, quantity: 1, maxStock: 99 });
    showToast('success', 'تمت الإضافة إلى السلة بنجاح');
  };

  return (
    <div className="relative bg-[#e9e5dc] cursor-pointer group shadow-sm hover:shadow-[0_26px_60px_rgba(17,20,23,.16)] transition-all duration-700 border border-foreground/10 rounded-none flex flex-col overflow-hidden h-auto md:h-[520px]">
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 text-[8px] font-mono tracking-[0.22em] text-foreground/45 uppercase pointer-events-none"><span>OBJECT / ATHAR</span><span>01—12</span></div>
      <div className="relative w-full h-[210px] md:h-[62%] bg-[radial-gradient(circle_at_50%_42%,#ffffff,#d9d5ca)] transition-colors duration-700 group-hover:bg-[#ded9cc] flex items-center justify-center">
        <div className="absolute inset-4 border border-accent/20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-44 h-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10 transition-transform duration-700 group-hover:scale-125" />
        <FavoriteButton product={product} className="z-20 m-4 md:m-6" />
        <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10" />
        {product.imageUrl ? (
          <Image src={product.imageUrl} alt={product.name} fill sizes={getImageSizes('card')} priority={priority} loading={priority ? undefined : 'lazy'} className="object-contain p-8 transition-transform duration-700 ease-out z-0 group-hover:scale-105" />
        ) : (
          <div className="relative w-28 h-28 rounded-full watch-dial z-0"><span className="absolute inset-4 rounded-full border border-accent/30" /><span className="watch-hand h-[2px] w-[34%] rotate-[28deg]" /></div>
        )}
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-20"><span className="bg-brand text-accent px-2 py-1 font-mono text-[8px] tracking-widest">{product.compareAtPrice ? 'SPECIAL EDITION' : 'CURATED OBJECT'}</span><span className="text-[8px] font-mono tracking-widest text-foreground/45">40 MM</span></div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 text-center bg-[#f4f1ea] z-20 border-t border-foreground/10 relative">
        <span className="font-mono text-[9px] tracking-[0.24em] text-accent mb-2 uppercase">{product.engName || product.brand || 'TIMEPIECE'}</span>
        <h3 className="text-base md:text-2xl font-black text-foreground mb-1">{product.name}</h3>
        <div className="flex items-center gap-2 mb-4 md:mb-6"><p className="text-brand font-bold text-sm md:text-lg">{Number(product.price).toLocaleString('ar-SA')} {currency}</p>{product.compareAtPrice && <p className="text-foreground/40 line-through text-[10px] md:text-sm">{Number(product.compareAtPrice).toLocaleString('ar-SA')}</p>}</div>
        <button onClick={handleAddToCart} className="w-full max-w-full md:max-w-[200px] h-9 md:h-10 border border-brand text-brand hover:bg-brand hover:text-surface transition-colors rounded-none flex items-center justify-center gap-1.5 font-bold text-xs"><ShoppingBag size={13} className="md:w-4 md:h-4" />أضف للسلة</button>
      </div>
    </div>
  );
}
