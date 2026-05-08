"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, MapPin, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/modules/dashboard/layouts/dashboard-layout";
import { useProfile, useProfileActions } from "@/modules/profile/hooks/use-profile";
import { addressSchema, profileSchema } from "@/modules/profile/validations/profile.validation";
import type { z } from "zod";

type ProfileForm = z.infer<typeof profileSchema>;
type AddressForm = z.input<typeof addressSchema>;

export default function ProfileSettingsPage() {
  const profile = useProfile();
  const actions = useProfileActions();
  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    values: { name: profile.data?.name ?? "", phone: profile.data?.phone ?? "" },
  });
  const addressForm = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: { country: "Bangladesh", isDefault: false },
  });
  const passwordForm = useForm<{ oldPassword: string; newPassword: string }>();

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <div className="grid gap-6">
            <section className="rounded-lg border bg-card/90 p-5 shadow-sm backdrop-blur">
              <h2 className="text-xl font-semibold">Profile management</h2>
              <form
                className="mt-5 grid gap-4"
                onSubmit={profileForm.handleSubmit((values) => actions.update.mutate({ name: values.name, phone: values.phone || undefined }))}
              >
                <label className="grid gap-2 text-sm">
                  Name
                  <input {...profileForm.register("name")} className="h-10 rounded-md border bg-background px-3" />
                </label>
                <label className="grid gap-2 text-sm">
                  Email
                  <input value={profile.data?.email ?? ""} disabled className="h-10 rounded-md border bg-muted px-3 text-muted-foreground" />
                </label>
                <label className="grid gap-2 text-sm">
                  Phone
                  <input {...profileForm.register("phone")} className="h-10 rounded-md border bg-background px-3" />
                </label>
                <div className="flex flex-wrap gap-3">
                  <Button type="submit" disabled={actions.update.isPending}>Save changes</Button>
                  <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-md border px-4 text-sm font-medium hover:bg-muted">
                    <Camera className="size-4" />
                    Upload avatar
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) actions.uploadAvatar.mutate(file);
                      }}
                    />
                  </label>
                </div>
              </form>
            </section>

            <section className="rounded-lg border bg-card/90 p-5 shadow-sm backdrop-blur">
              <h2 className="text-xl font-semibold">Change password</h2>
              <form
                className="mt-5 grid gap-4"
                onSubmit={passwordForm.handleSubmit((values) => {
                  actions.changePassword.mutate(values);
                  passwordForm.reset();
                })}
              >
                <input type="password" {...passwordForm.register("oldPassword", { required: true })} placeholder="Current password" className="h-10 rounded-md border bg-background px-3 text-sm" />
                <input type="password" {...passwordForm.register("newPassword", { required: true })} placeholder="New password" className="h-10 rounded-md border bg-background px-3 text-sm" />
                <Button type="submit" disabled={actions.changePassword.isPending}>Update password</Button>
              </form>
            </section>
          </div>

          <section className="rounded-lg border bg-card/90 p-5 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold">Addresses</h2>
            <form
              className="mt-5 grid gap-3"
              onSubmit={addressForm.handleSubmit((values) => {
                actions.createAddress.mutate(values);
                addressForm.reset({ country: "Bangladesh", isDefault: false });
              })}
            >
              <input {...addressForm.register("label")} placeholder="Label" className="h-10 rounded-md border bg-background px-3 text-sm" />
              <input {...addressForm.register("name")} placeholder="Recipient name" className="h-10 rounded-md border bg-background px-3 text-sm" />
              <input {...addressForm.register("phone")} placeholder="Phone" className="h-10 rounded-md border bg-background px-3 text-sm" />
              <input {...addressForm.register("line1")} placeholder="Address line 1" className="h-10 rounded-md border bg-background px-3 text-sm" />
              <input {...addressForm.register("city")} placeholder="City" className="h-10 rounded-md border bg-background px-3 text-sm" />
              <Button type="submit" disabled={actions.createAddress.isPending}>Add address</Button>
            </form>
            <div className="mt-5 grid gap-3">
              {profile.data?.addresses.map((address) => (
                <div key={address.id} className="rounded-md border p-3 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{address.label ?? address.name}</p>
                      <p className="mt-1 text-muted-foreground">{address.line1}, {address.city}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => actions.deleteAddress.mutate(address.id)}>
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                  {address.isDefault && <p className="mt-2 inline-flex items-center gap-1 text-xs text-primary"><MapPin className="size-3" /> Default</p>}
                </div>
              ))}
            </div>
          </section>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
