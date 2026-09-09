"use client";

import * as Sentry from "@sentry/nextjs";

export default function SentryExamplePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="w-16 h-16 bg-purple-600/20 text-purple-400 rounded-2xl flex items-center justify-center mx-auto text-3xl font-bold border border-purple-500/30">
          S
        </div>
        
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
            Sentry Verification Test
          </h1>
          <p className="text-sm text-slate-400">
            Click the button below to throw a test error and verify that it arrives on your Sentry dashboard in real-time.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            Sentry.captureException(new Error("Test Sentry Error from Yash Lab URL Shortener!"));
            alert("Test error sent to Sentry! Check your Sentry Issues dashboard.");
          }}
          className="w-full py-3.5 px-6 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 transition-all active:scale-95 cursor-pointer"
        >
          Trigger Test Error 💥
        </button>
      </div>
    </div>
  );
}
