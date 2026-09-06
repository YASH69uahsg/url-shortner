"use client";

import { useState, useEffect, useRef } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import AdXBanner from "@/components/AdXBanner";

interface SafeLinkUnlockProps {
  code: string;
  token: string;
  mode?: "google" | "direct_blog";
  initialTimer?: number;
}

export default function SafeLinkUnlock({
  code,
  token,
  mode = "google",
  initialTimer = 10,
}: SafeLinkUnlockProps) {
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState("");
  const [hasGoogleReferrer, setHasGoogleReferrer] = useState<boolean | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Check client-side referrer
  useEffect(() => {
    if (typeof window !== "undefined") {
      const ref = document.referrer.toLowerCase();
      const isGoogle = ref.includes("google.com") || ref.includes("google.co.in") || ref.includes("google.");
      
      // In local development or if mode is direct_blog, consider it valid
      const isDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      if (mode === "direct_blog" || isDev) {
        setHasGoogleReferrer(true);
      } else {
        setHasGoogleReferrer(isGoogle);
      }
    }
  }, [mode]);

  const handleCountdownComplete = () => {
    setIsTimerComplete(true);
  };

  const handleScrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleUnlockDestination = async () => {
    if (isRedirecting) return;
    setError("");
    setIsRedirecting(true);

    try {
      const res = await fetch("/api/get-destination", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, token }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to retrieve destination link");
      }

      const data = await res.json();
      const destination = data.url || data.destinationUrl;

      if (destination) {
        // Instant replace so user cannot navigate back into verification
        window.location.replace(destination);
      } else {
        throw new Error("Invalid destination URL received");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error unlocking link");
      setIsRedirecting(false);
    }
  };

  return (
    <div className="w-full my-6 flex flex-col items-center">
      {/* Non-Google Referrer Warning Modal (Anti-bypass) */}
      {hasGoogleReferrer === false && (
        <div className="w-full p-5 mb-6 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 shadow-md flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="font-bold text-sm sm:text-base text-amber-950">
            Security Verification Required
          </h3>
          <p className="text-xs text-amber-800 mt-1 max-w-md">
            To unlock your cloud destination, this page must be accessed via Google Search.
          </p>
          <a
            href={`https://www.google.com/search?q=site:${
              typeof window !== "undefined" ? window.location.hostname : "google.com"
            }`}
            className="mt-3 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-semibold shadow-md hover:from-amber-700 hover:to-orange-700 transition-all"
          >
            Open in Google Search →
          </a>
        </div>
      )}

      {/* Top Banner Ad Unit */}
      <AdXBanner slot="top" />

      {/* Timer & Scroll Trigger Card */}
      <div className="w-full p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center my-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold mb-3">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          <span>Active Session: {code.toUpperCase()}</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display mb-1">
          Preparing Destination Link
        </h3>
        <p className="text-xs text-slate-500 mb-5 max-w-sm">
          Please wait for the security countdown to finish, then click continue.
        </p>

        {/* Countdown */}
        <div className="mb-4">
          <CountdownTimer
            seconds={initialTimer}
            theme="light"
            onComplete={handleCountdownComplete}
            size={110}
            strokeWidth={5}
          />
        </div>

        {/* Scroll Down Trigger */}
        <button
          type="button"
          onClick={handleScrollToBottom}
          disabled={!isTimerComplete}
          className={`w-full sm:max-w-md py-3.5 px-6 rounded-xl text-sm font-semibold text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
            isTimerComplete
              ? "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-indigo-500/25 cursor-pointer animate-pulse"
              : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-70"
          }`}
        >
          {isTimerComplete ? (
            <>
              <span>Continue to Scroll Down</span>
              <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </>
          ) : (
            <span>Please wait for timer...</span>
          )}
        </button>
      </div>

      {/* Middle Banner Ad Unit */}
      <AdXBanner slot="middle" />

      {/* Bottom Action Unlock Card */}
      <div
        ref={bottomRef}
        className="w-full p-6 sm:p-8 rounded-3xl bg-white border-2 border-emerald-500/30 shadow-xl shadow-emerald-100/50 flex flex-col items-center text-center my-4"
      >
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-3 shadow-sm">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
        </div>

        <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-1">
          Link Security Verification Complete
        </h4>
        <p className="text-xs sm:text-sm text-slate-500 mb-5 max-w-sm">
          Your destination link is verified and ready for instant transfer.
        </p>

        {error && (
          <div className="w-full max-w-md p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Final Unlock Button */}
        <button
          type="button"
          onClick={handleUnlockDestination}
          disabled={!isTimerComplete || isRedirecting}
          className={`w-full sm:max-w-md py-4 px-6 rounded-xl text-sm font-bold text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
            isTimerComplete && !isRedirecting
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/30 cursor-pointer scale-100"
              : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-60"
          }`}
        >
          {isRedirecting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Unlocking Destination...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span>Unlock Final Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
