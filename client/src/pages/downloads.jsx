import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

import { getPdfRoute, deletePdfRoute } from "../utils/ApiRoutes.js";
import axios from "axios";
import Footer from "../component/footer.jsx";

const Downloads = ({ isadmin, isLogin }) => {
  const navigate = useNavigate();
  const [pdfFiles, setPdfFiles] = useState([]);

  const fetchPdfFiles = async () => {
    try {
      const response = await axios.get(getPdfRoute);
      const data = response.data.pdf;
      setPdfFiles(data);
    } catch (error) {
      console.error("Error fetching Pdf Files:", error);
    }
  };

  const deletePdfFile = async (_id) => {
    try {
      const response = await axios.delete(deletePdfRoute, {
        data: { _id },
        withCredentials: true,
      });

      fetchPdfFiles();
    } catch (error) {
      console.error("Error deleting Pdf File:", error);
    }
  };

  useEffect(() => {
    fetchPdfFiles();
  }, []);

  return (
    <>
      <div
        className="bg-blue-900 inline-flex w-full items-center p-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>
      <div className="container mx-auto p-6 pb-80">
        <h1 className="text-3xl font-bold mb-6">Download PDF Notices</h1>
        {pdfFiles.length > 0 ? (
          <ul className="list-disc pl-5 space-y-4">
            {pdfFiles.map((file) => (
              <li key={file._id} className="text-lg relative">
                <a
                  href={file.link}
                  download
                  className={`text-blue-500 hover:underline absolute ${
                    isadmin ? `left-8` : ``
                  }`}
                >
                  {file.title}
                </a>
                {isadmin && (
                  <MdDelete
                    className={`text-red-600 absolute text-xl top-1 left-1 cursor-pointer ${
                      isadmin ? `left-1` : ``
                    }`}
                    onClick={() => deletePdfFile(file._id)}
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-2xl text-center font-bold text-red-500 mt-6 mb-80">
            No PDFs available
          </div>
        )}
      </div>
      <div>
        <Footer isLogin={isLogin} />
      </div>
    </>
  );
};

export default Downloads;
