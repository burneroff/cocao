"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

import { vacancies } from "../vacancies/data";

const sections = [
  {
    id: "us",
    label: "US",
    bgColor: "bg-[#080808]",
  },
  {
    id: "mission",
    label: "Mission",
    bgColor: "bg-[#000000]",
  },
  {
    id: "products",
    label: "Products",
    bgColor: "bg-[#dadada]",
  },
  {
    id: "values",
    label: "Values",
    bgColor: "bg-[#080808]",
  },
  {
    id: "team",
    label: "Team",
    bgColor: "bg-[#dadada]",
  },
  {
    id: "contacts",
    label: "Contacts",
    bgColor: "bg-[#dadada]",
  },
];

interface BurgerMenuProps {
  scrollToSection: (id: string) => void;
  onMenuToggle?: (isOpen: boolean) => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  iconColor?: string;
}

export default function BurgerMenu({
  scrollToSection,
  onMenuToggle,
  isOpen: controlledIsOpen,
  setIsOpen: setControlledIsOpen,
  iconColor,
}: BurgerMenuProps) {
  const hasVacancies = Array.isArray(vacancies) && vacancies.length > 0;
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen ?? internalIsOpen;
  const setIsOpen = setControlledIsOpen ?? setInternalIsOpen;
  const [activeSection, setActiveSection] = useState("us");
  const [currentBgColor, setCurrentBgColor] = useState("bg-[#080808]");
  const [clickedSection, setClickedSection] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Определяем активную секцию через IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionIntersections = new Map<string, number>();

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const sectionId = Object.keys(sectionRefs.current).find(
          (id) => sectionRefs.current[id] === entry.target
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

  const setMenuState = (nextState: boolean) => {
    setIsOpen(nextState);
    document.body.style.overflow = nextState ? "hidden" : "auto";
    if (!nextState) {
      // Очищаем состояние клика при закрытии меню
      setClickedSection(null);
    }
    if (onMenuToggle) {
      onMenuToggle(nextState);
    }
  };

  const toggleMenu = () => {
    setMenuState(!isOpen);
  };

  const handleNavClick = (id: string) => {
    setClickedSection(id);
    scrollToSection(id);
    setMenuState(false);
    // Очищаем состояние клика после небольшой задержки, чтобы стили успели примениться
    setTimeout(() => {
      setClickedSection(null);
    }, 500);
  };

  const textColor = "#9F9B96"
  const menuIconColor = iconColor ?? textColor;
  const menuItemCount = sections.length + 1;
  const menuHeight = `calc(50% * ${menuItemCount / sections.length})`;

  return (
    <>
      {/* Burger Button */}
      <button
        onClick={toggleMenu}
        className="relative z-50 flex flex-col items-start justify-center w-12 h-12 mr-[12px]"
        aria-label="Toggle menu"
      >
        <span
          className="block h-[2px] w-[40px] mb-2 transition-colors duration-500"
          style={{ backgroundColor: menuIconColor }}
        />
        <span
          className="block h-[2px] w-[60px] transition-colors duration-500"
          style={{ backgroundColor: menuIconColor }}
        />
      </button>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={toggleMenu}
      >
        {/* Menu Content - выезжает от границы floating-navbar */}
        <div
          className={`absolute left-0 right-0 ${currentBgColor} transition-all duration-500 ease-in-out ${isOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          style={{
            top: "60px", // Высота floating-navbar
            height: menuHeight,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Navigation Links */}
          <nav className="flex flex-col h-full justify-start mt-[-46px] gap-0 pb-8">
            {sections.map((section, index) => {
              const isActive = activeSection === section.id || clickedSection === section.id;
              const isClicked = clickedSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className={`group relative text-left overflow-hidden py-2 pl-[16px] transition-colors duration-300 ${isClicked ? "bg-[#9F9B96] md:bg-transparent" : ""}`}
                >
                  <div className="flex items-center gap-0">
                    {/* Arrow indicator */}
                    <span
                      className={`inline-block transition-all duration-500 ease-in-out text-[22px] leading-[30px] tracking-[0] font-medium ${isActive
                        ? "opacity-100 translate-x-0 text-[#0100F4] w-auto"
                        : "opacity-0 -translate-x-4 w-0 overflow-hidden"
                        }`}
                    >
                      ›
                    </span>

                    {/* Label */}
                    <span
                      className={`text-[22px] leading-[30px] tracking-[0] font-medium uppercase transition-colors duration-500 ${isActive ? "text-[#0100F4]" : ""
                        }`}
                      style={!isActive ? { color: textColor } : {}}
                    >
                      {section.label}
                    </span>
                  </div>

                  {/* Underline - всегда видна с цветом текста, не выделяется синим */}
                  <div
                    className="absolute left-0 bottom-0 h-px w-full transition-all duration-500"
                    style={{ backgroundColor: textColor }}
                  />
                </button>
              );
            })}
            {hasVacancies ? (
              <Link
                href="/vacancies"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-left overflow-hidden py-2 pl-[16px]"
                style={{ color: textColor }}
              >
                <div className="flex items-center gap-0">
                  <span className="text-[22px] leading-[30px] tracking-[0] font-medium uppercase transition-colors duration-500">
                    Vacancies
                  </span>
                </div>
                <div
                  className="absolute left-0 bottom-0 h-px w-full transition-all duration-500"
                  style={{ backgroundColor: textColor }}
                />
              </Link>
            ) : (
              <Link
                href="https://t.me/kirill_svc"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-left overflow-hidden py-2 pl-[16px]"
                style={{ color: textColor }}
              >
                <div className="flex items-center gap-0">
                  <span className="text-[22px] leading-[30px] tracking-[0] font-medium uppercase transition-colors duration-500">
                    Telegram
                  </span>
                </div>
                <div
                  className="absolute left-0 bottom-0 h-px w-full transition-all duration-500"
                  style={{ backgroundColor: textColor }}
                />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
