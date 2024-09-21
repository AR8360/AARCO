import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../component/footer";
import pdfFile from "../pdf/ec.pdf"; // Import the PDF file

const MemberList = ({ isLogin }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Back Icon */}
      <div
        className="bg-blue-900 inline-flex items-center p-4 cursor-pointer"
        onClick={handleBackClick}
      >
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>

      {/* Title */}
      <div className="container mx-auto px-4 mt-8 mb-8">
        <h2
          className="text-5xl font-bold text-center text-blue-900"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Our Members PDF
        </h2>
      </div>

      {/* PDF Display */}
      <div className="container mx-auto px-4 mb-8 flex-grow">
        {/* Make iframe responsive */}
        <div className="relative w-full h-96 sm:h-[600px] overflow-hidden shadow-md rounded-lg">
          <iframe
            src={`${pdfFile}#toolbar=0&navpanes=0&scrollbar=0`}
            className="absolute top-0 left-0 w-full h-full border-none"
            title="Members PDF"
            style={{ boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)" }}
          ></iframe>
        </div>

        {/* PDF Fallback Link */}
        <div className="text-center mt-4">
        <p>If PDF is not available on  this browser. 
             No worries, you can ,
          <a
            href={pdfFile}
            download="Members.pdf"
            className="text-blue-900 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
              Click to Download PDF
          </a></p>
        </div>
      </div>

      {/* Footer */}
      <Footer isLogin={isLogin} />
    </div>
  );
};

export default MemberList;
