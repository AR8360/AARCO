import React from "react";
import logos from "../images/logo.png";

const Header = () => {
  return (
    <header
      id="header"
      className="bg-gradient-to-r from-blue-99 to-white text-blue-900 py-16 px-4 shadow-lg overflow-hidden mt-20"
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        {/* Text Section */}
        <div className="text-center lg:text-left mb-12 lg:mb-0 lg:w-2/3">
          <div className="inline-block">
            <h1 className="text-2xl md:text-7xl lg:text-9xl font-bold mb-2 animate-slide-right">
              AARCO
            </h1>
            <h2 className="text-3xl md:text-xl lg:text-3xl font-light animate-slide-left whitespace-nowrap overflow-hidden text-ellipsis">
              ASSOCIATION OF ATOMIC ENERGY OFFICERS
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start space-y-6 md:space-y-0 md:space-x-8 text-xl"></div>
        </div>

        {/* Logo Section */}
        <div className="flex-shrink-0 lg:w-1/3 flex justify-center lg:justify-end items-center animate-slide-up">
          <img
            src={logos}
            alt="AARCO Logo"
            className="w-64 md:w-72 lg:w-80 h-64 md:h-72 lg:h-80 object-contain transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <style jsx>{`
        @keyframes slideRight {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideLeft {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-right {
          animation: slideRight 1s ease-out forwards;
        }
        .animate-slide-left {
          animation: slideLeft 1s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;
