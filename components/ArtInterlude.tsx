export default function ArtInterlude() {
  return (
    <section className="relative overflow-hidden bg-brand text-surface py-24 md:py-36" dir="rtl" aria-label="فلسفة أورڤِن">
      <div className="absolute inset-0 opacity-20 watch-grid" />
      <div className="absolute top-1/2 left-[18%] w-[25rem] h-[25rem] -translate-y-1/2 rounded-full border border-accent/20" />
      <div className="absolute top-1/2 left-[18%] w-[18rem] h-[18rem] -translate-y-1/2 rounded-full border border-accent/15" />
      <div className="absolute top-1/2 left-[18%] w-[11rem] h-[11rem] -translate-y-1/2 rounded-full watch-dial opacity-80" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-[.8fr_1.6fr_.6fr] items-center gap-10">
        <div className="hidden md:flex flex-col gap-5 text-[9px] font-mono tracking-[0.3em] text-surface/45 uppercase" dir="ltr"><span>TIME IS NOT</span><span>A LINE</span><span className="w-12 h-px bg-accent" /><span>IT IS A TRACE</span></div>
        <div className="text-center md:text-right md:pr-10">
          <span className="text-accent text-[10px] font-mono tracking-[0.4em] uppercase">MANIFESTO / 002</span>
          <h2 className="font-display text-4xl md:text-7xl leading-tight mt-6 mb-6">كل دقيقة<br /><span className="text-accent">تترك توقيعًا</span></h2>
          <p className="max-w-lg text-surface/60 text-sm md:text-base leading-loose">نحن لا نصنع أدوات للوقت. نصنع علامات صغيرة تذكّرك بأن أجمل اللحظات لا تحتاج إلى استعجال.</p>
        </div>
        <div className="flex md:flex-col items-center justify-center gap-5 text-[9px] font-mono tracking-[0.28em] text-surface/40 uppercase" dir="ltr"><span>TRACE / 01</span><span>MEMORY / 02</span><span>FORM / 03</span></div>
      </div>
    </section>
  )
}
