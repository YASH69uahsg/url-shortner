"use client";

import Script from "next/script";

interface SocialBarAdProps {
  scriptSrc?: string;
}

/**
 * Adsterra Social Bar Ad Component
 *
 * Loads the Adsterra Social Bar floating interactive ad asynchronously
 * using Next.js <Script> with strategy="afterInteractive".
 */
export default function SocialBarAd({
  scriptSrc = "https://pl31196106.profitableratecpmnetwork.com/29/fc/b5/29fcb5be5e8abd5aa4030318cd8acf63.js",
}: SocialBarAdProps) {
  return (
    <Script
      id="adsterra-social-bar"
      strategy="afterInteractive"
      src={scriptSrc}
    />
  );
}
