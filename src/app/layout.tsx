import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/components/providers/SessionProvider";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "NeonFlow - Advanced SaaS Analytics Platform",
  description: "Cutting-edge SaaS dashboard with multi-tenancy, subscription management, and cyberpunk aesthetics",
  keywords: ["SaaS", "Analytics", "Multi-tenant", "Subscription", "Dashboard"],
  authors: [{ name: "NeonFlow Team" }],
  openGraph: {
    title: "NeonFlow",
    description: "Advanced SaaS Analytics Platform",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cyber-black text-neon-yellow">
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
