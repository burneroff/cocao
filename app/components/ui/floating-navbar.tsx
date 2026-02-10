"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import BurgerMenu from "../BurgerMenu";
import { vacancies } from "@/app/vacancies/data";

const sections = [
  { id: "us", label: "US", bgColor: "bg-[#080808]" },
  { id: "mission", label: "Mission", bgColor: "bg-[#000000]" },
  { id: "products", label: "Products", bgColor: "bg-[#dadada]" },
  { id: "values", label: "Values", bgColor: "bg-[#080808]" },
  { id: "team", label: "Team", bgColor: "bg-[#dadada]" },
  { id: "contacts", label: "Contacts", bgColor: "bg-[#dadada]" },
];

export const FloatingNav = ({
  className,
  isLoaded = false,
}: {
  className?: string;
  isLoaded?: boolean;
}) => {
  const hasVacancies = Array.isArray(vacancies) && vacancies.length > 0;
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("us");
  const [currentBgColor, setCurrentBgColor] = useState("bg-black");
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if (!isMobile) {
        // Отправляем событие перед программной прокруткой, чтобы Values знал об этом
        window.dispatchEvent(
          new CustomEvent("programmatic-scroll-start", {
            detail: { targetId: id },
          }),
        );
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const offsetTop = Math.max(0, elementTop - 60);
      window.scrollTo({ top: offsetTop, behavior: "auto" });
    }
  };

  // Проверяем, мобильное ли устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Определяем активную секцию через IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionIntersections = new Map<string, number>();

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const sectionId = Object.keys(sectionRefs.current).find(
          (id) => sectionRefs.current[id] === entry.target,
        );

        if (sectionId) {
          if (entry.isIntersecting) {
            sectionIntersections.set(sectionId, entry.intersectionRatio);
          } else {
            sectionIntersections.delete(sectionId);
          }
        }
      });

      // Находим секцию с максимальным intersection ratio
      let maxRatio = 0;
      let activeId = sections[0].id;

      sectionIntersections.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          activeId = id;
        }
      });

      if (maxRatio > 0) {
        setActiveSection(activeId);
        const activeSectionData = sections.find((s) => s.id === activeId);
        if (activeSectionData) {
          setCurrentBgColor(activeSectionData.bgColor);
        }
      }
    };

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element && element instanceof HTMLDivElement) {
        sectionRefs.current[section.id] = element;
        const observer = new IntersectionObserver(handleIntersection, {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          rootMargin: "-10% 0px -10% 0px",
        });
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Отслеживание направления скролла (только для мобилок)
  useEffect(() => {
    // На десктопе всегда показываем статично
    if (!isMobile) {
      setVisible(true);
      return;
    }

    // На мобилках всегда показываем
    setVisible(true);
  }, [isMobile]);

  // Определяем финальное состояние для анимации
  // На десктопе всегда показываем статично, на мобилках - по логике скролла
  const shouldShow = isLoaded && (!isMobile || visible);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: isMobile ? -100 : 0,
        }}
        animate={{
          y: isMobile ? (shouldShow ? 0 : -100) : 0,
          opacity: shouldShow ? 1 : 0,
        }}
        transition={{
          duration: isMobile ? 0.8 : 0.5,
          delay: 0,
          ease: "easeInOut",
        }}
        className={cn(
          "flex max-w-full w-full mx-auto",
          isMobile
            ? "fixed top-0 left-0 right-0"
            : "absolute top-0 left-0 right-0",
          " z-5000 px-0 md:px-4 pt-4 items-center justify-between",
          "transition-colors duration-500 ease-in-out",
          isMobile ? `${currentBgColor} h-[60px] border-b` : "",
          className,
        )}
        style={
          isMobile
            ? {
              borderBottomColor:
                currentBgColor === "bg-[#dadada]" ? "#CDCDCD" : "#3F3E3D",
            }
            : undefined
        }
      >
        <div className="flex-1 pl-[16px]">
          {!isMenuOpen && (
            <>
              {/* Mobile: показываем активную секцию */}
              <div className="md:hidden">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(true)}
                  className="flex items-center"
                  aria-label="Open menu"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSection}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex items-center gap-0 font-medium text-[22px] leading-[30px] text-[#0100F4] uppercase"
                    >
                      <span className="inline-block opacity-100 translate-x-0 text-[#0100F4] w-auto">
                        ›
                      </span>
                      <span>
                        {sections.find((s) => s.id === activeSection)?.label ||
                          "US"}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </button>
              </div>
              {/* Desktop: показываем Cacao Mobile */}
              <div className="hidden md:block">
                <span className="text-[#9F9B96] font-medium text-[clamp(16px,1.5vw,24px)]">
                  Cacao Mobile
                </span>
              </div>
            </>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="https://apps.apple.com/us/developer/cacao-mobile/id1612079536"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-2 overflow-hidden"
          >
            <span className="relative z-10 text-[#9F9B96] font-medium text-[clamp(16px,1.5vw,24px)]">
              AppStore
            </span>
            <span className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </Link>
          <Link
            href="https://pl.linkedin.com/company/cacao-mobile-sp-z-o-o"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-2 overflow-hidden"
          >
            <span className="relative z-10 text-[#9F9B96] font-medium text-[clamp(16px,1.5vw,24px)]">
              LinkedIn
            </span>
            <span className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </Link>

          <Link
            href="mailto:hr@cacao-mobile.com"
            className="group relative px-2 overflow-hidden"
          >
            <span className="relative z-10 text-[#9F9B96] font-medium text-[clamp(16px,1.5vw,24px)]">
              Email
            </span>
            <span className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </Link>
          {hasVacancies ? (
            <Link
              href="/vacancies"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-2 overflow-hidden"
            >
              <span className="relative z-10 text-[#9F9B96] font-medium text-[clamp(16px,1.5vw,24px)]">
                Vacancies
              </span>
              <span className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </Link>
          ) : (
            <Link
              href="https://t.me/kirill_svc"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-2 overflow-hidden"
            >
              <span className="relative z-10 text-[#9F9B96] font-medium text-[clamp(16px,1.5vw,24px)]">
                Telegram
              </span>
              <span className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </Link>
          )}
        </nav>

        {/* Mobile Burger Menu */}
        <div className="md:hidden pr-[16px]">
          <BurgerMenu
            scrollToSection={scrollToSection}
            onMenuToggle={setIsMenuOpen}
            isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}
            iconColor="#9F9B96"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
