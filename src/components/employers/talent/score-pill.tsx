import { TIER_META, tierOf } from "@/lib/talent";
import { cn } from "@/lib/utils";

export function ScorePill({
  score,
  size = "md",
  className,
}: {
  score: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const meta = TIER_META[tierOf(score)];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg font-semibold tabular-nums",
        size === "md" ? "h-9 w-9 text-sm" : "h-7 w-7 text-xs",
        meta.chip,
        className,
      )}
    >
      {score}
    </span>
  );
}
