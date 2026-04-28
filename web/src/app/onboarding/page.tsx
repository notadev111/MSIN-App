"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { ProgressDots } from "@/components/app/progress-dots";
import { useAppState } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { PageTransition } from "@/components/ui/page-transition";
import { focusSkills, roles } from "@/lib/demo-data";
import type { RoleId, SkillId } from "@/lib/types";

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding, state } = useAppState();
  const [step, setStep] = useState(0);
  const [name, setName] = useState(state.user?.name ?? "");
  const [university, setUniversity] = useState(state.user?.university ?? "");
  const [role, setRole] = useState<RoleId>(state.user?.role ?? "founder");
  const [selectedSkills, setSelectedSkills] = useState<SkillId[]>(
    state.user?.focusSkills ?? ["strategicJudgment", "adaptability"],
  );

  const canContinue = useMemo(() => {
    if (step === 0) {
      return true;
    }

    if (step === 1) {
      return name.trim().length > 1 && university.trim().length > 1;
    }

    return selectedSkills.length >= 1 && selectedSkills.length <= 3;
  }, [name, selectedSkills, step, university]);

  const toggleSkill = (skillId: SkillId) => {
    setSelectedSkills((current) => {
      if (current.includes(skillId)) {
        return current.filter((item) => item !== skillId);
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, skillId];
    });
  };

  return (
    <PageTransition>
      <main className="page-shell flex min-h-screen items-center">
        <section className="mx-auto flex w-full max-w-[560px] flex-col gap-10">
          <div className="space-y-4">
            <ProgressDots total={3} active={step} />
            {step === 0 ? (
              <div className="space-y-4">
                <p className="section-label text-[var(--ink)]">Acumen</p>
                <h1 className="display-text max-w-[12ch]">
                  Build judgment under pressure.
                </h1>
                <p className="body-text max-w-[36ch] text-[var(--text-secondary)]">
                  Practise strategy, ethics, and stakeholder decisions before they become real business moments.
                </p>
              </div>
            ) : null}
            {step === 1 ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="section-label">Setup</p>
                  <h1 className="h1-text">Tell us a little context.</h1>
                </div>
                <div className="space-y-5">
                  <label className="block space-y-2">
                    <span className="small-text text-[var(--text-secondary)]">
                      Name
                    </span>
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="w-full rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                      placeholder="Daniel"
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="small-text text-[var(--text-secondary)]">
                      University
                    </span>
                    <input
                      value={university}
                      onChange={(event) => setUniversity(event.target.value)}
                      className="w-full rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                      placeholder="UCL"
                    />
                  </label>
                  <div className="space-y-3">
                    <span className="small-text text-[var(--text-secondary)]">
                      Role or interest
                    </span>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {roles.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setRole(item.id)}
                          className={`rounded-[8px] border px-4 py-3 text-left text-[15px] transition ${
                            role === item.id
                              ? "border-[var(--accent)] bg-[var(--accent-dim)] text-[var(--text)]"
                              : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[#333333]"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {step === 2 ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="section-label">Focus</p>
                  <h1 className="h1-text">What do you want to get better at?</h1>
                  <p className="body-text text-[var(--text-secondary)]">
                    Pick up to three areas to keep in view as you work through
                    your first scenario.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {focusSkills.map((skill) => {
                    const selected = selectedSkills.includes(skill.id);

                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => toggleSkill(skill.id)}
                      >
                        <Chip label={skill.label} selected={selected} />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-6">
            <Button
              variant="ghost"
              onClick={() => {
                if (step === 0) {
                  router.push("/");
                  return;
                }

                setStep((current) => current - 1);
              }}
            >
              {step === 0 ? "Back" : "Previous"}
            </Button>
            <Button
              disabled={!canContinue}
              onClick={() => {
                if (step < 2) {
                  setStep((current) => current + 1);
                  return;
                }

                completeOnboarding({
                  name: name.trim(),
                  university: university.trim(),
                  role,
                  focusSkills: selectedSkills,
                });
                router.push("/simulation");
              }}
            >
              {step < 2 ? "Continue" : "Start my first simulation"}
            </Button>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}

