"use client";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/marketing/reveal";
import { WaitlistForm } from "@/components/marketing/waitlist-form";
import { useI18n } from "@/lib/i18n/provider";

export function Waitlist() {
  const { t } = useI18n();
  return (
    <section id="waitlist" className="scroll-mt-24 py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-foreground px-6 py-16 text-center sm:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
            />
            <span className="relative text-sm font-semibold uppercase tracking-wider text-accent">
              {t.waitlist.eyebrow}
            </span>
            <h2 className="font-display relative mt-3 text-3xl text-white sm:text-4xl">
              {t.waitlist.heading}
            </h2>
            <div className="relative mt-8">
              <WaitlistForm />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
