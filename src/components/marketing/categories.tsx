import Link from "next/link";
import {
  Code2,
  LineChart,
  ShoppingBag,
  Briefcase,
  Megaphone,
  Palette,
  Brain,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/marketing/reveal";
import { getIndustryCounts } from "@/lib/data";
import type { Industry } from "@/lib/types";

const ICONS: Record<Industry, typeof Code2> = {
  Software: Code2,
  Fintech: LineChart,
  "E-commerce": ShoppingBag,
  Consulting: Briefcase,
  Marketing: Megaphone,
  Design: Palette,
  "Data & AI": Brain,
  Hospitality: Briefcase,
  Healthcare: Briefcase,
  Energy: Briefcase,
};

export function Categories() {
  const cats = getIndustryCounts();
  return (
    <section className="py-20">
      <Container>
        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">
              Explore by field
            </h2>
            <p className="mt-3 text-muted-foreground">
              Find roles in the industries shaping Thailand.
            </p>
          </div>
          <Link
            href="/jobs"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-accent-strong hover:underline sm:flex"
          >
            All jobs <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {cats.map((c, i) => {
            const Icon = ICONS[c.industry] ?? Briefcase;
            return (
              <Reveal key={c.industry} delay={i * 0.05}>
                <Link
                  href={`/jobs?industry=${encodeURIComponent(c.industry)}`}
                  className="group flex h-full items-center gap-4 rounded-[var(--radius)] border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-strong transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-semibold tracking-tight">
                      {c.industry}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {c.count} {c.count === 1 ? "role" : "roles"}
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
