import Link from "next/link";

export const metadata = {
  title: "Editorial & Regulatory Disclaimer | YashLab",
  description:
    "Official regulatory disclaimer regarding healthcare economics, insurance evaluations, and financial planning research published on YashLab.",
  robots: "index, follow",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center">
      {/* Header */}
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

      {/* Main Content */}
      <main className="w-full max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-extrabold text-slate-900 font-display mb-2">Editorial Disclaimer</h1>
        <p className="text-xs text-slate-500 mb-8">Last revised: September 2026</p>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">1. General Informational Nature</h2>
            <p>
              All content, research papers, comparative frameworks, and articles published on YashLab (yashlab.me) are intended exclusively for general educational and informational purposes. No published material should be interpreted as formal underwriting solicitation, binding insurance quotes, or tailored financial consultancy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">2. Healthcare &amp; Medical Disclaimer</h2>
            <p>
              Discussions surrounding health insurance coverage, critical illness riders, pre-existing conditions (PED), and hospitalization protocols do not constitute medical diagnoses, physician consultations, or clinical advice. Always consult licensed medical professionals for healthcare evaluations and read official insurer policy wordings before executing insurance contracts.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">3. Financial &amp; Investment Risk</h2>
            <p>
              Analyses concerning capital markets, Real Estate Investment Trusts (REITs), dividend compounding, tax-loss harvesting, and foreign exchange hedging involve substantial market risks. Past performance does not guarantee future financial returns. Readers must perform independent due diligence and seek guidance from Certified Financial Planners (CFP) or statutory tax consultants prior to committing investment capital.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">4. Third-Party References and Regulatory Changes</h2>
            <p>
              While our editorial staff makes diligent efforts to ensure all statutory references, tax limits, and regulatory moratorium rules reflect current benchmarks at the time of publication, insurance regulations and financial statutes are subject to continuous legislative amendments. YashLab disclaims liability for actions taken relying solely on published materials.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">5. Editorial Contact &amp; Clarifications</h2>
            <p>
              If you identify factual discrepancies or wish to submit research corrections, please contact our compliance desk at{" "}
              <span className="font-semibold text-indigo-600">editorial@yashlab.me</span>.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400 mt-auto">
        <p>© {new Date().getFullYear()} YashLab (yashlab.me). All rights reserved.</p>
      </footer>
    </div>
  );
}
