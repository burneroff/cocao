"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Cross } from "../icons/Cross";

export default function Mission() {
  const [isVisible, setIsVisible] = useState(false);
  const [spansAnimated, setSpansAnimated] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    value1: 0,
    value2: 0,
    value3: 0,
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Запускаем анимацию span через 1.5 секунды после появления блока
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setSpansAnimated(true);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Анимация чисел от 0 до целевых значений
  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 секунды
      const startTime = Date.now();
      const targetValues = { value1: 30, value2: 28, value3: 1.7 };

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function для плавной анимации
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

        const easedProgress = easeOutCubic(progress);

        setAnimatedValues({
          value1: Math.floor(targetValues.value1 * easedProgress),
          value2: Math.floor(targetValues.value2 * easedProgress * 100) / 100,
          value3: Math.floor(targetValues.value3 * easedProgress * 100) / 100,
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Убеждаемся, что финальные значения точные
          setAnimatedValues({
            value1: targetValues.value1,
            value2: targetValues.value2,
            value3: targetValues.value3,
          });
        }
      };

      // Запускаем анимацию через небольшую задержку после появления блока
      const timer = setTimeout(() => {
        animate();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div
      ref={sectionRef}
      className={`min-h-[100vh] md:min-h-[120vh] flex items-start justify-end px-4 py-4 md:px-16 md:py-16 relative transition-opacity duration-1000 overflow-x-hidden ${isVisible ? "opacity-100" : "opacity-0"
        }`}
    >
      <div className="flex justify-end flex-col">
        <div
          data-snap-target="mission"
          className="text-[#CDCDCD] font-normal leading-normal md:leading-[70px] tracking-[0%] text-justify w-full max-w-full md:max-w-[910px]"
          style={{
            fontFamily: "var(--font-neue-regrade), Neue Regrade, sans-serif",
            fontSize: "clamp(20px, 4vw, 2.5rem)",
            lineHeight: "clamp(32px, 5vw, 70px)",
          }}
        >
          <p className="mb-4 md:mb-8">
            We create mobile{" "}
            <span
              className={`text-highlight ${spansAnimated ? "animated" : ""}`}
            >
              <span>products</span>
            </span>{" "}
            that make life simpler,{" "}
            <span
              className={`text-highlight ${spansAnimated ? "animated" : ""}`}
              style={{ transitionDelay: spansAnimated ? "0.05s" : "0s" }}
            >
              <span>more engaging,</span>
            </span>{" "}
            and{" "}
            <span
              className={`text-highlight ${spansAnimated ? "animated" : ""}`}
              style={{ transitionDelay: spansAnimated ? "0.1s" : "0s" }}
            >
              <span>more mindful.</span>
            </span>{" "}
            In every project, we combine creativity, data, and attention to
            detail to deliver not just an app – but a{" "}
            <span
              className={`text-highlight ${spansAnimated ? "animated" : ""}`}
              style={{ transitionDelay: spansAnimated ? "0.15s" : "0s" }}
            >
              <span>clear, inspiring,</span>
            </span>{" "}
            and{" "}
            <span
              className={`text-highlight ${spansAnimated ? "animated" : ""}`}
              style={{ transitionDelay: spansAnimated ? "0.2s" : "0s" }}
            >
              <span>genuinely useful</span>
            </span>{" "}
            digital experience.
          </p>
        </div>

        {/* 3 блока под текстом - адаптивные отступы */}
        <div className="flex flex-row gap-4 md:gap-12 lg:gap-[180px] mb-10 mt-8 md:mt-[100px] w-full max-w-full md:max-w-[910px]">
          {/* Блок 1: 30+ Products */}
          <div className="flex flex-col items-left">
            <div className="text-[48px] md:text-[40px] lg:text-[64px] text-[#CDCDCD] font-normal md:font-medium leading-[48px] md:leading-[48px] lg:leading-[100%] tracking-[0%] uppercase mb-2 md:mb-4">
              {animatedValues.value1}+
            </div>
            <div className="text-[12px] md:text-[16px] lg:text-[25px] text-[#CDCDCD] font-normal md:font-medium leading-[16px] md:leading-[24px] lg:leading-[35px] tracking-[0%] text-left">
              Products
            </div>
          </div>

          {/* Блок 2: 28m+ Installs Worldwide */}
          <div className="flex flex-col items-left">
            <div className="text-[48px] md:text-[40px] lg:text-[64px] text-[#CDCDCD] font-normal md:font-medium leading-[48px] md:leading-[48px] lg:leading-[100%] tracking-[0%] uppercase mb-2 md:mb-4">
              {Math.floor(animatedValues.value2)}m+
            </div>
            <div className="text-[12px] md:text-[16px] lg:text-[25px] text-[#CDCDCD] font-normal md:font-medium leading-[16px] md:leading-[24px] lg:leading-[35px] tracking-[0%] text-left">
              Installs Worldwide
            </div>
          </div>

          {/* Блок 3: 1.7m+ Monthly Active Users */}
          <div className="flex flex-col items-left">
            <div className="text-[48px] md:text-[40px] lg:text-[64px] text-[#CDCDCD] font-normal md:font-medium leading-[48px] md:leading-[48px] lg:leading-[100%] tracking-[0%] uppercase mb-2 md:mb-4">
              {animatedValues.value3.toFixed(1)}m+
            </div>
            <div className="text-[12px] md:text-[16px] lg:text-[25px] text-[#CDCDCD] font-normal md:font-medium leading-[16px] md:leading-[24px] lg:leading-[35px] tracking-[0%] text-left">
              Monthly Active Users
            </div>
          </div>
        </div>
      </div>

      {/* Картинка по центру правой части секции - адаптивное позиционирование */}
      <div className="absolute right-1/2 translate-x-1/2 2xl:translate-x-[calc(50%+90px)] bottom-[100px] md:bottom-0 md:-translate-y-1/2 w-[85px] h-[85px] md:w-[150px] md:h-[150px] lg:w-[184px] lg:h-[184px]">
        <Image
          src="/frames/frame_mission.png"
          alt="Frame Mission"
          width={184}
          height={184}
          className="w-full h-full object-contain"
          priority
        />

        {/* Первый Cross - адаптивное позиционирование */}
        <div className="absolute left-[-30px] md:left-[-45px] lg:left-[-60px] bottom-[-30px] md:bottom-[-40px] lg:bottom-[-50px]">
          <Cross
            color="#000000"
            className="w-4 h-4 md:w-8 md:h-8 lg:w-auto lg:h-auto"
          />
        </div>

        {/* Второй Cross - адаптивное позиционирование */}
        <div className="absolute right-[-30px] md:right-[-45px] lg:right-[-60px] top-[-30px] md:top-[-40px] lg:top-[-50px] md:block">
          <Cross
            color="#000000"
            className="w-4 h-4 md:w-8 md:h-8 lg:w-auto lg:h-auto"
          />
        </div>
      </div>
    </div>
  );
}
