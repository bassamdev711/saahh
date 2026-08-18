import TestimonialsClient from './TestimonialsClient'
import prisma from '@/lib/prisma'

export default async function ProductReviews({ productId }: { productId: string }) {
  let reviews: Array<{ id: string; name: string; city: string | null; content: string; rating: number }> = []

  try {
    reviews = await prisma.review.findMany({
      where: {
        status: 'APPROVED',
        productId,
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: {
        id: true,
        name: true,
        city: true,
        content: true,
        rating: true,
      },
    })
  } catch (error) {
    console.error('ORVÉN product reviews query failed:', error)
  }

  return (
    <TestimonialsClient
      reviews={reviews}
      title="مراجعات المنتج"
      subtitle="ماذا يقول عملاؤنا عن هذه القطعة؟"
      productId={productId}
    />
  )
}
