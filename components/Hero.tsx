import type { ReactNode } from "react";

type HeroData = {
  heroTitle?: string | null
  heroSubtitle?: string | null
  heroDescription?: string | null
  heroPrimaryButton?: string | null
  heroSecondaryButton?: string | null
}

function WatchMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center ${compact ? 'w-[170px] h-[220px] sm:w-[210px] sm:h-[270px]' : 'w-[270px] h-[360px] xl:w-[330px] xl:h-[440px]'}`}>
      <div className="absolute top-0 bottom-0 w-[58px] sm:w-[72px] rounded-full bg-[linear-gradient(90deg,#202628,#a6a69d_48%,#141719)] opacity-95 shadow-[inset_0_0_12px_rgba(255,255,255,.18)]" />
      <div className="absolute top-1/2 left-1/2 w-[250px] h-[250px] xl:w-[310px] xl:h-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/25" />
      <div className={`watch-dial relative z-10 rounded-full ${compact ? 'w-[148px] h-[148px] sm:w-[188px] sm:h-[188px]' : 'w-[236px] h-[236px] xl:w-[290px] xl:h-[290px]'}`}>
        <div className="watch-sweep" />
        <div className="absolute inset-[13%] rounded-full border border-white/10" />
        <div className="absolute inset-[18%] rounded-full border border-accent/10" />
        <span className="absolute top-[22%] left-1/2 -translate-x-1/2 font-display text-[10px] sm:text-xs tracking-[0.35em] text-[#ead8ae]">SAHHH</span>
        <span className="absolute bottom-[24%] left-1/2 -translate-x-1/2 font-mono text-[7px] sm:text-[9px] tracking-[0.25em] text-white/50">AUTOMATIC</span>
        <span className="absolute top-1/2 left-[12%] h-px w-[76%] bg-white/10" />
        <span className="watch-hand h-[3px] w-[30%] rotate-[18deg]" />
        <span className="watch-hand h-[2px] w-[39%] rotate-[142deg] bg-[#b79a63]" />
        <span className="absolute left-1/2 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b79a63] border-2 border-[#111417]" />
        <span className="absolute right-[7%] top-1/2 h-5 w-2 -translate-y-1/2 rounded-sm bg-[#b79a63] shadow-[0_0_9px_rgba(183,154,99,.5)]" />
      </div>
    </div>
  )
}

function CtaLink({ href, children, primary = false }: { href: string; children: ReactNode; primary?: boolean }) {
  return <a href={href} className={`${primary ? 'btn btn-primary' : 'btn btn-outline'} btn-lg`}>{children}</a>
}

function DataPill({ label, value }: { label: string; value: string }) {
  return <div className="flex flex-col gap-1"><span className="text-[8px] font-mono tracking-[0.22em] text-foreground/35 uppercase">{label}</span><span className="text-[11px] font-mono tracking-[0.16em] text-foreground/70 uppercase">{value}</span></div>
}

export default function Hero({
  data = {},
  brandName = 'ساعة',
  brandNameLatin = 'SAHHH',
}: {
  data?: HeroData
  brandName?: string
  brandNameLatin?: string
}) {
  return (
    <section id="hero" className="relative w-full min-h-[100dvh] overflow-hidden bg-surface">
      <div className="absolute inset-0 watch-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(183,154,99,.13),transparent_22%),radial-gradient(circle_at_85%_72%,rgba(17,20,23,.08),transparent_28%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[140px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="hidden lg:grid lg:grid-cols-[1.05fr_.95fr] min-h-[100dvh] relative z-10" dir="rtl">
        <div className="flex flex-col justify-center text-right px-12 xl:px-20 pt-24 pb-16 max-w-2xl ml-auto">
          <div className="flex items-center gap-3 mb-8 text-[10px] font-mono tracking-[0.35em] text-brand/60 uppercase"><span className="w-12 h-px bg-accent" />Atelier / 01 / Debut</div>
          <h1 className="text-[6.5rem] xl:text-[7.5rem] font-black text-foreground leading-[0.84] tracking-[-0.06em] mb-5">{data.heroTitle || brandName}</h1>
          <p className="font-display text-3xl xl:text-4xl text-brand leading-snug mb-8">{data.heroSubtitle || "الوقت، بصياغةٍ أدق."}</p>
          <p className="text-sm xl:text-base text-foreground/65 font-light leading-loose max-w-md mb-12 whitespace-pre-line">{data.heroDescription || "ساعات مختارة لمن يقدّر التفاصيل الهادئة،\nوالحضور الذي يبقى بعد مرور الوقت."}</p>
          <div className="flex flex-row gap-4 justify-start"><CtaLink href="#products" primary>{data.heroPrimaryButton || "اكتشف المجموعة"}</CtaLink><CtaLink href="#about">{data.heroSecondaryButton || "فلسفة العلامة"}</CtaLink></div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-md border-t border-brand/15 pt-5"><DataPill label="Case" value="316L Steel" /><DataPill label="Dial" value="40 MM" /><DataPill label="Edition" value="No. 001" /></div>
        </div>

        <div className="relative flex items-center justify-center overflow-hidden pt-20 pb-10">
          <div className="absolute inset-y-12 right-10 left-10 border border-accent/25" />
          <div className="absolute inset-y-20 right-20 left-20 border border-brand/10" />
          <div className="absolute top-[22%] right-[13%] text-[9px] font-mono tracking-[0.28em] text-foreground/40 [writing-mode:vertical-rl]">OBJECT / 001</div>
          <div className="absolute bottom-[17%] left-[13%] text-[9px] font-mono tracking-[0.28em] text-foreground/40 [writing-mode:vertical-rl]">DIAL / 40MM</div>
          <div className="absolute top-1/2 left-1/2 w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10" />
          <div className="absolute top-1/2 left-1/2 w-[390px] h-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10" />
          <div className="absolute top-1/2 left-1/2 w-[610px] h-px -translate-x-1/2 -translate-y-1/2 bg-accent/10" />
          <div className="absolute top-1/2 left-1/2 h-[610px] w-px -translate-x-1/2 -translate-y-1/2 bg-accent/10" />
          <div className="float-soft"><WatchMark /></div>
          <div className="absolute bottom-14 right-14 flex flex-col gap-2 font-mono text-[9px] tracking-[0.28em] text-foreground/35 uppercase"><span>PRECISION / OBJECT</span><span>TIME / 2026</span></div>
          <span className="absolute top-24 left-14 font-display text-7xl text-brand/5 select-none">{brandNameLatin}</span>
          <div className="absolute top-14 left-14 w-14 h-14 border-t border-l border-accent/40" />
        </div>
      </div>

      <div className="flex lg:hidden flex-col min-h-[100dvh] relative z-10 pt-24 pb-8 px-5" dir="rtl">
        <div className="flex flex-col text-center w-full max-w-md mx-auto mb-6"><span className="text-[9px] font-mono tracking-[0.3em] text-brand/55 uppercase mb-5">ATELIER / 01 / DEBUT</span><h1 className="text-[3.4rem] sm:text-6xl font-black text-foreground leading-none tracking-[-0.04em] mb-3">{data.heroTitle || brandName}</h1><span className="font-display text-2xl sm:text-3xl text-brand leading-tight">{data.heroSubtitle || "الوقت، بصياغة أدق."}</span><p className="text-sm sm:text-base text-foreground/70 font-light leading-relaxed mt-5 whitespace-pre-line">{data.heroDescription || "ساعات مختارة لمن يقدّر التفاصيل الهادئة، والحضور الذي يبقى بعد مرور الوقت."}</p></div>
        <div className="flex flex-col items-center flex-1 justify-center"><div className="relative"><div className="absolute -inset-8 rounded-full border border-accent/15" /><WatchMark compact /></div><div className="flex flex-row gap-2.5 w-full max-w-[320px] mt-8"><CtaLink href="#products" primary>{data.heroPrimaryButton || "اكتشف المجموعة"}</CtaLink><CtaLink href="#about">{data.heroSecondaryButton || "فلسفة العلامة"}</CtaLink></div><div className="grid grid-cols-3 gap-5 w-full max-w-[320px] border-t border-brand/15 mt-8 pt-4"><DataPill label="Case" value="316L" /><DataPill label="Dial" value="40 MM" /><DataPill label="Edition" value="001" /></div></div>
      </div>
    </section>
  )
}
