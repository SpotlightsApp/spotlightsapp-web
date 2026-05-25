import Link from "next/link";
import { cn } from "@/lib/utils";

/** Spotlight brandmark — an amber "beam" glyph + wordmark. */
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
      <span
        aria-hidden
        className="relative inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-accent shadow-sm"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          {/* spotlight beam */}
          <path
            d="M12 3.5l3.2 6.3 6.3.6-4.7 4.2 1.4 6.2L12 17.9 5.8 20.8l1.4-6.2L2.5 10.4l6.3-.6L12 3.5z"
            fill="#1a1a1a"
          />
        </svg>
      </span>
      {showWord && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Spotlight
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
