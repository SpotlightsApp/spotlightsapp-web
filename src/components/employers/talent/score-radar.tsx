import type { TalentScores } from "@/lib/talent";

const AXES: { key: keyof Omit<TalentScores, "overall">; label: string }[] = [
  { key: "technical", label: "Technical" },
  { key: "execution", label: "Execution" },
  { key: "trajectory", label: "Trajectory" },
  { key: "communication", label: "Comms" },
  { key: "leadership", label: "Leadership" },
];

export function ScoreRadar({
  scores,
  size = 220,
}: {
  scores: TalentScores;
  size?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 44;
  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / AXES.length;
  const point = (i: number, r: number) =>
    `${cx + Math.cos(angle(i)) * r},${cy + Math.sin(angle(i)) * r}`;

  const ringPoly = (frac: number) =>
    AXES.map((_, i) => point(i, R * frac)).join(" ");
  const valuePoly = AXES.map((a, i) =>
    point(i, (Math.max(0, Math.min(100, scores[a.key])) / 100) * R),
  ).join(" ");

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      role="img"
      aria-label="Competency radar chart"
    >
      {[0.33, 0.66, 1].map((f) => (
        <polygon
          key={f}
          points={ringPoly(f)}
          fill="none"
          stroke="var(--border)"
          strokeWidth={1}
        />
      ))}
      {AXES.map((_, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={cx + Math.cos(angle(i)) * R}
          y2={cy + Math.sin(angle(i)) * R}
          stroke="var(--border)"
          strokeWidth={1}
        />
      ))}
      <polygon
        points={valuePoly}
        fill="rgba(58,120,194,0.16)"
        stroke="#3A78C2"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {AXES.map((a, i) => {
        const r = (Math.max(0, Math.min(100, scores[a.key])) / 100) * R;
        return (
          <circle
            key={a.key}
            cx={cx + Math.cos(angle(i)) * r}
            cy={cy + Math.sin(angle(i)) * r}
            r={2.5}
            fill="#3A78C2"
          />
        );
      })}
      {AXES.map((a, i) => {
        const lx = cx + Math.cos(angle(i)) * (R + 18);
        const ly = cy + Math.sin(angle(i)) * (R + 16);
        return (
          <text
            key={a.key}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={10}
            fontWeight={500}
            fill="var(--muted-foreground)"
          >
            {a.label}
          </text>
        );
      })}
    </svg>
  );
}
