import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-900 text-white py-4 shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
          <h1 className="text-4xl font-semibold">
              <ScrollLink
                to="header"  // Replace this with the id of your top section
                smooth={true}
                duration={500}
                offset={-70}  // Adjust based on your navbar height
                className="cursor-pointer"
              >
                AARCO
              </ScrollLink>
            </h1>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <ScrollLink
              to="news-updates"
              smooth={true}
              duration={500}
              offset={-70}
              className="text-xl font-semibold hover:text-blue-300 transition duration-300 cursor-pointer"
            >
              News & Updates
            </ScrollLink>
            <ScrollLink
              to="member-carousel"
              smooth={true}
              duration={500}
              offset={-70}
              className="text-xl font-semibold hover:text-blue-300 transition duration-300 cursor-pointer"
            >
              Members
            </ScrollLink>
            <ScrollLink
              to="about-aarco"
              smooth={true}
              duration={500}
              offset={-70}
              className="text-xl font-semibold hover:text-blue-300 transition duration-300 cursor-pointer"
            >
              About
            </ScrollLink>
            <ScrollLink
              to="retired-carousel"
              smooth={true}
              duration={500}
              offset={-70}
              className="text-xl font-semibold hover:text-blue-300 transition duration-300 cursor-pointer"
            >
              Retirements
            </ScrollLink>
            <button
      onClick={handleClick}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
    >
      Login
    </button>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={handleMenuToggle} className="mobile-menu-button">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} font-bold bg-gray-800`}>
        <ScrollLink
          to="news-updates"
          smooth={true}
          duration={500}
          offset={-70}
          className="block py-2 px-4 text-sm hover:bg-gray-700 cursor-pointer"
          onClick={handleMenuToggle}
        >
          News & Updates
        </ScrollLink>
        <ScrollLink
          to="member-carousel"
          smooth={true}
          duration={500}
          offset={-70}
          className="block py-2 px-4 text-sm hover:bg-gray-700 cursor-pointer"
          onClick={handleMenuToggle}
        >
          Members
        </ScrollLink>
        <ScrollLink
          to="about-aarco"
          smooth={true}
          duration={500}
          offset={-70}
          className="block py-2 px-4 text-sm hover:bg-gray-700 cursor-pointer"
          onClick={handleMenuToggle}
        >
          About
        </ScrollLink>
        <ScrollLink
          to="retired-carousel"
          smooth={true}
          duration={500}
          offset={-70}
          className="block py-2 px-4 text-sm hover:bg-gray-700 cursor-pointer"
          onClick={handleMenuToggle}
        >
          Retirements
        </ScrollLink>
        <button
      onClick={handleClick}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
    >
      Login
    </button>
      </div>
    </nav>
  );
};

export default Navbar;
