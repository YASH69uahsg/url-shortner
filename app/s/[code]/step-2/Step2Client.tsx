"use client";

import { useState } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import AdsterraBanner from "@/components/AdsterraBanner";
import MonetagBanner from "@/components/MonetagBanner";
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
  const [error, setError] = useState("");

  const smartlinkUrl =
    process.env.NEXT_PUBLIC_MONETAG_DIRECT_LINK ||
    "https://omg10.com/4/11732678";

  const handleCountdownComplete = () => {
    setIsReady(true);
  };

  const handleGetLink = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRedirecting) return;
    setError("");
    setIsRedirecting(true);

    // 1. Open Monetag Direct Link in a new tab (monetization)
    try {
      window.open(smartlinkUrl, "_blank", "noopener,noreferrer");
    } catch {
      // ignore popup blocking
    }

    // 2. Fetch destination and redirect current page immediately
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center">
      {/* Anti-AdBlock Detection Modal */}
      <AdBlockDetector />

      {/* Social Bar Ad */}
      <SocialBarAd />

      {/* Sticky Top Scroll Down Notification Bar */}
      <div className="sticky top-0 z-30 w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white py-2.5 px-4 text-center shadow-md flex items-center justify-center gap-2">
        <span className="animate-bounce text-sm">⬇️</span>
        <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase">
          Scroll down to get your final destination link
        </span>
        <span className="animate-bounce text-sm">⬇️</span>
      </div>

      <div className="w-full max-w-2xl px-4 py-6 flex flex-col items-center gap-6">
        {/* Header / Brand */}
        <header className="w-full flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 font-display leading-tight">LinkVault</h1>
              <p className="text-[11px] text-slate-500">Step 2: Final Destination</p>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span>✓ Step 1</span>
            </div>
            <div className="flex items-center gap-1 text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              <span>Step 2</span>
            </div>
          </div>
        </header>

        {/* Top Banner Ad (Adsterra) */}
        <div className="w-full flex justify-center">
          <AdsterraBanner slot="top" />
        </div>

        {/* Informative Content Card 1: Step 1 Complete */}
        <div className="w-full p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                Verification Complete — Almost There!
              </h2>
              <p className="text-xs text-slate-500">
                You have successfully completed the security validation. Your final destination is ready to open.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Session Authenticated</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Direct Link Unlocked</span>
            </div>
          </div>
        </div>

        {/* Mid-Page In-Content Ad Banner (Monetag) */}
        <div className="w-full">
          <MonetagBanner theme="light" />
        </div>

        {/* Informative Content Card 2: Safe Transfer Notice */}
        <div className="w-full p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                Instant Transfer Guarantee
              </h2>
              <p className="text-xs text-slate-500">
                Once the countdown finishes, click below to be redirected directly to your destination.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Proxy Status: Ready</span>
            </div>
            <div className="font-mono text-[11px] text-slate-500">
              Target Code: {code.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Scroll helper indicator */}
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 animate-pulse">
          <span>↓ Scroll down to retrieve your final link ↓</span>
        </div>

        {/* ========================================================== */}
        {/* BOTTOM ACTION ZONE: 5-Second Timer + Final Link Button    */}
        {/* ========================================================== */}
        <div className="w-full p-6 sm:p-8 rounded-2xl bg-white border-2 border-emerald-500/20 shadow-lg shadow-emerald-100 flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-sm">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-1">
            {title ? `Ready: ${title}` : "Your Link is Unlocked!"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-sm">
            Click the button below to proceed to your final destination URL.
          </p>

          {/* 5-Second Countdown Timer in Light Mode */}
          <div className="mb-6">
            <CountdownTimer
              seconds={5}
              theme="light"
              onComplete={handleCountdownComplete}
              size={130}
              strokeWidth={6}
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="w-full max-w-md p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Status badge */}
          <div className="mb-5">
            {isRedirecting ? (
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                Retrieving &amp; opening destination...
              </span>
            ) : !isReady ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                Preparing final link...
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                ⚡ Ready! Click below to retrieve your link
              </span>
            )}
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleGetLink}
            disabled={!isReady || isRedirecting}
            className={`w-full sm:max-w-md py-3.5 px-6 rounded-xl text-sm font-semibold text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
              isReady && !isRedirecting
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/25 hover:shadow-emerald-500/40 scale-100 cursor-pointer"
                : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-60 scale-98"
            }`}
          >
            {isRedirecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Redirecting...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Get Final Link</span>
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <footer className="w-full text-center text-xs text-slate-400 py-6 border-t border-slate-200">
          <p>© {new Date().getFullYear()} LinkVault • Step 2 of 2 • Destination Gateway</p>
        </footer>
      </div>
    </div>
  );
}
