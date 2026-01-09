import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Import Swiper styles
import "swiper/css";

import pizza from "../assets/pizza.jpg";
import burger from "../assets/burger.jpg";
import seafood from "../assets/seafood.jpg";

const Hero = () => {
  const slides = [
    {
      id: 1,
      title: "Artisan Pizza",
      subtitle: "Crispy crusts, endless toppings",
      img: pizza,
    },
    {
      id: 2,
      title: "Juicy Burgers",
      subtitle: "Grilled to perfection",
      img: burger,
    },
    {
      id: 3,
      title: "Fresh Seafood",
      subtitle: "Ocean to table delicacy",
      img: seafood,
    },
  ];

  return (
    <div className="container mx-auto px-5 py-8 md:py-12">
      <div className="flex flex-col items-center gap-6 justify-between mb-12 animate-[float_6s_ease-in-out_infinite]">
        <h2 className="text-5xl md:text-7xl font-bold text-center bg-gradient-to-r from-primary-dark via-primary to-accent bg-clip-text text-transparent tracking-tight">
          Welcome to Feastly
        </h2>
        <p className="text-xl md:text-3xl text-center text-slate-500 font-light max-w-2xl">
          Where <span className="text-primary font-medium">cravings</span> meet{" "}
          <span className="text-primary font-medium">convenience</span>.
        </p>
      </div>

      <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-shadow duration-500">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          className="h-[50vh] md:h-[600px] w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                {/* Image */}
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end pb-20 md:pb-32">
                  <div className="text-center px-4 transform transition-all duration-700 translate-y-0 opacity-100">
                    <h1 className="text-5xl md:text-8xl text-white font-bold tracking-tight mb-4 drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-white/90 text-lg md:text-2xl font-light tracking-wide bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full inline-block border border-white/20">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
