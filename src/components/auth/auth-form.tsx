"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { useI18n } from "@/lib/i18n/provider";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const { t } = useI18n();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const isSignup = mode === "signup";
  const supabase = createClient();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setConfirming(false);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    // NOTE: university (.ac.th) email gating is disabled for testing so any
    // real email can sign up. Re-enable before launch.

    if (isSignup) {
      const name = (form.elements.namedItem("name") as HTMLInputElement).value;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      // If email confirmation is OFF, Supabase returns a session — log straight in.
      if (data.session) {
        router.push("/dashboard");
        router.refresh();
        return;
      }
      // Otherwise wait for the emailed confirmation link (→ /auth/callback).
      setConfirming(true);
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    // Return to the gated page the proxy bounced us from, if it's a safe path.
    const target = new URLSearchParams(window.location.search).get("redirect");
    const dest =
      target && target.startsWith("/") && !target.startsWith("//")
        ? target
        : "/dashboard";
    router.push(dest);
    router.refresh();
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-foreground">
        {isSignup ? t.auth.signupTitle : t.auth.loginTitle}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {isSignup ? t.auth.signupSub : t.auth.loginSub}
      </p>

      <Button
        type="button"
        variant="outline"
        className="mt-6 w-full opacity-50 cursor-not-allowed"
        disabled
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
          <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
          <path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.06L5.84 9.9C6.71 7.3 9.14 4.75 12 4.75Z" />
        </svg>
        {t.auth.google}
      </Button>

      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        {t.auth.or}
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {isSignup && (
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
              {t.auth.name}
            </label>
            <Input id="name" name="name" placeholder="Praewa Saetang" required />
          </div>
        )}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            {t.auth.email}
          </label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
            {t.auth.password}
          </label>
          <Input id="password" name="password" type="password" placeholder="••••••••" required />
        </div>

        {confirming && <p className="text-sm text-green-600">{t.auth.confirm}</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSignup ? t.auth.signupSubmit : t.auth.loginSubmit}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {isSignup ? t.auth.haveAccount : t.auth.noAccount}
        <Link
          href={isSignup ? "/login" : "/signup"}
          className="font-medium text-accent-strong hover:underline"
        >
          {isSignup ? t.auth.loginLink : t.auth.createLink}
        </Link>
      </p>
    </div>
  );
}
