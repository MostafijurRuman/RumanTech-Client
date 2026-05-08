import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-muted-foreground sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <Link href="/" className="font-semibold text-foreground">
            RumanTech
          </Link>
          <p className="mt-2 max-w-xl">
            AI-powered commerce foundation for products, orders, customers, and
            operational workflows.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/products" className="hover:text-foreground">
            Products
          </Link>
          <Link href="/orders" className="hover:text-foreground">
            Orders
          </Link>
          <Link href="/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
