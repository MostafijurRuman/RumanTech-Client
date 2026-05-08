"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { UserRole } from "@/modules/auth/types/auth.types";
import { useAuthStore } from "@/store/auth-store";

export function ProtectedRoute({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles?: UserRole[];
}) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }

    if (roles?.length && !roles.includes(user.role)) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, roles, router, user]);

  if (!isAuthenticated || !user || (roles?.length && !roles.includes(user.role))) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-sm text-muted-foreground">
        Checking access...
      </div>
    );
  }

  return <>{children}</>;
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export function AdminGuard({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute roles={["ADMIN"]}>{children}</ProtectedRoute>;
}

export function UserGuard({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute roles={["USER"]}>{children}</ProtectedRoute>;
}
