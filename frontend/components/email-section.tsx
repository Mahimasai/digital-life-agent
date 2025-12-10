"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Star, Clock, Newspaper, Sparkles } from "lucide-react";
import { api, BackendEmail } from "@/lib/api";

// UI type
type UiEmail = {
  id: number;
  categoryLabel: string;
  color: string;
  subject: string;
  summary: string;
  Icon: typeof Star;
};

// Map backend → pretty UI
function mapBackendToUi(emails: BackendEmail[]): UiEmail[] {
  return emails.map((e, idx) => {
    const category = e.category?.toLowerCase() || "other";

    if (category.includes("important") || category.includes("urgent")) {
      return {
        id: e.id ?? idx,
        categoryLabel: "Important",
        color: "#ef4444",
        subject: e.subject,
        summary: e.summary,
        Icon: Star,
      };
    }

    if (category.includes("later") || category.includes("follow")) {
      return {
        id: e.id ?? idx,
        categoryLabel: "Later",
        color: "#f59e0b",
        subject: e.subject,
        summary: e.summary,
        Icon: Clock,
      };
    }

    if (category.includes("news") || category.includes("digest")) {
      return {
        id: e.id ?? idx,
        categoryLabel: "Newsletter",
        color: "#06b6d4",
        subject: e.subject,
        summary: e.summary,
        Icon: Newspaper,
      };
    }

    // default
    return {
      id: e.id ?? idx,
      categoryLabel: e.category || "Other",
      color: "#8b5cf6",
      subject: e.subject,
      summary: e.summary,
      Icon: Mail,
    };
  });
}

export function EmailSection() {
  const [emails, setEmails] = useState<UiEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getEmails()
      .then((data) => setEmails(mapBackendToUi(data)))
      .catch(() => setError("Failed to load emails"))
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 mb-4">
            <Mail className="size-4 text-neon-cyan" />
            <span className="text-sm text-neon-cyan">Email Planet</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Intelligent Email Triage
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            AI agents categorize and summarize your inbox into actionable
            insights
          </p>
        </motion.div>

        {/* Loading / error states */}
        {loading && (
          <p className="text-center text-sm text-white/60 mb-4">
            Summoning your inbox…
          </p>
        )}
        {error && (
          <p className="text-center text-sm text-red-400 mb-4">{error}</p>
        )}

        {/* Email orb / panel */}
        {!loading && !error && (
          <motion.div
            className="relative mx-auto max-w-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Glowing orb background */}
            <div
              className="absolute inset-0 rounded-3xl opacity-30 blur-3xl -z-10"
              style={{
                background:
                  "radial-gradient(circle at center, #06b6d4 0%, transparent 70%)",
              }}
            />

            <div
              className="p-8 rounded-3xl backdrop-blur-xl border border-white/10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(255,255,255,0.05) 100%)",
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="p-2 rounded-xl bg-neon-cyan/20">
                  <Sparkles className="size-5 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Email Summary</h3>
                  <p className="text-sm text-white/50">
                    {emails.length} emails categorized
                  </p>
                </div>
              </div>

              {/* Email cards */}
              <div className="space-y-4">
                {emails.map((email, index) => (
                  <motion.div
                    key={email.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{ background: `${email.color}20` }}
                      >
                        <email.Icon
                          className="size-4"
                          style={{ color: email.color }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              background: `${email.color}20`,
                              color: email.color,
                            }}
                          >
                            {email.categoryLabel}
                          </span>
                        </div>
                        <h4 className="font-medium text-white truncate">
                          {email.subject}
                        </h4>
                        <p className="text-sm text-white/50 truncate">
                          {email.summary}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
