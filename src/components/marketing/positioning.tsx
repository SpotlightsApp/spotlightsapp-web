"use client";

import { X, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/marketing/reveal";
import { useI18n } from "@/lib/i18n/provider";

export function Positioning() {
  const { t } = useI18n();
  return (
    <section className="py-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent-strong">
            {t.positioning.eyebrow}
          </span>
          <h2 className="font-display mt-2 text-3xl text-foreground sm:text-4xl">
            {t.positioning.heading}
          </h2>
          <p className="mt-3 text-muted-foreground">{t.positioning.subhead}</p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[var(--radius)] border border-border bg-surface p-7">
              <h3 className="text-lg font-semibold text-muted-foreground">
                {t.positioning.oldTitle}
              </h3>
              <ul className="mt-5 space-y-3">
                {t.positioning.oldWay.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-2 text-muted-foreground">
                      <X className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-[var(--radius)] border border-accent/40 bg-accent-soft/50 p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent/20 blur-3xl"
              />
              <h3 className="relative text-lg font-semibold text-foreground">
                {t.positioning.spotlightTitle}
              </h3>
              <ul className="relative mt-5 space-y-3">
                {t.positioning.spotlightWay.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
