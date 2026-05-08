import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AppProvider } from "@/providers/app-provider";
import { MainLayout } from "@/components/layouts/main-layout";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RumanTech | AI-powered eCommerce",
  description: "A production-ready AI-powered single-vendor eCommerce platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-background text-foreground antialiased`}
      >
        <AppProvider>
          <MainLayout>{children}</MainLayout>
          <Toaster richColors closeButton position="top-right" />
        </AppProvider>
      </body>
    </html>
  );
}
