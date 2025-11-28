"use client"

import { useEffect, useState } from "react"

interface TerminalPromptProps {
  text: string
  delay?: number
  showCursor?: boolean
}

export function TerminalPrompt({ text, delay = 50, showCursor = true }: TerminalPromptProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text])

  return (
    <span className="font-mono">
      {displayText}
      {showCursor && currentIndex >= text.length && <span className="terminal-cursor ml-0.5"></span>}
    </span>
  )
}
