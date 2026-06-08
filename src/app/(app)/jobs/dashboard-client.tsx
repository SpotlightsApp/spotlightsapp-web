"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Send,
  Bookmark,
  Eye,
  Sparkles,
  Briefcase,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CompanyLogo } from "@/components/ui/company-logo";
import { JobCard } from "@/components/cards/job-card";
import { useI18n } from "@/lib/i18n/provider";
import { eventDateBadge, eventDateLong } from "@/lib/utils";
import type { Dict } from "@/lib/i18n/dictionaries";
import type { JobWithCompany, ApplicationItem, CareerEvent } from "@/lib/types";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

type EmptyProps = { icon: React.ElementType; children: React.ReactNode };
function Empty({ icon: Icon, children }: EmptyProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-[var(--radius)] border border-dashed border-border bg-surface/60 px-6 py-10 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
        <Icon className="h-5 w-5" />
      </span>
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

/** Compact saved-job row for the sidebar. */
function SavedRow({ job }: { job: JobWithCompany }) {
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="-mx-2 flex items-center gap-3 rounded-[var(--radius)] px-2 py-2 transition-colors hover:bg-surface-2"
    >
      <CompanyLogo
        name={job.company.name}
        src={job.company.logoUrl}
        className="h-9 w-9 shrink-0 text-xs"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{job.title}</p>
        <p className="truncate text-xs text-muted-foreground">
          {job.company.name}
        </p>
      </div>
    </Link>
  );
}

/** Compact upcoming-event row for the sidebar. */
function EventRow({ event, locale }: { event: CareerEvent; locale: "en" | "th" }) {
  const { day, month } = eventDateBadge(event.date, locale);
  return (
    <Link
      href={`/events/${event.slug}`}
      className="-mx-2 flex items-center gap-3 rounded-[var(--radius)] px-2 py-2 transition-colors hover:bg-surface-2"
    >
      <span className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-[10px] bg-accent-soft text-accent-strong">
        <span className="text-[9px] font-semibold uppercase leading-none">
          {month}
        </span>
        <span className="text-base font-bold leading-tight">{day}</span>
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{event.title}</p>
        <p className="truncate text-xs text-muted-foreground">{event.host}</p>
      </div>
    </Link>
  );
}

/** Application row for the main column. */
function ApplicationRow({
  item,
  statusLabel,
  locale,
}: {
  item: ApplicationItem;
  statusLabel: string;
  locale: "en" | "th";
}) {
  const { job } = item;
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="flex items-center gap-3 rounded-[var(--radius)] border border-border bg-surface/60 p-4 transition-colors hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_10px_30px_-12px_rgb(0,0,0,0.15)]"
    >
      <CompanyLogo
        name={job.company.name}
        src={job.company.logoUrl}
        className="h-11 w-11 shrink-0 text-sm"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{job.title}</p>
        <p className="truncate text-sm text-muted-foreground">
          {job.company.name} · {job.location}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1 text-right">
        <Badge variant="success">{statusLabel}</Badge>
        <span className="whitespace-nowrap text-xs text-muted-foreground">
          {eventDateLong(item.appliedAt, locale)}
        </span>
      </div>
    </Link>
  );
}

export function DashboardClient({
  name,
  completion,
  d,
  featuredJobs = [],
  savedJobs = [],
  applications = [],
  events = [],
}: {
  name: string;
  completion: number;
  d: Dict["dashboard"];
  featuredJobs?: JobWithCompany[];
  savedJobs?: JobWithCompany[];
  applications?: ApplicationItem[];
  events?: CareerEvent[];
}) {
  const { locale } = useI18n();

  const stats = [
    { icon: Send, label: d.applications, value: applications.length },
    { icon: Bookmark, label: d.savedJobs, value: savedJobs.length },
    { icon: Eye, label: d.profileViews, value: 0 },
  ];

  return (
    <Container className="py-10">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <h1 className="font-display text-3xl text-foreground sm:text-4xl">
          {d.welcome.replace("{name}", name.split(" ")[0])}
        </h1>
        <p className="mt-2 text-muted-foreground">{d.sub}</p>
      </motion.header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="space-y-10"
        >
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp}>
                <Card className="group p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_10px_30px_-12px_rgb(0,0,0,0.15)]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-strong transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div className="mt-4 font-display text-3xl">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Applications */}
          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold">{d.yourApplications}</h2>
            <div className="mt-4">
              {applications.length > 0 ? (
                <div className="space-y-3">
                  {applications.map((item) => (
                    <ApplicationRow
                      key={item.job.id}
                      item={item}
                      statusLabel={d.statusApplied}
                      locale={locale}
                    />
                  ))}
                </div>
              ) : (
                <Empty icon={Briefcase}>{d.noApplications}</Empty>
              )}
            </div>
          </motion.section>

          {/* Recommended */}
          <motion.section variants={fadeUp}>
            <div className="flex items-end justify-between">
              <h2 className="text-xl font-semibold">{d.recommended}</h2>
              <Link
                href="/explore"
                className="flex items-center gap-1 text-sm font-medium text-accent-strong hover:underline"
              >
                {d.seeAll} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-4">
              {featuredJobs.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  {featuredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <Empty icon={Sparkles}>{d.emptyState}</Empty>
              )}
            </div>
          </motion.section>
        </motion.div>

        {/* Sidebar */}
        <motion.aside
          variants={stagger}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.div variants={fadeUp}>
            <Card className="overflow-hidden p-0">
              <div className="h-1.5 bg-gradient-to-r from-accent to-[#bde8fb]" />
              <div className="p-6">
                <h3 className="font-semibold">{d.profileStrength}</h3>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{d.completion}</span>
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
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent-hover"
                    initial={{ width: 0 }}
                    animate={{ width: `${completion}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {d.profileHint}
                </p>
                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link href="/profile">{d.completeProfile}</Link>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Saved jobs */}
          <motion.div variants={fadeUp}>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{d.savedJobs}</h3>
                <span className="text-sm text-muted-foreground">
                  {savedJobs.length}
                </span>
              </div>
              <div className="mt-4">
                {savedJobs.length > 0 ? (
                  <div className="space-y-1">
                    {savedJobs.slice(0, 5).map((job) => (
                      <SavedRow key={job.id} job={job} />
                    ))}
                  </div>
                ) : (
                  <Empty icon={Bookmark}>{d.emptyState}</Empty>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Upcoming events */}
          <motion.div variants={fadeUp}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">{d.upcomingEvents}</h3>
              {events.length > 0 && (
                <Link
                  href="/events"
                  className="flex items-center gap-1 text-sm font-medium text-accent-strong hover:underline"
                >
                  {d.seeAll} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
            {events.length > 0 ? (
              <Card className="space-y-1 p-3">
                {events.map((event) => (
                  <EventRow key={event.id} event={event} locale={locale} />
                ))}
              </Card>
            ) : (
              <Empty icon={CalendarDays}>{d.emptyState}</Empty>
            )}
          </motion.div>
        </motion.aside>
      </div>
    </Container>
  );
}
