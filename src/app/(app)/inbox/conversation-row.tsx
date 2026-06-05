import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

export type Conversation = {
  id: string;
  name: string;
  role: string;
  company: string;
  preview: string;
  date: string;
  avatarUrl?: string;
  unread?: boolean;
  active?: boolean;
};

export function ConversationRow({ conversation }: { conversation: Conversation }) {
  const { name, role, company, preview, date, avatarUrl, unread, active } =
    conversation;

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:bg-surface-2",
        active && "bg-accent-soft hover:bg-accent-soft",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "mt-2 h-2 w-2 shrink-0 rounded-full",
          unread ? "bg-accent" : "bg-transparent",
        )}
      />
      <Avatar className="h-10 w-10 shrink-0">
        {avatarUrl ? <AvatarImage src={avatarUrl} alt={name} /> : null}
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate font-semibold text-foreground">{name}</span>
          <span className="shrink-0 text-xs text-muted-foreground">{date}</span>
        </div>
        <div className="truncate text-xs text-muted-foreground">
          {role} · {company}
        </div>
        <div className="truncate text-sm text-muted-foreground">{preview}</div>
      </div>
    </button>
  );
}
