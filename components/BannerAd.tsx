"use client";

interface BannerAdProps {
  /** Position of the banner: "top" or "bottom" */
  slot: "top" | "bottom";
  /** Ad network zone/slot ID */
  zoneId?: string;
  /** Banner dimensions */
  size?: {
    width: number;
    height: number;
  };
}

/**
 * Banner Ad Component
 *
 * Renders a styled placeholder container for banner advertisements.
 *
 * INSTRUCTIONS:
 * 1. Sign up with your ad network (Monetag, Adsterra, Google AdSense, etc.)
 * 2. Get your banner ad code/zone ID
 * 3. Replace the placeholder content below with your actual ad code
 */
export default function BannerAd({
  slot,
  zoneId,
  size = { width: 728, height: 90 },
}: BannerAdProps) {
  return (
    <div
      className={`flex items-center justify-center w-full ${
        slot === "top" ? "mb-6" : "mt-6"
      }`}
    >
      <div
        id={`banner-ad-${slot}`}
        className="relative flex items-center justify-center rounded-xl overflow-hidden
          border border-white/5 bg-white/[0.02] backdrop-blur-sm"
        style={{
          maxWidth: size.width,
          width: "100%",
          minHeight: size.height,
        }}
      >
        {/* ============================================================
            BANNER AD PLACEHOLDER
            
            Replace this entire div content with your actual ad code.
            
            Example for Monetag:
            <Script
              strategy="afterInteractive"
              src={`https://alwingulla.com/88/tag.min.js`}
              data-zone={zoneId}
            />
            
            Example for Adsterra:
            <ins
              className="adsbyexoclick"
              data-zoneid={zoneId}
            />
            <Script src="https://ads.exoclick.com/ads.js" />
            
            Example for Google AdSense:
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-XXXXXXXX"
              data-ad-slot={zoneId}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
            ============================================================ */}

        {/* Placeholder visual - remove when real ads are inserted */}
        <div className="flex flex-col items-center justify-center gap-1 py-4 px-6 text-center">
          <div className="flex items-center gap-2 text-white/20">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span className="text-xs font-medium uppercase tracking-wider">
              {slot === "top" ? "Top" : "Bottom"} Banner Ad
            </span>
          </div>
          <span className="text-[10px] text-white/10">
            {size.width}×{size.height} • Zone: {zoneId || "not-set"}
          </span>
        </div>
      </div>
    </div>
  );
}
