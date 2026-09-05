import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="glass-card p-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
            <span className="text-4xl font-display font-bold text-red-400">404</span>
          </div>
          <h1 className="text-xl font-display font-bold text-white mb-2">
            Link Not Found
          </h1>
          <p className="text-sm text-white/40 mb-6">
            This short link doesn&apos;t exist, has expired, or has been deactivated.
          </p>
          <Link href="/admin" className="btn-secondary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
