"use client";

import { useState } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import AdsterraBanner from "@/components/AdsterraBanner";
import MonetagBanner from "@/components/MonetagBanner";
import PopunderAd from "@/components/PopunderAd";
import SocialBarAd from "@/components/SocialBarAd";
import AdBlockDetector from "@/components/AdBlockDetector";

interface Step1ClientProps {
  code: string;
  title: string | null;
  token: string;
}

export default function Step1Client({ code, title, token }: Step1ClientProps) {
  const [isReady, setIsReady] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const smartlinkUrl =
    process.env.NEXT_PUBLIC_SMARTLINK_URL ||
    "https://www.profitableratecpmnetwork.com/vbb2rmsm18?key=614b0942276e61481a389fa8f6b830b6";

  const handleCountdownComplete = () => {
    setIsReady(true);
  };

  const handleProceed = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRedirecting) return;
    setIsRedirecting(true);

    // 1. Open Smartlink ad in new tab (monetization)
    try {
      window.open(smartlinkUrl, "_blank", "noopener,noreferrer");
    } catch {
      // ignore popup blocking
    }

    // 2. Immediately navigate current tab to Step 2
    const targetUrl = `/s/${code}/step-2?token=${encodeURIComponent(token)}`;
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 150);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center">
      {/* Anti-AdBlock Detection Modal */}
      <AdBlockDetector />

      {/* Popunder Ad */}
      <PopunderAd />

      {/* Social Bar Ad */}
      <SocialBarAd />

      {/* Sticky Top Scroll Down Notification Bar */}
      <div className="sticky top-0 z-30 w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 text-white py-2.5 px-4 text-center shadow-md flex items-center justify-center gap-2">
        <span className="animate-bounce text-sm">⬇️</span>
        <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase">
          Scroll down to get your destination link
        </span>
        <span className="animate-bounce text-sm">⬇️</span>
      </div>

      <div className="w-full max-w-2xl px-4 py-6 flex flex-col items-center gap-6">
        {/* Header / Brand */}
        <header className="w-full flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 font-display leading-tight">LinkVault</h1>
              <p className="text-[11px] text-slate-500">Secure Redirection Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span>Step 1 of 2</span>
          </div>
        </header>

        {/* Top Banner Ad (Adsterra) */}
        <div className="w-full flex justify-center">
          <AdsterraBanner slot="top" />
        </div>

        {/* Informative Content Card 1: Security Verification */}
        <div className="w-full p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                Link Verification &amp; Security Shield
              </h2>
              <p className="text-xs text-slate-500">
                Destination URL is scanned and protected with end-to-end SSL encryption.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>No Malware Detected</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>256-Bit SSL Tunnel</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>High-Speed Edge Node</span>
            </div>
          </div>
        </div>

        {/* Mid-Page In-Content Ad Banner (Monetag) */}
        <div className="w-full">
          <MonetagBanner theme="light" />
        </div>

        {/* Informative Content Card 2: Routing Details */}
        <div className="w-full p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                Fast Cloud Route Selected
              </h2>
              <p className="text-xs text-slate-500">
                Direct peer routing ensures zero latency and fastest file retrieval.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Edge Proxy: Active</span>
            </div>
            <div className="font-mono text-[11px] text-slate-500">
              Session ID: {code.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Scroll helper indicator pointing to bottom action card */}
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 animate-pulse">
          <span>↓ Keep scrolling to complete verification ↓</span>
        </div>

        {/* ========================================================== */}
        {/* BOTTOM ACTION ZONE: 5-Second Timer + Proceed Button       */}
        {/* ========================================================== */}
        <div className="w-full p-6 sm:p-8 rounded-2xl bg-white border-2 border-indigo-500/20 shadow-lg shadow-indigo-100 flex flex-col items-center text-center">
          {/* Step Icon */}
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-4 shadow-sm">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-1">
            {title ? `Preparing: ${title}` : "Your Destination is Ready"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-sm">
            Please wait for the 5-second security check to finish, then click the button below to proceed.
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

          {/* Status badge */}
          <div className="mb-5">
            {isRedirecting ? (
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                Proceeding to Step 2...
              </span>
            ) : !isReady ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                Preparing link destination...
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                ⚡ Link verified! Click below to proceed to Step 2
              </span>
            )}
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleProceed}
            disabled={!isReady || isRedirecting}
            className={`w-full sm:max-w-md py-3.5 px-6 rounded-xl text-sm font-semibold text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
              isReady && !isRedirecting
                ? "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-indigo-500/25 hover:shadow-indigo-500/40 scale-100 cursor-pointer"
                : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-60 scale-98"
            }`}
          >
            {isRedirecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Opening Step 2...</span>
              </>
            ) : (
              <>
                <span>Continue to Step 2</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <footer className="w-full text-center text-xs text-slate-400 py-6 border-t border-slate-200">
          <p>© {new Date().getFullYear()} LinkVault • Step 1 of 2 • Secure Cloud Redirect</p>
        </footer>
      </div>
    </div>
  );
}
