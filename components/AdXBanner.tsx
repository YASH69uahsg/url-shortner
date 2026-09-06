"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import AdsterraBanner from "@/components/AdsterraBanner";

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
          /* Live Adsterra Banner active on every article */
          <div className="w-full flex justify-center py-2">
            <AdsterraBanner slot={slot} />
          </div>
        )}
      </div>
    </div>
  );
}
