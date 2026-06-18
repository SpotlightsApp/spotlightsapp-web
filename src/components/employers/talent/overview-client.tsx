"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  BookmarkCheck,
  GraduationCap,
  UserCheck,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TalentGraph } from "@/components/employers/talent/talent-graph";
import { ScorePill } from "@/components/employers/talent/score-pill";
import type { RankedCandidate } from "@/lib/talent";

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

type Stats = {
  total: number;
  universities: number;
  exceptional: number;
  shortlisted: number;
  advanced: number;
  newThisWeek: number;
  median: number;
};

type DomainCount = { domain: string; count: number };

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon?: React.ElementType;
  label: string;
  value: string | number;
  sub: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        {Icon && (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
            <Icon className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
      <p className="font-display mt-2 text-3xl tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </Card>
  );
}

function TopCandidateRow({ c }: { c: RankedCandidate }) {
  const uni = c.university;
  return (
    <Link
      href={`/employers/talent/candidates/${c.id}`}
      className="-mx-2 flex items-center gap-3 rounded-[var(--radius)] px-2 py-2 transition-colors hover:bg-surface-2"
    >
      <span className="w-5 shrink-0 text-center text-xs font-medium tabular-nums text-muted-foreground">
        {c.rank}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={c.avatarUrl}
        alt=""
        className="h-9 w-9 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{c.name}</p>
        <p className="truncate text-xs text-muted-foreground">
          {uni.shortName} ’{String(c.gradYear).slice(2)} · {c.domain}
        </p>
      </div>
      <ScorePill score={c.scores.overall} size="sm" />
    </Link>
  );
}

export function OverviewClient({
  candidates,
  stats,
  domains,
}: {
  candidates: RankedCandidate[];
  stats: Stats;
  domains: DomainCount[];
}) {
  const top = candidates.slice(0, 6);
  const maxDomain = Math.max(...domains.map((d) => d.count));

  return (
    <Container className="py-8">
      <motion.div variants={stagger} initial="hidden" animate="show">
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-strong">
              Talent network
            </p>
            <h1 className="font-display mt-1 text-3xl sm:text-4xl">
              Every candidate, one map
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {stats.total} candidates across {stats.universities} universities,
              ranked by Spotlight’s overall signal score.
            </p>
          </div>
          <Button asChild>
            <Link href="/employers/talent/candidates">
              Review candidates
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          <StatCard
            icon={GraduationCap}
            label="In network"
            value={stats.total}
            sub={`${stats.universities} universities · ${stats.newThisWeek} new this week`}
          />
          <StatCard
            icon={Sparkles}
            label="Exceptional"
            value={stats.exceptional}
            sub="Overall score 93 or higher"
          />
          <StatCard
            icon={BookmarkCheck}
            label="Shortlisted"
            value={stats.shortlisted}
            sub="Saved for team review"
          />
          <StatCard
            icon={UserCheck}
            label="Advanced"
            value={stats.advanced}
            sub="Moved to interviews"
          />
        </motion.div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <Card className="h-[600px] overflow-hidden">
              <TalentGraph candidates={candidates} />
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold leading-tight tracking-tight">
                  Top candidates
                </h2>
                <Link
                  href="/employers/talent/candidates"
                  className="text-xs font-medium text-accent-strong hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="mt-3 flex flex-col gap-1">
                {top.map((c) => (
                  <TopCandidateRow key={c.id} c={c} />
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="font-semibold leading-tight tracking-tight">
                Network mix
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {domains.map((d) => (
                  <li key={d.domain} className="flex items-center gap-3">
                    <span className="w-28 shrink-0 truncate text-xs text-muted-foreground">
                      {d.domain}
                    </span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                      <span
                        className="block h-full rounded-full bg-accent"
                        style={{ width: `${(d.count / maxDomain) * 100}%` }}
                      />
                    </span>
                    <span className="w-6 text-right text-xs font-medium tabular-nums">
                      {d.count}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </Container>
  );
}
