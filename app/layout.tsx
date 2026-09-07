import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "YashLab — Fast & Secure URL Shortener & Knowledge Hub",
  description:
    "A fast, secure, and modern link shortening service with advanced analytics and insightful research articles.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "2dDw_pcs03JLd_24mHbUK73Cdfig4yxet7tYFa9uyHQ",
  },
  other: {
    "google-adsense-account": "ca-pub-9216546431290162",
    "google-site-verification": "2dDw_pcs03JLd_24mHbUK73Cdfig4yxet7tYFa9uyHQ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9216546431290162"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
