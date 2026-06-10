"use client";

import { useState, useTransition } from "react";
import { Bookmark, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";
import { applyToJob, toggleSaveJob } from "@/app/(app)/jobs/actions";

/**
 * Apply / Save actions. Persists to Supabase via server actions
 * (applications / saved_jobs).
 */
export function JobActions({
  jobId,
  title,
  initialApplied = false,
  initialSaved = false,
  closed = false,
}: {
  jobId: string;
  title: string;
  initialApplied?: boolean;
  initialSaved?: boolean;
  closed?: boolean;
}) {
  const { t } = useI18n();
  const [applied, setApplied] = useState(initialApplied);
  const [saved, setSaved] = useState(initialSaved);
  const [error, setError] = useState<string | null>(null);
  const [isApplying, startApply] = useTransition();
  const [isSaving, startSave] = useTransition();

  const handleApply = () => {
    setError(null);
    startApply(async () => {
      const res = await applyToJob(jobId);
      if (res.ok) setApplied(true);
      else setError(res.error ?? "Something went wrong.");
    });
  };

  const handleSave = () => {
    setError(null);
    startSave(async () => {
      const res = await toggleSaveJob(jobId);
      // Always reflect the true post-op state (a failed unsave stays saved).
      setSaved(res.saved);
      if (!res.ok) setError(res.error ?? "Something went wrong.");
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          className="flex-1"
          disabled={applied || isApplying || closed}
          onClick={handleApply}
        >
          {applied ? (
            <>
              <Check className="h-5 w-5" /> {t.jobDetail.appSent}
            </>
          ) : closed ? (
            t.jobDetail.closed
          ) : (
            t.jobDetail.applyNow
          )}
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={handleSave}
          disabled={isSaving}
          aria-pressed={saved}
          aria-label={saved ? `Unsave ${title}` : `Save ${title}`}
          className={cn(
            saved && "border-accent bg-accent-soft text-accent-strong"
          )}
        >
          <Bookmark className={cn("h-5 w-5", saved && "fill-current")} />
          {saved ? t.jobDetail.saved : t.jobDetail.save}
        </Button>
      </div>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
