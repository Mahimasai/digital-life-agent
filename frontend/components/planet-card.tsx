"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface PlanetCardProps {
  icon: ReactNode
  title: string
  description: string
  glowColor: string
  delay?: number
  orbitRadius?: number
}

export function PlanetCard({ icon, title, description, glowColor, delay = 0, orbitRadius = 20 }: PlanetCardProps) {
  return (
    <motion.div
      className="relative"
      animate={{
        y: [-orbitRadius, orbitRadius, -orbitRadius],
        x: [-orbitRadius / 2, orbitRadius / 2, -orbitRadius / 2],
      }}
      transition={{
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
    >
      <div
        className="relative p-6 rounded-3xl backdrop-blur-xl border border-white/10"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
          boxShadow: `0 0 60px ${glowColor}40, inset 0 0 60px ${glowColor}10`,
        }}
      >
        {/* Glow ring */}
        <div className="absolute -inset-1 rounded-3xl opacity-50 blur-xl -z-10" style={{ background: glowColor }} />

        <div className="flex flex-col items-center text-center gap-3">
          <div
            className="p-4 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${glowColor}30 0%, ${glowColor}10 100%)`,
              boxShadow: `0 0 30px ${glowColor}50`,
            }}
          >
            {icon}
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-white/70">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}
