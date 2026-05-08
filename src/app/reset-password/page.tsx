"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FieldError } from "@/components/shared/field-error";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/modules/auth/components/auth-card";
import { useResetPassword } from "@/modules/auth/hooks/use-auth";
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/modules/auth/validations/auth.validation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const mutation = useResetPassword();
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token: "", newPassword: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync(values);
      router.push("/login");
    } catch {
      toast.error("Reset token is invalid or expired.");
    }
  });

  return (
    <section className="px-4 py-16">
      <AuthCard>
        <h1 className="text-2xl font-semibold">Reset password</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Reset token</label>
            <input className="mt-2 h-11 w-full rounded-md border bg-background px-3 outline-ring" {...form.register("token")} />
            <FieldError message={form.formState.errors.token?.message} />
          </div>
          <div>
            <label className="text-sm font-medium">New password</label>
            <input type="password" className="mt-2 h-11 w-full rounded-md border bg-background px-3 outline-ring" {...form.register("newPassword")} />
            <FieldError message={form.formState.errors.newPassword?.message} />
          </div>
          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? "Resetting..." : "Reset password"}
          </Button>
        </form>
      </AuthCard>
    </section>
  );
}
