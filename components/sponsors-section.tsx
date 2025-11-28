"use client"

import { GlitchTextPink } from "./glitch-text-pink"

const perks = [
  { icon: "▲", label: "1 место (×3)", value: "проходка + AI Pro (Gemini 3)", color: "text-primary" },
  { icon: "◆", label: "участникам", value: "гайд вайбкодинга", color: "text-accent" },
  { icon: "◇", label: "бейдж", value: "виртуальный", color: "text-chart-2" },
  { icon: "◈", label: "воркшопы", value: "от экспертов", color: "text-chart-3" },
]

export function SponsorsSection() {
  return (
    <section id="sponsors" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-primary font-mono text-sm">$</span>
            <h2 className="text-2xl md:text-4xl font-bold font-mono">
              <GlitchTextPink text="./sponsor --info" />
            </h2>
          </div>
          <p className="text-sm md:text-base text-muted-foreground font-mono ml-5">
            при поддержке{" "}
            <a
              href="https://vibecoding.phd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-[deeppink] transition-colors"
            >
              vibecoding.phd
            </a>
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Main Sponsor */}
          <div className="border-2 border-primary bg-primary/5 p-8 md:p-12">
            <div className="text-center space-y-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold font-mono mb-2">
                  <a
                    href="https://vibecoding.phd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[deeppink] transition-colors"
                  >
                    <GlitchTextPink text="VIBECODING.PHD" />
                  </a>
                </h3>
                <p className="text-sm text-muted-foreground font-mono max-w-md mx-auto">
                  учим создавать продукты через AI, где ты промптишь, а не кодишь - быстро, практично, без страха перед
                  программированием
                </p>
              </div>
              <div className="pt-4">
                <span className="text-xs font-mono text-primary">[ГЛАВНЫЙ СПОНСОР]</span>
              </div>
            </div>
          </div>

          <div className="border border-accent/50 bg-accent/5 p-6 md:p-8">
            <div className="text-center space-y-4">
              <h3 className="text-lg md:text-xl font-bold font-mono">
                <GlitchTextPink text="СООБЩЕСТВО ВАЙБКОДЕРОВ" />
              </h3>
              <p className="text-sm text-muted-foreground font-mono max-w-lg mx-auto">
                топовый ламповый чат на 800+ человек для тех, кто интересуется вайбкодингом. самое активное комьюнити
                AI-разработчиков в телеграме
              </p>
              <div className="pt-2 space-y-3">
                <a
                  href="https://t.me/vibecod3rs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-accent/20 border border-accent px-6 py-3 font-mono text-sm hover:bg-[deeppink]/20 hover:border-[deeppink] hover:text-[deeppink] transition-colors"
                >
                  <GlitchTextPink text="@vibecod3rs" />
                </a>
                <p className="text-xs text-primary font-mono">
                  каждый зарегистрированный участник, прошедший первый этап, получает спец статус в чате
                </p>
              </div>
            </div>
          </div>

          {/* Perks Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {perks.map((perk, index) => (
              <div
                key={index}
                className="border border-border bg-card/50 p-4 hover:border-[deeppink]/50 transition-colors"
              >
                <div className="text-center space-y-2">
                  <div className={`text-2xl ${perk.color}`}>{perk.icon}</div>
                  <div>
                    <div className="text-xs font-mono text-accent mb-1">{perk.label}</div>
                    <div className="text-xs font-mono text-muted-foreground">{perk.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
