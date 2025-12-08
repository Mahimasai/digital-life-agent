"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Home, Rocket, Globe, Settings, BarChart3, Users, Sparkles } from "lucide-react"

const navItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: Rocket, label: "Missions" },
  { icon: Globe, label: "Planets" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Users, label: "Crew" },
  { icon: Settings, label: "Settings" },
]

export function Navigation() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <nav className="fixed left-0 top-0 h-full w-20 bg-card/50 backdrop-blur-xl border-r border-border/50 flex flex-col items-center py-8 z-50">
      <div className="mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-magenta flex items-center justify-center">
          <Sparkles className="size-6 text-background" />
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {navItems.map((item, index) => (
          <button
            key={item.label}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group",
              index === activeIndex
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-muted-foreground hover:text-foreground",
            )}
            style={
              index === activeIndex ? { boxShadow: "0 0 20px var(--neon-purple), 0 0 40px var(--neon-purple)" } : {}
            }
          >
            <item.icon className="size-5" />
            <span className="absolute left-16 px-2 py-1 rounded bg-card text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-border">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
