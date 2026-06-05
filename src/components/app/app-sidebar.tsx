"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Compass, Briefcase, Inbox, Building2, Calendar, LogOut } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { createClient } from "@/lib/supabase/client";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { label: t.appNav.jobs, href: "/jobs", icon: Briefcase },
    { label: t.appNav.inbox, href: "/inbox", icon: Inbox },
    { label: t.appNav.companies, href: "/companies", icon: Building2 },
    { label: t.appNav.events, href: "/events", icon: Calendar },
    { label: t.appNav.explore, href: "/explore", icon: Compass },
  ];

  async function handleLogout() {
    await createClient().auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[220px] flex-col border-r border-border bg-background md:flex">
      <div className="flex h-16 items-center px-5">
        <Logo href="/dashboard" />
      </div>
      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
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
      </nav>
      <div className="flex items-center justify-between border-t border-border px-3 py-3">
        <LanguageToggle />
        <button
          type="button"
          onClick={handleLogout}
          aria-label={t.appNav.logout}
          title={t.appNav.logout}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
