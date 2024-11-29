import React from "react";
import logos from "../images/logo-trans.png";
import background from "../images/igcgarden.jpg";

const Header = () => {
  return (
    <header
      id="header"
      className="flex flex-col items-center justify-center mt-10 md:mt-20 px-4  overflow-hidden"
    >
      {/* Name and Logo Section */}
      <div className="bg-white w-full flex flex-col lg:flex-row items-center justify-center py-6 px-4">
        <div className="flex justify-center items-center mt-4 lg:mt-0">
          <img
            src={logos}
            alt="AARCO Logo"
            className="w-32 md:w-48 lg:w-56 h-28 md:h-44 lg:h-52 object-contain"
          />
        </div>
        <div className="text-center lg:mr-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900">
            Association of Atomic Research Centre Officers Kalpakkam
          </h1>
        </div>
      </div>

      {/* Image Section */}
      <div
        className="bg-gradient-to-r from-blue-99 to-white flex justify-center items-center mt-8 p-8"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover", // Ensures the image fills the container
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
          width: "90%", // Full-width container
          height: "500px", // Increased height for a larger image display
          borderRadius: "16px", // Slightly larger border radius for aesthetic
        }}
      ></div>

      {/* Styles */}
      <style>
        {`
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
            .animate-slide-up {
              animation: slideUp 1s ease-out forwards;
            }
          `}
      </style>
    </header>
  );
};

export default Header;
