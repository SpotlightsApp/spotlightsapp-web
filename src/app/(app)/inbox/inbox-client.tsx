"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { Thread } from "./thread";
import type { ConversationSummary } from "./actions";

function relativeTime(iso: string | null) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export function InboxClient({
  conversations,
  currentUserId,
}: {
  conversations: ConversationSummary[];
  currentUserId: string;
}) {
  const [activeId, setActiveId] = useState<string>(conversations[0]?.id ?? "");
  const active = conversations.find((c) => c.id === activeId) ?? null;

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-background md:flex-row">
      {/* Conversation list — hidden on mobile when a thread is open */}
      <div
        className={cn(
          "w-full flex-col md:flex md:w-[400px] md:border-r md:border-border",
          active ? "hidden md:flex" : "flex",
        )}
      >
        <div className="shrink-0 border-b border-border px-5 py-4">
          <h1 className="font-display text-xl font-semibold text-foreground">
            Inbox
          </h1>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto">
          {conversations.map((c) => {
            const isActive = c.id === activeId;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveId(c.id)}
                className={cn(
                  "flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-surface-2 focus-visible:bg-surface-2 focus-visible:outline-none",
                  isActive && "bg-accent-soft hover:bg-accent-soft",
                )}
              >
                <Avatar className="h-10 w-10 shrink-0">
                  {c.avatarUrl ? (
                    <AvatarImage src={c.avatarUrl} alt={c.name} />
                  ) : null}
                  <AvatarFallback>{getInitials(c.name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate font-semibold text-foreground">
                      {c.name}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {relativeTime(c.lastMessageAt)}
                    </span>
                  </div>
                  <div className="truncate text-sm text-muted-foreground">
                    {c.preview ?? "No messages yet"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Thread pane */}
      <div
        className={cn(
          "flex-1 flex-col",
          active ? "flex" : "hidden md:flex",
        )}
      >
        {active ? (
          <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex h-full flex-col"
          >
            {/* Mobile back button */}
            <button
              type="button"
              onClick={() => setActiveId("")}
              className="flex shrink-0 items-center gap-1.5 px-4 pt-3 text-sm font-medium text-accent-strong md:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
              All messages
            </button>
            <Thread conversation={active} currentUserId={currentUserId} />
          </motion.div>
        ) : (
          <div className="hidden flex-1 items-center justify-center px-6 text-center text-sm text-muted-foreground md:flex">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>
  );
}
