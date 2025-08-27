import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;
