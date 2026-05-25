import Link from "next/link";
import { Check } from "lucide-react";
import { Logo } from "@/components/brand/logo";

const BULLETS = [
  "One profile, hundreds of roles",
  "Internships & new-grad jobs from top Thai companies",
  "Apply in one click, track everything",
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-foreground p-12 lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        />
        <Link href="/" className="relative inline-flex">
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-accent">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path
                  d="M12 3.5l3.2 6.3 6.3.6-4.7 4.2 1.4 6.2L12 17.9 5.8 20.8l1.4-6.2L2.5 10.4l6.3-.6L12 3.5z"
                  fill="#1a1a1a"
                />
              </svg>
            </span>
            <span className="text-lg font-semibold tracking-tight text-white">
              Spotlight
            </span>
          </span>
        </Link>

        <div className="relative">
          <h2 className="font-display text-4xl text-white">
            Find what&apos;s next.
          </h2>
          <ul className="mt-8 space-y-4">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-center gap-3 text-white/80">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-foreground">
                  <Check className="h-4 w-4" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-white/50">
          Join 12,000+ students across Thailand.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-col">
        <div className="p-6 lg:hidden">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
