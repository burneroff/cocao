"use client";

import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import NavigationSection from "./components/NavigationSection";
import { FloatingNav } from "./components/ui/floating-navbar";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNavLoaded, setIsNavLoaded] = useState(false);

  useEffect(() => {
    // Проверяем, когда LoadingScreen исчезнет
    const checkLoading = () => {
      const loadingScreen = document.querySelector('[data-loading-screen]');
      if (!loadingScreen) {
        setIsLoaded(true);
        return true;
      }
      // Проверяем, есть ли класс opacity-0 или pointer-events-none
      const hasHiddenClass = loadingScreen.classList.contains('opacity-0') || 
                            loadingScreen.classList.contains('pointer-events-none');
      if (hasHiddenClass) {
        setIsLoaded(true);
        return true;
      }
      return false;
    };

    // Проверяем сразу
    if (checkLoading()) return;

    // Проверяем периодически
    const interval = setInterval(() => {
      if (checkLoading()) {
        clearInterval(interval);
      }
    }, 100);

    // Также устанавливаем таймаут на случай, если проверка не сработает
    const timeout = setTimeout(() => {
      setIsLoaded(true);
      clearInterval(interval);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      setIsNavLoaded(false);
      return;
    }

    const timeout = setTimeout(() => {
      setIsNavLoaded(true);
    }, 1500);

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
