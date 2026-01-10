import Image from "next/image";
import { Cross } from "../icons/Cross";

export default function US() {
  return (
    <div className="h-auto min-h-[100vh] md:min-h-[150vh] flex items-start justify-end px-4 py-4 md:px-16 md:py-16 relative">
      <div className="flex justify-end flex-col w-full">
        <div
          className="text-[#CDCDCD] font-normal leading-normal md:leading-[70px] tracking-[0%] text-justify w-full max-w-full md:max-w-[910px]"
          style={{
            fontSize: "clamp(20px, 4vw, 2.5rem)",
            lineHeight: "clamp(32px, 5vw, 3.5rem)",
          }}
        >
          <p className="mb-4 md:mb-8">
            We're a product team developing and growing mobile{" "}
            <span
              className="inline"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, transparent 50%, #0100F4 50%, #0100F4 100%)",
                backgroundSize: "100% clamp(20px, 4vw, 35px)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 bottom",
              }}
            >
              apps in Health & Wellness, Entertainment, and Utilities
            </span>{" "}
            categories. Our focus is not just on launching new products, but on
            building sustainable growth models, creating long-lasting projects,
            and turning{" "}
            <span
              className="inline"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, transparent 50%, #0100F4 50%, #0100F4 100%)",
                backgroundSize: "100% clamp(20px, 4vw, 35px)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 bottom",
              }}
            >
              ideas into clear, useful digital experiences.
            </span>
          </p>
          <p>
            Our team is distributed across several countries, but we share the
            same DNA – curio
            <span
              className="inline"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, transparent 50%, #0100F4 50%, #0100F4 100%)",
                backgroundSize: "100% clamp(20px, 4vw, 35px)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 bottom",
              }}
            >
              sity, creativity, and
            </span>{" "}
            the drive to build products people genuinely love to use.
          </p>
        </div>
      </div>

      {/* Картинка в правом углу - адаптивная */}
      <div className="absolute right-4 md:right-[70px] bottom-[100px] md:bottom-[100px] w-[184px] h-[184px]">
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
