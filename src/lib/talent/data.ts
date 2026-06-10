/**
 * Talent data access — Supabase reads (server-side), same conventions as
 * src/lib/data.ts. The talent tables are readable by authenticated users only
 * (RLS), and the routes are proxy-gated to allowlisted sessions, so these run
 * with the signed-in user's cookie-bound client.
 *
 * If Supabase isn't configured (open local dev) or the tables are empty, we
 * fall back to the bundled seed module so the console still renders.
 */
import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import {
  getRankedCandidates as seedRankedCandidates,
  getUniversity as seedUniversity,
  rankCandidates,
  type RankedCandidate,
} from "@/lib/talent";
import type {
  CandidateExperience,
  CandidateProject,
  CandidateStatus,
  TalentCandidate,
  TalentDomain,
  TalentUniversity,
} from "@/lib/talent/types";

type UniversityRow = {
  id: string;
  name: string;
  short_name: string;
  city: string | null;
  email_domain: string | null;
  logo_url: string | null;
};

type CandidateRow = {
  id: string;
  name: string;
  university_id: string;
  degree: string | null;
  major: string | null;
  grad_year: number | null;
  gpa: number | string | null;
  location: string | null;
  headline: string | null;
  about: string | null;
  domain: string | null;
  skills: unknown;
  experience: unknown;
  projects: unknown;
  awards: unknown;
  coursework: unknown;
  score_overall: number;
  score_technical: number;
  score_execution: number;
  score_leadership: number;
  score_communication: number;
  score_trajectory: number;
  signals: unknown;
  watchouts: unknown;
  status: string;
  applied_for: string | null;
  avatar_url: string | null;
  added_at: string;
};

const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

const daysAgo = (iso: string) =>
  Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000));

function toUniversity(r: UniversityRow): TalentUniversity {
  return {
    id: r.id,
    name: r.name,
    shortName: r.short_name,
    city: r.city ?? "",
    emailDomain: r.email_domain ?? "example.edu",
    logoUrl: r.logo_url ?? "",
  };
}

function toCandidate(r: CandidateRow): TalentCandidate {
  return {
    id: r.id,
    name: r.name,
    universityId: r.university_id,
    degree: (r.degree ?? "BS") as TalentCandidate["degree"],
    major: r.major ?? "",
    gradYear: r.grad_year ?? 2026,
    gpa: r.gpa == null ? undefined : Number(r.gpa),
    location: r.location ?? "",
    headline: r.headline ?? "",
    about: r.about ?? "",
    domain: (r.domain ?? "Software") as TalentDomain,
    skills: arr<string>(r.skills),
    experience: arr<CandidateExperience>(r.experience),
    projects: arr<CandidateProject>(r.projects),
    awards: arr<string>(r.awards),
    coursework: arr<string>(r.coursework),
    scores: {
      overall: r.score_overall,
      technical: r.score_technical,
      execution: r.score_execution,
      leadership: r.score_leadership,
      communication: r.score_communication,
      trajectory: r.score_trajectory,
    },
    signals: arr<string>(r.signals),
    watchouts: arr<string>(r.watchouts),
    status: r.status as CandidateStatus,
    appliedFor: r.applied_for ?? "",
    addedDaysAgo: daysAgo(r.added_at),
    avatarUrl: r.avatar_url ?? `/people/candidates/${r.id}.jpg`,
  };
}

/** All candidates, ranked by overall score, with their university embedded. */
export const getTalentCandidates = cache(
  async (): Promise<RankedCandidate[]> => {
    try {
      const supabase = await createClient();
      const [candRes, uniRes] = await Promise.all([
        supabase.from("talent_candidates").select("*"),
        supabase.from("talent_universities").select("*"),
      ]);
      if (
        candRes.error ||
        uniRes.error ||
        !candRes.data?.length ||
        !uniRes.data?.length
      ) {
        return seedRankedCandidates();
      }
      const unis = new Map(
        (uniRes.data as UniversityRow[]).map((u) => [u.id, toUniversity(u)]),
      );
      return rankCandidates(
        (candRes.data as CandidateRow[]).map(toCandidate),
      ).map((c) => ({
        ...c,
        university: unis.get(c.universityId) ?? seedUniversity(c.universityId),
      }));
    } catch {
      return seedRankedCandidates();
    }
  },
);

export async function getTalentCandidate(
  id: string,
): Promise<RankedCandidate | undefined> {
  return (await getTalentCandidates()).find((c) => c.id === id);
}
