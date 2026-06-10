// Employer-side talent types. These mirror the eventual Supabase tables so
// the seeded dataset in ./candidates.ts can be swapped for real queries
// without touching the UI (same convention as src/lib/types.ts).

export type TalentDomain =
  | "Software"
  | "Data & ML"
  | "Product"
  | "Design"
  | "Quant & Finance"
  | "Hardware";

export type TalentTier = "exceptional" | "strong" | "promising" | "developing";

export type CandidateStatus = "new" | "shortlisted" | "advanced";

export interface TalentScores {
  overall: number;
  technical: number;
  execution: number;
  leadership: number;
  communication: number;
  trajectory: number;
}

export interface CandidateExperience {
  title: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
}

export interface CandidateProject {
  name: string;
  description: string;
}

export interface TalentUniversity {
  id: string;
  name: string;
  shortName: string;
  city: string;
  emailDomain: string;
  logoUrl: string;
}

export interface TalentCandidate {
  id: string;
  name: string;
  universityId: string;
  degree: "BS" | "BA" | "MS" | "MEng" | "PhD" | "MBA";
  major: string;
  gradYear: number;
  gpa?: number;
  location: string;
  headline: string;
  about: string;
  domain: TalentDomain;
  skills: string[];
  experience: CandidateExperience[];
  projects: CandidateProject[];
  awards?: string[];
  coursework?: string[];
  scores: TalentScores;
  signals: string[];
  watchouts?: string[];
  status: CandidateStatus;
  appliedFor: string;
  addedDaysAgo: number;
  avatarUrl: string;
}
