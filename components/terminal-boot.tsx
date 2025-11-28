"use client"

import { useEffect, useState } from "react"

export function TerminalBoot() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hasBooted, setHasBooted] = useState(false)

  const bootMessages = [
    "[OK] Инициализация системы вайбкодинг хакатона...",
    "[OK] Загрузка базы данных участников...",
    "[OK] Подключение модулей воркшопов...",
    "[OK] Запуск сервиса лидерборда...",
    "[OK] Загрузка призов от vibecoding.phd...",
    "[OK] Система готова. Вайбкодинг Хакатон 29-30 ноября.",
  ]

  useEffect(() => {
    const alreadyBooted = sessionStorage.getItem("hackathon-booted")
    if (alreadyBooted) {
      setHasBooted(true)
      return
    }

    setVisible(true)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => {
            setVisible(false)
            sessionStorage.setItem("hackathon-booted", "true")
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(progressInterval)
  }, [])

  if (hasBooted || !visible) return null

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="max-w-2xl w-full px-4">
        <div className="space-y-2 mb-8">
          {bootMessages.map((msg, index) => (
            <div
              key={index}
              className="text-sm font-mono text-primary opacity-0 animate-fade-in"
              style={{
                animationDelay: `${index * 0.3}s`,
                animationFillMode: "forwards",
              }}
            >
              {msg}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
            <span>Loading...</span>
            <span className="tabular-nums">{progress}%</span>
          </div>
          <div className="h-1 bg-secondary overflow-hidden">
            <div className="h-full bg-primary transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
