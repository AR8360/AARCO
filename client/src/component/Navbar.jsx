import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-900 text-white py-4 shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">
              <Link to="/">AARCO</Link>
            </h1>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="#news-updates" className="text-lg font-semibold hover:text-blue-300 transition duration-300">News & Updates</Link>
            <Link to="#members" className="text-lg font-semibold hover:text-blue-300 transition duration-300">Members</Link>
            <Link to="#about" className="text-lg font-semibold hover:text-blue-300 transition duration-300">About</Link>
            <Link to="#retirements" className="text-lg font-semibold hover:text-blue-300 transition duration-300">Retirements</Link>
            <Link to="/admin-login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Admin Login</Link>
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
        <Link to="#news-updates" className="block py-2 px-4 text-sm hover:bg-gray-700">News & Updates</Link>
        <Link to="#members" className="block py-2 px-4 text-sm hover:bg-gray-700">Members</Link>
        <Link to="#about" className="block py-2 px-4 text-sm hover:bg-gray-700">About</Link>
        <Link to="#retirements" className="block py-2 px-4 text-sm hover:bg-gray-700">Retirements</Link>
        <Link to="/admin-login" className="block py-2 px-4 text-sm bg-blue-500 text-white hover:bg-blue-600">Admin Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
