import type { ReactNode } from "react"

interface TerminalWindowProps {
  children: ReactNode
  title?: string
}

export function TerminalWindow({ children, title = "terminal" }: TerminalWindowProps) {
  return (
    <div className="terminal-border bg-card text-card-foreground">
      <div className="border-b border-border px-4 py-2 flex items-center gap-2 bg-secondary">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 bg-[deeppink]"></div>
          <div className="w-3 h-3 bg-chart-4"></div>
          <div className="w-3 h-3 bg-primary"></div>
        </div>
        <span className="text-xs text-muted-foreground ml-2">{title}</span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}
