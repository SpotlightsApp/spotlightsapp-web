"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  TALENT_DOMAINS,
  TIER_META,
  getUniversity,
  type RankedCandidate,
  type TalentTier,
} from "@/lib/talent";
import { ScorePill } from "@/components/employers/talent/score-pill";
import { cn } from "@/lib/utils";

/* Deterministic per-candidate jitter so the layout is stable across renders. */
function hash01(str: string, salt = 0) {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

type Node = {
  c: RankedCandidate;
  baseAngle: number; // polar angle before rotation
  baseRadius: number; // 0..1 of layout radius
  size: number;
  phase: number;
  color: string;
  /* screen coords, updated each frame */
  x: number;
  y: number;
};

const SCORE_MIN = 60;
const SCORE_MAX = 98;
/** Map overall score to normalized radius — best candidates sit nearest the center. */
function radiusFor(score: number) {
  const t = Math.min(1, Math.max(0, (score - SCORE_MIN) / (SCORE_MAX - SCORE_MIN)));
  return 0.18 + (1 - t) * 0.82;
}

const WEDGE = (Math.PI * 2) / TALENT_DOMAINS.length;
const TIER_ORDER: TalentTier[] = ["exceptional", "strong", "promising", "developing"];

export function TalentGraph({ candidates }: { candidates: RankedCandidate[] }) {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [query, setQuery] = useState("");
  const [hovered, setHovered] = useState<{
    node: Node;
    x: number;
    y: number;
    wrapW: number;
  } | null>(null);

  const nodes = useMemo<Node[]>(() => {
    const list = candidates.map((c) => {
      const d = TALENT_DOMAINS.indexOf(c.domain);
      const center = -Math.PI / 2 + d * WEDGE;
      const jitter = (hash01(c.id) - 0.5) * (WEDGE * 0.74);
      const rJitter = (hash01(c.id, 7) - 0.5) * 0.06;
      return {
        c,
        baseAngle: center + jitter,
        baseRadius: Math.min(1, radiusFor(c.scores.overall) + rJitter),
        size: 3 + ((c.scores.overall - SCORE_MIN) / (SCORE_MAX - SCORE_MIN)) * 4.5,
        phase: hash01(c.id, 13) * Math.PI * 2,
        color: TIER_META[c.tier].node,
        x: 0,
        y: 0,
      };
    });
    /* Collision relaxation in normalized space so dense score bands (e.g. the
       exceptional cluster near the center) fan out instead of fusing. */
    const REF_R = 250; // typical layout radius in px, for size→normalized conversion
    const pts = list.map((n) => ({
      x: Math.cos(n.baseAngle) * n.baseRadius,
      y: Math.sin(n.baseAngle) * n.baseRadius,
    }));
    for (let iter = 0; iter < 40; iter++) {
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const minD = (list[i].size + list[j].size + 7) / REF_R;
          let dx = pts[j].x - pts[i].x;
          let dy = pts[j].y - pts[i].y;
          let d = Math.hypot(dx, dy);
          if (d >= minD) continue;
          if (d < 1e-6) {
            const a = hash01(list[i].c.id, iter) * Math.PI * 2;
            dx = Math.cos(a) * 1e-4;
            dy = Math.sin(a) * 1e-4;
            d = 1e-4;
          }
          const push = (minD - d) / 2;
          pts[i].x -= (dx / d) * push;
          pts[i].y -= (dy / d) * push;
          pts[j].x += (dx / d) * push;
          pts[j].y += (dy / d) * push;
        }
      }
    }
    list.forEach((n, i) => {
      n.baseAngle = Math.atan2(pts[i].y, pts[i].x);
      n.baseRadius = Math.min(1.04, Math.max(0.1, Math.hypot(pts[i].x, pts[i].y)));
    });
    return list;
  }, [candidates]);

  /* 2 nearest same-domain neighbours (stable under rotation) for faint edges. */
  const edges = useMemo(() => {
    const pos = nodes.map((n) => ({
      x: Math.cos(n.baseAngle) * n.baseRadius,
      y: Math.sin(n.baseAngle) * n.baseRadius,
    }));
    const out: [number, number][] = [];
    nodes.forEach((n, i) => {
      const dist: { j: number; d: number }[] = [];
      nodes.forEach((m, j) => {
        if (i === j || m.c.domain !== n.c.domain) return;
        const dx = pos[i].x - pos[j].x;
        const dy = pos[i].y - pos[j].y;
        dist.push({ j, d: dx * dx + dy * dy });
      });
      dist.sort((a, b) => a.d - b.d);
      for (const { j } of dist.slice(0, 2)) {
        if (i < j) out.push([i, j]);
        else if (!out.some(([a, b]) => a === j && b === i)) out.push([j, i]);
      }
    });
    return out;
  }, [nodes]);

  const matchesRef = useRef<Set<string> | null>(null);
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      matchesRef.current = null;
      return;
    }
    matchesRef.current = new Set(
      nodes
        .filter((n) => {
          const uni = getUniversity(n.c.universityId);
          return (
            n.c.name.toLowerCase().includes(q) ||
            n.c.major.toLowerCase().includes(q) ||
            n.c.domain.toLowerCase().includes(q) ||
            uni.name.toLowerCase().includes(q) ||
            uni.shortName.toLowerCase().includes(q) ||
            n.c.skills.some((s) => s.toLowerCase().includes(q))
          );
        })
        .map((n) => n.c.id),
    );
  }, [query, nodes]);

  const hoveredRef = useRef<Node | null>(null);
  useEffect(() => {
    hoveredRef.current = hovered?.node ?? null;
  }, [hovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rotation = 0;
    let dragging = false;
    let dragMoved = 0;
    let lastX = 0;
    let raf = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const draw = (t: number) => {
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) / 2 - 50;
      const time = t / 1000;
      if (!dragging && !reduceMotion && !hoveredRef.current) rotation += 0.0012;

      ctx.clearRect(0, 0, w, h);

      /* score rings — the ranking scaffold */
      ctx.save();
      for (const ringScore of [90, 80, 70]) {
        const rr = radiusFor(ringScore) * R;
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(26,26,26,0.055)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = "rgba(26,26,26,0.28)";
        ctx.font = "10px var(--font-mono-accent), ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.fillText(String(ringScore), cx, cy - rr - 4);
      }
      ctx.restore();

      /* node screen positions */
      const matches = matchesRef.current;
      for (const n of nodes) {
        const breathe = reduceMotion ? 0 : Math.sin(time * 0.6 + n.phase) * 0.012;
        const r = (n.baseRadius + breathe) * R;
        const a = n.baseAngle + rotation;
        n.x = cx + Math.cos(a) * r;
        n.y = cy + Math.sin(a) * r;
      }

      /* domain labels at the rim */
      ctx.save();
      ctx.font = "500 11px var(--font-inter), ui-sans-serif, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      TALENT_DOMAINS.forEach((d, i) => {
        const a = -Math.PI / 2 + i * WEDGE + rotation;
        const lx = cx + Math.cos(a) * (R + 26);
        const ly = cy + Math.sin(a) * (R + 26);
        ctx.fillStyle = "rgba(26,26,26,0.42)";
        ctx.fillText(d, lx, ly);
      });
      ctx.restore();

      /* edges */
      const hov = hoveredRef.current;
      ctx.save();
      for (const [i, j] of edges) {
        const a = nodes[i];
        const b = nodes[j];
        const isHov = hov && (a === hov || b === hov);
        const dimmed =
          matches && !(matches.has(a.c.id) && matches.has(b.c.id));
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = isHov
          ? "rgba(58,120,194,0.45)"
          : dimmed
            ? "rgba(58,120,194,0.03)"
            : "rgba(58,120,194,0.10)";
        ctx.lineWidth = isHov ? 1.4 : 1;
        ctx.stroke();
      }
      ctx.restore();

      /* nodes */
      for (const n of nodes) {
        const dimmed = matches ? !matches.has(n.c.id) : false;
        const isHov = hov === n;
        ctx.save();
        ctx.globalAlpha = dimmed ? 0.14 : 1;
        if (!dimmed && n.c.tier === "exceptional") {
          ctx.shadowColor = n.color;
          ctx.shadowBlur = 9;
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, isHov ? n.size + 2 : n.size, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
        if (isHov) {
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.size + 5, 0, Math.PI * 2);
          ctx.strokeStyle = n.color;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 0.5;
          ctx.stroke();
        }
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const nodeAt = (mx: number, my: number) => {
      let best: Node | null = null;
      let bestD = 14 * 14;
      for (const n of nodes) {
        const dx = n.x - mx;
        const dy = n.y - my;
        const d = dx * dx + dy * dy;
        if (d < bestD) {
          bestD = d;
          best = n;
        }
      }
      return best;
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      if (dragging) {
        rotation += (e.clientX - lastX) * 0.004;
        dragMoved += Math.abs(e.clientX - lastX);
        lastX = e.clientX;
        setHovered(null);
        return;
      }
      const n = nodeAt(mx, my);
      canvas.style.cursor = n ? "pointer" : "grab";
      setHovered(n ? { node: n, x: n.x, y: n.y, wrapW: rect.width } : null);
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      dragMoved = 0;
      lastX = e.clientX;
      canvas.style.cursor = "grabbing";
      canvas.setPointerCapture(e.pointerId);
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      canvas.style.cursor = "grab";
      canvas.releasePointerCapture(e.pointerId);
      if (dragMoved < 4) {
        const rect = canvas.getBoundingClientRect();
        const n = nodeAt(e.clientX - rect.left, e.clientY - rect.top);
        if (n) router.push(`/employers/talent/candidates/${n.c.id}`);
      }
    };
    const onLeave = () => setHovered(null);

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [nodes, edges, router]);

  const hoveredUni = hovered ? getUniversity(hovered.node.c.universityId) : null;

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-4">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find by name, school, or skill…"
            className="h-9 w-60 rounded-md border border-input bg-background pl-8 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
        <div className="flex items-center gap-4">
          {TIER_ORDER.map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: TIER_META[t].node }}
              />
              {TIER_META[t].label}
            </span>
          ))}
        </div>
      </div>

      <div ref={wrapRef} className="relative min-h-0 flex-1">
        {/* soft center glow + dot grid backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(closest-side, rgba(58,120,194,0.07), transparent 70%)",
          }}
        />
        <div aria-hidden className="hero-dot-grid pointer-events-none absolute inset-0 opacity-60" />
        <canvas ref={canvasRef} className="absolute inset-0 cursor-grab" />

        {hovered && (
          <div
            className={cn(
              "pointer-events-none absolute z-10 w-60 rounded-[var(--radius)] border border-border bg-background p-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
            )}
            style={{
              left: Math.min(Math.max(hovered.x + 14, 8), Math.max(hovered.wrapW - 248, 8)),
              top: Math.max(hovered.y - 30, 8),
            }}
          >
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hovered.node.c.avatarUrl}
                alt=""
                className="h-9 w-9 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold leading-tight">
                  {hovered.node.c.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {hoveredUni?.shortName} ’{String(hovered.node.c.gradYear).slice(2)} ·{" "}
                  {hovered.node.c.domain}
                </p>
              </div>
              <ScorePill score={hovered.node.c.scores.overall} size="sm" />
            </div>
            <p className="mt-2 text-xs font-medium text-accent-strong">View profile →</p>
          </div>
        )}

      </div>

      <p className="border-t border-border px-5 py-2.5 text-xs text-muted-foreground">
        Closer to the center = higher overall score · Drag to rotate · Click a
        candidate to open their profile
      </p>
    </div>
  );
}
