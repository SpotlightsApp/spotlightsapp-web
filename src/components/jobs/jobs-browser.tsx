"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { JobCard } from "@/components/cards/job-card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";
import { fill } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import type { JobWithCompany } from "@/lib/types";
import type { JobType, WorkMode, Industry } from "@/lib/types";

const TYPES: JobType[] = [
  "Internship",
  "New grad",
  "Full-time",
  "Part-time",
  "Contract",
];
const MODES: WorkMode[] = ["On-site", "Hybrid", "Remote"];

function Toggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "border-accent bg-accent-soft text-accent-strong"
          : "border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function JobsBrowser({
  jobs,
  initialQuery = "",
  initialIndustry,
  initialType,
}: {
  jobs: JobWithCompany[];
  initialQuery?: string;
  initialIndustry?: Industry;
  initialType?: JobType;
}) {
  const { t } = useI18n();
  const [q, setQ] = useState(initialQuery);
  const [types, setTypes] = useState<JobType[]>(initialType ? [initialType] : []);
  const [modes, setModes] = useState<WorkMode[]>([]);
  const [industries, setIndustries] = useState<Industry[]>(
    initialIndustry ? [initialIndustry] : [],
  );
  const [sort, setSort] = useState<"recent" | "salary">("recent");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allIndustries = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.industry))).sort(),
    [jobs],
  );

  function toggleItem<T>(list: T[], setList: (v: T[]) => void, value: T) {
    setList(
      list.includes(value) ? list.filter((x) => x !== value) : [...list, value],
    );
  }

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    const r = jobs.filter((j) => {
      if (
        query &&
        ![j.title, j.company.name, j.industry, ...j.skills]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
        return false;
      if (types.length && !types.includes(j.type)) return false;
      if (modes.length && !modes.includes(j.workMode)) return false;
      if (industries.length && !industries.includes(j.industry)) return false;
      return true;
    });
    return [...r].sort((a, b) =>
      sort === "salary"
        ? b.salaryMax - a.salaryMax
        : a.postedDaysAgo - b.postedDaysAgo,
    );
  }, [jobs, q, types, modes, industries, sort]);

  const activeCount = types.length + modes.length + industries.length;

  function clearAll() {
    setTypes([]);
    setModes([]);
    setIndustries([]);
  }

  const FilterPanel = (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold">{t.jobsPage.jobType}</h3>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((ty) => (
            <Toggle
              key={ty}
              active={types.includes(ty)}
              onClick={() => toggleItem(types, setTypes, ty)}
            >
              {t.enums.jobType[ty]}
            </Toggle>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold">{t.jobsPage.workMode}</h3>
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <Toggle
              key={m}
              active={modes.includes(m)}
              onClick={() => toggleItem(modes, setModes, m)}
            >
              {t.enums.workMode[m]}
            </Toggle>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold">{t.jobsPage.industry}</h3>
        <div className="flex flex-wrap gap-2">
          {allIndustries.map((ind) => (
            <Toggle
              key={ind}
              active={industries.includes(ind)}
              onClick={() => toggleItem(industries, setIndustries, ind)}
            >
              {t.enums.industry[ind]}
            </Toggle>
          ))}
        </div>
      </div>
      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1 text-sm font-medium text-accent-strong hover:underline cursor-pointer"
        >
          <X className="h-4 w-4" /> {t.jobsPage.clear} ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-24">{FilterPanel}</div>
      </aside>

      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-input bg-background px-4">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.jobsPage.searchPlaceholder}
              aria-label={t.jobsPage.searchPlaceholder}
              className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="md"
              pill
              className="lg:hidden"
              onClick={() => setFiltersOpen((v) => !v)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {t.jobsPage.filters}
              {activeCount > 0 ? ` (${activeCount})` : ""}
            </Button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "recent" | "salary")}
              aria-label="Sort by"
              className="h-11 rounded-full border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            >
              <option value="recent">{t.jobsPage.sortRecent}</option>
              <option value="salary">{t.jobsPage.sortSalary}</option>
            </select>
          </div>
        </div>

        {filtersOpen && (
          <div className="mt-4 rounded-[var(--radius)] border border-border bg-surface p-5 lg:hidden">
            {FilterPanel}
          </div>
        )}

        <p className="mt-5 text-sm text-muted-foreground">
          {fill(t.jobsPage.results, { n: results.length })}
        </p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {results.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {results.length === 0 && (
          <div className="mt-12 rounded-[var(--radius)] border border-dashed border-border p-12 text-center">
            <p className="font-medium">{t.jobsPage.noResultsTitle}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.jobsPage.noResultsBody}
            </p>
            <Button variant="outline" className="mt-4" onClick={clearAll}>
              {t.jobsPage.clear}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
