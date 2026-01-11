import Image from "next/image";
import { Cross } from "../icons/Cross";

export default function Mission() {
  const highlightStyle = {
    background:
      "linear-gradient(to bottom, transparent 0%, transparent 50%, #0100F4 50%, #0100F4 100%)",
    backgroundSize: "100% 35px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 bottom",
  };

  // Responsive стили для подсветки
  const responsiveHighlightStyle = {
    ...highlightStyle,
    backgroundSize: "100% 25px",
    "@media (min-width: 768px)": {
      backgroundSize: "100% 35px",
    },
  };

  return (
    <div className=" h-[80vh] md:h-[120vh] flex items-start justify-end px-4 py-8 md:px-16 md:py-16 relative">
      <div className="flex justify-end flex-col ">
        {/* Текст с адаптивным размером */}
        <div
          className="text-[#3F3E3D] font-normal leading-[35px] md:leading-[50px] lg:leading-[70px] tracking-[0%] text-justify"
          style={{
            fontFamily: "var(--font-neue-regrade), Neue Regrade, sans-serif",
            maxWidth: "909px",
            margin: "0 auto",
            fontSize: "clamp(20px, 4vw, 2.5rem)",
            lineHeight: "clamp(32px, 5vw, 3.5rem)",
          }}
        >
          <p>
            We create mobile{" "}
            <span className="inline" style={responsiveHighlightStyle}>
              products
            </span>{" "}
            that make life simpler,{" "}
            <span className="inline" style={responsiveHighlightStyle}>
              more engaging,
            </span>{" "}
            and{" "}
            <span className="inline" style={responsiveHighlightStyle}>
              more mindful.
            </span>{" "}
            In every project, we combine creativity, data, and attention to
            detail to deliver not just an app – but a{" "}
            <span className="inline" style={responsiveHighlightStyle}>
              clear, inspiring,
            </span>{" "}
            and{" "}
            <span className="inline" style={responsiveHighlightStyle}>
              genuinely useful
            </span>{" "}
            digital experience.
          </p>
        </div>

        {/* 3 блока под текстом - адаптивные отступы */}
        <div className="flex flex-row gap-8 md:gap-12 lg:gap-[180px] mt-12 md:mt-[100px]">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex flex-col items-left">
              <div className="text-[40px] md:text-[55px] lg:text-[65px] text-[#3F3E3D] font-bold leading-[45px] md:leading-[60px] lg:leading-[70px] mb-2 md:mb-4">
                22+
              </div>
              <div className="text-[20px] md:text-[30px] lg:text-[40px] text-[#3F3E3D] font-normal leading-[30px] md:leading-[45px] lg:leading-[70px] text-left">
                Text
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Картинка по центру - адаптивное позиционирование */}
      <div className="absolute left-1/2 bottom-[100px] md:bottom-[0px] -translate-x-1/2 translate-y-0 md:-translate-y-1/2 w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[184px] lg:h-[184px]">
        <Image
          src="/frames/frame_mission.png"
          alt="Frame Mission"
          width={184}
          height={184}
          className="w-full h-full object-contain"
          priority
        />

        {/* Первый Cross - адаптивные отступы */}
        <div className="absolute left-[-30px] md:left-[-45px] lg:left-[-60px] bottom-[-30px] md:bottom-[-40px] lg:bottom-[-50px] w-6 h-6 md:w-8 md:h-8">
          <Cross color="#3F3E3D" />
        </div>

        {/* Второй Cross - адаптивные отступы */}
        <div className="absolute right-[-30px] md:right-[-45px] lg:right-[-60px] bottom-[-30px] md:bottom-[-40px] lg:bottom-[-50px] w-6 h-6 md:w-8 md:h-8">
          <Cross color="#3F3E3D" />
        </div>
      </div>
    </div>
  );
}
