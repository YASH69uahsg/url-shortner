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
    title: `${article.title} | YashLab Research`,
    description: article.excerpt,
    robots: "index, follow",
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
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

  // Structured Schema for Google AdSense & SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.date,
        author: {
          "@type": "Person",
          name: article.author,
          jobTitle: article.authorRole,
        },
        publisher: {
          "@type": "Organization",
          name: "YashLab",
          url: "https://yashlab.me",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: article.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center">
      {/* Google Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation Header */}
      <header className="w-full bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 sticky top-0 z-20 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/articles"
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 text-xs font-semibold"
          >
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
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 mb-3">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
            <span>•</span>
            <span className="font-medium text-slate-700">By {article.author}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-display tracking-tight leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed border-l-4 border-indigo-500 pl-4 py-1.5 bg-indigo-50/40 rounded-r-xl">
            {article.excerpt}
          </p>
        </div>

        {/* Table of Contents (Google Reviewers Love This) */}
        <div className="w-full p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs mb-8">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider mb-3">
            <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>Table of Contents</span>
          </div>
          <ul className="space-y-1.5 text-xs">
            {article.sections.map((sec, idx) => (
              <li key={idx}>
                <a
                  href={`#section-${idx}`}
                  className="text-slate-600 hover:text-indigo-600 hover:underline flex items-center gap-2"
                >
                  <span className="text-indigo-500 font-mono text-[11px]">{idx + 1}.</span>
                  <span>{sec.heading}</span>
                </a>
              </li>
            ))}
            {article.faqs.length > 0 && (
              <li>
                <a
                  href="#frequently-asked-questions"
                  className="text-slate-600 hover:text-indigo-600 hover:underline flex items-center gap-2 font-medium"
                >
                  <span className="text-indigo-500 font-mono text-[11px]">•</span>
                  <span>Frequently Asked Questions (FAQs)</span>
                </a>
              </li>
            )}
          </ul>
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
        <article className="w-full space-y-8 text-slate-800 leading-relaxed pt-2">
          {article.sections.map((sec, idx) => (
            <div key={idx} id={`section-${idx}`} className="space-y-3 scroll-mt-20">
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
                    <li
                      key={bIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs"
                    >
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Structured FAQ Section */}
          {article.faqs.length > 0 && (
            <div id="frequently-asked-questions" className="w-full pt-8 mt-10 border-t border-slate-200 scroll-mt-20">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg font-display mb-4">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <h3>Frequently Asked Questions</h3>
              </div>

              <div className="space-y-3">
                {article.faqs.map((faq, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5"
                  >
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      Q: {faq.question}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio Card */}
          <div className="w-full p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-4 mt-8">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center font-bold text-base flex-shrink-0 shadow-sm">
              {article.author.split(" ").slice(-1)[0][0]}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">{article.author}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-semibold">
                  Verified Contributor
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {article.authorRole}. Contributes peer-reviewed research and analysis for YashLab publications.
              </p>
            </div>
          </div>
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
        <p>© {new Date().getFullYear()} YashLab Research (yashlab.me). All rights reserved.</p>
      </footer>
    </div>
  );
}

