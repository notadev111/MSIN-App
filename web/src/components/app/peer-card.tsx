"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { focusSkills } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import type { Peer } from "@/lib/types";

function getSkillLabel(skillId: Peer["skills"][number]) {
  return focusSkills.find((skill) => skill.id === skillId)?.label ?? skillId;
}

interface PeerCardProps {
  peer: Peer;
  connected: boolean;
  compact?: boolean;
  onToggle: () => void;
}

export function PeerCard({
  peer,
  connected,
  compact = false,
  onToggle,
}: PeerCardProps) {
  return (
    <article
      className={cn(
        "surface-card flex h-full flex-col justify-between",
        compact ? "min-h-[220px]" : "min-h-[320px]",
      )}
    >
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-raised)] text-[13px] font-semibold text-[var(--text-secondary)]">
              {peer.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="space-y-1">
              <h3 className="h3-text">{peer.name}</h3>
              <p className="small-text text-[var(--text-secondary)]">
                {peer.role} / {peer.university}
              </p>
            </div>
          </div>
          <span className="small-text text-[var(--text-secondary)]">
            {peer.compatibility}% match
          </span>
        </div>
        <p className="body-text text-[var(--text-secondary)]">{peer.bio}</p>
        <div className="flex flex-wrap gap-2">
          {peer.skills.slice(0, 3).map((skill) => (
            <Chip key={skill} label={getSkillLabel(skill)} selected />
          ))}
        </div>
      </div>
      <div className="mt-6 border-t border-[var(--border-subtle)] pt-5">
        <Button
          variant={connected ? "ghost" : "secondary"}
          fullWidth
          onClick={onToggle}
          className={cn(
            connected
              ? "justify-between text-[var(--text-secondary)]"
              : "justify-between",
          )}
        >
          <span>{connected ? "Connected" : "Connect"}</span>
          {!connected ? <ArrowRight className="h-4 w-4" /> : null}
        </Button>
      </div>
    </article>
  );
}
