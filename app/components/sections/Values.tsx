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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isScrollingRef = useRef(false);
  const viewedSectionsRef = useRef<Set<number>>(new Set([0]));
  const hasScrolledToSectionRef = useRef(false);
  const isProgrammaticScrollRef = useRef(false);

  useEffect(() => {
    viewedSectionsRef.current.add(currentSection);
    if (viewedSectionsRef.current.size === valuesData.length) {
      setAllSectionsViewed(true);
    }
  }, [currentSection]);

  // Отслеживание программной прокрутки через навигацию
  useEffect(() => {
    const handleProgrammaticScroll = () => {
      isProgrammaticScrollRef.current = true;
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 1500); // Длительность достаточная для smooth scroll
    };

    // Слушаем событие программной прокрутки
    window.addEventListener('programmatic-scroll-start', handleProgrammaticScroll);

    return () => {
      window.removeEventListener('programmatic-scroll-start', handleProgrammaticScroll);
    };
  }, []);

  // Отслеживаем видимость секции и прокручиваем к началу при входе
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            // Прокручиваем к началу секции плавно только при первом входе
            // Но не если идет программная прокрутка из навигации
            if (!hasScrolledToSectionRef.current && !isProgrammaticScrollRef.current) {
              hasScrolledToSectionRef.current = true;
              setTimeout(() => {
                if (containerRef.current && !isProgrammaticScrollRef.current) {
                  const elementTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({
                    top: elementTop,
                    behavior: "smooth"
                  });
                }
              }, 100);
            }
          } else if (!entry.isIntersecting) {
            hasScrolledToSectionRef.current = false;
          }
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Обработчик скролла для плавного переключения между значениями
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Если идет программная прокрутка из навигации, не блокируем её
      if (isProgrammaticScrollRef.current) {
        return;
      }

      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      const containerTop = containerRect.top;
      const containerBottom = containerRect.bottom;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const elementTop = containerRect.top + scrollY;
      const isPartiallyVisible = containerBottom > 0 && containerTop < windowHeight;
      const isPinned = containerTop <= 0 && containerBottom >= windowHeight;

      if (!isPartiallyVisible) {
        return;
      }

      // Если секция видна, но еще не зафиксирована в вьюпорте — плавно доводим до верха
      if (!isPinned) {
        // Если первый элемент и скролл вверх - разрешаем выход
        if (currentSection === 0 && e.deltaY < 0) {
          return;
        }
        // Если последний элемент, все просмотрены и скролл вниз - разрешаем выход
        if (currentSection === valuesData.length - 1 && allSectionsViewed && e.deltaY > 0) {
          return;
        }

        if (!isProgrammaticScrollRef.current) {
          e.preventDefault();
          isScrollingRef.current = true;

          window.scrollTo({
            top: elementTop,
            behavior: "smooth",
          });

          setTimeout(() => {
            isScrollingRef.current = false;
          }, 800);
        }
        return;
      }

      // Скролл вниз
      if (e.deltaY > 0) {
        // Если последний элемент и все просмотрены - разрешаем выход
        if (currentSection === valuesData.length - 1 && allSectionsViewed) {
          return;
        }
        
        if (currentSection < valuesData.length - 1) {
          e.preventDefault();
          isScrollingRef.current = true;
          const nextSection = currentSection + 1;

          setCurrentSection(nextSection);
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 600);
        } else if (currentSection === valuesData.length - 1) {
          if (!allSectionsViewed) {
            e.preventDefault();
          }
        }
      }
      // Скролл вверх
      else if (e.deltaY < 0) {
        // Если первый элемент - разрешаем выход
        if (currentSection === 0) {
          return;
        }
        
        if (currentSection > 0) {
          e.preventDefault();
          isScrollingRef.current = true;
          const prevSection = currentSection - 1;

          setCurrentSection(prevSection);

          setTimeout(() => {
            isScrollingRef.current = false;
          }, 600);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentSection, allSectionsViewed]);

  const currentValue = valuesData[currentSection];

  return (
    <div 
      ref={containerRef} 
      className="relative h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 xl:px-20 py-8 md:py-12 lg:py-16"
    >
      {/* Фон на всю ширину экрана с плавным переходом */}
      <div
        className="absolute inset-y-0 z-0 transition-colors ease-in-out"
        style={{
          backgroundColor: currentValue.bgColor,
          width: "150vw",
          height: "100%",
          transitionDuration: "600ms",
        }}
      />

      {/* Контент поверх фона с плавной анимацией появления */}
      <div className="relative z-10 h-full flex items-center justify-end w-full">
        {/* Внутренняя обертка для блока с картинкой и заголовком */}
        <div className="flex flex-col w-full 2xl:w-[910px] 2xl:flex-row items-center md:items-start 2xl:items-start gap-6 md:gap-8 2xl:gap-[15px] min-[1775px]:ml-[100px]">
          {/* Картинка с адаптивными размерами и плавной сменой */}
          <div className="relative h-[250px] w-[280px] sm:h-[300px] sm:w-[320px] md:h-[350px] md:w-[380px] lg:h-[400px] lg:w-[420px] xl:h-[468px] xl:w-[450px] 2xl:h-[468px] 2xl:w-[450px] shrink-0">
            {valuesData.map((value, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity ease-in-out ${
                  index === currentSection ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDuration: "600ms" }}
              >
                <Image
                  src={value.image}
                  alt={value.title}
                  fill
                  className="object-contain ml-[15px]"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 380px, (max-width: 1280px) 420px, (max-width: 1536px) 450px, 450px"
                />
              </div>
            ))}

            {/* Подзаголовок с подчеркиванием - абсолютно позиционирован (только для десктопа) */}
            <div
              className="absolute text-white hidden 2xl:block 2xl:ml-[30px]"
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
                  className={`transition-opacity ease-in-out ${
                    index === currentSection ? "opacity-100" : "opacity-0 absolute inset-0"
                  }`}
                  style={{ transitionDuration: "600ms" }}
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

          <div className="flex flex-col 2xl:flex-row items-center md:items-start 2xl:items-start gap-4 md:gap-6 2xl:gap-[15px] w-full 2xl:w-auto">
            {/* Заголовок с плавной сменой */}
            {valuesData.map((value, index) => (
              <h2
                key={index}
                className={`text-white text-center 2xl:text-left px-4 2xl:ml-[30px] transition-opacity ease-in-out ${
                  index === currentSection ? "opacity-100" : "opacity-0 absolute"
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
                  transitionDuration: "600ms",
                }}
                dangerouslySetInnerHTML={{ __html: value.title }}
              />
            ))}

            {/* Подзаголовок для устройств меньше 1400px (скрыт на десктопе 1400+) */}
            <div className="2xl:hidden w-full max-w-2xl mx-auto px-4 mt-4 md:mt-6 relative">
              {valuesData.map((value, index) => (
                <p
                  key={index}
                  className={`text-white text-justify transition-opacity ease-in-out ${
                    index === currentSection ? "opacity-100" : "opacity-0 absolute inset-0"
                  }`}
                  style={{
                    fontWeight: 500,
                    fontStyle: "normal",
                    fontSize: "clamp(16px, 3vw, 20px)",
                    lineHeight: "clamp(24px, 4vw, 32px)",
                    letterSpacing: "0%",
                    transitionDuration: "600ms",
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
