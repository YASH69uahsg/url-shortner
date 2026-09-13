"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CountdownTimer from "@/components/CountdownTimer";
import AdBlockDetector from "@/components/AdBlockDetector";
import InAppBrowserEscape from "@/components/InAppBrowserEscape";
import AdSenseUnit from "@/components/AdSenseUnit";
import { MONETIZATION_CONFIG } from "@/lib/monetization-config";
import type { Article } from "@/lib/articles-data";

interface Step2ClientProps {
  code: string;
  title: string | null;
  token: string;
  article: Article;
}

export default function Step2Client({ code, title, token, article }: Step2ClientProps) {
  const router = useRouter();
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const slots = MONETIZATION_CONFIG.adsense.slots;
  const timerSeconds = MONETIZATION_CONFIG.timers.step2;

  const handleCountdownComplete = () => {
    setIsTimerComplete(true);
  };

  /**
   * Action 1 (Upper Button):
   * Smoothly scrolls user down to the bottom section across all in-article ads.
   */
  const handleScrollDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /**
   * Action 2 (Bottom Button):
   * Navigates cleanly to Step 3 (final Get Link stage).
   * Zero popunders, zero new tabs.
   */
  const handleContinueToStep3 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isTimerComplete || isNavigating) return;
    setIsNavigating(true);

    const targetUrl = `/s/${code}/step-3?token=${encodeURIComponent(token)}`;
    router.push(targetUrl);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center">
      <InAppBrowserEscape />
      <AdBlockDetector />

      {/* Top Sticky Scroll Down Notification Bar */}
      <div className="sticky top-0 z-30 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white py-2 px-4 text-center shadow-md flex items-center justify-center gap-2">
        <span className="animate-bounce text-sm">⬇️</span>
        <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase">
          Step 2 of 3: Wait for timer &amp; scroll down to continue
        </span>
        <span className="animate-bounce text-sm">⬇️</span>
      </div>

      <div className="w-full max-w-2xl px-4 py-6 flex flex-col items-center gap-5">
        {/* Header / Brand */}
        <header className="w-full flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm text-white">
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
              <p className="text-[11px] text-slate-500">Integrity Verification</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Step 2 of 3</span>
          </div>
        </header>

        {/* Ad #5: Top Responsive Banner */}
        <AdSenseUnit slot={slots.step2Top} format="horizontal" label="Advertisement (Top Slot)" />

        {/* ========================================================== */}
        {/* STAGE 1: UPPER TIMER & SCROLL-DOWN TRIGGER CARD           */}
        {/* ========================================================== */}
        <div className="w-full p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display mb-1">
            {title ? `Verifying: ${title}` : "Verifying Link Destination"}
          </h2>
          <p className="text-xs text-slate-500 mb-5 max-w-sm">
            Please wait for the security countdown, then click the button below to scroll down.
          </p>

          {/* Countdown Timer */}
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
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/25 hover:shadow-blue-500/40 cursor-pointer animate-pulse"
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
        {/* STAGE 2: HIGH-CPC ARTICLE #2 CONTENT & IN-ARTICLE ADS      */}
        {/* ========================================================== */}
        <div className="w-full bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100">
              {article.category}
            </span>
            <span>•</span>
            <span>{article.readTime}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display leading-snug">
            {article.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-l-4 border-blue-500 pl-3.5 py-1 bg-blue-50/30 rounded-r-xl">
            {article.excerpt}
          </p>

          {/* Section 1 */}
          {article.sections[0] && (
            <div className="space-y-2.5 pt-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                {article.sections[0].heading}
              </h3>
              {article.sections[0].paragraphs.map((p, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          )}

          {/* Ad #6: In-Article Ad 1 */}
          <AdSenseUnit slot={slots.step2Article1} format="auto" label="Advertisement (In-Article 1)" />

          {/* Section 2 */}
          {article.sections[1] && (
            <div className="space-y-2.5 pt-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                {article.sections[1].heading}
              </h3>
              {article.sections[1].paragraphs.map((p, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {p}
                </p>
              ))}
              {article.sections[1].bulletPoints && (
                <ul className="space-y-2 pt-1 pl-1">
                  {article.sections[1].bulletPoints.map((bp, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                    >
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Ad #7: In-Article Ad 2 */}
          <AdSenseUnit slot={slots.step2Article2} format="auto" label="Advertisement (In-Article 2)" />

          {/* Additional Sections / FAQs */}
          {article.faqs && article.faqs.length > 0 && (
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Frequently Asked Questions
              </h3>
              {article.faqs.slice(0, 2).map((faq, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                  <p className="font-semibold text-slate-900 mb-1">Q: {faq.question}</p>
                  <p className="text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ========================================================== */}
        {/* STAGE 3: BOTTOM ACTION CARD + AD #8 (CONTINUE TO STEP 3)   */}
        {/* ========================================================== */}
        <div
          ref={bottomRef}
          className="w-full p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center gap-4 scroll-mt-6"
        >
          {/* Ad #8: High-CTR Bottom Rectangle Ad */}
          <AdSenseUnit slot={slots.step2Bottom} format="rectangle" label="Advertisement (Bottom Placement)" />

          <div className="w-full border-t border-slate-100 pt-4 flex flex-col items-center gap-2">
            <p className="text-xs text-slate-500 font-medium">
              {isTimerComplete
                ? "Step 2 verification complete. Ready for the final step."
                : "Please wait for the timer at the top to complete."}
            </p>

            <button
              type="button"
              onClick={handleContinueToStep3}
              disabled={!isTimerComplete || isNavigating}
              className={`w-full sm:max-w-md py-4 px-6 rounded-xl text-sm font-bold transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
                isTimerComplete && !isNavigating
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/25 hover:shadow-emerald-500/40 cursor-pointer"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-70"
              }`}
            >
              {isNavigating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Loading Final Step...</span>
                </div>
              ) : isTimerComplete ? (
                <>
                  <span>Continue to Step 3 (Final)</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
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
