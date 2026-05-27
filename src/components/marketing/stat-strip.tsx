"use client";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/marketing/reveal";
import { useI18n } from "@/lib/i18n/provider";

/**
 * Pre-launch: frame the PROBLEM (the early-career employment gap), not vanity
 * traction. Figures are directional estimates from Thai labour-market research.
 * The first stat is highlighted as the sharpest hook.
 */
export function StatStrip() {
  const { t } = useI18n();
  return (
    <section className="border-y border-border bg-surface">
      <Container className="py-14">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent-strong">
            {t.stats.eyebrow}
          </span>
          <h2 className="font-display mt-2 text-2xl text-foreground sm:text-3xl">
            {t.stats.heading}
          </h2>
          <p className="mt-3 text-muted-foreground">{t.stats.subhead}</p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {t.stats.items.map((s, i) => (
            <Reveal key={s.label}>
              <div
                className={
                  i === 0
                    ? "h-full rounded-[var(--radius)] border border-accent/40 bg-accent-soft/60 p-6 text-center"
                    : "h-full rounded-[var(--radius)] border border-border bg-background p-6 text-center"
                }
              >
                <div className="font-display text-4xl text-foreground sm:text-5xl">
                  {s.value}
                </div>
                <div className="mx-auto mt-3 max-w-[15rem] text-sm text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground/70">
          {t.stats.footnote}
        </p>
      </Container>
    </section>
  );
}
