import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLogin, admin }) => {
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
    navigate("/downloads"); // Navigate to the downloads page
  };
  const handleCClick = () => {
    navigate("/commitee"); // Navigate to the downloads page
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

          <ScrollLink
            to="member-carousel"
            smooth={true}
            duration={500}
            offset={-70}
            className="text-lg font-semibold hover:text-blue-600 transition duration-300 cursor-pointer"
          >
            Members
          </ScrollLink>
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
          <ScrollLink
            to="committee"
            smooth={true}
            duration={500}
            offset={-70}
            className="text-lg font-semibold hover:text-blue-600 transition duration-300 cursor-pointer"
          >
            Committee
          </ScrollLink>
          <button
            onClick={handleDownloadClick} // Navigate to Downloads page on click
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Downloads
          </button>
          {!isLogin && (
            <button
              onClick={handleLoginClick}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          )}
          {admin && (
            <button
              onClick={() => navigate("/admin")}
              className="text-xl font-semibold underline cursor-pointer"
            >
              admin
            </button>
          )}
        </div>
        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <button onClick={handleMenuToggle} className="text-2xl">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} bg-gray-100`}
      >
        <ScrollLink
          to="news-updates"
          smooth={true}
          duration={500}
          offset={-70}
          className="block py-2 px-4 text-lg hover:bg-gray-200 cursor-pointer"
          onClick={handleMenuToggle}
        >
          News & Updates
        </ScrollLink>
        <ScrollLink
          to="member-carousel"
          smooth={true}
          duration={500}
          offset={-70}
          className="block py-2 px-4 text-lg hover:bg-gray-200 cursor-pointer"
          onClick={handleMenuToggle}
        >
          Members
        </ScrollLink>
        <ScrollLink
          to="about-aarco"
          smooth={true}
          duration={500}
          offset={-70}
          className="block py-2 px-4 text-lg hover:bg-gray-200 cursor-pointer"
          onClick={handleMenuToggle}
        >
          About
        </ScrollLink>
        <ScrollLink
          to="retired-carousel"
          smooth={true}
          duration={500}
          offset={-70}
          className="block py-2 px-4 text-lg hover:bg-gray-200 cursor-pointer"
          onClick={handleMenuToggle}
        >
          Retirements
        </ScrollLink>
        <ScrollLink
          to="committee"
          smooth={true}
          duration={500}
          offset={-70}
          className="block py-2 px-4 text-lg hover:bg-gray-200 cursor-pointer"
          onClick={handleMenuToggle}
        >
          Committee
        </ScrollLink>
        <button
          onClick={handleCClick}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
        <button
          onClick={handleDownloadClick} // Navigate to Downloads page on click
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-300"
        >
          Downloads
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
