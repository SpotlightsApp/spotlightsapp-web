import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/marketing/reveal";

export function CtaBand() {
  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-foreground px-8 py-14 text-center sm:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
            />
            <h2 className="font-display relative text-3xl text-white sm:text-4xl">
              Your next opportunity is waiting.
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-white/70">
              Join thousands of students and new grads finding internships and jobs
              with Thailand&apos;s leading companies.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" pill>
                <Link href="/signup">Create your free profile</Link>
              </Button>
              <Button
                asChild
                size="lg"
                pill
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/jobs">Browse jobs</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
