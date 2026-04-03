import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeonFlow CRM - Advanced Customer Relationship Management",
  description: "Cutting-edge CRM platform with contact management, sales pipeline, and analytics",
  keywords: ["CRM", "Customer Relationship Management", "Sales Pipeline", "Analytics", "Dashboard"],
  authors: [{ name: "NeonFlow Team" }],
  openGraph: {
    title: "NeonFlow CRM",
    description: "Advanced Customer Relationship Management Platform",
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-black text-yellow-400">
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
