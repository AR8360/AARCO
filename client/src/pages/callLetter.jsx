import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "../component/footer";

// Importing all the PDFs
import A from "../public/pdf/callLetter/CallLetter-A-10-2024.pdf";
import B from "../public/pdf/callLetter/CallLetter-B-10-2024.pdf";
import C from "../public/pdf/callLetter/CallLetter-C-10-2024.pdf";
import D from "../public/pdf/callLetter/CallLetter-D-10-2024.pdf";
import E from "../public/pdf/callLetter/CallLetter-E-10-2024.pdf";
import F from "../public/pdf/callLetter/CallLetter-F-10-2024.pdf";
import EP from "../public/pdf/callLetter/CallLetter-EP-10-2024.pdf";
import SA from "../public/pdf/callLetter/CallLetter-SA-10-2024.pdf";

const CallLetter = ({ isLogin }) => {
  const navigate = useNavigate();

  // State to keep track of the selected PDF
  const [selectedPdf, setSelectedPdf] = useState(B); // Default to PDF B

  // Array to map call letters
  const pdfFiles = [
    { label: "Call Letter A", file: A },
    { label: "Call Letter B", file: B },
    { label: "Call Letter C", file: C },
    { label: "Call Letter D", file: D },
    { label: "Call Letter E", file: E },
    { label: "Call Letter F", file: F },
    { label: "Call Letter EP", file: EP },
    { label: "Call Letter SA", file: SA },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div
        className="bg-blue-900 inline-flex items-center p-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>
      <div className="container mx-auto px-4 mt-8 mb-8">
        <h2
          className="text-5xl font-bold text-center text-blue-900"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Call Letters
        </h2>
      </div>
      <div className="container mx-auto px-4 mb-8 flex-grow">
        {/* Dropdown for selecting a PDF */}
        <div className="text-center mb-4">
          <label
            htmlFor="pdfSelector"
            className="block text-lg font-medium text-gray-700"
          >
            Select a Call Letter:
          </label>
          <select
            id="pdfSelector"
            className="mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            value={selectedPdf}
            onChange={(e) => setSelectedPdf(e.target.value)}
          >
            {pdfFiles.map((pdf, index) => (
              <option key={index} value={pdf.file}>
                {pdf.label}
              </option>
            ))}
          </select>
        </div>

        {/* Responsive iframe container for embedding the selected PDF */}
        <div className="relative w-full h-96 sm:h-[600px] overflow-hidden shadow-md rounded-lg">
          <iframe
            src={`${selectedPdf}#toolbar=0&navpanes=0&scrollbar=0`}
            className="absolute top-0 left-0 w-full h-full border-none"
            title="Call Letter PDF"
            style={{ boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)" }}
          ></iframe>
        </div>

        {/* Fallback download link */}
        <div className="text-center mt-4">
          <p>If the PDF is not visible, you can:</p>
          <a
            href={selectedPdf}
            download="CallLetter.pdf"
            className="text-blue-900 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download the Call Letter
          </a>
        </div>
      </div>
      <Footer isLogin={isLogin} />
    </div>
  );
};

export default CallLetter;
