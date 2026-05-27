import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/marketing/reveal";

/**
 * Pre-launch: frame the PROBLEM (the early-career employment gap), not vanity
 * traction or population size. Figures are directional estimates from Thai
 * labour-market / graduate-employment research.
 */
const STATS = [
  {
    value: "5×",
    label: "Youth unemployment runs several times Thailand's national rate",
    featured: true,
  },
  {
    value: "1 in 3",
    label: "Grads work in jobs that don't require their degree",
  },
  {
    value: "70%",
    label: "Of roles are filled through personal networks — not open applications",
  },
];

export function StatStrip() {
  return (
    <section className="border-y border-border bg-surface">
      <Container className="py-14">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent-strong">
            The early-career gap
          </span>
          <h2 className="font-display mt-2 text-2xl text-foreground sm:text-3xl">
            The problem isn&apos;t talent — it&apos;s access
          </h2>
          <p className="mt-3 text-muted-foreground">
            Thailand graduates more capable students every year than the job
            market connects them to. Opportunity still depends on who you know.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {STATS.map((s) => (
            <Reveal key={s.label}>
              <div
                className={
                  s.featured
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
          Directional estimates from Thai labour-market and graduate-employment
          research.
        </p>
      </Container>
    </section>
  );
}
