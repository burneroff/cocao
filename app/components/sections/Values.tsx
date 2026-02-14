"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

interface ValueSection {
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
}

const valuesData: ValueSection[] = [
  {
    title: "ASPIRATION FOR <br/> PROGRESS",
    subtitle:
      "Progress is our mindset - it shapes how we think, create, and evolve. We explore new ideas, challenge limits, and keep improving our products, our business, and ourselves. Every step forward is part of something greater.",
    image: "/values/value_1.png",
    bgColor: "#ED4C22",
  },
  {
    title: "CURIOSITY & <br/> CONTINUOUS LEARNING",
    subtitle:
      "Curiosity fuels our creativity and growth. We stay open to new ideas, ask questions, and experiment fearlessly. Learning and exploration keep us evolving - as individuals, as a team, and as a company.",
    image: "/values/value_2.png",
    bgColor: "#ED7187",
  },
  {
    title: "UNITY & <br/> COLLABORATION",
    subtitle:
      "We move forward together. Openness, empathy, and trust guide how we work and grow. By sharing, supporting, and listening, we create an environment where everyone can do their best work.",
    image: "/values/value_3.png",
    bgColor: "#FBC500",
  },
  {
    title: "OWNERSHIP &<br/> INTEGRITY",
    subtitle:
      "We take responsibility for our actions and results. Freedom comes with accountability, and integrity defines how we work. We learn from mistakes, act with honesty, and earn trust through consistency.",
    image: "/values/value_4.png",
    bgColor: "#061EBE",
  },
];

