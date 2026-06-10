// Manage the seeded demo data (companies, jobs, events, talent network, demo
// users) in the linked Supabase project. Seeded content rows are marked by
// created_by IS NULL; everything created through the app carries the author's
// user id and is never touched.
//
//   node seed-admin.mjs status            what's seeded vs real right now
//   node seed-admin.mjs export            snapshot seeded rows -> seed-snapshot.json
//   node seed-admin.mjs remove --yes      delete ALL demo data (see flags)
//   node seed-admin.mjs add               restore demo data from seed-snapshot.json
//
// Flags:
//   remove: --keep-talent (leave talent_* tables), --keep-users (leave demo accounts)
//   add:    --no-users    (content only, skip seed-users.mjs)
//
// Cascades to know about: deleting a seeded company deletes its jobs and the
// applications/saved_jobs on those jobs — INCLUDING ones by real users. The
// script counts and warns before doing anything, and refuses without --yes.

import { createClient } from "@supabase/supabase-js";
import { execSync } from "node:child_process";
import fs from "node:fs";

const DEMO_USER_EMAILS = [
  "demo.student@spotlightsapp.com",
  "demo.recruiter@spotlightsapp.com",
];
// Beta accounts re-attached to the demo Google workspace on `add`.
const BETA_MEMBERS = [
  { email: "bzhou1018@berkeley.edu", companySlug: "google", role: "owner" },
  { email: "demo.recruiter@spotlightsapp.com", companySlug: "google", role: "owner" },
];
const SNAPSHOT = "seed-snapshot.json";
const DAY = 86_400_000;

const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split("\n").filter(Boolean).map((l) => {
    const i = l.indexOf("=");
    return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
  }),
);
const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const [mode, ...rest] = process.argv.slice(2);
const flags = new Set(rest);

function die(msg) {
  console.error(msg);
  process.exit(1);
}
function check(res, what) {
  if (res.error) die(`${what} failed: ${res.error.message}`);
  return res.data;
}

async function listDemoUsers() {
  const users = [];
  for (let page = 1; page <= 10; page++) {
    const { data } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    users.push(...(data?.users ?? []));
    if (!data?.users?.length || data.users.length < 200) break;
  }
  return users.filter((u) => DEMO_USER_EMAILS.includes(u.email?.toLowerCase()));
}

async function seededIds() {
  const companies = check(
    await admin.from("companies").select("id,slug").is("created_by", null),
    "companies select",
  );
  const jobs = check(
    await admin.from("jobs").select("id,slug,company_id").is("created_by", null),
    "jobs select",
  );
  return { companies, jobs };
}

/* ------------------------------- status ------------------------------ */
async function status() {
  const { companies, jobs } = await seededIds();
  const realCompanies = check(
    await admin.from("companies").select("id,slug").not("created_by", "is", null),
    "companies select",
  );
  const realJobs = check(
    await admin.from("jobs").select("id").not("created_by", "is", null),
    "jobs select",
  );
  const events = check(
    await admin.from("events").select("id").is("created_by", null),
    "events select",
  );
  const talentC = await admin.from("talent_candidates").select("id", { count: "exact", head: true });
  const talentU = await admin.from("talent_universities").select("id", { count: "exact", head: true });
  const demoUsers = await listDemoUsers();

  const seededJobIds = jobs.map((j) => j.id);
  let realActivityOnSeed = 0;
  if (seededJobIds.length) {
    const demoIds = demoUsers.map((u) => u.id);
    const apps = check(
      await admin.from("applications").select("id,user_id").in("job_id", seededJobIds),
      "applications select",
    );
    realActivityOnSeed = apps.filter((a) => !demoIds.includes(a.user_id)).length;
  }

  console.log(`Seeded:  ${companies.length} companies, ${jobs.length} jobs, ${events.length} events`);
  console.log(`         ${talentC.count ?? 0} talent candidates, ${talentU.count ?? 0} talent universities`);
  console.log(`         demo users present: ${demoUsers.map((u) => u.email).join(", ") || "none"}`);
  console.log(`Real:    ${realCompanies.length} companies (${realCompanies.map((c) => c.slug).join(", ") || "—"}), ${realJobs.length} jobs`);
  console.log(`Caution: ${realActivityOnSeed} application(s) by real users sit on seeded jobs (deleted on remove)`);
}

