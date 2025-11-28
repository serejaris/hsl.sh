"use client"

import { GlitchTextPink } from "./glitch-text-pink"

const leaderboardData = [
  { position: 1, team: "???", score: 0, status: "pending" },
  { position: 2, team: "???", score: 0, status: "pending" },
  { position: 3, team: "???", score: 0, status: "pending" },
]

export function LeaderboardSection() {
  return (
    <section id="leaderboard" className="py-16 md:py-24 bg-card/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-primary font-mono text-sm">$</span>
            <h2 className="text-2xl md:text-4xl font-bold font-mono">
              <GlitchTextPink text="tail -f leaderboard.log" />
            </h2>
          </div>
          <p className="text-sm md:text-base text-muted-foreground font-mono ml-5">
            следи за результатами в реальном времени
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="border border-border bg-background/80 p-6 md:p-8 hover:border-[deeppink]/30 transition-colors">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pb-3 border-b border-border">
                <span className="w-12">RANK</span>
                <span className="flex-1">TEAM</span>
                <span className="w-20 text-right">SCORE</span>
                <span className="w-20 text-right">STATUS</span>
              </div>

              {/* Entries - добавлен розовый hover */}
              {leaderboardData.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between py-3 font-mono text-sm hover:text-[deeppink] transition-colors cursor-default ${
                    index === 0 ? "text-primary" : "text-foreground"
                  }`}
                >
                  <span className="w-12 text-accent">#{entry.position}</span>
                  <span className="flex-1">{entry.team}</span>
                  <span className="w-20 text-right tabular-nums">{entry.score.toString().padStart(4, "0")}</span>
                  <span className="w-20 text-right text-xs text-muted-foreground">[{entry.status}]</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border text-center space-y-3">
              <p className="text-xs font-mono text-muted-foreground">[INFO] лидерборд активируется во время хакатона</p>
              <div className="pt-3 border-t border-border/50">
                <p className="text-xs font-mono text-accent mb-2">объявление победителей:</p>
                <div className="text-xs font-mono text-muted-foreground space-y-1">
                  <p>
                    <span className="text-primary">[ДАТА]</span> понедельник, 1 декабря
                  </p>
                  <p>
                    <span className="text-primary">[ГДЕ]</span> стрим на YouTube канале{" "}
                    <a
                      href="https://www.youtube.com/@serejaris"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-[deeppink] transition-colors"
                    >
                      <GlitchTextPink text="Сережа Рис" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
