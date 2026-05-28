"use server";

import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import { WaitlistWelcome } from "@/emails/waitlist-welcome";

export type JoinResult =
  | { status: "success" }
  | { status: "already" }
  | { status: "error"; reason: "invalid" | "server" };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function joinWaitlist(input: {
  name: string;
  email: string;
}): Promise<JoinResult> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return { status: "error", reason: "invalid" };
  }

  // 1. Insert into Supabase (RLS allows anon insert; row is idempotent on email).
  const supabase = await createClient();
  const { error } = await supabase
    .from("waitlist")
    .insert({ email, name, source: "waitlist-page" });

  if (error) {
    if (error.code === "23505") return { status: "already" }; // duplicate
    console.error("waitlist insert failed:", error);
    return { status: "error", reason: "server" };
  }

  // 2. Send confirmation email via Resend — never block success on email failure.
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const from =
        process.env.RESEND_FROM ?? "Spotlights <onboarding@resend.dev>";
      const { error: sendError } = await resend.emails.send({
        from,
        to: email,
        subject: "You're on the Spotlights waitlist 🎉",
        react: WaitlistWelcome({ name }),
      });
      if (sendError) console.error("resend send failed:", sendError);
    } catch (e) {
      console.error("resend exception:", e);
    }
  } else if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[waitlist] RESEND_API_KEY not set — skipping confirmation email.",
    );
  }

  return { status: "success" };
}
