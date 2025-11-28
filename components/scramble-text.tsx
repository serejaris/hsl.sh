"use client"

import { useState, useEffect, useCallback } from "react"

interface ScrambleTextProps {
  text: string
  className?: string
  scrambleInterval?: number
  scrambleChance?: number
}

const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`01"

export function ScrambleText({
  text,
  className = "",
  scrambleInterval = 3000,
  scrambleChance = 0.15,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)

  const scramble = useCallback(() => {
    if (isScrambling) return
    setIsScrambling(true)

    let iterations = 0
    const maxIterations = 8

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (iterations > maxIterations * (index / text.length)) {
              return char
            }
            return Math.random() < scrambleChance ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
          })
          .join(""),
      )

      iterations++

      if (iterations > maxIterations) {
        clearInterval(interval)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, 50)
  }, [text, scrambleChance, isScrambling])

  useEffect(() => {
    const timeout = setTimeout(scramble, 500)
    const interval = setInterval(scramble, scrambleInterval)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [scramble, scrambleInterval])

  return <span className={className}>{displayText}</span>
}
