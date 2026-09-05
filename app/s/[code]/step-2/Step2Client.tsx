"use client";

import { useState } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import BannerAd from "@/components/BannerAd";
import AdsterraBanner from "@/components/AdsterraBanner";
import SocialBarAd from "@/components/SocialBarAd";
import AdBlockDetector from "@/components/AdBlockDetector";

interface Step2ClientProps {
  code: string;
  title: string | null;
  token: string;
}

export default function Step2Client({ code, title, token }: Step2ClientProps) {
  const [isReady, setIsReady] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [hasClickedAd, setHasClickedAd] = useState(false);
  const [error, setError] = useState("");

  const smartlinkUrl = process.env.NEXT_PUBLIC_SMARTLINK_URL || "https://www.profitableratecpmnetwork.com/vbb2rmsm18?key=614b0942276e61481a389fa8f6b830b6";

  const handleCountdownComplete = () => {
    setIsReady(true);
  };

  const handleGetLink = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRedirecting) return;
    setError("");

    // First click: open Smartlink in a new tab, then prompt user to click again
    if (!hasClickedAd) {
      window.open(smartlinkUrl, "_blank", "noopener,noreferrer");
      setHasClickedAd(true);
      return;
    }

    // Second click: fetch the actual destination and redirect
    setIsRedirecting(true);

    try {
      const res = await fetch("/api/get-destination", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, token }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to retrieve link");
      }

      const data = await res.json();
      const destinationUrl = data.url || data.destinationUrl;

      if (destinationUrl) {
        // Use replace() so the user can't "back" into the interstitial
        window.location.replace(destinationUrl);
      } else {
        throw new Error("No destination URL received");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsRedirecting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Anti-AdBlock Detection Modal */}
      <AdBlockDetector />

      {/* Social Bar Ad — high CTR notification/chat bar */}
      <SocialBarAd />

      {/* Top Banner Ad */}
      <AdsterraBanner slot="top" />

      {/* Main Card */}
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="glass-card p-8 flex flex-col items-center text-center">
          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs text-green-400 font-medium">Step 1</span>
            </div>
            <div className="w-8 h-px bg-white/10" />
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
                <span className="text-[10px] font-bold text-brand-400">2</span>
              </div>
              <span className="text-xs text-brand-400 font-medium">Step 2</span>
            </div>
          </div>

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-xl font-display font-bold text-white mb-1">
            Almost There!
          </h1>
          <p className="text-sm text-white/40 mb-8">
            {title
              ? `Preparing: ${title}`
              : "Your destination link is being verified"}
          </p>

          {/* Countdown Timer */}
          <div className="mb-8">
            <CountdownTimer
              seconds={5}
              onComplete={handleCountdownComplete}
              size={140}
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="w-full flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* Status text */}
          <p className="text-xs text-white/30 mb-6">
            {isRedirecting
              ? "Redirecting to your destination..."
              : hasClickedAd
              ? "Click the button again to get your final link"
              : isReady
              ? "Click below to get your link"
              : "Please wait for the timer to complete..."}
          </p>

          {/* Get Link Button */}
          <button
            type="button"
            onClick={handleGetLink}
            disabled={!isReady || isRedirecting}
            className={`btn-primary w-full group transition-all duration-500 ${
              isReady && !isRedirecting
                ? "animate-fade-in scale-100 animate-glow"
                : "opacity-40 scale-95"
            }`}
          >
            {isRedirecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Redirecting...
              </>
            ) : hasClickedAd ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Proceed to Final Link
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Get Final Link
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-white/15 mt-6">
          Protected by LinkVault • Step 2 of 2
        </p>
      </div>

      {/* Bottom Banner Ad */}
      <AdsterraBanner slot="bottom" />
    </div>
  );
}
