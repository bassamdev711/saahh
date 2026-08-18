"use client";

import { motion } from "framer-motion";

type AboutData = {
  aboutTopTitle?: string | null
  aboutMainTitle?: string | null
  aboutQuote?: string | null
  aboutDescription?: string | null
}

export default function About({
  data = {},
  brandName = 'أورڤِن',
}: {
  data?: AboutData
  brandName?: string
}) {
  return (
    <section id="about" className="relative py-20 md:py-32 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div className="relative min-h-[560px] md:min-h-[620px] w-full overflow-hidden bg-brand shadow-2xl flex items-center justify-center">
          <div className="absolute inset-0 watch-grid opacity-25" />
          <div className="absolute -right-28 -top-28 w-96 h-96 rounded-full border border-accent/20" />
          <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full border border-accent/10" />
          <div className="absolute -left-24 -bottom-32 w-[30rem] h-[30rem] rounded-full border border-accent/15" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_35%,rgba(183,154,99,.16),transparent_34%),linear-gradient(120deg,rgba(17,20,23,.94),rgba(17,20,23,.72))]" />

          <div className="relative z-10 grid md:grid-cols-[.8fr_1.5fr_.8fr] gap-8 items-center w-full px-6 py-16 md:px-16" dir="rtl">
            <div className="hidden md:flex flex-col gap-5 text-[10px] font-mono tracking-[0.22em] text-surface/45 uppercase">
              <span>01 / CASE</span>
              <span>02 / MOVEMENT</span>
              <span>03 / LEGACY</span>
              <span className="w-16 h-px bg-accent" />
              <span>TIMEPIECE OBJECT</span>
            </div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="max-w-3xl text-center mx-auto">
              <span className="text-accent text-[10px] uppercase tracking-[0.42em] font-bold mb-6 block">{data.aboutTopTitle || `فلسفة ${brandName}`}</span>
              <h2 className="font-display text-5xl md:text-7xl text-surface mb-8">{data.aboutMainTitle || "الوقت كقطعة فنية"}</h2>
              <div className="w-16 h-px metallic-line mx-auto mb-10" />
              <p className="text-2xl md:text-4xl text-surface/90 font-light leading-tight mb-8">{data.aboutQuote || 'نختار ساعة لا تكتفي بقياس الوقت، بل تمنح كل لحظة شخصية.'}</p>
              <p className="text-surface/65 font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed md:leading-loose">{data.aboutDescription || 'من شكل العلبة إلى نبض الحركة، نبحث عن التوازن بين المواد الصادقة، التفاصيل الدقيقة، والحضور الذي يزداد قيمة مع الزمن.'}</p>
            </motion.div>
            <div className="hidden md:flex justify-center">
              <div className="relative w-40 h-52 border border-accent/30 p-3">
                <div className="absolute inset-5 border border-accent/20" />
                <div className="absolute inset-0 flex items-center justify-center"><div className="watch-dial w-24 h-24 rounded-full" /></div>
                <span className="absolute bottom-3 left-0 right-0 text-center font-mono text-[8px] text-accent tracking-[0.3em]">ORVÉN / 26</span>
              </div>
            </div>
          </div>
          <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-accent/50" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-accent/50" />
        </div>
      </div>
    </section>
  )
}
