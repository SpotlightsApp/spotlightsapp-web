import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";
import { EmployerRegisterForm } from "@/components/employers/employer-register-form";
import { VALID_INVITE_TOKENS } from "@/lib/invite-tokens";

export const metadata: Metadata = {
  title: "Employer registration — Spotlights",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function EmployerRegisterPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const rawToken = params.token;
  const token = Array.isArray(rawToken) ? rawToken[0] : rawToken;
  const isValid = typeof token === "string" && VALID_INVITE_TOKENS.includes(token);

  if (!isValid) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface px-6 py-16">
        <div className="w-full max-w-md rounded-[var(--radius)] border border-border bg-background p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h1 className="mt-5 font-display text-2xl text-foreground">
            Invalid or expired invite
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            This employer registration link isn&apos;t valid. Please contact the
            Spotlights team to request a new invite.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface px-6 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-2xl">
        <EmployerRegisterForm token={token} />
      </div>
    </main>
  );
}
