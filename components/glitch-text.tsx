"use client"

import { useState, useEffect } from "react"

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [glitched, setGlitched] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitched(true)
        setTimeout(() => setGlitched(false), 100)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className={`${className} ${glitched ? "terminal-glitch" : ""}`}
      style={{
        textShadow: glitched ? "2px 0 rgba(0, 255, 100, 0.7), -2px 0 rgba(255, 0, 100, 0.7)" : "none",
      }}
    >
      {text}
    </span>
  )
}
