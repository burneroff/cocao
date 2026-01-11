"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ValueSection {
  title: string;
  subtitle: string;
  image: string;
  bgColor: string; // Hex color code
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
    title: "OWNERSHIP & INTEGRITY",
    subtitle:
      "We take responsibility for our actions and results. Freedom comes with accountability, and integrity defines how we work. We learn from mistakes, act with honesty, and earn trust through consistency.",
    image: "/values/value_4.png",
    bgColor: "#061EBE",
  },
];

export default function Values() {
  const [currentSection, setCurrentSection] = useState(0);
  const [allSectionsViewed, setAllSectionsViewed] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isScrollingRef = useRef(false);
  const viewedSectionsRef = useRef<Set<number>>(new Set([0]));

  // IntersectionObserver для отслеживания видимости секций
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
              viewedSectionsRef.current.add(index);

              setCurrentSection((prev) => {
                if (index !== prev && !isScrollingRef.current) {
                  return index;
                }
                return prev;
              });

              if (index === 3 && viewedSectionsRef.current.size === 4) {
                setAllSectionsViewed(true);
              }
            }
          });
        },
        {
          threshold: [0, 0.3, 0.5, 0.7, 1],
          rootMargin: "-15% 0px -15% 0px",
        }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Обработчик скролла для автоматического переключения между секциями
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      const containerTop = containerRect.top;
      const containerBottom = containerRect.bottom;
      const windowHeight = window.innerHeight;

      // Проверяем, находится ли контейнер Values в видимой области
      const isContainerVisible =
        containerBottom > windowHeight * 0.1 &&
        containerTop < windowHeight * 0.9;

      if (!isContainerVisible) return;

      const currentSectionElement = sectionRefs.current[currentSection];
      if (!currentSectionElement) return;

      const sectionRect = currentSectionElement.getBoundingClientRect();
      const sectionBottom = sectionRect.bottom;
      const sectionTop = sectionRect.top;

      // Проверяем, достигли ли конца текущей секции
      const isAtSectionBottom = sectionBottom <= windowHeight + 50;
      const isAtSectionTop = sectionTop >= -50;

      // Скролл вниз
      if (e.deltaY > 0) {
        if (isAtSectionBottom) {
          // Если не последняя секция, автоматически переключаемся на следующую
          if (currentSection < 3) {
            e.preventDefault();
            isScrollingRef.current = true;
            const nextSection = currentSection + 1;

            // Прокручиваем к следующей секции
            sectionRefs.current[nextSection]?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });

            setTimeout(() => {
              setCurrentSection(nextSection);
              viewedSectionsRef.current.add(nextSection);

              // Проверяем, все ли секции просмотрены
              if (nextSection === 3 && viewedSectionsRef.current.size === 4) {
                setAllSectionsViewed(true);
              }

              isScrollingRef.current = false;
            }, 800);
          }
          // Если последняя секция и все просмотрены, позволяем скроллить дальше
          else if (currentSection === 3) {
            if (allSectionsViewed) {
              // Разрешаем скролл к Team
              return;
            } else {
              // Блокируем скролл, если не все просмотрены
              e.preventDefault();
            }
          }
        }
      }
      // Скролл вверх
      else if (e.deltaY < 0) {
        if (isAtSectionTop && currentSection > 0) {
          e.preventDefault();
          isScrollingRef.current = true;
          const prevSection = currentSection - 1;

          sectionRefs.current[prevSection]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          setTimeout(() => {
            setCurrentSection(prevSection);
            isScrollingRef.current = false;
          }, 800);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentSection, allSectionsViewed]);

  return (
    <div ref={containerRef} className="relative">
      {valuesData.map((value, index) => (
        <div
          key={index}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
          className="h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 xl:px-20 py-8 md:py-12 lg:py-16 relative"
        >
          {/* Фон на всю ширину экрана */}
          <div
            className="absolute inset-y-0 z-0"
            style={{
              backgroundColor: value.bgColor,
              left: "-33.333333vw",
              width: "100vw",
            }}
          />

          {/* Контент поверх фона */}
          <div className="relative z-10 w-full h-full flex items-center justify-end">
            {/* Внутренняя обертка для блока с картинкой и заголовком */}
            <div className="flex justify-end flex-col lg:flex-row items-center lg:items-start gap-6 md:gap-8 lg:gap-[15px]">
              {/* Картинка с адаптивными размерами */}
              <div className="relative h-[250px] w-[280px] sm:h-[300px] sm:w-[320px] md:h-[350px] md:w-[380px] lg:h-[400px] lg:w-[420px] xl:h-[468px] xl:w-[450px] shrink-0">
                <Image
                  src={value.image}
                  alt={value.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 380px, (max-width: 1280px) 420px, 450px"
                />

                {/* Подзаголовок с подчеркиванием - абсолютно позиционирован */}
                <div
                  className="absolute text-white hidden lg:block"
                  style={{
                    left: "300px",
                    top: "120px",
                    width: "610px",
                    height: "217px",
                    fontWeight: 500,
                    fontStyle: "normal",
                    fontSize: "25px",
                    lineHeight: "50px",
                    letterSpacing: "0%",
                    textAlign: "justify",
                  }}
                >
                  <p>
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
                </div>
              </div>

              {/* Контент справа от картинки */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 md:gap-6 lg:gap-[15px] w-full lg:w-auto">
                {/* Заголовок - всегда показываем на мобильных, на десктопе справа от картинки */}
                <h2
                  className="text-white text-center lg:text-left"
                  style={{
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "clamp(28px, 5vw, 40px)",
                    lineHeight: "clamp(32px, 5.5vw, 45px)",
                    letterSpacing: "0%",
                    textAlign: "justify",
                    textAlignLast: "justify",
                    textTransform: "uppercase",
                    width: "100%",
                    maxWidth: "445px",
                    marginTop: "5px",
                    display: "block",
                  }}
                  dangerouslySetInnerHTML={{ __html: value.title }}
                />

                {/* Подзаголовок для мобильных устройств (скрыт на десктопе) */}
                <div className="lg:hidden w-full max-w-2xl mx-auto mt-4 md:mt-6">
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
          </div>
        </div>
      ))}
    </div>
  );
}
