import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkVault — Fast & Secure URL Shortener",
  description:
    "A fast, secure, and modern link shortening service with advanced analytics and instant redirection.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans">{children}</body>
    </html>
  );
}
