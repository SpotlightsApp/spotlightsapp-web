"use client";

import { useState } from "react";
import { Bookmark, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

/**
 * Apply / Save actions. Frontend-only: state is local and resets on reload.
 * Wire to Supabase (insert into applications / saved_jobs) later.
 */
export function JobActions({ title }: { title: string }) {
  const { t } = useI18n();
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button
        size="lg"
        className="flex-1"
        disabled={applied}
        onClick={() => setApplied(true)}
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
        onClick={() => setSaved((v) => !v)}
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
