"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Cross } from "../icons/Cross";

export default function US() {
  const [isVisible, setIsVisible] = useState(false);
  const [spansAnimated, setSpansAnimated] = useState(false);
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
      { threshold: 0.2 }
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
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div
      ref={sectionRef}
      className={`min-h-[100vh] md:min-h-[150vh] flex items-start justify-end px-4 py-4 md:px-16 md:py-16 relative transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex justify-end flex-col">
        <div
          className="text-[#CDCDCD] font-normal leading-normal md:leading-[70px] tracking-[0%] text-justify w-full max-w-full md:max-w-[910px]"
          style={{
            fontSize: "clamp(20px, 4vw, 2.5rem)",
            lineHeight: "clamp(32px, 5vw, 3.5rem)",
          }}
        >
          <p className="mb-4 md:mb-8">
            We're a product team developing and growing mobile{" "}
            <span className="inline relative">
              <span className="relative z-10">
                apps in Health & Wellness, Entertainment, and Utilities
              </span>
              <span
                className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left transition-transform duration-800 ease-out"
                style={{
                  transform: spansAnimated ? "scaleX(1)" : "scaleX(0)",
                }}
              />
            </span>{" "}
            categories. Our focus is not just on launching new products, but on
            building sustainable growth models, creating long-lasting projects,
            and turning{" "}
            <span className="inline relative">
              <span className="relative z-10">
                ideas into clear, useful digital experiences.
              </span>
              <span
                className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left transition-transform duration-800 ease-out"
                style={{
                  transform: spansAnimated ? "scaleX(1)" : "scaleX(0)",
                  transitionDelay: "0.1s",
                }}
              />
            </span>
          </p>
          <p>
            Our team is distributed across several countries, but we share the
            same DNA – curio
            <span className="inline relative">
              <span className="relative z-10">
                sity, creativity, and
              </span>
              <span
                className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left transition-transform duration-800 ease-out"
                style={{
                  transform: spansAnimated ? "scaleX(1)" : "scaleX(0)",
                  transitionDelay: "0.2s",
                }}
              />
            </span>{" "}
            the drive to build products people genuinely love to use.
          </p>
        </div>
      </div>

      <div className="absolute right-4 md:right-[70px] bottom-[100px] md:bottom-[270px] w-[184px] h-[184px]">
        <Image
          src="/frames/frame_US.png"
          alt="Frame US"
          width={184}
          height={184}
          className="w-full h-full object-contain"
          priority
        />

        {/* Первый Cross: адаптивное позиционирование */}
        <div className="absolute left-[-50px] md:left-[-90px] bottom-[-30px] md:bottom-[-50px]">
          <Cross color="#CDCDCD" className="w-8 h-8 md:w-auto md:h-auto" />
        </div>

        {/* Второй Cross: адаптивное позиционирование */}
        <div className="absolute left-[-150px] md:left-[-300px] top-[-50px] md:top-[-100px] md:block">
          <Cross color="#CDCDCD" className="w-8 h-8 md:w-auto md:h-auto" />
        </div>
      </div>
    </div>
  );
}
