"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: string | number;
  helper?: string;
  icon: LucideIcon;
  tone?: "primary" | "accent" | "neutral";
}) {
  return (
    <div className="rounded-lg border bg-card/85 p-5 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-normal">{value}</p>
        </div>
        <span
          className={cn(
            "grid size-10 place-items-center rounded-md",
            tone === "primary" && "bg-primary/10 text-primary",
            tone === "accent" && "bg-accent/15 text-accent",
            tone === "neutral" && "bg-muted text-foreground"
          )}
        >
          <Icon className="size-5" />
        </span>
      </div>
      {helper && <p className="mt-3 text-xs text-muted-foreground">{helper}</p>}
    </div>
  );
}
