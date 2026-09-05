"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import CountdownTimer from "@/components/CountdownTimer";
import BannerAd from "@/components/BannerAd";
import AdsterraBanner from "@/components/AdsterraBanner";
import PopunderAd from "@/components/PopunderAd";
import SocialBarAd from "@/components/SocialBarAd";

interface Step1ClientProps {
  code: string;
  title: string | null;
  token: string;
}

export default function Step1Client({ code, title, token }: Step1ClientProps) {
  const [isReady, setIsReady] = useState(false);
  const [hasClickedAd, setHasClickedAd] = useState(false);
  const [adKey, setAdKey] = useState(0);
  const router = useRouter();

  const smartlinkUrl =
    process.env.NEXT_PUBLIC_SMARTLINK_URL ||
    "https://www.profitableratecpmnetwork.com/vbb2rmsm18?key=614b0942276e61481a389fa8f6b830b6";

  const handleCountdownComplete = () => {
    setIsReady(true);
  };

  /**
   * Mid-countdown ad refresh: when timeLeft hits 7 seconds (roughly
   * halfway through the 15-second timer), bump adKey so React remounts
   * both BannerAd components with a fresh key → new ad impression.
   * PopunderAd is deliberately excluded from this mechanism.
   */
  const handleTick = useCallback((timeLeft: number) => {
    if (timeLeft === 7) {
      setAdKey((prev) => prev + 1);
    }
  }, []);

  const handleProceed = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // First click: Open Smartlink in new tab and require user to come back
    if (!hasClickedAd) {
      window.open(smartlinkUrl, "_blank", "noopener,noreferrer");
      setHasClickedAd(true);
      return;
    }

    // Second click: Navigate to Step 2
    router.push(`/s/${code}/step-2?token=${encodeURIComponent(token)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Popunder Ad — fires once on initial page load only, not re-triggered mid-timer */}
      <PopunderAd />

      {/* Social Bar Ad — high CTR notification/chat bar */}
      <SocialBarAd />

      {/* Top Banner Ad — remounts at adKey change for a fresh impression */}
      <AdsterraBanner key={`top-${adKey}`} />

      {/* Main Card */}
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="glass-card p-8 flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-700/20 border border-brand-500/20 flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-xl font-display font-bold text-white mb-1">
            {title || "Your Link is Ready"}
          </h1>
          <p className="text-sm text-white/40 mb-8">
            Please wait while we prepare your destination
          </p>

          {/* Countdown Timer */}
          <div className="mb-8">
            <CountdownTimer
              seconds={15}
              onComplete={handleCountdownComplete}
              onTick={handleTick}
            />
          </div>

          {/* Status text */}
          <p className="text-xs mb-6 transition-all duration-300">
            {!isReady ? (
              <span className="text-white/30">Please wait for the timer to complete...</span>
            ) : !hasClickedAd ? (
              <span className="text-amber-400/90 font-medium">⚡ Click the button below &amp; come back to unlock Step 2</span>
            ) : (
              <span className="text-emerald-400 font-medium">✅ Ad Verified! Click again to proceed</span>
            )}
          </p>

          {/* Proceed Button */}
          <button
            type="button"
            onClick={handleProceed}
            disabled={!isReady}
            className={`btn-primary w-full group transition-all duration-500 ${
              isReady
                ? "animate-fade-in scale-100 animate-glow"
                : "opacity-40 scale-95"
            }`}
          >
            {!hasClickedAd ? (
              <>
                <svg className="w-4 h-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Click &amp; Back to Unlock Step 2</span>
              </>
            ) : (
              <>
                <span>Proceed to Step 2</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-white/15 mt-6">
          Protected by LinkVault • Step 1 of 2
        </p>
      </div>

      {/* Bottom Banner Ad — remounts at adKey change for a fresh impression */}
      <BannerAd key={`bottom-${adKey}`} slot="bottom" />
    </div>
  );
}

