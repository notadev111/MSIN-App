import { cn } from "@/lib/utils";
import { vroomStyles } from "@/lib/scoring";
import type { VroomProfile, VroomStyle } from "@/lib/types";

const styleOrder: VroomStyle[] = ["AI", "AII", "CI", "CII", "GII"];

export function VroomCard({ profile }: { profile: VroomProfile }) {
  const total = Object.values(profile.distribution).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="space-y-5">
      <div>
        <p className="section-label">Decision Style</p>
        <h2 className="h2-text mt-2">{profile.label}</h2>
        <p className="body-text text-[var(--text-secondary)] mt-1">
          {profile.description}
        </p>
      </div>

      {/* Vroom spectrum bar */}
      <div className="space-y-3">
        <div className="flex gap-1">
          {styleOrder.map((style) => {
            const pct = (profile.distribution[style] / total) * 100;
            const isDominant = style === profile.dominant;
            return (
              <div
                key={style}
                className={cn(
                  "h-2 rounded-full transition-all",
                  isDominant
                    ? "bg-[var(--accent)]"
                    : "bg-[var(--surface-raised)]",
                )}
                style={{ width: `${pct}%`, minWidth: pct > 0 ? "4px" : "0" }}
              />
            );
          })}
        </div>
        <div className="flex items-start justify-between">
          {styleOrder.map((style) => {
            const count = profile.distribution[style];
            const isDominant = style === profile.dominant;
            return (
              <div
                key={style}
                className={cn(
                  "flex flex-col items-center gap-0.5",
                  isDominant ? "opacity-100" : "opacity-40",
                )}
              >
                <span
                  className={cn(
                    "text-[11px] font-bold font-mono",
                    isDominant ? "text-[var(--accent)]" : "text-[var(--text-muted)]",
                  )}
                >
                  {style}
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  {count}×
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Style description */}
      <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4 space-y-2">
        <p className="section-label">{vroomStyles[profile.dominant].label}</p>
        <p className="small-text text-[var(--text-secondary)]">
          {vroomStyles[profile.dominant].description}
        </p>
      </div>
    </div>
  );
}
