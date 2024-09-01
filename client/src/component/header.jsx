import React from 'react';

const Header = () => {
  return (
    <header id ="header" className="bg-gradient-to-r from-blue-100 to-white text-blue-900 py-28 px-4 shadow-lg overflow-hidden">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        {/* Text Section */}
        <div className="text-center lg:text-left mb-8 lg:mb-0 lg:w-2/3">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-right">
            AARCO
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-6 animate-slide-left">
            Annual Research Conference
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start space-y-4 md:space-y-0 md:space-x-6 text-lg">
            <div className="flex items-center animate-fade-in" style={{animationDelay: '0.5s'}}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>October 15-16</span>
            </div>
            <div className="flex items-center text-lg animate-fade-in" style={{animationDelay: '0.7s'}}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>University Campus</span>
            </div>
          </div>
        </div>
        
        {/* Logo Section */}
        <div className="flex-shrink-0 lg:w-1/3 flex justify-center lg:justify-end animate-slide-up">
          <img src="aarco-logo.png" alt="AARCO Logo" className="w-32 md:w-40 lg:w-48 h-auto transform hover:scale-105 transition-transform duration-300" />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideRight {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideLeft {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
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