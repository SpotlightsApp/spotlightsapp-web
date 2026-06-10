"use client";

import { useState } from "react";
import { LogoMark } from "@/components/ui/logo-mark";
import { cn } from "@/lib/utils";

export function UniversityLogo({
  name,
  src,
  className,
}: {
  name: string;
  src?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <LogoMark name={name} className={cn("h-5 w-5 rounded-[6px] text-[9px]", className)} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${name} logo`}
      onError={() => setFailed(true)}
      className={cn("h-5 w-5 shrink-0 rounded-[6px] object-contain", className)}
    />
  );
}
