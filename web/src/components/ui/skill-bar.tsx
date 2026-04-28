"use client";

import { motion } from "framer-motion";

import { scoreColor } from "@/lib/scoring";

interface SkillBarProps {
  label: string;
  value: number;
}

export function SkillBar({ label, value }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[13px] font-medium text-[var(--text-secondary)]">
          {label}
        </span>
        <span className="text-[13px] font-semibold text-[var(--text)]">
          {value}
        </span>
      </div>
      <div className="h-[6px] overflow-hidden rounded-full bg-black/[0.08]">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ backgroundColor: scoreColor(value) }}
        />
      </div>
    </div>
  );
}
