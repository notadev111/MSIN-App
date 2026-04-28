import { cn } from "@/lib/utils";

export function ProgressDots({
  total,
  active,
}: {
  total: number;
  active: number;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, index) => {
        const isActive = index === active;
        const isComplete = index < active;

        return (
          <span
            key={index}
            className={cn(
              "h-2 rounded-full transition-all duration-150",
              isActive && "w-8 bg-[var(--accent)]",
              isComplete && "w-2 bg-[var(--accent)]",
              !isActive && !isComplete && "w-2 bg-[var(--border)]",
            )}
          />
        );
      })}
    </div>
  );
}
