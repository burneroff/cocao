import Link from "next/link";

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between px-4 py-6 sm:px-8">
      <div className="font-medium text-[#9F9B96] text-2xl">Cocao Mobile</div>

      <nav className="flex items-center gap-6">
        <Link
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative md:px-3 px-2 py-2 text-base overflow-hidden"
        >
          <span
            className="relative z-10 transition-colors text-[#9F9B96] font-medium text-[clamp(18px,2vw,28px)] hover:text-white"
            style={{
              transition: "color 0.3s ease-in-out",
            }}
          >
            LinkedIn
          </span>
          <span className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
        </Link>

        <Link
          href="mailto:"
          className="group relative md:px-3 px-2 py-2 text-base overflow-hidden"
        >
          <span
            className="relative z-10 transition-colors text-[#9F9B96] font-medium text-[clamp(18px,2vw,28px)] hover:text-white"
            style={{
              transition: "color 0.3s ease-in-out",
            }}
          >
            Email
          </span>
          <span className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
        </Link>

        <Link
          href="https://apps.apple.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative md:px-3 px-2 py-2 text-base overflow-hidden"
        >
          <span
            className="relative z-10 transition-colors text-[#9F9B96] font-medium text-[clamp(18px,2vw,28px)] hover:text-white"
            style={{
              transition: "color 0.3s ease-in-out",
            }}
          >
            AppStore
          </span>
          <span className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
        </Link>
      </nav>
    </header>
  );
}