/* ------------------------------- export ------------------------------ */
async function exportSnapshot() {
  const companies = check(
    await admin.from("companies").select("*").is("created_by", null).order("slug"),
    "companies",
  );
  const companyById = new Map(companies.map((c) => [c.id, c.slug]));
  const jobs = check(
    await admin.from("jobs").select("*").is("created_by", null).order("slug"),
    "jobs",
  );
  const events = check(
    await admin.from("events").select("*").is("created_by", null).order("slug"),
    "events",
  );
  const universities = check(
    await admin.from("talent_universities").select("*").order("id"),
    "talent_universities",
  );
  const candidates = check(
    await admin.from("talent_candidates").select("*").order("id"),
    "talent_candidates",
  );

  const now = Date.now();
  const snapshot = {
    exportedAt: new Date(now).toISOString(),
    companies: companies.map(({ id, created_by, created_at, ...c }) => c),
    jobs: jobs.map(({ id, company_id, created_by, posted_at, ...j }) => ({
      ...j,
      company_slug: companyById.get(company_id) ?? null,
      posted_days_ago: Math.max(0, Math.round((now - new Date(posted_at).getTime()) / DAY)),
    })),
    events: events.map(({ id, company_id, created_by, created_at, starts_at, ...e }) => ({
      ...e,
      company_slug: company_id ? (companyById.get(company_id) ?? null) : null,
      starts_in_days: starts_at
        ? Math.round((new Date(starts_at).getTime() - now) / DAY)
        : null,
    })),
    talent_universities: universities.map(({ created_at, ...u }) => u),
    talent_candidates: candidates.map(({ created_at, added_at, ...c }) => ({
      ...c,
      added_days_ago: Math.max(0, Math.round((now - new Date(added_at).getTime()) / DAY)),
    })),
  };
  fs.writeFileSync(SNAPSHOT, JSON.stringify(snapshot, null, 1));
  console.log(
    `wrote ${SNAPSHOT}: ${snapshot.companies.length} companies, ${snapshot.jobs.length} jobs, ` +
      `${snapshot.events.length} events, ${snapshot.talent_candidates.length} candidates, ` +
      `${snapshot.talent_universities.length} universities`,
  );
}

/* ------------------------------- remove ------------------------------ */
async function remove() {
  const { companies, jobs } = await seededIds();
  const demoUsers = await listDemoUsers();
  const demoIds = demoUsers.map((u) => u.id);

  let realActivity = 0;
  if (jobs.length) {
    const apps = check(
      await admin.from("applications").select("id,user_id").in("job_id", jobs.map((j) => j.id)),
      "applications select",
    );
    realActivity = apps.filter((a) => !demoIds.includes(a.user_id)).length;
  }

  console.log(`Will delete: ${companies.length} seeded companies (+ their jobs/applications),`);
  console.log(`             seeded events${flags.has("--keep-talent") ? "" : ", all talent_* rows"}${flags.has("--keep-users") ? "" : `, demo users (${DEMO_USER_EMAILS.join(", ")})`}`);
  if (realActivity > 0) {
    console.log(`WARNING: ${realActivity} application(s) by REAL users on seeded jobs will be removed.`);
  }
  if (!flags.has("--yes")) die("Refusing without --yes.");

  check(await admin.from("events").delete().is("created_by", null).select("id"), "events delete");
  // companies cascade -> jobs -> applications/saved_jobs
  const deletedCompanies = check(
    await admin.from("companies").delete().is("created_by", null).select("slug"),
    "companies delete",
  );
  console.log(`deleted companies: ${deletedCompanies.map((c) => c.slug).join(", ") || "none"}`);

  if (!flags.has("--keep-talent")) {
    check(await admin.from("talent_candidates").delete().neq("id", ""), "talent_candidates delete");
    check(await admin.from("talent_universities").delete().neq("id", ""), "talent_universities delete");
    console.log("deleted talent network rows");
  }

  if (!flags.has("--keep-users")) {
    for (const u of demoUsers) {
      const res = await admin.auth.admin.deleteUser(u.id);
      console.log(res.error ? `delete ${u.email} failed: ${res.error.message}` : `deleted user ${u.email}`);
    }
  }
  console.log("done — run `node seed-admin.mjs status` to verify");
}

