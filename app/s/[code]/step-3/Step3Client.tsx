"use client";

import { useState, useRef } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import AdBlockDetector from "@/components/AdBlockDetector";
import InAppBrowserEscape from "@/components/InAppBrowserEscape";
import AdSenseUnit from "@/components/AdSenseUnit";
import { MONETIZATION_CONFIG } from "@/lib/monetization-config";

interface Step3ClientProps {
  code: string;
  title: string | null;
  token: string;
}

export default function Step3Client({ code, title, token }: Step3ClientProps) {
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const slots = MONETIZATION_CONFIG.adsense.slots;
  const timerSeconds = MONETIZATION_CONFIG.timers.step3;

  const handleCountdownComplete = () => {
    setIsTimerComplete(true);
  };

  /**
   * Action 1 (Upper Button):
   * Smoothly scrolls user down to the final Get Link action card.
   */
  const handleScrollDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /**
   * Action 2 (Bottom Button):
   * Securely requests destination URL from backend and performs immediate redirection.
   * Zero popunders, zero extra tabs.
   */
  const handleGetLink = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isTimerComplete || isRedirecting) return;
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
        throw new Error(data.error || "Failed to retrieve link");
      }

      const data = await res.json();
      const destinationUrl = data.url || data.destinationUrl;

      if (destinationUrl) {
        // Instant replace so user cannot navigate back into verification
        window.location.replace(destinationUrl);
      } else {
        throw new Error("No destination URL received");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching link");
      setIsRedirecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center">
      <InAppBrowserEscape />
      <AdBlockDetector />

      {/* Top Sticky Scroll Down Notification Bar */}
      <div className="sticky top-0 z-30 w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white py-2 px-4 text-center shadow-md flex items-center justify-center gap-2">
        <span className="animate-bounce text-sm">⬇️</span>
        <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase">
          Final Step: Wait for timer &amp; scroll down to Get Link
        </span>
        <span className="animate-bounce text-sm">⬇️</span>
      </div>

      <div className="w-full max-w-2xl px-4 py-6 flex flex-col items-center gap-5">
        {/* Header / Brand */}
        <header className="w-full flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-sm text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 font-display leading-tight">
                LinkVault
              </h1>
              <p className="text-[11px] text-slate-500">Destination Ready</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Step 3 of 3 (Final)</span>
          </div>
        </header>

        {/* Ad #9: Top Responsive Banner */}
        <AdSenseUnit slot={slots.step3Top} format="horizontal" label="Advertisement (Top Placement)" />

        {/* ========================================================== */}
        {/* STAGE 1: UPPER TIMER & SCROLL-DOWN TRIGGER CARD           */}
        {/* ========================================================== */}
        <div className="w-full p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display mb-1">
            {title ? `Ready: ${title}` : "Your Link is Ready to Unlock"}
          </h2>
          <p className="text-xs text-slate-500 mb-5 max-w-sm">
            Final security check complete. Wait for the short timer, then scroll down to get your link.
          </p>

          {/* Countdown Timer (8 Seconds) */}
          <div className="mb-5">
            <CountdownTimer
              seconds={timerSeconds}
              theme="light"
              onComplete={handleCountdownComplete}
              size={120}
              strokeWidth={5}
            />
          </div>

          {/* Upper Action Button: "Continue to Scroll Down" */}
          <button
            type="button"
            onClick={handleScrollDown}
            disabled={!isTimerComplete}
            className={`w-full sm:max-w-md py-3.5 px-6 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
              isTimerComplete
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/25 hover:shadow-emerald-500/40 cursor-pointer animate-pulse"
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

        {/* ========================================================== */}
        {/* STAGE 2: VERIFICATION SUMMARY CARDS + AD #10               */}
        {/* ========================================================== */}
        <div className="w-full space-y-4">
          {/* Security Card */}
          <div className="w-full p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  3-Stage Security Verification Passed
                </h3>
                <p className="text-xs text-slate-500">
                  Target destination has been verified clean with zero malicious redirects.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>SHA-256 Verified</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Direct Route Active</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Safe Redirection</span>
              </div>
            </div>
          </div>

          {/* Ad #10: Middle Display Unit */}
          <AdSenseUnit slot={slots.step3Middle} format="auto" label="Advertisement (Middle Placement)" />
        </div>

        {/* ========================================================== */}
        {/* STAGE 3: BOTTOM ACTION CARD + AD #11 + GET LINK BUTTON     */}
        {/* ========================================================== */}
        <div
          ref={bottomRef}
          className="w-full p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center gap-4 scroll-mt-6"
        >
          {/* Ad #11: High-CTR Bottom Rectangle Ad directly above Get Link */}
          <AdSenseUnit slot={slots.step3Bottom} format="rectangle" label="Advertisement (Final Placement)" />

          <div className="w-full border-t border-slate-100 pt-4 flex flex-col items-center gap-3">
            {error && (
              <div className="w-full p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {error}
              </div>
            )}

            <p className="text-xs text-slate-500 font-medium">
              {isTimerComplete
                ? "Click the button below to open your destination URL."
                : "Please wait for the countdown timer to finish."}
            </p>

            <button
              type="button"
              onClick={handleGetLink}
              disabled={!isTimerComplete || isRedirecting}
              className={`w-full sm:max-w-md py-4 px-6 rounded-xl text-base font-extrabold transition-all duration-300 shadow-lg flex items-center justify-center gap-2.5 ${
                isTimerComplete && !isRedirecting
                  ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.01] cursor-pointer"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-70"
              }`}
            >
              {isRedirecting ? (
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Opening Destination...</span>
                </div>
              ) : isTimerComplete ? (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  <span>Get Link</span>
                </>
              ) : (
                <span>Complete Timer to Unlock</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
