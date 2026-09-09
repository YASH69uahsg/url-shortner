"use client";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body className="bg-slate-950 text-white flex min-h-screen items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-3 text-red-400">Something went wrong!</h2>
          <p className="text-sm text-slate-400 mb-6">
            An unexpected error occurred. It has been automatically reported to our engineering team.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="py-2.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 font-medium text-white transition-all"
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}
