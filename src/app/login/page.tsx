"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FieldError } from "@/components/shared/field-error";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/modules/auth/hooks/use-auth";
import { loginSchema } from "@/modules/auth/validations/auth.validation";
import { cn } from "@/lib/utils";

const loginFormSchema = loginSchema.extend({
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;
type DemoRole = "ADMIN" | "USER";

const demoCredentials: Record<DemoRole, { email: string; password: string; label: string }> = {
  USER: {
    email: "user@rumantech.com",
    password: "User@123",
    label: "Login as Demo User",
  },
  ADMIN: {
    email: "admin@rumantech.com",
    password: "Admin@123",
    label: "Login as Admin",
  },
};

export default function LoginPage() {
  const router = useRouter();
  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [activeDemoRole, setActiveDemoRole] = useState<DemoRole | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "", remember: true },
  });

  const loginWithCredentials = async (values: Pick<LoginFormValues, "email" | "password">) => {
    await login.mutateAsync(values);
    router.push("/dashboard");
  };

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await loginWithCredentials(values);
    } catch {
      toast.error("Login failed. Check your credentials.");
    }
  });

  const handleDemoLogin = async (role: DemoRole) => {
    const credentials = demoCredentials[role];
    setActiveDemoRole(role);
    form.setValue("email", credentials.email, { shouldValidate: true });
    form.setValue("password", credentials.password, { shouldValidate: true });

    try {
      await loginWithCredentials(credentials);
      toast.success(`${role === "ADMIN" ? "Admin" : "Demo user"} session started`);
    } catch {
      toast.error("Demo login failed. Make sure demo users are seeded.");
    } finally {
      setActiveDemoRole(null);
    }
  };

  const isSubmitting = login.isPending;

  return (
    <section className="relative min-h-[calc(100vh-8rem)] overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(17,97,73,0.18),transparent_32%),radial-gradient(circle_at_80%_15%,rgba(201,138,46,0.16),transparent_28%)]" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="hidden lg:block"
        >
          <div className="inline-flex items-center gap-2 rounded-md border bg-card/70 px-3 py-1 text-sm text-muted-foreground backdrop-blur">
            <Sparkles className="size-4 text-accent" />
            Secure commerce access
          </div>
          <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-tight">
            Manage shopping, orders, and admin operations from one account.
          </h1>
          <p className="mt-5 max-w-lg leading-7 text-muted-foreground">
            JWT access tokens, HTTP-only refresh cookies, role guards, and demo
            sessions are wired into the RumanTech auth flow.
          </p>
          <div className="mt-8 grid max-w-lg gap-3 sm:grid-cols-2">
            {[
              { title: "User dashboard", icon: LockKeyhole },
              { title: "Admin guard", icon: ShieldCheck },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border bg-card/75 p-4 backdrop-blur">
                <item.icon className="mb-3 size-5 text-primary" />
                <p className="font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">Protected by role-aware routing.</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="rounded-xl border bg-card/82 p-6 shadow-2xl shadow-black/10 backdrop-blur-md sm:p-8">
            <div>
              <p className="text-sm font-medium text-primary">Welcome back</p>
              <h2 className="mt-2 text-3xl font-semibold">Sign in to RumanTech</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Use your account or start instantly with a demo session.
              </p>
            </div>

            <form onSubmit={onSubmit} className="mt-7 space-y-5">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  className="mt-2 h-11 w-full rounded-md border bg-background/90 px-3 outline-ring transition focus:border-ring"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...form.register("email")}
                />
                <FieldError message={form.formState.errors.email?.message} />
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="h-11 w-full rounded-md border bg-background/90 px-3 pr-11 outline-ring transition focus:border-ring"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    {...form.register("password")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                <FieldError message={form.formState.errors.password?.message} />
              </div>

              <div className="flex items-center justify-between gap-3 text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input
                    type="checkbox"
                    className="size-4 rounded border"
                    {...form.register("remember")}
                  />
                  Remember me
                </label>
                <Link href="/forgot-password" className="font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && !activeDemoRole ? <Loader2 className="animate-spin" /> : null}
                {isSubmitting && !activeDemoRole ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px bg-border" />
              <span>Demo access</span>
              <span className="h-px bg-border" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {(Object.keys(demoCredentials) as DemoRole[]).map((role) => {
                const credentials = demoCredentials[role];
                const isActive = activeDemoRole === role && isSubmitting;

                return (
                  <Button
                    key={role}
                    type="button"
                    variant={role === "ADMIN" ? "default" : "outline"}
                    className={cn("w-full", role === "ADMIN" && "bg-accent text-accent-foreground hover:bg-accent/90")}
                    disabled={isSubmitting}
                    onClick={() => void handleDemoLogin(role)}
                  >
                    {isActive ? <Loader2 className="animate-spin" /> : null}
                    {isActive ? "Logging in..." : credentials.label}
                  </Button>
                );
              })}
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              New to RumanTech?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
