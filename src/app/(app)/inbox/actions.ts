"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ConversationSummary = {
  id: string;
  /** The other participant's display name (best effort). */
  name: string;
  avatarUrl: string | null;
  /** Last message body, truncated for preview, or null if no messages yet. */
  preview: string | null;
  /** ISO timestamp used for ordering + display. */
  lastMessageAt: string | null;
};

export type ChatMessage = {
  id: string;
  senderId: string;
  body: string;
  createdAt: string;
};

type ProfileRow = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
};

/**
 * Conversations for the signed-in user, each annotated with the OTHER
 * participant's name/avatar and a preview of the most recent message.
 * Ordered by last_message_at (most recent first).
 */
export async function listConversations(): Promise<ConversationSummary[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  // Conversations the user participates in. RLS keeps this to their own rows.
  const { data: myParts, error: partsErr } = await supabase
    .from("conversation_participants")
    .select("conversation_id")
    .eq("user_id", user.id);

  if (partsErr) {
    console.error("listConversations participants failed:", partsErr.message);
    return [];
  }
  const conversationIds = (myParts ?? []).map((p) => p.conversation_id);
  if (conversationIds.length === 0) return [];

  // Pull the conversations (for last_message_at) and all participants in one go.
  const [{ data: convos }, { data: allParts }] = await Promise.all([
    supabase
      .from("conversations")
      .select("id, last_message_at, created_at")
      .in("id", conversationIds),
    supabase
      .from("conversation_participants")
      .select("conversation_id, user_id")
      .in("conversation_id", conversationIds),
  ]);

  // Map each conversation to the "other" participant id.
  const otherByConvo = new Map<string, string>();
  for (const p of allParts ?? []) {
    if (p.user_id !== user.id && !otherByConvo.has(p.conversation_id)) {
      otherByConvo.set(p.conversation_id, p.user_id);
    }
  }

  // Resolve other-participant profiles.
  const otherIds = [...new Set([...otherByConvo.values()])];
  const profileById = new Map<string, ProfileRow>();
  if (otherIds.length > 0) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url")
      .in("id", otherIds);
    for (const p of (profiles ?? []) as ProfileRow[]) profileById.set(p.id, p);
  }

  // Latest message per conversation for the preview.
  const { data: recent } = await supabase
    .from("messages")
    .select("conversation_id, body, created_at")
    .in("conversation_id", conversationIds)
    .order("created_at", { ascending: false });

  const previewByConvo = new Map<string, { body: string; createdAt: string }>();
  for (const m of recent ?? []) {
    if (!previewByConvo.has(m.conversation_id)) {
      previewByConvo.set(m.conversation_id, {
        body: m.body,
        createdAt: m.created_at,
      });
    }
  }

  const lastAtByConvo = new Map<string, string | null>();
  for (const c of convos ?? []) {
    lastAtByConvo.set(c.id, c.last_message_at ?? c.created_at ?? null);
  }

  const summaries: ConversationSummary[] = conversationIds.map((id) => {
    const otherId = otherByConvo.get(id);
    const profile = otherId ? profileById.get(otherId) : undefined;
    const preview = previewByConvo.get(id);
    const lastMessageAt = preview?.createdAt ?? lastAtByConvo.get(id) ?? null;
    return {
      id,
      name: profile?.full_name?.trim() || "Spotlight member",
      avatarUrl: profile?.avatar_url ?? null,
      preview: preview?.body ?? null,
      lastMessageAt,
    };
  });

  summaries.sort((a, b) => {
    const at = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
    const bt = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
    return bt - at;
  });

  return summaries;
}

/** Verify the signed-in user is a participant of the conversation. */
async function assertParticipant(
  supabase: Awaited<ReturnType<typeof createClient>>,
  conversationId: string,
  userId: string,
): Promise<boolean> {
  const { data } = await supabase
    .from("conversation_participants")
    .select("user_id")
    .eq("conversation_id", conversationId)
    .eq("user_id", userId)
    .maybeSingle();
  return Boolean(data);
}

/**
 * Messages in a conversation, ascending by time. Returns [] if the user is not
 * a participant (RLS would block anyway; this avoids leaking errors to the UI).
 */
export async function getMessages(
  conversationId: string,
): Promise<ChatMessage[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  if (!(await assertParticipant(supabase, conversationId, user.id))) return [];

  const { data, error } = await supabase
    .from("messages")
    .select("id, sender_id, body, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getMessages failed:", error.message);
    return [];
  }

  return (data ?? []).map((m) => ({
    id: m.id,
    senderId: m.sender_id,
    body: m.body,
    createdAt: m.created_at,
  }));
}

export type SendResult = { ok: true } | { ok: false; error: string };

/** Insert a message into a conversation as the signed-in user. */
export async function sendMessage(
  conversationId: string,
  body: string,
): Promise<SendResult> {
  const trimmed = body.trim();
  if (!trimmed) return { ok: false, error: "Message is empty." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in." };

  if (!(await assertParticipant(supabase, conversationId, user.id))) {
    return { ok: false, error: "You are not part of this conversation." };
  }

  const { error } = await supabase.from("messages").insert({
    conversation_id: conversationId,
    sender_id: user.id,
    body: trimmed,
  });

  if (error) {
    console.error("sendMessage failed:", error.message);
    return { ok: false, error: error.message };
  }

  // Best-effort bump of the conversation's last_message_at for ordering.
  await supabase
    .from("conversations")
    .update({ last_message_at: new Date().toISOString() })
    .eq("id", conversationId);

  // Refresh the inbox so the conversation list preview/ordering updates.
  revalidatePath("/inbox");

  return { ok: true };
}
