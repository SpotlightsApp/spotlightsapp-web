"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Search, CalendarDays, LayoutDashboard, Building2, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BorderBeam } from "@/components/ui/border-beam";
import { Reveal } from "@/components/marketing/reveal";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

type FeatureKey = "dashboard" | "jobs" | "events" | "company" | "inbox";

const FEATURES: {
  key: FeatureKey;
  icon: typeof Search;
  path: string;
  file: string; // base filename for the recorded clip
}[] = [
  { key: "dashboard", icon: LayoutDashboard, path: "/dashboard", file: "dashboard" },
  { key: "jobs", icon: Search, path: "/explore", file: "jobs" },
  { key: "events", icon: CalendarDays, path: "/events", file: "events" },
  { key: "company", icon: Building2, path: "/companies/google", file: "company" },
  { key: "inbox", icon: MessageSquare, path: "/inbox", file: "inbox" },
];

export function ProductDemo() {
  const { t, locale } = useI18n();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  // All clips stay mounted; we only toggle opacity. This way the clip you click
  // is already decoded and shows instantly (no poster/previous-frame flash).
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const active = FEATURES[index];
  const suffix = locale === "th" ? "-th" : "";

  const next = () => setIndex((i) => (i + 1) % FEATURES.length);

  // Drive playback: the active clip plays from the start; the rest pause + reset.
  useEffect(() => {
    setProgress(0);
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index) {
        try {
          v.currentTime = 0;
        } catch {}
        if (!reduce) v.play().catch(() => {});
      } else {
        v.pause();
        try {
          v.currentTime = 0;
        } catch {}
      }
    });
  }, [index, locale, reduce]);

  const handlePause = () => {
    setPaused(true);
    videoRefs.current[index]?.pause();
  };
  const handleResume = () => {
    setPaused(false);
    if (!reduce) videoRefs.current[index]?.play().catch(() => {});
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* soft blue wash behind the frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/15 blur-[130px]"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent-strong">
            {t.demo.eyebrow}
          </span>
          <h2 className="font-display mt-3 text-3xl text-foreground sm:text-4xl">
            {t.demo.heading}
          </h2>
          <p className="mt-3 text-muted-foreground">{t.demo.subhead}</p>
        </Reveal>

        {/* Feature tabs */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {FEATURES.map((f, i) => {
              const isActive = i === index;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    "group relative flex items-center gap-2 overflow-hidden rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "border-accent bg-accent-soft text-accent-strong"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  <f.icon className="h-4 w-4" />
                  {t.demo.tabs[f.key]}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 h-0.5 bg-accent transition-[width] duration-200 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Browser-framed demo with BorderBeam */}
        <Reveal delay={0.15}>
          <div
            className="relative mx-auto mt-8 max-w-5xl"
            onMouseEnter={handlePause}
            onMouseLeave={handleResume}
          >
            <div className="relative overflow-hidden rounded-2xl border border-border bg-background shadow-[0_30px_80px_-20px_rgb(0,0,0,0.25)]">
              <BorderBeam
                size={260}
                duration={10}
                colorFrom="#3A78C2"
                colorTo="#bde8fb"
              />

              {/* browser chrome */}
              <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <div className="ml-3 hidden flex-1 sm:block">
                  <div className="inline-flex items-center rounded-full bg-background px-3 py-1 text-xs text-muted-foreground">
                    spotlight.app
                    <span className="text-foreground">{active.path}</span>
                  </div>
                </div>
              </div>

              {/* screen — all clips mounted, only the active one is visible */}
              <div className="relative aspect-[1280/800] bg-surface">
                {FEATURES.map((f, i) => (
                  <video
                    key={`${f.key}-${locale}`}
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ease-in-out",
                      i === index ? "opacity-100" : "opacity-0",
                    )}
                    src={`/demo/${f.file}${suffix}.mp4`}
                    poster={`/demo/${f.file}${suffix}.png`}
                    muted
                    playsInline
                    preload="auto"
                    autoPlay={i === 0 && !reduce}
                    onTimeUpdate={
                      i === index
                        ? (e) => {
                            const v = e.currentTarget;
                            if (v.duration)
                              setProgress((v.currentTime / v.duration) * 100);
                          }
                        : undefined
                    }
                    onEnded={
                      i === index
                        ? () => {
                            if (!paused && !reduce) next();
                          }
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>

            {/* caption */}
            <p className="mt-5 text-center text-sm text-muted-foreground">
              {t.demo.blurbs[active.key]}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
