import * as React from "react";
import { cn } from "@/lib/utils";

export function AuthCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-md rounded-lg border bg-card p-6 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
