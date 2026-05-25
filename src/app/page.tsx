import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNavbar } from "@/components/marketing/site-navbar";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Hero } from "@/components/marketing/hero";
import { StatStrip } from "@/components/marketing/stat-strip";
import { LogoWall } from "@/components/marketing/logo-wall";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Categories } from "@/components/marketing/categories";
import { Testimonials } from "@/components/marketing/testimonials";
import { CtaBand } from "@/components/marketing/cta-band";
import { Reveal } from "@/components/marketing/reveal";
import { Container } from "@/components/ui/container";
import { JobCard } from "@/components/cards/job-card";
import { getFeaturedJobs } from "@/lib/data";

function FeaturedJobs() {
  const jobs = getFeaturedJobs(6);
  return (
    <section className="py-20">
      <Container>
        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">
              Featured opportunities
            </h2>
            <p className="mt-3 text-muted-foreground">
              Hand-picked roles from companies hiring right now.
            </p>
          </div>
          <Link
            href="/jobs"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-accent-strong hover:underline sm:flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, i) => (
            <Reveal key={job.id} delay={(i % 3) * 0.08}>
              <JobCard job={job} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        <Hero />
        <StatStrip />
        <LogoWall />
        <FeaturedJobs />
        <Categories />
        <HowItWorks />
        <Testimonials />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
