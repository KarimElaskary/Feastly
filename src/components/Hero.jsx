import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";

import pizza from "../assets/pizza.jpg";
import burger from "../assets/burger.jpg";
import seafood from "../assets/seafood.jpg";

const Hero = () => {
  const slides = [
    { id: 1, title: "Pizza", img: pizza },
    { id: 2, title: "Burger", img: burger },
    { id: 3, title: "Seafood", img: seafood },
  ];

  return (
    <div className="px-5 md:container mx-auto mt-[50px]">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex justify-center items-center">
              <img
                src={slide.img}
                alt={slide.title}
                className="w-[1200px] h-[600px] rounded-2xl"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[40px]">
                <h1 className="text-8xl text-white font-bold text-shadow-lg text-shadow-black">
                  {slide.title}
                </h1>
                <Link to='/products' className="bg-primary text-white px-4 py-2 rounded cursor-pointer">
                  Order
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
