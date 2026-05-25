import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/marketing/reveal";
import { LogoMark } from "@/components/ui/logo-mark";

const QUOTES = [
  {
    quote:
      "I found my summer internship at Agoda through Spotlight in two weeks. The filters actually understood what a CS student wants.",
    name: "Nattapong R.",
    detail: "Computer Engineering, Chulalongkorn",
  },
  {
    quote:
      "As a fresh grad, applying felt impossible until Spotlight. One profile, dozens of new-grad roles, and recruiters messaged me first.",
    name: "Mali T.",
    detail: "Business Analytics, Thammasat",
  },
  {
    quote:
      "The career fair listings are gold. I met three companies at the Chula fair and got two interviews the same week.",
    name: "Krit S.",
    detail: "Data Science, KMUTT",
  },
];

export function Testimonials() {
  return (
    <section className="bg-surface py-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Loved by students across Thailand
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-[var(--radius)] border border-border bg-background p-6">
                <div className="text-accent" aria-hidden>
                  {"★★★★★"}
                </div>
                <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <LogoMark name={q.name} className="h-10 w-10 text-sm" />
                  <div>
                    <div className="text-sm font-semibold">{q.name}</div>
                    <div className="text-xs text-muted-foreground">{q.detail}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
