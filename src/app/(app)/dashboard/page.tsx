import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Send, Bookmark, Eye } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/cards/job-card";
import { EventCard } from "@/components/cards/event-card";
import {
  getStudent,
  getSavedJobs,
  getAppliedJobs,
  getJobs,
  getUpcomingEvents,
} from "@/lib/data";

export const metadata: Metadata = { title: "Dashboard — Spotlight" };

export default function DashboardPage() {
  const student = getStudent();
  const saved = getSavedJobs();
  const applied = getAppliedJobs();
  const recommended = getJobs({ types: student.openTo }).slice(0, 4);
  const events = getUpcomingEvents(2);

  const stats = [
    { icon: Send, label: "Applications", value: applied.length },
    { icon: Bookmark, label: "Saved jobs", value: saved.length },
    { icon: Eye, label: "Profile views", value: 38 },
  ];

  return (
    <Container className="py-10">
      <header>
        <h1 className="font-display text-3xl text-foreground sm:text-4xl">
          Welcome back, {student.name.split(" ")[0]} 👋
        </h1>
        <p className="mt-2 text-muted-foreground">
          Here&apos;s what&apos;s happening with your job search.
        </p>
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
            <div className="flex items-end justify-between">
              <h2 className="text-xl font-semibold">Recommended for you</h2>
              <Link
                href="/jobs"
                className="flex items-center gap-1 text-sm font-medium text-accent-strong hover:underline"
              >
                See all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {recommended.map((j) => (
                <JobCard key={j.id} job={j} />
              ))}
            </div>
          </section>

          {/* Applications */}
          <section>
            <h2 className="text-xl font-semibold">Your applications</h2>
            {applied.length > 0 ? (
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {applied.map((j) => (
                  <JobCard key={j.id} job={j} />
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                You haven&apos;t applied to anything yet.
              </p>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold">Profile strength</h3>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Completion</span>
              <span className="font-semibold text-accent-strong">
                {student.profileCompletion}%
              </span>
            </div>
            <div
              className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-2"
              role="progressbar"
              aria-valuenow={student.profileCompletion}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${student.profileCompletion}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Add a portfolio link and 2 more skills to reach 100%.
            </p>
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link href="/profile">Complete profile</Link>
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Saved jobs</h3>
              <span className="text-sm text-muted-foreground">{saved.length}</span>
            </div>
            <ul className="mt-4 space-y-3">
              {saved.map((j) => (
                <li key={j.id}>
                  <Link
                    href={`/jobs/${j.slug}`}
                    className="block rounded-md p-2 text-sm transition-colors hover:bg-surface-2"
                  >
                    <span className="font-medium">{j.title}</span>
                    <span className="block text-muted-foreground">
                      {j.company.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <div>
            <h3 className="mb-4 font-semibold">Upcoming events</h3>
            <div className="space-y-4">
              {events.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
