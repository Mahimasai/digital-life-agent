// frontend/components/hero-section.tsx
"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Mail, CheckSquare, Calendar, Sparkles, Rocket } from "lucide-react"
import { PlanetCard } from "./planet-card"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"

export function HeroSection() {
  const [running, setRunning] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function runAgent() {
    try {
      setRunning(true)
      setMessage(null)
      const res = await api.runAgent()
      console.log("Agent Output:", res)
      // show backend note if fallback was used
      if (res?.note) setMessage(res.note)
      else setMessage("✨ Agent completed successfully! Check the sections below.")
      // dispatch event for sections to update
      window.dispatchEvent(new CustomEvent("agent:ran", { detail: res }))
    } catch (err) {
      console.error(err)
      setMessage("⚠️ Agent run failed. Check backend.")
    } finally {
      setRunning(false)
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Content */}
      <motion.div
        className="text-center max-w-4xl mx-auto z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-purple/30 bg-neon-purple/10 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="size-4 text-neon-purple" />
          <span className="text-sm text-neon-purple">Multi-Agent AI System</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-balance">
          <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-magenta bg-clip-text text-transparent">
            Command Your Digital Life
          </span>
          <br />
          <span className="text-white">With AI Agents</span>
        </h1>

        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8 text-pretty">
          The platform that reads your emails, extracts tasks, plans your day, runs automations,
          and continuously improves itself with AI evaluation.
        </p>

        {/* 🔥 Run Agent Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <Button
            onClick={runAgent}
            disabled={running}
            size="lg"
            className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-neon-magenta via-neon-purple to-neon-cyan text-white border-0 hover:opacity-90 transition-opacity flex items-center gap-2"
            style={{
              boxShadow: "0 0 40px rgba(139, 92, 246, 0.5), 0 0 80px rgba(6, 182, 212, 0.3)",
            }}
          >
            <Rocket className="size-5" />
            {running ? "Running Agent…" : "Run My Agent"}
          </Button>

          {message && <p className="text-sm text-neon-cyan animate-pulse">{message}</p>}
        </motion.div>
      </motion.div>

      {/* Floating Planets */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Email Planet */}
        <div className="absolute top-[15%] left-[5%] md:left-[10%]">
          <PlanetCard
            icon={<Mail className="size-8 text-neon-cyan" />}
            title="Email"
            description="AI-powered inbox management"
            glowColor="#06b6d4"
            delay={0}
            orbitRadius={15}
          />
        </div>

        {/* Tasks Planet */}
        <div className="absolute top-[20%] right-[5%] md:right-[10%]">
          <PlanetCard
            icon={<CheckSquare className="size-8 text-neon-magenta" />}
            title="Tasks"
            description="Smart task extraction"
            glowColor="#ec4899"
            delay={1}
            orbitRadius={18}
          />
        </div>

        {/* Planner Planet */}
        <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2">
          <PlanetCard
            icon={<Calendar className="size-8 text-neon-purple" />}
            title="Planner"
            description="Intelligent scheduling"
            glowColor="#8b5cf6"
            delay={2}
            orbitRadius={12}
          />
        </div>
      </div>
    </section>
  )
}
