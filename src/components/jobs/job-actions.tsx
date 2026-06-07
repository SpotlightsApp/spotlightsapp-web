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
}: {
  jobId: string;
  title: string;
  initialApplied?: boolean;
  initialSaved?: boolean;
}) {
  const { t } = useI18n();
  const [applied, setApplied] = useState(initialApplied);
  const [saved, setSaved] = useState(initialSaved);
  const [isApplying, startApply] = useTransition();
  const [isSaving, startSave] = useTransition();

  const handleApply = () => {
    startApply(async () => {
      const { ok } = await applyToJob(jobId);
      if (ok) setApplied(true);
    });
  };

  const handleSave = () => {
    startSave(async () => {
      const { saved: next } = await toggleSaveJob(jobId);
      setSaved(next);
    });
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button
        size="lg"
        className="flex-1"
        disabled={applied || isApplying}
        onClick={handleApply}
      >
        {applied ? (
          <>
            <Check className="h-5 w-5" /> {t.jobDetail.appSent}
          </>
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
        className={cn(saved && "border-accent bg-accent-soft text-accent-strong")}
      >
        <Bookmark className={cn("h-5 w-5", saved && "fill-current")} />
        {saved ? t.jobDetail.saved : t.jobDetail.save}
      </Button>
    </div>
  );
}
