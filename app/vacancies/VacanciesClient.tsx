"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

import { vacancies } from "./data";

export default function VacanciesClient() {
  const [activeId, setActiveId] = useState(vacancies[0]?.id ?? "");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.setProperty("--background", "#1F1F23");
    document.body.style.background = "#1F1F23";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      requestAnimationFrame(() => {
        if (contentRef.current) {
          contentRef.current.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      });
    }
  }, [activeId]);

  const activeVacancy = useMemo(
    () => vacancies.find((vacancy) => vacancy.id === activeId),
    [activeId]
  );

  return (
    <div className="relative flex h-screen bg-[#1F1F23] text-[#DADADA] overflow-hidden">
      <header
        className="fixed top-0 left-0 right-0 bg-[#1F1F23] border-b border-[#35353C] z-30"
        style={{ borderWidth: "1px" }}
      >
        <div className="px-5 py-6">
          <div className="hidden md:flex items-center gap-2 2xl:ml-3">
            <h1 className="text-[16px] text-[#9F9B96]">Vacancies</h1>
          </div>

          <div className="md:hidden">
            <div className="overflow-x-auto -mx-5 px-5 scrollbar-hide">
              <div className="flex items-center gap-4 min-w-max">
                {vacancies.map((vacancy) => {
                  const isActive = activeId === vacancy.id;
                  return (
                    <button
                      key={vacancy.id}
                      onClick={() => setActiveId(vacancy.id)}
                      className="text-[16px] uppercase whitespace-nowrap relative inline-flex items-center justify-center"
                      style={{
                        color: "#FAFAFA",
                        backgroundColor: isActive ? "#0100F4" : "transparent",
                        border: "1px solid #FAFAFA",
                        fontWeight: isActive ? "bold" : "normal",
                        borderRadius: "30px",
                        padding: "8px 12px",
                        height: "34px",
                        boxSizing: "border-box",
                        transition:
                          "background-color 0.3s ease, border-color 0.3s ease",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          visibility: "hidden",
                          display: "inline-block",
                        }}
                      >
                        {vacancy.title}
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {vacancy.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className="fixed left-0 right-0 z-20 pointer-events-none"
        style={{
          top: "73px",
          height: "40px",
          width: "100%",
          background: "linear-gradient(to bottom, #1F1F23, #1F1F2300)",
        }}
      />

      <div className="sticky top-0 h-screen w-1/2 px-8 pt-12 pb-8 z-20 pointer-events-none shrink-0 hidden md:block md:mt-[35px] 2xl:mt-[43px]">
        <div className="flex h-full flex-col justify-start gap-2 pointer-events-auto pt-8">
          {vacancies.map((vacancy) => {
            const isActive =
              activeId === vacancy.id || hoveredId === vacancy.id;
            return (
              <button
                key={vacancy.id}
                onClick={() => setActiveId(vacancy.id)}
                onMouseEnter={() => {
                  if (activeId !== vacancy.id) {
                    setHoveredId(vacancy.id);
                  }
                }}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  lineHeight: "clamp(52px, 7vw, 70px)",
                  color: isActive ? "#0100F4" : "#9F9B96",
                  backgroundImage: "none",
                  transition: "color 0.5s ease-in-out",
                }}
                className="flex items-center gap-0 text-left text-[clamp(48px,6vw,70px)] font-semibold uppercase"
              >
                <span
                  className={`inline-block transition-all duration-1000 ease-in-out ${isActive
                    ? "opacity-100 translate-x-0 text-[#0100F4] w-auto"
                    : "opacity-0 -translate-x-4 w-0 overflow-hidden"
                    }`}
                >
                  ›
                </span>
                <span
                  style={{
                    transform: "translateX(0)",
                    opacity: 1,
                  }}
                >
                  {vacancy.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div
          ref={contentRef}
          className="h-screen overflow-y-auto px-6 md:px-0 pb-32 pt-[110px] md:pt-[110px]"
        >
          <AnimatePresence mode="wait">
            {activeVacancy ? (
              <motion.div
                key={activeId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full max-w-[860px]"
              >
                <h1 className="text-[clamp(32px,4vw,56px)] font-semibold uppercase text-white">
                  {activeVacancy.title}
                </h1>
                <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide">
                  <span className="border border-[#DADADA] px-3 py-1">
                    {activeVacancy.location}
                  </span>
                  <span className="border border-[#DADADA] px-3 py-1">
                    {activeVacancy.type}
                  </span>
                </div>

                <p className="mt-6 text-[18px] leading-relaxed">
                  {activeVacancy.summary}
                </p>

                <section className="mt-8">
                  <h2 className="text-[22px] font-medium uppercase text-white">
                    Responsibilities
                  </h2>
                  <ul className="mt-3 list-disc space-y-2 pl-6 text-[17px]">
                    {activeVacancy.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section className="mt-8">
                  <h2 className="text-[22px] font-medium uppercase text-white">
                    Requirements
                  </h2>
                  <ul className="mt-3 list-disc space-y-2 pl-6 text-[17px]">
                    {activeVacancy.requirements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section className="mt-8">
                  <h2 className="text-[22px] font-medium uppercase text-white">
                    We Offer
                  </h2>
                  <ul className="mt-3 list-disc space-y-2 pl-6 text-[17px]">
                    {activeVacancy.perks.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mx-auto w-full max-w-[860px] text-[18px]"
              >
                Select a vacancy to see the full description.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div
        className="fixed left-0 right-0 z-20 pointer-events-none bottom-0 md:bottom-[60px]"
        style={{
          height: "40px",
          width: "100%",
          background: "linear-gradient(to top, #1F1F23, #1F1F2300)",
        }}
      />

      {/* Footer - Desktop */}
      <footer
        className="hidden md:block fixed bottom-0 left-0 right-0 bg-[#1F1F23] border-t border-[#35353C] z-30"
        style={{ borderWidth: "1px" }}
      >
        <div className="px-6 md:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-[120px]">
            <span className="text-[clamp(16px,2vw,20px)] font-medium text-[#DADADA]">
              Our contacts regarding vacancies
            </span>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-[clamp(16px,2vw,20px)] font-medium overflow-hidden"
              >
                <span className="relative z-10 text-[#DADADA] transition-colors">
                  Telegram
                </span>
                <span className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-[clamp(16px,2vw,20px)] font-medium overflow-hidden"
              >
                <span className="relative z-10 text-[#DADADA] transition-colors">
                  LinkedIn
                </span>
                <span className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
              <a
                href="mailto:hr@cacao-mobile.com"
                className="group relative text-[clamp(16px,2vw,20px)] font-medium overflow-hidden"
              >
                <span className="relative z-10 text-[#DADADA] transition-colors">
                  hr@cacao-mobile.com
                </span>
                <span className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer - Mobile: 3 кнопки в абсолютном позиционировании */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 px-4 pb-4">
        <div className="flex items-center align gap-3">
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[16px] uppercase whitespace-nowrap relative inline-flex items-center justify-center"
            style={{
              color: "#FAFAFA",
              backgroundColor: "gray",
              border: "1px solid #FAFAFA",
              fontWeight: "bold",
              borderRadius: "30px",
              padding: "8px 12px",
              height: "34px",
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                visibility: "hidden",
                display: "inline-block",
              }}
            >
              Tg
            </span>
            <span
              style={{
                position: "absolute",
                whiteSpace: "nowrap",
              }}
            >
              Tg
            </span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[16px] uppercase whitespace-nowrap relative inline-flex items-center justify-center"
            style={{
              color: "#FAFAFA",
              backgroundColor: "gray",
              border: "1px solid #FAFAFA",
              fontWeight: "bold",
              borderRadius: "30px",
              height: "34px",
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                visibility: "hidden",
                display: "inline-block",
              }}
            >
              LinkedIn
            </span>
            <span
              style={{
                position: "absolute",
                whiteSpace: "nowrap",
              }}
            >
              Lin
            </span>
          </a>
          <a
            href="mailto:hr@cacao-mobile.com"
            className="text-[16px] uppercase whitespace-nowrap relative inline-flex items-center justify-center"
            style={{
              color: "#FAFAFA",
              backgroundColor: "gray",
              border: "1px solid #FAFAFA",
              fontWeight: "bold",
              borderRadius: "30px",
              padding: "8px 12px",
              height: "34px",
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                visibility: "hidden",
                display: "inline-block",
              }}
            >
              Email
            </span>
            <span
              style={{
                position: "absolute",
                whiteSpace: "nowrap",
              }}
            >
              Email
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
