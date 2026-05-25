import { cn } from "@/lib/utils";

/**
 * Deterministic monogram tile used as a stand-in company logo.
 * (No real logo assets in this frontend-only build.)
 */
const PALETTE = [
  "bg-[#FFE8C2] text-[#92400E]",
  "bg-[#FFD8DC] text-[#9F1239]",
  "bg-[#D7E9FF] text-[#1E40AF]",
  "bg-[#D8F3E3] text-[#166534]",
  "bg-[#EADBFF] text-[#6B21A8]",
  "bg-[#FCE6F2] text-[#9D174D]",
  "bg-[#E2E8F0] text-[#334155]",
];

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function LogoMark({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const initials = name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  const color = PALETTE[hash(name) % PALETTE.length];
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex items-center justify-center rounded-[12px] font-semibold select-none",
        color,
        className,
      )}
    >
      {initials || "•"}
    </span>
  );
}
