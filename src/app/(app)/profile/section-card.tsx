"use client";

import { Pencil, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SectionCardProps = {
  title: string;
  icon?: "pencil" | "plus";
  onEdit: () => void;
  children: React.ReactNode;
  className?: string;
};

export function SectionCard({
  title,
  icon = "pencil",
  onEdit,
  children,
  className,
}: SectionCardProps) {
  const Icon = icon === "plus" ? Plus : Pencil;
  return (
    <Card
      className={cn(
        "group p-6 transition-all duration-200 hover:border-accent/40 hover:shadow-[0_8px_30px_-12px_rgb(0,0,0,0.12)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          type="button"
          onClick={onEdit}
          aria-label={`Edit ${title}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground opacity-0 transition-all hover:bg-accent-soft hover:text-accent-strong focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover:opacity-100 cursor-pointer"
        >
          <Icon className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4">{children}</div>
    </Card>
  );
}
