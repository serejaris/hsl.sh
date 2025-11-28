"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { TypingWords } from "./typing-words"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const navItems = [
    { label: "дисциплины", href: "#disciplines" },
    { label: "воркшопы", href: "#workshops" },
    { label: "спонсоры", href: "#sponsors" },
    { label: "лидерборд", href: "#leaderboard" },
  ]

  const hackathonInfo = [
    "29-30 ноября",
    "48 часов кода",
    "веб | боты | игры",
    "AI-разработка",
    "без кода, на промптах",
    "первые 50 бесплатно",
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled ? "bg-background/95 backdrop-blur-sm border-border" : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <span className="text-lg font-mono">$</span>
            <TypingWords
              words={hackathonInfo}
              className="font-mono text-xs sm:text-sm text-primary"
              typingSpeed={80}
              deleteSpeed={40}
              pauseTime={2500}
            />
          </div>

          {/* Desktop Navigation - розовый hover */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-sm font-mono text-muted-foreground hover:text-[deeppink] transition-colors relative group"
              >
                <span className="text-primary opacity-60 group-hover:text-[deeppink] transition-colors"># </span>
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[deeppink] transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a
              href="#registration"
              onClick={(e) => scrollToSection(e, "#registration")}
              className="text-sm font-mono border border-primary text-primary px-4 py-1.5 hover:bg-[deeppink] hover:border-[deeppink] hover:text-white transition-colors"
            >
              [регистрация]
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary hover:text-[deeppink] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation - розовый hover */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  scrollToSection(e, item.href)
                  setIsMobileMenuOpen(false)
                }}
                className="block text-sm font-mono text-muted-foreground hover:text-[deeppink] transition-colors"
              >
                <span className="text-primary opacity-60"># </span>
                {item.label}
              </a>
            ))}
            <a
              href="#registration"
              onClick={(e) => {
                scrollToSection(e, "#registration")
                setIsMobileMenuOpen(false)
              }}
              className="block text-sm font-mono border border-primary text-primary px-4 py-1.5 hover:bg-[deeppink] hover:border-[deeppink] hover:text-white transition-colors text-center"
            >
              [регистрация]
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
