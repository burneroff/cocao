"use client";

import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import NavigationSection from "./components/NavigationSection";
import { FloatingNav } from "./components/ui/floating-navbar";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNavLoaded, setIsNavLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const handleLoadingComplete = () => {
      setIsLoaded(true);
    };

    window.addEventListener("loading-complete", handleLoadingComplete);

    const loadingScreen = document.querySelector("[data-loading-screen]");
    const isHidden =
      !loadingScreen ||
      loadingScreen.classList.contains("opacity-0") ||
      loadingScreen.classList.contains("pointer-events-none");

    if (isHidden) {
      setIsLoaded(true);
    }

    const fallback = setTimeout(() => {
      setIsLoaded(true);
    }, 7000);

    return () => {
      window.removeEventListener("loading-complete", handleLoadingComplete);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      setIsNavLoaded(false);
      return;
    }

    const timeout = setTimeout(
      () => {
        setIsNavLoaded(true);
      },
      isMobile ? 1000 : 2500,
    );

    return () => clearTimeout(timeout);
  }, [isLoaded]);

  return (
    <>
      <FloatingNav isLoaded={isNavLoaded} />
      <Hero isLoaded={isLoaded} />
      <NavigationSection />
    </>
  );
}
