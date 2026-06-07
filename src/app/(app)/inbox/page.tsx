import type { Metadata } from "next";
import { ConversationList } from "./conversation-list";
import { EmptyState } from "./empty-state";

export const metadata: Metadata = { title: "Inbox · Spotlights" };

export default function InboxPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-background md:flex-row">
      <ConversationList />
      <EmptyState />
    </div>
  );
}
