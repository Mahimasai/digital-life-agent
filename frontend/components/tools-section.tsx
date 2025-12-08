"use client"

import { motion } from "framer-motion"
import { Code2, Workflow, GitPullRequest, Zap } from "lucide-react"

const tools = [
  {
    name: "Cline",
    description: "Autonomous coding & script execution",
    icon: Code2,
    color: "#06b6d4",
  },
  {
    name: "Kestra",
    description: "Daily workflows that run our agents every morning",
    icon: Workflow,
    color: "#8b5cf6",
  },
  {
    name: "CodeRabbit",
    description: "AI pull-request reviews for our repo",
    icon: GitPullRequest,
    color: "#ec4899",
  },
]

export function ToolsSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-orange/30 bg-neon-orange/10 mb-4">
            <Zap className="size-4 text-neon-orange" />
            <span className="text-sm text-neon-orange">Automation & Dev Tools</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Powered by Infinity Stones</h2>
          <p className="text-white/60 max-w-xl mx-auto">Advanced tools that fuel your automation pipeline</p>
        </motion.div>

        {/* Infinity stones row */}
        <div className="flex flex-wrap justify-center gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Stone glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-50 blur-2xl -z-10"
                  style={{ background: tool.color }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.3,
                  }}
                />

                <div
                  className="p-8 rounded-3xl backdrop-blur-xl border border-white/10 text-center min-w-[200px]"
                  style={{
                    background: `linear-gradient(135deg, ${tool.color}20 0%, rgba(255,255,255,0.05) 100%)`,
                    boxShadow: `0 0 40px ${tool.color}30, inset 0 0 40px ${tool.color}10`,
                  }}
                >
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${tool.color}40 0%, ${tool.color}20 100%)`,
                      boxShadow: `0 0 30px ${tool.color}50`,
                    }}
                  >
                    <tool.icon className="size-8" style={{ color: tool.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                  <p className="text-sm text-white/60">{tool.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
