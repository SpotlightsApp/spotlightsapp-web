import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TalentTopbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-2.5">
        <p className="text-sm font-medium">Talent console</p>
        <Badge variant="neutral" size="sm">
          Demo workspace
        </Badge>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Bell className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/people/jordan.jpg"
            alt="Jordan Lee"
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-medium leading-tight">Jordan Lee</p>
            <p className="text-xs leading-tight text-muted-foreground">
              Technical Recruiter
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
