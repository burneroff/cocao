"use client";

import { useEffect, useRef, useState } from "react";
import US from "./sections/US";
import Mission from "./sections/Mission";
import Products from "./sections/Products";
import Values from "./sections/Values";
import Team from "./sections/Team";
import Contacts from "./sections/Contacts";

const sections = [
  {
    id: "us",
    label: "US",
    component: US,
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    id: "mission",
    label: "Mission",
    component: Mission,
    bgColor: "bg-[#dadada]",
    textColor: "text-black",
  },
  {
    id: "products",
    label: "Products",
    component: Products,
    bgColor: "bg-[#dadada]",
    textColor: "text-black",
  },
  {
    id: "values",
    label: "Values",
    component: Values,
    bgColor: "bg-[red]",
    textColor: "text-black",
  },
  {
    id: "team",
    label: "Team",
    component: Team,
    bgColor: "bg-[#dadada]",
    textColor: "text-black",
  },
  {
    id: "contacts",
    label: "Contacts",
    component: Contacts,
    bgColor: "bg-[#dadada]",
    textColor: "text-black",
  },
];

export default function NavigationSection() {
  const [activeSection, setActiveSection] = useState("us");
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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
      }
    };

    sections.forEach((section) => {
      const observer = new IntersectionObserver(handleIntersection, {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: "-10% 0px -10% 0px",
      });

      const element = sectionRefs.current[section.id];
      if (element) {
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative flex overflow-hidden">
      {/* Left Navigation - sticky внутри NavigationSection */}
      <div className="sticky top-0 h-screen w-1/3 px-8 py-8 z-20 pointer-events-none shrink-0">
        <div className="flex h-full flex-col justify-center gap-0 pointer-events-auto mt-5  ">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              onMouseEnter={() => {
                if (activeSection !== section.id) {
                  setHoveredId(section.id);
                }
              }}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                lineHeight: "100px",
                color:
                  activeSection === section.id
                    ? "#0100F4"
                    : hoveredId === section.id
                    ? "#ffffff"
                    : "#9F9B96",

                backgroundImage:
                  activeSection !== section.id
                    ? "linear-gradient(to bottom, transparent 0%, transparent 50%, #0100F4 50%, #0100F4 100%)"
                    : "none",

                backgroundSize:
                  hoveredId === section.id && activeSection !== section.id
                    ? "100% 95px"
                    : "0% 95px",

                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 bottom",

                transition:
                  "background-size 0.5s ease-in-out, color 0.5s ease-in-out",
              }}
              className="flex items-center gap-0 text-left text-[100px] font-semibold uppercase"
            >
              <span
                className={`inline-block transition-all duration-500 ease-in-out ${
                  activeSection === section.id
                    ? "opacity-100 translate-x-0 text-[#0100F4] w-auto"
                    : "opacity-0 -translate-x-4 w-0 overflow-hidden"
                }`}
              >
                ›
              </span>

              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Content - фон на всю ширину, контент справа */}
      <div className="flex-1 -ml-[33.333333%]">
        {sections.map((section) => {
          const SectionComponent = section.component;
          const sectionData = sections.find((s) => s.id === section.id);
          return (
            <div
              key={section.id}
              ref={(el) => {
                sectionRefs.current[section.id] = el;
              }}
              id={section.id}
              className={`relative z-10 ${sectionData?.bgColor || "bg-white"}`}
              style={{ width: "100vw" }}
            >
              <div className="ml-[33.333333%]">
                <SectionComponent />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
