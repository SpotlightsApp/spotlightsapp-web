"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  MapPin,
  Briefcase,
  Sparkles,
  GraduationCap,
  Code2,
  LineChart,
  Palette,
  Rocket,
  Building2,
  Globe2,
} from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import { useI18n } from "@/lib/i18n/provider";

/**
 * Animated hero backdrop — wellfound-referenced + "Spotlight" gold dust:
 *  - tsParticles gold sparkles (on-brand "spotlight" specks)
 *  - drifting soft color washes (amber + soft pink/blue) with mouse parallax
 *  - a slowly rotating conic aurora ring (parallax)
 *  - a faint panning dot grid
 *  - wandering role/city pills, kept in the left/right edge bands so they never
 *    cross the headline, connected by faint flowing "tracer" constellations
 * All motion is disabled for prefers-reduced-motion.
 */

type Node = {
  label: string;
  icon: typeof MapPin;
  x: number; // % horizontal anchor (pill centre)
  y: number; // % vertical anchor
  dx: number; // px horizontal wander
  dy: number; // px vertical wander
  rot: number; // deg rotation wander
  dur: number; // seconds
  delay: number;
};

// Two loose, asymmetric clusters hugging the edges (never the central text):
// a denser 6-pill cluster up the left, a looser 4-pill cluster lower-right.
const NODES: Node[] = [
  // left cluster (indices 0–5) — packed, upper
  { label: "Internship", icon: Sparkles, x: 12, y: 18, dx: 10, dy: -13, rot: 3, dur: 10, delay: 0 },
  { label: "Software", icon: Code2, x: 22, y: 23, dx: -9, dy: 12, rot: -4, dur: 11.5, delay: 0.5 },
  { label: "UX Designer", icon: Palette, x: 6, y: 27, dx: 11, dy: 10, rot: 4, dur: 12.5, delay: 0.9 },
  { label: "New Grad", icon: GraduationCap, x: 18, y: 32, dx: -8, dy: -12, rot: -3, dur: 10.5, delay: 0.3 },
  { label: "Remote", icon: Globe2, x: 9, y: 39, dx: 12, dy: 11, rot: 4, dur: 13, delay: 0.7 },
  { label: "Startups", icon: Rocket, x: 20, y: 44, dx: -10, dy: -10, rot: -4, dur: 11, delay: 1.0 },
  // right cluster (indices 6–9) — looser, lower
  { label: "Bangkok", icon: MapPin, x: 90, y: 27, dx: -11, dy: 13, rot: -4, dur: 11, delay: 0.4 },
  { label: "Data Analyst", icon: LineChart, x: 80, y: 36, dx: 10, dy: -11, rot: 4, dur: 12, delay: 0.8 },
  { label: "Fintech", icon: Building2, x: 92, y: 45, dx: -9, dy: -13, rot: -3, dur: 10.5, delay: 0.2 },
  { label: "Hiring now", icon: Briefcase, x: 83, y: 54, dx: 11, dy: 10, rot: 4, dur: 12.5, delay: 0.6 },
];

// Connect within each cluster only (no lines crossing the central text).
const LINKS: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 5],
  [6, 7], [7, 8], [8, 9], [6, 8],
];

export function HeroBackground() {
  const reduce = useReducedMotion();
  const { t } = useI18n();

  // Pointer-driven parallax (normalized -0.5..0.5, smoothed with springs)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 20 });
  const sy = useSpring(my, { stiffness: 45, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, mx, my]);

  const auroraX = useTransform(sx, (v) => v * 30);
  const auroraY = useTransform(sy, (v) => v * 30);
  const blobAX = useTransform(sx, (v) => v * 44);
  const blobAY = useTransform(sy, (v) => v * 44);
  const blobBX = useTransform(sx, (v) => v * -34);
  const blobBY = useTransform(sy, (v) => v * -28);
  const blobCX = useTransform(sx, (v) => v * 38);
  const blobCY = useTransform(sy, (v) => v * -30);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Faint panning dot grid */}
      <div className="hero-dot-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]" />

      {/* Rotating conic aurora ring (parallax) */}
      <motion.div
        style={{ x: auroraX, y: auroraY }}
        className="absolute left-1/2 top-[-30%] h-[700px] w-[700px] -translate-x-1/2"
      >
        <div
          className="animate-aurora h-full w-full rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "conic-gradient(from 0deg, #f5a62366, #ffd8dc66, #d7e9ff55, #fff7ec00, #f5a62366)",
          }}
        />
      </motion.div>

      {/* Drifting color blobs (parallax wrapper + CSS drift on inner) */}
      <motion.div
        style={{ x: blobAX, y: blobAY }}
        className="absolute left-1/2 top-[-12%] -translate-x-1/2"
      >
        <div className="animate-blob-a h-[420px] w-[680px] rounded-full bg-accent/25 blur-[110px]" />
      </motion.div>
      <motion.div style={{ x: blobBX, y: blobBY }} className="absolute left-[2%] top-[10%]">
        <div className="animate-blob-b h-[340px] w-[340px] rounded-full bg-[#FFD8DC]/50 blur-[100px]" />
      </motion.div>
      <motion.div style={{ x: blobCX, y: blobCY }} className="absolute right-[2%] top-[6%]">
        <div className="animate-blob-c h-[360px] w-[360px] rounded-full bg-[#D7E9FF]/50 blur-[100px]" />
      </motion.div>

      {/* Gold "spotlight" sparkles — skipped under reduced-motion */}
      {!reduce && (
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent_75%)]">
          <SparklesCore
            id="hero-sparkles"
            background="transparent"
            particleColor="#F5A623"
            minSize={0.5}
            maxSize={1.3}
            particleDensity={220}
            speed={1.6}
            className="h-full w-full"
          />
        </div>
      )}

      {/* Tracer constellations connecting pills within each edge cluster */}
      <motion.svg
        className="absolute inset-0 hidden h-full w-full lg:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      >
        {LINKS.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="#f5a623"
            strokeOpacity={0.4}
            strokeWidth={1.2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="tracer-line"
          />
        ))}
      </motion.svg>

      {/* Wandering role/city pills (desktop only, sit behind content) */}
      {NODES.map((n, i) => (
        <div
          key={n.label}
          className="absolute hidden -translate-x-1/2 -translate-y-1/2 lg:block"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              reduce
                ? { opacity: 1, scale: 1 }
                : {
                    opacity: 1,
                    scale: 1,
                    x: [0, n.dx, 0],
                    y: [0, n.dy, 0],
                    rotate: [0, n.rot, 0],
                  }
            }
            transition={{
              opacity: { duration: 0.6, delay: n.delay },
              scale: { duration: 0.6, delay: n.delay },
              x: { duration: n.dur, delay: n.delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
              y: { duration: n.dur * 1.25, delay: n.delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
              rotate: { duration: n.dur * 0.9, delay: n.delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
            }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur">
              <n.icon className="h-3.5 w-3.5 text-accent-strong" />
              {t.heroChips.floats?.[i] ?? n.label}            </span>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
