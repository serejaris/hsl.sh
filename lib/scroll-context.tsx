"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface ScrollContextType {
  scrollIntensity: number // 0-1, где 0 - вверху страницы, 1 - внизу
}

const ScrollContext = createContext<ScrollContextType>({ scrollIntensity: 0 })

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scrollIntensity, setScrollIntensity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const intensity = Math.min(scrollTop / docHeight, 1)
      setScrollIntensity(intensity)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return <ScrollContext.Provider value={{ scrollIntensity }}>{children}</ScrollContext.Provider>
}

export function useScrollIntensity() {
  return useContext(ScrollContext)
}
