"use client"

import type React from "react"

import { ArrowRight } from "lucide-react"
import { TerminalPrompt } from "./terminal-prompt"
import { useEffect, useState } from "react"
import { GlitchTextPink } from "./glitch-text-pink"

export function HeroSection() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 terminal-scanline">
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <pre className="ascii-art text-xs leading-tight">
          {`
██╗  ██╗ █████╗ ██╗  ██╗ █████╗ ████████╗ ██████╗ ███╗   ██╗
██║  ██║██╔══██╗██║ ██╔╝██╔══██╗╚══██╔══╝██╔═══██╗████╗  ██║
███████║███████║█████╔╝ ███████║   ██║   ██║   ██║██╔██╗ ██║
██╔══██║██╔══██║██╔═██╗ ██╔══██║   ██║   ██║   ██║██║╚██╗██║
██║  ██║██║  ██║██║  ██╗██║  ██║   ██║   ╚██████╔╝██║ ╚████║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝
`}
        </pre>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="border border-border bg-card/50 backdrop-blur-sm p-4 sm:p-6 md:p-12">
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-2 text-[10px] sm:text-xs md:text-sm break-all">
                <span className="text-primary flex-shrink-0">user@system:~$</span>
                <div className="flex-1 min-w-0">
                  {show && <TerminalPrompt text="cat хакатон_инфо.txt" delay={80} showCursor={false} />}
                </div>
              </div>

              <div className="border-t border-border pt-4 md:pt-6 space-y-3 md:space-y-4">
                <div className="flex gap-2 text-muted-foreground text-[10px] sm:text-sm">
                  <span className="text-primary flex-shrink-0">&gt;</span>
                  <span className="break-words">ДАТА: 29-30 ноября 2024</span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                  <span className="text-primary">[</span>
                  <span>ВАЙБКОДИНГ </span>
                  <GlitchTextPink text="ХАКАТОН" className="text-muted-foreground" />
                  <span className="text-primary">]</span>
                </h1>

                <p className="text-muted-foreground text-xs sm:text-sm font-mono">
                  // хакатон где ты не пишешь код, а промптишь AI
                </p>

                <div className="space-y-2 text-[11px] sm:text-sm md:text-base">
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                    <span className="text-accent">--дисциплины:</span>
                    <span className="text-foreground break-words">веб-приложение | тг-бот | игра</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                    <span className="text-accent">--длительность:</span>
                    <span className="text-foreground">48 часов</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-accent">--приз за 1 место:</span>
                    <div className="text-foreground break-words pl-0 sm:pl-4 space-y-1">
                      <div>
                        → проходка на поток декабря - факультет{" "}
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
                  </div>
                </div>

                <div className="pt-4 md:pt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="#registration"
                    onClick={(e) => scrollToSection(e, "#registration")}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 sm:px-6 py-3 font-mono text-xs sm:text-sm hover:bg-[deeppink] transition-colors group"
                  >
                    <span className="break-words">./регистрация.sh</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </a>
                  <a
                    href="#disciplines"
                    onClick={(e) => scrollToSection(e, "#disciplines")}
                    className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-4 sm:px-6 py-3 font-mono text-xs sm:text-sm hover:border-[deeppink] hover:text-[deeppink] transition-colors"
                  >
                    <span>cat инфо.md</span>
                  </a>
                </div>

                <div className="pt-2 text-[10px] sm:text-xs text-chart-4 break-words">
                  <span className="text-primary">[!]</span> Первые 50 участников: БЕСПЛАТНО
                </div>

                <p className="text-muted-foreground text-[10px] sm:text-xs font-mono">
                  // опыт в программировании не нужен — даём: гайд, воркшопы, поддержка в чате
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
