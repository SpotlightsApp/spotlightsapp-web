// One-off: generate supabase/migrations/20260610000011_seed_talent.sql from the
// bundled seed module (src/lib/talent/candidates.ts is `export const x = <JSON>;`).
import fs from "node:fs";

const src = fs.readFileSync("src/lib/talent/candidates.ts", "utf8");
const json = src.slice(src.indexOf("= [") + 2, src.lastIndexOf("]") + 1);
const candidates = JSON.parse(json);
if (candidates.length !== 48) throw new Error(`expected 48, got ${candidates.length}`);

const universities = [
  ["berkeley", "UC Berkeley", "Berkeley", "Berkeley, CA", "berkeley.edu"],
  ["stanford", "Stanford University", "Stanford", "Stanford, CA", "stanford.edu"],
  ["mit", "MIT", "MIT", "Cambridge, MA", "mit.edu"],
  ["cmu", "Carnegie Mellon University", "CMU", "Pittsburgh, PA", "cmu.edu"],
  ["harvard", "Harvard University", "Harvard", "Cambridge, MA", "harvard.edu"],
  ["princeton", "Princeton University", "Princeton", "Princeton, NJ", "princeton.edu"],
  ["ucla", "UCLA", "UCLA", "Los Angeles, CA", "ucla.edu"],
  ["uiuc", "University of Illinois Urbana-Champaign", "UIUC", "Urbana, IL", "illinois.edu"],
  ["gatech", "Georgia Tech", "Georgia Tech", "Atlanta, GA", "gatech.edu"],
  ["umich", "University of Michigan", "Michigan", "Ann Arbor, MI", "umich.edu"],
  ["uw", "University of Washington", "UW", "Seattle, WA", "uw.edu"],
  ["cornell", "Cornell University", "Cornell", "Ithaca, NY", "cornell.edu"],
  ["utaustin", "UT Austin", "UT Austin", "Austin, TX", "utexas.edu"],
  ["columbia", "Columbia University", "Columbia", "New York, NY", "columbia.edu"],
];

const S = (s) => (s == null ? "null" : `'${String(s).replace(/'/g, "''")}'`);
const J = (v) => `'${JSON.stringify(v ?? []).replace(/'/g, "''")}'::jsonb`;
const N = (v) => (v == null ? "null" : String(v));

let sql = `-- Seed data for the employer talent network (48 demo candidates).
-- Generated from src/lib/talent/candidates.ts — do not edit by hand.

insert into public.talent_universities (id, name, short_name, city, email_domain, logo_url) values
${universities
  .map(([id, name, short, city, dom]) =>
    `  (${S(id)}, ${S(name)}, ${S(short)}, ${S(city)}, ${S(dom)}, ${S(`/universities/${id}.png`)})`)
  .join(",\n")}
on conflict (id) do nothing;

insert into public.talent_candidates
  (id, name, university_id, degree, major, grad_year, gpa, location, headline,
   about, domain, skills, experience, projects, awards, coursework,
   score_overall, score_technical, score_execution, score_leadership,
   score_communication, score_trajectory, signals, watchouts, status,
   applied_for, avatar_url, added_at) values
${candidates
  .map((c) =>
    [
      "  (" + S(c.id),
      S(c.name),
      S(c.universityId),
      S(c.degree),
      S(c.major),
      N(c.gradYear),
      N(c.gpa),
      S(c.location),
      S(c.headline),
      S(c.about),
      S(c.domain),
      J(c.skills),
      J(c.experience),
      J(c.projects),
      J(c.awards),
      J(c.coursework),
      N(c.scores.overall),
      N(c.scores.technical),
      N(c.scores.execution),
      N(c.scores.leadership),
      N(c.scores.communication),
      N(c.scores.trajectory),
      J(c.signals),
      J(c.watchouts),
      S(c.status),
      S(c.appliedFor),
      S(c.avatarUrl),
      `now() - interval '${Number(c.addedDaysAgo)} days')`,
    ].join(", "))
  .join(",\n")}
on conflict (id) do nothing;
`;

fs.writeFileSync("supabase/migrations/20260610000011_seed_talent.sql", sql);
console.log("wrote seed migration,", candidates.length, "candidates,", universities.length, "universities");
