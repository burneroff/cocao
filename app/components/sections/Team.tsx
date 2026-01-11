import Image from "next/image";
import { useState } from "react";
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
    name: "Stanislay Kotau",
    position: "Cccc",
    image: "/team/Stanislay Kotau.png",
    offset: 5,
  },
  {
    name: "Kiryl Sauchuk",
    position: "Human Resources Generalist",
    image: "/team/Kiryl Sauchuk.png",
    offset: 15,
  },
  {
    name: "Anna Tsilind",
    position: "Product Manager",
    image: "/team/Anna Tsilind.png",
    offset: 15,
  },
  {
    name: "Ruslan Larbi",
    position: "Product Manager",
    image: "/team/Ruslan Larbi.png",
    offset: 0,
  },
  {
    name: "Krukau Yauheni",
    position: "Product Manager",
    image: "/team/Krukau Yauheni.png",
    offset: 0,
  },
];

export default function Team() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

      {/* ОРИГИНАЛЬНЫЙ ДИЗАЙН ТОЛЬКО НА 2XL И ВЫШЕ (1536px+) - СЕРЫЕ КАРТОЧКИ */}
      <div className="hidden 2xl:flex justify-end">
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
                  sizes="(min-width: 1536px) 340px, 140px"
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

      {/* СЕТКА 4 КОЛОНКИ ДЛЯ ЭКРАНОВ lg-xl (1280px-1535px) */}
      <div className="hidden lg:grid 2xl:hidden">
        <div className="grid grid-cols-4 gap-8 max-w-7xl mx-auto">
          {team.map((member, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={member.name}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => setActiveIndex(index)}
                className="relative cursor-pointer"
              >
                {/* IMAGE - ВСЕГДА ЦВЕТНАЯ, ФИКСИРОВАННАЯ ВЫСОТА */}
                <div className="relative w-full h-[400px] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale-0"
                    style={{
                      objectPosition: `calc(50% + ${member.offset}px) 50%`,
                    }}
                    sizes="25vw"
                  />
                </div>

                {/* TEXT - ВСЕГДА ВИДИМ */}
                <div className="mt-6">
                  <p
                    className="text-xl font-medium mb-2"
                    style={{ color: "#3F3E3D" }}
                  >
                    {member.position}
                  </p>
                  <p
                    className="text-base font-normal"
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

      {/* СЕТКА 2 КОЛОНКИ ДЛЯ ЭКРАНОВ sm-md (640px-1279px) */}
      <div className="hidden sm:grid lg:hidden">
        <div className="grid grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          {team.map((member, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={member.name}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => setActiveIndex(index)}
                className="relative cursor-pointer"
              >
                {/* IMAGE - ВСЕГДА ЦВЕТНАЯ, ФИКСИРОВАННАЯ ВЫСОТА */}
                <div className="relative w-full h-[350px] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale-0"
                    style={{
                      objectPosition: `calc(50% + ${member.offset}px) 50%`,
                    }}
                    sizes="50vw"
                  />
                </div>

                {/* TEXT - ВСЕГДА ВИДИМ */}
                <div className="mt-4 md:mt-6">
                  <p
                    className="text-lg md:text-xl font-medium mb-1 md:mb-2"
                    style={{ color: "#3F3E3D" }}
                  >
                    {member.position}
                  </p>
                  <p
                    className="text-sm md:text-base font-normal"
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

      {/* СЕТКА 1 КОЛОНКА ДЛЯ МОБИЛЬНЫХ ЭКРАНОВ (< 640px) */}
      <div className="sm:hidden">
        <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
          {team.map((member, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={member.name}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => setActiveIndex(index)}
                className="relative cursor-pointer"
              >
                {/* IMAGE - ВСЕГДА ЦВЕТНАЯ, ФИКСИРОВАННАЯ ВЫСОТА */}
                <div className="relative w-full h-[300px] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale-0"
                    style={{
                      objectPosition: `calc(50% + ${member.offset}px) 50%`,
                    }}
                    sizes="100vw"
                  />
                </div>

                {/* TEXT - ВСЕГДА ВИДИМ */}
                <div className="mt-4">
                  <p
                    className="text-lg font-medium mb-1"
                    style={{ color: "#3F3E3D" }}
                  >
                    {member.position}
                  </p>
                  <p
                    className="text-sm font-normal"
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
