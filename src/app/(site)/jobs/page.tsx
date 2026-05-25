import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { JobsBrowser } from "@/components/jobs/jobs-browser";
import { getJobs } from "@/lib/data";
import type { Industry, JobType } from "@/lib/types";

export const metadata: Metadata = {
  title: "Browse jobs & internships — Spotlight",
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; industry?: string; type?: string }>;
}) {
  const sp = await searchParams;
  const jobs = getJobs();

  return (
    <Container className="py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="font-display text-4xl text-foreground sm:text-5xl">
          Find your next role
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Internships, new-grad roles and full-time jobs from Thailand&apos;s
          leading companies.
        </p>
      </header>
      <JobsBrowser
        jobs={jobs}
        initialQuery={sp.q ?? ""}
        initialIndustry={sp.industry as Industry | undefined}
        initialType={sp.type as JobType | undefined}
      />
    </Container>
  );
}
