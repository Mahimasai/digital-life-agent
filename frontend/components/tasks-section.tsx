"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckSquare, AlertCircle, Clock, ChevronRight } from "lucide-react"
import { api } from "@/lib/api"

type BackendTask = {
  id: number
  title: string
  source: string
  priority: "high" | "medium" | "low" | string
  due?: string | null
}

type UiTask = {
  title: string
  priority: "High" | "Medium" | "Low" | string
  color: string
  source: string
}

function mapBackendToUi(tasks: BackendTask[]): UiTask[] {
  const colors: Record<string, string> = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#22c55e",
  }

  if (!tasks || tasks.length === 0) {
    // fallback to your original demo data
    return [
      { title: "Review Q4 budget proposal", priority: "High", color: "#ef4444", source: "Email: CFO" },
      { title: "Schedule team offsite venue", priority: "Medium", color: "#f59e0b", source: "Email: HR" },
      { title: "Update project documentation", priority: "Low", color: "#22c55e", source: "Email: Dev Team" },
      { title: "Prepare board presentation", priority: "High", color: "#ef4444", source: "Calendar" },
      { title: "Code review for PR #247", priority: "Medium", color: "#f59e0b", source: "CodeRabbit" },
    ]
  }

  return tasks.map((t) => {
    const key = t.priority.toLowerCase()
    return {
      title: t.title,
      priority: (key.charAt(0).toUpperCase() + key.slice(1)) as UiTask["priority"],
      color: colors[key] ?? "#06b6d4",
      source: t.source ? `Source: ${t.source}` : "Source: email",
    }
  })
}

export function TasksSection() {
  const [tasks, setTasks] = useState<UiTask[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api
      .getTasks<BackendTask[]>()
      .then((data) => {
        setTasks(mapBackendToUi(data));
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load tasks");
      })
      .finally(() => setLoading(false));
  }, []);


  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Star field effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-magenta/30 bg-neon-magenta/10 mb-4">
            <CheckSquare className="size-4 text-neon-magenta" />
            <span className="text-sm text-neon-magenta">Tasks Planet</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Smart Task Extraction</h2>
          <p className="text-white/60 max-w-xl mx-auto">
            AI extracts actionable tasks from emails and assigns intelligent priorities
          </p>
        </motion.div>

        {loading && (
          <p className="text-center text-sm text-white/60">Loading tasks…</p>
        )}
        {error && (
          <p className="text-center text-sm text-red-400">{error}</p>
        )}

        {/* Floating task cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {tasks.map((task, index) => (
              <motion.div
                key={task.title + index}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10"
                  style={{ background: task.color }}
                />
                <div
                  className="p-4 rounded-2xl backdrop-blur-xl border border-white/10 h-full"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span
                      className="px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1"
                      style={{
                        background: `${task.color}20`,
                        color: task.color,
                      }}
                    >
                      {task.priority === "High" && <AlertCircle className="size-3" />}
                      {task.priority === "Medium" && <Clock className="size-3" />}
                      {task.priority}
                    </span>
                    <ChevronRight className="size-4 text-white/30 group-hover:text-white/60 transition-colors" />
                  </div>
                  <h4 className="font-medium text-white mb-2 text-sm">
                    {task.title}
                  </h4>
                  <p className="text-xs text-white/40">{task.source}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