/* --------------------------------- add ------------------------------- */
async function add() {
  if (!fs.existsSync(SNAPSHOT)) die(`${SNAPSHOT} not found — run \`export\` first (or check it into the repo).`);
  const snap = JSON.parse(fs.readFileSync(SNAPSHOT, "utf8"));
  const now = Date.now();

  check(
    await admin.from("companies").upsert(snap.companies, { onConflict: "slug", ignoreDuplicates: true }),
    "companies upsert",
  );
  const companies = check(await admin.from("companies").select("id,slug"), "companies select");
  const idBySlug = new Map(companies.map((c) => [c.slug, c.id]));

  const jobRows = snap.jobs.map(({ company_slug, posted_days_ago, ...j }) => ({
    ...j,
    company_id: idBySlug.get(company_slug),
    posted_at: new Date(now - (posted_days_ago ?? 0) * DAY).toISOString(),
  }));
  check(await admin.from("jobs").upsert(jobRows, { onConflict: "slug", ignoreDuplicates: true }), "jobs upsert");

  const eventRows = snap.events.map(({ company_slug, starts_in_days, ...e }) => ({
    ...e,
    company_id: company_slug ? (idBySlug.get(company_slug) ?? null) : null,
    starts_at: starts_in_days == null ? null : new Date(now + starts_in_days * DAY).toISOString(),
  }));
  check(await admin.from("events").upsert(eventRows, { onConflict: "slug", ignoreDuplicates: true }), "events upsert");

  check(
    await admin
      .from("talent_universities")
      .upsert(snap.talent_universities, { onConflict: "id", ignoreDuplicates: true }),
    "talent_universities upsert",
  );
  const candidateRows = snap.talent_candidates.map(({ added_days_ago, ...c }) => ({
    ...c,
    added_at: new Date(now - (added_days_ago ?? 0) * DAY).toISOString(),
  }));
  check(
    await admin.from("talent_candidates").upsert(candidateRows, { onConflict: "id", ignoreDuplicates: true }),
    "talent_candidates upsert",
  );
  console.log(
    `content restored: ${snap.companies.length} companies, ${snap.jobs.length} jobs, ` +
      `${snap.events.length} events, ${snap.talent_candidates.length} candidates`,
  );

  if (!flags.has("--no-users")) {
    console.log("seeding demo users via seed-users.mjs ...");
    execSync("node seed-users.mjs", { stdio: "inherit" });
  }

  // Re-link beta accounts to their demo workspace.
  const allUsers = [];
  for (let page = 1; page <= 10; page++) {
    const { data } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    allUsers.push(...(data?.users ?? []));
    if (!data?.users?.length || data.users.length < 200) break;
  }
  for (const m of BETA_MEMBERS) {
    const user = allUsers.find((u) => u.email?.toLowerCase() === m.email.toLowerCase());
    const companyId = idBySlug.get(m.companySlug);
    if (!user || !companyId) {
      console.log(`skip membership ${m.email} -> ${m.companySlug} (missing user or company)`);
      continue;
    }
    const res = await admin.from("company_members").upsert(
      { company_id: companyId, user_id: user.id, role: m.role },
      { onConflict: "company_id,user_id", ignoreDuplicates: true },
    );
    console.log(res.error ? `membership ${m.email} failed: ${res.error.message}` : `linked ${m.email} -> ${m.companySlug}`);
  }
  console.log("done — run `node seed-admin.mjs status` to verify");
}

/* -------------------------------- main ------------------------------- */
if (mode === "status") await status();
else if (mode === "export") await exportSnapshot();
else if (mode === "remove") await remove();
else if (mode === "add") await add();
else die("Usage: node seed-admin.mjs <status|export|remove --yes|add> [flags]");
