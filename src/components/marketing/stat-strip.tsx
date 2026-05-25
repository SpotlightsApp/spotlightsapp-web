import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/marketing/reveal";
import { getStats } from "@/lib/data";

export function StatStrip() {
  const s = getStats();
  const items = [
    { value: `${s.companies}+`, label: "Companies hiring" },
    { value: `${s.jobs}+`, label: "Open roles" },
    { value: `${s.universities}+`, label: "Partner universities" },
    { value: "12K+", label: "Students on Spotlight" },
  ];
  return (
    <section className="border-y border-border bg-surface">
      <Container className="py-10">
        <Reveal>
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {items.map((it) => (
              <div key={it.label} className="text-center">
                <dt className="font-display text-3xl text-foreground sm:text-4xl">
                  {it.value}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">{it.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
