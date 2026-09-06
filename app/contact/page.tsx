import Link from "next/link";

export const metadata = {
  title: "Contact Us | YashLab Support & Inquiries",
  description: "Contact the YashLab editorial, technical support, and data privacy team.",
  robots: "index, follow",
};

export default function ContactPage() {
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
        <h1 className="text-3xl font-extrabold text-slate-900 font-display mb-2">Contact Us</h1>
        <p className="text-xs text-slate-500 mb-8">Have questions, feedback, or business inquiries? We are here to help.</p>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">General Inquiries</span>
              <span className="font-bold text-slate-900 text-base">support@yashlab.me</span>
              <p className="text-xs text-slate-500">For user assistance, technical questions, and platform access.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Editorial &amp; Media</span>
              <span className="font-bold text-slate-900 text-base">editorial@yashlab.me</span>
              <p className="text-xs text-slate-500">For publication inquiries, press releases, and editorial feedback.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 mb-2">Business Address</h2>
            <p className="text-slate-600 leading-relaxed">
              YashLab Digital Publications Inc.<br />
              Cyber Hub, DLF Phase 2, Gurugram, Haryana 122002, India<br />
              Email: contact@yashlab.me
            </p>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs flex items-center gap-3">
            <svg className="w-5 h-5 text-indigo-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Our support and compliance desk responds to all inquiries within 24–48 business hours.</span>
          </div>
        </div>
      </main>

      <footer className="w-full bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400 mt-auto">
        <p>© {new Date().getFullYear()} YashLab (yashlab.me). All rights reserved.</p>
      </footer>
    </div>
  );
}
