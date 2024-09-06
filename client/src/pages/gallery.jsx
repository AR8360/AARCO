import React from 'react';
import ig1 from "../images/gallery/1.jpg";
import ig2 from "../images/gallery/2.jpg";
import ig3 from "../images/gallery/3.jpg";
import ig4 from "../images/gallery/4.jpg";
import ig5 from "../images/gallery/5.jpg";
import ig6 from "../images/gallery/6.jpg";

// List of images
const images = [
  { src: ig1, alt: "Gallery Image 1" },
  { src: ig2, alt: "Gallery Image 2" },
  { src: ig3, alt: "Gallery Image 3" },
  { src: ig4, alt: "Gallery Image 4" },
  { src: ig5, alt: "Gallery Image 5" },
  { src: ig6, alt: "Gallery Image 6" },
];

const Gallery = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-12 px-4">
      <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg border border-gray-300 shadow-md transition-transform transform hover:scale-105"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-80 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
