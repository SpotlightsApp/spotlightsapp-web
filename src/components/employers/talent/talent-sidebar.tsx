"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Network, Users, PlusCircle, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

export function TalentSidebar() {
  const pathname = usePathname();

  const links = [
    { label: "Talent map", href: "/employers/talent", icon: Network, exact: true },
    { label: "Candidates", href: "/employers/talent/candidates", icon: Users, exact: false },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[220px] flex-col border-r border-border bg-background md:flex">
      <div className="flex h-16 items-center gap-2.5 px-5">
        <Logo href="/employers/talent" showWord={false} />
        <div className="leading-tight">
          <p className="text-sm font-semibold tracking-tight">Spotlights</p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-accent-strong">
            Employers
          </p>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1">
          {links.map((l) => {
            const active = l.exact
              ? pathname === l.href
              : pathname === l.href || pathname.startsWith(`${l.href}/`);
            const Icon = l.icon;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent-soft text-accent-strong"
                      : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
          Hiring
        </p>
        <ul className="mt-2 flex flex-col gap-1">
          <li>
            <Link
              href="/employers/register"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <PlusCircle className="h-4 w-4" />
              Post a job
            </Link>
          </li>
        </ul>
      </nav>
      <div className="border-t border-border px-3 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to student site
        </Link>
      </div>
    </aside>
  );
}
