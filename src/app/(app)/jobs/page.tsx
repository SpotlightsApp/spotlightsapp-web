import Link from "next/link";
import type { Metadata } from "next";
import { Send, Bookmark, Eye } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDict } from "@/lib/i18n/server";
import { fill } from "@/lib/i18n/dictionaries";
import { getDisplayName } from "@/lib/user";
import { loadProfile } from "../profile/actions";
import { profileCompletion } from "../profile/profile-data";

export const metadata: Metadata = { title: "Jobs — Spotlights" };

export default async function JobsPage() {
  const t = await getDict();
  const name = await getDisplayName();
  const profile = await loadProfile();
  const completion = profileCompletion(profile);

  const stats = [
    { icon: Send, label: t.dashboard.applications, value: 0 },
    { icon: Bookmark, label: t.dashboard.savedJobs, value: 0 },
    { icon: Eye, label: t.dashboard.profileViews, value: 0 },
  ];

  return (
    <Container className="py-10">
      <header>
        <h1 className="font-display text-3xl text-foreground sm:text-4xl">
          {fill(t.dashboard.welcome, { name: name.split(" ")[0] })}
        </h1>
        <p className="mt-2 text-muted-foreground">{t.dashboard.sub}</p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <Card key={s.label} className="p-5">
                <s.icon className="h-5 w-5 text-accent-strong" />
                <div className="mt-3 text-2xl font-semibold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </Card>
            ))}
          </div>

          {/* Recommended */}
          <section>
            <h2 className="text-xl font-semibold">{t.dashboard.recommended}</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {t.dashboard.emptyState}
            </p>
          </section>

          {/* Applications */}
          <section>
            <h2 className="text-xl font-semibold">{t.dashboard.yourApplications}</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {t.dashboard.noApplications}
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold">{t.dashboard.profileStrength}</h3>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t.dashboard.completion}</span>
              <span className="font-semibold text-accent-strong">
                {completion}%
              </span>
            </div>
            <div
              className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-2"
              role="progressbar"
              aria-valuenow={completion}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-accent transition-[width]"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {t.dashboard.profileHint}
            </p>
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link href="/profile">{t.dashboard.completeProfile}</Link>
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{t.dashboard.savedJobs}</h3>
              <span className="text-sm text-muted-foreground">0</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {t.dashboard.emptyState}
            </p>
          </Card>

          <div>
            <h3 className="mb-4 font-semibold">{t.dashboard.upcomingEvents}</h3>
            <p className="text-sm text-muted-foreground">{t.dashboard.emptyState}</p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
