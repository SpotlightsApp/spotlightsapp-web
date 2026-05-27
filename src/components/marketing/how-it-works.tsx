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

const STEPS = [
  {
    icon: UserPlus,
    title: "Build your profile",
    body: "Add your university, skills, and what you're looking for. Stand out to employers in minutes.",
  },
  {
    icon: Search,
    title: "Discover opportunities",
    body: "Browse internships and jobs from Thailand's top companies, filtered to fit you.",
  },
  {
    icon: Send,
    title: "Apply & connect",
    body: "Apply in one click, message recruiters, and track every application in one place.",
  },
];

const FIELDS: { label: string; icon: typeof Code2 }[] = [
  { label: "Software", icon: Code2 },
  { label: "Data & AI", icon: Brain },
  { label: "Fintech", icon: LineChart },
  { label: "E-commerce", icon: ShoppingBag },
  { label: "Design", icon: Palette },
  { label: "Marketing", icon: Megaphone },
  { label: "Consulting", icon: Briefcase },
  { label: "Hospitality", icon: Briefcase },
];

export function HowItWorks() {
  return (
    <section className="bg-surface py-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Your career, three steps away
          </h2>
          <p className="mt-3 text-muted-foreground">
            Spotlight makes it simple to go from student to hired — across every
            field.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="relative h-full rounded-[var(--radius)] border border-border bg-background p-7">
                <span className="absolute right-6 top-6 font-display text-5xl text-surface-2">
                  {i + 1}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Fields — an animated chip cloud tying the steps to every discipline */}
        <Reveal delay={0.1} className="mt-14 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Opportunities across every field
          </p>
        </Reveal>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {FIELDS.map((f, i) => (
            <Reveal key={f.label} delay={0.15 + i * 0.05}>
              <Link
                href="#waitlist"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_8px_24px_rgb(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <f.icon className="h-4 w-4 text-accent-strong transition-transform group-hover:scale-110" />
                {f.label}
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
