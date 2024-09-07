import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./header";
import Goals from "./Goals";
import AboutAARCO from "./aarco";
import MemberCarousel from "./member";
import NewsUpdates from "./update";
import Marquee from "./marqueue"; // Import Marquee component
import { verify } from "../utils/ApiRoutes";
import axios from "axios";
// Import the Navbar component
import PresidentMessage from "./presidentMessage";
import Footer from "./footer";
import RetiredCarousel from "./retried";
import HomeImage from "./homeimage";

const Home = ({ admin, isLogin, setadmin, setIsLogin }) => {
  const handleadminvrification = async () => {
    try {
      const response = await axios.get(verify, { withCredentials: true });
      console.log("admin verification response:", response.data.decoded.status);

      if (response.data.success) {
        if (response.data.decoded.status === "admin") {
          setadmin(true);
        }
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Error during admin verification:", error);
    }
  };
  useEffect(() => {
    handleadminvrification();
  }, []);
  return (
    <div className="font-sans text-gray-900">
      {/* Navbar */}
      <Navbar admin={admin} isLogin={isLogin} />

      <Header />
      <Marquee />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pt-20">
        {" "}
        {/* Add padding-top to account for fixed navbar */}
        <PresidentMessage id="president-message" />
        <Goals id="goals" />
        <AboutAARCO id="about-aarco" />
        <MemberCarousel id="member-carousel" />
        <RetiredCarousel id="retired-carousel" />
        <HomeImage />
        {/* About Section */}
      </main>

      {/* Footer */}

      <Footer />
    </div>
  );
};

export default Home;
