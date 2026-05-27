import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/marketing/reveal";
import { WaitlistForm } from "@/components/marketing/waitlist-form";

export function Waitlist() {
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
              Launching soon
            </span>
            <h2 className="font-display relative mt-3 text-3xl text-white sm:text-4xl">
              Be first in the spotlight
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-white/70">
              We&apos;re building Thailand&apos;s home for early-career talent.
              Join the waitlist and we&apos;ll get you in as we roll out.
            </p>
            <div className="relative mt-8">
              <WaitlistForm />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
