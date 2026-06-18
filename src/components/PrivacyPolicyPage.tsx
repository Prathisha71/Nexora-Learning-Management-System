import React, { useEffect } from "react";
import { useLmsStore } from "../store/index";
import { ArrowLeft, ShieldCheck, Lock, Eye, Database, Cookie, FileText } from "lucide-react";
import { PlanetLogo } from "./PlanetLogo";

export const PrivacyPolicyPage: React.FC = () => {
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
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-550 max-w-2xl mx-auto leading-relaxed font-medium">
          Last updated: June 18, 2026. This policy outlines how Nexora Learning collects, uses, and secures information for Class 9–12 scholars and educators on our platform.
        </p>
      </header>

      {/* Content Layout */}
      <main className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-100/50 p-8 sm:p-10 space-y-12">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-royal">
              <Eye className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                1. Information We Collect
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At Nexora Learning, we believe in radical transparency. In order to provide a highly personalized, contextual learning ecosystem for mathematics, physics, and chemistry, we collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-650 text-sm sm:text-base">
              <li>
                <strong className="text-slate-800">Account Information:</strong> Profile credentials, including username, email address, password hash, age, school board affiliations (e.g., TN State Board), and grade levels (Class 9 to 12).
              </li>
              <li>
                <strong className="text-slate-800">Academic Data:</strong> Quiz submissions, selected answers, assignment file uploads, marks, learning speeds, completed chapter topics, and earned achievements (XP, levels, and coins).
              </li>
              <li>
                <strong className="text-slate-800">Contextual AI Tutor Logs:</strong> Transcripts of text and formula inputs processed by the Nexora AI Tutor to refine contextual math and chemistry explanations.
              </li>
              <li>
                <strong className="text-slate-800">Live Classroom Data:</strong> High-definition WebRTC video streams, audio feeds, active screen-shares, and digital whiteboard markups generated during scheduled classes.
              </li>
            </ul>
          </section>

          <hr className="border-slate-100" />

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-royal">
              <Lock className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                2. How We Use Your Information
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We process data strictly to fulfill our academic commitments and enhance student achievements:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-650 text-sm sm:text-base">
              <li>
                <strong className="text-slate-800">Personalizing Learning Paths:</strong> Our backend utilizes performance vectors to dynamically slice and serve appropriate question bank difficulties and suggest key reading nodes.
              </li>
              <li>
                <strong className="text-slate-800">AI Model Optimization:</strong> Tutor inquiries are mapped to index keys to improve the accuracy of our mathematical and chemical formula generation.
              </li>
              <li>
                <strong className="text-slate-800">Collaboration Tools:</strong> Storing user bookmarks, notes, and custom formula sheets to allow scholars to resume learning seamlessly from any device.
              </li>
              <li>
                <strong className="text-slate-800">Administrative Metrics:</strong> Providing educational analytics to teachers and authorized parent portals, tracking attendance, quiz accuracy, and homework submissions.
              </li>
            </ul>
          </section>

          <hr className="border-slate-100" />

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-royal">
              <Database className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                3. Data Protection and Encryption
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We protect scholar data with military-grade security controls:
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              All data transmitted to Nexora servers, including real-time WebRTC audio-video packets and assignment files, is encrypted in transit using industry-standard TLS 1.3 encryption. At rest, data is isolated in secure databases using AES-256 standard encryption. Access is strictly confined to authenticated instructors, authorized administrators, and the account owner.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* Section 4 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-royal">
              <Cookie className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                4. Cookies and Analytical Tracking
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We use analytical trackers and small state files (cookies) to make the learning experience frictionless:
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Cookies are used strictly to remember session tokens, keep students logged in, store UI appearance themes (dark vs. light mode), and preserve active work inside the code playground or formulas workspace. We do not sell user data to advertising companies or third-party marketing entities.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* Section 5 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-royal">
              <FileText className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                5. Scholar Rights and Deletion
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Students and their legal guardians retain full ownership of their data. You have the right to request a complete export of your student profile performance history, including your quiz scores and assignments. If you choose to delete your account, all personal data, video recording logs, and AI conversation records will be permanently purged from Nexora Learning servers within 7 business days of request validation.
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
