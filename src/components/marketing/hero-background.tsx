"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, Sparkles, GraduationCap } from "lucide-react";

/**
 * Animated hero backdrop — wellfound-referenced:
 *  - drifting soft color washes (amber + soft pink/blue accent tints)
 *  - a slowly rotating conic aurora ring
 *  - a faint panning dot grid
 *  - gently bobbing role/city pills floating around the headline
 * All motion is paused for users with prefers-reduced-motion (global CSS rule).
 */

const FLOAT_CHIPS: {
  label: string;
  icon: typeof MapPin;
  pos: string;
  dur: number;
  delay: number;
}[] = [
  { label: "Internship", icon: Sparkles, pos: "left-[5%] top-[24%]", dur: 5, delay: 0 },
  { label: "Bangkok", icon: MapPin, pos: "right-[6%] top-[18%]", dur: 6.2, delay: 0.6 },
  { label: "New Grad", icon: GraduationCap, pos: "left-[10%] bottom-[16%]", dur: 5.6, delay: 0.3 },
  { label: "Hiring now", icon: Briefcase, pos: "right-[9%] bottom-[22%]", dur: 6.8, delay: 0.9 },
];

export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Faint panning dot grid */}
      <div className="hero-dot-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]" />

      {/* Rotating conic aurora ring */}
      <div className="absolute left-1/2 top-[-30%] h-[700px] w-[700px] -translate-x-1/2">
        <div
          className="animate-aurora h-full w-full rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "conic-gradient(from 0deg, #f5a62366, #ffd8dc66, #d7e9ff55, #fff7ec00, #f5a62366)",
          }}
        />
      </div>

      {/* Drifting color blobs */}
      <div className="animate-blob-a absolute left-1/2 top-[-12%] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-accent/25 blur-[110px]" />
      <div className="animate-blob-b absolute left-[2%] top-[10%] h-[340px] w-[340px] rounded-full bg-[#FFD8DC]/50 blur-[100px]" />
      <div className="animate-blob-c absolute right-[2%] top-[6%] h-[360px] w-[360px] rounded-full bg-[#D7E9FF]/50 blur-[100px]" />

      {/* Floating bobbing pills (desktop only, sit behind content) */}
      {FLOAT_CHIPS.map((c) => (
        <motion.div
          key={c.label}
          className={`absolute hidden lg:block ${c.pos}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: c.delay },
            scale: { duration: 0.6, delay: c.delay },
            y: {
              duration: c.dur,
              delay: c.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur">
            <c.icon className="h-3.5 w-3.5 text-accent-strong" />
            {c.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
