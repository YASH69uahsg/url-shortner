import Link from "next/link";

export const metadata = {
  title: "Terms of Service | YashLab",
  description: "Terms and conditions governing the use of YashLab web portals and services.",
  robots: "index, follow",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center">
      <header className="w-full bg-white border-b border-slate-200 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold font-display text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              YL
            </span>
            <span>YashLab</span>
          </Link>
          <Link href="/articles" className="text-xs text-indigo-600 font-semibold hover:underline">
            All Articles →
          </Link>
        </div>
      </header>

      <main className="w-full max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-extrabold text-slate-900 font-display mb-2">Terms of Service</h1>
        <p className="text-xs text-slate-500 mb-8">Effective date: September 2026</p>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and utilizing yashlab.me, you signify your agreement to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any local statutory laws.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">2. Use License &amp; Service Restrictions</h2>
            <p>
              Permission is granted to access informational publications and redirection gateways for personal, non-commercial transitional viewing only. You may not modify, distribute, or reverse-engineer any proprietary software scripts contained on our platform.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">3. Disclaimer of Warranties</h2>
            <p>
              The materials and articles on YashLab are provided on an &apos;as is&apos; basis. YashLab makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties of merchantability or fitness for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">4. Limitations of Liability</h2>
            <p>
              In no event shall YashLab or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on yashlab.me.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">5. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts therein.
            </p>
          </section>
        </div>
      </main>

      <footer className="w-full bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400 mt-auto">
        <p>© {new Date().getFullYear()} YashLab (yashlab.me). All rights reserved.</p>
      </footer>
    </div>
  );
}
