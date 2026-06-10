import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export function TalentTopbar({
  name,
  avatarUrl,
  companyName,
}: {
  name: string;
  avatarUrl?: string;
  companyName?: string;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-2.5">
        <p className="text-sm font-medium">Talent console</p>
        <Badge variant="neutral" size="sm">
          {companyName ?? "Private beta"}
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
          <Avatar className="h-9 w-9">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{initials(name) || "?"}</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm font-medium leading-tight">{name}</p>
            <p className="text-xs leading-tight text-muted-foreground">
              {companyName ? `Recruiting · ${companyName}` : "Recruiter"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
