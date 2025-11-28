"use client"

import { useEffect, useState } from "react"

export function ParticipantsCounter() {
  const [count, setCount] = useState(0)
  const targetCount = 42
  const maxFree = 50

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = targetCount / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= targetCount) {
        setCount(targetCount)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  const spotsLeft = maxFree - count

  return null

  /* Скрытый код - не удалять
  return (
    <section className="border-y border-border bg-card/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-border p-6 bg-background/50">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-primary text-sm font-mono">СТАТУС:</span>
                <span className="text-4xl font-mono font-bold text-primary tabular-nums">
                  {count.toString().padStart(3, "0")}
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-mono">зарегистрированных участников</p>
            </div>

            <div className="border border-border p-6 bg-background/50">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-accent text-sm font-mono">FREE:</span>
                <span className="text-4xl font-mono font-bold text-accent tabular-nums">
                  {spotsLeft.toString().padStart(3, "0")}
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-mono">бесплатных мест осталось</p>
            </div>
          </div>

          {spotsLeft > 0 && spotsLeft <= 10 && (
            <div className="mt-4 border border-[deeppink]/50 bg-[deeppink]/10 p-3 text-center">
              <p className="text-xs font-mono text-[deeppink]">[ВНИМАНИЕ] Осталось мало бесплатных мест</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
  */
}
