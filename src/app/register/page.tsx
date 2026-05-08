"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FieldError } from "@/components/shared/field-error";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/modules/auth/components/auth-card";
import { useRegister } from "@/modules/auth/hooks/use-auth";
import { registerSchema, type RegisterFormValues } from "@/modules/auth/validations/auth.validation";

export default function RegisterPage() {
  const router = useRouter();
  const register = useRegister();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await register.mutateAsync(values);
      router.push("/dashboard");
    } catch {
      toast.error("Registration failed.");
    }
  });

  return (
    <section className="px-4 py-16">
      <AuthCard>
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="mt-2 text-sm text-muted-foreground">Start shopping with RumanTech.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input className="mt-2 h-11 w-full rounded-md border bg-background px-3 outline-ring" {...form.register("name")} />
            <FieldError message={form.formState.errors.name?.message} />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input className="mt-2 h-11 w-full rounded-md border bg-background px-3 outline-ring" {...form.register("email")} />
            <FieldError message={form.formState.errors.email?.message} />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input type="password" className="mt-2 h-11 w-full rounded-md border bg-background px-3 outline-ring" {...form.register("password")} />
            <FieldError message={form.formState.errors.password?.message} />
          </div>
          <Button type="submit" className="w-full" disabled={register.isPending}>
            {register.isPending ? "Creating..." : "Create account"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="text-foreground">Sign in</Link>
        </p>
      </AuthCard>
    </section>
  );
}
