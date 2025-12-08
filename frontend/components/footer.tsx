"use client"

import { motion } from "framer-motion"
import { Github, Code2, Workflow, Brain, Cloud, Rocket, GitPullRequest } from "lucide-react"
import { Button } from "@/components/ui/button"

const tools = [
  { name: "Cline", icon: Code2 },
  { name: "Kestra", icon: Workflow },
  { name: "Oumi", icon: Brain },
  { name: "Together AI", icon: Cloud },
  { name: "Vercel", icon: Rocket },
  { name: "CodeRabbit", icon: GitPullRequest },
]

export function Footer() {
  return (
    <footer className="relative py-16 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-magenta bg-clip-text text-transparent">
              Digital Life Commander
            </h3>
            <p className="text-white/50 mt-2">AI agents for your digital life</p>
          </motion.div>

          {/* GitHub button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Button variant="outline" className="gap-2 border-white/20 bg-white/5 hover:bg-white/10 text-white">
              <Github className="size-4" />
              View on GitHub
            </Button>
          </motion.div>

          {/* Tool logos */}
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors"
              >
                <tool.icon className="size-4" />
                <span className="text-sm">{tool.name}</span>
              </div>
            ))}
          </motion.div>

          {/* Copyright */}
          <p className="text-sm text-white/30 mt-4">Made Life Easy 😁😁😁</p>
        </div>
      </div>
    </footer>
  )
}
