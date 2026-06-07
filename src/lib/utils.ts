import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, de-duplicating Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a USD salary range compactly, e.g. "$120K–180K / yr". */
export function formatSalary(
  min: number,
  max?: number,
  period: "mo" | "yr" | "total" = "yr",
) {
  const fmt = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : `${n}`;
  const label = period === "total" ? "" : ` / ${period}`;
  return max && max !== min
    ? `$${fmt(min)}–${fmt(max)}${label}`
    : `$${fmt(min)}${label}`;
}

/** @deprecated kept as an alias; use formatSalary. */
export const formatTHB = formatSalary;

/** Up to two uppercase initials from a name (shared by avatars + monograms). */
export function getInitials(name: string) {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

/* ----------------------------- Date helpers ---------------------------- */
// Locale-aware, Bangkok-time event date formatting (Gregorian even in Thai).
type Loc = "en" | "th";
const intlLocale = (locale: Loc) =>
  locale === "th" ? "th-TH-u-ca-gregory" : "en-GB";
const TZ = "Asia/Bangkok";

export function eventDateBadge(iso: string, locale: Loc) {
  const lng = intlLocale(locale);
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString(lng, { day: "2-digit", timeZone: TZ }),
    month: d
      .toLocaleDateString(lng, { month: "short", timeZone: TZ })
      .toUpperCase(),
    time: d.toLocaleTimeString(lng, {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: TZ,
    }),
  };
}

export function eventDateLong(iso: string, locale: Loc) {
  return new Date(iso).toLocaleDateString(intlLocale(locale), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TZ,
  });
}

export function eventTime(iso: string, locale: Loc) {
  return new Date(iso).toLocaleTimeString(intlLocale(locale), {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  });
}
