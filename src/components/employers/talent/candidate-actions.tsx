"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CandidateStatus } from "@/lib/talent";

export function CandidateActions({ initial }: { initial: CandidateStatus }) {
  const [status, setStatus] = useState<CandidateStatus>(initial);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          setStatus((s) => (s === "shortlisted" ? "new" : "shortlisted"))
        }
        className={
          status === "shortlisted" ? "border-accent text-accent-strong" : ""
        }
      >
        {status === "shortlisted" ? (
          <>
            <BookmarkCheck className="h-4 w-4" />
            Shortlisted
          </>
        ) : (
          <>
            <Bookmark className="h-4 w-4" />
            Shortlist
          </>
        )}
      </Button>
      <Button
        size="sm"
        onClick={() => setStatus("advanced")}
        disabled={status === "advanced"}
        className="disabled:opacity-100"
      >
        {status === "advanced" ? (
          <>
            <Check className="h-4 w-4" />
            Advanced to interview
          </>
        ) : (
          <>
            Advance
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
