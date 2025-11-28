"use client"

import { GlitchTextPink } from "./glitch-text-pink"

const workshops = [
  {
    title: "как вайбкодить",
    description: "как создавать продукты через AI-промптинг вместо традиционного кодинга - быстро и без страха",
    time: "29.11 // 14:00",
    id: "workshop_01",
    speaker: "Сережа Рис",
  },
  {
    title: "практический воркшоп",
    description: "промптим AI вместе, создаём реальные проекты и учимся получать нужный результат от нейросети",
    time: "30.11 // 11:00",
    id: "workshop_02",
    speaker: "Сережа Рис",
  },
]

export function WorkshopsSection() {
  return (
    <section id="workshops" className="py-16 md:py-24 bg-card/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-primary font-mono text-sm">$</span>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold font-mono break-words">
              <GlitchTextPink text="cat workshops.log" />
            </h2>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-mono ml-5 break-words">
            научись новому и прокачай навыки
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {workshops.map((workshop, index) => (
            <div
              key={index}
              className="border border-border bg-background/80 p-4 sm:p-6 hover:border-[deeppink] transition-colors group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[10px] sm:text-xs font-mono text-primary break-all">[{workshop.id}]</span>
                  <span className="text-[10px] sm:text-xs font-mono text-accent group-hover:text-[deeppink] transition-colors break-words">
                    {workshop.time}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-mono text-balance break-words">
                    <GlitchTextPink text={workshop.title} />
                  </h3>
                  <div className="flex gap-2 text-xs sm:text-sm text-muted-foreground font-mono">
                    <span className="text-primary flex-shrink-0">&gt;</span>
                    <p className="leading-relaxed break-words">{workshop.description}</p>
                  </div>
                  <div className="flex gap-2 text-xs sm:text-sm text-accent font-mono pt-2">
                    <span className="text-primary flex-shrink-0">@</span>
                    <p className="break-words">
                      ведущий: <GlitchTextPink text={workshop.speaker} />
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <span className="text-[10px] sm:text-xs font-mono text-muted-foreground group-hover:text-[deeppink] transition-colors">
                    status: scheduled
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
