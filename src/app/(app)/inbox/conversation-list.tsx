"use client";

import { useState } from "react";
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
                <span
                  aria-hidden
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent"
                />
              ) : null}
            </button>
          );
        })}
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex flex-1 items-center justify-center px-6 py-12 text-center text-sm text-muted-foreground">
          No messages yet.
        </div>
      </div>
    </div>
  );
}
