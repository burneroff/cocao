"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { Cross } from "../icons/Cross";

const team = [
  {
    name: "Ivan Marzan",
    position: "CEO",
    image: "/team/Ivan Marzan.png",
    offset: -10,
  },
  {
    name: "Anna Marzan",
    position: "CEO",
    image: "/team/Anna Marzan.png",
    offset: 25,
  },
  {
    name: "Radzivon Bartoshyk",
    position: "Chief Technology Officer",
    image: "/team/Radzivon Bartoshyk.png",
    offset: 15,
  },
  {
    name: "Krukau Yauheni",
    position: "Product Manager",
    image: "/team/Krukau Yauheni.png",
    offset: 0,
  },
  {
    name: "Anna Tsilind",
    position: "Product Manager",
    image: "/team/Anna Tsilind.png",
    offset: 15,
  },
  {
    name: "Kiryl Sauchuk",
    position: "Human Resources Generalist",
    image: "/team/Kiryl Sauchuk.png",
    offset: 15,
  },
  {
    name: "Ruslan Larbi",
    position: "Product Manager",
    image: "/team/Ruslan Larbi.png",
    offset: 0,
  },
  {
    name: "Stanislay Kotau",
    position: "Head of Marketing",
    image: "/team/Stanislay Kotau.png",
    offset: 5,
  },
];

