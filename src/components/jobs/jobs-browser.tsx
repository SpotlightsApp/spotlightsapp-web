"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { JobCard } from "@/components/cards/job-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { JobWithCompany } from "@/lib/data";
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
  const [q, setQ] = useState(initialQuery);
  const [types, setTypes] = useState<JobType[]>(
    initialType ? [initialType] : [],
  );
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

  function toggle<T>(list: T[], setList: (v: T[]) => void, value: T) {
    setList(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  }

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    let r = jobs.filter((j) => {
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
    r = [...r].sort((a, b) =>
      sort === "salary" ? b.salaryMax - a.salaryMax : a.postedDaysAgo - b.postedDaysAgo,
    );
    return r;
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
        <h3 className="mb-3 text-sm font-semibold">Job type</h3>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <Toggle key={t} active={types.includes(t)} onClick={() => toggle(types, setTypes, t)}>
              {t}
            </Toggle>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold">Work mode</h3>
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <Toggle key={m} active={modes.includes(m)} onClick={() => toggle(modes, setModes, m)}>
              {m}
            </Toggle>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold">Industry</h3>
        <div className="flex flex-wrap gap-2">
          {allIndustries.map((ind) => (
            <Toggle
              key={ind}
              active={industries.includes(ind)}
              onClick={() => toggle(industries, setIndustries, ind)}
            >
              {ind}
            </Toggle>
          ))}
        </div>
      </div>
      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1 text-sm font-medium text-accent-strong hover:underline cursor-pointer"
        >
          <X className="h-4 w-4" /> Clear filters ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Desktop filter sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">{FilterPanel}</div>
      </aside>

      <div>
        {/* Search + sort bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-input bg-background px-4">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search jobs, companies, skills"
              aria-label="Search jobs"
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
              Filters{activeCount > 0 ? ` (${activeCount})` : ""}
            </Button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "recent" | "salary")}
              aria-label="Sort by"
              className="h-11 rounded-full border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            >
              <option value="recent">Most recent</option>
              <option value="salary">Highest salary</option>
            </select>
          </div>
        </div>

        {/* Mobile filter panel */}
        {filtersOpen && (
          <div className="mt-4 rounded-[var(--radius)] border border-border bg-surface p-5 lg:hidden">
            {FilterPanel}
          </div>
        )}

        <p className="mt-5 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "role" : "roles"} found
        </p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {results.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {results.length === 0 && (
          <div className="mt-12 rounded-[var(--radius)] border border-dashed border-border p-12 text-center">
            <p className="font-medium">No roles match your filters</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try clearing some filters or searching for something else.
            </p>
            <Button variant="outline" className="mt-4" onClick={clearAll}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
