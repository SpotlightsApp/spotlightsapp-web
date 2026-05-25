import Link from "next/link";
import type { Metadata } from "next";
import { Target, Zap, CalendarCheck, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/marketing/reveal";
import { getStats } from "@/lib/data";

export const metadata: Metadata = {
  title: "For employers — Hire early-career talent in Thailand | Spotlight",
};

const FEATURES = [
  {
    icon: Target,
    title: "Reach the right students",
    body: "Post roles in front of students and new grads from Thailand's top universities, filtered by skills and field.",
  },
  {
    icon: Zap,
    title: "Hire faster",
    body: "Source, message and shortlist candidates from one dashboard. No more scattered email threads.",
  },
  {
    icon: CalendarCheck,
    title: "Run campus events",
    body: "Host info sessions and career fairs, and connect with hundreds of students in a single afternoon.",
  },
];

const PLAN = [
  "Unlimited job & internship posts",
  "Searchable candidate database",
  "Branded company profile",
  "Event hosting tools",
  "Applicant tracking",
];

export default function EmployersPage() {
  const s = getStats();
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-accent-soft/70 via-background to-background">
        <Container className="py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h1 className="font-display text-4xl text-foreground sm:text-6xl">
                Hire Thailand&apos;s{" "}
                <span className="text-accent-strong">next generation</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
                Spotlight connects your team with {s.students.toLocaleString()}+
                ambitious students and new grads, ready to make an impact.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" pill>
                  <Link href="/signup">Post a job — free</Link>
                </Button>
                <Button asChild size="lg" pill variant="outline">
                  <Link href="/companies">See company profiles</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="h-full rounded-[var(--radius)] border border-border bg-background p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="bg-surface py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-[1.5rem] border border-border bg-background p-8 text-center sm:p-12">
              <h2 className="font-display text-3xl text-foreground">
                Everything you need to recruit
              </h2>
              <p className="mt-2 text-muted-foreground">
                Get started free while we&apos;re in beta.
              </p>
              <ul className="mx-auto mt-8 grid max-w-md gap-3 text-left sm:grid-cols-2">
                {PLAN.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-accent-strong" />
                    {p}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" pill className="mt-8">
                <Link href="/signup">Create employer account</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
