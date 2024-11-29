import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ig1 from "../images/gallery/1.jpg";
import ig2 from "../images/gallery/2.jpg";

// List of images
const images = [
  { src: ig1, alt: "Gallery Image 1" },
  { src: ig2, alt: "Gallery Image 2" },
  { src: ig1, alt: "Gallery Image 3" },
  { src: ig2, alt: "Gallery Image 4" },
];

const HomeImage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleViewGallery = () => {
    navigate("/gallery"); // Adjust the path to your actual gallery page route
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-blue-900 mb-6 lg:mb-8">
        Image Gallery
      </h2>

      {/* Carousel */}
      <div className="relative w-full max-w-[90%] sm:max-w-lg lg:max-w-2xl mx-auto aspect-video overflow-hidden rounded-lg border border-gray-300 shadow-md">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover transition-transform duration-1000"
        />
      </div>

      {/* View Gallery Button */}
      <div className="text-center mt-6 sm:mt-8">
        <button
          onClick={handleViewGallery}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          View Gallery
        </button>
      </div>
    </div>
  );
};

export default HomeImage;
