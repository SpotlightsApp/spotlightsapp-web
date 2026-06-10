"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";

/** Shown on the auth screens while the app is invite-only (private beta). */
export function InviteOnly() {
  const { t } = useI18n();
  return (
    <div className="text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
        <Lock className="h-6 w-6" />
      </span>
      <h1 className="font-display mt-5 text-2xl text-foreground">
        {t.auth.inviteOnlyTitle}
      </h1>
      <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
        {t.auth.inviteOnlyBody}
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Button asChild>
          <Link href="/waitlist">{t.auth.inviteOnlyWaitlistCta}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/login">{t.auth.loginLink}</Link>
        </Button>
      </div>
    </div>
  );
}
