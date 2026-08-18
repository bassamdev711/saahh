import { execFileSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting ORVÉN database seed...')

  await prisma.storeSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      storeName: process.env.STORE_NAME?.trim() || 'أورڤِن',
      storeNameLatin: process.env.STORE_NAME_LATIN?.trim() || 'ORVÉN',
      storeTagline: process.env.STORE_TAGLINE?.trim() || 'الوقت، بصيغة أندر.',
      storeDescription: process.env.STORE_DESCRIPTION?.trim() || 'دار ساعات معاصرة تصنع قطعًا نادرة، تجمع بين دقة الحركة وهدوء الحضور.',
      locale: process.env.STORE_LOCALE?.trim() || 'ar',
      currencyCode: process.env.STORE_CURRENCY?.trim().toUpperCase() || 'USD',
      storeUrl: process.env.STORE_URL?.trim() || null,
      seoSearchPhrases: ['ORVÉN', 'أورڤِن', 'ساعات فاخرة', 'ساعات أوتوماتيك'],
    },
  })

  const shippingCityCount = await prisma.shippingCity.count()
  if (shippingCityCount === 0) {
    await prisma.shippingCity.create({
      data: { name: 'إب', shippingFee: 0, isActive: true },
    })
    console.log('Created default shipping city: إب')
  }

  if (process.env.SEED_DEMO_DATA === 'true') {
    execFileSync('node', ['scripts/seed-demo.mjs'], { stdio: 'inherit', env: process.env })
  } else {
    console.log('Demo catalog skipped. Set SEED_DEMO_DATA=true to add 10 categories and 100 watches.')
  }

  console.log('ORVÉN database seed finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
