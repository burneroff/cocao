import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="w-full h-[204px] relative flex items-center px-[40px]"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(218,218,218,1), rgba(218,218,218,0)),
          url(/footer.png)
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* LEFT: Logo + Text */}
      <div className="flex items-center gap-4">
        <Image src="/logo.svg" alt="Cacao Mobile Logo" width={47} height={58} />
        <div className="flex flex-col text-[#35353C]">
          <span className="font-medium text-lg">Cacao Mobile</span>
          <span className="text-[16px]">Poland, Warszawa</span>
          <span className="text-[16px]">Address</span>
        </div>
      </div>

      {/* CENTER: Links */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1 text-[#35353C] font-medium text-[16px]">
        <a href="mailto:burneroff@outlook.com" className="hover:underline">
          Email
        </a>
        <a href="#" className="hover:underline">
          LinkedIn
        </a>
        <a href="#" className="hover:underline">
          Privacy Policy?
        </a>
      </div>
    </footer>
  );
}
