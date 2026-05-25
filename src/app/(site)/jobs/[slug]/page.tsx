import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  MapPin,
  Clock,
  Users,
  Briefcase,
  Building2,
  Check,
  ArrowLeft,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LogoMark } from "@/components/ui/logo-mark";
import { JobCard } from "@/components/cards/job-card";
import { JobActions } from "@/components/jobs/job-actions";
import { getJobBySlug, getRelatedJobs } from "@/lib/data";
import { formatTHB } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  return { title: job ? `${job.title} at ${job.company.name} — Spotlight` : "Job" };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();
  const related = getRelatedJobs(job);

  const overview = [
    { icon: Briefcase, label: "Type", value: job.type },
    { icon: Building2, label: "Work mode", value: job.workMode },
    { icon: MapPin, label: "Location", value: job.location },
    {
      icon: Clock,
      label: "Posted",
      value: job.postedDaysAgo === 0 ? "Today" : `${job.postedDaysAgo} days ago`,
    },
    { icon: Users, label: "Applicants", value: `${job.applicants}` },
  ];

  return (
    <Container className="py-8 sm:py-12">
      <Link
        href="/jobs"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to jobs
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Main */}
        <div>
          <div className="flex items-start gap-4">
            <LogoMark name={job.company.name} className="h-16 w-16 text-lg" />
            <div className="min-w-0">
              <h1 className="font-display text-3xl text-foreground sm:text-4xl">
                {job.title}
              </h1>
              <Link
                href={`/companies/${job.company.slug}`}
                className="mt-1 inline-block text-lg text-muted-foreground hover:text-accent-strong"
              >
                {job.company.name}
              </Link>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="accent" size="md">
                  {job.type}
                </Badge>
                <Badge variant="outline" size="md">
                  {job.workMode}
                </Badge>
                <Badge variant="neutral" size="md">
                  {formatTHB(job.salaryMin, job.salaryMax, job.salaryPeriod)}
                </Badge>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            <section>
              <h2 className="text-lg font-semibold">About the role</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {job.description}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">What you&apos;ll do</h2>
              <ul className="mt-3 space-y-2">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex gap-3 text-muted-foreground">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-strong" />
                    {r}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold">What we&apos;re looking for</h2>
              <ul className="mt-3 space-y-2">
                {job.requirements.map((r) => (
                  <li key={r} className="flex gap-3 text-muted-foreground">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-strong" />
                    {r}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <Badge key={s} variant="neutral" size="md">
                    {s}
                  </Badge>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-6">
            <div className="text-2xl font-semibold">
              {formatTHB(job.salaryMin, job.salaryMax, job.salaryPeriod)}
            </div>
            <p className="text-sm text-muted-foreground">Estimated compensation</p>
            <div className="my-5">
              <JobActions title={job.title} />
            </div>
            <dl className="space-y-3 border-t border-border pt-5">
              {overview.map((o) => (
                <div key={o.label} className="flex items-center justify-between text-sm">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <o.icon className="h-4 w-4" />
                    {o.label}
                  </dt>
                  <dd className="font-medium text-foreground">{o.value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card className="mt-5 p-6">
            <h3 className="text-sm font-semibold text-muted-foreground">
              About {job.company.name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {job.company.tagline}
            </p>
            <Link
              href={`/companies/${job.company.slug}`}
              className="mt-3 inline-block text-sm font-medium text-accent-strong hover:underline"
            >
              View company →
            </Link>
          </Card>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl text-foreground">Similar roles</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
