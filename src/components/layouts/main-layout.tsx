"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  if (isDashboardRoute) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
