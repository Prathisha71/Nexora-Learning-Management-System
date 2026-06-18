import React, { useEffect } from "react";
import { useLmsStore } from "../store/index";
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, HelpCircle, ShieldAlert } from "lucide-react";
import { PlanetLogo } from "./PlanetLogo";

export const TermsOfServicePage: React.FC = () => {
  const { setView } = useLmsStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-slate-800 overflow-x-hidden font-sans selection:bg-brand-royal/20 selection:text-slate-900 pb-20">
      {/* Decorative Glow Blobs */}
      <div className="absolute rounded-full blur-[120px] opacity-[0.06] pointer-events-none w-[500px] h-[500px] bg-brand-royal top-[-100px] left-[-100px]" />
      <div className="absolute rounded-full blur-[120px] opacity-[0.06] pointer-events-none w-[600px] h-[600px] bg-brand-violet bottom-0 right-[-100px]" />

      {/* Top Navbar */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex flex-row items-center justify-between border-b border-slate-100">
        <div
          onClick={() => setView("landing")}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <PlanetLogo className="w-10 h-10 group-hover:scale-105 transition-transform" />
          <span className="font-extrabold font-display text-xl tracking-tight text-slate-900 group-hover:text-brand-violet transition-colors whitespace-nowrap">
            Nexora Learning
          </span>
        </div>
        <button
          onClick={() => setView("landing")}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-650 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 bg-white rounded-none transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </nav>

      {/* Hero Header */}
      <header className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-16 pb-12">
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight leading-[1.15] mb-4">
          Terms of Service
        </h1>
        <p className="text-sm sm:text-base text-slate-550 max-w-2xl mx-auto leading-relaxed font-medium">
          Last updated: June 18, 2026. Please read these terms carefully before accessing Nexora Learning services, dashboards, or live classrooms.
        </p>
      </header>

      {/* Content Layout */}
      <main className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-100/50 p-8 sm:p-10 space-y-12">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-royal">
              <CheckCircle className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                1. Eligibility and Registration
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              By accessing Nexora Learning (the "Platform"), you warrant that you are a student enrolled in Class 9 to Class 12, or an authorized parent, legal guardian, or educator. Registration requires accurate, current, and complete information. Users are responsible for keeping credentials confidential. Sharing workspace access credentials with unauthorized third parties will trigger dynamic session suspension.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-royal">
              <ShieldAlert className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                2. Academic Integrity and Conduct
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Nexora is an elite ecosystem designed to foster genuine academic mastery. The following actions represent critical breaches of our user code of conduct:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-655 text-sm sm:text-base">
              <li>
                <strong className="text-slate-800">Cheat Assistance:</strong> Utilizing external AI bots or automated solvers to forge answers in chapter tests, assignment uploads, or live quizzes.
              </li>
              <li>
                <strong className="text-slate-800">Classroom Disruptions:</strong> Disrupting live UHD WebRTC streams, spamming classroom message boards, or screen-sharing inappropriate media.
              </li>
              <li>
                <strong className="text-slate-800">Content Scraping:</strong> Deploying scrapers, index bots, or background scripts to scrape formula sheets, expert notes, questions database, or teacher lectures.
              </li>
            </ul>
          </section>

          <hr className="border-slate-100" />

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-royal">
              <FileText className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                3. Intellectual Property Rights
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              All textbook annotations, customized worksheets, physical class kits, formula guides, WebRTC live recording archives, and software engine configurations (including front-end widgets and the AI Tutor prompt engineering layers) remain the exclusive property of Nexora Learning Technologies Pvt. Ltd. You are granted a limited, non-exclusive, non-transferable personal license to view and download files for study purposes only.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* Section 4 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-royal">
              <AlertTriangle className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                4. Subscription Fees and Refund Policies
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Access to Premium features (such as Contextual AI Tutor, Live Classrooms, and Physical Kits) is contingent on active, verified subscription plans. All payments are billed securely via recurring cycles. Subscription cancel requests will discontinue next month's billing. Refund requests for the current billing cycle must be filed within 3 days of activation and are subject to verification parameters (e.g., download quantities and classroom hours used).
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* Section 5 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-royal">
              <HelpCircle className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                5. Platform Disclaimer & Liability
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Nexora Learning delivers educational resources "as is" without warranty. While our expert curators and AI systems achieve 99% accuracy in curriculum alignment, we do not guarantee exam results or board placement outcomes. In no event shall Nexora Learning be liable for any indirect, incidental, or structural damages arising from the use or inability to use our platform tools.
            </p>
          </section>

        </div>

        {/* Footer Nav back button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setView("landing")}
            className="flex items-center gap-2 px-6 py-3 rounded-none bg-brand-royal hover:bg-blue-650 text-white font-bold uppercase tracking-wider transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Nexora Home</span>
          </button>
        </div>
      </main>
    </div>
  );
};
