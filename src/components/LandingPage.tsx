import React, { useState, useEffect } from "react";
import { useLmsStore } from "../store/index";
import {
  ArrowRight,
  ShieldCheck,
  Video,
  Sparkles,
  Trophy,
  Users,
  Activity,
  Heart,
  Star,
  Layout,
  CheckCircle,
  BookOpen,
  StarHalf,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PlanetLogo } from "./PlanetLogo";

export const LandingPage: React.FC = () => {
  const { setView } = useLmsStore();
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const heroImages = [
    "/hero_slide_1.png?v=2",
    "/hero_slide_2.png?v=2",
    "/hero_slide_3.png?v=2",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: "Contextual AI Tutor",
      desc: "Instant 24/7 explanations in mathematics and chemistry tailored to your textbook version, board standard, and learning speed.",
    },
    {
      icon: Video,
      title: "UHD WebRTC Classrooms",
      desc: "Ultra-low latency streaming with active participant grids, digital whiteboards, and real-time screen shares.",
    },
    {
      icon: BookOpen,
      title: "Expert Notes",
      desc: "Curated chapter notes, formula sheets, and physical worksheets mapped perfectly to your board exam curriculum for better learning.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Nexora Learning completely revolutionized my daughter's Class 12 prep. The physical kit, combined with the real-time AI tutor, justified every rupee of the premium subscription. She cleared her TN State Board exams with top marks.",
      author: "Aditi Rao",
      role: "Parent of Shreya Rao (Class 12 TNSB)",
      rating: 4.5,
      avatar: "/aditi_rao.png",
    },
    {
      quote:
        "Using Nexora Learning helped me improve my academic performance dramatically. By practicing with the expert worksheets and chapter tests, my conceptual understanding became so strong that I went from 70% to scoring 98% in my Class 12 board exams.",
      author: "Kabir Mehta",
      role: "Class 12 Student (TNSB board)",
      rating: 5,
      avatar:
        "/kabir_mehta.png",
    },
  ];

  return (
    <div className="relative min-h-screen bg-white text-slate-800 overflow-x-hidden font-sans selection:bg-brand-royal/20 selection:text-slate-900">
      <div className="absolute rounded-full blur-[120px] opacity-[0.08] pointer-events-none w-[500px] h-[500px] bg-brand-royal top-[-100px] left-[-100px]" />
      <div className="absolute rounded-full blur-[120px] opacity-[0.08] pointer-events-none w-[600px] h-[600px] bg-brand-violet bottom-0 right-[-100px]" />
      <div className="absolute rounded-full blur-[120px] opacity-[0.05] pointer-events-none w-[400px] h-[400px] bg-cyan-500 top-[40%] right-[10%]" />

      {/* Floating Educational Background Doodles relative to centered content layout to prevent overlap */}
      <div className="absolute inset-0 max-w-6xl mx-auto px-6 pointer-events-none z-0">
        <div className="relative w-full h-full">
          {/* Graduation Cap (Left side, top-[18%]) */}
          <div className="absolute top-[18%] left-[-120px] w-24 h-24 opacity-[0.22] sm:opacity-[0.28] text-brand-violet transform -rotate-12 select-none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
          </div>

          {/* Book & Pencil (Right side, top-[35%]) */}
          <div className="absolute top-[35%] right-[-130px] w-28 h-28 opacity-[0.22] sm:opacity-[0.28] text-brand-violet transform rotate-12 select-none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              <path d="M16 7l2 2-9 9-3 1 1-3 9-9z" />
            </svg>
          </div>

          {/* Open Book (Left side, top-[62%]) */}
          <div className="absolute top-[62%] left-[-120px] w-24 h-24 opacity-[0.2] sm:opacity-[0.25] text-brand-violet transform -rotate-6 select-none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>

          {/* Thumbs Up (Right side, top-[80%]) */}
          <div className="absolute top-[80%] right-[-120px] w-20 h-20 opacity-[0.2] sm:opacity-[0.25] text-brand-violet transform rotate-6 select-none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
          </div>

          {/* Wavy Line Spark / Sun (Right side, top-[8%]) */}
          <div className="absolute top-[8%] right-[-150px] w-32 h-64 opacity-[0.22] sm:opacity-[0.28] text-brand-royal transform -rotate-12 select-none">
            <svg viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="50" cy="40" r="3" fill="currentColor" />
              <line x1="50" y1="20" x2="50" y2="30" />
              <line x1="50" y1="50" x2="50" y2="60" />
              <line x1="30" y1="40" x2="40" y2="40" />
              <line x1="60" y1="40" x2="70" y2="40" />
              <line x1="36" y1="26" x2="43" y2="33" />
              <line x1="57" y1="47" x2="64" y2="54" />
              <line x1="64" y1="26" x2="57" y2="33" />
              <line x1="43" y1="47" x2="36" y2="54" />
              <path d="M50 40 Q75 100 35 130 T65 190" />
            </svg>
          </div>
        </div>
      </div>

      {/* Modern Luxury Navbar */}
      <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-row items-center justify-between gap-4">
        <div
          onClick={() => setView("landing")}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <PlanetLogo className="w-9 h-9 sm:w-12 sm:h-12 group-hover:scale-105 transition-transform" />
          <span className="font-extrabold font-display text-lg sm:text-2xl tracking-tight text-slate-900 group-hover:text-brand-violet transition-colors whitespace-nowrap">
            Nexora Learning
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={() => setView("login-student")}
            className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-650 hover:text-slate-900 px-3 sm:px-5 py-2 sm:py-2.5 border border-slate-200 hover:bg-slate-50 rounded-none transition-all duration-200"
          >
            Sign In
          </button>
          <button
            onClick={() => setView("signup")}
            className="px-4 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-xs rounded-none bg-brand-royal hover:bg-blue-650 text-white font-bold uppercase tracking-wider border border-brand-royal hover:border-blue-650 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            Enroll Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 min-h-[calc(100vh-100px)] flex flex-col justify-center py-12 lg:py-20">


        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-5 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold font-display text-slate-900 tracking-tight leading-[1.1] mb-6">
              The Ultimate Academic Platform for <br className="hidden sm:inline" />
              <span className="text-brand-royal">
                Class 9–12 Scholars
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
              Master your curriculum with our contextual AI Tutor, interactive WebRTC classrooms, and board-mapped physical kits built for elite performance.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => setView("login-student")}
                className="w-full sm:w-auto px-8 py-3.5 bg-brand-royal hover:bg-blue-650 text-white font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Enter Student Workspace</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setView("login-educator")}
                className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold uppercase tracking-wider shadow-md hover:shadow-lg border border-slate-300 hover:border-slate-400 transition-all duration-200 flex items-center justify-center gap-2 group transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Sign In as Educator</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Graphic Showcase with Slide Deck */}
          <div className="lg:col-span-7 flex items-center justify-center w-full">
            <div className="relative w-full max-w-[600px] lg:max-w-none">
              {/* Outer Card with curved border */}
              <div 
                className="border border-slate-200/80 bg-gradient-to-br from-slate-50/50 to-white/30 p-4 shadow-xl hover:shadow-2xl transition-all duration-300"
                style={{ borderRadius: "24px" }}
              >
                <div 
                  className="bg-white border border-slate-100 overflow-hidden shadow-inner flex items-center justify-center p-0 relative h-[320px] sm:h-[420px] md:h-[480px] lg:h-[500px]" 
                  style={{ borderRadius: "18px" }}
                >
                  <img
                    key={currentHeroImage}
                    src={heroImages[currentHeroImage]}
                    alt="Nexora Learning Illustration"
                    className="w-full h-full object-cover select-none drop-shadow-sm animate-fade-in-up"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Carousel */}
      <section
        id="features"
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-24 border-t border-slate-100"
      >
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-20">
          <span className="text-xs font-bold text-brand-royal uppercase tracking-widest block mb-2">
            Elite Ecosystem
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Designed for Academic Supremacy
          </h2>
        </div>

        {/* Single Feature Carousel */}
        {(() => {
          const images = [
            "/feat_ai_tutor.png?v=5",
            "/feat_webrtc.png?v=3",
            "/feat_expert_notes.png?v=7",
          ];
          const feat = features[activeFeature];
          const Icon = feat.icon;
          return (
            <div className="relative">
              {/* Feature Card */}
              <div
                key={activeFeature}
                className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 text-left animate-fade-in-up"
              >
                {/* Text Block */}
                <div className="w-full lg:w-[420px] shrink-0 space-y-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-royal/5 flex items-center justify-center text-brand-royal border border-brand-royal/10 overflow-hidden">
                    {feat.title === "Contextual AI Tutor" ? (
                      <img src="/feat_ai_tutor_icon.png" alt="AI Tutor" className="w-full h-full object-cover" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-brand-royal uppercase tracking-widest mb-1">
                      Feature {activeFeature + 1} of {features.length}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                      {feat.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>

                  {/* Arrow Navigation */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveFeature((activeFeature - 1 + features.length) % features.length)}
                      className="w-10 h-10 rounded-full border border-slate-200 hover:border-brand-royal hover:bg-brand-royal/5 flex items-center justify-center text-slate-500 hover:text-brand-royal transition-all active:scale-95"
                      aria-label="Previous feature"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveFeature((activeFeature + 1) % features.length)}
                      className="w-10 h-10 rounded-full border border-slate-200 hover:border-brand-royal hover:bg-brand-royal/5 flex items-center justify-center text-slate-500 hover:text-brand-royal transition-all active:scale-95"
                      aria-label="Next feature"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dot indicators */}
                    <div className="flex items-center gap-1.5 ml-1">
                      {features.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveFeature(i)}
                          className={`rounded-full transition-all duration-300 ${
                            i === activeFeature
                              ? "w-5 h-2 bg-brand-royal"
                              : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                          }`}
                          aria-label={`Go to feature ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Image Mockup */}
                <div className="w-full lg:flex-1">
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-1.5 sm:p-2 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm h-[240px] sm:h-[360px] md:h-[420px] lg:h-[460px] flex items-center justify-center">
                      <img
                        src={images[activeFeature]}
                        alt={`${feat.title} Mockup`}
                        className="w-full h-full object-cover select-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Testimonials Carousel */}
      <section
        id="testimonials"
        className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-slate-100"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-royal uppercase tracking-widest block mb-2">
            Testimonials
          </span>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Approved by Elite Parents and Educators
          </h2>
        </div>

        {(() => {
          const test = testimonials[activeTestimonial];
          return (
            <div 
              className="relative max-w-4xl mx-auto border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 p-8 sm:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
              style={{ borderRadius: "24px" }}
            >
              {/* Background ambient light blobs inside the card */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-royal/5 blur-3xl pointer-events-none" style={{ borderRadius: "50%" }} />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-violet/5 blur-3xl pointer-events-none" style={{ borderRadius: "50%" }} />
              
              {/* Giant background quotation mark */}
              <div className="absolute right-8 top-4 text-[160px] font-serif text-slate-150/70 select-none pointer-events-none leading-none">
                “
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                {/* Left: Photo + Name + Arrows */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 md:w-52 shrink-0 md:border-r md:border-slate-100 md:pr-10">
                  <div className="relative p-1 bg-gradient-to-tr from-brand-royal/20 to-brand-violet/20 hover:from-brand-royal/40 hover:to-brand-violet/40 transition-colors duration-300 shadow-inner" style={{ borderRadius: "50%" }}>
                    <img
                      key={activeTestimonial}
                      src={test.avatar}
                      alt={test.author}
                      className="w-28 h-28 object-cover border-4 border-white shadow-md animate-fade-in-up"
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900">{test.author}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-tight">{test.role}</p>
                  </div>
                  
                  {/* Arrows */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => setActiveTestimonial((activeTestimonial - 1 + testimonials.length) % testimonials.length)}
                      className="w-9 h-9 border border-slate-200 hover:border-brand-royal hover:bg-brand-royal/5 flex items-center justify-center text-slate-500 hover:text-brand-royal transition-all active:scale-95 shadow-sm bg-white"
                      style={{ borderRadius: "50%" }}
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)}
                      className="w-9 h-9 border border-slate-200 hover:border-brand-royal hover:bg-brand-royal/5 flex items-center justify-center text-slate-500 hover:text-brand-royal transition-all active:scale-95 shadow-sm bg-white"
                      style={{ borderRadius: "50%" }}
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right: Quote + Stars */}
                <div key={activeTestimonial} className="flex-1 flex flex-col justify-between h-full animate-fade-in-up py-2">
                  <div>
                    <span className="text-5xl font-serif text-brand-royal/20 leading-none select-none block -mb-4 -ml-1">“</span>
                    <p className="text-base sm:text-[17px] text-slate-700 leading-relaxed font-medium italic relative z-10">
                      {test.quote}
                    </p>
                  </div>
                  
                  {/* Rating / Quality Badge */}
                  <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-100">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const starVal = i + 1;
                        if (test.rating >= starVal) {
                          return <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-[0_1px_2px_rgba(245,158,11,0.2)]" />;
                        } else if (test.rating > starVal - 1) {
                          return <StarHalf key={i} className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-[0_1px_2px_rgba(245,158,11,0.2)]" />;
                        } else {
                          return <Star key={i} className="w-4 h-4 text-slate-200" />;
                        }
                      })}
                    </div>
                    <span className="text-[11px] font-bold bg-amber-50 text-amber-700 px-2.5 py-0.5 border border-amber-200/50" style={{ borderRadius: "12px" }}>
                      {test.rating} / 5.0 Rating
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Ready to Get Started Overlay Banner */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 -mb-24">
        <div 
          className="relative overflow-hidden bg-gradient-to-r from-brand-violet to-brand-royal text-white px-8 py-10 sm:py-12 sm:px-16 shadow-2xl"
          style={{ borderRadius: "24px" }}
        >
          {/* Halftone dotted patterns on sides */}
          <div className="absolute top-0 left-0 w-32 h-full opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:8px_8px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-full opacity-15 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:6px_6px] pointer-events-none" />
          
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xl space-y-3">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
                Ready to Get Started?
              </h3>
              <p className="text-sm text-slate-100 opacity-90 leading-relaxed font-medium">
                Join thousands of Class 9–12 scholars who are mastering their mathematics and chemistry syllabus with Nexora Learning.
              </p>
            </div>
            <button
              onClick={() => setView("signup")}
              className="px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-900 font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
              style={{ borderRadius: "30px" }}
            >
              Enroll Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-brand-navy-dark pt-36 pb-12 px-6 font-sans text-slate-400">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left">
            {/* Column 1: Logo & Desc */}
            <div className="md:col-span-4 space-y-5">
              <div
                onClick={() => setView("landing")}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <PlanetLogo className="w-9 h-9 sm:w-10 sm:h-10 group-hover:scale-105 transition-transform" />
                <span className="font-extrabold font-display text-lg sm:text-xl tracking-tight text-white group-hover:text-brand-violet transition-colors whitespace-nowrap">
                  Nexora Learning
                </span>
              </div>
              <p className="text-xs text-slate-450 leading-relaxed max-w-sm">
                The ultimate academic platform for Class 9–12 Scholars. Empowering students with 24/7 AI tutoring, UHD interactive classrooms, and board-ready physical kits.
              </p>
              
              {/* Social Icons removed as per request */}
            </div>

            {/* Column 2: Company */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company</h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button onClick={() => setView("landing")} className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-slate-400">
                    Home
                  </button>
                </li>
                <li>
                  <a href="#features" className="hover:text-white transition-colors text-slate-400">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-white transition-colors text-slate-400">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Help & Support */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Help & Support</h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button onClick={() => setView("contact-support")} className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-slate-400">
                    Support
                  </button>
                </li>
                <li>
                  <button onClick={() => setView("terms-of-service")} className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-slate-400">
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button onClick={() => setView("privacy-policy")} className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-slate-400">
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Subscribe to Newsletter</h4>
              <p className="text-xs text-slate-450 leading-relaxed">
                Stay updated with the latest exam tips, product updates, and syllabus changes.
              </p>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Successfully subscribed to newsletter!");
                }}
                className="flex items-center w-full max-w-sm overflow-hidden"
                style={{ borderRadius: "8px" }}
              >
                <input 
                  type="email" 
                  placeholder="Enter email address"
                  className="bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs px-4 py-3.5 focus:outline-none focus:border-brand-royal flex-1 min-w-0"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-brand-violet hover:bg-purple-700 text-white text-xs font-bold px-6 py-3.5 transition-colors uppercase tracking-wider shrink-0"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-slate-500">
            <p>
              © 2026 Nexora Learning Technologies Pvt. Ltd. All rights reserved.
            </p>
            <p>
              Designed for elite scholars.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
