import Image from "next/image";
import { Cross } from "../icons/Cross";

export default function US() {
  return (
    <div className="h-[150vh] flex items-start justify-end px-16 py-16 relative">
      <div className="flex justify-end flex-col">
        <div
          className="text-[40px] text-[#CDCDCD] font-normal leading-[70px] tracking-[0%] text-justify"
          style={{ maxWidth: "910px" }}
        >
          <p>
            We're a product team developing and growing mobile{" "}
            <span
              className="inline"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, transparent 50%, #0100F4 50%, #0100F4 100%)",
                backgroundSize: "100% 35px",
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
                backgroundSize: "100% 35px",
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
                backgroundSize: "100% 35px",
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

      {/* Картинка в правом углу */}
      <div className="absolute right-[70px] bottom-[100px] w-[184px] h-[184px]">
        <Image
          src="/frames/frame_US.png"
          alt="Frame US"
          width={184}
          height={184}
          className="w-full h-full object-contain"
        />

        {/* Первый Cross: 50px влево и вниз от картинки */}
        <div className="absolute left-[-90px] bottom-[-50px]">
          <Cross color="#CDCDCD" />
        </div>

        {/* Второй Cross: 300px влево и 100px вверх от картинки */}
        <div className="absolute left-[-300px] top-[-100px]">
          <Cross color="#CDCDCD" />
        </div>
      </div>
    </div>
  );
}
