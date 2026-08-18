import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const watchImages = [
  'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1526045431048-f857369baa09?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1518544801976-3e18e8e6f36c?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1609587312208-cea54be969e7?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1585123334904-845d60e5d8f9?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1533055640609-24b498cdfd55?auto=format&fit=crop&w=1200&q=85',
]

const categories = [
  { name: 'الأتولييه', slug: 'atelier', prefix: 'Atelier', desc: 'ساعات كلاسيكية هادئة، صيغت لتعيش أبعد من الموسم.' },
  { name: 'نُكتورن', slug: 'nocturne', prefix: 'Nocturne', desc: 'أقراص داكنة وحضور ليلي لمن يفضل التفاصيل العميقة.' },
  { name: 'ميريديان', slug: 'meridian', prefix: 'Meridian', desc: 'ساعات سفر دقيقة تجمع بين قراءة الوقت وأناقة الحركة.' },
  { name: 'فورم', slug: 'forme', prefix: 'Forme', desc: 'بساطة معمارية، خطوط صافية، ونسب محسوبة على المعصم.' },
  { name: 'كرونوغراف', slug: 'chronograph', prefix: 'Chronograph', desc: 'تعقيد رياضي متزن لمحبي القياس والحركة الدقيقة.' },
  { name: 'هيريتج', slug: 'heritage', prefix: 'Heritage', desc: 'إشارات إلى ساعات الماضي بصياغة معاصرة ومواد صادقة.' },
  { name: 'مارين', slug: 'marine', prefix: 'Marine', desc: 'أداء يومي متين، جاهز للماء والرحلات الطويلة.' },
  { name: 'سكليتون', slug: 'skeleton', prefix: 'Skeleton', desc: 'حركة مكشوفة تكشف جمال الميكانيكا خلف القرص.' },
  { name: 'أوبسيديان', slug: 'obsidian', prefix: 'Obsidian', desc: 'قطع سوداء جريئة، تنتمي إلى الضوء المنخفض والمناسبات الخاصة.' },
  { name: 'إديشنز', slug: 'editions', prefix: 'Editions', desc: 'إصدارات محدودة مرقمة، صممت لهواة القطع النادرة.' },
]

const nameNotes = ['سكون', 'مدى', 'أفق', 'نبض', 'ظل', 'مسار', 'مدار', 'خط', 'نقطة', 'لحظة']
const sizes = ['36 MM', '38 MM', '40 MM', '41 MM', '42 MM']
const genders = ['للجنسين', 'رجالي', 'للجنسين', 'نسائي']
const materials = ['316L Stainless Steel', 'Brushed Steel', 'Polished Steel', 'Titanium Grade 2', 'Black PVD Steel']
const movements = ['Automatic', 'Automatic', 'Quartz Swiss', 'Automatic', 'Manual Wind']
const legacyDemoSlugs = [
  'summer-perfumes', 'winter-perfumes', 'french-perfumes', 'oud-oil', 'musk-amber',
  'niche-perfumes', 'gift-sets', 'hair-mists', 'home-fragrances', 'limited-editions',
]

function imageUrl(index) {
  return watchImages[index % watchImages.length]
}

