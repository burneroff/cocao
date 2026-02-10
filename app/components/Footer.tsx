import Image from "next/image";
import Link from "next/link";

import { vacancies } from "../vacancies/data";

export default function Footer() {
  const hasVacancies = Array.isArray(vacancies) && vacancies.length > 0;

  return (
    <footer
      className="
        w-full mb-[20px] md:mb-[0px] md:h-[204px] relative
        flex items-start min-[400px]:items-center
        px-[16px]
        md:px-[40px]
        min-[1000px]:justify-start
        justify-between
      "
      style={{
        backgroundColor: "#DADADA",
        backgroundImage: `
          linear-gradient(to bottom, rgba(218,218,218,1), rgba(218,218,218,0)),
          url(/footer.png)
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <Image
          src="/logo.svg"
          alt="Cacao Mobile Logo"
          width={47}
          height={58}
          className="block"
        />
        <div className="flex flex-col text-[#35353C] max-[430px]:max-w-[150px]">
          <span className="font-medium text-lg max-[430px]:text-[14px]">
            Cacao Mobile
          </span>
          <span className="text-[16px] max-[430px]:text-[14px]">
            Poland, Warszawa
          </span>
          <span className="text-[16px] max-[430px]:text-[14px]">
            UL. Nowogrodzka 31 / 414, 00-511
          </span>
        </div>
      </div>

      {/* LINKS */}
      <div
        className="
          flex flex-col gap-1 text-[#35353C] font-medium text-[16px]
          min-[1000px]:absolute
          min-[1000px]:top-1/2
          min-[1000px]:left-1/2
          min-[1000px]:-translate-x-1/2
          min-[1000px]:-translate-y-1/2
          static
          transform-none
        "
      >
        {[
          { label: "hr@cacao-mobile.com", href: "mailto:hr@cacao-mobile.com" },
          {
            label: "LinkedIn",
            href: "https://pl.linkedin.com/company/cacao-mobile-sp-z-o-o",
            external: true,
          },
          ...(hasVacancies
            ? [{ label: "Vacancies", href: "/vacancies", external: true }]
            : [
              {
                label: "Telegram",
                href: "https://t.me/kirill_svc",
                external: true,
              },
            ]),
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            className="group relative text-base overflow-hidden 2xl:ml-19"
          >
            <span className="relative z-10 text-[#35353C] transition-colors max-[430px]:text-[14px]">
              {item.label}
            </span>
            <span className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
        ))}
      </div>
    </footer>
  );
}
