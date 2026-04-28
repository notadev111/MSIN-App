"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Network, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAppState } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/page-transition";

const proofPoints = [
  {
    title: "Run the crisis",
    description: "Three short rounds model succession, governance, and market pressure.",
    icon: ShieldCheck,
  },
  {
    title: "Read the signal",
    description: "Choices become a leadership profile across strategy, ethics, and bias.",
    icon: BarChart3,
  },
  {
    title: "Find the counterweight",
    description: "Match with peers whose strengths complement your decision style.",
    icon: Network,
  },
];

export default function LandingPage() {
  const router = useRouter();
  const { seedReturningUser, state } = useAppState();

  return (
    <PageTransition>
      <main className="page-shell flex min-h-screen flex-col justify-between">
        <section className="grid min-h-[58vh] gap-8 py-8 md:grid-cols-[minmax(0,1fr)_360px] md:items-center md:py-10">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="section-label text-[var(--ink)]">Acumen</p>
              <h1 className="display-text max-w-[12ch]">
                Practise judgment before it counts.
              </h1>
              <p className="body-text max-w-[34ch] text-[var(--text-secondary)]">
                Short business simulations for emerging leaders building
                sharper strategy, ethics, and stakeholder instincts.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[13px] font-semibold text-[var(--text-secondary)]">
              <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2">
                3 decisions
              </span>
              <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2">
                4 minutes
              </span>
              <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2">
                instant signal
              </span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={state.hasOnboarded ? "/dashboard" : "/onboarding"}>
                <Button className="w-full sm:w-auto">
                  {state.hasOnboarded ? "Open dashboard" : "Start simulation"}
                </Button>
              </Link>
              <Button
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => {
                  seedReturningUser();
                  router.push("/dashboard");
                }}
              >
                View demo profile
              </Button>
            </div>
          </div>

          <div className="surface-card hero-panel space-y-5">
            <div>
              <p className="section-label text-white/65">Core loop</p>
              <h2 className="mt-2 text-[32px] font-semibold leading-tight">
                Simulate. Signal. Connect.
              </h2>
            </div>
            <div className="space-y-4 text-white/82">
              <div className="border-b border-white/12 pb-4">
                <p className="text-[28px] font-bold leading-none">01</p>
                <p className="body-text mt-2">Decide under pressure.</p>
              </div>
              <div className="border-b border-white/12 pb-4">
                <p className="text-[28px] font-bold leading-none">02</p>
                <p className="body-text mt-2">See your leadership pattern.</p>
              </div>
              <div>
                <p className="text-[28px] font-bold leading-none">03</p>
                <p className="body-text mt-2">Connect with complementary peers.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4 pb-10">
          <div className="space-y-2">
            <p className="section-label">What the MVP proves</p>
            <h2 className="h1-text max-w-[18ch]">A complete loop, not a static course.</h2>
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            {proofPoints.map((point) => {
              const Icon = point.icon;

              return (
                <article key={point.title} className="surface-card space-y-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--ink-soft)] text-[var(--ink)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="h3-text">{point.title}</h3>
                    <p className="body-text text-[var(--text-secondary)]">
                      {point.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <footer className="flex flex-col gap-3 border-t border-[var(--border-subtle)] py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="small-text max-w-[48ch] text-[var(--text-secondary)]">
            Built as a feasibility prototype for business judgment, peer matching,
            and APAC family-business leadership scenarios.
          </p>
          <Link href={state.hasOnboarded ? "/dashboard" : "/onboarding"}>
            <span className="small-text inline-flex items-center gap-2 text-[var(--text)]">
              Enter product
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </footer>
      </main>
    </PageTransition>
  );
}
