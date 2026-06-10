/**
 * Domain types for Spotlight.
 * These mirror the eventual Supabase tables so the mock layer in
 * `lib/data` can be swapped for real queries without touching the UI.
 */

export type JobType =
  | "Internship"
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "New grad";

export type WorkMode = "On-site" | "Hybrid" | "Remote";

export type Industry =
  | "Software"
  | "Fintech"
  | "E-commerce"
  | "Consulting"
  | "Marketing"
  | "Design"
  | "Data & AI"
  | "Hospitality"
  | "Healthcare"
  | "Energy";

export interface Company {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  about: string;
  industry: Industry;
  size: string; // e.g. "201–500"
  location: string; // HQ
  website: string;
  logoUrl?: string;
  hiring: boolean;
  openRoles: number;
  perks: string[];
  founded: number;
}

export interface Job {
  id: string;
  slug: string;
  title: string;
  companyId: string;
  type: JobType;
  workMode: WorkMode;
  location: string;
  industry: Industry;
  salaryMin: number; // THB
  salaryMax: number; // THB
  salaryPeriod: "mo" | "yr";
  postedDaysAgo: number;
  applicants: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  featured?: boolean;
  status?: "open" | "closed";
}

export interface CareerEvent {
  id: string;
  slug: string;
  title: string;
  companyId?: string;
  host: string;
  kind: "Career fair" | "Info session" | "Workshop" | "Networking";
  mode: WorkMode;
  location: string;
  imageUrl?: string;
  date: string; // ISO
  durationMins: number;
  attendees: number;
  description: string;
}

export type JobWithCompany = Job & { company: Company };

/** A job the user has applied to, with its status and when they applied. */
export type ApplicationItem = {
  job: JobWithCompany;
  status: string;
  appliedAt: string;
};

export interface University {
  id: string;
  name: string;
  shortName: string;
  city: string;
}

export interface StudentProfile {
  name: string;
  headline: string;
  university: string;
  major: string;
  gradYear: number;
  location: string;
  about: string;
  skills: string[];
  openTo: JobType[];
  profileCompletion: number; // 0..100
}
