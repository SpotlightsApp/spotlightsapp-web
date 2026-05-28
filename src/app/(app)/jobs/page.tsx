import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { JobsBrowser } from "@/components/jobs/jobs-browser";
import { getJobs } from "@/lib/data";
import { getDict } from "@/lib/i18n/server";
import type { Industry, JobType } from "@/lib/types";

export const metadata: Metadata = {
  title: "Browse jobs & internships — Spotlights",
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; industry?: string; type?: string }>;
}) {
  const sp = await searchParams;
  const jobs = getJobs();
  const t = await getDict();

  return (
    <Container className="py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="font-display text-4xl text-foreground sm:text-5xl">
          {t.jobsPage.heading}
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">{t.jobsPage.sub}</p>
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
