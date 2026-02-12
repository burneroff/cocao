"use client";

import { useEffect, useRef, useState } from "react";
import US from "./sections/US";
import Mission from "./sections/Mission";
import Products from "./sections/Products";
import Values from "./sections/Values";
import Team from "./sections/Team";
import Contacts from "./sections/Contacts";
import Footer from "./Footer";

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
    // Для первой секции "us" используем более раннее обнаружение
    const isFirstSection = sectionId === "us";
    const threshold = isFirstSection ? 0.05 : 0.2;
    const rootMargin = isFirstSection ? "200px 0px 0px 0px" : "0px";

    // Предварительная проверка видимости для первой секции
    const checkInitialVisibility = () => {
      if (isFirstSection && wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // Если секция уже близко к viewport, делаем её видимой сразу
        if (rect.top < viewportHeight + 200 && rect.bottom > -200) {
          setIsVisible(true);
          return true;
        }
      }
      return false;
    };

    // Обработчик события предварительной активации
    const handleSectionPreview = (event: Event) => {
      const customEvent = event as CustomEvent<{ sectionId?: string }>;
      if (customEvent.detail?.sectionId === sectionId && !isVisible) {
        setIsVisible(true);
      }
    };

    // Проверяем сразу при монтировании
    if (checkInitialVisibility()) {
      // Все равно подписываемся на событие для обновлений
      window.addEventListener("section-preview", handleSectionPreview);
      return () => {
        window.removeEventListener("section-preview", handleSectionPreview);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold, rootMargin },
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    // Подписываемся на событие предварительной активации
    window.addEventListener("section-preview", handleSectionPreview);

    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current);
      }
      window.removeEventListener("section-preview", handleSectionPreview);
    };
  }, [isMobile, sectionId, isVisible]);

  const backgroundStyle =
    sectionId === "mission"
      ? {
        background: "linear-gradient(to bottom, #000000 60%, #dadada 60%)",
        width: isMobile ? "100%" : "100vw",
      }
      : { width: isMobile ? "100%" : "100vw" };

  return (
    <div
      ref={(el) => {
        sectionRefs.current[sectionId] = el;
        wrapperRef.current = el;
      }}
      id={sectionId}
      className={`relative z-10 ${sectionId === "mission" ? "" : bgColor}`}
      style={backgroundStyle}
    >
      <div
        className={`${isMobile ? "" : "pl-[33.333333%]"} transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        {children}
      </div>
    </div>
  );
};

type SectionItem = {
  id: string;
  label: string;
  component: React.ComponentType;
  bgColor: string;
  textColor: string;
};

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
            sections.forEach((section, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => new Set(prev).add(section.id));
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 },
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
    <div
      ref={navRef}
      className="flex h-full flex-col justify-start gap-0 pointer-events-auto pt-8"
    >
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
              lineHeight: "clamp(52px, 7vw, 100px)",
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
              className={`inline-block transition-all duration-1000 ease-in-out ${activeSection === section.id || hoveredId === section.id
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

const getSectionBgColor = (sectionId: string): string => {
  const colorMap: { [key: string]: string } = {
    us: "#000000",
    mission: "#000000",
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
  const [isMobile, setIsMobile] = useState(true);
  const [isSnapDisabled, setIsSnapDisabled] = useState(true);
  const isProgrammaticScrollRef = useRef(false);
  const programmaticTimeoutRef = useRef<number | null>(null);
  const wheelAccumulatorRef = useRef(0);
  const touchAccumulatorRef = useRef(0);
  const lastTouchYRef = useRef<number | null>(null);
  const animationRafRef = useRef<number | null>(null);
  const isSafariRef = useRef(false);
  const animationDuration = 1600;
  const scrollThresholds = { wheel: 6, touch: 8 };
  const edgeTolerance = 3;
  const snapOffsetsDesktop = { top: -80, bottom: 0 };
  const snapOffsetsMobile = { top: -120, bottom: 0 };
  const snapOffsets = isMobile ? snapOffsetsMobile : snapOffsetsDesktop;
  const useMobileLayout = isMobile || isSnapDisabled;
  const valuesLockDelay = 400;
  const valuesReleaseDelay = 200;

  // Кэш для snap targets
  const snapTargetsCache = useRef<Map<string, HTMLElement | null>>(new Map());

  const getVisibleSnapTarget = (id: string) => {
    // Проверяем кэш
    if (snapTargetsCache.current.has(id)) {
      const cached = snapTargetsCache.current.get(id);
      if (cached && cached.getClientRects().length > 0) {
        return cached;
      }
    }

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(`[data-snap-target="${id}"]`),
    );
    const visibleTarget = targets.find(
      (target) => target.getClientRects().length > 0,
    );

    const result = visibleTarget ?? sectionRefs.current[id];
    // Кэшируем результат
    snapTargetsCache.current.set(id, result);
    return result;
  };

  const smoothScrollTo = (targetY: number, duration = animationDuration) => {
    if (animationRafRef.current) {
      window.cancelAnimationFrame(animationRafRef.current);
    }

    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();
    const scrollingElement = isSafariRef.current
      ? document.scrollingElement || document.documentElement
      : null;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      const nextY = startY + distance * eased;

      if (scrollingElement) {
        scrollingElement.scrollTop = nextY;
      } else {
        window.scrollTo({ top: nextY, behavior: "auto" });
      }

      if (progress < 1) {
        animationRafRef.current = window.requestAnimationFrame(tick);
      } else {
        animationRafRef.current = null;
      }
    };

    animationRafRef.current = window.requestAnimationFrame(tick);
  };

  const markProgrammaticScroll = (
    targetId: string | undefined,
    shouldDispatch: boolean,
    duration = animationDuration,
  ) => {
    isProgrammaticScrollRef.current = true;
    if (programmaticTimeoutRef.current) {
      window.clearTimeout(programmaticTimeoutRef.current);
    }
    programmaticTimeoutRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, duration + 200);

    if (shouldDispatch) {
      window.dispatchEvent(
        new CustomEvent("programmatic-scroll-start", {
          detail: { targetId },
        }),
      );
    }
  };

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    isSafariRef.current =
      /Safari/i.test(userAgent) &&
      !/Chrome|Chromium|CriOS|Edg|OPR|FxiOS|Android/i.test(userAgent);

    const hasTelegramWebApp =
      typeof (window as { Telegram?: { WebApp?: unknown } }).Telegram?.WebApp !==
      "undefined";
    const isTelegramUa = /Telegram/i.test(userAgent);

    // На touch-устройствах и в Telegram WebView отключаем кастомный snap,
    // оставляя нативный скролл во избежание лагов.
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      const hasFinePointerAndHover =
        window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ??
        false;
      const hasTouchSupport = window.navigator.maxTouchPoints > 0;
      const isIosDevice =
        /iPhone|iPad|iPod/i.test(userAgent) ||
        (/Macintosh/i.test(userAgent) && hasTouchSupport);
      const canUseDesktopSnap =
        hasFinePointerAndHover &&
        !hasTouchSupport &&
        !hasTelegramWebApp &&
        !isTelegramUa &&
        !isIosDevice;
      setIsSnapDisabled(!canUseDesktopSnap);
    };

    // Проверяем при загрузке
    checkMobile();

    // Добавляем слушатель изменения размера
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Очищаем кэши при изменении isMobile
  useEffect(() => {
    snapTargetsCache.current.clear();
  }, [isMobile]);

  // Предварительная инициализация для плавного перехода из Hero
  useEffect(() => {
    // Используем requestAnimationFrame для проверки после первого рендера
    const rafId = requestAnimationFrame(() => {
      // Проверяем видимость секции "us" сразу после монтирования
      const usElement = sectionRefs.current["us"];
      if (usElement) {
        const rect = usElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // Если секция уже близко к viewport (в пределах 300px), предварительно инициализируем
        if (rect.top < viewportHeight + 300 && rect.bottom > -300) {
          // Предварительно устанавливаем refs для быстрого доступа
          sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element && !sectionRefs.current[section.id]) {
              sectionRefs.current[section.id] = element as HTMLDivElement;
            }
          });
        }
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    let rafId: number | null = null;
    let lastTargetSectionId: string | null = null;
    let lastUsPreviewState = false;

    const updateBackgroundColor = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const previewDistance = 300;

      let targetSectionId = sections[0].id;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const element = sectionRefs.current[section.id];

        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top + scrollY;
          const sectionBottom = sectionTop + rect.height;
          const currentViewportBottom = scrollY + viewportHeight;

          if (
            sectionTop > currentViewportBottom &&
            sectionTop <= currentViewportBottom + previewDistance
          ) {
            targetSectionId = section.id;
            break;
          }

          if (scrollY >= sectionTop && scrollY < sectionBottom) {
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

      // Обновляем цвет фона только если секция изменилась
      if (targetSectionId !== lastTargetSectionId && targetSectionId !== "values") {
        const bgColor = getSectionBgColor(targetSectionId);
        document.documentElement.style.setProperty("--background", bgColor);
        document.body.style.background = bgColor;
        lastTargetSectionId = targetSectionId;
      }

      // Предварительная активация секции "us" при приближении из Hero
      // Оптимизация: проверяем только если мы в зоне Hero или близко к "us"
      const shouldCheckUsPreview = targetSectionId === "us" || (scrollY > 0 && scrollY < viewportHeight * 0.5);
      if (shouldCheckUsPreview) {
        const usElement = sectionRefs.current["us"];
        if (usElement) {
          const usRect = usElement.getBoundingClientRect();
          const shouldPreview = usRect.top < viewportHeight + 400 && usRect.bottom > -400;

          // Диспатчим событие только если состояние изменилось
          if (shouldPreview !== lastUsPreviewState) {
            if (shouldPreview) {
              window.dispatchEvent(
                new CustomEvent("section-preview", {
                  detail: { sectionId: "us" },
                }),
              );
            }
            lastUsPreviewState = shouldPreview;
          }
        }
      } else {
        lastUsPreviewState = false;
      }
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateBackgroundColor();
          rafId = null;
        });
      }
    };

    const handleResize = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateBackgroundColor();
          rafId = null;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Инициализация при монтировании
    updateBackgroundColor();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    if (useMobileLayout) return;
    const handleProgrammaticScroll = (event: Event) => {
      const customEvent = event as CustomEvent<{ targetId?: string }>;
      markProgrammaticScroll(customEvent.detail?.targetId, false);
    };

    window.addEventListener(
      "programmatic-scroll-start",
      handleProgrammaticScroll,
    );

    return () => {
      window.removeEventListener(
        "programmatic-scroll-start",
        handleProgrammaticScroll,
      );
    };
  }, [useMobileLayout]);

  useEffect(() => {
    if (useMobileLayout) return;
    const handleValuesRelease = (event: Event) => {
      const customEvent = event as CustomEvent<{ direction?: "down" | "up" }>;
      if (isProgrammaticScrollRef.current) return;

      const direction = customEvent.detail?.direction;
      if (direction !== "down" && direction !== "up") return;

      const targetId = direction === "down" ? "team" : "products";
      const targetKey = direction === "down" ? "team" : "products";
      const target = getVisibleSnapTarget(targetKey);
      if (!target) return;

      window.setTimeout(() => {
        markProgrammaticScroll(targetId, true, animationDuration);
        const rect = target.getBoundingClientRect();
        const targetTop = rect.top + window.scrollY;
        const targetBottom = targetTop + rect.height;
        const extraOffset = targetId === "products" ? 100 : 0;

        const desiredTop = targetTop + snapOffsets.top - extraOffset;
        smoothScrollTo(Math.max(0, desiredTop));
      }, valuesReleaseDelay);
    };

    window.addEventListener("values-release", handleValuesRelease);

    return () => {
      window.removeEventListener("values-release", handleValuesRelease);
    };
  }, [useMobileLayout]);

  useEffect(() => {
    if (useMobileLayout) return;

    // Кэш для sectionRects, обновляется только при необходимости
    let cachedSectionRects: { id: string; rect: DOMRect }[] | null = null;
    let cachedScrollY = -1;
    const cacheValidity = 50; // Кэш валиден в пределах 50px скролла

    const getSectionRects = (): { id: string; rect: DOMRect }[] => {
      const currentScrollY = window.scrollY;
      // Используем кэш, если он еще актуален
      if (
        cachedSectionRects &&
        Math.abs(currentScrollY - cachedScrollY) < cacheValidity
      ) {
        return cachedSectionRects;
      }

      // Обновляем кэш
      const rects = sections
        .map((section) => {
          const element = sectionRefs.current[section.id];
          if (!element) return null;
          const rect = element.getBoundingClientRect();
          return { id: section.id, rect };
        })
        .filter(
          (entry): entry is { id: string; rect: DOMRect } => entry !== null,
        );

      cachedSectionRects = rects;
      cachedScrollY = currentScrollY;
      return rects;
    };

    const handleIntent = (
      deltaY: number,
      event: Event,
      source: "wheel" | "touch",
    ) => {
      if (event.cancelable) {
        event.preventDefault();
      }
      if (isProgrammaticScrollRef.current) {
        return;
      }

      const accumulator =
        source === "wheel" ? wheelAccumulatorRef : touchAccumulatorRef;
      const threshold =
        source === "wheel" ? scrollThresholds.wheel : scrollThresholds.touch;
      accumulator.current += deltaY;

      if (Math.abs(accumulator.current) < threshold) return;
      const effectiveDelta = accumulator.current;
      accumulator.current = 0;

      const windowHeight = window.innerHeight;
      const sectionRects = getSectionRects();

      if (sectionRects.length === 0) return;

      const isScrollingDown = effectiveDelta > 0;
      if (!isScrollingDown && window.scrollY <= edgeTolerance) {
        return;
      }
      const viewportCenter = windowHeight / 2;
      const currentSection = sectionRects.find(
        (entry) =>
          entry.rect.top <= viewportCenter &&
          entry.rect.bottom >= viewportCenter,
      )?.id;

      if (currentSection === "values") return;

      if (currentSection === "products" && !isMobile) {
        const productsRect = sectionRects.find(
          (entry) => entry.id === "products",
        )?.rect;
        if (productsRect) {
          const sectionTop = productsRect.top + window.scrollY;
          const maxScrollable = Math.max(0, productsRect.height - windowHeight);
          const productsStart = sectionTop + snapOffsets.top;
          const productsMiddle = productsStart + maxScrollable / 1.35;
          const currentY = window.scrollY;
          const nearMiddle =
            Math.abs(currentY - productsMiddle) <= edgeTolerance;
          const nearStart = currentY <= productsStart + edgeTolerance;

          if (isScrollingDown) {
            if (!nearMiddle) {
              event.preventDefault();
              markProgrammaticScroll("products", true, animationDuration);
              smoothScrollTo(productsMiddle);
              return;
            }
          } else {
            if (!nearStart) {
              event.preventDefault();
              markProgrammaticScroll("products", true, animationDuration);
              smoothScrollTo(productsStart);
              return;
            }
          }
        }
      }

      if (currentSection === "us" && !isScrollingDown) {
        const usRect = sectionRects.find((entry) => entry.id === "us")?.rect;
        const atUsTop = usRect ? usRect.top >= -edgeTolerance : false;
        if (atUsTop) {
          event.preventDefault();
          markProgrammaticScroll("hero", true, animationDuration);
          smoothScrollTo(0);
          return;
        }
        return;
      }

      const currentIndex = currentSection
        ? sections.findIndex((section) => section.id === currentSection)
        : -1;

      const targetIndex = isScrollingDown
        ? Math.min(currentIndex + 1, sections.length - 1)
        : Math.max(currentIndex - 1, 0);

      let targetId = sections[targetIndex]?.id;

      if (!targetId) return;

      if (currentSection === "products" && isMobile) {
        const productsRect = sectionRects.find(
          (entry) => entry.id === "products",
        )?.rect;
        if (productsRect) {
          const atBottom = productsRect.bottom <= windowHeight + edgeTolerance;
          const atTop = productsRect.top >= -edgeTolerance;
          if (isScrollingDown && !atBottom) return;
          if (!isScrollingDown && !atTop) return;
        }
      }

      if (currentSection == null) {
        targetId = isScrollingDown
          ? sections[0].id
          : sections[sections.length - 1].id;
      }

      if (currentSection === targetId) return;

      const target = getVisibleSnapTarget(targetId);
      if (!target) return;

      event.preventDefault();
      const lockDuration =
        targetId === "values"
          ? animationDuration + valuesLockDelay
          : animationDuration;
      markProgrammaticScroll(targetId, true, lockDuration);
      const rect = target.getBoundingClientRect();
      const targetTop = rect.top + window.scrollY;
      const targetBottom = targetTop + rect.height;

      let desiredTop: number;

      if (targetId === "values") {
        desiredTop = targetTop;
      } else if (targetId === "contacts" && isScrollingDown) {
        desiredTop = Math.max(
          0,
          targetBottom - window.innerHeight + snapOffsets.bottom,
        );
      } else if (
        targetId === "us" &&
        !isScrollingDown &&
        currentSection === "mission"
      ) {
        desiredTop = targetTop + snapOffsets.top + 10;
      } else {
        desiredTop = targetTop + snapOffsets.top;
      }

      smoothScrollTo(desiredTop);
    };

    const handleWheel = (e: WheelEvent) => handleIntent(e.deltaY, e, "wheel");

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      lastTouchYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      if (lastTouchYRef.current === null) {
        lastTouchYRef.current = e.touches[0].clientY;
        return;
      }

      const currentY = e.touches[0].clientY;
      const deltaY = lastTouchYRef.current - currentY;
      lastTouchYRef.current = currentY;
      handleIntent(deltaY, e, "touch");
    };

    const handleTouchEnd = () => {
      lastTouchYRef.current = null;
      touchAccumulatorRef.current = 0;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [useMobileLayout]);

  useEffect(() => {
    if (useMobileLayout) return;

    const observers: IntersectionObserver[] = [];
    const sectionIntersections = new Map<string, number>();
    let rafId: number | null = null;
    let lastActiveSection: string | null = null;

    const updateActiveSection = () => {
      let maxRatio = 0;
      let activeId = sections[0].id;

      sectionIntersections.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          activeId = id;
        }
      });

      // Обновляем состояние только если секция действительно изменилась
      if (maxRatio > 0 && activeId !== lastActiveSection) {
        setActiveSection(activeId);
        lastActiveSection = activeId;
      }
      rafId = null;
    };

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

      // Используем requestAnimationFrame для throttling обновлений
      if (rafId === null) {
        rafId = requestAnimationFrame(updateActiveSection);
      }
    };

    sections.forEach((section) => {
      const observer = new IntersectionObserver(handleIntersection, {
        // Уменьшаем количество threshold для лучшей производительности
        threshold: [0, 0.25, 0.5, 0.75, 1],
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
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [useMobileLayout]);

  const scrollToSection = (id: string) => {
    if (useMobileLayout) return;

    const element = getVisibleSnapTarget(id);
    if (element) {
      window.dispatchEvent(
        new CustomEvent("programmatic-scroll-start", {
          detail: { targetId: id },
        }),
      );

      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const offset = 150;

      window.scrollTo({
        top: Math.max(0, absoluteTop - offset),
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative flex">
      {!useMobileLayout && (
        <div className="sticky top-0 h-screen w-1/3 px-8 pt-12 pb-8 z-20 pointer-events-none shrink-0 hidden md:block">
          <NavItems
            sections={sections}
            activeSection={activeSection}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            scrollToSection={scrollToSection}
          />
        </div>
      )}

      <div
        className={`flex-1 ${useMobileLayout ? "w-full" : "-ml-[33.333333%]"
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
              isMobile={useMobileLayout}
              bgColor={sectionData?.bgColor || "bg-white"}
            >
              <SectionComponent />
            </SectionWrapper>
          );
        })}
        <div data-snap-target="contacts">
          <Footer />
        </div>
      </div>
    </div>
  );
}
