"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Cross } from "../icons/Cross";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const team = [
  {
    name: "Ivan Marzan",
    position: "CEO",
    image: "/team/Ivan_Marzan.png",
    offset: -10,
  },
  {
    name: "Anna Marzan",
    position: "CEO",
    image: "/team/Anna_Marzan.png",
    offset: 28,
  },
  {
    name: "Radzivon Bartoshyk",
    position: "Chief Technology Officer",
    image: "/team/Radzivon_Bartoshyk.png",
    offset: 15,
  },
  {
    name: "Eugene Krukov",
    position: "Product Manager",
    image: "/team/Krukau_Yauheni.png",
    offset: -3,
  },
  {
    name: "Anna Tsilind",
    position: "Product Manager",
    image: "/team/Anna_Tsilind.png",
    offset: 15,
  },
  {
    name: "Kiryl Sauchuk",
    position: "Human Resources Generalist",
    image: "/team/Kiryl_Sauchuk.png",
    offset: 15,
  },
  {
    name: "Ruslan Larbi",
    position: "Product Manager",
    image: "/team/Ruslan_Larbi.png",
    offset: 0,
  },
  {
    name: "Stanislay Kotau",
    position: "Head of Marketing",
    image: "/team/Stanislay_Kotau.png",
    offset: 5,
  },
];

export default function Team() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (index: number) => {
    hoverTimeout.current = setTimeout(() => {
      setActiveIndex(index);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setActiveIndex(null);
  };

  return (
    <section className="relative w-full overflow-x-hidden px-4 pr-0 md:pr-4 md:px-8 lg:px-16 lg:pr-0 2xl:pr-16 py-6 md:py-12">
      <div className="relative mt-30 md:mt-24 lg:mt-[180px] mb-16 md:mb-32 lg:mb-[300px] flex justify-center lg:justify-end">
        <div className="relative w-[85px] h-[85px] md:w-32 md:h-32 lg:w-[184px] lg:h-[184px]">
          <Image
            src="/frames/frame_team_1.png"
            alt="Frame Team"
            width={184}
            height={184}
            className="w-full h-full object-contain"
          />
          <div className="absolute right-[-42px] top-[-30px]">
            <Cross
              color="#35353C"
              className="w-4 h-4 md:w-6 md:h-6 lg:w-auto lg:h-auto"
            />
          </div>
          <div className="absolute right-[-42px] bottom-[-30px]">
            <Cross
              color="#35353C"
              className="w-4 h-4 md:w-6 md:h-6 lg:w-auto lg:h-auto"
            />
          </div>
        </div>
      </div>

      <div
        className="hidden team-large-screen justify-end"
        data-snap-target="team"
      >
        {team.map((member, index) => {
          const isActive = activeIndex === index;
          const baseWidth = index === 0 ? "w-[140px]" : "w-[110px]";

          return (
            <div
              key={member.name}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className={`relative cursor-pointer transition-all duration-500  z-10`}
              style={{
                flexGrow: isActive ? 0 : 1,
                flexBasis: isActive ? "340px" : "0px",
                maxWidth: isActive ? "340px" : "113px",
                minWidth: isActive ? "340px" : "80px",
              }}
            >
              <div className="relative w-full h-[450px] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className={`object-cover grayscale transition-all duration-500 ${isActive ? "grayscale-0" : ""}`}
                  style={{
                    objectPosition: isActive
                      ? "50% 50%"
                      : `calc(50% + ${member.offset}px) 50%`,
                  }}
                  priority
                />
              </div>

              <div className="mt-6 h-[70px] overflow-hidden w-[350px]">
                <div
                  className={`transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
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

      <div className="team-small-screen" data-snap-target="team">
        <div className="mt-20 mb-18">
          <Swiper
            modules={[FreeMode]}
            freeMode
            spaceBetween={11}
            slidesPerView="auto"
            breakpoints={{
              0: { spaceBetween: 11 },
              768: { spaceBetween: 32 },
              1024: { spaceBetween: 32 },
            }}
            className="team-swiper"
            style={{ paddingBottom: "32px" }}
          >
            {team.map((member) => (
              <SwiperSlide
                key={member.name}
                className="team-swiper-slide mt-10"
                style={{ width: "166px", height: "auto" }}
              >
                <div className="relative select-none w-full">
                  <div className="relative w-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={1020}
                      height={1350}
                      className="object-cover w-full h-full"
                      draggable={false}
                      style={{ objectPosition: "center center" }}
                      priority
                      unoptimized
                    />
                  </div>

                  <div className="mt-[16px]">
                    <p
                      className="text-xl md:text-2xl lg:text-[25px] leading-[30px] md:leading-[35px] font-medium xl:mb-2"
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="relative mt-12 md:mt-24 lg:mt-[180px] mb-8 md:mb-16 lg:mb-[300px] flex justify-center lg:justify-end lg:mr-[300px]">
        <div className="relative w-[85px] h-[85px] md:w-32 md:h-32 lg:w-[184px] lg:h-[184px]">
          <Image
            src="/frames/frame_team_2.png"
            alt="Frame Team"
            width={184}
            height={184}
            className="w-full h-full object-contain"
          />
          <div className="absolute right-[-50px] bottom-[-42px]">
            <Cross
              color="#35353C"
              className="w-4 h-4 md:w-6 md:h-6 lg:w-auto lg:h-auto"
            />
          </div>
          <div className="absolute left-[-50px] bottom-[-42px]">
            <Cross
              color="#35353C"
              className="w-4 h-4 md:w-6 md:h-6 lg:w-auto lg:h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
