"use client";

import { useEffect, useRef, useState } from "react";
import US from "./sections/US";
import Mission from "./sections/Mission";
import Products from "./sections/Products";
import Values from "./sections/Values";
import Team from "./sections/Team";
import Contacts from "./sections/Contacts";

// Компонент-обертка для секций с анимацией появления
const SectionWrapper = ({
  sectionId,
  sectionRefs,
  isMobile,
  bgColor,
  children,
}: {
  sectionId: string;
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  isMobile: boolean;
  bgColor: string;
  children: React.ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current);
      }
    };
  }, []);

  // Определяем стиль фона: для mission используем градиент, для остальных - обычный bgColor
  const backgroundStyle = 
    sectionId === "mission"
      ? { 
          background: "linear-gradient(to bottom, #000000 60%, #dadada 60%)",
          width: isMobile ? "100%" : "100vw"
        }
      : { width: isMobile ? "100%" : "100vw" };

  return (
    <div
      ref={(el) => {
        sectionRefs.current[sectionId] = el;
        wrapperRef.current = el;
      }}
      id={sectionId}
      className={`relative z-10 ${sectionId === "mission" ? "" : bgColor} transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={backgroundStyle}
    >
      <div className={isMobile ? "" : "pl-[33.333333%]"}>{children}</div>
    </div>
  );
};

// Тип для секции навигации
type SectionItem = {
  id: string;
  label: string;
  component: React.ComponentType;
  bgColor: string;
  textColor: string;
};

// Компонент для навигационных пунктов с анимацией
const NavItems = ({
  sections,
  activeSection,
  hoveredId,
  setHoveredId,
  scrollToSection,
}: {
  sections: SectionItem[];
  activeSection: string;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  scrollToSection: (id: string) => void;
}) => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Анимируем каждый пункт с задержкой
            sections.forEach((section, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => new Set(prev).add(section.id));
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (navRef.current) {
      observer.observe(navRef.current);
    }

    return () => {
      if (navRef.current) {
        observer.unobserve(navRef.current);
      }
    };
  }, []);

  return (
    <div ref={navRef} className="flex h-full flex-col justify-center gap-0 pointer-events-auto mt-5">
      {sections.map((section, index) => {
        const isVisible = visibleItems.has(section.id);
        return (
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
              lineHeight: "clamp(60px, 8vw, 100px)",
              color:
                activeSection === section.id || hoveredId === section.id
                  ? "#0100F4"
                  : "#9F9B96",

              backgroundImage: "none",

              transition: "color 0.5s ease-in-out",
            }}
            className="flex items-center gap-0 text-left text-[clamp(48px,6vw,100px)] font-semibold uppercase"
          >
            <span
              className={`inline-block transition-all duration-500 ease-in-out ${
                activeSection === section.id || hoveredId === section.id
                  ? "opacity-100 translate-x-0 text-[#0100F4] w-auto"
                  : "opacity-0 -translate-x-4 w-0 overflow-hidden"
              }`}
            >
              ›
            </span>

            <span
              style={{
                transform: isVisible ? "translateX(0)" : "translateX(100px)",
                opacity: isVisible ? 1 : 0,
                transition: `transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s, opacity 0.6s ease-out ${index * 0.1}s`,
              }}
            >
              {section.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

// Функция для получения цвета фона секции
const getSectionBgColor = (sectionId: string): string => {
  const colorMap: { [key: string]: string } = {
    us: "#000000",
    mission: "#000000", // Верхняя часть градиента черная
    products: "#dadada",
    values: "#000000",
    team: "#dadada",
    contacts: "#dadada",
  };
  return colorMap[sectionId] || "#000000";
};

const sections: SectionItem[] = [
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
    bgColor: "bg-black",
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Проверяем, мобильное ли устройство при загрузке и при изменении размера
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Проверяем при загрузке
    checkMobile();

    // Добавляем слушатель изменения размера
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Отслеживание скролла и изменение фона заранее
  useEffect(() => {
    const updateBackgroundColor = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const previewDistance = 300; // Расстояние заранее, на котором меняем фон
      
      // Определяем следующую секцию на основе позиции скролла
      let targetSectionId = sections[0].id;
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const element = sectionRefs.current[section.id];
        
        if (element) {
          const rect = element.getBoundingClientRect();
          // getBoundingClientRect возвращает позицию относительно viewport
          const sectionTop = rect.top + scrollY; // Позиция относительно документа
          const sectionBottom = sectionTop + rect.height;
          const currentViewportBottom = scrollY + viewportHeight;
          
          // Если мы еще не дошли до секции, но она близко (в пределах previewDistance)
          if (sectionTop > currentViewportBottom && sectionTop <= currentViewportBottom + previewDistance) {
            targetSectionId = section.id;
            break;
          }
          
          // Если мы в секции
          if (scrollY >= sectionTop && scrollY < sectionBottom) {
            // Если мы в конце секции (близко к концу), берем следующую
            const distanceToBottom = sectionBottom - currentViewportBottom;
            if (distanceToBottom < previewDistance) {
              const nextIndex = i + 1;
              if (nextIndex < sections.length) {
                targetSectionId = sections[nextIndex].id;
              } else {
                targetSectionId = section.id;
              }
            } else {
              targetSectionId = section.id;
            }
            break;
          }
        }
      }
      
      // Меняем фон body заранее (кроме values, так как Values сам управляет своим цветом)
      if (targetSectionId !== "values") {
        const bgColor = getSectionBgColor(targetSectionId);
        document.documentElement.style.setProperty('--background', bgColor);
        document.body.style.background = bgColor;
      }
    };

    // Обновляем при скролле
    window.addEventListener('scroll', updateBackgroundColor, { passive: true });
    // Обновляем при изменении размера окна
    window.addEventListener('resize', updateBackgroundColor, { passive: true });
    // Обновляем сразу
    updateBackgroundColor();

    return () => {
      window.removeEventListener('scroll', updateBackgroundColor);
      window.removeEventListener('resize', updateBackgroundColor);
    };
  }, []);

  useEffect(() => {
    // Если мобильное устройство, не используем Intersection Observer
    if (isMobile) return;

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
  }, [isMobile]);

  const scrollToSection = (id: string) => {
    if (isMobile) return; // На мобилках не скроллим к секциям через навигацию

    const element = sectionRefs.current[id];
    if (element) {
      // Отправляем событие перед программной прокруткой, чтобы Values знал об этом
      window.dispatchEvent(new CustomEvent('programmatic-scroll-start'));
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative flex">
      {/* Left Navigation - скрываем на мобилках */}
      {!isMobile && (
        <div className="sticky top-0 h-screen w-1/3 px-8 py-8 z-20 pointer-events-none shrink-0 hidden md:block">
          <NavItems
            sections={sections}
            activeSection={activeSection}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            scrollToSection={scrollToSection}
          />
        </div>
      )}

      {/* Right Content - адаптивная ширина для мобилок и десктопа */}
      <div
        className={`flex-1 ${
          isMobile ? "w-full" : "-ml-[33.333333%]"
        }  overflow-hidden`}
      >
        {sections.map((section) => {
          const SectionComponent = section.component;
          const sectionData = sections.find((s) => s.id === section.id);
          return (
            <SectionWrapper
              key={section.id}
              sectionId={section.id}
              sectionRefs={sectionRefs}
              isMobile={isMobile}
              bgColor={sectionData?.bgColor || "bg-white"}
            >
              <SectionComponent />
            </SectionWrapper>
          );
        })}
      </div>
    </div>
  );
}
