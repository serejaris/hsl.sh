import { HeroSection } from "@/components/hero-section"
import { DisciplinesSection } from "@/components/disciplines-section"
import { WorkshopsSection } from "@/components/workshops-section"
import { SponsorsSection } from "@/components/sponsors-section"
import { LeaderboardSection } from "@/components/leaderboard-section"
import { RegistrationSection } from "@/components/registration-section"
import { ParticipantsCounter } from "@/components/participants-counter"
import { Navigation } from "@/components/navigation"
import { MatrixRain } from "@/components/matrix-rain"
import { CursorGlow } from "@/components/cursor-glow"
import { TerminalBoot } from "@/components/terminal-boot"

export default function Home() {
  return (
    <>
      <TerminalBoot />
      <MatrixRain />
      <CursorGlow />

      <main className="min-h-screen bg-background relative">
        <Navigation />
        <HeroSection />
        <ParticipantsCounter />
        <DisciplinesSection />
        <WorkshopsSection />
        <SponsorsSection />
        <LeaderboardSection />
        <RegistrationSection />
      </main>
    </>
  )
}
