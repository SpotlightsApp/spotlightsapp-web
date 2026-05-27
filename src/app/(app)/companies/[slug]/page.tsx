import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  MapPin,
  Users,
  Calendar,
  Globe,
  Briefcase,
  ArrowLeft,
  Check,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LogoMark } from "@/components/ui/logo-mark";
import { JobCard } from "@/components/cards/job-card";
import { getCompanyBySlug, getJobsByCompany } from "@/lib/data";
import { getDict } from "@/lib/i18n/server";
import { fill } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCompanyBySlug(slug);
  return { title: c ? `${c.name} — Spotlight` : "Company" };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();
  const jobs = getJobsByCompany(company.id);
  const t = await getDict();

  const facts = [
    { icon: MapPin, label: company.location },
    { icon: Users, label: fill(t.companyProfile.employees, { size: company.size }) },
    { icon: Calendar, label: fill(t.companyProfile.founded, { year: company.founded }) },
    { icon: Briefcase, label: fill(t.companyProfile.openRolesShort, { n: company.openRoles }) },
  ];

  return (
    <>
      <div className="bg-gradient-to-b from-accent-soft/70 to-background">
        <Container className="py-10 sm:py-14">
          <Link
            href="/companies"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> {t.companyProfile.back}
          </Link>
          <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <LogoMark name={company.name} className="h-20 w-20 text-2xl" />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-4xl text-foreground">
                  {company.name}
                </h1>
                {company.hiring && <Badge variant="success" size="md">{t.companyProfile.hiring}</Badge>}
              </div>
              <p className="mt-2 max-w-xl text-muted-foreground">{company.tagline}</p>
              <a
                href={`https://${company.website}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong hover:underline"
              >
                <Globe className="h-4 w-4" />
                {company.website}
              </a>
            </div>
          </div>
        </Container>
      </div>

      <Container className="grid gap-8 py-12 lg:grid-cols-[1fr_320px]">
        <div>
          <section>
            <h2 className="text-lg font-semibold">{t.companyProfile.about}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {company.about}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-semibold">
              {t.companyProfile.openRoles}{" "}
              <span className="text-muted-foreground">({jobs.length})</span>
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {jobs.map((j) => (
                <JobCard key={j.id} job={j} />
              ))}
            </div>
            {jobs.length === 0 && (
              <p className="mt-4 text-sm text-muted-foreground">
                {t.companyProfile.noRoles}
              </p>
            )}
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-muted-foreground">
              {t.companyProfile.facts}
            </h3>
            <ul className="mt-4 space-y-3">
              {facts.map((f) => (
                <li key={f.label} className="flex items-center gap-3 text-sm">
                  <f.icon className="h-4 w-4 text-muted-foreground" />
                  {f.label}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-muted-foreground">{t.companyProfile.perks}</h3>
            <ul className="mt-4 space-y-2">
              {company.perks.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-accent-strong" />
                  {p}
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </Container>
    </>
  );
}
