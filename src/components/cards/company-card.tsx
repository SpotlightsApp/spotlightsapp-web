"use client";

import Link from "next/link";
import { MapPin, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogoMark } from "@/components/ui/logo-mark";
import { useI18n } from "@/lib/i18n/provider";
import { fill } from "@/lib/i18n/dictionaries";
import type { Company } from "@/lib/types";

export function CompanyCard({ company }: { company: Company }) {
  const { t } = useI18n();
  return (
    <Card interactive className="group relative flex flex-col p-5">
      <Link
        href={`/companies/${company.slug}`}
        className="absolute inset-0 z-10 rounded-[var(--radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={company.name}
      />
      <div className="flex items-center gap-3">
        <LogoMark name={company.name} className="h-12 w-12 text-base" />
        <div className="min-w-0">
          <h3 className="truncate font-semibold tracking-tight group-hover:text-accent-strong">
            {company.name}
          </h3>
          <Badge variant="neutral" className="mt-1">
            {t.enums.industry[company.industry]}
          </Badge>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
        {company.tagline}
      </p>
      <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {company.location}
        </span>
        <span className="flex items-center gap-1 font-medium text-accent-strong">
          <Briefcase className="h-3.5 w-3.5" />
          {fill(t.companyProfile.openRolesShort, { n: company.openRoles })}
        </span>
      </div>
    </Card>
  );
}
