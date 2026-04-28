"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Network, User } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/network", label: "Network", icon: Network },
  { href: "/profile", label: "Profile", icon: User },
];

export function AppShell({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="sticky top-0 z-20 border-b border-[var(--border-subtle)] bg-[rgba(247,243,238,0.9)] backdrop-blur">
        <div className="page-shell flex items-center justify-between py-4 md:py-5">
          <div className="space-y-1">
            <p className="section-label text-[var(--ink)]">Acumen</p>
            {title ? (
              <div>
                <h1 className="h2-text">{title}</h1>
                {subtitle ? (
                  <p className="small-text text-[var(--text-secondary)]">
                    {subtitle}
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="small-text text-[var(--text-secondary)]">
                Decision practice for next-gen leaders
              </p>
            )}
          </div>
          <nav className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "small-text transition",
                    isActive
                      ? "text-[var(--text)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text)]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--border)] bg-[rgba(247,243,238,0.95)] px-6 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-[420px] items-center justify-between">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full border transition",
                  isActive
                    ? "border-[var(--accent)] bg-[var(--accent-dim)] text-[var(--accent)]"
                    : "border-transparent text-[var(--text-secondary)]",
                )}
                aria-label={item.label}
              >
                <Icon className="h-5 w-5" />
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

