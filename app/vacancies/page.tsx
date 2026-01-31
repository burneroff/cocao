"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";

type Vacancy = {
  id: string;
  title: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
};

const vacancies: Vacancy[] = [
  {
    id: "product-manager",
    title: "Product Manager",
    location: "Warszawa, Poland",
    type: "Full-time",
    summary:
      "Own the mobile product roadmap, align business goals with user needs, and ship measurable improvements in short cycles.",
    responsibilities: [
      "Define product strategy and quarterly roadmap with stakeholders.",
      "Translate insights into clear specs, PRDs, and success metrics.",
      "Coordinate delivery with design, engineering, and QA.",
      "Analyze product performance and iterate on features.",
    ],
    requirements: [
      "4+ years of product management in mobile or SaaS.",
      "Experience with discovery, analytics, and A/B testing.",
      "Strong communication and prioritization skills.",
      "English B2+; Polish is a plus.",
    ],
    perks: [
      "Hybrid work in Warszawa",
      "Flexible schedule",
      "Personal growth budget",
      "Top-tier hardware",
    ],
  },
  {
    id: "ios-engineer",
    title: "Senior iOS Engineer",
    location: "Remote or Warszawa",
    type: "Full-time",
    summary:
      "Build and scale a polished iOS experience, contribute to architecture decisions, and mentor the team.",
    responsibilities: [
      "Develop new features in Swift and SwiftUI.",
      "Improve performance, reliability, and app stability.",
      "Collaborate with backend and product teams on APIs.",
      "Review code and mentor mid-level engineers.",
    ],
    requirements: [
      "5+ years of iOS development experience.",
      "Strong knowledge of Swift, Combine, and modern iOS tooling.",
      "Experience with CI/CD and modular architectures.",
      "Comfortable working with analytics and crash tools.",
    ],
    perks: [
      "Remote-friendly team",
      "Conference and training support",
      "Private healthcare",
      "Annual performance bonus",
    ],
  },
  {
    id: "qa-engineer",
    title: "QA Engineer",
    location: "Warszawa, Poland",
    type: "Full-time",
    summary:
      "Own testing strategy for mobile releases, automate critical flows, and ensure high-quality launches.",
    responsibilities: [
      "Create and maintain test plans for mobile releases.",
      "Automate regression tests for key user journeys.",
      "Validate fixes, reproduce bugs, and report issues.",
      "Partner with engineering on quality improvements.",
    ],
    requirements: [
      "3+ years in QA for mobile or web products.",
      "Hands-on experience with test automation tools.",
      "Strong attention to detail and communication.",
      "Understanding of release pipelines.",
    ],
    perks: [
      "Modern QA stack",
      "Career growth path",
      "Team offsites",
      "Healthy work-life balance",
    ],
  },
];

export default function VacanciesPage() {
  const [activeId, setActiveId] = useState(vacancies[0]?.id ?? "");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.setProperty("--background", "#1F1F23");
    document.body.style.background = "#1F1F23";
  }, []);

  // Прокручиваем контент в начало при смене вакансии (синхронно с анимацией)
  useEffect(() => {
    if (contentRef.current) {
      // Используем requestAnimationFrame для синхронизации с анимацией
      requestAnimationFrame(() => {
        if (contentRef.current) {
          contentRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
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
    <div className="relative min-h-screen bg-[#1F1F23] text-[#DADADA] md:grid md:grid-cols-[360px_1fr]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#1F1F23] border-b border-[#35353C] z-30" style={{ borderWidth: '1px' }}>
        <div className="px-5 py-6">
          {/* Desktop: стрелка + заголовок */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/" className="text-white hover:text-[#0100F4] transition-colors">
              <IconArrowLeft size={36} strokeWidth={2.5} />
            </Link>
            <h1 className="text-[clamp(20px,3vw,32px)] font-semibold uppercase text-white">
              Vacancies
            </h1>
          </div>

          {/* Mobile: стрелка + горизонтально скроллируемый список вакансий */}
          <div className="md:hidden">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-white hover:text-[#0100F4] transition-colors">
                <IconArrowLeft size={36} strokeWidth={2.5} />
              </Link>
              <h1 className="text-[28px] font-semibold uppercase text-white">
                Vacancies
              </h1>
            </div>
            <div className="overflow-x-auto -mx-5 px-5 scrollbar-hide">
              <div className="flex items-center gap-4 min-w-max">
                {vacancies.map((vacancy) => {
                  const isActive = activeId === vacancy.id;
                  return (
                    <button
                      key={vacancy.id}
                      onClick={() => setActiveId(vacancy.id)}
                      className={`text-[16px] font-semibold uppercase whitespace-nowrap transition-colors ${isActive ? "text-[#0100F4]" : "text-[#9F9B96]"
                        }`}
                    >
                      {vacancy.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mt-20 stickymd:top-[81px] h-[calc(100vh-73px)] md:h-[calc(100vh-81px)] px-8 pt-10 pb-8 z-20 pointer-events-none hidden md:block min-w-0">
        <div className="flex h-full w-full flex-col justify-start gap-3 pointer-events-auto min-w-0">
          {vacancies.map((vacancy) => {
            const isActive = activeId === vacancy.id || hoveredId === vacancy.id;
            return (
              <button
                key={vacancy.id}
                onClick={() => setActiveId(vacancy.id)}
                onMouseEnter={() => setHoveredId(vacancy.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  color: isActive ? "#0100F4" : "#9F9B96",
                  transition: "color 0.4s ease-in-out",
                }}
                className="flex w-full items-center gap-2 text-left text-[clamp(25px,2.6vw,40px)] font-semibold uppercase min-w-0"
              >
                <span
                  className={`inline-flex w-6 shrink-0 items-center justify-center transition-all duration-400 ease-in-out ${isActive
                    ? "opacity-100 translate-x-0 text-[#0100F4]"
                    : "opacity-0 -translate-x-2"
                    }`}
                >
                  ›
                </span>
                <span className="block min-w-0 flex-1 whitespace-nowrap">
                  {vacancy.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1">
        <div>
          <div ref={contentRef} className="h-screen overflow-y-auto px-6 pb-32 pt-[140px] md:pt-[110px] min-[1000px]:ml-42 xl:px-12">
            <AnimatePresence mode="wait">
              {activeVacancy ? (
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="mx-auto w-full max-w-[860px]"
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
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#1F1F23] border-t border-[#35353C] z-30" style={{ borderWidth: '1px' }}>
        <div className="px-6 md:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
    </div>
  );
}
