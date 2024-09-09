import React from "react";
import logos from "../images/logo.png";

const Header = () => {
  return (
    <header
      id="header"
      className="bg-gradient-to-r from-blue-99 to-white text-blue-900 py-12 px-4 shadow-lg overflow-hidden mt-10 md:mt-20"
    >
      <div className="container mx-auto flex flex-col lg:flex-row-reverse items-center justify-between">
        {/* Text Section */}
        <div className="text-center lg:text-right mb-8 md:mb-12 lg:mb-0 lg:w-2/3">
          <div className="inline-block">
            <h1 className="text-3xl md:text-5xl lg:text-7xl xl:text-9xl font-bold mb-2 animate-slide-right">
              AARCO
            </h1>
            <h2 className="text-base md:text-lg lg:text-xl xl:text-2xl font-light animate-slide-left whitespace-normal md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
  Association of Alumni Retirees of Our Community
</h2>

          </div>
          <div className="flex flex-col md:flex-row items-center justify-center lg:justify-end space-y-6 md:space-y-0 md:space-x-8 text-base md:text-xl"></div>
        </div>

        {/* Logo Section */}
        <div className="flex-shrink-0 lg:w-1/3 flex justify-center lg:justify-start items-center animate-slide-up">
          <img
            src={logos}
            alt="AARCO Logo"
            className="w-40 md:w-60 lg:w-72 xl:w-80 h-40 md:h-60 lg:h-72 xl:h-80 object-contain transform hover:scale-105 transition-transform duration-300"
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
