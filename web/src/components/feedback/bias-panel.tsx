import { AlertTriangle, CheckCircle } from "lucide-react";
import { biasMetadata } from "@/lib/scoring";
import type { BiasIncident } from "@/lib/types";

export function BiasPanel({ biases }: { biases: BiasIncident[] }) {
  // Deduplicate by bias type (keep first occurrence)
  const unique = biases.filter(
    (incident, index, arr) =>
      arr.findIndex((b) => b.bias === incident.bias) === index,
  );

  return (
    <div className="space-y-4">
      <div>
        <p className="section-label">Cognitive Bias Analysis</p>
        <p className="small-text text-[var(--text-secondary)] mt-1">
          Biases detected from your decision pattern across all rounds.
        </p>
      </div>

      {unique.length === 0 ? (
        <div className="flex items-start gap-3 rounded-lg border border-[var(--green)]/30 bg-[var(--green)]/5 px-4 py-3">
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--green)]" />
          <div className="space-y-0.5">
            <p className="small-text font-medium text-[var(--text)]">
              No significant biases detected
            </p>
            <p className="small-text text-[var(--text-secondary)]">
              Your decisions reflected a clean, evidence-driven pattern across all
              five rounds. This is a strong marker of deliberate leadership.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {unique.map((incident) => {
            const meta = biasMetadata[incident.bias];
            return (
              <div
                key={incident.bias}
                className="rounded-lg border border-[var(--amber)]/30 bg-[var(--amber)]/5 px-4 py-3 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-[var(--amber)]" />
                  <span className="small-text font-semibold text-[var(--text)]">
                    {meta.label}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    - {incident.roundTitle}
                  </span>
                </div>
                <p className="small-text text-[var(--text-secondary)] leading-relaxed">
                  {meta.description}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
        Based on Behavioral Economics research and Upper Echelons Theory (Hambrick &
        Mason, 1984). Biases are identified from decision patterns, not individual choices.
      </p>
    </div>
  );
}
