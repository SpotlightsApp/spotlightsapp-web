import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/ui/logo-mark";
import { Reveal } from "@/components/marketing/reveal";
import { getCompanies } from "@/lib/data";

export function LogoWall() {
  const companies = getCompanies();
  return (
    <section className="py-14">
      <Container>
        <Reveal>
          <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Students at Spotlight get hired by
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            {companies.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-2.5 opacity-80 transition-opacity hover:opacity-100"
              >
                <LogoMark name={c.name} className="h-9 w-9 text-xs" />
                <span className="text-sm font-semibold text-foreground">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
