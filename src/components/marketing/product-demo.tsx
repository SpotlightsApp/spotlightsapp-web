"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, FileText, LayoutDashboard, Building2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BorderBeam } from "@/components/ui/border-beam";
import { Reveal } from "@/components/marketing/reveal";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    key: "jobs",
    label: "Find jobs",
    icon: Search,
    path: "/jobs",
    video: "/demo/jobs.mp4",
    poster: "/demo/jobs.png",
    blurb: "Search and filter internships and new-grad roles built for students.",
  },
  {
    key: "detail",
    label: "Role details",
    icon: FileText,
    path: "/jobs/frontend-engineer-intern",
    video: "/demo/job-detail.mp4",
    poster: "/demo/job-detail.png",
    blurb: "See the full role, salary in THB, and apply in a single click.",
  },
  {
    key: "dashboard",
    label: "Your dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    video: "/demo/dashboard.mp4",
    poster: "/demo/dashboard.png",
    blurb: "Track applications, saved jobs, and recommendations in one place.",
  },
  {
    key: "company",
    label: "Companies",
    icon: Building2,
    path: "/companies/agoda",
    video: "/demo/company.mp4",
    poster: "/demo/company.png",
    blurb: "Explore companies hiring in Thailand and all of their open roles.",
  },
];

const DWELL_MS = 6500;

export function ProductDemo() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = FEATURES[index];

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % FEATURES.length),
      DWELL_MS,
    );
    return () => clearTimeout(t);
  }, [index, paused]);

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* soft amber wash behind the frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/15 blur-[130px]"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent-strong">
            Our product
          </span>
          <h2 className="font-display mt-3 text-3xl text-foreground sm:text-4xl">
            Your whole job search, in one place
          </h2>
          <p className="mt-3 text-muted-foreground">
            From discovery to offer — here&apos;s how Spotlight works for students.
          </p>
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
                  {f.label}
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
                colorFrom="#F5A623"
                colorTo="#FB7185"
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
                    key={active.key}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    src={active.video}
                    poster={active.poster}
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
              {active.blurb}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
