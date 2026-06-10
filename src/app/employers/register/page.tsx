import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmployerRegisterForm } from "@/components/employers/employer-register-form";
import { isAccessRestricted } from "@/lib/access";

export const metadata: Metadata = {
  title: "Employer registration · Spotlights",
};

export default function EmployerRegisterPage() {
  if (isAccessRestricted()) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface px-6">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
            <Lock className="h-6 w-6" />
          </span>
          <h1 className="font-display mt-5 text-2xl text-foreground">
            Spotlights for employers is in private beta
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Employer onboarding is invite-only right now. Reach out to the
            Spotlights team at{" "}
            <a
              href="mailto:pippinkantakom@gmail.com"
              className="font-medium text-accent-strong hover:underline"
            >
              pippinkantakom@gmail.com
            </a>{" "}
            to get your company set up — we&apos;ll create your workspace and
            walk you through the talent console.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button asChild variant="outline">
              <Link href="/employers">See Spotlights for employers</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-surface px-6 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-2xl">
        <EmployerRegisterForm />
      </div>
    </main>
  );
}
