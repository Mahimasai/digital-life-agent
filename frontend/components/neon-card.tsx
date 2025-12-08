import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface NeonCardProps {
  children: ReactNode
  className?: string
  glowColor?: "cyan" | "magenta" | "purple" | "orange"
}

const glowColors = {
  cyan: "shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:shadow-[0_0_50px_rgba(0,255,255,0.5)] border-neon-cyan/30",
  magenta: "shadow-[0_0_30px_rgba(255,0,255,0.3)] hover:shadow-[0_0_50px_rgba(255,0,255,0.5)] border-neon-magenta/30",
  purple: "shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_50px_rgba(147,51,234,0.5)] border-neon-purple/30",
  orange: "shadow-[0_0_30px_rgba(255,165,0,0.3)] hover:shadow-[0_0_50px_rgba(255,165,0,0.5)] border-neon-orange/30",
}

export function NeonCard({ children, className, glowColor = "purple" }: NeonCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border bg-card/80 backdrop-blur-xl p-6 transition-all duration-500",
        glowColors[glowColor],
        className,
      )}
    >
      {children}
    </div>
  )
}
