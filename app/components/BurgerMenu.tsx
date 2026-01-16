"use client";

import { useState, useEffect, useRef } from "react";

const sections = [
  {
    id: "us",
    label: "US",
    bgColor: "bg-[#080808]",
  },
  {
    id: "mission",
    label: "Mission",
    bgColor: "bg-[#dadada]",
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
}

export default function BurgerMenu({ scrollToSection, onMenuToggle }: BurgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    document.body.style.overflow = newState ? "hidden" : "auto";
    if (!newState) {
      // Очищаем состояние клика при закрытии меню
      setClickedSection(null);
    }
    if (onMenuToggle) {
      onMenuToggle(newState);
    }
  };

  const handleNavClick = (id: string) => {
    setClickedSection(id);
    scrollToSection(id);
    setIsOpen(false);
    document.body.style.overflow = "auto";
    if (onMenuToggle) {
      onMenuToggle(false);
    }
    // Очищаем состояние клика после небольшой задержки, чтобы стили успели примениться
    setTimeout(() => {
      setClickedSection(null);
    }, 500);
  };

  // Определяем цвет текста в зависимости от фона
  const getTextColor = () => {
    if (currentBgColor === "bg-[#dadada]") {
      return "#9F9B96";
    } else if (currentBgColor === "bg-[#080808]") {
      return "#3F3E3D";
    }
    return "#9F9B96"; // По умолчанию
  };

  const textColor = getTextColor();

  return (
    <>
      {/* Burger Button */}
      <button
        onClick={toggleMenu}
        className="relative z-50 flex flex-col items-end justify-end w-20 h-20 mb-[12px]"
        aria-label="Toggle menu"
      >
        <span className="block h-[2px] w-12 mb-1 transition-colors duration-500" style={{ backgroundColor: textColor }} />
        <span className="block h-[2px] w-18 transition-colors duration-500" style={{ backgroundColor: textColor }} />
      </button>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      >
        {/* Menu Content - выезжает от границы floating-navbar */}
        <div
          className={`absolute left-0 right-0 h-1/2 ${currentBgColor} transition-all duration-500 ease-in-out ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{
            top: "80px", // Высота floating-navbar
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Navigation Links */}
          <nav className="flex flex-col h-full justify-center px-8 gap-0">
            {sections.map((section, index) => {
              const isActive = activeSection === section.id || clickedSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className="group relative text-left overflow-hidden py-2"
                >
                  <div className="flex items-center gap-0">
                    {/* Arrow indicator */}
                    <span
                      className={`inline-block transition-all duration-500 ease-in-out text-[clamp(48px,6vw,100px)] font-semibold ${
                        isActive
                          ? "opacity-100 translate-x-0 text-[#0100F4] w-auto"
                          : "opacity-0 -translate-x-4 w-0 overflow-hidden"
                      }`}
                    >
                      ›
                    </span>

                    {/* Label */}
                    <span
                      className={`text-[clamp(48px,6vw,100px)] font-semibold uppercase transition-colors duration-500 ${
                        isActive ? "text-[#0100F4]" : ""
                      }`}
                      style={!isActive ? { color: textColor } : {}}
                    >
                      {section.label}
                    </span>
                  </div>

                  {/* Underline - всегда видна, но активная более заметна */}
                  <div
                    className={`absolute left-0 bottom-0 h-px transition-all duration-500 ${
                      isActive ? "h-[2px] bg-[#0100F4] w-full" : "w-full opacity-50"
                    }`}
                    style={!isActive ? { backgroundColor: textColor } : {}}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
