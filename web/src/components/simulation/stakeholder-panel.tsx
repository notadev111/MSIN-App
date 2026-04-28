"use client";

import { useState } from "react";
import { ChevronDown, FileText, Briefcase, Users, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StakeholderDoc, StakeholderDocType } from "@/lib/types";

const docTypeConfig: Record<
  StakeholderDocType,
  { label: string; icon: React.ElementType; color: string }
> = {
  financial: { label: "Financial", icon: Briefcase, color: "text-[var(--green)]" },
  legal: { label: "Legal", icon: FileText, color: "text-[var(--amber)]" },
  employment: { label: "Employment", icon: Users, color: "text-[#7c9cf5]" },
  press: { label: "Press", icon: Newspaper, color: "text-[var(--text-secondary)]" },
};

function relevanceLabel(score: number) {
  if (score >= 80) return { text: "High relevance", color: "text-[var(--green)]" };
  if (score >= 50) return { text: "Medium relevance", color: "text-[var(--amber)]" };
  return { text: "Low relevance", color: "text-[var(--text-muted)]" };
}

interface StakeholderPanelProps {
  docs: StakeholderDoc[];
  docsRead: Set<string>;
  onDocRead: (id: string) => void;
}

export function StakeholderPanel({ docs, docsRead, onDocRead }: StakeholderPanelProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  function toggle(id: string) {
    const opening = expanded !== id;
    setExpanded(opening ? id : null);
    if (opening) onDocRead(id);
  }

  return (
    <div className="space-y-2">
      <p className="section-label">Stakeholder Intelligence</p>
      <p className="small-text text-[var(--text-muted)] pb-1">
        Review relevant documents before deciding. Your reading behaviour is tracked.
      </p>
      <div className="space-y-2">
        {docs.map((doc) => {
          const isOpen = expanded === doc.id;
          const isRead = docsRead.has(doc.id);
          const { label: typeLabel, icon: Icon, color } = docTypeConfig[doc.type];
          const rel = relevanceLabel(doc.relevanceScore);

          return (
            <div
              key={doc.id}
              className={cn(
                "surface-card transition-all duration-200",
                isRead && "border-[var(--border)]",
                !isRead && "border-dashed",
              )}
            >
              <button
                type="button"
                onClick={() => toggle(doc.id)}
                className="flex w-full items-start justify-between gap-3 text-left"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border",
                      isRead
                        ? "border-[var(--border)] bg-[var(--surface-raised)]"
                        : "border-dashed border-[var(--border)]",
                    )}
                  >
                    <Icon className={cn("h-3.5 w-3.5", color)} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="section-label">{typeLabel}</span>
                      <span className={cn("text-[10px] font-medium", rel.color)}>
                        {rel.text}
                      </span>
                    </div>
                    <p className="small-text text-[var(--text)] mt-0.5 leading-snug">
                      {doc.title}
                    </p>
                    {!isOpen && (
                      <p className="small-text text-[var(--text-secondary)] mt-1 line-clamp-1">
                        {doc.summary}
                      </p>
                    )}
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "mt-1 h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              {isOpen && (
                <div className="mt-3 pt-3 border-t border-[var(--border-subtle)]">
                  <p className="small-text text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                    {doc.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="small-text text-[var(--text-muted)] pt-1">
        {docsRead.size} of {docs.length} documents reviewed
      </p>
    </div>
  );
}
