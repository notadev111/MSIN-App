"use client";

import { CheckCircle2, AlertTriangle } from "lucide-react";
import type { LeadershipStyle } from "@/lib/types";

interface Props {
  style: LeadershipStyle;
}

const styleAccents: Record<string, { bg: string; border: string; dot: string }> = {
  strategic_thinker: {
    bg: "bg-[var(--green)]/8",
    border: "border-[var(--green)]/30",
    dot: "bg-[var(--green)]",
  },
  overconfident_executor: {
    bg: "bg-[var(--amber)]/8",
    border: "border-[var(--amber)]/30",
    dot: "bg-[var(--amber)]",
  },
  loyalty_driven: {
    bg: "bg-[var(--accent)]/8",
    border: "border-[var(--accent)]/30",
    dot: "bg-[var(--accent)]",
  },
  emotionally_reactive: {
    bg: "bg-[var(--red)]/8",
    border: "border-[var(--red)]/30",
    dot: "bg-[var(--red)]",
  },
};

export function LeadershipStyleCard({ style }: Props) {
  const accent = styleAccents[style.id] ?? styleAccents.strategic_thinker;

  return (
    <div className="space-y-5">
      <div>
        <p className="section-label">Leadership Profile</p>
        <h2 className="h2-text mt-1">Your Style</h2>
      </div>

      {/* Style identity block */}
      <div className={`rounded-xl border p-5 space-y-2 ${accent.bg} ${accent.border}`}>
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${accent.dot}`} />
          <p className="section-label tracking-widest uppercase text-[var(--text-muted)]">
            {style.id.replace(/_/g, " ")}
          </p>
        </div>
        <h3 className="text-[22px] font-bold leading-tight text-[var(--text)]">
          {style.label}
        </h3>
        <p className="small-text font-medium text-[var(--text-secondary)] italic">
          {style.tagline}
        </p>
      </div>

      {/* Description */}
      <p className="body-text text-[var(--text-secondary)] leading-relaxed">
        {style.description}
      </p>

      {/* Strengths + watch-outs */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[var(--green)]" />
            <p className="section-label">Strengths</p>
          </div>
          <ul className="space-y-2">
            {style.strengths.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--green)]" />
                <span className="small-text text-[var(--text-secondary)]">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-[var(--amber)]" />
            <p className="section-label">Watch Outs</p>
          </div>
          <ul className="space-y-2">
            {style.watchOuts.map((w) => (
              <li key={w} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--amber)]" />
                <span className="small-text text-[var(--text-secondary)]">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
