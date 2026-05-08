"use client";

import {
  BarChart3,
  Bell,
  Boxes,
  Building2,
  ChevronLeft,
  ClipboardList,
  Heart,
  LayoutDashboard,
  Menu,
  Package,
  Star,
  Tags,
  Users,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NotificationDropdown } from "@/modules/dashboard/components/notification-dropdown";
import { useAuthStore } from "@/store/auth-store";

const adminLinks = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Boxes },
  { label: "Categories", href: "/admin/categories", icon: Tags },
  { label: "Brands", href: "/admin/brands", icon: Building2 },
  { label: "Orders", href: "/admin/orders", icon: ClipboardList },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Notifications", href: "/admin/notifications", icon: Bell },
];

const userLinks = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Orders", href: "/dashboard/orders", icon: Package },
  { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { label: "My Reviews", href: "/dashboard/reviews", icon: Star },
  { label: "Profile", href: "/dashboard/profile", icon: UserRound },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
];

export function DashboardLayout({
  children,
  variant = "user",
}: {
  children: React.ReactNode;
  variant?: "admin" | "user";
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const links = variant === "admin" ? adminLinks : userLinks;

  const sidebar = (
    <aside className={cn("flex h-full flex-col border-r bg-card/90 backdrop-blur", collapsed ? "w-20" : "w-72")}>
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && <Link href="/" className="font-semibold">RumanTech</Link>}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed((value) => !value)} className="hidden lg:inline-flex">
          <ChevronLeft className={cn("size-4 transition", collapsed && "rotate-180")} />
        </Button>
      </div>
      <nav className="grid gap-1 p-3">
        {links.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                active && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              )}
            >
              <item.icon className="size-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">{sidebar}</div>
      {mobileOpen && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <div className={cn("fixed inset-y-0 left-0 z-50 transition lg:hidden", mobileOpen ? "translate-x-0" : "-translate-x-full")}>{sidebar}</div>

      <div className={cn("min-h-screen transition-all", collapsed ? "lg:pl-20" : "lg:pl-72")}>
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/85 px-4 backdrop-blur lg:px-6">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={() => setMobileOpen(true)} className="lg:hidden">
              <Menu className="size-4" />
            </Button>
            <div>
              <p className="text-xs text-muted-foreground">{variant === "admin" ? "Admin" : "Dashboard"}</p>
              <h1 className="text-base font-semibold">{pathname.split("/").filter(Boolean).at(-1) ?? "overview"}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <NotificationDropdown />
            <div className="hidden text-right text-sm md:block">
              <p className="font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 lg:px-6">{children}</main>
      </div>
    </div>
  );
}
