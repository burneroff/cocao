"use client";

interface HeroProps {
  isLoaded?: boolean;
}

export default function Hero({ isLoaded = false }: HeroProps) {

  return (
    <section className="relative h-screen w-screen overflow-hidden font-sans bg-black">
      {/* Черный фон до появления видео */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-800 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
        style={{
          transitionDelay: isLoaded ? "0.8s" : "0s",
        }}
      />
      
      {/* Видео с анимацией появления после текста */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`absolute left-0 top-0 h-full w-full object-cover scale-y-[-1] transition-opacity duration-800 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transitionDelay: isLoaded ? "0.8s" : "0s",
        }}
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      {/* Градиент */}
      <div
        className={`absolute bottom-0 left-0 h-[200px] w-full transition-opacity duration-800 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(to top, black, rgba(8,8,8,0))",
          transitionDelay: isLoaded ? "0.8s" : "0s",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-1 items-center justify-center min-[1000px]:justify-end px-4 min-[1000px]:pr-16">
          <div className="flex flex-col text-center min-[1000px]:text-right">
            {/* Текст с плавным появлением через opacity */}
            <h1
              className={`
                uppercase text-white font-normal
                text-[clamp(68px,10vw,120px)]
                leading-[clamp(62px,8vw,90px)]
                min-[1000px]:text-left
                transition-opacity duration-800
                ${isLoaded ? "opacity-100" : "opacity-0"}
              `}
              style={{
                transitionDelay: isLoaded ? "0s" : "0s",
              }}
            >
              SHARP
            </h1>

            <h1
              className={`
                uppercase text-white font-normal
                text-[clamp(68px,10vw,120px)]
                leading-[clamp(62px,8vw,90px)]
                min-[1000px]:ml-[225px]
                transition-opacity duration-800
                ${isLoaded ? "opacity-100" : "opacity-0"}
              `}
              style={{
                transitionDelay: isLoaded ? "0s" : "0s",
              }}
            >
              INTELLIGENT
            </h1>

            <h1
              className={`
                uppercase text-white font-normal
                text-[clamp(68px,10vw,120px)]
                leading-[clamp(62px,8vw,90px)]
                min-[1000px]:ml-[225px]
                min-[1000px]:text-left
                transition-opacity duration-800
                ${isLoaded ? "opacity-100" : "opacity-0"}
              `}
              style={{
                transitionDelay: isLoaded ? "0s" : "0s",
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
