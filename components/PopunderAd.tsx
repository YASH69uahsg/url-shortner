"use client";

import Script from "next/script";

interface PopunderAdProps {
  scriptSrc?: string;
}

/**
 * Adsterra Popunder (OnClick) Ad Component
 *
 * Injects the Adsterra popunder script using Next.js <Script> with
 * strategy="afterInteractive" to load asynchronously without blocking page render.
 * Automatically deduplicated by the `id` attribute.
 */
export default function PopunderAd({
  scriptSrc = "https://pl31196061.profitableratecpmnetwork.com/8e/24/98/8e2498c99e75448379e3dc982cc98c6f.js",
}: PopunderAdProps) {
  return (
    <Script
      id="adsterra-popunder"
      strategy="afterInteractive"
      src={scriptSrc}
    />
  );
}
