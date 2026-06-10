import Link from "next/link";
import { ExternalLink, MapPin, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CompanyLogo } from "@/components/ui/company-logo";
import { NoCompany } from "@/components/employers/talent/no-company";
import { PostJobForm } from "@/components/employers/talent/post-job-form";
import { getJobsByCompany } from "@/lib/data";
import {
  getCompanyApplicationCounts,
  getEmployerCompany,
} from "@/lib/employer/data";

export const metadata = {
  title: "My jobs — Spotlights for Employers",
};

function salaryLabel(min: number, max: number, period: string) {
  if (!min && !max) return null;
  const fmt = (n: number) =>
    n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${n}`;
  return `${fmt(min)}–${fmt(max)} / ${period}`;
}

export default async function EmployerJobsPage() {
  const ctx = await getEmployerCompany();
  if (!ctx) return <NoCompany />;

  const [jobs, counts] = await Promise.all([
    getJobsByCompany(ctx.company.id),
    getCompanyApplicationCounts(ctx.company.id),
  ]);

  return (
    <Container className="py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-strong">
            Hiring
          </p>
          <h1 className="font-display mt-1 flex items-center gap-3 text-3xl sm:text-4xl">
            <CompanyLogo
              name={ctx.company.name}
              src={ctx.company.logoUrl}
              className="h-9 w-9 text-sm"
            />
            My jobs
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Roles posted by {ctx.company.name} — live on the student job board
            the moment you publish.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <PostJobForm companyName={ctx.company.name} />
      </div>

      <Card className="mt-4 overflow-hidden p-0">
        {jobs.length === 0 ? (
          <div className="px-6 py-14 text-center text-sm text-muted-foreground">
            No open roles yet — post your first job above.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {jobs.map((job) => {
              const salary = salaryLabel(job.salaryMin, job.salaryMax, job.salaryPeriod);
              const applicants = counts[job.id] ?? 0;
              return (
                <li key={job.id} className="group relative transition-colors hover:bg-surface">
                  <Link
                    href={`/jobs/${job.slug}`}
                    className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`View ${job.title} as students see it`}
                  />
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold group-hover:text-accent-strong">
                        {job.title}
                        <ExternalLink className="ml-1.5 inline h-3.5 w-3.5 align-[-2px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </p>
                      <p className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </span>
                        {salary && <span>{salary}</span>}
                        <span>
                          {job.postedDaysAgo === 0
                            ? "posted today"
                            : `posted ${job.postedDaysAgo}d ago`}
                        </span>
                      </p>
                    </div>
                    <div className="hidden items-center gap-2 sm:flex">
                      <Badge variant="outline">{job.type}</Badge>
                      <Badge variant="neutral">{job.workMode}</Badge>
                    </div>
                    <span className="flex w-24 items-center justify-end gap-1.5 text-sm tabular-nums text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      {applicants}
                      <span className="text-xs">applied</span>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </Container>
  );
}
