"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const REDIRECT_DELAY_MS = 5000;

export default function NotFoundScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      router.replace("/");
    }, REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-cover bg-center text-[#3F3E3D] bg-[url('/errors/Error_404_Mobile.png')] md:bg-[url('/errors/Error%20404.png')]">
      <div className="relative flex flex-col items-center justify-center px-6 text-center">
        <div
          className="absolute left-1/2 -translate-x-1/2 bg-[#ED4C22] text-[#DADADA] px-1 text-[12px] leading-[18px] font-normal"
          style={{
            fontFamily: "var(--font-neue-regrade), Neue Regrade, sans-serif",
          }}
        >
          404 — Page Not Found
        </div>
        <div
          className="xl:h-[179px] xl:w-[652px] text-[48px] leading-[40px] xl:text-[70px] xl:leading-[65px] font-normal uppercase"
          style={{
            textAlign: "justify",
            fontFamily: "var(--font-neue-regrade), Neue Regrade, sans-serif",
          }}
        >
          Check the URL or go back to the homepage
        </div>
      </div>
    </main>
  );
}
