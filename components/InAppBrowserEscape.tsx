"use client";

import { useEffect, useState } from "react";

interface InAppBrowserEscapeProps {
  currentUrl?: string;
}

export default function InAppBrowserEscape({ currentUrl }: InAppBrowserEscapeProps) {
  const [isInApp, setIsInApp] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ua = navigator.userAgent.toLowerCase();
    const isTelegram = ua.includes("telegram");
    const isWhatsApp = ua.includes("whatsapp");
    const isFB = ua.includes("fban") || ua.includes("fbav");
    const isInstagram = ua.includes("instagram");
    const isMicroMessenger = ua.includes("micromessenger");

    const inAppDetected = isTelegram || isWhatsApp || isFB || isInstagram || isMicroMessenger;
    const iOSDetected = /iphone|ipad|ipod/.test(ua);

    setIsInApp(inAppDetected);
    setIsIOS(iOSDetected);

    if (inAppDetected && !iOSDetected) {
      // Android auto-breakout to native Google Chrome
      const target = currentUrl || window.location.href;
      const cleanTarget = target.replace(/^https?:\/\//, "");
      const intentUrl = `intent://${cleanTarget}#Intent;scheme=https;package=com.android.chrome;end`;

      try {
        window.location.href = intentUrl;
      } catch (e) {
        console.warn("Could not auto-trigger Chrome intent", e);
      }
    }
  }, [currentUrl]);

  if (!isInApp) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-amber-500/95 text-slate-950 px-4 py-3 shadow-lg backdrop-blur-md flex items-center justify-between text-xs sm:text-sm font-medium">
      <div className="flex items-center gap-2">
        <span className="text-base">⚠️</span>
        <span>
          {isIOS
            ? "Tap the Share / More icon (⋯) and select 'Open in Safari' for fast download."
            : "Opening in Google Chrome for faster download & ad-free experience..."}
        </span>
      </div>
      <button
        onClick={() => setIsInApp(false)}
        className="text-slate-900 font-bold px-2 py-1 rounded hover:bg-amber-600/30"
        aria-label="Dismiss warning"
      >
        ✕
      </button>
    </div>
  );
}
