"use client"

import { motion } from "framer-motion"
import { Brain, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react"

export function OumiSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 mb-4">
            <Brain className="size-4 text-neon-cyan" />
            <span className="text-sm text-neon-cyan">AI Quality & Oumi</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Self-Improving Agents</h2>
          <p className="text-white/60 max-w-xl mx-auto">
            We use Oumi to fine-tune and evaluate our agents for continuous improvement
          </p>
        </motion.div>

        {/* Comparison cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto">
          {/* Plan v1 */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="p-6 rounded-3xl backdrop-blur-xl border border-white/10"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white/70">Plan v1</h3>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/50 text-sm">Score: 6.2</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white/50">
                  <CheckCircle2 className="size-4" />
                  <span className="text-sm">Basic task extraction</span>
                </div>
                <div className="flex items-center gap-2 text-white/50">
                  <CheckCircle2 className="size-4" />
                  <span className="text-sm">Simple prioritization</span>
                </div>
                <div className="flex items-center gap-2 text-white/50">
                  <CheckCircle2 className="size-4" />
                  <span className="text-sm">Manual scheduling</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            className="hidden md:flex items-center"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-3 rounded-full bg-neon-cyan/20 border border-neon-cyan/30">
              <ArrowRight className="size-6 text-neon-cyan" />
            </div>
          </motion.div>

          {/* Plan v2 */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="p-6 rounded-3xl backdrop-blur-xl border border-neon-cyan/30 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(255,255,255,0.05) 100%)",
                boxShadow: "0 0 40px rgba(6, 182, 212, 0.2)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  Improved Plan v2
                  <TrendingUp className="size-4 text-green-400" />
                </h3>
                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)",
                    color: "white",
                  }}
                >
                  Oumi Score: 8.7
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="size-4 text-green-400" />
                  <span className="text-sm">Context-aware extraction</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="size-4 text-green-400" />
                  <span className="text-sm">ML-based prioritization</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="size-4 text-green-400" />
                  <span className="text-sm">Adaptive auto-scheduling</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
