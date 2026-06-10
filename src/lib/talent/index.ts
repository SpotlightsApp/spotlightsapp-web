import { talentCandidates } from "./candidates";
import { talentUniversities, universityById } from "./universities";
import type {
  TalentCandidate,
  TalentDomain,
  TalentTier,
  TalentUniversity,
} from "./types";

export * from "./types";
export { talentCandidates } from "./candidates";
export { talentUniversities, universityById } from "./universities";

export const TALENT_DOMAINS: TalentDomain[] = [
  "Software",
  "Data & ML",
  "Product",
  "Design",
  "Quant & Finance",
  "Hardware",
];

export function tierOf(overall: number): TalentTier {
  if (overall >= 93) return "exceptional";
  if (overall >= 85) return "strong";
  if (overall >= 75) return "promising";
  return "developing";
}

export const TIER_META: Record<
  TalentTier,
  { label: string; node: string; chip: string; bar: string }
> = {
  // node: canvas/svg fill · chip: tailwind classes for score chips/badges · bar: progress fill
  exceptional: {
    label: "Exceptional",
    node: "#F5A623",
    chip: "bg-[#FFF4DC] text-[#92400E]",
    bar: "bg-[#F5A623]",
  },
  strong: {
    label: "Strong",
    node: "#3A78C2",
    chip: "bg-accent-soft text-accent-strong",
    bar: "bg-accent",
  },
  promising: {
    label: "Promising",
    node: "#7FA6D4",
    chip: "bg-[#EFF4FA] text-[#4A6E96]",
    bar: "bg-[#7FA6D4]",
  },
  developing: {
    label: "Developing",
    node: "#A9B8CA",
    chip: "bg-surface-2 text-muted-foreground",
    bar: "bg-[#A9B8CA]",
  },
};

export type RankedCandidate = TalentCandidate & { rank: number; tier: TalentTier };

let rankedCache: RankedCandidate[] | null = null;

export function getRankedCandidates(): RankedCandidate[] {
  if (!rankedCache) {
    rankedCache = [...talentCandidates]
      .sort(
        (a, b) =>
          b.scores.overall - a.scores.overall || a.name.localeCompare(b.name),
      )
      .map((c, i) => ({ ...c, rank: i + 1, tier: tierOf(c.scores.overall) }));
  }
  return rankedCache;
}

export function getCandidate(id: string): RankedCandidate | undefined {
  return getRankedCandidates().find((c) => c.id === id);
}

export function getUniversity(id: string): TalentUniversity {
  return (
    universityById.get(id) ?? {
      id,
      name: id,
      shortName: id,
      city: "",
      emailDomain: "example.edu",
      logoUrl: "",
    }
  );
}

export function candidateEmail(c: TalentCandidate): string {
  const uni = getUniversity(c.universityId);
  const slug = c.name
    .toLowerCase()
    .replace(/[^a-z ]/g, "")
    .trim()
    .split(/\s+/)
    .join(".");
  return `${slug}@${uni.emailDomain}`;
}

export function talentStats() {
  const ranked = getRankedCandidates();
  const total = ranked.length;
  const exceptional = ranked.filter((c) => c.tier === "exceptional").length;
  const shortlisted = ranked.filter((c) => c.status === "shortlisted").length;
  const advanced = ranked.filter((c) => c.status === "advanced").length;
  const newThisWeek = ranked.filter((c) => c.addedDaysAgo <= 7).length;
  const median =
    ranked[Math.floor(total / 2)]?.scores.overall ?? 0;
  return {
    total,
    universities: talentUniversities.length,
    exceptional,
    shortlisted,
    advanced,
    newThisWeek,
    median,
  };
}

export function domainCounts() {
  const ranked = getRankedCandidates();
  return TALENT_DOMAINS.map((d) => ({
    domain: d,
    count: ranked.filter((c) => c.domain === d).length,
  }));
}
