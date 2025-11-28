"use client"
import { GlitchTextPink } from "./glitch-text-pink"

const asciiArt = `░██     ░██   ░██████   ░██                        ░██        
░██     ░██  ░██   ░██  ░██                        ░██        
░██     ░██ ░██         ░██              ░███████  ░████████  
░██████████  ░████████  ░██             ░██        ░██    ░██ 
░██     ░██         ░██ ░██              ░███████  ░██    ░██ 
░██     ░██  ░██   ░██  ░██                    ░██ ░██    ░██ 
░██     ░██   ░██████   ░██████████ ░██  ░███████  ░██    ░██`

export function AsciiFooter() {
  return (
    <a
      href="https://hsl.sh"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer group"
    >
      <p className="text-xs sm:text-sm font-mono text-center text-muted-foreground">
        <GlitchTextPink text="хакатон придумали, организовали и завайбкодили в" />
      </p>
      <div className="w-full overflow-x-auto flex justify-center">
        <pre
          className="font-mono text-[4px] sm:text-[6px] md:text-[8px] lg:text-[10px] leading-none select-none"
          style={{
            color: "deeppink",
            letterSpacing: "0",
            fontFamily: "monospace",
          }}
        >
          {asciiArt}
        </pre>
      </div>
    </a>
  )
}
