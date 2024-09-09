import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Optional for menu icons
import { logoutRoute } from "../utils/ApiRoutes.js";
import axios from "axios";

const Navbar = ({ isLogin, admin, setadmin, setIsLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleNewsClick = () => {
    navigate("/news");
  };
  const handleDownloadClick = () => {
    navigate("/downloads");
  };
  const handleCClick = () => {
    navigate("/committee");
  };
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        logoutRoute,
        {},
        { withCredentials: true }
      );

      if (response.data.status) {
        setIsLogin(false);
        setadmin(false);
        navigate("/");
      }
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white text-blue-900 py-3 shadow-md z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Title */}
        <div>
          <p className="text-xl font-semibold">ARRCO</p>
          <p className="text-sm">Employees' IGCAR, Govt. of India</p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            className="text-lg font-semibold hover:text-blue-600 transition duration-300 cursor-pointer"
            onClick={handleNewsClick}
          >
            News & Updates
          </button>

          <div
            className="text-lg font-semibold  cursor-pointer"
            onClick={() => navigate("/members")}
          >
            Members
          </div>

          <ScrollLink
            to="about-aarco"
            smooth={true}
            duration={500}
            offset={-70}
            className="text-lg font-semibold hover:text-blue-600 transition duration-300 cursor-pointer"
          >
            About
          </ScrollLink>
          <ScrollLink
            to="retired-carousel"
            smooth={true}
            duration={500}
            offset={-70}
            className="text-lg font-semibold hover:text-blue-600 transition duration-300 cursor-pointer"
          >
            Retirements
          </ScrollLink>

          <div
            onClick={handleCClick}
            className="text-lg font-semibold hover:text-blue-600 transition duration-300 cursor-pointer"
          >
            Committee
          </div>
          <div
            onClick={() => navigate("/gallery")}
            className="text-lg font-semibold hover:text-blue-600 transition duration-300 cursor-pointer"
          >
            Gallery
          </div>

          <div
            onClick={handleDownloadClick}
            className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Downloads
          </div>

          {!isLogin && !admin && (
            <div
              onClick={handleLoginClick}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Login
            </div>
          )}

          {admin && (
            <div
              onClick={() => navigate("/admin")}
              className="text-lg font-semibold underline cursor-pointer"
            >
              Admin
            </div>
          )}

          {isLogin && (
            <div
              className="text-lg cursor-pointer"
              onClick={() => handleLogout()}
            >
              Logout
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <button onClick={handleMenuToggle} className="text-2xl">
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} bg-gray-100`}
      >
        <button
          className="block py-2 px-4 text-lg cursor-pointer"
          onClick={handleNewsClick}
        >
          News & Updates
        </button>
        <div
          className="block py-2 px-4 text-lg cursor-pointer"
          onClick={() => navigate("/members")}
        >
          Members
        </div>
        <ScrollLink
          to="about-aarco"
          smooth={true}
          duration={500}
          offset={-70}
          className="block py-2 px-4 text-lg cursor-pointer"
          onClick={handleMenuToggle}
        >
          About
        </ScrollLink>
        <ScrollLink
          to="retired-carousel"
          smooth={true}
          duration={500}
          offset={-70}
          className="block py-2 px-4 text-lg cursor-pointer"
          onClick={handleMenuToggle}
        >
          Retirements
        </ScrollLink>
        <div
          onClick={handleCClick}
          className="block py-2 px-4 text-lg cursor-pointer"
        >
          Committee
        </div>
        <div
          onClick={() => navigate("/gallery")}
          className="block py-2 px-4 text-lg cursor-pointer"
        >
          Gallery
        </div>
        <div
          onClick={handleDownloadClick}
          className="block py-2 px-4 cursor-pointer bg-blue-500 text-white w-full"
        >
          Downloads
        </div>

        {/* Conditionally render Login for mobile */}
        {!isLogin && !admin && (
          <div
            onClick={handleLoginClick}
            className="block py-2 px-4 bg-blue-500 text-white w-full"
          >
            Login
          </div>
        )}

        {admin && (
          <div
            onClick={() => navigate("/admin")}
            className="block py-2 px-4 text-lg font-semibold underline cursor-pointer"
          >
            Admin
          </div>
        )}

        {isLogin && (
          <div
            className="block py-2 px-4 text-lg cursor-pointer"
            onClick={() => handleLogout()}
          >
            Logout
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
