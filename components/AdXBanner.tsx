"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

interface AdXBannerProps {
  slot: "top" | "middle" | "bottom";
  gamSlotName?: string;
  adUnitPath?: string;
}

/**
 * Responsive Google Ad Manager (GPT) / AdSense banner container
 * with graceful fallback to Adsterra or clean sponsored placement.
 */
export default function AdXBanner({ slot, adUnitPath }: AdXBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);

  const gamNetworkCode = process.env.NEXT_PUBLIC_GAM_NETWORK_CODE;
  const slotId = `gpt-ad-${slot}-${Math.random().toString(36).substring(2, 7)}`;

  useEffect(() => {
    if (typeof window !== "undefined" && (window as unknown as { googletag?: { cmd: Array<() => void> } }).googletag && gamNetworkCode) {
      const gTag = (window as unknown as { googletag: { cmd: Array<() => void>; display: (id: string) => void } }).googletag;
      gTag.cmd.push(() => {
        gTag.display(slotId);
      });
    }
  }, [slotId, gamNetworkCode]);

  return (
    <div className="w-full flex flex-col items-center justify-center my-4 overflow-hidden">
      {/* Label */}
      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-1">
        Sponsored Advertisement
      </span>

      {/* Ad Box Container */}
      <div
        ref={adRef}
        id={slotId}
        className="w-full max-w-2xl min-h-[100px] sm:min-h-[250px] bg-slate-100/80 border border-slate-200/80 rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-inner relative overflow-hidden"
      >
        {gamNetworkCode && adUnitPath ? (
          <>
            {/* Google Publisher Tag Execution */}
            <Script
              id="google-gpt-script"
              strategy="afterInteractive"
              src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
            />
            <div id={`div-${slotId}`} className="w-full flex justify-center" />
          </>
        ) : (
          /* High-converting clean sponsored card before AdX is connected */
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-100">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span>Premium Sponsor Placement</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 max-w-md">
              Compare Top Senior Health &amp; Term Life Insurance Quotes in 2026
            </p>
            <p className="text-[11px] text-slate-500 max-w-sm">
              Save up to 40% with zero-copay waivers &amp; instant cashless hospital networks.
            </p>
            <button
              type="button"
              className="mt-1 text-xs px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors shadow-sm cursor-pointer"
              onClick={() => {
                const smartlink =
                  process.env.NEXT_PUBLIC_SMARTLINK_URL ||
                  "https://www.profitableratecpmnetwork.com/vbb2rmsm18?key=614b0942276e61481a389fa8f6b830b6";
                window.open(smartlink, "_blank", "noopener,noreferrer");
              }}
            >
              Check Quotes Online →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
