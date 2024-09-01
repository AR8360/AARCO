import React from 'react';

const AboutAARCO = () => {
  return (
    <section id="about-aarco" className="mb-12 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-lg p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-blue-600 text-center font-serif">About AARCO</h2>
        
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4 text-blue-500">Our Motto</h3>
          <blockquote className="text-xl italic text-gray-700 border-l-4 border-blue-500 pl-4 py-2">
            "Uniting Professionals, Advancing Industries, Shaping Futures"
          </blockquote>
        </div>
        
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4 text-blue-500">Membership Rules</h3>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="arrow mr-2 mt-1 flex-shrink-0"></span>
              <span>Open to professionals with at least 3 years of industry experience</span>
            </li>
            <li className="flex items-start">
              <span className="arrow mr-2 mt-1 flex-shrink-0"></span>
              <span>Annual membership fee of $250, with discounts for early renewals</span>
            </li>
            <li className="flex items-start">
              <span className="arrow mr-2 mt-1 flex-shrink-0"></span>
              <span>Commitment to attend at least 2 AARCO events per year</span>
            </li>
            <li className="flex items-start">
              <span className="arrow mr-2 mt-1 flex-shrink-0"></span>
              <span>Adherence to AARCO's code of ethics and professional conduct</span>
            </li>
          </ul>
        </div>
        
        {/* <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            Member Login
          </button>
        </div> */}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');

        h2 {
          font-family: 'Playfair Display', serif;
        }

        h3, button {
          font-family: 'Poppins', sans-serif;
        }

        .text-gray-700 {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
        }

        .arrow {
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 10px solid #3B82F6;
          display: inline-block;
        }

        ul li {
          opacity: 0;
          transform: translateX(-20px);
          animation: slide-in 0.6s forwards;
        }

        ul li:nth-child(1) { animation-delay: 0.1s; }
        ul li:nth-child(2) { animation-delay: 0.2s; }
        ul li:nth-child(3) { animation-delay: 0.3s; }
        ul li:nth-child(4) { animation-delay: 0.4s; }

        @keyframes slide-in {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        button {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
      `}</style>
    </section>
  );
};

export default AboutAARCO;