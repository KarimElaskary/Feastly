import React from "react";
import feast from "../assets/feast.jpg";

const About = () => {
  return (
    <div className="px-5 md:container mx-auto mt-[50px] ">
      <div className="text-primary flex flex-col gap-6 justify-center items-center pb-9">
        <div className="flex flex-col lg:flex-row items-center gap-10 justify-between mt-[50px]">
          <p className="text-2xl text-center lg:text-left">
            At Feastly, we're passionate about great food and simple
            experiences. Whether you're in the mood for sizzling street-style
            bites, hearty classics, we bring a world of flavors to your
            fingertips. With hand-picked dishes across multiple categories,
            ordering your next feast is just a tap away. We believe in quality,
            speed, and simplicity. That’s why we’ve crafted an easy-to-use
            platform that connects food lovers to a rich variety of meals — all
            beautifully presented and built for modern appetites. So whether
            you're a late-night snacker or a lunch-time foodie, Feastly is here
            to feed your moment. Let’s eat better. Together.
          </p>
          <img src={feast} alt="" className="w-[800px] h-[400px] rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default About;
