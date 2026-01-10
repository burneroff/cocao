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

  return (
    <div className="h-[120vh] flex items-start justify-end px-16 py-16 relative">
      <div className="flex justify-end flex-col">
        <div
          className="text-[40px] text-[#3F3E3D] font-normal leading-[70px] tracking-[0%] text-justify"
          style={{
            fontFamily: "var(--font-neue-regrade), Neue Regrade, sans-serif",
            maxWidth: "909px",
          }}
        >
          <p>
            We create mobile{" "}
            <span className="inline" style={highlightStyle}>
              products
            </span>{" "}
            that make life simpler,{" "}
            <span className="inline" style={highlightStyle}>
              more engaging,
            </span>{" "}
            and{" "}
            <span className="inline" style={highlightStyle}>
              more mindful.
            </span>{" "}
            In every project, we combine creativity, data, and attention to
            detail to deliver not just an app – but a{" "}
            <span className="inline" style={highlightStyle}>
              clear, inspiring,
            </span>{" "}
            and{" "}
            <span className="inline" style={highlightStyle}>
              genuinely useful
            </span>{" "}
            digital experience.
          </p>
        </div>

        {/* 3 блока под текстом */}
        <div className="flex gap-[180px] mt-[100px]">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex flex-col items-left">
              <div className="text-[65px] text-[#3F3E3D] font-bold leading-[70px] mb-4">
                22+
              </div>
              <div className="text-[40px] text-[#3F3E3D] font-normal leading-[70px] text-left">
                Text
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Картинка по центру текста */}
      <div className="absolute left-1/2 bottom-[0px] -translate-x-1/2 -translate-y-1/2 w-[184px] h-[184px]">
        <Image
          src="/frames/frame_mission.png"
          alt="Frame Mission"
          width={184}
          height={184}
          className="w-full h-full object-contain"
        />

        {/* Первый Cross: 60px влево и 50px вниз от картинки (левый нижний угол) */}
        <div className="absolute left-[-60px] bottom-[-50px]">
          <Cross color="#3F3E3D" />
        </div>

        {/* Второй Cross: 60px вправо и 50px вниз от картинки (правый нижний угол) */}
        <div className="absolute right-[-60px] bottom-[-50px]">
          <Cross color="#3F3E3D" />
        </div>
      </div>
    </div>
  );
}
