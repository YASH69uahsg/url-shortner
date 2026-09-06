import Link from "next/link";

export const metadata = {
  title: "About Us | YashLab Research & Analytics",
  description: "About YashLab — A forward-thinking digital publication delivering expert insights into financial planning, healthcare insurance, and distributed cloud computing.",
  robots: "index, follow",
};

export default function AboutPage() {
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
        <h1 className="text-3xl font-extrabold text-slate-900 font-display mb-2">About YashLab</h1>
        <p className="text-xs text-slate-500 mb-8">Empowering readers with analytical financial and technology insights</p>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">Our Mission</h2>
            <p>
              Founded in 2026, YashLab (yashlab.me) is dedicated to providing high-fidelity, independent research and objective analysis across the healthcare economics, insurance policy structuring, and modern distributed cloud computing sectors.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">Editorial Integrity &amp; Domain Expertise</h2>
            <p>
              Our editorial team consists of veteran analysts and software infrastructure architects who dissect complex policy language and network protocols into actionable intelligence. We strive to provide transparent, peer-reviewed knowledge that equips families, business founders, and engineers to make informed decisions.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">Global Infrastructure</h2>
            <p>
              All YashLab web properties are powered by ultra low-latency edge CDN nodes, ensuring immediate page load times, 256-bit cryptographic session integrity, and seamless accessibility across every continent.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">Get in Touch</h2>
            <p>
              We welcome contributed research and editorial feedback. Reach out to our editorial desk at{" "}
              <span className="font-semibold text-indigo-600">editorial@yashlab.me</span>.
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
