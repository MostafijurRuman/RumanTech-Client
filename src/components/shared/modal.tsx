"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Modal({
  title,
  open,
  onClose,
  children,
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-lg border bg-card shadow-lg">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-semibold">{title}</h2>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X />
          </Button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
