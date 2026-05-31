import Link from "next/link";
import { cn } from "@/lib/utils";

/** Spotlight brandmark — favicon glyph + wordmark. */
export function Logo({
  className,
  href = "/",
  showWord = true,
}: {
  className?: string;
  href?: string | null;
  showWord?: boolean;
}) {
  const inner = (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <img
        src="/Spotlightslogo.png"
        alt=""
        aria-hidden
        style={{ height: "32px", width: "auto" }}
      />
      {showWord && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Spotlights
        </span>
      )}
    </span>
  );

  if (href === null) return inner;
  return (
    <Link
      href={href}
      className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {inner}
    </Link>
  );
}
