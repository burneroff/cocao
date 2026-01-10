import Header from "./Header";

export default function Hero() {
  return (
    <section className="relative h-screen w-screen overflow-hidden font-sans">
      {/* Видео */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute left-0 top-0 h-full w-full object-cover scale-y-[-1]"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      {/* Градиент */}
      <div
        className="absolute bottom-0 left-0 h-[200px] w-full"
        style={{
          background: "linear-gradient(to top, black, rgba(8,8,8,0))",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <Header />

        <div className="flex flex-1 items-center justify-center min-[1000px]:justify-end px-4 min-[1000px]:pr-16">
          <div className="flex flex-col text-center min-[1000px]:text-right">
            <h1
              className="
                uppercase text-white font-normal
                text-[clamp(68px,10vw,120px)]
                leading-[clamp(62px,8vw,90px)]
                min-[1000px]:text-left
              "
            >
              SHARP
            </h1>

            <h1
              className="
                uppercase text-white font-normal
                text-[clamp(68px,10vw,120px)]
                leading-[clamp(62px,8vw,90px)]
                min-[1000px]:ml-[225px]
              "
            >
              INTELLIGENT
            </h1>

            <h1
              className="
                uppercase text-white font-normal
                text-[clamp(68px,10vw,120px)]
                leading-[clamp(62px,8vw,90px)]
                min-[1000px]:ml-[225px]
                min-[1000px]:text-left
              "
            >
              GROWTH
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
