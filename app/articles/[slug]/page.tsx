import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { getArticleBySlug, ARTICLES } from "@/lib/articles-data";
import { SAFELINK_COOKIE_NAME, verifySafeLinkSession } from "@/lib/safelink";
import SafeLinkUnlock from "@/components/SafeLinkUnlock";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | LinkVault Knowledge Base`,
    description: article.excerpt,
    robots: "index, follow",
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Check if user has an active SafeLink session from shortlink redirect
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SAFELINK_COOKIE_NAME)?.value;
  const session = sessionCookie ? verifySafeLinkSession(sessionCookie) : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center">
      {/* Navigation Header */}
      <header className="w-full bg-white border-b border-slate-200 py-3.5 px-6 sticky top-0 z-20 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/articles" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-xs font-semibold">
            <span>← All Articles</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
              {article.category}
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-3xl px-4 py-8 flex flex-col items-center">
        {/* Article Meta Header */}
        <div className="w-full mb-6">
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
            <span>•</span>
            <span>{article.author}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-display tracking-tight leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed border-l-4 border-indigo-500 pl-4 py-1 bg-indigo-50/40 rounded-r-xl">
            {article.excerpt}
          </p>
        </div>

        {/* ========================================================== */}
        {/* SAFELINK ACTIVE GATEWAY (Injected when session is valid)    */}
        {/* ========================================================== */}
        {session && (
          <div className="w-full my-4">
            <SafeLinkUnlock
              code={session.code}
              token={session.token}
              mode={session.mode}
            />
          </div>
        )}

        {/* Article Sections (Genuine High-CPC Content) */}
        <article className="w-full space-y-8 text-slate-800 leading-relaxed pt-4 border-t border-slate-200">
          {article.sections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {p}
                </p>
              ))}
              {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                <ul className="space-y-2 pt-1 pl-2">
                  {sec.bulletPoints.map((bp, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </article>

        {/* Related Articles Footer */}
        <div className="w-full mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
            More Industry Research
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ARTICLES.filter((a) => a.slug !== article.slug)
              .slice(0, 2)
              .map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/articles/${rel.slug}`}
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-500/50 shadow-xs transition-all flex flex-col justify-between"
                >
                  <span className="text-[11px] font-semibold text-indigo-600 mb-1">
                    {rel.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2">
                    {rel.title}
                  </h4>
                </Link>
              ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400 mt-auto">
        <p>© {new Date().getFullYear()} LinkVault Hub • Enterprise SafeLink Gateway</p>
      </footer>
    </div>
  );
}
