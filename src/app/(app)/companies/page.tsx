import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CompaniesBrowser } from "@/components/companies/companies-browser";
import { getCompanies } from "@/lib/data";
import { getDict } from "@/lib/i18n/server";

export const metadata: Metadata = { title: "Companies · Spotlight" };

export default async function CompaniesPage() {
  const [companies, t] = await Promise.all([getCompanies(), getDict()]);
  return (
    <Container className="py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="font-display text-4xl text-foreground sm:text-5xl">
          {t.companiesPage.heading}
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          {t.companiesPage.sub}
        </p>
      </header>
      <CompaniesBrowser companies={companies} />
    </Container>
  );
}
