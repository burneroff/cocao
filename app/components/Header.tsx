"use client";

import Link from "next/link";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 flex w-full items-center justify-between px-4 py-6 sm:px-8 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="font-medium text-[#35353C] text-2xl">Cocao Mobile</div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative md:px-3 px-2 py-2 text-base overflow-hidden"
        >
          <span className="relative z-10 transition-colors text-[#9F9B96] font-medium text-[clamp(18px,2vw,28px)] hover:text-white">
            LinkedIn
          </span>
          <span className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
        </Link>

        <Link
          href="mailto:"
          className="group relative md:px-3 px-2 py-2 text-base overflow-hidden"
        >
          <span className="relative z-10 transition-colors text-[#9F9B96] font-medium text-[clamp(18px,2vw,28px)] hover:text-white">
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
          <span className="relative z-10 transition-colors text-[#9F9B96] font-medium text-[clamp(18px,2vw,28px)] hover:text-white">
            AppStore
          </span>
          <span className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
        </Link>
      </nav>

      {/* Mobile Burger Menu */}
      <div className="md:hidden">
        <BurgerMenu scrollToSection={scrollToSection} />
      </div>
    </header>
  );
}
