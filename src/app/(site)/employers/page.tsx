import Link from "next/link";
import type { Metadata } from "next";
import { Target, Zap, CalendarCheck, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/marketing/reveal";
import { getDict } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "For employers — Hire early-career talent in Thailand | Spotlights",
};

const FEATURE_ICONS = [Target, Zap, CalendarCheck];

export default async function EmployersPage() {
  const t = await getDict();
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-accent-soft/70 via-background to-background">
        <Container className="py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h1 className="font-display text-4xl text-foreground sm:text-6xl">
                {t.employers.titlePre}
                <span className="text-accent-strong">
                  {t.employers.titleHighlight}
                </span>
                {t.employers.titlePost}
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
                {t.employers.sub}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" pill>
                  <Link href="/signup">{t.employers.postJob}</Link>
                </Button>
                <Button asChild size="lg" pill variant="outline">
                  <Link href="/companies">{t.employers.seeProfiles}</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {t.employers.features.map((f, i) => {
            const Icon = FEATURE_ICONS[i] ?? Target;
            return (
              <Reveal key={f.title} delay={i * 0.1}>
                <div className="h-full rounded-[var(--radius)] border border-border bg-background p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>

      <section className="bg-surface py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-[1.5rem] border border-border bg-background p-8 text-center sm:p-12">
              <h2 className="font-display text-3xl text-foreground">
                {t.employers.planHeading}
              </h2>
              <p className="mt-2 text-muted-foreground">{t.employers.planSub}</p>
              <ul className="mx-auto mt-8 grid max-w-md gap-3 text-left sm:grid-cols-2">
                {t.employers.plan.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-accent-strong" />
                    {p}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" pill className="mt-8">
                <Link href="/signup">{t.employers.createAccount}</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
