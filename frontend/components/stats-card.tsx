import type React from "react"
import { NeonCard } from "./neon-card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  glowColor: "cyan" | "magenta" | "purple" | "orange"
}

export function StatsCard({ title, value, change, icon, glowColor }: StatsCardProps) {
  const isPositive = change >= 0

  return (
    <NeonCard glowColor={glowColor} className="group">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-neon-cyan" : "text-destructive"}`}>
            {isPositive ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
            <span>{Math.abs(change)}%</span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </div>
        <div
          className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform duration-300"
          style={{
            boxShadow: `0 0 20px var(--neon-${glowColor})`,
          }}
        >
          {icon}
        </div>
      </div>
    </NeonCard>
  )
}
