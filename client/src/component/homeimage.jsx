import React from 'react';
import { useNavigate } from 'react-router-dom';
import ig1 from "../images/gallery/1.jpg";
import ig2 from "../images/gallery/2.jpg";
import ig3 from "../images/gallery/3.jpg";

// List of images
const images = [
  { src: ig1, alt: "Gallery Image 1" },
  { src: ig2, alt: "Gallery Image 2" },
 
];

const HomeImage = () => {
  const navigate = useNavigate();

  const handleViewGallery = () => {
    navigate('/gallery'); // Adjust the path to your actual gallery page route
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">Image Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg border border-gray-300 shadow-md transition-transform transform hover:scale-105"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100">
              <p className="text-white text-lg font-semibold">View</p>
            </div>
          </div>
        ))}
      </div>
      {/* View Gallery Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleViewGallery}
          className="w-full max-w-md mx-auto bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          View Gallery
        </button>
      </div>
    </div>
  );
};

export default HomeImage;
