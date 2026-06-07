import type {
  Course,
  Education,
  Identity,
  LookingFor,
  Organization,
  ProfileLink,
  WorkExperience,
} from "./types";

/** The whole editable profile, as the page holds it in state. */
export type FullProfile = {
  identity: Identity;
  links: ProfileLink[];
  lookingFor: LookingFor;
  about: string;
  skills: string[];
  work: WorkExperience[];
  education: Education[];
  courses: Course[];
  organizations: Organization[];
  languages: string[];
};

export function emptyProfile(name = ""): FullProfile {
  return {
    identity: {
      name,
      pronouns: "",
      headline: "",
      school: "",
      gradYear: "",
      location: "",
    },
    links: [],
    lookingFor: { jobTypes: [], roles: [], industries: [], locations: [] },
    about: "",
    skills: [],
    work: [],
    education: [],
    courses: [],
    organizations: [],
    languages: [],
  };
}

/* ------- mapping between the FullProfile shape and the DB row (snake_case) ---- */

type AnyRow = Record<string, unknown>;
const arr = <T>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
const str = (v: unknown): string => (typeof v === "string" ? v : "");

export function rowToProfile(row: AnyRow, fallbackName = ""): FullProfile {
  const lf = (row.looking_for ?? {}) as Partial<LookingFor>;
  return {
    identity: {
      name: str(row.full_name) || fallbackName,
      pronouns: str(row.pronouns),
      headline: str(row.headline),
      school: str(row.school),
      gradYear: str(row.grad_year),
      location: str(row.location),
      avatarUrl: str(row.avatar_url) || undefined,
    },
    links: arr<ProfileLink>(row.links),
    lookingFor: {
      jobTypes: arr<string>(lf.jobTypes),
      roles: arr<string>(lf.roles),
      industries: arr<string>(lf.industries),
      locations: arr<string>(lf.locations),
    },
    about: str(row.about),
    skills: arr<string>(row.skills),
    work: arr<WorkExperience>(row.work),
    education: arr<Education>(row.education),
    courses: arr<Course>(row.courses),
    organizations: arr<Organization>(row.organizations),
    languages: arr<string>(row.languages),
  };
}

export function profileToRow(p: FullProfile, id: string) {
  return {
    id,
    full_name: p.identity.name,
    pronouns: p.identity.pronouns,
    headline: p.identity.headline,
    school: p.identity.school,
    grad_year: p.identity.gradYear,
    location: p.identity.location,
    avatar_url: p.identity.avatarUrl ?? null,
    about: p.about,
    links: p.links,
    looking_for: p.lookingFor,
    skills: p.skills,
    work: p.work,
    education: p.education,
    courses: p.courses,
    organizations: p.organizations,
    languages: p.languages,
  };
}

/** 0–100 completeness used by the dashboard's profile-strength meter. */
export function profileCompletion(p: FullProfile): number {
  const checks: boolean[] = [
    !!p.identity.name.trim(),
    !!p.identity.headline.trim(),
    !!p.identity.school.trim(),
    !!p.identity.location.trim(),
    !!p.about.trim(),
    p.skills.length > 0,
    p.work.length > 0,
    p.education.length > 0,
    p.lookingFor.jobTypes.length > 0 || p.lookingFor.roles.length > 0,
    p.links.length > 0,
  ];
  const done = checks.filter(Boolean).length;
  return Math.round((done / checks.length) * 100);
}
