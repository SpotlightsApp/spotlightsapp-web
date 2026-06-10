import { Building2 } from "lucide-react";
import { Container } from "@/components/ui/container";

/** Shown on employer pages when the signed-in account has no company yet. */
export function NoCompany() {
  return (
    <Container className="py-8">
      <div className="flex flex-col items-center gap-2 rounded-[var(--radius)] border border-dashed border-border bg-surface/60 px-6 py-14 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
          <Building2 className="h-5 w-5" />
        </span>
        <p className="font-semibold">No company workspace yet</p>
        <p className="max-w-md text-sm text-muted-foreground">
          Your account isn&apos;t linked to a company. Reach out to the
          Spotlights team at{" "}
          <a
            href="mailto:pippinkantakom@gmail.com"
            className="font-medium text-accent-strong hover:underline"
          >
            pippinkantakom@gmail.com
          </a>{" "}
          and we&apos;ll set up your workspace.
        </p>
      </div>
    </Container>
  );
}
