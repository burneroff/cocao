import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="
        w-full h-[204px] relative
        flex items-center
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
        <Image src="/logo.svg" alt="Cacao Mobile Logo" width={47} height={58} />
        <div className="flex flex-col text-[#35353C]">
          <span className="font-medium text-lg">Cacao Mobile</span>
          <span className="text-[16px]">Poland, Warszawa</span>
          <span className="text-[16px]">Address</span>
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
        {["Email", "LinkedIn", "Privacy Policy?"].map((label) => (
          <Link
            key={label}
            href="#"
            className="group relative text-base overflow-hidden"
          >
            <span className="relative z-10 text-[#35353C] transition-colors">
              {label}
            </span>
            <span className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
        ))}
      </div>
    </footer>
  );
}
