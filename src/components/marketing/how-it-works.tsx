import { UserPlus, Search, Send } from "lucide-react";
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

export function HowItWorks() {
  return (
    <section className="bg-surface py-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Your career, three steps away
          </h2>
          <p className="mt-3 text-muted-foreground">
            Spotlight makes it simple to go from student to hired.
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
      </Container>
    </section>
  );
}
