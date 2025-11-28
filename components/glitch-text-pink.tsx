"use client"

import { useState, useEffect } from "react"
import { useScrollIntensity } from "@/lib/scroll-context"

const glitchChars = ["@", "#", "$", "%", "&", "*", "!", "?", "X", "O", "=", "+", "~", "^"]

type CharState = { char: string; isGlitch: boolean }

interface GlitchTextPinkProps {
  text: string
  className?: string
}

export function GlitchTextPink({ text, className = "" }: GlitchTextPinkProps) {
  const [chars, setChars] = useState<CharState[]>(text.split("").map((char) => ({ char, isGlitch: false })))
  const { scrollIntensity } = useScrollIntensity()

  useEffect(() => {
    const triggerGlitch = () => {
      const baseGlitches = 1 + Math.floor(scrollIntensity * 3)
      const numGlitches = baseGlitches + Math.floor(Math.random() * (2 + scrollIntensity * 2))
      const iterations = 2 + Math.floor(Math.random() * (3 + scrollIntensity * 3))
      let currentIteration = 0

      const runIteration = () => {
        if (currentIteration >= iterations) {
          setChars(text.split("").map((char) => ({ char, isGlitch: false })))
          return
        }

        const newChars = text.split("").map((char) => ({ char, isGlitch: false }))

        const indices = new Set<number>()
        while (indices.size < numGlitches && indices.size < text.length) {
          indices.add(Math.floor(Math.random() * text.length))
        }

        indices.forEach((index) => {
          const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)]
          newChars[index] = { char: randomChar, isGlitch: true }
        })

        setChars(newChars)
        currentIteration++

        setTimeout(runIteration, 50 + Math.random() * 50)
      }

      runIteration()
    }

    const scheduleNext = () => {
      const minDelay = 700 - scrollIntensity * 500
      const maxDelay = 1000 - scrollIntensity * 500
      const delay = Math.max(200, minDelay + Math.random() * maxDelay)
      return setTimeout(() => {
        triggerGlitch()
        timeoutId = scheduleNext()
      }, delay)
    }

    let timeoutId = scheduleNext()

    return () => clearTimeout(timeoutId)
  }, [text, scrollIntensity])

  return (
    <span className={`font-mono inline-flex ${className}`}>
      {chars.map((c, i) => (
        <span
          key={i}
          className="inline-block text-center"
          style={{
            width: "1ch",
            color: c.isGlitch ? "deeppink" : undefined,
          }}
        >
          {c.char}
        </span>
      ))}
    </span>
  )
}
