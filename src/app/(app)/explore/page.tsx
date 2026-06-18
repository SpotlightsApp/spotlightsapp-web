import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { JobsBrowser } from "@/components/jobs/jobs-browser";
import { getJobs } from "@/lib/data";
import { getDict } from "@/lib/i18n/server";

export const metadata: Metadata = { title: "Explore · Spotlight" };

export default async function ExplorePage() {
  const [jobs, t] = await Promise.all([getJobs(), getDict()]);

  return (
    <Container className="py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="font-display text-4xl text-foreground sm:text-5xl">
          {t.jobsPage.heading}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          {t.jobsPage.sub}
        </p>
      </header>
      <JobsBrowser jobs={jobs} />
    </Container>
  );
}
