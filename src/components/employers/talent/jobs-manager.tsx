"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Archive,
  ArchiveRestore,
  ExternalLink,
  Loader2,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobForm } from "@/components/employers/talent/job-form";
import { deleteJob, setJobStatus } from "@/app/employers/talent/actions";
import type { JobWithCompany } from "@/lib/types";
import { cn } from "@/lib/utils";

function salaryLabel(min: number, max: number, period: string) {
  if (!min && !max) return null;
  const fmt = (n: number) => (n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${n}`);
  return `${fmt(min)}–${fmt(max)} / ${period}`;
}

function JobRow({
  job,
  applicants,
  onEdit,
}: {
  job: JobWithCompany;
  applicants: number;
  onEdit: () => void;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const closed = job.status === "closed";

  function run(action: () => Promise<{ ok: true } | { error: string }>) {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if ("error" in result) setError(result.error);
      else router.refresh();
      setConfirmingDelete(false);
    });
  }

  return (
    <li className={cn("group transition-colors hover:bg-surface", closed && "bg-surface/60")}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className={cn("truncate text-sm font-semibold", closed && "text-muted-foreground")}>
            {job.title}
            {closed && (
              <Badge variant="outline" className="ml-2 align-middle">
                Closed
              </Badge>
            )}
          </p>
          <p className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {job.location}
            </span>
            {salaryLabel(job.salaryMin, job.salaryMax, job.salaryPeriod) && (
              <span>{salaryLabel(job.salaryMin, job.salaryMax, job.salaryPeriod)}</span>
            )}
            <span>
              {job.postedDaysAgo === 0 ? "posted today" : `posted ${job.postedDaysAgo}d ago`}
            </span>
          </p>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Badge variant="outline">{job.type}</Badge>
          <Badge variant="neutral">{job.workMode}</Badge>
        </div>
        <span className="flex w-20 items-center justify-end gap-1.5 text-sm tabular-nums text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          {applicants}
        </span>

        <div className="flex items-center gap-1">
          {error && <span className="mr-1 text-xs text-destructive">{error}</span>}
          {pending ? (
            <Loader2 className="mx-2 h-4 w-4 animate-spin text-muted-foreground" />
          ) : confirmingDelete ? (
            <>
              <span className="text-xs text-muted-foreground">
                {applicants > 0 ? `Removes ${applicants} application${applicants === 1 ? "" : "s"} —` : ""}{" "}
                delete?
              </span>
              <Button
                size="sm"
                variant="outline"
                className="border-destructive/40 text-destructive hover:bg-red-50"
                onClick={() => run(() => deleteJob(job.id))}
              >
                Delete
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setConfirmingDelete(false)}>
                <X className="h-3.5 w-3.5" />
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="ghost"
                aria-label="View as students see it"
                title="View as students see it"
                asChild
              >
                <Link href={`/jobs/${job.slug}`}>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button size="sm" variant="ghost" aria-label="Edit role" title="Edit role" onClick={onEdit}>
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                aria-label={closed ? "Reopen role" : "Close role"}
                title={closed ? "Reopen role" : "Close role (keeps applications)"}
                onClick={() => run(() => setJobStatus(job.id, closed ? "open" : "closed"))}
              >
                {closed ? <ArchiveRestore className="h-3.5 w-3.5" /> : <Archive className="h-3.5 w-3.5" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                aria-label="Delete role"
                title="Delete role"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => setConfirmingDelete(true)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export function JobsManager({
  companyName,
  jobs,
  counts,
}: {
  companyName: string;
  jobs: JobWithCompany[];
  counts: Record<string, number>;
}) {
  const router = useRouter();
  const [form, setForm] = useState<{ mode: "create" } | { mode: "edit"; job: JobWithCompany } | null>(null);
  const [postedSlug, setPostedSlug] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between">
        {postedSlug ? (
          <p className="text-sm text-success">
            Saved — it&apos;s live for students now.{" "}
            <Link href={`/jobs/${postedSlug}`} className="font-medium text-accent-strong hover:underline">
              View the listing →
            </Link>
          </p>
        ) : (
          <span />
        )}
        <Button onClick={() => setForm(form ? null : { mode: "create" })} size="sm">
          {form ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {form ? "Close" : "Post a job"}
        </Button>
      </div>

      {form && (
        <JobForm
          key={form.mode === "edit" ? form.job.id : "create"}
          companyName={companyName}
          job={form.mode === "edit" ? form.job : undefined}
          onClose={() => setForm(null)}
          onSaved={(slug) => {
            setPostedSlug(slug);
            setForm(null);
            router.refresh();
          }}
        />
      )}

      <Card className="mt-4 overflow-hidden p-0">
        {jobs.length === 0 ? (
          <div className="px-6 py-14 text-center text-sm text-muted-foreground">
            No roles yet — post your first job above.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {jobs.map((job) => (
              <JobRow
                key={job.id}
                job={job}
                applicants={counts[job.id] ?? 0}
                onEdit={() => {
                  setPostedSlug(null);
                  setForm({ mode: "edit", job });
                }}
              />
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
