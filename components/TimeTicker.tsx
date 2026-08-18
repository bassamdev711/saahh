const notes = [
  'PRECISION / 01',
  'AUTOMATIC MOVEMENT',
  '316L STEEL',
  'SAPPHIRE GLASS',
  'MADE FOR MOMENTS',
]

export default function TimeTicker() {
  return (
    <section aria-label="Watch atelier principles" className="relative z-20 overflow-hidden bg-brand text-surface border-y border-accent/20" dir="ltr">
      <div className="flex min-w-max animate-time-ticker">
        {[...notes, ...notes].map((note, index) => (
          <div key={`${note}-${index}`} className="flex items-center gap-5 px-7 md:px-10 py-4 md:py-5 text-[9px] md:text-[10px] font-mono tracking-[0.28em] text-surface/70">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(183,154,99,.8)]" />
            {note}
          </div>
        ))}
      </div>
    </section>
  )
}
