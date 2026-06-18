import { CompanyLogo } from "@/components/ui/company-logo";
import { Container } from "@/components/ui/container";
import { JobsManager } from "@/components/employers/talent/jobs-manager";
import { NoCompany } from "@/components/employers/talent/no-company";
import { getJobsByCompany } from "@/lib/data";
import {
  getCompanyApplicationCounts,
  getEmployerCompany,
} from "@/lib/employer/data";

export const metadata = {
  title: "My jobs — Spotlight for Employers",
};

export default async function EmployerJobsPage() {
  const ctx = await getEmployerCompany();
  if (!ctx) return <NoCompany />;

  const [jobs, counts] = await Promise.all([
    getJobsByCompany(ctx.company.id, { includeClosed: true }),
    getCompanyApplicationCounts(ctx.company.id),
  ]);

  return (
    <Container className="py-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-accent-strong">
          Hiring
        </p>
        <h1 className="font-display mt-1 flex items-center gap-3 text-3xl sm:text-4xl">
          <CompanyLogo
            name={ctx.company.name}
            src={ctx.company.logoUrl}
            className="h-9 w-9 text-sm"
          />
          My jobs
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Roles posted by {ctx.company.name} — publish, edit, close, or remove;
          the student job board updates instantly.
        </p>
      </div>

      <div className="mt-6">
        <JobsManager
          companyName={ctx.company.name}
          jobs={jobs}
          counts={counts}
        />
      </div>
    </Container>
  );
}
