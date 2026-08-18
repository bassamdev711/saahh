import type { ReactNode } from "react";

type HeroData = {
  heroTitle?: string | null
  heroSubtitle?: string | null
  heroDescription?: string | null
  heroPrimaryButton?: string | null
  heroSecondaryButton?: string | null
}

function CtaLink({ href, children, primary = false }: { href: string; children: ReactNode; primary?: boolean }) {
  return <a href={href} className={`${primary ? 'btn bg-surface text-brand hover:bg-accent hover:text-brand' : 'btn border border-surface/35 text-surface hover:bg-accent hover:border-accent hover:text-brand'} btn-lg rounded-none`}>{children}</a>
}

function ExhibitionWatch({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center ${compact ? 'w-[210px] h-[270px]' : 'w-[390px] h-[510px]'}`}>
      <div className="absolute inset-y-0 w-[68px] rounded-full bg-[linear-gradient(90deg,#161a1c,#b0aba0_45%,#23282a)] shadow-[inset_0_0_18px_rgba(255,255,255,.18)]" />
      <div className="absolute w-[calc(100%-24px)] aspect-square rounded-full border border-accent/20" />
      <div className="absolute w-[calc(100%-84px)] aspect-square rounded-full border border-accent/20" />
      <div className={`watch-dial relative z-10 rounded-full ${compact ? 'w-[168px] h-[168px]' : 'w-[300px] h-[300px]'}`}>
        <div className="watch-sweep" />
        <div className="absolute inset-[8%] rounded-full border border-white/15" />
        <div className="absolute inset-[15%] rounded-full border border-accent/25" />
        <div className="absolute inset-[22%] rounded-full border border-white/10" />
        <span className="absolute top-[19%] left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-[0.5em] text-[#ead8ae]">ORVÉN</span>
        <span className="absolute bottom-[21%] left-1/2 -translate-x-1/2 text-[7px] font-mono tracking-[0.3em] text-white/50">OBJECT 001</span>
        <span className="watch-hand h-[3px] w-[31%] rotate-[16deg]" />
        <span className="watch-hand h-[2px] w-[42%] rotate-[139deg] bg-accent" />
        <span className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent border-[3px] border-brand" />
        <span className="absolute right-[5%] top-1/2 h-6 w-2 -translate-y-1/2 rounded-sm bg-accent" />
      </div>
    </div>
  )
}

function Spec({ label, value }: { label: string; value: string }) {
  return <div className="flex flex-col gap-1"><span className="text-[8px] font-mono tracking-[0.24em] text-surface/40 uppercase">{label}</span><span className="text-[10px] font-mono tracking-[0.18em] text-surface/80 uppercase">{value}</span></div>
}

export default function Hero({
  data = {},
  brandName = 'أورڤِن',
  brandNameLatin = 'ORVÉN',
}: {
  data?: HeroData
  brandName?: string
  brandNameLatin?: string
}) {
  return (
    <section id="hero" className="relative min-h-[100dvh] overflow-hidden bg-brand text-surface" dir="rtl">
      <div className="absolute inset-0 opacity-20 watch-grid" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(183,154,99,.17),transparent_24%),radial-gradient(circle_at_10%_95%,rgba(255,255,255,.07),transparent_20%)]" />
      <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full border border-accent/10" />
      <div className="absolute -top-20 -left-20 w-[24rem] h-[24rem] rounded-full border border-accent/10" />
      <div className="absolute top-0 bottom-0 right-[7%] w-px bg-surface/10" />
      <div className="absolute top-0 bottom-0 left-[7%] w-px bg-surface/10" />

      <div className="hidden lg:grid lg:grid-cols-[.95fr_1.25fr_.8fr] min-h-[100dvh] relative z-10 px-12 xl:px-20 pt-28 pb-12">
        <div className="flex flex-col justify-between border-l border-surface/15 pl-12" dir="ltr">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-mono tracking-[0.45em] text-accent">EXHIBITION / 001</span>
            <span className="h-24 w-px bg-accent/60" />
            <span className="text-[10px] font-mono tracking-[0.22em] text-surface/45 [writing-mode:vertical-rl]">A STUDY OF TIME / FORM / MEMORY</span>
          </div>
          <div className="space-y-3 text-[9px] font-mono tracking-[0.24em] text-surface/40 uppercase"><span className="block">CIRCA / 2026</span><span className="block">MADE FOR THE UNRUSHED</span></div>
        </div>

        <div className="relative flex flex-col items-center justify-center text-center">
          <span className="absolute top-0 font-display text-[13rem] leading-none text-surface/[.035] select-none">{brandNameLatin || 'ORVÉN'}</span>
          <span className="absolute top-[18%] left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.55em] text-accent">THE FIRST TRACE</span>
          <div className="float-soft"><ExhibitionWatch /></div>
          <div className="absolute bottom-[12%] flex flex-col items-center gap-3">
            <span className="text-[9px] font-mono tracking-[0.4em] text-surface/45">AUTOMATIC / 40 MM / 316L</span>
            <span className="h-px w-20 bg-accent/70" />
          </div>
        </div>

        <div className="flex flex-col justify-center pr-6" dir="rtl">
          <span className="text-[10px] font-mono tracking-[0.42em] text-accent uppercase mb-8">دار الساعات المعاصرة</span>
          <h1 className="font-display text-[6.2rem] xl:text-[7.3rem] leading-[.86] tracking-[-.04em] text-surface mb-7">{data.heroTitle || brandName}</h1>
          <p className="text-2xl xl:text-3xl font-light text-accent leading-tight mb-7">{data.heroSubtitle || "الوقت، بصيغة أندر."}</p>
          <p className="text-sm leading-loose text-surface/60 max-w-sm mb-10 whitespace-pre-line">{data.heroDescription || "ليست ساعةً تقيس الزمن،\nبل قطعةٌ تحفظ ما لا نريد نسيانه."}</p>
          <div className="flex gap-3"><CtaLink href="#products" primary>{data.heroPrimaryButton || "ادخل المعرض"}</CtaLink><CtaLink href="#about">{data.heroSecondaryButton || "اقرأ الحكاية"}</CtaLink></div>
          <div className="grid grid-cols-3 gap-5 border-t border-surface/15 mt-12 pt-5"><Spec label="Movement" value="Automatic" /><Spec label="Case" value="316L Steel" /><Spec label="Edition" value="No. 001" /></div>
        </div>
      </div>

      <div className="flex lg:hidden flex-col min-h-[100dvh] relative z-10 px-6 pt-28 pb-10">
        <div className="flex items-center justify-between text-[9px] font-mono tracking-[0.3em] text-accent" dir="ltr"><span>EXHIBITION / 001</span><span>ORVÉN / 2026</span></div>
        <div className="flex flex-col items-center text-center flex-1 justify-center"><span className="text-[9px] font-mono tracking-[0.35em] text-accent uppercase mb-6">دار الساعات المعاصرة</span><h1 className="font-display text-[4.8rem] leading-[.85] text-surface mb-5">{data.heroTitle || brandName}</h1><p className="text-xl text-accent mb-4">{data.heroSubtitle || "الوقت، بصيغة أندر."}</p><p className="text-sm text-surface/65 leading-relaxed max-w-xs mb-7">{data.heroDescription || "ليست ساعةً تقيس الزمن، بل قطعةٌ تحفظ ما لا نريد نسيانه."}</p><div className="float-soft"><ExhibitionWatch compact /></div><div className="flex gap-2.5 w-full max-w-xs mt-7"><CtaLink href="#products" primary>{data.heroPrimaryButton || "ادخل المعرض"}</CtaLink><CtaLink href="#about">{data.heroSecondaryButton || "الحكاية"}</CtaLink></div></div>
        <div className="grid grid-cols-3 gap-3 border-t border-surface/15 pt-4"><Spec label="Movement" value="Auto" /><Spec label="Case" value="316L" /><Spec label="Edition" value="001" /></div>
      </div>
    </section>
  )
}
