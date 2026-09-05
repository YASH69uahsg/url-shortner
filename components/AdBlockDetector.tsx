"use client";

import { useState, useEffect } from "react";

/**
 * AdBlock Detector Component
 *
 * Uses dual-layer detection (DOM bait element + network request check)
 * to detect AdBlockers and Brave Shields. If detected, shows a sleek
 * overlay that guides users to disable their AdBlocker to continue.
 */
export default function AdBlockDetector() {
  const [isAdBlockActive, setIsAdBlockActive] = useState(false);

  useEffect(() => {
    let isDetected = false;

    // 1. DOM Bait Test: Create an element with classes ad blockers unconditionally block
    const bait = document.createElement("div");
    bait.className =
      "adsbox ad-placement pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links";
    bait.style.cssText =
      "position: absolute !important; top: -9999px !important; left: -9999px !important; width: 1px !important; height: 1px !important;";
    bait.setAttribute("aria-hidden", "true");
    document.body.appendChild(bait);

    // Give browser extensions a moment to apply blocking rules
    const timer = setTimeout(() => {
      const isHidden =
        window.getComputedStyle(bait).display === "none" ||
        window.getComputedStyle(bait).visibility === "hidden" ||
        bait.offsetParent === null ||
        bait.offsetHeight === 0 ||
        bait.clientHeight === 0;

      if (isHidden) {
        isDetected = true;
        setIsAdBlockActive(true);
      }

      // 2. Network Bait Test: Try fetching a script endpoint that is in EasyList
      if (!isDetected) {
        fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
          method: "HEAD",
          mode: "no-cors",
        }).catch(() => {
          setIsAdBlockActive(true);
        });
      }

      if (bait.parentNode) {
        bait.parentNode.removeChild(bait);
      }
    }, 450);

    return () => {
      clearTimeout(timer);
      if (bait.parentNode) {
        bait.parentNode.removeChild(bait);
      }
    };
  }, []);

  if (!isAdBlockActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[#0f172a] border border-red-500/30 shadow-2xl flex flex-col items-center text-center text-white">
        {/* Shield Icon */}
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-5 animate-pulse">
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-2 font-display">
          AdBlocker Detected!
        </h2>

        {/* Description */}
        <p className="text-sm text-white/60 mb-6 leading-relaxed">
          We detected an AdBlocker or Brave Shields active in your browser. Our
          service is 100% free because it is supported by advertisements.
        </p>

        {/* Instructions Card */}
        <div className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left mb-6 text-xs text-white/70 space-y-2">
          <p className="font-semibold text-white/90">How to continue:</p>
          <div className="flex items-start gap-2">
            <span className="text-red-400 font-bold">1.</span>
            <span>
              Click your AdBlock / Brave Shield icon in your browser toolbar.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-400 font-bold">2.</span>
            <span>
              Turn it <strong>OFF</strong> or choose{" "}
              <strong>Pause on this site</strong>.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-400 font-bold">3.</span>
            <span>
              Click the button below to refresh and unlock your destination
              link.
            </span>
          </div>
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn-primary w-full bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 border-none shadow-lg shadow-red-500/20"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          I have disabled AdBlocker (Refresh)
        </button>
      </div>
    </div>
  );
}
