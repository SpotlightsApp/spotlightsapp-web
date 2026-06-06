"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = ["All", "Unread", "Archived"] as const;
type Tab = (typeof TABS)[number];

export function ConversationList() {
  const [activeTab, setActiveTab] = useState<Tab>("All");

  return (
    <div className="flex w-full flex-col md:w-[400px] md:border-r md:border-border">
      <div className="flex shrink-0 items-center gap-1 border-b border-border px-2 pt-2">
        {TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab}
              {isActive ? (
                <motion.span
                  layoutId="inbox-tab-underline"
                  aria-hidden
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent"
                  transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                />
              ) : null}
            </button>
          );
        })}
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-12 text-center"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-2 text-muted-foreground">
            <Inbox className="h-5 w-5" />
          </span>
          <p className="text-sm text-muted-foreground">
            No messages yet — start a conversation to see it here.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
