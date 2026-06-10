"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  setApplicationStatus,
  type ApplicationStatus,
} from "@/app/employers/talent/actions";
import { cn } from "@/lib/utils";

const STATUS_BADGE: Record<
  string,
  { label: string; variant: "neutral" | "accent" | "success" | "outline"; className?: string }
> = {
  applied: { label: "Applied", variant: "neutral" },
  interview: { label: "Interview", variant: "accent" },
  offer: { label: "Offer", variant: "success" },
  rejected: { label: "Rejected", variant: "outline", className: "text-destructive border-destructive/30" },
};

export function ApplicantActions({
  applicationId,
  status,
}: {
  applicationId: string;
  status: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function move(next: ApplicationStatus) {
    setError(null);
    startTransition(async () => {
      const result = await setApplicationStatus(applicationId, next);
      if ("error" in result) setError(result.error);
      else router.refresh();
    });
  }

  const badge = STATUS_BADGE[status] ?? STATUS_BADGE.applied;

  return (
    <div className="flex items-center gap-2">
      {error && <span className="text-xs text-destructive">{error}</span>}
      <Badge variant={badge.variant} className={cn(badge.className)}>
        {badge.label}
      </Badge>
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      ) : status === "applied" ? (
        <>
          <Button size="sm" variant="outline" onClick={() => move("interview")}>
            Interview
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground"
            onClick={() => move("rejected")}
          >
            Reject
          </Button>
        </>
      ) : status === "interview" ? (
        <>
          <Button size="sm" onClick={() => move("offer")}>
            Offer
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground"
            onClick={() => move("rejected")}
          >
            Reject
          </Button>
        </>
      ) : (
        <Button
          size="sm"
          variant="ghost"
          aria-label="Move back to applied"
          title="Move back to applied"
          className="text-muted-foreground"
          onClick={() => move("applied")}
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}
