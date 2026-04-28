import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MacroSignal } from "@/lib/types";

export function MacroSignalBanner({ signal }: { signal: MacroSignal }) {
  const isRisk = signal.type === "risk";

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border px-4 py-3",
        isRisk
          ? "border-[var(--red)]/30 bg-[var(--red)]/5"
          : "border-[var(--green)]/30 bg-[var(--green)]/5",
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
          isRisk ? "bg-[var(--red)]/10" : "bg-[var(--green)]/10",
        )}
      >
        {isRisk ? (
          <TrendingDown
            className="h-3.5 w-3.5 text-[var(--red)]"
            strokeWidth={2.5}
          />
        ) : (
          <TrendingUp
            className="h-3.5 w-3.5 text-[var(--green)]"
            strokeWidth={2.5}
          />
        )}
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-[10px] font-semibold uppercase tracking-widest",
              isRisk ? "text-[var(--red)]" : "text-[var(--green)]",
            )}
          >
            {isRisk ? "Macro Risk" : "Macro Opportunity"}
          </span>
        </div>
        <p className="small-text font-medium text-[var(--text)] leading-snug">
          {signal.headline}
        </p>
        <p className="small-text text-[var(--text-secondary)] leading-relaxed">
          {signal.detail}
        </p>
      </div>
    </div>
  );
}
