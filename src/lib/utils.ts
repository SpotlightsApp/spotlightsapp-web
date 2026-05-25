import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, de-duplicating Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a THB salary range compactly, e.g. "฿18K–25K / mo". */
export function formatTHB(
  min: number,
  max?: number,
  period: "mo" | "yr" | "total" = "mo",
) {
  const fmt = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : `${n}`;
  const label = period === "total" ? "" : ` / ${period}`;
  return max && max !== min
    ? `฿${fmt(min)}–${fmt(max)}${label}`
    : `฿${fmt(min)}${label}`;
}
