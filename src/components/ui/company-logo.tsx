"use client";

import { useState } from "react";
import { LogoMark } from "./logo-mark";
import { cn } from "@/lib/utils";

/** Company logo image with a graceful fallback to an initials monogram. */
export function CompanyLogo({
  name,
  src,
  className,
}: {
  name: string;
  src?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <LogoMark name={name} className={className} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn(
        "rounded-[12px] border border-border bg-white object-contain p-1",
        className,
      )}
    />
  );
}
