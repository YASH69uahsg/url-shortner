"use client";

import Script from "next/script";

interface PopunderAdProps {
  /** Your ad network site ID */
  siteId?: string;
}

/**
 * Popunder Ad Component
 *
 * This component injects a popunder ad script using Next.js <Script> with
 * strategy="afterInteractive" to avoid blocking page load.
 *
 * INSTRUCTIONS:
 * 1. Sign up with your ad network (Monetag, Adsterra, etc.)
 * 2. Get your popunder script/site ID
 * 3. Replace the placeholder below with your actual script
 */
export default function PopunderAd({ siteId }: PopunderAdProps) {
  if (!siteId) {
    return (
      <>
        {/* ============================================================
            POPUNDER AD PLACEHOLDER
            
            Replace this entire block with your Monetag/Adsterra popunder script.
            
            Example for Monetag:
            <Script
              strategy="afterInteractive"
              src={`https://alwingulla.com/88/tag.min.js`}
              data-zone={siteId}
            />
            
            Example for Adsterra:
            <Script
              strategy="afterInteractive"
              src={`//www.highperformanceformat.com/${siteId}/invoke.js`}
            />
            ============================================================ */}
      </>
    );
  }

  return (
    <Script
      id="popunder-ad"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          // INSERT YOUR MONETAG/ADSTERRA POPUNDER SCRIPT HERE
          // Replace this comment block with the actual ad script provided by your network.
          //
          // Example (Monetag):
          // (function(d,z,s){s.src='https://alwingulla.com/88/tag.min.js';s.setAttribute('data-zone','${siteId}');d.body.appendChild(s);})(document,window,document.createElement('script'));
          //
          // Example (Adsterra):
          // (function(d,z,s){s.src='//www.highperformanceformat.com/${siteId}/invoke.js';d.body.appendChild(s);})(document,window,document.createElement('script'));
          
          console.log('[Ad] Popunder script placeholder loaded. Site ID: ${siteId}');
        `,
      }}
    />
  );
}
