"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
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
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const startYRef = useRef(0);
  const startScrollTopRef = useRef(0);

  // Получаем ширину карточки с учетом gap
  const getCardWidth = useCallback(() => {
    if (typeof window === "undefined") return 304;

    const width = window.innerWidth;
    if (width < 768) return 304; // 280px + 24px gap
    if (width < 1024) return 352; // 320px + 32px gap
    return 372; // 340px + 32px gap
  }, []);

  // Функция для привязки к ближайшей карточке
  const snapToNearestCard = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = getCardWidth();
    const snappedPosition = Math.round(scrollLeft / cardWidth) * cardWidth;

    container.scrollTo({
      left: snappedPosition,
      behavior: 'smooth'
    });
  }, [getCardWidth]);

  // Обработчики для мыши
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;

    isDraggingRef.current = true;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    startYRef.current = e.pageY;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
    startScrollTopRef.current = window.pageYOffset || document.documentElement.scrollTop;

    // Добавляем класс для изменения курсора
    scrollContainerRef.current.style.cursor = 'grabbing';
    scrollContainerRef.current.style.userSelect = 'none';

    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;

    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const deltaX = x - startXRef.current;

    // Проверяем, горизонтальное ли это движение
    const deltaY = Math.abs(e.pageY - startYRef.current);

    // Если движение в основном горизонтальное, скроллим контейнер
    if (Math.abs(deltaX) > deltaY) {
      e.preventDefault();
      const walk = deltaX * 1.5;
      scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
    } else {
      // Если движение вертикальное, скроллим страницу
      const scrollTop = startScrollTopRef.current + (startYRef.current - e.pageY);
      window.scrollTo(0, scrollTop);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (isDraggingRef.current && scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
      scrollContainerRef.current.style.userSelect = 'auto';

      // Проверяем, было ли движение
      if (Math.abs(scrollContainerRef.current.scrollLeft - scrollLeftRef.current) > 5) {
        snapToNearestCard();
      }
    }

    isDraggingRef.current = false;
  }, [snapToNearestCard]);

  // Обработчики для тач-устройств
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    const touch = e.touches[0];
    startXRef.current = touch.pageX - scrollContainerRef.current.offsetLeft;
    startYRef.current = touch.pageY;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
    startScrollTopRef.current = window.pageYOffset || document.documentElement.scrollTop;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    const touch = e.touches[0];
    const x = touch.pageX - scrollContainerRef.current.offsetLeft;
    const deltaX = x - startXRef.current;
    const deltaY = Math.abs(touch.pageY - startYRef.current);

    // Если движение в основном горизонтальное, скроллим контейнер
    if (Math.abs(deltaX) > deltaY) {
      e.preventDefault();
      const walk = deltaX * 1.5;
      scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
    } else {
      // Если движение вертикальное, скроллим страницу
      const scrollTop = startScrollTopRef.current + (startYRef.current - touch.pageY);
      window.scrollTo(0, scrollTop);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    snapToNearestCard();
  }, [snapToNearestCard]);

  // Добавляем обработчики событий мыши
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleMouseMoveGlobal = (e: MouseEvent) => handleMouseMove(e);
    const handleMouseUpGlobal = () => handleMouseUp();

    document.addEventListener('mousemove', handleMouseMoveGlobal);
    document.addEventListener('mouseup', handleMouseUpGlobal);

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveGlobal);
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Предотвращаем drag изображений
  const preventImageDrag = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  // Стили для скрытия скроллбара
  const scrollbarHideStyles = {
    WebkitOverflowScrolling: 'touch' as const,
    scrollbarWidth: 'none' as const,
    msOverflowStyle: 'none' as const,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  };

  return (
    <section className="relative w-full overflow-x-hidden px-4 md:px-8 lg:px-16 py-6 md:py-12 lg:py-16">
      {/* FRAME + CROSSES BLOCK */}
      <div className="relative mt-30 md:mt-24 lg:mt-[180px] mb-16 md:mb-32 lg:mb-[300px] flex justify-end">
        <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-[184px] lg:h-[184px]">
          <Image
            src="/frames/frame_team_1.png"
            alt="Frame Team"
            width={184}
            height={184}
            className="w-full h-full object-contain"
            priority
            quality={100}
          />

          <div className="absolute left-[-50px] top-[-50px]">
            <Cross color="#35353C" />
          </div>
          <div className="absolute left-[-50px] bottom-[-50px]">
            <Cross color="#35353C" />
          </div>
        </div>
      </div>

      {/* ОРИГИНАЛЬНЫЙ ДИЗАЙН ТОЛЬКО НА ЭКРАНАХ >= 1540px */}
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
                  sizes="(min-width: 1540px) 1000px, 140px"
                  quality={100}
                />
              </div>

              <div className="mt-6 h-[70px] overflow-hidden w-[350px]">
                <div
                  className={`transition-all duration-300
                    ${isActive
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
          className="w-full overflow-x-auto overflow-y-visible cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            ...scrollbarHideStyles,
            scrollSnapType: 'x mandatory',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="flex mt-20 mb-18 gap-6 md:gap-8 px-4 md:px-8 lg:px-16 pb-8 min-w-max">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="relative shrink-0 select-none w-[280px] md:w-[320px] lg:w-[340px]"
                style={{
                  scrollSnapAlign: 'start',
                  scrollSnapStop: 'always',
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* IMAGE */}
                <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    draggable={false}
                    onDragStart={preventImageDrag}
                    style={{
                      objectPosition: `calc(50% + ${member.offset}px) 50%`,
                    }}
                    sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 340px"
                    quality={100}
                  />
                </div>

                {/* TEXT */}
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
            ))}
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
            quality={100}
          />

          <div className="absolute left-[-50px] top-[-50px] sm:right-[-50px] sm:bottom-[-50px]">
            <Cross color="#35353C" />
          </div>
          <div className="absolute left-[-50px] bottom-[-50px]">
            <Cross color="#35353C" />
          </div>
        </div>
      </div>
    </section>
  );
}