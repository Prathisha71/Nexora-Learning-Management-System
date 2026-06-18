import React, { useEffect } from "react";
import { useLmsStore } from "../store/index";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export const SecureNotesPreview: React.FC = () => {
  const {
    boards,
    profile,
    activeSubjectId,
    activeChapterId,
    activeTopicId,
    setView,
  } = useLmsStore();

  const activeBoard =
    boards.find((b) => b.id === profile.selectedBoardId) || boards[0];
  const activeClass =
    activeBoard?.classes?.find((c) => c.id === profile.selectedClassId) ||
    activeBoard?.classes?.[0];

  const activeSubject =
    activeClass?.subjects.find((s) => s.id === activeSubjectId) ||
    activeClass?.subjects[0];
  const activeChapter =
    activeSubject?.chapters.find((c) => c.id === activeChapterId) ||
    activeSubject?.chapters[0];
  const activeTopic =
    activeChapter?.topics.find((t) => t.id === activeTopicId) ||
    activeChapter?.topics[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+S, Cmd+S
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
      }
      // Prevent Ctrl+P, Cmd+P
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!activeBoard || !activeClass || !activeSubject || !activeChapter || !activeTopic) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-royal"></div>
      </div>
    );
  }

  // Helper to resolve the correct PDF path for preview
  const getTopicPdfInfo = (chapterTitle: string, topicPdfUrl?: string) => {
    const title = chapterTitle.toLowerCase();
    const chId = activeChapter?.id || "";
    const subId = activeSubject?.id || "";
    const clId = activeClass?.id || "";

    const isCl9 = clId === "class-9" || activeClass?.title === "Class 9";
    const isCl10 = clId === "class-10" || activeClass?.title === "Class 10";
    const isCl11 = clId === "class-11" || activeClass?.title === "Class 11";
    const isCl12 = clId === "class-12" || activeClass?.title === "Class 12";

    const sTitle = activeSubject?.title || "";

    // Class 9 Maths chapters
    if (isCl9 && (subId === "maths-9" || sTitle === "Mathematics")) {
      if (title.includes("set language")) {
        return { url: "/Unit_1_Set_Language_Notes.pdf", name: "Unit_1_Set_Language_Notes.pdf" };
      }
      if (title.includes("real numbers")) {
        return { url: "/Unit_2_Real_Numbers_Notes.pdf", name: "Unit_2_Real_Numbers_Notes.pdf" };
      }
      if (title.includes("algebra")) {
        return { url: "/Unit_3_Algebra_Notes.pdf", name: "Unit_3_Algebra_Notes.pdf" };
      }
      if (title.includes("coordinate geometry")) {
        return { url: "/Unit_5_Coordinate_Geometry_Notes.pdf", name: "Unit_5_Coordinate_Geometry_Notes.pdf" };
      }
      if (title.includes("geometry")) {
        return { url: "/Unit_4_Geometry_Notes.pdf", name: "Unit_4_Geometry_Notes.pdf" };
      }
      if (title.includes("trigonometry")) {
        return { url: "/Unit_6_Trigonometry_Notes.pdf", name: "Unit_6_Trigonometry_Notes.pdf" };
      }
      if (title.includes("mensuration")) {
        return { url: "/Unit_7_Mensuration_Notes.pdf", name: "Unit_7_Mensuration_Notes.pdf" };
      }
      if (title.includes("statistics")) {
        return { url: "/Unit_8_Statistics_Notes.pdf", name: "Unit_8_Statistics_Notes.pdf" };
      }
      if (title.includes("probability")) {
        return { url: "/Unit_9_Probability_Notes.pdf", name: "Unit_9_Probability_Notes.pdf" };
      }
    }

    // Class 9 Science topics
    if (isCl9 && (subId === "science-9" || sTitle === "Science")) {
      const tId = activeTopic?.id || "";
      const tTitle = (activeTopic?.title || "").toLowerCase();
      
      if (tId.includes("sci-ph-t1") || tTitle.includes("measurement")) {
        return { url: "/Science_Physics_Measurement_Notes.pdf", name: "Science_Physics_Measurement_Notes.pdf" };
      }
      if (tId.includes("sci-ph-t2") || tTitle.includes("motion")) {
        return { url: "/Science_Physics_Motion_Notes.pdf", name: "Science_Physics_Motion_Notes.pdf" };
      }
      if (tId.includes("sci-ph-t3") || tTitle.includes("force")) {
        return { url: "/Science_Physics_Force_Notes.pdf", name: "Science_Physics_Force_Notes.pdf" };
      }
      if (tId.includes("sci-ph-t4") || tTitle.includes("gravitation")) {
        return { url: "/Science_Physics_Gravitation_Notes.pdf", name: "Science_Physics_Gravitation_Notes.pdf" };
      }
      if (tId.includes("sci-ph-t5") || tTitle.includes("work")) {
        return { url: "/Science_Physics_Work_Power_Energy_Notes.pdf", name: "Science_Physics_Work_Power_Energy_Notes.pdf" };
      }
      if (tId.includes("sci-ph-t6") || tTitle.includes("sound")) {
        return { url: "/Science_Physics_Sound_Notes.pdf", name: "Science_Physics_Sound_Notes.pdf" };
      }

      if (tId.includes("sci-ch-t1") || tTitle.includes("matter")) {
        return { url: "/Science_Chemistry_Matter_Notes.pdf", name: "Science_Chemistry_Matter_Notes.pdf" };
      }
      if (tId.includes("sci-ch-t2") || tTitle.includes("atoms")) {
        return { url: "/Science_Chemistry_Atoms_Molecules_Notes.pdf", name: "Science_Chemistry_Atoms_Molecules_Notes.pdf" };
      }
      if (tId.includes("sci-ch-t3") || tTitle.includes("structure")) {
        return { url: "/Science_Chemistry_Structure_Atom_Notes.pdf", name: "Science_Chemistry_Structure_Atom_Notes.pdf" };
      }
      if (tId.includes("sci-ch-t4") || tTitle.includes("periodic")) {
        return { url: "/Science_Chemistry_Periodic_Classification_Notes.pdf", name: "Science_Chemistry_Periodic_Classification_Notes.pdf" };
      }
      if (tId.includes("sci-ch-t5") || tTitle.includes("bonding")) {
        return { url: "/Science_Chemistry_Chemical_Bonding_Notes.pdf", name: "Science_Chemistry_Chemical_Bonding_Notes.pdf" };
      }

      if (tId.includes("sci-bi-t1") || tTitle.includes("cell")) {
        return { url: "/Science_Biology_The_Cell_Notes.pdf", name: "Science_Biology_The_Cell_Notes.pdf" };
      }
      if (tId.includes("sci-bi-t2") || tTitle.includes("tissues")) {
        return { url: "/Science_Biology_Tissues_Notes.pdf", name: "Science_Biology_Tissues_Notes.pdf" };
      }
      if (tId.includes("sci-bi-t3") || tTitle.includes("diversity")) {
        return { url: "/Science_Biology_Diversity_Notes.pdf", name: "Science_Biology_Diversity_Notes.pdf" };
      }
      if (tId.includes("sci-bi-t4") || tTitle.includes("ill") || tTitle.includes("health")) {
        return { url: "/Science_Biology_Why_Do_We_Fall_Ill_Notes.pdf", name: "Science_Biology_Why_Do_We_Fall_Ill_Notes.pdf" };
      }
      if (tId.includes("sci-bi-t5") || tTitle.includes("natural")) {
        return { url: "/Science_Biology_Natural_Resources_Notes.pdf", name: "Science_Biology_Natural_Resources_Notes.pdf" };
      }

      if (title.includes("physics")) {
        return { url: "/Science_Ch1_Physics_Notes.pdf", name: "Science_Ch1_Physics_Notes.pdf" };
      }
      if (title.includes("chemistry")) {
        return { url: "/Science_Ch2_Chemistry_Notes.pdf", name: "Science_Ch2_Chemistry_Notes.pdf" };
      }
      if (title.includes("biology")) {
        return { url: "/Science_Ch3_Biology_Notes.pdf", name: "Science_Ch3_Biology_Notes.pdf" };
      }
    }

    // Class 10 Maths
    if (isCl10 && (subId === "maths-10" || sTitle === "Mathematics")) {
      let num = "";
      const idMatch = chId.match(/ch(\d+)/i);
      const titleMatch = chapterTitle.match(/(?:Chapter|Unit)\s+(\d+)/i);
      if (idMatch) num = idMatch[1];
      else if (titleMatch) num = titleMatch[1];
      if (num) {
        return { url: `/Class10_Maths_Ch${num}_Notes.pdf`, name: `Class10_Maths_Ch${num}_Notes.pdf` };
      }
    }

    // Class 10 Science
    if (isCl10 && (subId === "science-10" || sTitle === "Science")) {
      if (chId === "sci10-ch1" || title.includes("physics")) return { url: "/Class10_Science_Physics_Notes.pdf", name: "Class10_Science_Physics_Notes.pdf" };
      if (chId === "sci10-ch2" || title.includes("chemistry")) return { url: "/Class10_Science_Chemistry_Notes.pdf", name: "Class10_Science_Chemistry_Notes.pdf" };
      if (chId === "sci10-ch3" || title.includes("biology")) return { url: "/Class10_Science_Biology_Notes.pdf", name: "Class10_Science_Biology_Notes.pdf" };
      if (chId === "sci10-ch4" || title.includes("computer science") || title.includes("compsci")) return { url: "/Class10_Science_CompSci_Notes.pdf", name: "Class10_Science_CompSci_Notes.pdf" };
    }

    // Class 11 Maths
    if (isCl11 && (subId.startsWith("maths-11") || sTitle.startsWith("Mathematics"))) {
      const vol = (subId.includes("v1") || sTitle.includes("Volume 1")) ? "1" : "2";
      let num = "";
      const idMatch = chId.match(/ch(\d+)/i);
      const titleMatch = chapterTitle.match(/(?:Chapter|Unit)\s+(\d+)/i);
      if (idMatch) num = idMatch[1];
      else if (titleMatch) num = titleMatch[1];
      if (num) {
        return { url: `/Class11_Maths_Vol${vol}_Ch${num}_Notes.pdf`, name: `Class11_Maths_Vol${vol}_Ch${num}_Notes.pdf` };
      }
    }

    // Class 11 Physics
    if (isCl11 && (subId.startsWith("physics-11") || sTitle.startsWith("Physics"))) {
      const vol = (subId.includes("v1") || sTitle.includes("Volume 1")) ? "1" : "2";
      let num = "";
      const idMatch = chId.match(/ch(\d+)/i);
      const titleMatch = chapterTitle.match(/(?:Chapter|Unit)\s+(\d+)/i);
      if (idMatch) num = idMatch[1];
      else if (titleMatch) num = titleMatch[1];
      if (num) {
        return { url: `/Class11_Physics_Vol${vol}_Ch${num}_Notes.pdf`, name: `Class11_Physics_Vol${vol}_Ch${num}_Notes.pdf` };
      }
    }

    // Class 11 Chemistry
    if (isCl11 && (subId.startsWith("chemistry-11") || sTitle.startsWith("Chemistry"))) {
      const vol = (subId.includes("v1") || sTitle.includes("Volume 1")) ? "1" : "2";
      let num = "";
      const idMatch = chId.match(/ch(\d+)/i);
      const titleMatch = chapterTitle.match(/(?:Chapter|Unit)\s+(\d+)/i);
      if (idMatch) num = idMatch[1];
      else if (titleMatch) num = titleMatch[1];
      if (num) {
        return { url: `/Class11_Chemistry_Vol${vol}_Ch${num}_Notes.pdf`, name: `Class11_Chemistry_Vol${vol}_Ch${num}_Notes.pdf` };
      }
    }

    // Class 12 Maths
    if (isCl12 && (subId.startsWith("maths-12") || sTitle.startsWith("Mathematics"))) {
      const vol = (subId.includes("v1") || sTitle.includes("Volume 1")) ? "1" : "2";
      let num = "";
      const idMatch = chId.match(/ch(\d+)/i);
      const titleMatch = chapterTitle.match(/(?:Chapter|Unit)\s+(\d+)/i);
      if (idMatch) num = idMatch[1];
      else if (titleMatch) num = titleMatch[1];
      if (num) {
        return { url: `/Class12_Maths_Vol${vol}_Ch${num}_Notes.pdf`, name: `Class12_Maths_Vol${vol}_Ch${num}_Notes.pdf` };
      }
    }

    // Class 12 Physics
    if (isCl12 && (subId.startsWith("physics-12") || sTitle.startsWith("Physics"))) {
      const vol = (subId.includes("v1") || sTitle.includes("Volume 1")) ? "1" : "2";
      let num = "";
      const idMatch = chId.match(/ch(\d+)/i);
      const titleMatch = chapterTitle.match(/(?:Chapter|Unit)\s+(\d+)/i);
      if (idMatch) num = idMatch[1];
      else if (titleMatch) num = titleMatch[1];
      if (num) {
        return { url: `/Class12_Physics_Vol${vol}_Ch${num}_Notes.pdf`, name: `Class12_Physics_Vol${vol}_Ch${num}_Notes.pdf` };
      }
    }

    // Class 12 Chemistry
    if (isCl12 && (subId.startsWith("chemistry-12") || sTitle.startsWith("Chemistry"))) {
      const vol = (subId.includes("v1") || sTitle.includes("Volume 1")) ? "1" : "2";
      let num = "";
      const idMatch = chId.match(/ch(\d+)/i);
      const titleMatch = chapterTitle.match(/(?:Chapter|Unit)\s+(\d+)/i);
      if (idMatch) num = idMatch[1];
      else if (titleMatch) num = titleMatch[1];
      if (num) {
        return { url: `/Class12_Chemistry_Vol${vol}_Ch${num}_Notes.pdf`, name: `Class12_Chemistry_Vol${vol}_Ch${num}_Notes.pdf` };
      }
    }

    return {
      url: topicPdfUrl || "/adjoint_inverse_rank_notes.pdf",
      name: topicPdfUrl ? topicPdfUrl.substring(topicPdfUrl.lastIndexOf("/") + 1) : "adjoint_inverse_rank_notes.pdf"
    };
  };

  // Read PDF from query parameter if redirected from direct access
  const getPdfUrlFromQuery = () => {
    try {
      const hash = window.location.hash;
      if (hash.includes("?")) {
        const queryStr = hash.substring(hash.indexOf("?"));
        const urlParams = new URLSearchParams(queryStr);
        const pdfParam = urlParams.get("pdf");
        if (pdfParam) {
          return decodeURIComponent(pdfParam);
        }
      }
    } catch (e) {
      console.error("Failed to parse query params:", e);
    }
    return null;
  };

  const pdfQueryUrl = getPdfUrlFromQuery();
  const pdfInfo = getTopicPdfInfo(activeChapter.title, activeTopic.pdfUrl);

  const displayPdfUrl = pdfQueryUrl || pdfInfo.url;
  const displayPdfName = pdfQueryUrl ? displayPdfUrl.substring(displayPdfUrl.lastIndexOf("/") + 1) : pdfInfo.name;

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-950 text-white select-none relative overflow-hidden" onContextMenu={(e) => e.preventDefault()}>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            display: none !important;
          }
        }
      `}} />

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-900/95 border-b border-white/5 z-20 shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView("course-view")}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-xs font-bold active:scale-95 border border-white/5 hover:border-white/10 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Lecture</span>
          </button>
          <div className="h-6 w-px bg-white/10" />
          <div className="text-left">
            <h1 className="text-sm font-black text-white leading-none">
              {displayPdfName}
            </h1>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1.5">
              {activeSubject.title} • {activeChapter.title} • {activeTopic.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[9px] bg-amber-500/10 text-amber-400 font-black border border-amber-500/20 px-3.5 py-2 rounded-xl uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Secure Preview Only (Download Disabled)</span>
          </span>
        </div>
      </div>

      {/* Content Viewport */}
      <div className="flex-1 relative w-full h-[calc(100vh-68px)] overflow-hidden bg-slate-950">
        {/* Secure PDF embed */}
        <iframe
          src={`${displayPdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
          className="w-full h-full border-0"
          title="Notes Fullscreen Preview"
        />
      </div>
    </div>
  );
};
