import Link from "next/link";
import { ARTICLES } from "@/lib/articles-data";

export const metadata = {
  title: "Research Papers & Analytics Library | YashLab",
  description:
    "Explore our complete archive of in-depth analyses covering healthcare policy economics, wealth governance trusts, and distributed edge computing.",
  robots: "index, follow",
};

export default function ArticlesIndexPage() {
  const categories = ["All", "Health & Insurance", "Finance & Wealth", "Cloud & DevOps"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-20 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              YL
            </div>
            <span className="font-bold font-display text-slate-900 tracking-tight">
              YashLab Research
            </span>
          </Link>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/" className="text-slate-600 hover:text-indigo-600 font-semibold">
              ← Home
            </Link>
            <span className="text-slate-400">|</span>
            <span className="text-slate-500 font-medium">{ARTICLES.length} Published Papers</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-6xl px-4 sm:px-6 py-10 flex flex-col items-center">
        <div className="text-center max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold mb-3">
            <span>Knowledge Base &amp; Publications Archive</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-3">
            Institutional Research &amp; Technology Papers
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Rigorous evaluations of healthcare policies, actuarial cost-sharing models, estate wealth preservation trusts, and distributed edge architectures.
          </p>
        </div>

        {/* Category Badge Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat, idx) => (
            <span
              key={idx}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                idx === 0
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                  : "bg-white text-slate-700 border-slate-200/80 hover:border-indigo-300"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Article Grid (16 Cards) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((art) => (
            <Link
              key={art.slug}
              href={`/articles/${art.slug}`}
              className="group p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-indigo-500/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 font-semibold text-slate-700 text-[11px]">
                    {art.category}
                  </span>
                  <span>{art.readTime}</span>
                </div>
                <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-display mb-2 leading-snug line-clamp-2">
                  {art.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="truncate max-w-[150px]">By {art.author}</span>
                <span className="font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Read Article →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
          <p>© {new Date().getFullYear()} YashLab Research (yashlab.me). All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/about" className="hover:text-indigo-600">About</Link>
            <Link href="/contact" className="hover:text-indigo-600">Contact</Link>
            <Link href="/disclaimer" className="hover:text-indigo-600">Disclaimer</Link>
            <Link href="/privacy" className="hover:text-indigo-600">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

