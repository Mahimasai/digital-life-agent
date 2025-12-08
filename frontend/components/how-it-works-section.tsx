"use client"

import { motion } from "framer-motion"
import { Link2, Bot, CalendarClock, BarChart3 } from "lucide-react"

const steps = [
  {
    icon: Link2,
    title: "Connect",
    description: "Link your email & calendar",
    color: "#06b6d4",
  },
  {
    icon: Bot,
    title: "Analyze",
    description: "Agents read and summarize",
    color: "#8b5cf6",
  },
  {
    icon: CalendarClock,
    title: "Automate",
    description: "Kestra schedules workflows",
    color: "#ec4899",
  },
  {
    icon: BarChart3,
    title: "Improve",
    description: "Oumi evaluates & improves",
    color: "#f59e0b",
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-white/60 max-w-xl mx-auto">Four simple steps to automate your digital life</p>
        </motion.div>

        {/* Horizontal timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-orange hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                {/* Node */}
                <motion.div
                  className="relative mx-auto mb-6 w-24 h-24 rounded-full flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle, ${step.color}30 0%, transparent 70%)`,
                    boxShadow: `0 0 40px ${step.color}40`,
                  }}
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    boxShadow: [`0 0 40px ${step.color}40`, `0 0 60px ${step.color}60`, `0 0 40px ${step.color}40`],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.3,
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center border"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}40 0%, ${step.color}20 100%)`,
                      borderColor: `${step.color}50`,
                    }}
                  >
                    <step.icon className="size-7" style={{ color: step.color }} />
                  </div>
                  {/* Step number */}
                  <div
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: step.color }}
                  >
                    {index + 1}
                  </div>
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/60">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
