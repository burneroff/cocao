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
    <main
      className="flex min-h-screen w-full items-center justify-center bg-cover bg-center text-white"    >
      <div className="relative flex flex-col items-center justify-center px-6 text-center">
        <div className="absolute left-1/2 -translate-x-1/2 bg-[#ED4C22] px-3 py-1 text-[16px] leading-[25px] font-normal">
          404 — Page Not Found
        </div>
        <div
          className="xl:h-[179px] xl:w-[652px] text-[50px] xl:text-[70px] font-normal uppercase leading-[65px]"
          style={{ textAlign: "justify" }}
        >
          Check the URL or go back to the homepage
        </div>
      </div>
    </main>
  );
}
