import Link from "next/link";
import { ARTICLES } from "@/lib/articles-data";

export const metadata = {
  title: "Insights & Tech Articles | LinkVault Knowledge Hub",
  description: "Explore the latest insights in enterprise cloud architectures, healthcare economics, life insurance, and treasury risk management.",
  robots: "index, follow",
};

export default function ArticlesIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-20 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              LV
            </div>
            <span className="font-bold font-display text-slate-900 tracking-tight">
              LinkVault Hub
            </span>
          </Link>
          <span className="text-xs text-slate-500 font-medium">Enterprise Insights</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-5xl px-4 py-10 flex flex-col items-center">
        <div className="text-center max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold mb-3">
            <span>Knowledge Base &amp; Publications</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-3">
            Financial Governance &amp; Cloud Insights
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Curated research papers and technical frameworks covering health insurance, wealth preservation, and high-speed network topologies.
          </p>
        </div>

        {/* Article Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.map((art) => (
            <Link
              key={art.slug}
              href={`/articles/${art.slug}`}
              className="group p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-indigo-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 font-semibold text-slate-700">
                    {art.category}
                  </span>
                  <span>{art.readTime}</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-display mb-2 leading-snug">
                  {art.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>By {art.author.split(",")[0]}</span>
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
        <p>© {new Date().getFullYear()} LinkVault Publications. All rights reserved.</p>
      </footer>
    </div>
  );
}
