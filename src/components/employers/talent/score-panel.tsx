import { Badge } from "@/components/ui/badge";
import { ScoreRadar } from "@/components/employers/talent/score-radar";
import { TIER_META, type RankedCandidate, type TalentScores } from "@/lib/talent";
import { cn } from "@/lib/utils";

const BARS: { key: keyof Omit<TalentScores, "overall">; label: string }[] = [
  { key: "technical", label: "Technical" },
  { key: "execution", label: "Execution" },
  { key: "leadership", label: "Leadership" },
  { key: "communication", label: "Communication" },
  { key: "trajectory", label: "Trajectory" },
];

export function ScorePanel({ candidate }: { candidate: RankedCandidate }) {
  const meta = TIER_META[candidate.tier];
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-5xl tabular-nums">
            {candidate.scores.overall}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Overall · ranked #{candidate.rank} of 48
          </p>
        </div>
        <Badge className={cn("border-0", meta.chip)}>{meta.label}</Badge>
      </div>

      <div className="mx-auto -mb-2 mt-2 max-w-[240px]">
        <ScoreRadar scores={candidate.scores} />
      </div>

      <ul className="mt-2 flex flex-col gap-2.5">
        {BARS.map((b) => (
          <li key={b.key} className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-xs text-muted-foreground">
              {b.label}
            </span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
              <span
                className={cn("block h-full rounded-full", meta.bar)}
                style={{ width: `${candidate.scores[b.key]}%` }}
              />
            </span>
            <span className="w-7 text-right text-xs font-medium tabular-nums">
              {candidate.scores[b.key]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
