/**
 * Invite-only access for the private beta.
 *
 * Always-on by design (no env flag) so local and prod behave identically with
 * zero Vercel configuration: only emails in public.access_allowlist may create
 * an account or reach the product — student pages and the employer talent
 * console alike. Enforcement lives in src/proxy.ts (sessions), the DB trigger
 * on auth.users (signups), and RLS on the talent tables (data). Manage testers
 * with `node grant-access.mjs <email>` or by inserting into access_allowlist.
 *
 * When the beta opens up, flip this to false (or delete the gate call sites).
 */
export function isAccessRestricted() {
  return true;
}
