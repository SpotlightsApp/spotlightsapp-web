// Demo user + activity seed (uses the service-role key; bypasses RLS).
// Idempotent: safe to re-run. Cleanable (demo accounts + their rows).
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";

const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split("\n").filter(Boolean).map((l) => {
    const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
  }),
);
const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export const PW = "SpotlightDemo123!";
const A = { email: "demo.student@spotlightsapp.com", name: "Emma Carter" };
const B = { email: "demo.recruiter@spotlightsapp.com", name: "Jordan Lee" };

async function findByEmail(email) {
  // small project: scan first pages
  for (let page = 1; page <= 5; page++) {
    const { data } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    const u = data?.users?.find((x) => x.email === email);
    if (u) return u;
    if (!data?.users?.length || data.users.length < 200) break;
  }
  return null;
}

async function ensureUser(u) {
  const created = await admin.auth.admin.createUser({
    email: u.email, password: PW, email_confirm: true,
    user_metadata: { full_name: u.name },
  });
  if (created.data?.user) return created.data.user.id;
  // exists -> confirm + reset password so we can log in during recording
  const existing = await findByEmail(u.email);
  if (!existing) throw new Error(`could not create or find ${u.email}: ${created.error?.message}`);
  await admin.auth.admin.updateUserById(existing.id, {
    email_confirm: true, password: PW, user_metadata: { full_name: u.name },
  });
  return existing.id;
}

const aId = await ensureUser(A);
const bId = await ensureUser(B);
console.log("student:", aId, "recruiter:", bId);

await admin.from("profiles").upsert([
  {
    id: aId, full_name: A.name,
    headline: "CS @ Stanford · seeking 2026 software internship",
    school: "Stanford University", grad_year: "2026", location: "San Francisco, CA",
    about: "Junior CS student who loves building web apps and ML side-projects. Looking for a summer 2026 internship with a strong engineering team.",
    skills: ["React", "TypeScript", "Python", "SQL", "Figma", "Git"],
    avatar_url: "https://i.pravatar.cc/200?img=47",
  },
  {
    id: bId, full_name: B.name, headline: "Technical Recruiter at Google",
    location: "Mountain View, CA", avatar_url: "https://i.pravatar.cc/200?img=12",
  },
], { onConflict: "id" });

const { data: jobs } = await admin.from("jobs").select("id").order("posted_at").limit(5);
const { data: events } = await admin.from("events").select("id").limit(1);
if (jobs?.length) {
  await admin.from("applications").upsert(
    jobs.slice(0, 2).map((j) => ({ user_id: aId, job_id: j.id, status: "applied" })),
    { onConflict: "user_id,job_id" });
  await admin.from("saved_jobs").upsert(
    jobs.slice(2, 4).map((j) => ({ user_id: aId, job_id: j.id })),
    { onConflict: "user_id,job_id" });
}
if (events?.length)
  await admin.from("event_rsvps").upsert([{ user_id: aId, event_id: events[0].id }], { onConflict: "user_id,event_id" });

// Conversation (idempotent: reuse if the student already has one)
const { data: parts } = await admin.from("conversation_participants").select("conversation_id").eq("user_id", aId);
let convId = parts?.[0]?.conversation_id;
if (!convId) {
  const { data: conv, error: ce } = await admin
    .from("conversations")
    .insert({ last_message_at: new Date().toISOString() })
    .select("id")
    .single();
  if (ce || !conv) throw new Error("conversation insert failed: " + JSON.stringify(ce));
  convId = conv.id;
  await admin.from("conversation_participants").insert([
    { conversation_id: convId, user_id: bId },
    { conversation_id: convId, user_id: aId },
  ]);
  const now = Date.now();
  await admin.from("messages").insert([
    { conversation_id: convId, sender_id: bId, body: "Hi Emma! I saw your profile, your React projects are impressive. Are you open to a summer internship at Google?", created_at: new Date(now - 3600e3).toISOString() },
    { conversation_id: convId, sender_id: aId, body: "Hi Jordan, thank you! Yes, I'd love to learn more about the team and the role.", created_at: new Date(now - 3000e3).toISOString() },
    { conversation_id: convId, sender_id: bId, body: "Great. Let's set up a quick chat this week, I'll send a few times that work.", created_at: new Date(now - 1800e3).toISOString() },
  ]);
}
console.log("conversation:", convId);
console.log("DONE. Demo login -> email:", A.email, "password:", PW);
