import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CompaniesBrowser } from "@/components/companies/companies-browser";
import { getCompanies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Companies hiring in Thailand — Spotlight",
};

export default function CompaniesPage() {
  const companies = getCompanies();
  return (
    <Container className="py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="font-display text-4xl text-foreground sm:text-5xl">
          Companies on Spotlight
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Discover the teams building Thailand&apos;s future — and the roles
          they&apos;re hiring for.
        </p>
      </header>
      <CompaniesBrowser companies={companies} />
    </Container>
  );
}
