import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/marketing/reveal";
import { getDict } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "For employers · Hire early-career talent in Thailand | Spotlight",
};

export default async function EmployersPage() {
  const t = await getDict();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-accent-soft/70 via-background to-background">
      <Container className="pt-28 pb-24 sm:pt-36 sm:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="font-display text-4xl text-foreground sm:text-6xl">
              {t.employers.titlePre}
              <span className="text-accent-strong">
                {t.employers.titleHighlight}
              </span>
              {t.employers.titlePost}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              {t.employers.sub}
            </p>

            <ul className="mx-auto mt-7 flex max-w-xl flex-col items-start gap-2.5 text-left sm:items-center">
              {t.employers.valueProps.map((vp) => (
                <li
                  key={vp}
                  className="flex items-center gap-2.5 text-sm text-foreground"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {vp}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" pill>
                <Link href="/employers/register">{t.employers.postJob}</Link>
              </Button>
              <Button asChild size="lg" pill variant="outline">
                <Link href="/companies">{t.employers.seeProfiles}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
