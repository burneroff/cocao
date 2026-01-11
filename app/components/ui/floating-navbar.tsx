"use client";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import BurgerMenu from "../BurgerMenu";

export const FloatingNav = ({ className }: { className?: string }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Отслеживание направления скролла
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        // В самом верху - показываем навигацию
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Скролл вниз больше 50px - скрываем
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Скролл вверх - показываем
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Альтернативный вариант с useMotionValueEvent (более плавный)
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious() || 0;
      const direction = current - previous;

      // В самом верху страницы
      if (current < 0.05) {
        setVisible(true);
      } else {
        // Определяем направление скролла
        if (direction < 0) {
          // Скролл вверх
          setVisible(true);
        } else if (direction > 0 && current > 0.1) {
          // Скролл вниз (только если не в самом верху)
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={cn(
          "flex max-w-full w-full fixed top-0 left-0 right-0 mx-auto",
          " z-[5000] px-4 md:px-8 py-4 items-center justify-between",
          className
        )}
      >
        <div className="font-medium text-[#35353C] text-2xl">Cocao Mobile</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-2 py-2 overflow-hidden"
          >
            <span className="relative z-10 transition-colors text-[#35353C] font-medium text-[clamp(16px,1.5vw,24px)] group-hover:text-white">
              LinkedIn
            </span>
            <span className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </Link>

          <Link
            href="mailto:"
            className="group relative px-2 py-2 overflow-hidden"
          >
            <span className="relative z-10 transition-colors text-[#35353C] font-medium text-[clamp(16px,1.5vw,24px)] group-hover:text-white">
              Email
            </span>
            <span className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </Link>

          <Link
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-2 py-2 overflow-hidden"
          >
            <span className="relative z-10 transition-colors text-[#35353C] font-medium text-[clamp(16px,1.5vw,24px)] group-hover:text-white">
              AppStore
            </span>
            <span className="absolute inset-0 top-1/2 h-1/2 bg-[#0100F4] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </Link>
        </nav>

        {/* Mobile Burger Menu */}
        <div className="md:hidden">
          <BurgerMenu scrollToSection={scrollToSection} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
