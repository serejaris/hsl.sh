"use client"

import { GlitchTextPink } from "./glitch-text-pink"

const disciplines = [
  {
    command: "web-app",
    title: "веб-приложения",
    description: "создай веб-приложение с помощью AI - промпти, а не коди",
    symbol: "◆",
  },
  {
    command: "tg-bot",
    title: "телеграм боты",
    description: "разработай умного бота через AI без глубоких знаний программирования",
    symbol: "◇",
  },
  {
    command: "game",
    title: "игры",
    description: "создай игру с AI-помощником - фокус на идею, не на код",
    symbol: "◈",
  },
]

export function DisciplinesSection() {
  return (
    <section id="disciplines" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-primary font-mono text-sm">$</span>
            <h2 className="text-2xl md:text-4xl font-bold font-mono">
              <GlitchTextPink text="ls ./disciplines/" />
            </h2>
          </div>
          <p className="text-sm md:text-base text-muted-foreground font-mono ml-5">
            выбери направление и покажи навыки
          </p>
          <div className="ml-5 mt-3 space-y-1">
            <div className="flex items-start gap-2">
              <span className="text-primary text-xs font-mono">[!]</span>
              <p className="text-xs text-accent font-mono">приз за 1 место в каждой дисциплине:</p>
            </div>
            <div className="ml-6 text-xs text-muted-foreground font-mono space-y-0.5">
              <div>
                → проходка на поток декабря факультета{" "}
                <a
                  href="https://vibecoding.phd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-[deeppink] transition-colors"
                >
                  vibecoding.phd
                </a>
              </div>
              <div>→ годовая подписка на Google AI Pro (Gemini 3 + Nano Banana Pro)</div>
            </div>
            <div className="flex items-start gap-2 mt-3 pt-3 border-t border-border/50">
              <span className="text-[deeppink] text-xs font-mono">[★]</span>
              <div className="text-xs font-mono space-y-1">
                <p className="text-accent">победителей определит народное голосование в</p>
                <a
                  href="https://t.me/ris_ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-[deeppink] transition-colors"
                >
                  <GlitchTextPink text="@ris_ai" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {disciplines.map((discipline, index) => (
            <div
              key={index}
              className="border border-border bg-card/50 p-6 hover:border-[deeppink] transition-colors group cursor-pointer"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl text-primary group-hover:text-[deeppink] transition-colors">
                  {discipline.symbol}
                </span>
                <span className="text-primary font-mono text-xs">0{index + 1}</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-accent text-xs font-mono">--name:</span>
                  <h3 className="text-lg md:text-xl font-bold font-mono">
                    <GlitchTextPink text={discipline.title} />
                  </h3>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent text-xs font-mono flex-shrink-0">--desc:</span>
                  <p className="text-sm text-muted-foreground font-mono leading-relaxed">{discipline.description}</p>
                </div>
                <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-mono text-[deeppink]">$ ./{discipline.command}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
