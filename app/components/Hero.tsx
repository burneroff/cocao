"use client";

import { useEffect, useRef } from "react";

interface HeroProps {
  isLoaded?: boolean;
}

export default function Hero({ isLoaded = false }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoDelay = "1.5s";
  const headerDelay = "0s";

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const resetVideo = () => {
      try {
        video.currentTime = 0;
      } catch {
        // ignore if not ready
      }
    };

    if (isLoaded) {
      resetVideo();
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // autoplay might be blocked; ignore
        });
      }
    } else {
      video.pause();
      resetVideo();
    }
  }, [isLoaded]);

  return (
    <section className="relative h-screen w-screen overflow-hidden font-sans bg-black">
      {/* Черный фон до появления видео */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-800 ${isLoaded ? "opacity-0" : "opacity-100"
          }`}
        style={{
          transitionDelay: isLoaded ? videoDelay : "0s",
        }}
      />

      {/* Видео с анимацией появления после текста */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute left-0 top-0 h-full w-full object-cover scale-y-[-1] transition-opacity duration-800 max-sm:top-[-152px] ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
        style={{
          transitionDelay: isLoaded ? videoDelay : "0s",
        }}
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      {/* Градиент */}
      <div
        className={`absolute bottom-0 left-0 h-[200px] w-full transition-opacity duration-800 ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
        style={{
          background: "linear-gradient(to top, black, rgba(8,8,8,0))",
          transitionDelay: isLoaded ? videoDelay : "0s",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-1 items-end justify-start pb-8 min-[1000px]:justify-end min-[1000px]:pb-12 xl:items-center xl:pb-0 px-4 min-[1000px]:pr-16">
          <div className="flex flex-col text-left min-[1000px]:text-right">
            {/* Текст с плавным появлением через opacity */}
            <h1
              className={`
                uppercase text-white font-normal
                text-[clamp(48px,10vw,120px)]
                leading-[clamp(48px,8vw,90px)]
                min-[1000px]:text-left
                transition-opacity duration-800
                ${isLoaded ? "opacity-100" : "opacity-0"}
              `}
              style={{
                transitionDelay: isLoaded ? headerDelay : "0s",
              }}
            >
              SHARP
            </h1>

            <h1
              className={`
                uppercase text-white font-normal
                text-[clamp(48px,10vw,120px)]
                leading-[clamp(48px,8vw,90px)]
                ml-[72px] min-[1000px]:ml-[225px]
                transition-opacity duration-800
                ${isLoaded ? "opacity-100" : "opacity-0"}
              `}
              style={{
                transitionDelay: isLoaded ? headerDelay : "0s",
              }}
            >
              INTELLIGENT
            </h1>

            <h1
              className={`
                uppercase text-white font-normal
                text-[clamp(48px,10vw,120px)]
                leading-[clamp(48px,8vw,90px)]
                ml-[72px] min-[1000px]:ml-[225px]
                min-[1000px]:text-left
                transition-opacity duration-800
                ${isLoaded ? "opacity-100" : "opacity-0"}
              `}
              style={{
                transitionDelay: isLoaded ? headerDelay : "0s",
              }}
            >
              GROWTH
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
