// Grant a tester access during the invite-only phase, with NO confirmation email.
//
//   node grant-access.mjs <email> ["Full Name"] [password]
//
// It allowlists the email (so the signup trigger + proxy gate permit it), then
// creates the auth user pre-confirmed via the service role (email_confirm: true
// sends no email, so it never hits Supabase's confirmation rate limit). Re-runs
// are idempotent: an existing user just gets confirmed + password reset.
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

const [email, name, passwordArg] = process.argv.slice(2);
if (!email) {
  console.error('Usage: node grant-access.mjs <email> ["Full Name"] [password]');
  process.exit(1);
}
const password = passwordArg || "SpotlightTester123!";
const fullName = name || email.split("@")[0];

// 1) Allowlist first — the auth.users trigger checks this on insert.
const al = await admin.from("access_allowlist").upsert(
  { email, note: "granted via grant-access.mjs" },
  { onConflict: "email" },
);
if (al.error) { console.error("allowlist failed:", al.error.message); process.exit(1); }
console.log(`allowlisted ${email}`);

// 2) Create the user pre-confirmed (no email sent). If they exist, confirm + reset.
async function findByEmail(e) {
  for (let page = 1; page <= 10; page++) {
    const { data } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    const u = data?.users?.find((x) => x.email?.toLowerCase() === e.toLowerCase());
    if (u) return u;
    if (!data?.users?.length || data.users.length < 200) break;
  }
  return null;
}

const created = await admin.auth.admin.createUser({
  email, password, email_confirm: true, user_metadata: { full_name: fullName },
});
let userId = created.data?.user?.id;
if (!userId) {
  const existing = await findByEmail(email);
  if (!existing) { console.error("could not create/find user:", created.error?.message); process.exit(1); }
  await admin.auth.admin.updateUserById(existing.id, {
    email_confirm: true, password, user_metadata: { full_name: fullName },
  });
  userId = existing.id;
  console.log("user already existed -> confirmed + password reset");
} else {
  console.log("user created (pre-confirmed)");
}

// 3) Minimal profile so the app shows their name.
await admin.from("profiles").upsert({ id: userId, full_name: fullName }, { onConflict: "id" });

console.log("\nReady to log in:");
console.log(`  email:    ${email}`);
console.log(`  password: ${password}`);
console.log("done");
