"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScorePill } from "@/components/employers/talent/score-pill";
import { UniversityLogo } from "@/components/employers/talent/university-logo";
import {
  TALENT_DOMAINS,
  TIER_META,
  talentUniversities,
  type RankedCandidate,
  type TalentTier,
} from "@/lib/talent";
import { cn } from "@/lib/utils";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

const STATUS_BADGE: Record<string, { label: string; variant: "neutral" | "accent" | "success" }> = {
  new: { label: "New", variant: "neutral" },
  shortlisted: { label: "Shortlisted", variant: "accent" },
  advanced: { label: "Advanced", variant: "success" },
};

const TIERS: TalentTier[] = ["exceptional", "strong", "promising", "developing"];

function CandidateRow({ c }: { c: RankedCandidate }) {
  const uni = c.university;
  const status = STATUS_BADGE[c.status];
  return (
    <li className="group relative transition-colors hover:bg-surface">
      <Link
        href={`/employers/talent/candidates/${c.id}`}
        className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`View ${c.name}`}
      />
      <div className="flex items-center gap-4 px-5 py-3.5">
        <span className="w-6 shrink-0 text-center text-xs font-medium tabular-nums text-muted-foreground">
          {c.rank}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={c.avatarUrl}
          alt=""
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-[2]">
          <p className="truncate text-sm font-semibold group-hover:text-accent-strong">
            {c.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">{c.headline}</p>
        </div>
        <div className="hidden min-w-0 flex-1 items-center gap-2 md:flex">
          <UniversityLogo name={uni.name} src={uni.logoUrl} className="h-[18px] w-[18px]" />
          <span className="truncate text-sm text-muted-foreground">
            {uni.shortName} ’{String(c.gradYear).slice(2)}
          </span>
        </div>
        <div className="hidden w-28 shrink-0 lg:block">
          <Badge variant="outline">{c.domain}</Badge>
        </div>
        <div className="hidden w-24 shrink-0 sm:block">
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
        <ScorePill score={c.scores.overall} />
      </div>
    </li>
  );
}

export function CandidatesBrowser({ candidates }: { candidates: RankedCandidate[] }) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("all");
  const [school, setSchool] = useState("all");
  const [tier, setTier] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return candidates.filter((c) => {
      if (domain !== "all" && c.domain !== domain) return false;
      if (school !== "all" && c.universityId !== school) return false;
      if (tier !== "all" && c.tier !== tier) return false;
      if (status !== "all" && c.status !== status) return false;
      if (!q) return true;
      const uni = c.university;
      return (
        c.name.toLowerCase().includes(q) ||
        c.headline.toLowerCase().includes(q) ||
        c.major.toLowerCase().includes(q) ||
        uni.name.toLowerCase().includes(q) ||
        uni.shortName.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [candidates, query, domain, school, tier, status]);

  return (
    <Container className="py-8">
      <motion.div variants={stagger} initial="hidden" animate="show">
        <motion.div variants={fadeUp}>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-strong">
            Talent network
          </p>
          <h1 className="font-display mt-1 text-3xl sm:text-4xl">Candidates</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ranked by overall signal score — filter by school, focus area, or
            pipeline status.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-6 flex flex-wrap items-center gap-3"
        >
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, skill, school…"
              className="h-9 w-64 rounded-md border border-input bg-background pl-8 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
          <Select value={domain} onValueChange={setDomain}>
            <SelectTrigger className="h-9 w-40">
              <SelectValue placeholder="Focus area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All focus areas</SelectItem>
              {TALENT_DOMAINS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={school} onValueChange={setSchool}>
            <SelectTrigger className="h-9 w-44">
              <SelectValue placeholder="School" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All schools</SelectItem>
              {talentUniversities.map((u) => (
                <SelectItem key={u.id} value={u.id}>
                  {u.shortName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-9 w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1.5">
            {TIERS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTier(tier === t ? "all" : t)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  tier === t
                    ? "border-accent bg-accent-soft text-accent-strong"
                    : "border-border text-muted-foreground hover:bg-surface-2",
                )}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: TIER_META[t].node }}
                />
                {TIER_META[t].label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-4 text-xs text-muted-foreground">
          {filtered.length} of {candidates.length} candidates
        </motion.p>

        <motion.div variants={fadeUp} className="mt-2">
          <Card className="overflow-hidden p-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
                  <Users className="h-5 w-5" />
                </span>
                <p className="text-sm text-muted-foreground">
                  No candidates match those filters yet.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {filtered.map((c) => (
                  <CandidateRow key={c.id} c={c} />
                ))}
              </ul>
            )}
          </Card>
        </motion.div>
      </motion.div>
    </Container>
  );
}
