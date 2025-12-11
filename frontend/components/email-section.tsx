"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { api } from "@/lib/api";

/* ---- Types ---- */
type BackendEmail = {
  id: number;
  sender?: string;
  subject: string;
  body?: string;
  timestamp?: string;
  category?: string | null;
  summary?: string | null;
};

type UiEmail = {
  id: number;
  subject: string;
  summary?: string | null;
  category?: string | null;
  sender?: string;
};

/* ---- Mapper ---- */
function mapBackendToUi(emails: BackendEmail[]): UiEmail[] {
  if (!emails || emails.length === 0) return [];
  return emails.map((e) => ({
    id: e.id,
    subject: e.subject,
    summary: e.summary ?? e.body?.slice(0, 120) ?? "",
    category: e.category ?? null,
    sender: e.sender,
  }));
}

/* ---- Component ---- */
export function EmailSection() {
  const [emails, setEmails] = useState<UiEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listen for agent:ran events dispatched from the hero runAgent flow
  useEffect(() => {
    const handler = (ev: any) => {
      if (ev?.detail?.emails) {
        setEmails(mapBackendToUi(ev.detail.emails));
      }
    };
    window.addEventListener("agent:ran", handler);
    return () => window.removeEventListener("agent:ran", handler);
  }, []);

  // Initial load from backend on mount
  useEffect(() => {
    setLoading(true);
    api
      .getEmailsToday<BackendEmail[]>()
      .then((data) => {
        setEmails(mapBackendToUi(data));
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load emails");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 mb-4">
            <Mail className="size-4 text-neon-cyan" />
            <span className="text-sm text-neon-cyan">Email Planet</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Intelligent Email Triage</h2>
          <p className="text-white/60 max-w-xl mx-auto">
            AI agents categorize and summarize your inbox into actionable insights
          </p>
        </motion.div>

        {loading && <p className="text-center text-sm text-white/60">Loading emails…</p>}
        {error && <p className="text-center text-sm text-red-400">{error}</p>}

        {!loading && !error && (
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="p-6 rounded-2xl backdrop-blur-xl border border-white/10">
              <h3 className="font-semibold text-white">AI Email Summary</h3>
              <p className="text-sm text-white/50">{emails.length} emails categorized</p>
            </div>

            {emails.length === 0 && (
              <p className="text-center text-sm text-red-400">No emails to show</p>
            )}

            {emails.map((e) => (
              <div key={e.id} className="p-4 rounded-2xl backdrop-blur-xl border border-white/5">
                <p className="font-medium text-white">{e.subject}</p>
                <p className="text-xs text-white/60 mt-1">{e.summary}</p>
                {e.category && <span className="text-xs text-white/40 mt-1">{e.category}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default EmailSection;
