import React, { useState, useEffect } from "react";
import { useLmsStore } from "../store/index";
import { ArrowLeft, Mail, MessageSquare, Send, CheckCircle, Loader2 } from "lucide-react";
import { PlanetLogo } from "./PlanetLogo";

export const ContactSupportPage: React.FC = () => {
  const { setView } = useLmsStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Live Class Trouble");
  const [contactNumber, setContactNumber] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !contactNumber.trim() || !message.trim()) {
      setErrorMsg("Please fill in all the required fields.");
      return;
    }
    setErrorMsg("");
    setIsSubmitting(true);

    // Simulate sending support request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const randChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      setTicketId(`NX-SUPPORT-${randNum}-${randChar}`);
    }, 1200);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setCategory("Live Class Trouble");
    setContactNumber("");
    setMessage("");
    setSubmitSuccess(false);
    setTicketId("");
  };

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
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-655 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 bg-white rounded-none transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </nav>

      {/* Hero Header */}
      <header className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-16 pb-12">
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight leading-[1.15] mb-4">
          Contact Support
        </h1>
        <p className="text-sm sm:text-base text-slate-550 max-w-2xl mx-auto leading-relaxed font-medium">
          Need academic help or platform support? Send an inquiry, or call us directly at <strong>900xxxxxx</strong>.
        </p>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-xl mx-auto px-6">
        {submitSuccess ? (
          <div className="bg-white/85 backdrop-blur-xl border border-emerald-500/20 rounded-2xl shadow-xl shadow-slate-100/50 p-8 sm:p-10 text-center space-y-6 animate-float">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-500">
              <CheckCircle className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-display text-slate-900 font-sans">Ticket Submitted Successfully</h2>
              <p className="text-sm text-slate-500 font-medium">
                We have registered your support request. A confirmation email has been dispatched.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl flex flex-col items-center gap-1">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Support Ticket ID</span>
              <span className="text-lg font-mono font-bold text-brand-royal select-all">{ticketId}</span>
            </div>

            <div className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
              Our support team generally responds to mathematics, physics, and live stream queries in under <strong className="text-slate-800">2-4 hours</strong>.
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-655 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 bg-white transition-all"
              >
                Submit New Query
              </button>
              <button
                onClick={() => setView("landing")}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-brand-royal hover:bg-blue-650 text-white transition-all"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-100/50 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kabir Mehta"
                  className="premium-input text-sm text-slate-800 placeholder-slate-400 border-slate-200 bg-white"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="premium-input pl-10 text-sm text-slate-800 placeholder-slate-400 border-slate-200 bg-white"
                  />
                </div>
              </div>

              {/* Grid: Category and Contact Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category Select */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Inquiry Area
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-royal/30 focus:border-transparent transition-all text-sm appearance-none cursor-pointer"
                  >
                    <option value="Live Class Trouble" className="bg-white">Live Class Trouble</option>
                    <option value="Billing & Enrollment" className="bg-white">Billing & Enrollments</option>
                    <option value="Other Feedback" className="bg-white">General Feedback</option>
                  </select>
                </div>

                {/* Contact Number Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Contact Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="900xxxxxx"
                    className="premium-input text-sm text-slate-800 placeholder-slate-400 border-slate-200 bg-white"
                  />
                </div>
              </div>

              {/* Message Description */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Detailed Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you need support with... (e.g., questions from Chapter 1 Quiz, errors joining UHD room, subscription invoices)"
                  className="premium-input text-sm resize-none text-slate-800 placeholder-slate-400 border-slate-200 bg-white"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-royal hover:bg-blue-650 text-white font-bold uppercase tracking-wider border border-brand-royal hover:border-blue-650 shadow-md transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span className="text-white">Registering Ticket...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-white" />
                    <span className="text-white">Submit Ticket</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
