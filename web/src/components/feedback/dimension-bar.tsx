"use client";

import { useEffect, useRef, useState } from "react";
import { scoreColor } from "@/lib/scoring";

interface DimensionBarProps {
  label: string;
  framework: string;
  value: number;
  animate?: boolean;
}

export function DimensionBar({
  label,
  framework,
  value,
  animate = true,
}: DimensionBarProps) {
  const [displayed, setDisplayed] = useState(animate ? 0 : value);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const duration = 900;

  useEffect(() => {
    if (!animate) {
      setDisplayed(value);
      return;
    }

    function step(timestamp: number) {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplayed(Math.round(eased * value));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    }

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, animate]);

  const color = scoreColor(value);

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="small-text font-medium text-[var(--text)]">{label}</p>
          <p className="text-[11px] text-[var(--text-muted)]">{framework}</p>
        </div>
        <span
          className="text-[22px] font-bold leading-none tabular-nums"
          style={{ color }}
        >
          {displayed}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface-raised)]">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${displayed}%`,
            backgroundColor: color,
            transition: animate ? "none" : undefined,
          }}
        />
      </div>
    </div>
  );
}
