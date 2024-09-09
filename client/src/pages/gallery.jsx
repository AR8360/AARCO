import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "axios";

import { gallery } from "../utils/ApiRoutes.js";
import Footer from "../component/footer.jsx";
const Gallery = ({ isadmin }) => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlegetImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(gallery);

      if (response.data.status) {
        setImages(response.data.gallery);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (_id) => {
    try {
      const response = await axios.delete(gallery, {
        data: { _id },
        withCredentials: true,
      });

      if (response.data.status) {
        handlegetImages();
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
  useEffect(() => {
    handlegetImages();
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
      <div className="w-full max-w-6xl mx-auto mt-12 px-4 ">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">
          Gallery
        </h2>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${
            images.length === 0 ? `pb-80` : `pb-20`
          }`}
        >
          {images.length > 0 ? (
            images.map((image) => (
              <div
                key={image._id}
                className="relative overflow-hidden rounded-lg border border-gray-300 shadow-md transition-transform transform hover:scale-105"
              >
                {isadmin && (
                  <MdDelete
                    className="text-red-600 absolute text-xl top-4 right-4 cursor-pointer bg-white rounded-full"
                    onClick={() => handleDeleteImage(image._id)}
                  />
                )}
                <img
                  src={image.image}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))
          ) : (
            <div className="text-2xl text-center font-bold text-red-500 mt-6 mb-80">
              No images available
            </div>
          )}
        </div>
      </div>
      <div className="pt-6">
        <Footer />
      </div>
    </>
  );
};

export default Gallery;
