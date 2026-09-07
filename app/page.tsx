import Link from "next/link";
import { ARTICLES } from "@/lib/articles-data";

export const metadata = {
  title: "YashLab | Enterprise Financial Planning, Insurance & Cloud Insights",
  description:
    "YashLab is an independent digital research publication delivering in-depth analysis across healthcare economics, estate planning, and distributed cloud computing.",
  robots: "index, follow",
};

export default function HomePage() {
  const featuredArticle = ARTICLES[0];
  const recentArticles = ARTICLES.slice(1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center">
      {/* Editorial Navigation Header */}
      <header className="w-full bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm shadow-indigo-500/20">
              YL
            </div>
            <div className="flex flex-col">
              <span className="font-bold font-display text-slate-900 tracking-tight text-base sm:text-lg leading-none">
                YashLab
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                Research &amp; Insights
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <Link href="/articles" className="hover:text-indigo-600 transition-colors">
              All Articles
            </Link>
            <Link href="/about" className="hover:text-indigo-600 transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-indigo-600 transition-colors">
              Contact Desk
            </Link>
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">
              Privacy Policy
            </Link>
          </nav>

          <Link
            href="/articles"
            className="px-3.5 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200/80 transition-all flex items-center gap-1.5"
          >
            <span>Explore Library</span>
            <span>→</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-6xl px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center">
        {/* Publication Hero Banner */}
        <section className="w-full text-center max-w-3xl mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span>Independent Research Hub • 2026 Editions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight mb-4">
            Authoritative Insights on Healthcare Economics &amp; Cloud Infrastructure
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Rigorous, peer-reviewed analysis designed for policyholders, wealth managers, and distributed systems engineers.
          </p>
        </section>

        {/* Featured Flagship Article */}
        <section className="w-full mb-12">
          <div className="w-full p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2.5 text-xs text-indigo-300 font-semibold mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-800/80 border border-indigo-600/50">
                  Featured Research
                </span>
                <span>•</span>
                <span>{featuredArticle.readTime}</span>
                <span>•</span>
                <span>{featuredArticle.date}</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-bold font-display text-white mb-3 leading-snug">
                {featuredArticle.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {featuredArticle.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/articles/${featuredArticle.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2"
                >
                  <span>Read Complete Paper</span>
                  <span>→</span>
                </Link>
                <span className="text-xs text-slate-400">
                  By {featuredArticle.author} ({featuredArticle.authorRole})
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Topic Highlights Header */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Latest Published Investigations
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              16 Comprehensive Guides Covering High-Value Sectors
            </p>
          </div>
          <Link
            href="/articles"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>Browse Full Archive ({ARTICLES.length})</span>
            <span>→</span>
          </Link>
        </div>

        {/* Articles Grid (15 More Articles) */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {recentArticles.map((art) => (
            <Link
              key={art.slug}
              href={`/articles/${art.slug}`}
              className="group p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-indigo-500/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-700 text-[11px]">
                    {art.category}
                  </span>
                  <span>{art.readTime}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-display mb-2 leading-snug line-clamp-2">
                  {art.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="truncate max-w-[150px]">By {art.author}</span>
                <span className="font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Read →
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* Editorial Standards Card */}
        <section className="w-full p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="max-w-xl space-y-2">
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Rigorous Editorial &amp; Review Standards
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every analysis published on YashLab undergoes strict factual verification, regulatory citations cross-referencing, and actuarial model evaluation. Our team consists of credentialed financial planners and software architects.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/about"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
            >
              Our Editorial Board
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
            >
              Submit Inquiries
            </Link>
          </div>
        </section>
      </main>

      {/* Comprehensive Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-10 px-6 text-slate-500 text-xs mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold font-display text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">
                YL
              </span>
              <span>YashLab Research</span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Objective financial analytics, healthcare policy evaluation, and cloud infrastructure guides.
            </p>
          </div>

          <div>
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block mb-3">
              Research Sectors
            </span>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link href="/articles" className="hover:text-indigo-600">Health &amp; Insurance</Link></li>
              <li><Link href="/articles" className="hover:text-indigo-600">Finance &amp; Estate Planning</Link></li>
              <li><Link href="/articles" className="hover:text-indigo-600">Cloud &amp; DevOps Engineering</Link></li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block mb-3">
              Institutional Governance
            </span>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link href="/about" className="hover:text-indigo-600">About YashLab</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-600">Editorial Desk</Link></li>
              <li><Link href="/disclaimer" className="hover:text-indigo-600">Financial &amp; Medical Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block mb-3">
              Legal &amp; Privacy
            </span>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link href="/privacy" className="hover:text-indigo-600">Privacy Policy (GDPR/CCPA)</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-600">Terms of Service</Link></li>
              <li><Link href="/admin" className="text-slate-400 hover:text-slate-600">Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} YashLab (yashlab.me). All rights reserved.</p>
          <p>Distributed via Anycast Edge Infrastructure</p>
        </div>
      </footer>
    </div>
  );
}

