"use client";

import Link from "next/link";
import {
  UserPlus,
  Search,
  Send,
  Code2,
  Brain,
  LineChart,
  ShoppingBag,
  Palette,
  Megaphone,
  Briefcase,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/marketing/reveal";
import { useI18n } from "@/lib/i18n/provider";

const STEP_ICONS = [UserPlus, Search, Send];
const FIELD_ICONS = [
  Code2,
  Brain,
  LineChart,
  ShoppingBag,
  Palette,
  Megaphone,
  Briefcase,
  Briefcase,
];

export function HowItWorks() {
  const { t } = useI18n();
  return (
    <section className="bg-surface py-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            {t.how.heading}
          </h2>
          <p className="mt-3 text-muted-foreground">{t.how.subhead}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.how.steps.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? UserPlus;
            return (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className="relative h-full rounded-[var(--radius)] border border-border bg-background p-7">
                  <span className="absolute right-6 top-6 font-display text-5xl text-surface-2">
                    {i + 1}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Fields — an animated chip cloud tying the steps to every discipline */}
        <Reveal delay={0.1} className="mt-14 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {t.how.fieldsLabel}
          </p>
        </Reveal>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {t.how.fields.map((label, i) => {
            const Icon = FIELD_ICONS[i] ?? Briefcase;
            return (
              <Reveal key={label} delay={0.15 + i * 0.05}>
                <Link
                  href="#waitlist"
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_8px_24px_rgb(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icon className="h-4 w-4 text-accent-strong transition-transform group-hover:scale-110" />
                  {label}
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
