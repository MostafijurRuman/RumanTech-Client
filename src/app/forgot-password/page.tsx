"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FieldError } from "@/components/shared/field-error";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/modules/auth/components/auth-card";
import { useForgotPassword } from "@/modules/auth/hooks/use-auth";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/modules/auth/validations/auth.validation";

export default function ForgotPasswordPage() {
  const mutation = useForgotPassword();
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const result = await mutation.mutateAsync(values);
    if (result.data?.resetToken) {
      toast.info(`Development reset token: ${result.data.resetToken}`);
    }
  });

  return (
    <section className="px-4 py-16">
      <AuthCard>
        <h1 className="text-2xl font-semibold">Forgot password</h1>
        <p className="mt-2 text-sm text-muted-foreground">Generate a reset token for your account.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input className="mt-2 h-11 w-full rounded-md border bg-background px-3 outline-ring" {...form.register("email")} />
            <FieldError message={form.formState.errors.email?.message} />
          </div>
          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? "Sending..." : "Send reset instructions"}
          </Button>
        </form>
      </AuthCard>
    </section>
  );
}
