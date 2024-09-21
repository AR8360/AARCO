import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./header";
import Goals from "./Goals";
import AboutAARCO from "./aarco";
import Marquee from "./marqueue";

// Import the Navbar component
import PresidentMessage from "./presidentMessage";
import Footer from "./footer";
import RetiredCarousel from "./retried";
import HomeImage from "./homeimage";

const Home = ({ admin, isLogin, setadmin, setIsLogin }) => {
  return (
    <div className="font-sans text-gray-900">
      {/* Navbar */}
      <Navbar
        admin={admin}
        isLogin={isLogin}
        setadmin={setadmin}
        setIsLogin={setIsLogin}
      />

      <Header />
      <Marquee />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pt-20">
        {" "}
        {/* Add padding-top to account for fixed navbar */}
        <PresidentMessage id="president-message" />
        <Goals id="goals" />
        <AboutAARCO id="about-aarco" />
        <RetiredCarousel id="retired-carousel" />
        <HomeImage />
        {/* About Section */}
      </main>

      {/* Footer */}

      <Footer isLogin={isLogin} />
    </div>
  );
};

export default Home;
