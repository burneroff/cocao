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

  return (
    <div
      ref={sectionRef}
      className={`min-h-[90vh] sm:min-h-[70vh] md:min-h-[150vh] flex items-start justify-end px-4 py-4 md:px-16 md:py-16 relative transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"
        }`}
    >
      <div className="flex justify-end flex-col">
        <div
          className="text-[#CDCDCD] font-normal leading-normal md:leading-[70px] tracking-[0%] text-justify w-full max-w-full md:max-w-[910px]"
          style={{
            fontSize: "clamp(20px, 3vw, 40px)",
            lineHeight: "clamp(32px, 5vw, 70px)",
          }}
        >
          <p className="mb-4 md:mb-8">
            We're a product team developing and growing mobile{" "}
            <span
              className={`text-highlight ${spansAnimated ? "animated" : ""}`}
            >
              <span>
                apps in Health & Wellness, Entertainment, and Utilities
              </span>
            </span>{" "}
            categories. Our focus is not just on launching new products, but on
            building sustainable growth models, creating long-lasting projects,
            and turning{" "}
            <span
              className={`text-highlight ${spansAnimated ? "animated" : ""}`}
              style={{ transitionDelay: spansAnimated ? "0.1s" : "0s" }}
            >
              <span>ideas into clear, useful digital experiences.</span>
            </span>
          </p>
          <p>
            Our team is distributed across several countries, but we share the
            same DNA – curio
            <span
              className={`text-highlight ${spansAnimated ? "animated" : ""}`}
              style={{ transitionDelay: spansAnimated ? "0.2s" : "0s" }}
            >
              <span>sity, creativity, and</span>
            </span>{" "}
            the drive to build products people genuinely love to use.
          </p>
        </div>
      </div>

      <div className="absolute right-1/2 translate-x-1/2 2xl:right-0 2xl:translate-x-0 bottom-[100px] md:bottom-[270px] 2xl:bottom-[170px] w-[85px] h-[85px] md:w-[184px] md:h-[184px]">
        <Image
          src="/frames/frame_US.png"
          alt="Frame US"
          width={184}
          height={184}
          className="w-full h-full object-contain"
          priority
        />

        {/* Первый Cross: адаптивное позиционирование */}
        <div className="absolute left-[150px] md:left-[-90px] bottom-[-30px] md:bottom-[-50px]">
          <Cross
            color="#CDCDCD"
            className="w-4 h-4 lg:w-auto lg:h-auto"
          />
        </div>

        {/* Второй Cross: адаптивное позиционирование */}
        <div className="absolute left-[-70px] md:left-[-300px] top-[-50px] md:top-[-100px] md:block">
          <Cross
            color="#CDCDCD"
            className="w-4 h-4 lg:w-auto lg:h-auto"
          />
        </div>
      </div>
    </div>
  );
}
