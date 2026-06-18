import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { InviteOnly } from "@/components/auth/invite-only";
import { isAccessRestricted } from "@/lib/access";

export const metadata: Metadata = { title: "Sign up · Spotlight" };

export default function StudentSignupPage() {
  if (isAccessRestricted()) return <InviteOnly />;
  return <AuthForm mode="signup" />;
}
