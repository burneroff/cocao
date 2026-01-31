"use client";

import { useEffect, useRef, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const rafRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);
  const animationDuration = 4500; // 5 секунд плавной анимации

  useEffect(() => {
    isMountedRef.current = true;
    const imageAssets = [
      "/frames/frame_mission.png",
      "/frames/frame_products_1.png",
      "/frames/frame_products_2.png",
      "/frames/frame_products_3.png",
      "/frames/frame_team_1.png",
      "/frames/frame_team_2.png",
      "/frames/frame_US.png",
      "/products/AI Calorie Counter.png",
      "/products/Call Recorder.png",
      "/products/FAX.png",
      "/products/Fleeky-Wallpapers.png",
      "/products/NookAI.png",
      "/products/PDF Converter.png",
      "/products/Plant ID & Care.png",
      "/products/Sense Meditation.png",
      "/products/Sense.png",
      "/products/VEON.png",
      "/products/Zipper.png",
      "/team/Anna Marzan.png",
      "/team/Anna Tsilind.png",
      "/team/Ivan Marzan.png",
      "/team/Kiryl Sauchuk.png",
      "/team/Krukau Yauheni.png",
      "/team/Radzivon Bartoshyk.png",
      "/team/Ruslan Larbi.png",
      "/team/Stanislay Kotau.png",
      "/values/value_1.png",
      "/values/value_2.png",
      "/values/value_3.png",
      "/values/value_4.png",
      "/footer.png",
      "/logo.svg",
    ];

    const videoAssets = ["/background-video.mp4"];

    const preloadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        const done = () => resolve();
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
        img.src = src;
      });

    const preloadVideo = (src: string) =>
      new Promise<void>((resolve) => {
        const video = document.createElement("video");
        const done = () => resolve();
        const timeout = window.setTimeout(done, 7000);
        video.preload = "auto";
        video.muted = true;
        video.playsInline = true;
        video.addEventListener(
          "canplaythrough",
          () => {
            window.clearTimeout(timeout);
            done();
          },
          { once: true }
        );
        video.addEventListener(
          "error",
          () => {
            window.clearTimeout(timeout);
            done();
          },
          { once: true }
        );
        video.src = src;
        video.load();
      });

    const preloadAssets = Promise.allSettled([
      ...imageAssets.map(preloadImage),
      ...videoAssets.map(preloadVideo),
    ]);

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateProgress = new Promise<void>((resolve) => {
      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / animationDuration, 1);
        const eased = easeInOutCubic(t);
        if (isMountedRef.current) {
          setProgress(Math.round(eased * 100));
        }
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          resolve();
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    });

    Promise.all([preloadAssets, animateProgress]).then(() => {
      if (!isMountedRef.current) return;
      setProgress(100);
      setIsLoading(false);
      window.dispatchEvent(new CustomEvent("loading-complete"));
    });

    return () => {
      isMountedRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Высота синей части в процентах (от 0 до 100%)
  const fillHeight = progress;

  return (
    <div
      data-loading-screen
      className={`fixed inset-0 z-9999 flex items-center justify-center bg-black transition-opacity duration-300 ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Логотип с анимацией */}
        <div className="relative">
          <svg
            width="191"
            height="282"
            viewBox="0 0 191 282"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[120px] h-[177px] md:w-[191px] md:h-[282px]"
          >
            {/* Контур синей части */}
            <path
              d="M140.134 75.1774C133.331 86.2074 127.213 101.901 127.288 116.205C127.322 122.748 129.578 129.937 132.807 140.117C135.815 149.597 139.48 161.244 139.855 173.968C140.576 198.499 133.568 215.504 122.229 232.632L102.255 219.329C111.572 205.244 116.405 193.043 115.865 174.674C115.602 165.758 113.027 157.132 109.932 147.375C107.059 138.32 103.346 127.298 103.289 116.331C103.183 96.0176 111.496 75.8525 119.784 62.4544L140.134 75.1774Z"
              stroke="#0100F4"
            />
            {/* Остальные части логотипа */}
            <path
              d="M67.5 113V191C67.5 206.188 55.1878 218.5 40 218.5C24.8122 218.5 12.5 206.188 12.5 191V40C12.5 24.8122 24.8122 12.5 40 12.5C55.1878 12.5 67.5 24.8122 67.5 40V101"
              stroke="#FAFAFA"
              strokeWidth="25"
            />
            <path
              d="M67.5 89.5V40.0625C67.5 24.8402 79.8402 12.5 95.0625 12.5C110.285 12.5 122.625 24.8402 122.625 40.0625V41.5M177.625 230.5V40.0625C177.625 24.8402 165.285 12.5 150.062 12.5C134.84 12.5 122.5 24.8402 122.5 40.0625V41.5"
              stroke="#FAFAFA"
              strokeWidth="25"
            />
            {/* Анимация заполнения формы трубки */}
            <defs>
              {/* ClipPath для обрезки формы трубки снизу вверх */}
              <clipPath id="fillClip">
                {/* Обрезаем снизу вверх - показываем только нижнюю часть формы */}
                <rect
                  x="0"
                  y={61.7638 + (233.327 - 61.7638) * (1 - fillHeight / 100)}
                  width="191"
                  height={282}
                />
              </clipPath>
            </defs>
            {/* Синяя заполняющаяся часть - напрямую форма трубки */}
            <g clipPath="url(#fillClip)">
              <path
                d="M140.894 75.0171C134.017 86.0176 127.788 101.84 127.862 116.203C127.896 122.653 130.121 129.76 133.359 139.966C136.365 149.441 140.052 161.15 140.429 173.953C141.16 198.812 133.988 215.995 122.445 233.327L101.638 219.47C111.095 205.27 115.981 193.11 115.439 174.689C115.179 165.853 112.626 157.289 109.529 147.526C106.663 138.493 102.92 127.392 102.863 116.333C102.755 95.6783 111.292 75.2069 119.696 61.7638L140.894 75.0171Z"
                fill="#0100F4"
              />
            </g>
          </svg>
        </div>

        {/* Текст загрузки */}
        <div className="text-[#FAFAFA] text-lg md:text-xl font-normal">
          Loading {progress}%
        </div>
      </div>
    </div>
  );
}
