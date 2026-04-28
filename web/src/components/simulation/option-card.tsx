"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RoundOption, VroomStyle } from "@/lib/types";

const vroomBadge: Record<VroomStyle, { short: string; color: string }> = {
  AI: { short: "AI", color: "text-[var(--text-muted)]" },
  AII: { short: "AII", color: "text-[var(--text-muted)]" },
  CI: { short: "CI", color: "text-[var(--text-muted)]" },
  CII: { short: "CII", color: "text-[var(--text-secondary)]" },
  GII: { short: "GII", color: "text-[var(--text-secondary)]" },
};

interface OptionCardProps {
  option: RoundOption;
  selected: boolean;
  onSelect: () => void;
  index: number;
}

const labels = ["A", "B", "C", "D"];

export function OptionCard({ option, selected, onSelect, index }: OptionCardProps) {
  const badge = vroomBadge[option.vroomStyle];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "surface-card group flex w-full items-start justify-between gap-4 text-left transition duration-150",
        selected
          ? "border-[var(--accent)] bg-[var(--accent-dim)]"
          : "hover:border-[#c4b8ae]",
      )}
    >
      <div className="flex items-start gap-3 min-w-0">
        {/* Option label */}
        <span
          className={cn(
            "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold transition",
            selected
              ? "bg-[var(--accent)] text-white"
              : "border border-[var(--border)] text-[var(--text-muted)] group-hover:border-[#c4b8ae]",
          )}
        >
          {labels[index]}
        </span>

        <div className="space-y-1 min-w-0">
          <h3 className="h3-text leading-snug">{option.title}</h3>
          <p className="small-text text-[var(--text-secondary)] leading-relaxed">
            {option.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <span
          className={cn(
            "mt-1 flex h-5 w-5 items-center justify-center rounded-full border transition",
            selected
              ? "border-[var(--accent)] bg-[var(--accent)] text-white"
              : "border-[var(--border)]",
          )}
        >
          {selected ? <Check className="h-3 w-3" /> : null}
        </span>
        {/* Vroom style hint - visible on hover or when selected */}
        <span
          className={cn(
            "text-[10px] font-mono font-medium transition-opacity",
            badge.color,
            selected ? "opacity-100" : "opacity-0 group-hover:opacity-60",
          )}
        >
          {badge.short}
        </span>
      </div>
    </button>
  );
}
