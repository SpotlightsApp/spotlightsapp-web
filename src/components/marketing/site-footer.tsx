"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { useI18n } from "@/lib/i18n/provider";

export function SiteFooter() {
  const { t } = useI18n();
  const L = t.footer.links;

  const columns = [
    {
      title: t.footer.studentsTitle,
      links: [
        { label: L.findJobs, href: "/jobs" },
        { label: L.internships, href: "/jobs?type=Internship" },
        { label: L.companies, href: "/companies" },
        { label: L.careerEvents, href: "/events" },
      ],
    },
    {
      title: t.footer.employersTitle,
      links: [
        { label: L.postJob, href: "/employers" },
        { label: L.findTalent, href: "/employers" },
        { label: L.campusEvents, href: "/employers" },
        { label: L.pricing, href: "/employers" },
      ],
    },
    {
      title: t.footer.resourcesTitle,
      links: [
        { label: L.careerGuides, href: "#" },
        { label: L.resumeTips, href: "#" },
        { label: L.salaryInsights, href: "#" },
        { label: L.helpCenter, href: "#" },
      ],
    },
    {
      title: t.footer.companyTitle,
      links: [
        { label: L.about, href: "#" },
        { label: L.universities, href: "#" },
        { label: L.privacy, href: "#" },
        { label: L.terms, href: "#" },
      ],
    },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-[15rem] text-sm text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-accent-strong"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {t.footer.madeIn}</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-foreground">
              {L.privacy}
            </Link>
            <Link href="#" className="hover:text-foreground">
              {L.terms}
            </Link>
            <Link href="#" className="hover:text-foreground">
              {L.contact}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
