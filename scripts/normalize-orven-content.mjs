import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const legacyTitle = /متجرك|your store|ساهه|SAHHH|أثر|ATHAR|عطر|عطور|perfume|fragrance/i

try {
  const current = await prisma.homepageSettings.findUnique({
    where: { id: 'singleton' },
    select: { heroTitle: true },
  })

  if (!current || !current.heroTitle || legacyTitle.test(current.heroTitle)) {
    await prisma.homepageSettings.upsert({
      where: { id: 'singleton' },
      update: {
        heroTitle: 'ORVÉN',
        heroSubtitle: 'الوقت، بصيغة أندر.',
        heroDescription: 'ليست ساعةً تقيس الزمن، بل قطعةٌ تحفظ ما لا نريد نسيانه.',
      },
      create: {
        id: 'singleton',
        heroTitle: 'ORVÉN',
        heroSubtitle: 'الوقت، بصيغة أندر.',
        heroDescription: 'ليست ساعةً تقيس الزمن، بل قطعةٌ تحفظ ما لا نريد نسيانه.',
      },
    })
    console.log('Normalized homepage identity to ORVÉN')
  } else {
    console.log(`Homepage identity already configured: ${current.heroTitle}`)
  }
} finally {
  await prisma.$disconnect()
}
