import Link from "next/link";
import { MapPin, Clock, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogoMark } from "@/components/ui/logo-mark";
import { formatTHB } from "@/lib/utils";
import type { JobWithCompany } from "@/lib/data";

const TYPE_VARIANT: Record<string, "accent" | "neutral" | "success"> = {
  Internship: "accent",
  "New grad": "success",
};

export function JobCard({ job }: { job: JobWithCompany }) {
  return (
    <Card interactive className="group relative flex flex-col p-5">
      <Link
        href={`/jobs/${job.slug}`}
        className="absolute inset-0 z-10 rounded-[var(--radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`${job.title} at ${job.company.name}`}
      />
      <div className="flex items-start gap-3">
        <LogoMark name={job.company.name} className="h-11 w-11 text-sm" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold leading-tight tracking-tight group-hover:text-accent-strong">
            {job.title}
          </h3>
          <p className="truncate text-sm text-muted-foreground">
            {job.company.name}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge variant={TYPE_VARIANT[job.type] ?? "neutral"}>{job.type}</Badge>
        <Badge variant="outline">{job.workMode}</Badge>
      </div>

      <dl className="mt-4 space-y-1.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center gap-2 font-medium text-foreground">
          {formatTHB(job.salaryMin, job.salaryMax, job.salaryPeriod)}
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {job.skills.slice(0, 3).map((s) => (
          <span
            key={s}
            className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {job.postedDaysAgo === 0 ? "Today" : `${job.postedDaysAgo}d ago`}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {job.applicants} applied
        </span>
      </div>
    </Card>
  );
}
