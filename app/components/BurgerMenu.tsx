"use client";

import { useState } from "react";
import Link from "next/link";

const sections = [
  { id: "us", label: "US" },
  { id: "mission", label: "Mission" },
  { id: "products", label: "Products" },
  { id: "values", label: "Values" },
  { id: "team", label: "Team" },
  { id: "contacts", label: "Contacts" },
];

interface BurgerMenuProps {
  scrollToSection: (id: string) => void;
}

export default function BurgerMenu({ scrollToSection }: BurgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "auto";
  };

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      {/* Burger Button */}
      <button
        onClick={toggleMenu}
        className="relative z-50 flex flex-col items-center justify-center w-10 h-10"
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-6 bg-[#9F9B96] transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-[#9F9B96] transition-all duration-300 my-1.5 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-[#9F9B96] transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </button>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background Gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0100F4]"
          onClick={toggleMenu}
        />

        {/* Menu Content */}
        <div
          className={`relative z-50 h-full flex flex-col justify-between p-8 transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-6 mt-20">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className="group text-left"
              >
                <span className="text-[56px] md:text-[72px] font-bold uppercase tracking-tight text-white opacity-80 group-hover:opacity-100 group-hover:text-[#0100F4] transition-all duration-300">
                  {section.label}
                </span>
              </button>
            ))}
          </nav>

          {/* Social Links */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-wrap gap-6 mb-8">
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden py-2"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10 text-white text-2xl font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  LinkedIn
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0100F4] group-hover:w-full transition-all duration-300" />
              </Link>

              <Link
                href="mailto:"
                className="group relative overflow-hidden py-2"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10 text-white text-2xl font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  Email
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0100F4] group-hover:w-full transition-all duration-300" />
              </Link>

              <Link
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden py-2"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10 text-white text-2xl font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  AppStore
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0100F4] group-hover:w-full transition-all duration-300" />
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-white/60 text-sm">
              © {new Date().getFullYear()} Cocao Mobile. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
