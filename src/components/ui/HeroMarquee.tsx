type HeroMarqueeProps = {
  images: string[]
}

const ROWS = [
  { reverse: false },
  { reverse: true },
  { reverse: false },
]

export function HeroMarquee({ images }: HeroMarqueeProps) {
  const doubled = [...images, ...images]

  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-6 opacity-90">
      {ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`hero-marquee-track h-[30%] md:h-[32%] ${row.reverse ? "reverse" : ""}`}
        >
          {doubled.map((src, i) => (
            <div key={i} className="hero-card">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