export default function Team() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const momentumRafRef = useRef<number | null>(null);

  // Предотвращаем drag изображений
  const handleImageDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  const stopMomentum = () => {
    if (momentumRafRef.current) {
      cancelAnimationFrame(momentumRafRef.current);
      momentumRafRef.current = null;
    }
  };

  const startMomentum = () => {
    if (!scrollContainerRef.current) return;
    stopMomentum();

    const step = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const velocity = velocityRef.current;
      if (Math.abs(velocity) < 0.02) {
        velocityRef.current = 0;
        return;
      }

      container.scrollLeft -= velocity * 30;
      velocityRef.current *= 0.9;
      momentumRafRef.current = requestAnimationFrame(step);
    };

    momentumRafRef.current = requestAnimationFrame(step);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!scrollContainerRef.current) return;
    if (e.button !== 0 && e.pointerType === "mouse") return;

    e.currentTarget.setPointerCapture(e.pointerId);
    stopMomentum();
    setIsDragging(true);

    startXRef.current = e.clientX;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();

    const currentX = e.clientX;
    const deltaX = currentX - startXRef.current;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - deltaX * 1.6;

    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    velocityRef.current = ((currentX - lastXRef.current) / dt) * 1.6;
    lastXRef.current = currentX;
    lastTimeRef.current = now;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!scrollContainerRef.current) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsDragging(false);
    startMomentum();
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    startMomentum();
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollContainerRef.current) return;
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();
    scrollContainerRef.current.scrollLeft += e.deltaY * 1.5;
  };

  return (
    <section className="relative w-full overflow-x-hidden px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
      {/* FRAME + CROSSES BLOCK */}
      <div className="relative mt-12 md:mt-24 lg:mt-[180px] mb-16 md:mb-32 lg:mb-[300px] flex justify-end">
        <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-[184px] lg:h-[184px]">
          <Image
            src="/frames/frame_team_1.png"
            alt="Frame Team"
            width={184}
            height={184}
            className="w-full h-full object-contain"
            priority
          />

          {/* Crosses - скрыть на маленьких экранах */}
          <div className="hidden lg:block absolute left-[-354px] top-[-50px]">
            <Cross color="#35353C" />
          </div>
          <div className="hidden lg:block absolute left-[-354px] bottom-[-50px]">
            <Cross color="#35353C" />
          </div>
          <div className="hidden lg:block absolute left-[-50px] bottom-[-50px]">
            <Cross color="#35353C" />
          </div>
        </div>
      </div>

      {/* ОРИГИНАЛЬНЫЙ ДИЗАЙН ТОЛЬКО НА ЭКРАНАХ >= 1540px - СЕРЫЕ КАРТОЧКИ */}
      <div className="hidden team-large-screen justify-end">
        {team.map((member, index) => {
          const isActive = activeIndex === index;
          const baseWidth = index === 0 ? "w-[140px]" : "w-[110px]";

          return (
            <div
              key={member.name}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`relative cursor-pointer transition-all duration-500 ease-in-out
                ${isActive ? "w-[340px] z-10" : baseWidth}
              `}
            >
              {/* IMAGE */}
              <div className="relative w-full h-[450px] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className={`object-cover grayscale transition-all duration-500
                    ${isActive ? "grayscale-0" : ""}
                  `}
                  style={{
                    objectPosition: isActive
                      ? "50% 50%"
                      : `calc(50% + ${member.offset}px) 50%`,
                  }}
                  sizes="(min-width: 1540px) 340px, 140px"
                />
              </div>

              {/* TEXT */}
              <div className="mt-6 h-[70px] overflow-hidden w-[350px]">
                <div
                  className={`transition-all duration-300
                    ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }
                  `}
                >
                  <p
                    className="text-[25px] leading-[35px] font-medium"
                    style={{ color: "#3F3E3D" }}
                  >
                    {member.position}
                  </p>
                  <p
                    className="text-[16px] leading-[25px] font-normal"
                    style={{ color: "#3F3E3D" }}
                  >
                    {member.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ ДЛЯ ЭКРАНОВ < 1540px */}
      <div className="team-small-screen">
        <div
          ref={scrollContainerRef}
          className={`w-full overflow-x-auto overflow-y-visible scrollbar-hide select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onWheel={handleWheel}
          style={{
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth",
            scrollSnapType: "x mandatory",
            overscrollBehaviorX: "contain",
            touchAction: "pan-y",
          }}
        >
          <div className="flex gap-6 md:gap-8 px-4 md:px-8 lg:px-16 pb-8" style={{ width: 'max-content' }}>
            {team.map((member, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={member.name}
                  onMouseEnter={() => !isDragging && setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={`relative transition-all duration-500 ease-in-out shrink-0 select-none
                    ${isActive ? "scale-105 z-10" : ""}
                    w-[280px] md:w-[320px] lg:w-[340px]
                  `}
                  style={{
                    scrollSnapAlign: "start",
                    scrollSnapStop: "always",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    pointerEvents: isDragging ? "none" : "auto",
                  }}
                >
                  {/* IMAGE - ВСЕГДА ЦВЕТНАЯ */}
                  <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden select-none pointer-events-none">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale-0 select-none"
                      draggable={false}
                      onDragStart={handleImageDragStart}
                      style={{
                        objectPosition: `calc(50% + ${member.offset}px) 50%`,
                        userSelect: "none",
                        WebkitUserSelect: "none",
                      } as React.CSSProperties}
                      sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 340px"
                    />
                  </div>

                  {/* TEXT - ВСЕГДА ВИДИМ */}
                  <div className="mt-6">
                    <p
                      className="text-xl md:text-2xl lg:text-[25px] leading-[30px] md:leading-[35px] font-medium mb-2"
                      style={{ color: "#3F3E3D" }}
                    >
                      {member.position}
                    </p>
                    <p
                      className="text-base md:text-lg lg:text-[16px] leading-[24px] md:leading-[25px] font-normal"
                      style={{ color: "#3F3E3D" }}
                    >
                      {member.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>


      {/* ВТОРАЯ РАМКА */}
      <div className="relative mt-12 md:mt-24 lg:mt-[180px] mb-8 md:mb-16 lg:mb-[300px] flex justify-end lg:mr-[300px]">
        <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-[184px] lg:h-[184px]">
          <Image
            src="/frames/frame_team_2.png"
            alt="Frame Team"
            width={184}
            height={184}
            className="w-full h-full object-contain"
          />

          {/* Crosses - скрыть на маленьких экранах */}
          <div className="hidden lg:block absolute right-[-50px] bottom-[-50px]">
            <Cross color="#35353C" />
          </div>
          <div className="hidden lg:block absolute left-[-50px] bottom-[-50px]">
            <Cross color="#35353C" />
          </div>
        </div>
      </div>
    </section>
  );
}
