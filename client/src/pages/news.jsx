import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Ensure you have this import
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import Footer from "../component/footer"; // Adjust the path as needed
import { getNewsRoute, DeleteNewsRoute } from "../utils/ApiRoutes";

const NewsUpdates = ({ isadmin }) => {
  const [newsItem, setNewsItem] = useState([]);
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/");
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // en-GB formats the date as DD/MM/YYYY
  };
  const getAllNews = async () => {
    try {
      const response = await axios.get(getNewsRoute);
      const data = response.data.news;
      setNewsItem(data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(DeleteNewsRoute, {
        data: { _id: id },
        withCredentials: true,
      });
      getAllNews();
    } catch (error) {
      console.error("Failed to delete news:", error);
    }
  };

  useEffect(() => {
    getAllNews();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Back Button */}
      <div
        className="bg-blue-900 inline-flex items-center p-4 cursor-pointer "
        onClick={handleBackClick}
      >
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>
      {/* Title */}
      <div className="container mx-auto px-4 mt-8 mb-8">
        <h2
          className="text-4xl font-bold mb-8 text-center text-gray-800"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          News & Updates
        </h2>
      </div>

      {/* News Items */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
        {newsItem.length > 0 ? (
          newsItem.map((item) => (
            <div
              key={item._id}
              className="bg-white relative rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              {isadmin && (
                <MdDelete
                  className="text-red-800 absolute text-xl top-4 right-4 cursor-pointer"
                  onClick={() => handleDelete(item._id)}
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    {formatDate(item.date)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-3xl font-bold  text-red-500">
            No news available
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NewsUpdates;
