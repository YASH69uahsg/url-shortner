import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkVault — Private URL Shortener",
  description:
    "A private, secure URL shortening service with advanced analytics and monetization capabilities.",
  robots: "noindex, nofollow", // Private app — no public indexing
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
