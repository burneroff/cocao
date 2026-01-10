import Header from "./Header";

export default function Hero() {
  return (
    <section className="relative h-screen w-screen overflow-hidden font-sans">
      {/* Видео на фоне */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute left-0 top-0 h-full w-full object-cover scale-y-[-1]"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      {/* Градиент затемнения внизу */}
      <div
        className="absolute bottom-0 left-0 w-full h-[200px]"
        style={{
          background: "linear-gradient(to top, black, rgba(8,8,8,0))",
        }}
      />

      {/* Контент поверх видео */}
      <div className="relative z-10 flex h-full flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-end pr-8 sm:pr-16">
          <div className="flex flex-col text-right">
            <h1 className="text-[120px] font-normal leading-[90px] uppercase text-white text-left">
              SHARP
            </h1>
            <h1 className="ml-[225px] text-[120px] font-normal leading-[90px] uppercase text-white">
              INTELLIGENT
            </h1>
            <h1 className="ml-[225px] text-[120px] font-normal leading-[90px] uppercase text-white text-left">
              GROWTH
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
