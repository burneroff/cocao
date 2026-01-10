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
    position: "Human Recources Generalist",
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
    <section className="relative w-full overflow-hidden px-16 py-16 ">
      {/* FRAME + CROSSES BLOCK (NOW TAKES SPACE) */}
      <div className="relative mt-[180px] mb-[300px] flex justify-end">
        <div className="relative w-[184px] h-[184px]">
          <Image
            src="/frames/frame_team_1.png"
            alt="Frame Team"
            width={184}
            height={184}
            className="w-full h-full object-contain"
          />

          {/* First cross */}
          <div className="absolute left-[-354px] top-[-50px]">
            <Cross color="#35353C" />
          </div>

          {/* Second cross */}
          <div className="absolute left-[-354px] bottom-[-50px]">
            <Cross color="#35353C" />
          </div>

          {/* Third cross */}
          <div className="absolute left-[-50px] bottom-[-50px]">
            <Cross color="#35353C" />
          </div>
        </div>
      </div>

      {/* TEAM BLOCK */}
      <div className="flex justify-end">
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
                />
              </div>

              {/* TEXT (NO LAYOUT SHIFT) */}
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

      {/* FRAME + CROSSES BLOCK (NOW TAKES SPACE) */}
      <div className="relative mt-[180px] mb-[300px] flex justify-end mr-[300px]">
        <div className="relative w-[184px] h-[184px]">
          <Image
            src="/frames/frame_team_2.png"
            alt="Frame Team"
            width={450}
            height={450}
            className="w-full h-full object-contain"
          />

          {/* Second cross */}
          <div className="absolute right-[-50px] bottom-[-50px]">
            <Cross color="#35353C" />
          </div>

          {/* Third cross */}
          <div className="absolute left-[-50px] bottom-[-50px]">
            <Cross color="#35353C" />
          </div>
        </div>
      </div>
    </section>
  );
}
