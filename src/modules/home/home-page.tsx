import Link from "next/link";
import { ArrowRight, Bot, PackageSearch, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Foundation modules", value: "9+" },
  { label: "API ready layers", value: "Clean" },
  { label: "Theme modes", value: "Light/Dark" },
];

const capabilities = [
  {
    title: "Modular commerce",
    description: "Products, categories, brands, orders, carts, wishlists, and reviews are separated by feature boundary.",
    icon: PackageSearch,
  },
  {
    title: "AI-ready workflows",
    description: "Dedicated AI module space keeps recommendation and assistant features isolated from core commerce logic.",
    icon: Bot,
  },
  {
    title: "Secure foundation",
    description: "JWT, secure cookies, role authorization, validation, and typed service layers are prepared for production flows.",
    icon: ShieldCheck,
  },
];

export function HomePage() {
  return (
    <section>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-md border bg-card px-3 py-1 text-sm text-muted-foreground">
            <Sparkles className="size-4 text-accent" />
            AI-powered single-vendor commerce
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            RumanTech commerce foundation for scalable product operations.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            A modular Next.js client prepared for authentication, catalog,
            checkout, dashboard, and AI-assisted shopping experiences.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/products">
                Browse products
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/dashboard">Open dashboard</Link>
            </Button>
          </div>
        </div>

        <div className="grid content-start gap-4">
          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">
              Phase 1 status
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-md bg-muted p-4">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {capabilities.map((item) => (
            <div key={item.title} className="rounded-lg border bg-card p-5">
              <item.icon className="mb-4 size-5 text-primary" />
              <h2 className="text-base font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
