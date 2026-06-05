import { Bell } from "lucide-react";
import { UserMenu } from "@/components/app/user-menu";

export function AppTopbar({ name }: { name: string }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-end gap-2 border-b border-border bg-background/80 px-6 backdrop-blur-md">
      <button
        type="button"
        aria-label="Notifications"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Bell className="h-4 w-4" />
      </button>
      <UserMenu name={name} />
    </header>
  );
}
