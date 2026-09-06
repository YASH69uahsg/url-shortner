import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | YashLab",
  description: "Privacy Policy and data protection disclosures for YashLab and LinkVault services.",
  robots: "index, follow",
};

export default function PrivacyPolicyPage() {
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
        <h1 className="text-3xl font-extrabold text-slate-900 font-display mb-2">Privacy Policy</h1>
        <p className="text-xs text-slate-500 mb-8">Last updated: September 2026</p>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">1. Overview</h2>
            <p>
              YashLab (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates yashlab.me. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">2. Information Collection and Log Data</h2>
            <p>
              We collect information that your browser transmits whenever you visit our portal. This Log Data may include details such as your computer&apos;s Internet Protocol (&quot;IP&quot;) address, browser type, browser version, the pages of our service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">3. Cookies &amp; Web Beacons</h2>
            <p>
              Like any modern web application, YashLab uses &quot;cookies&quot;. These cookies are used to store session tokens, security parameters, and visitors&apos; preferences. Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">4. Google AdSense &amp; DoubleClick DART Cookie</h2>
            <p>
              Google is one of our third-party advertising partners. Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to yashlab.me and/or other sites on the Internet. Users may opt out of personalized advertising by visiting Google Ads Settings.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">5. Data Security</h2>
            <p>
              The security of your personal data is important to us, but remember that no method of transmission over the Internet is 100% secure. We utilize commercial-grade 256-bit encryption protocols to protect your sessions.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">6. Contact Us</h2>
            <p>
              If you have any inquiries regarding this Privacy Policy, please contact our data governance officer at{" "}
              <span className="font-semibold text-indigo-600">contact@yashlab.me</span>.
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
