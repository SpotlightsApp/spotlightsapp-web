import { Mail } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="flex max-w-sm flex-col items-center text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
          <Mail className="h-7 w-7" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Message anyone
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          DM peers, professionals, and recruiters to ask questions and build
          your network.
        </p>
      </div>
    </div>
  );
}
