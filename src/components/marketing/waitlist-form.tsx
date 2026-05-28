"use client";

import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "already" | "error";

export function WaitlistForm() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setErrorMsg(t.waitlist.invalid);
      setStatus("error");
      return;
    }
    setStatus("loading");

    const supabase = createClient();
    const { error } = await supabase
      .from("waitlist")
      .insert({
        email: email.trim().toLowerCase(),
        name: name.trim(),
        source: "landing",
      });

    if (!error) {
      setStatus("success");
    } else if (error.code === "23505") {
      setStatus("already"); // duplicate email
    } else {
      console.error("waitlist insert failed:", error);
      setErrorMsg(t.waitlist.serverError);
      setStatus("error");
    }
  }

  if (status === "success" || status === "already") {
    return (
      <div className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-white">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Check className="h-4 w-4" />
        </span>
        <p className="text-sm font-medium">
          {status === "success" ? t.waitlist.success : t.waitlist.already}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.waitlist.namePlaceholder}
          aria-label="Name"
          className="h-12 w-full rounded-full border border-white/15 bg-white px-5 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-accent"
        />
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder={t.waitlist.placeholder}
            aria-label="Email address"
            className="h-12 flex-1 rounded-full border border-white/15 bg-white px-5 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-accent"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#209CEE] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1a87cf] disabled:opacity-60 cursor-pointer"
          >
            {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            {t.waitlist.submit}
          </button>
        </div>
      </div>

      {status === "error" && (
        <p className={cn("mt-3 text-center text-sm text-red-300")}>{errorMsg}</p>
      )}
    </form>
  );
}
