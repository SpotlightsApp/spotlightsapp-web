import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = { title: "Sign up — Spotlights" };

export default function StudentSignupPage() {
  return <AuthForm mode="signup" />;
}
