"use client";

import { useState } from "react";
import { Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { EthicalPrompt } from "@/lib/types";

interface EthicalPromptCardProps {
  prompt: EthicalPrompt;
  onConfirm: (optionId: string) => void;
}

export function EthicalPromptCard({ prompt, onConfirm }: EthicalPromptCardProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--amber)]/10 border border-[var(--amber)]/30">
          <Scale className="h-4 w-4 text-[var(--amber)]" />
        </div>
        <div>
          <p className="section-label text-[var(--amber)]">Ethical Dilemma</p>
          <h3 className="h3-text mt-1">{prompt.question}</h3>
        </div>
      </div>

      <p className="body-text text-[var(--text-secondary)] leading-relaxed pl-11">
        {prompt.context}
      </p>

      <div className="space-y-2 pl-11">
        {prompt.options.map((option) => {
          const isSelected = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelected(option.id)}
              className={cn(
                "surface-card flex w-full items-start justify-between gap-4 text-left transition duration-150",
                isSelected
                  ? "border-[var(--amber)] bg-[color-mix(in_srgb,var(--amber)_8%,transparent)]"
                  : "hover:border-[#c4b8ae]",
              )}
            >
              <p className="small-text text-[var(--text)]">{option.text}</p>
              <span
                className={cn(
                  "mt-0.5 flex h-4 w-4 shrink-0 rounded-full border transition",
                  isSelected
                    ? "border-[var(--amber)] bg-[var(--amber)]"
                    : "border-[var(--border)]",
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="pl-11">
        {selected ? (
          <Button onClick={() => onConfirm(selected)}>
            Confirm ethical stance
          </Button>
        ) : (
          <p className="small-text text-[var(--text-muted)]">
            Select a response to continue.
          </p>
        )}
      </div>
    </div>
  );
}
