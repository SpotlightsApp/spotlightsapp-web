import Link from "next/link";
import { Check } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { getDict } from "@/lib/i18n/server";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getDict();
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-foreground p-12 lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        />
        <Link href="/" className="relative inline-flex">
          <span className="inline-flex items-center gap-2">
            <img
              src="/favicon-32x32.png"
              alt=""
              aria-hidden
              className="h-8 w-8"
            />
            <span className="text-lg font-semibold tracking-tight text-white">
              Spotlight
            </span>
          </span>
        </Link>

        <div className="relative">
          <h2 className="font-display text-4xl text-white">
            {t.auth.panelTitle}
          </h2>
          <ul className="mt-8 space-y-4">
            {t.auth.panelBullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-white/80">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-foreground">
                  <Check className="h-4 w-4" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-white/50">{t.auth.panelFooter}</p>
      </div>

      {/* Form panel */}
      <div className="flex flex-col">
        <div className="p-6 lg:hidden">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
