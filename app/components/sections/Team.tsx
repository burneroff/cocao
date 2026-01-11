import Image from "next/image";
import { Cross } from "../icons/Cross";
import { AnimatedTestimonials } from "../ui/animated-testimonials";

const testimonials = [
  {
    quote:
      "This platform revolutionized our portfolio strategy. Managing diverse apps from games to fintech is now seamless, and the data insights give us a sharp competitive edge.",
    name: "Ivan Marzan",
    designation: "CEO",
    src: "/team/Ivan Marzan.png",
  },
  {
    quote:
      "Transformed our efficiency. The intuitive interface manages our yoga app launch and racing game update simultaneously. It's so reliable, I almost miss our old spreadsheet chaos.",
    name: "Anna Marzan",
    designation: "CEO",
    src: "/team/Anna Marzan.png",
  },
  {
    quote:
      "The technical architecture is impeccable. It handles simultaneous updates for different apps with rock-solid scalability, letting our engineers focus on innovation instead of firefighting.",
    name: "Radzivon Bartoshyk",
    designation: "Chief Technology Officer",
    src: "/team/Radzivon Bartoshyk.png",
  },
  {
    quote:
      "The innovative approach to cross-platform development is remarkable. It serves both a meditation app and a noisy party game equally well, allowing us to ship both with fewer headaches.",
    name: "Stanislay Kotau",
    designation: "Head of Innovation",
    src: "/team/Stanislay Kotau.png",
  },
  {
    quote:
      "This platform unites our diverse teams perfectly. It bridges zen UI designers and adrenaline-fueled game devs, transforming our collaboration and company culture.",
    name: "Kiryl Sauchuk",
    designation: "Human Resources Generalist",
    src: "/team/Kiryl Sauchuk.png",
  },
  {
    quote:
      "Our product development accelerated by 40%. Managing roadmaps for a recipe app and a fantasy RPG is no longer a nightmare. The agile workflow tools handle it perfectly.",
    name: "Anna Tsilind",
    designation: "Product Manager",
    src: "/team/Anna Tsilind.png",
  },
  {
    quote:
      "Managing multiple product lines became seamless. The analytics dashboard brilliantly segments data from different user groups, providing clear, actionable insights.",
    name: "Ruslan Larbi",
    designation: "Product Manager",
    src: "/team/Ruslan Larbi.png",
  },
  {
    quote:
      "The attention to detail in feature implementation is extraordinary. Every update brings measurable improvements, whether for a shopping app or a trivia game, making users happier.",
    name: "Krukau Yauheni",
    designation: "Product Manager",
    src: "/team/Krukau Yauheni.png",
  },
];
export default function Team() {
  return (
    <section className="relative w-ful overflow-x-hidden px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
      {/* FRAME + CROSSES BLOCK */}
      <div className="relative mt-24 mb-24 md:mt-24 md:mb-36 flex justify-end">
        <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[184px] lg:h-[184px]">
          <Image
            src="/frames/frame_team_1.png"
            alt="Frame Team"
            width={184}
            height={184}
            className="w-full h-full object-contain"
            priority
          />
          <div className=" absolute left-[-204] sm:left-[-354px] top-[-50px]">
            <Cross color="#35353C" />
          </div>
          <div className="absolute left-[-204] sm:left-[-354px]  bottom-[-50px]">
            <Cross color="#35353C" />
          </div>
          <div className=" absolute left-[-50px] bottom-[-50px]">
            <Cross color="#35353C" />
          </div>
        </div>
      </div>
      <AnimatedTestimonials testimonials={testimonials} />
      {/* ВТОРАЯ РАМКА */}
      <div className="relative mt-24 mb-24 md:mt-32 md:mb-32 flex justify-center">
        <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[184px] lg:h-[184px]">
          <Image
            src="/frames/frame_team_2.png"
            alt="Frame Team"
            width={184}
            height={184}
            className="w-full h-full object-contain"
          />
          <div className="absolute right-[-50px] bottom-[-50px]">
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