function productData(category, categoryIndex, productIndex, collectionId) {
  const serial = String(productIndex + 1).padStart(2, '0')
  const price = 285 + (categoryIndex * 55) + (productIndex * 32)
  const compareAtPrice = productIndex % 4 === 0 ? price + 85 : null
  const firstImage = imageUrl(categoryIndex * 2 + productIndex)
  const secondImage = imageUrl(categoryIndex * 2 + productIndex + 10)
  const material = materials[(categoryIndex + productIndex) % materials.length]
  const movement = movements[(categoryIndex + productIndex) % movements.length]
  const size = sizes[(categoryIndex + productIndex) % sizes.length]
  const note = nameNotes[(categoryIndex + productIndex) % nameNotes.length]

  return {
    name: `${category.prefix} ${serial} / ${note}`,
    slug: `orven-${category.slug}-${serial}`,
    brand: 'ORVÉN',
    description: `${category.name} من ORVÉN؛ ساعة ${movement.toLowerCase()} بعلبة ${material.toLowerCase()} ومقاس ${size}. قطعة مصممة لحضور هادئ وتفاصيل تبقى واضحة مع الوقت.`,
    price,
    compareAtPrice,
    sku: `ORV-${String(categoryIndex + 1).padStart(2, '0')}-${serial}`,
    size,
    gender: genders[(categoryIndex + productIndex) % genders.length],
    category: category.name,
    collectionId,
    stock: 8 + ((categoryIndex * 7 + productIndex * 3) % 43),
    featured: productIndex < 2,
    bestseller: productIndex === 0 || (categoryIndex === 1 && productIndex === 1),
    isActive: true,
    imageUrl: firstImage,
    images: [firstImage, secondImage],
    seoSearchPhrases: [
      `${category.name} ORVÉN`,
      `ساعة ${category.name}`,
      `${material} watch`,
    ],
  }
}

async function removeLegacyDemoData() {
  if (process.env.CLEAN_LEGACY_DEMO !== 'true') return

  const legacyCollections = await prisma.collection.findMany({
    where: { slug: { in: legacyDemoSlugs } },
    select: { id: true },
  })
  const legacyIds = legacyCollections.map((item) => item.id)

  if (legacyIds.length) {
    await prisma.product.updateMany({ where: { collectionId: { in: legacyIds } }, data: { collectionId: null } })
    await prisma.product.deleteMany({ where: { collectionId: null, slug: { contains: '-product-' } } })
    await prisma.collection.deleteMany({ where: { id: { in: legacyIds } } })
    console.log(`Removed ${legacyIds.length} legacy demo collections.`)
  }
}

async function main() {
  console.log('Seeding ORVÉN demo catalog: 10 categories × 10 watches = 100 products')

  await prisma.storeSettings.upsert({
    where: { id: 'singleton' },
    update: { storeName: 'أورڤِن', storeNameLatin: 'ORVÉN', storeTagline: 'الوقت، بصيغة أندر.', storeDescription: 'دار ساعات معاصرة تصنع قطعًا نادرة، تجمع بين دقة الحركة وهدوء الحضور.' },
    create: {
      id: 'singleton',
      storeName: 'أورڤِن',
      storeNameLatin: 'ORVÉN',
      storeTagline: 'الوقت، بصيغة أندر.',
      storeDescription: 'دار ساعات معاصرة تصنع قطعًا نادرة، تجمع بين دقة الحركة وهدوء الحضور.',
      locale: 'ar',
      currencyCode: process.env.STORE_CURRENCY?.trim().toUpperCase() || 'USD',
      storeUrl: process.env.STORE_URL?.trim() || null,
      seoSearchPhrases: ['ORVÉN', 'أورڤِن', 'ساعات فاخرة', 'ساعات أوتوماتيك'],
    },
  })

  await removeLegacyDemoData()

  let productCount = 0
  for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex += 1) {
    const category = categories[categoryIndex]
    const collection = await prisma.collection.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.desc,
        imageUrl: imageUrl(categoryIndex),
        isActive: true,
        seoSearchPhrases: [category.name, `${category.prefix} watches`, 'ORVÉN'],
      },
      create: {
        name: category.name,
        slug: category.slug,
        description: category.desc,
        imageUrl: imageUrl(categoryIndex),
        isActive: true,
        seoSearchPhrases: [category.name, `${category.prefix} watches`, 'ORVÉN'],
      },
    })

    for (let productIndex = 0; productIndex < 10; productIndex += 1) {
      const product = productData(category, categoryIndex, productIndex, collection.id)
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: product,
        create: product,
      })
      productCount += 1
    }
    console.log(`✓ ${category.name}: 10 watches`)
  }

  console.log(`✓ ORVÉN catalog ready: ${categories.length} categories, ${productCount} products`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
