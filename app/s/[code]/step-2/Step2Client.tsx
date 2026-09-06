"use client";

import { useState, useRef } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import AdsterraBanner from "@/components/AdsterraBanner";
import SocialBarAd from "@/components/SocialBarAd";
import AdBlockDetector from "@/components/AdBlockDetector";

interface Step2ClientProps {
  code: string;
  title: string | null;
  token: string;
}

export default function Step2Client({ code, title, token }: Step2ClientProps) {
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [error, setError] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  const adsterraSmartlink =
    process.env.NEXT_PUBLIC_SMARTLINK_URL ||
    "https://www.profitableratecpmnetwork.com/vbb2rmsm18?key=614b0942276e61481a389fa8f6b830b6";

  // Monetag Zone 2 for Step 2
  const monetagDirectLink =
    process.env.NEXT_PUBLIC_MONETAG_DIRECT_LINK_2 ||
    process.env.NEXT_PUBLIC_MONETAG_DIRECT_LINK ||
    "https://omg10.com/4/11738605";

  const handleCountdownComplete = () => {
    setIsTimerComplete(true);
  };

  /**
   * Action 1 (Upper Button):
   * Opens Adsterra Smartlink in a new tab (Paid Click 3)
   * and smoothly auto-scrolls user down to the bottom section.
   */
  const handleScrollDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // 1. Open Adsterra Smartlink in background tab (Popunder behavior)
    try {
      const adTab = window.open(adsterraSmartlink, "_blank");
      if (adTab) {
        try {
          adTab.blur();
        } catch {
          /* ignore cross-origin blur */
        }
      }
      window.focus();
    } catch {
      // ignore popup blocking on scroll trigger
    }

    setHasScrolled(true);

    // 2. Smoothly scroll to bottom
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  /**
   * Action 2 (Bottom Button):
   * Opens Monetag Zone 2 Direct Link in background tab (Paid Click 4)
   * with popup-blocker detection & fallback to prevent lost conversions,
   * then redirects user immediately to destination URL.
   */
  const handleUnlockFinalLink = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRedirecting) return;
    setError("");

    let isBlocked = false;
    try {
      const popup = window.open(monetagDirectLink, "_blank");
      if (popup) {
        try {
          popup.blur();
        } catch {
          /* ignore cross-origin blur */
        }
      }
      window.focus();
      if (!popup || popup.closed || typeof popup.closed === "undefined") {
        isBlocked = true;
      }
    } catch {
      isBlocked = true;
    }

    if (isBlocked) {
      // Browser blocked programmatic popup — show fallback so conversion is not lost
      setPopupBlocked(true);
      return;
    }

    setIsRedirecting(true);

    // Fetch destination and redirect current page immediately
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

      {/* Top Sticky Scroll Down Notification Bar */}
      <div className="sticky top-0 z-30 w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white py-2 px-4 text-center shadow-md flex items-center justify-center gap-2">
        <span className="animate-bounce text-sm">⬇️</span>
        <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase">
          Wait for timer &amp; scroll down to unlock final link
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
              <p className="text-[11px] text-slate-500">Step 2: Final Destination Gateway</p>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span>✓ Step 1</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Step 2 of 2</span>
            </div>
          </div>
        </header>

        {/* Top Responsive 728x90 Banner Ad (Adsterra) */}
        <div className="w-full flex justify-center">
          <AdsterraBanner slot="top" />
        </div>

        {/* ========================================================== */}
        {/* STAGE 1: UPPER TIMER & SCROLL-DOWN TRIGGER CARD           */}
        {/* ========================================================== */}
        <div className="w-full p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display mb-1">
            {title ? `Finalizing: ${title}` : "Finalizing Your Destination Link"}
          </h2>
          <p className="text-xs text-slate-500 mb-5 max-w-sm">
            Please wait for the timer to finish, then click the button below to scroll down.
          </p>

          {/* 8-Second Countdown Timer */}
          <div className="mb-5">
            <CountdownTimer
              seconds={8}
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
            className={`relative z-20 w-full sm:max-w-md py-3.5 px-6 rounded-xl text-sm font-semibold text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
              isTimerComplete
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/25 hover:shadow-emerald-500/40 scale-100 cursor-pointer animate-pulse"
                : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-70 scale-98"
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
        {/* STAGE 2: EXTENDED MIDDLE CONTENT CARDS + ADS              */}
        {/* ========================================================== */}

        {/* Content Card 1: Verification Complete */}
        <div className="w-full p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                Verification Complete — Final Link Unlocked
              </h3>
              <p className="text-xs text-slate-500">
                All cloud security checks passed. The destination URL is verified and ready for instant transfer.
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

        {/* Real Impression Middle Ad Unit (Adsterra Responsive Banner) */}
        <div className="w-full flex justify-center">
          <AdsterraBanner slot="middle" />
        </div>

        {/* Content Card 2: Edge CDN Fast Route */}
        <div className="w-full p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                High-Speed Cloud Routing
              </h3>
              <p className="text-xs text-slate-500">
                Routed through ultra low-latency CDN nodes for immediate destination redirection.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Gateway Status: Online</span>
            </div>
            <div className="font-mono text-[11px] text-slate-500">
              Route: {code.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Content Card 3: Transfer Instructions */}
        <div className="w-full p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs sm:text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>Instructions to Access Destination:</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            1. Click &quot;Continue to Scroll Down&quot; above to reach the final unlock area. <br />
            2. Click the &quot;Unlock Final Link&quot; button below to open your destination immediately.
          </p>
        </div>

        {/* ========================================================== */}
        {/* STAGE 3: BOTTOM ACTION ZONE (UNLOCK FINAL LINK)            */}
        {/* ========================================================== */}
        <div
          ref={bottomRef}
          className="w-full p-6 sm:p-8 rounded-2xl bg-white border-2 border-emerald-500/30 shadow-xl shadow-emerald-100/50 flex flex-col items-center text-center mt-2"
        >
          {/* Lock Icon */}
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-sm">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-1">
            {title ? `Ready: ${title}` : "Your Link is Unlocked!"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-5 max-w-sm">
            Click the unlock button below to proceed directly to your destination.
          </p>

          {/* Popup-Blocker Fallback Box (Guarantees zero lost conversions on mobile) */}
          {popupBlocked && (
            <div className="w-full max-w-md p-4 mb-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex flex-col items-center gap-2.5 shadow-sm">
              <div className="flex items-center gap-1.5 font-bold text-amber-800 text-sm">
                <span>⚠️ Browser Blocked Pop-up</span>
              </div>
              <p className="text-center text-amber-700">
                Please tap the button below to unlock your destination link.
              </p>
              <a
                href={monetagDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={async () => {
                  setIsRedirecting(true);
                  try {
                    const res = await fetch("/api/get-destination", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ code, token }),
                    });
                    const data = await res.json();
                    const destinationUrl = data.url || data.destinationUrl;
                    if (destinationUrl) {
                      window.location.replace(destinationUrl);
                    }
                  } catch {
                    setIsRedirecting(false);
                  }
                }}
                className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-center shadow-md flex items-center justify-center gap-2"
              >
                <span>Tap to Open &amp; Unlock Destination</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          )}

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
                Unlocking destination...
              </span>
            ) : !isTimerComplete ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                Wait for upper timer to unlock...
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                ⚡ Ready! Click below to unlock your destination
              </span>
            )}
          </div>

          {/* Bottom Action Button: "Unlock Final Link" */}
          <button
            type="button"
            onClick={handleUnlockFinalLink}
            disabled={!isTimerComplete || isRedirecting}
            className={`relative z-20 w-full sm:max-w-md py-3.5 px-6 rounded-xl text-sm font-semibold text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
              isTimerComplete && !isRedirecting
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/25 hover:shadow-emerald-500/40 scale-100 cursor-pointer"
                : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-60 scale-98"
            }`}
          >
            {isRedirecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Opening destination...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <span>Unlock Final Link</span>
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
