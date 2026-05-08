"use client";

import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
      <Button className="mt-6" onClick={reset}>
        Try again
      </Button>
    </section>
  );
}
