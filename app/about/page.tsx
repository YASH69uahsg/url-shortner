import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About Us & Editorial Board | YashLab Research & Analytics",
  description: "About YashLab — An independent research publication delivering expert insights into financial planning, healthcare insurance underwriting, and enterprise cloud infrastructure.",
  robots: "index, follow",
};

const EDITORIAL_BOARD = [
  {
    name: "Yash",
    credentials: "B.Tech, Founder & Managing Editor",
    role: "Editorial Director & Founder, YashLab",
    image: "/images/authors/yash.jpg",
    bio: "Directs digital publication infrastructure, editorial integrity guidelines, and open analytical research across healthcare economics and distributed systems.",
    experience: "Founder & Managing Director, YashLab Publications",
    education: "B.Tech in Computer Science & Engineering",
    specialties: ["Editorial Governance", "Digital Infrastructure", "Open Research"],
  },
  {
    name: "Dr. Alistair Vance",
    credentials: "M.D., Ph.D. (Health Economics), FHEA",
    role: "Senior Healthcare Economics Analyst & Former Underwriting Director",
    image: "/images/authors/alistair-vance.jpg",
    bio: "Over 18 years in private health underwriting and critical illness microeconomics. Former Underwriting Governance Director at Aegis Health Re.",
    experience: "18+ Years Healthcare Economics & Actuarial Governance",
    education: "Ph.D. Health Economics (Johns Hopkins), M.D. (Univ of Edinburgh)",
    specialties: ["Senior Healthcare", "Moratorium Underwriting", "IRDAI Governance"],
  },
  {
    name: "Elena Rostova",
    credentials: "CFP®, FSA (Fellow of the Society of Actuaries)",
    role: "Lead Actuarial Risk Consultant & Senior Policy Strategist",
    image: "/images/authors/elena-rostova.jpg",
    bio: "Certified Financial Planner and Actuarial Fellow specializing in family floater risk modeling, OPD tariff negotiation, and out-of-pocket health risk reduction.",
    experience: "14+ Years Actuarial Science & Health Policy",
    education: "M.Sc. Actuarial Science (LSE)",
    specialties: ["Cashless Hospital Networks", "OPD Underwriting", "Claim Ratio Auditing"],
  },
  {
    name: "Rajiv Singhania",
    credentials: "CFA®, FRM®, CAIA",
    role: "Chartered Financial Analyst & Macroeconomic Research Lead",
    image: "/images/authors/rajiv-singhania.jpg",
    bio: "16 years of portfolio management across London and Mumbai institutional asset desks, specializing in sovereign yields, REIT valuation, and safe retirement corpus withdrawals.",
    experience: "16+ Years Quantitative Asset Management",
    education: "MBA Finance (Wharton), B.Tech (IIT Delhi), CFA Charterholder",
    specialties: ["REIT Yield Economics", "Retirement Withdrawal Modeling", "Forex Risk"],
  },
  {
    name: "Marcus Chen",
    credentials: "M.S. Distributed Systems, AWS Certified Fellow",
    role: "Principal Distributed Systems Architect & FinOps Advisor",
    image: "/images/authors/marcus-chen.jpg",
    bio: "15+ years architecting petabyte-scale distributed data pipelines, zero-trust cloud network topographies, and FinOps cost governance frameworks.",
    experience: "15+ Years Enterprise Cloud Architecture",
    education: "M.S. Distributed Computing (Stanford University)",
    specialties: ["Kubernetes FinOps", "Zero-Trust Architecture", "Database Sharding"],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center">
      <header className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold font-display text-white tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              YL
            </span>
            <span>YashLab</span>
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/#articles" className="text-xs text-blue-400 font-semibold hover:underline">
              Research Papers →
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full max-w-5xl px-4 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-4">
            E-E-A-T Verified • Editorial Standards
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display mb-3">About YashLab</h1>
          <p className="text-sm text-slate-400">
            Independent research publication delivering verified insights across healthcare economics, quantitative wealth management, and enterprise cloud architecture.
          </p>
        </div>

        {/* Mission & Standards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-blue-400">🎯</span> Mission &amp; Objectivity
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Founded in 2026, YashLab (yashlab.me) is committed to demystifying complex technical, actuarial, and economic structures into actionable, high-fidelity research whitepapers for readers globally.
            </p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-emerald-400">🛡️</span> Editorial Peer-Review
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every whitepaper undergoes peer review by credentialed medical underwriters, chartered financial analysts, or principal infrastructure engineers prior to publication to guarantee factual accuracy and zero commercial bias.
            </p>
          </div>
        </div>

        {/* Editorial Board */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white font-display mb-2">Editorial Board &amp; Senior Fellows</h2>
            <p className="text-xs text-slate-400">Meet the credentialed researchers and analysts behind YashLab publications</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EDITORIAL_BOARD.map((member) => (
              <div
                key={member.name}
                className="bg-slate-900/70 border border-slate-800 hover:border-blue-500/40 transition-all rounded-2xl p-6 flex flex-col items-center text-center"
              >
                <div className="relative w-24 h-24 mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-blue-500/50 shadow-md"
                  />
                  <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center border-2 border-slate-900" title="Verified Credentialed Contributor">
                    ✓
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <div className="text-xs font-semibold text-blue-400 mb-1">{member.credentials}</div>
                <div className="text-xs text-slate-400 mb-3">{member.role}</div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4 text-left">{member.bio}</p>
                <div className="w-full border-t border-slate-800/80 pt-3 mt-auto text-left text-xs text-slate-400">
                  <div className="mb-1">
                    <strong className="text-slate-300">Experience:</strong> {member.experience}
                  </div>
                  <div>
                    <strong className="text-slate-300">Education:</strong> {member.education}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial Contact */}
        <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl text-center">
          <h3 className="text-xl font-bold text-white mb-2">Contact Editorial Desk</h3>
          <p className="text-sm text-slate-400 mb-4">Inquiries, corrections, and research submissions:</p>
          <a
            href="mailto:support@yashlab.me"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition"
          >
            support@yashlab.me
          </a>
        </div>
      </main>

      <footer className="w-full bg-slate-950 border-t border-slate-800 py-8 text-center text-xs text-slate-500 mt-auto">
        <p>© 2026 YashLab (yashlab.me). All rights reserved. Peer-reviewed research publication.</p>
      </footer>
    </div>
  );
}
