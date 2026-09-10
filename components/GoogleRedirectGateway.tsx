"use client";

import { useState, useEffect } from "react";
import InAppBrowserEscape from "@/components/InAppBrowserEscape";

interface GoogleRedirectGatewayProps {
  code: string;
  title: string | null;
  searchDomain: string;
  mode: "google" | "direct_blog";
  articleSlug: string;
  articleTitle?: string;
  sessionStr?: string;
}

export default function GoogleRedirectGateway({
  code,
  title,
  searchDomain,
  mode,
  articleSlug,
  articleTitle,
  sessionStr,
}: GoogleRedirectGatewayProps) {
  const [countdown, setCountdown] = useState(3);
  const [redirected, setRedirected] = useState(false);

  // Convert slug to natural keyword search query
  const naturalKeyword = articleTitle
    ? `${articleTitle} yashlab`
    : `${articleSlug.replace(/-/g, " ")} yashlab`;

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    naturalKeyword
  )}`;

  const directBlogUrl = `https://${searchDomain}/articles/${articleSlug}.html`;

  const destinationTarget = mode === "google" ? googleSearchUrl : directBlogUrl;

  useEffect(() => {
    // Safely set SafeLink session cookie client-side (bypasses Next.js Server Component restriction)
    if (sessionStr && typeof document !== "undefined") {
      try {
        const secureFlag = window.location.protocol === "https:" ? "; Secure" : "";
        document.cookie = `rtg_session=${encodeURIComponent(sessionStr)}; path=/; max-age=600; SameSite=Lax${secureFlag}`;
        sessionStorage.setItem("rtg_session", sessionStr);
      } catch {
        /* ignore storage blocking in private mode */
      }
    }

    if (countdown <= 0) {
      setRedirected(true);
      window.location.href = destinationTarget;
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, destinationTarget, sessionStr]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white flex flex-col items-center justify-center p-4 relative">
      {/* In-App Browser Escape Overlay (Telegram/WhatsApp/Instagram) */}
      <InAppBrowserEscape />

      {/* Strip referrer on direct_blog mode for complete privacy */}
      {mode === "direct_blog" && <meta name="referrer" content="no-referrer" />}

      <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col items-center text-center backdrop-blur-xl relative overflow-hidden">
        {/* Glow ambient circles */}
        <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />

        {/* Security Shield Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/25">
          {mode === "google" ? (
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zM12 7V5a2 2 0 00-2-2H8a2 2 0 00-2 2v2" />
            </svg>
          )}
        </div>

        <h1 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">
          {title ? title : "Authenticating Cloud Link"}
        </h1>
        <p className="text-xs text-slate-400 mb-6 max-w-xs">
          Session ID: <span className="font-mono text-blue-400">{code.toUpperCase()}</span>
        </p>

        {/* Countdown Visual */}
        <div className="relative w-20 h-20 flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-pulse" />
          <div className="w-14 h-14 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center">
            <span className="text-2xl font-bold font-mono text-blue-300">
              {countdown > 0 ? countdown : 0}
            </span>
          </div>
        </div>

        {/* Instructions Graphic Box */}
        {mode === "google" ? (
          <div className="w-full p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-left mb-6 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <span>Step 1: Google Organic Verification</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11.5px]">
              Opening Google Search. Simply <strong>tap the 1st search result</strong> from YashLab to unlock your download link.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300 flex items-center justify-between">
              <span className="truncate pr-2">{naturalKeyword}</span>
              <span className="text-emerald-400 text-[10px] whitespace-nowrap">Auto-Opening ✓</span>
            </div>
          </div>
        ) : (
          <div className="w-full p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-left mb-6 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Direct Secure Routing Active</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Connecting via encrypted edge proxy. Opening destination gateway in a moment...
            </p>
          </div>
        )}

        {/* Action button */}
        <a
          href={destinationTarget}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
        >
          {redirected ? (
            <>
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              <span>Redirecting...</span>
            </>
          ) : (
            <>
              <span>{mode === "google" ? "Proceed to Google Search" : "Continue to Gateway"}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </a>

        <p className="text-[11px] text-slate-500 mt-4">
          256-Bit SSL Encrypted • Zero Data Loss Fail-Safe Active
        </p>
      </div>
    </div>
  );
}