export default function Values() {
  const [currentSection, setCurrentSection] = useState(0);
  const [allSectionsViewed, setAllSectionsViewed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewedSectionsRef = useRef<Set<number>>(new Set([0]));
  const isActiveRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const isProgrammaticScrollRef = useRef(false);
  const currentIndexRef = useRef(0);
  const allViewedRef = useRef(false);
  const programmaticTargetRef = useRef<string | null>(null);
  const programmaticFallbackRef = useRef<number | null>(null);
  const scrollEndTimeoutRef = useRef<number | null>(null);
  const wheelAccumulatorRef = useRef(0);
  const touchAccumulatorRef = useRef(0);
  const lastTouchYRef = useRef<number | null>(null);
  const snapRafRef = useRef<number | null>(null);
  const lastIntentRef = useRef(0);
  const transitionLockMs = 500;
  const swiperRef = useRef<SwiperType | null>(null);

  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 820);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const snapToTopIfNeeded = (behavior: ScrollBehavior = "smooth") => {
    if (snapRafRef.current) {
      window.cancelAnimationFrame(snapRafRef.current);
    }

    snapRafRef.current = window.requestAnimationFrame(() => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const windowHeight = window.innerHeight;
      const isPartiallyVisible = rect.bottom > 0 && rect.top < windowHeight;
      const isPinned = rect.top <= 0 && rect.bottom >= windowHeight;

      if (isPartiallyVisible && !isPinned) {
        const elementTop = rect.top + window.scrollY;
        window.scrollTo({ top: elementTop, behavior });
      }
    });
  };

  const markViewed = (index: number) => {
    viewedSectionsRef.current.add(index);
    if (viewedSectionsRef.current.size === valuesData.length) {
      setAllSectionsViewed(true);
    }
  };

  useLayoutEffect(() => {
    markViewed(currentSection);
    currentIndexRef.current = currentSection;
    allViewedRef.current = allSectionsViewed;
    wheelAccumulatorRef.current = 0;
    touchAccumulatorRef.current = 0;
  }, [currentSection]);

  useLayoutEffect(() => {
    allViewedRef.current = allSectionsViewed;
  }, [allSectionsViewed]);

  useLayoutEffect(() => {
    if (isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible =
            entry.isIntersecting && entry.intersectionRatio > 0.55;
          isActiveRef.current = isVisible;

          const isExitingUp =
            currentIndexRef.current === 0 && lastIntentRef.current < 0;
          const isExitingDown =
            currentIndexRef.current === valuesData.length - 1 &&
            allViewedRef.current &&
            lastIntentRef.current > 0;

          if (
            isVisible &&
            !isProgrammaticScrollRef.current &&
            !isExitingUp &&
            !isExitingDown
          ) {
            snapToTopIfNeeded();
          }
        });
      },
      {
        threshold: [0.25, 0.4, 0.55, 0.7, 0.85, 1],
        rootMargin: "0px",
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

  useLayoutEffect(() => {
    if (isMobile) return;

    const endProgrammaticScroll = () => {
      const targetId = programmaticTargetRef.current;
      isProgrammaticScrollRef.current = false;
      programmaticTargetRef.current = null;
      if (targetId === "values") {
        snapToTopIfNeeded();
      }
    };

    const handleProgrammaticScroll = (event: Event) => {
      const customEvent = event as CustomEvent<{ targetId?: string }>;
      isProgrammaticScrollRef.current = true;
      programmaticTargetRef.current = customEvent.detail?.targetId ?? null;
      isAnimatingRef.current = false;
      wheelAccumulatorRef.current = 0;
      touchAccumulatorRef.current = 0;

      if (programmaticFallbackRef.current) {
        window.clearTimeout(programmaticFallbackRef.current);
      }
      programmaticFallbackRef.current = window.setTimeout(
        endProgrammaticScroll,
        2500,
      );
    };

    const handleScroll = () => {
      if (!isProgrammaticScrollRef.current) return;
      if (scrollEndTimeoutRef.current) {
        window.clearTimeout(scrollEndTimeoutRef.current);
      }
      scrollEndTimeoutRef.current = window.setTimeout(
        endProgrammaticScroll,
        120,
      );
    };

    window.addEventListener(
      "programmatic-scroll-start",
      handleProgrammaticScroll,
    );
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener(
        "programmatic-scroll-start",
        handleProgrammaticScroll,
      );
      window.removeEventListener("scroll", handleScroll);
      if (scrollEndTimeoutRef.current) {
        window.clearTimeout(scrollEndTimeoutRef.current);
      }
      if (programmaticFallbackRef.current) {
        window.clearTimeout(programmaticFallbackRef.current);
      }
      if (snapRafRef.current) {
        window.cancelAnimationFrame(snapRafRef.current);
      }
    };
  }, [isMobile]);

  useLayoutEffect(() => {
    if (isMobile) return;

    const canExitUp = (deltaY: number) => currentSection === 0 && deltaY < 0;
    const canExitDown = (deltaY: number) =>
      currentSection === valuesData.length - 1 &&
      allSectionsViewed &&
      deltaY > 0;

    const handleIntent = (
      deltaY: number,
      event: Event,
      source: "wheel" | "touch",
    ) => {
      lastIntentRef.current = deltaY;
      if (!isActiveRef.current) return;
      if (isProgrammaticScrollRef.current) return;
      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const windowHeight = window.innerHeight;
      const isPinned = rect.top <= 2 && rect.bottom >= windowHeight - 2;
      const isPartiallyVisible = rect.bottom > 0 && rect.top < windowHeight;

      if (!isPartiallyVisible) return;

      if (!isPinned) {
        if (!canExitUp(deltaY) && !canExitDown(deltaY)) {
          event.preventDefault();
          snapToTopIfNeeded();
        }
        return;
      }

      const accumulator =
        source === "wheel" ? wheelAccumulatorRef : touchAccumulatorRef;
      const threshold = source === "wheel" ? 70 : 55;
      accumulator.current += deltaY;

      if (Math.abs(accumulator.current) < threshold) {
        event.preventDefault();
        return;
      }

      const effectiveDelta = accumulator.current;
      accumulator.current = 0;

      if (effectiveDelta > 0) {
        if (canExitDown(effectiveDelta)) {
          window.dispatchEvent(
            new CustomEvent("values-release", {
              detail: { direction: "down" },
            }),
          );
          return;
        }
        if (currentSection < valuesData.length - 1) {
          event.preventDefault();
          isAnimatingRef.current = true;
          setCurrentSection((prev) =>
            Math.min(prev + 1, valuesData.length - 1),
          );
          window.setTimeout(() => {
            isAnimatingRef.current = false;
          }, transitionLockMs);
          return;
        }
        if (!allSectionsViewed) {
          event.preventDefault();
        }
      } else if (effectiveDelta < 0) {
        if (canExitUp(effectiveDelta)) {
          window.dispatchEvent(
            new CustomEvent("values-release", {
              detail: { direction: "up" },
            }),
          );
          return;
        }
        if (currentSection > 0) {
          event.preventDefault();
          isAnimatingRef.current = true;
          setCurrentSection((prev) => Math.max(prev - 1, 0));
          window.setTimeout(() => {
            isAnimatingRef.current = false;
          }, transitionLockMs);
        }
      }
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
  }, [currentSection, allSectionsViewed, isMobile]);

  const currentValue = valuesData[currentSection];

  if (isMobile) {
    return (
      <div className="relative w-full h-screen">
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          initialSlide={currentSection}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setCurrentSection(swiper.activeIndex)}
          className="values-swiper h-full"
        >
          {valuesData.map((value, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative h-screen flex flex-col items-center justify-center px-4 py-8"
                style={{
                  backgroundColor: value.bgColor,
                }}
              >
                <div className="relative h-[325px] w-[355px] sm:h-[300px] sm:w-[320px] shrink-0 mb-6">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-contain sm:px-4"
                    sizes="(max-width: 640px) 280px, 320px"
                  />
                </div>

                <div className="flex flex-col items-center gap-4 w-full max-w-[490px]">
                  <h2
                    className="text-white text-center px-4"
                    style={{
                      fontWeight: 400,
                      fontStyle: "normal",
                      fontSize: "clamp(28px, 5vw, 36px)",
                      lineHeight: "clamp(32px, 5.5vw, 45px)",
                      letterSpacing: "0%",
                      textAlign: "justify",
                      textAlignLast: "justify",
                      textTransform: "uppercase",
                      width: "100%",
                      marginTop: "5px",
                    }}
                    dangerouslySetInnerHTML={{ __html: value.title }}
                  />

                  <div className="w-full px-4 mt-4">
                    <p
                      className="text-white text-justify"
                      style={{
                        fontWeight: 500,
                        fontStyle: "normal",
                        fontSize: "clamp(16px, 3vw, 20px)",
                        lineHeight: "clamp(24px, 4vw, 32px)",
                        letterSpacing: "0%",
                      }}
                    >
                      <span
                        className="inline"
                        style={{
                          background: `${value.bgColor}`,
                          backgroundSize: "100% 15px",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "0 bottom",
                          paddingBottom: "2px",
                        }}
                      >
                        {value.subtitle}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {valuesData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.slideTo(index);
                }
                setCurrentSection(index);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentSection
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 xl:px-20 py-8 md:py-12 lg:py-16 md:mr-10"
    >
      <div
        className="absolute inset-y-0 z-0 transition-colors ease-in-out"
        style={{
          backgroundColor: currentValue.bgColor,
          width: "150vw",
          height: "100%",
          transitionDuration: "600ms",
        }}
      />

      <div className="relative z-10 h-full flex items-center justify-end w-full">
        <div className="flex flex-col w-full 2xl:w-[910px] 2xl:flex-row items-center md:items-start 2xl:items-start gap-6 md:gap-8 2xl:gap-[15px] min-[1775px]:ml-[100px]">
          <div className="relative h-[250px] w-[280px] sm:h-[300px] sm:w-[320px] md:h-[350px] md:w-[380px] lg:h-[350px] lg:w-[500px] xl:h-[468px] xl:w-[450px] 2xl:h-[468px] 2xl:w-[450px] shrink-0">
            {valuesData.map((value, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  index === currentSection
                    ? "opacity-100 translate-y-0 scale-100 blur-0"
                    : "opacity-0 translate-y-4 scale-[0.98] blur-sm"
                }`}
              >
                <Image
                  src={value.image}
                  alt={value.title}
                  fill
                  className="object-contain 2xl:ml-[60px] sm:px-4 2xl:px-0"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 380px, (max-width: 1280px) 420px, (max-width: 1536px) 450px, 450px"
                />
              </div>
            ))}

            <div
              className="absolute text-white hidden 2xl:block 2xl:ml-[45px]"
              style={{
                left: "300px",
                top: "120px",
                width: "640px",
                height: "217px",
                fontWeight: 500,
                fontStyle: "normal",
                fontSize: "25px",
                lineHeight: "50px",
                letterSpacing: "0%",
                textAlign: "justify",
              }}
            >
              {valuesData.map((value, index) => (
                <p
                  key={index}
                  className={`transition-all duration-700 ease-out ${
                    index === currentSection
                      ? "opacity-100 translate-y-0 blur-0"
                      : "opacity-0 -translate-y-2 blur-sm absolute inset-0"
                  }`}
                >
                  <span
                    className="inline"
                    style={{
                      background: `${value.bgColor}`,
                      backgroundSize: "100% 35px",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "0 bottom",
                    }}
                  >
                    {value.subtitle}
                  </span>
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col 2xl:flex-row items-center md:items-start 2xl:items-start gap-4 md:gap-6 2xl:gap-[15px] w-full 2xl:w-auto 2xl:ml-4">
            {valuesData.map((value, index) => (
              <h2
                key={index}
                className={`text-white text-center 2xl:text-left px-4 2xl:ml-[30px] transition-all duration-700 ease-out ${
                  index === currentSection
                    ? "opacity-100 translate-y-0 blur-0"
                    : "opacity-0 translate-y-2 blur-sm absolute"
                }`}
                style={{
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "clamp(28px, 5vw, 36px)",
                  lineHeight: "clamp(32px, 5.5vw, 45px)",
                  letterSpacing: "0%",
                  textAlign: "justify",
                  textAlignLast: "justify",
                  textTransform: "uppercase",
                  width: "100vw",
                  maxWidth: "490px",
                  marginTop: "5px",
                  display: "block",
                }}
                dangerouslySetInnerHTML={{ __html: value.title }}
              />
            ))}

            <div
              className="2xl:hidden w-full px-0 mt-4 md:mt-6 relative sm:px-4"
              style={{ maxWidth: "490px" }}
            >
              {valuesData.map((value, index) => (
                <p
                  key={index}
                  className={`text-white text-justify transition-all duration-700 ease-out ${
                    index === currentSection
                      ? "opacity-100 translate-y-0 blur-0"
                      : "opacity-0 -translate-y-2 blur-sm absolute inset-0"
                  }`}
                  style={{
                    fontWeight: 500,
                    fontStyle: "normal",
                    fontSize: "clamp(16px, 3vw, 20px)",
                    lineHeight: "clamp(24px, 4vw, 32px)",
                    letterSpacing: "0%",
                  }}
                >
                  <span
                    className="inline"
                    style={{
                      background: `${value.bgColor}`,
                      backgroundSize: "100% 15px",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "0 bottom",
                      paddingBottom: "2px",
                    }}
                  >
                    {value.subtitle}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
