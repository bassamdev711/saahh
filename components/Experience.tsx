"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ExperienceData = {
  expTopTitle?: string | null
  expMainTitle?: string | null
  expBox1Title?: string | null
  expBox1Desc?: string | null
  expBox2Title?: string | null
  expBox2Desc?: string | null
}

export default function Experience({
  data = {},
  brandName = 'أثر',
}: {
  data?: ExperienceData
  brandName?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section id="experience" className="relative py-24 md:py-32 bg-white overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-5 lg:px-12 relative z-10" dir="rtl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 md:mb-24">
          <span className="text-accent tracking-[0.4em] uppercase text-[10px] font-bold mb-4 block">{data.expTopTitle || "معاييرنا في الاختيار"}</span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6">{data.expMainTitle || `تجربة ${brandName}`}</h2>
          <div className="w-16 h-px metallic-line mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div style={{ y: y1 }} className="space-y-7">
            <div className="watch-spec-card p-8 md:p-12 border-r-2 border-brand shadow-sm">
              <span className="font-mono text-[10px] tracking-[0.3em] text-accent">01 / CURATION</span>
              <h3 className="text-2xl text-foreground mt-4 mb-4 font-black">{data.expBox1Title || "اختيار يليق بالمعصم"}</h3>
              <p className="text-foreground/70 leading-relaxed font-light text-lg">{data.expBox1Desc || "نراجع التصميم، الخامة، الحركة، ووضوح التفاصيل قبل أن تصل الساعة إلى مجموعتنا."}</p>
            </div>
            <div className="watch-spec-card p-8 md:p-12 border-l-2 border-accent shadow-sm md:mr-12">
              <span className="font-mono text-[10px] tracking-[0.3em] text-accent">02 / AFTERCARE</span>
              <h3 className="text-2xl text-foreground mt-4 mb-4 font-black">{data.expBox2Title || "تفاصيل محسوبة"}</h3>
              <p className="text-foreground/70 leading-relaxed font-light text-lg">{data.expBox2Desc || "من التغليف إلى المتابعة، نصمم كل خطوة لتشعر أن اختيارك محفوظ بعناية منذ اللحظة الأولى."}</p>
            </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="relative h-[520px] md:h-[600px] w-full hidden md:block">
            <div className="absolute inset-0 border border-accent/30 translate-x-4 translate-y-4" />
            <div className="absolute inset-0 overflow-hidden shadow-2xl bg-brand p-8">
              <div className="absolute inset-0 watch-grid opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-72 h-72 rounded-full border border-accent/25 flex items-center justify-center">
                  <div className="absolute inset-8 rounded-full border border-accent/20" />
                  <div className="absolute inset-16 rounded-full watch-dial" />
                  <span className="absolute top-8 left-1/2 -translate-x-1/2 text-accent font-mono text-[9px] tracking-[0.3em]">CRAFTED TO LAST</span>
                </div>
              </div>
              <div className="absolute bottom-8 right-8 left-8 flex justify-between text-[9px] font-mono tracking-[0.22em] text-surface/45"><span>CASE / 316L</span><span>WATER / READY</span><span>EDITION / 026</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
