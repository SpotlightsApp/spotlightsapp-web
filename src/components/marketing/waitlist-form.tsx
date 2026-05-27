"use client";

import { useState } from "react";
import { Loader2, Check, GraduationCap, Building2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "already" | "error";
type Role = "student" | "employer";

export function WaitlistForm() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("student");
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
      .insert({ email: email.trim().toLowerCase(), role, source: "landing" });

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
      {/* Audience toggle */}
      <div className="mb-3 flex justify-center gap-2">
        {(
          [
            { key: "student", label: t.waitlist.student, icon: GraduationCap },
            { key: "employer", label: t.waitlist.hiring, icon: Building2 },
          ] as const
        ).map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => setRole(opt.key)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors cursor-pointer",
              role === opt.key
                ? "bg-[#209CEE] text-white"
                : "bg-white/10 text-white/80 hover:bg-white/20",
            )}
          >
            <opt.icon className="h-4 w-4" />
            {opt.label}
          </button>
        ))}
      </div>

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

      <p
        className={cn(
          "mt-3 text-center text-sm",
          status === "error" ? "text-red-300" : "text-white/50",
        )}
      >
        {status === "error" ? errorMsg : t.waitlist.helper}
      </p>
    </form>
  );
}
