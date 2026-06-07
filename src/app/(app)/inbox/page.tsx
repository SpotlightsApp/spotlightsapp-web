import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { listConversations } from "./actions";
import { InboxClient } from "./inbox-client";
import { EmptyState } from "./empty-state";

export const metadata: Metadata = { title: "Inbox · Spotlights" };

export default async function InboxPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const conversations = user ? await listConversations() : [];

  if (conversations.length === 0) {
    return (
      <div className="flex h-[calc(100vh-4rem)] flex-col bg-background md:flex-row">
        <div className="flex w-full flex-col md:w-[400px] md:border-r md:border-border">
          <EmptyConversationList />
        </div>
        <EmptyState />
      </div>
    );
  }

  return (
    <InboxClient conversations={conversations} currentUserId={user!.id} />
  );
}

/** Slim placeholder for the left rail when there are no conversations. */
function EmptyConversationList() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-12 text-center">
      <p className="text-sm text-muted-foreground">
        No messages yet. Start a conversation to see it here.
      </p>
    </div>
  );
}
