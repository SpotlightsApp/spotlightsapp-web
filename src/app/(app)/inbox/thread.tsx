"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, getInitials } from "@/lib/utils";
import {
  getMessages,
  sendMessage,
  type ChatMessage,
  type ConversationSummary,
} from "./actions";

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDayLabel(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
  if (sameDay(d, today)) return "Today";
  if (sameDay(d, yesterday)) return "Yesterday";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function Thread({
  conversation,
  currentUserId,
}: {
  conversation: ConversationSummary;
  currentUserId: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // The conversation id whose messages are currently loaded; null while loading.
  const [loadedId, setLoadedId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSending, startSending] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const loading = loadedId !== conversation.id;

  // Load messages whenever the active conversation changes.
  useEffect(() => {
    let cancelled = false;
    getMessages(conversation.id).then((msgs) => {
      if (cancelled) return;
      setMessages(msgs);
      setLoadedId(conversation.id);
      setError(null);
    });
    return () => {
      cancelled = true;
    };
  }, [conversation.id]);

  // Keep the view pinned to the latest message.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  function handleSend() {
    const body = draft.trim();
    if (!body || isSending) return;
    setError(null);

    // Optimistic append.
    const optimistic: ChatMessage = {
      id: `optimistic-${Date.now()}`,
      senderId: currentUserId,
      body,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    setDraft("");
    inputRef.current?.focus();

    startSending(async () => {
      const res = await sendMessage(conversation.id, body);
      if (!res.ok) {
        // Roll back the optimistic message and restore the draft.
        setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
        setDraft(body);
        setError(res.error);
        return;
      }
      // Reconcile with the server's canonical list.
      const fresh = await getMessages(conversation.id);
      setMessages(fresh);
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-background">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-border px-5 py-3">
        <Avatar className="h-9 w-9">
          {conversation.avatarUrl ? (
            <AvatarImage src={conversation.avatarUrl} alt={conversation.name} />
          ) : null}
          <AvatarFallback>{getInitials(conversation.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate font-semibold text-foreground">
            {conversation.name}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-4"
      >
        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-accent" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-2 text-muted-foreground">
              <MessageSquare className="h-5 w-5" />
            </span>
            <p className="max-w-xs text-sm text-muted-foreground">
              No messages yet. Say hello to {conversation.name}.
            </p>
          </div>
        ) : (
          <MessageList messages={messages} currentUserId={currentUserId} />
        )}
      </div>

      {/* Composer */}
      <div className="shrink-0 border-t border-border px-4 py-3">
        {error ? (
          <p className="mb-2 text-xs text-red-600">{error}</p>
        ) : null}
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder={`Message ${conversation.name}`}
            className={cn(
              "max-h-40 min-h-[44px] flex-1 resize-none rounded-2xl border border-input bg-background px-4 py-3 text-sm",
              "placeholder:text-muted-foreground/70",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-accent transition-colors",
            )}
          />
          <Button
            type="button"
            size="icon"
            pill
            onClick={handleSend}
            disabled={!draft.trim() || isSending}
            aria-label="Send message"
            className="h-11 w-11 shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function MessageList({
  messages,
  currentUserId,
}: {
  messages: ChatMessage[];
  currentUserId: string;
}) {
  // Precompute, per message, whether to show a day separator (no mutation
  // during render: derive from the previous message's day label).
  const days = messages.map((m) => formatDayLabel(m.createdAt));
  return (
    <AnimatePresence initial={false}>
      {messages.map((m, i) => {
        const mine = m.senderId === currentUserId;
        const day = days[i];
        const showDay = i === 0 || days[i - 1] !== day;
        return (
          <div key={m.id} className="flex flex-col">
            {showDay ? (
              <div className="my-3 flex items-center justify-center">
                <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-muted-foreground">
                  {day}
                </span>
              </div>
            ) : null}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={cn(
                "flex w-full",
                mine ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "group max-w-[75%] rounded-2xl px-3.5 py-2 text-sm",
                  mine
                    ? "rounded-br-sm bg-accent text-accent-foreground"
                    : "rounded-bl-sm bg-surface-2 text-foreground",
                )}
              >
                <p className="whitespace-pre-wrap break-words">{m.body}</p>
                <span
                  className={cn(
                    "mt-1 block text-right text-[10px] tabular-nums",
                    mine
                      ? "text-accent-foreground/70"
                      : "text-muted-foreground",
                  )}
                >
                  {formatTime(m.createdAt)}
                </span>
              </div>
            </motion.div>
          </div>
        );
      })}
    </AnimatePresence>
  );
}
