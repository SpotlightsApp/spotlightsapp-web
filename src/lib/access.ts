/**
 * Invite-only access flag for the private testing phase.
 *
 * Set ACCESS_RESTRICTED="true" in the production environment to limit the app to
 * emails in the public.access_allowlist table. Leave it unset locally so dev
 * stays open. Enforcement lives in src/proxy.ts (sessions) and the DB trigger
 * (signups); this flag only drives prod-side UI/redirect behaviour.
 */
export function isAccessRestricted() {
  return process.env.ACCESS_RESTRICTED === "true";
}
