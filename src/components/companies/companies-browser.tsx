"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CompanyCard } from "@/components/cards/company-card";
import { cn } from "@/lib/utils";
import type { Company, Industry } from "@/lib/types";

export function CompaniesBrowser({ companies }: { companies: Company[] }) {
  const [q, setQ] = useState("");
  const [industry, setIndustry] = useState<Industry | "All">("All");

  const industries = useMemo(
    () => ["All", ...Array.from(new Set(companies.map((c) => c.industry))).sort()],
    [companies],
  ) as (Industry | "All")[];

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return companies.filter((c) => {
      if (industry !== "All" && c.industry !== industry) return false;
      if (query && !`${c.name} ${c.tagline} ${c.industry}`.toLowerCase().includes(query))
        return false;
      return true;
    });
  }, [companies, q, industry]);

  return (
    <div>
      <div className="flex items-center gap-2 rounded-full border border-input bg-background px-4 sm:max-w-md">
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search companies"
          aria-label="Search companies"
          className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {industries.map((ind) => (
          <button
            key={ind}
            type="button"
            onClick={() => setIndustry(ind)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              industry === ind
                ? "border-accent bg-accent-soft text-accent-strong"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {ind}
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? "company" : "companies"}
      </p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((c) => (
          <CompanyCard key={c.id} company={c} />
        ))}
      </div>
    </div>
  );
}
