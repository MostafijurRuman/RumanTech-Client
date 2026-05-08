"use client";

import { ProtectedRoute } from "@/components/shared/protected-route";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

export default function ProfileSettingsPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <ProtectedRoute>
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold">Profile settings</h1>
        <div className="mt-6 rounded-lg border bg-card p-5">
          <div className="grid gap-4">
            <label>
              <span className="text-sm font-medium">Name</span>
              <input defaultValue={user?.name} className="mt-2 h-10 w-full rounded-md border bg-background px-3" />
            </label>
            <label>
              <span className="text-sm font-medium">Email</span>
              <input defaultValue={user?.email} disabled className="mt-2 h-10 w-full rounded-md border bg-muted px-3 text-muted-foreground" />
            </label>
            <Button className="w-fit">Save changes</Button>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
