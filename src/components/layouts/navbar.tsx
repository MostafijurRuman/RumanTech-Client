"use client";

import Link from "next/link";
import { Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/constants/nav-links";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            RT
          </span>
          <span className="text-lg">RumanTech</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button aria-label="Search" size="icon" variant="ghost">
            <Search />
          </Button>
          <Button aria-label="Cart" size="icon" variant="ghost">
            <ShoppingCart />
          </Button>
          <ThemeToggle />
          <Button asChild>
            <Link href="/login">
              <UserRound />
              Account
            </Link>
          </Button>
        </div>

        <Button
          aria-label="Toggle menu"
          size="icon"
          variant="ghost"
          className="md:hidden"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </nav>

      <div
        className={cn(
          "border-t bg-background px-4 py-4 md:hidden",
          isOpen ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col gap-3">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-2 text-sm font-medium hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center justify-between border-t pt-3">
            <ThemeToggle />
            <Button asChild size="sm">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                Account
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
