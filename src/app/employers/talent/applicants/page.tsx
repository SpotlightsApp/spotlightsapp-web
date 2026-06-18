import { Inbox } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ApplicantActions } from "@/components/employers/talent/applicant-actions";
import { NoCompany } from "@/components/employers/talent/no-company";
import {
  getCompanyApplicants,
  getEmployerCompany,
} from "@/lib/employer/data";

export const metadata = {
  title: "Applicants — Spotlight for Employers",
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default async function ApplicantsPage() {
  const ctx = await getEmployerCompany();
  if (!ctx) return <NoCompany />;

  const applicants = await getCompanyApplicants(ctx.company.id);

  return (
    <Container className="py-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent-strong">
        Hiring
      </p>
      <h1 className="font-display mt-1 text-3xl sm:text-4xl">Applicants</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Students who applied to {ctx.company.name} roles — status changes show
        up on their dashboard instantly.
      </p>

      <Card className="mt-6 overflow-hidden p-0">
        {applicants.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
              <Inbox className="h-5 w-5" />
            </span>
            <p className="text-sm text-muted-foreground">
              No applications yet — they&apos;ll appear here as soon as a
              student applies to one of your roles.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {applicants.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4"
              >
                <Avatar>
                  <AvatarImage src={a.student.avatarUrl} alt="" />
                  <AvatarFallback>{initials(a.student.name) || "S"}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-[2]">
                  <p className="truncate text-sm font-semibold">
                    {a.student.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {[
                      a.student.headline ||
                        [a.student.school, a.student.gradYear && `’${String(a.student.gradYear).slice(-2)}`]
                          .filter(Boolean)
                          .join(" "),
                      a.student.location,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                <div className="hidden min-w-0 flex-1 md:block">
                  <p className="truncate text-sm text-muted-foreground">
                    {a.job.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {a.appliedDaysAgo === 0
                      ? "applied today"
                      : `applied ${a.appliedDaysAgo}d ago`}
                  </p>
                </div>
                <ApplicantActions applicationId={a.id} status={a.status} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </Container>
  );
}
