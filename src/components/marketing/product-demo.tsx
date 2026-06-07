"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, FileText, LayoutDashboard, Building2, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BorderBeam } from "@/components/ui/border-beam";
import { Reveal } from "@/components/marketing/reveal";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

type FeatureKey = "jobs" | "detail" | "dashboard" | "company" | "inbox";

const FEATURES: {
  key: FeatureKey;
  icon: typeof Search;
  path: string;
  file: string; // base filename for the recorded clip
}[] = [
  { key: "dashboard", icon: LayoutDashboard, path: "/dashboard", file: "dashboard" },
  { key: "jobs", icon: Search, path: "/explore", file: "jobs" },
  { key: "detail", icon: FileText, path: "/jobs/software-engineer-intern-google", file: "job-detail" },
  { key: "company", icon: Building2, path: "/companies/google", file: "company" },
  { key: "inbox", icon: MessageSquare, path: "/inbox", file: "inbox" },
];

const DWELL_MS = 6500;

export function ProductDemo() {
  const { t, locale } = useI18n();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = FEATURES[index];
  // Localized playthroughs: foo.mp4 (en) / foo-th.mp4 (th)
  const suffix = locale === "th" ? "-th" : "";
  const videoSrc = `/demo/${active.file}${suffix}.mp4`;
  const posterSrc = `/demo/${active.file}${suffix}.png`;

  useEffect(() => {
    if (paused || reduce) return;
    const timer = setTimeout(
      () => setIndex((i) => (i + 1) % FEATURES.length),
      DWELL_MS,
    );
    return () => clearTimeout(timer);
  }, [index, paused, reduce]);

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
                  {isActive && !paused && (
                    <motion.span
                      key={index}
                      className="absolute bottom-0 left-0 h-0.5 bg-accent"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: DWELL_MS / 1000, ease: "linear" }}
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
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
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

              {/* screen — crossfading feature playthroughs */}
              <div className="relative aspect-[1280/800] bg-surface">
                <AnimatePresence mode="sync">
                  <motion.video
                    key={`${active.key}-${locale}`}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    src={videoSrc}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    initial={{ opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </AnimatePresence>
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
