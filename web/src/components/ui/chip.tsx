import { cn } from "@/lib/utils";

interface ChipProps {
  label: string;
  selected?: boolean;
}

export function Chip({ label, selected = false }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-2 text-[11px] font-medium uppercase tracking-[0.06em] transition duration-150",
        selected
          ? "border-[var(--accent)] bg-[var(--accent-dim)] text-[var(--accent)]"
          : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]",
      )}
    >
      {label}
    </span>
  );
}
