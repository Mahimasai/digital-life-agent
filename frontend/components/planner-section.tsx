"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { api, BackendScheduleBlock } from "@/lib/api";

type UiScheduleBlock = {
  start: string;
  end: string;
  label: string;
  type: string;
  color: string;
};

function mapBackendToUi(blocks: BackendScheduleBlock[]): UiScheduleBlock[] {
  return blocks.map((b) => {
    const t = b.type.toLowerCase();
    let color = "#06b6d4"; // default teal

    if (t.includes("meeting")) color = "#ec4899";
    else if (t.includes("deep") || t.includes("focus")) color = "#f59e0b";
    else if (t.includes("break") || t.includes("lunch")) color = "#22c55e";
    else if (t.includes("admin")) color = "#8b5cf6";

    return { ...b, color };
  });
}

export function PlannerSection() {
  const [schedule, setSchedule] = useState<UiScheduleBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getSchedule()
      .then((data) => setSchedule(mapBackendToUi(data)))
      .catch(() => setError("Failed to load schedule"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-purple/30 bg-neon-purple/10 mb-4">
            <Calendar className="size-4 text-neon-purple" />
            <span className="text-sm text-neon-purple">Planner Planet</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Orbital Day Planner
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Your schedule visualized as glowing orbital segments
          </p>
        </motion.div>

        {loading && (
          <p className="text-center text-sm text-white/60 mb-4">
            Loading schedule…
          </p>
        )}

        {error && (
          <p className="text-center text-sm text-red-400 mb-4">{error}</p>
        )}

        {!loading && !error && (
          <div className="relative max-w-lg mx-auto aspect-square">
            {/* Orbit rings */}
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-8 rounded-full border border-white/10" />
            <div className="absolute inset-16 rounded-full border border-white/5" />

            {/* Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
                  boxShadow: "0 0 60px rgba(139, 92, 246, 0.5)",
                }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <span className="text-2xl font-bold text-white">Today</span>
              </motion.div>
            </div>

            {/* Schedule segments on orbit */}
            {schedule.map((item, index) => {
              const angle = (index / schedule.length) * 360 - 90;
              const radius = 45;
              const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
              const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

              return (
                <motion.div
                  key={`${item.start}-${item.label}-${index}`}
                  className="absolute"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="relative group cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                  >
                    {/* Glow */}
                    <div
                      className="absolute inset-0 rounded-2xl blur-xl opacity-50 -z-10"
                      style={{ background: item.color }}
                    />
                    <div
                      className="px-3 py-2 rounded-2xl backdrop-blur-xl border border-white/20 min-w-max"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}30 0%, ${item.color}10 100%)`,
                        boxShadow: `0 0 20px ${item.color}40`,
                      }}
                    >
                      <p className="text-xs font-semibold text-white">
                        {item.start}
                      </p>
                      <p className="text-xs text-white/70">{item.label}</p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
