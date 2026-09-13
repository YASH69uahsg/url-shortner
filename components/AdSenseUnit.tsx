"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { MONETIZATION_CONFIG } from "@/lib/monetization-config";

interface AdSenseUnitProps {
  slot: string;
  format?: "auto" | "horizontal" | "rectangle" | "vertical";
  responsive?: boolean;
  className?: string;
  label?: string;
}

export default function AdSenseUnit({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  label = "Sponsored Advertisement",
}: AdSenseUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isPushed = useRef(false);

  const isApproved = MONETIZATION_CONFIG.isAdsenseApproved;
  const publisherId = MONETIZATION_CONFIG.adsense?.publisherId || "ca-pub-XXXXXXXXXXXXXXXX";

  useEffect(() => {
    if (isApproved && typeof window !== "undefined" && !isPushed.current) {
      try {
        const adsbygoogle = (window as unknown as { adsbygoogle?: Array<Record<string, unknown>> }).adsbygoogle || [];
        adsbygoogle.push({});
        isPushed.current = true;
      } catch (err) {
        console.warn("AdSense push error:", err);
      }
    }
  }, [isApproved]);

  const getFormatClasses = () => {
    switch (format) {
      case "horizontal":
        return "w-full max-w-2xl min-h-[90px] sm:min-h-[100px]";
      case "rectangle":
        return "w-full max-w-sm sm:max-w-md min-h-[250px]";
      case "vertical":
        return "w-full max-w-xs min-h-[300px]";
      default:
        return "w-full max-w-2xl min-h-[120px] sm:min-h-[250px]";
    }
  };

  return (
    <div className={`w-full flex flex-col items-center justify-center my-3 overflow-hidden ${className}`}>
      {/* Ad Label */}
      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-1 select-none">
        {label}
      </span>

      {/* Ad Box */}
      <div
        className={`${getFormatClasses()} bg-slate-100/90 border border-slate-200/90 rounded-2xl flex flex-col items-center justify-center p-3 text-center relative overflow-hidden transition-all shadow-xs`}
      >
        {isApproved ? (
          <>
            <Script
              id="google-adsense-script"
              strategy="afterInteractive"
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
              crossOrigin="anonymous"
            />
            <ins
              ref={adRef}
              className="adsbygoogle"
              style={{ display: "block", width: "100%", height: "100%" }}
              data-ad-client={publisherId}
              data-ad-slot={slot}
              data-ad-format={format}
              data-full-width-responsive={responsive ? "true" : "false"}
            />
          </>
        ) : (
          /* Placeholder Box for Review & Development */
          <div className="w-full h-full flex flex-col items-center justify-center py-4 px-3 text-slate-400 select-none">
            <div className="w-9 h-9 rounded-xl bg-slate-200/80 text-slate-500 flex items-center justify-center mb-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-xs font-semibold text-slate-600 font-display">
              Google AdSense Display Unit
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Slot ID: <span className="font-mono text-slate-500">{slot}</span> • Format: {format}
            </p>
            <span className="mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60">
              Active View High CPM Placement
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
