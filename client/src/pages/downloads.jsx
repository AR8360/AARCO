import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Left arrow icon for the back button
import { useNavigate } from "react-router-dom"; // Hook for navigation
import { MdDelete } from "react-icons/md"; // Delete icon for admin functionality
import { getPdfRoute, deletePdfRoute } from "../utils/ApiRoutes.js"; // API routes for fetching and deleting PDF files
import axios from "axios"; // For making HTTP requests
import Footer from "../component/footer.jsx"; // Footer component
import Loading from "../component/loading.jsx";

const Downloads = ({ isadmin, isLogin }) => {
  const navigate = useNavigate();
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPdfFiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(getPdfRoute);
      setPdfFiles(response.data.pdf);
    } catch (error) {
      console.error("Error fetching Pdf Files:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePdfFile = async (_id) => {
    try {
      await axios.delete(deletePdfRoute, {
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
      {/* Back button */}
      <div
        className="bg-blue-900 inline-flex w-full items-center p-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>

      {/* PDF Download Section */}
      <div className="container mx-auto p-6 pb-80">
        <h1 className="text-3xl font-bold mb-6">Download PDF Notices</h1>
        {loading && <Loading />}
        {pdfFiles.length > 0 ? (
          // Display the PDF files in a table
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-400">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-400 px-4 py-2">No.</th>
                  <th className="border border-gray-400 px-4 py-2">Name</th>
                  <th className="border border-gray-400 px-4 py-2">Download</th>
                  {isadmin && (
                    <th className="border border-gray-400 px-4 py-2">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {pdfFiles.map((file, index) => (
                  <tr key={file._id} className="text-center">
                    <td className="border border-gray-400 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {file.title}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <a
                        href={file.link}
                        download
                        target="_blank"
                        className="text-blue-500 hover:underline"
                      >
                        Download
                      </a>
                    </td>
                    {isadmin && (
                      <td className="border border-gray-400 px-4 py-2">
                        <MdDelete
                          className="text-red-600 text-xl cursor-pointer"
                          onClick={() => deletePdfFile(file._id)}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && (
            <div className="text-2xl text-center font-bold text-red-500 mt-6 mb-80">
              No PDFs available
            </div>
          )
        )}
      </div>

      {/* Footer */}
      <div>
        <Footer isLogin={isLogin} />
      </div>
    </>
  );
};

export default Downloads;
