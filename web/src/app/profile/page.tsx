"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AppShell } from "@/components/app/app-shell";
import { useAppState } from "@/components/providers/app-provider";
import { PageTransition } from "@/components/ui/page-transition";
import { SkillBar } from "@/components/ui/skill-bar";
import { dimensions } from "@/lib/scoring";
import { formatDate } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();
  const { isHydrated, latestResult, state } = useAppState();

  useEffect(() => {
    if (!isHydrated) return;
    if (!state.hasOnboarded) {
      router.replace("/");
    }
  }, [isHydrated, router, state.hasOnboarded]);

  return (
    <AppShell title="Profile" subtitle="Your current skill profile">
      <PageTransition>
        <div className="page-shell space-y-8">
          <section className="space-y-2">
            <h1 className="h1-text">{state.user?.name ?? "Student"}</h1>
            <p className="body-text text-[var(--text-secondary)]">
              {(state.user?.role ?? "founder").toUpperCase()} /{" "}
              {state.user?.university ?? "University"}
            </p>
          </section>

          <section className="surface-card space-y-5">
            <div>
              <p className="section-label">Skills</p>
              <h2 className="h2-text mt-2">Current profile</h2>
            </div>
            <div className="space-y-5">
              {dimensions.map((dim) => (
                <SkillBar
                  key={dim.id}
                  label={dim.label}
                  value={latestResult?.scores[dim.id] ?? 0}
                />
              ))}
            </div>
            <p className="small-text text-[var(--text-secondary)]">
              Based on {state.results.length || 0} simulation
              {state.results.length === 1 ? "" : "s"}
            </p>
          </section>

          {latestResult ? (
            <section className="surface-card space-y-4">
              <div>
                <p className="section-label">History</p>
                <h2 className="h2-text mt-2">Latest result</h2>
              </div>
              <div className="flex flex-col gap-3 border-t border-[var(--border-subtle)] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="body-text">{latestResult.scenarioTitle}</p>
                  <p className="small-text text-[var(--text-secondary)]">
                    {formatDate(latestResult.completedAt)}
                  </p>
                </div>
                <span className="inline-flex w-fit rounded-full border border-[var(--border)] px-3 py-2 text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--text)]">
                  Score {latestResult.totalScore}
                </span>
              </div>
            </section>
          ) : null}
        </div>
      </PageTransition>
    </AppShell>
  );
}
