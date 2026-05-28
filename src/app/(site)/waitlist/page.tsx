import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { getDict } from "@/lib/i18n/server";
import { WaitlistPageForm } from "./waitlist-page-form";

export const metadata: Metadata = {
  title: "Join the waitlist — Spotlights",
};

export default async function WaitlistPage() {
  const t = await getDict();
  return (
    <Container className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-16">
      <div className="w-full max-w-md text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-accent-strong">
          {t.waitlist.eyebrow}
        </span>
        <h1 className="font-display mt-3 text-3xl text-foreground sm:text-4xl">
          {t.waitlist.heading}
        </h1>
        <div className="mt-8">
          <WaitlistPageForm />
        </div>
      </div>
    </Container>
  );
}
