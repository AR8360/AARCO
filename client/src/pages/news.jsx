import React from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Ensure you have this import
import { useNavigate } from 'react-router-dom';
import Footer from '../component/footer';  // Adjust the path as needed

const newsItems = [
  { 
    id: 1, 
    date: 'September 1, 2024', 
    category: 'Tech', 
    title: 'New AI Tool Released', 
    excerpt: 'A groundbreaking AI tool has been released, promising to revolutionize the industry with its advanced capabilities.' 
  },
  { 
    id: 2, 
    date: 'August 28, 2024', 
    category: 'Business', 
    title: 'Annual Conference Highlights', 
    excerpt: 'The annual conference provided insights into the latest trends and strategies for business growth in the coming year.' 
  },
  { 
    id: 3, 
    date: 'August 20, 2024', 
    category: 'Health', 
    title: 'New Wellness Program Launched', 
    excerpt: 'A new wellness program aims to improve employee health and productivity through innovative initiatives.' 
  },
  { 
    id: 4, 
    date: 'August 15, 2024', 
    category: 'Education', 
    title: 'Scholarship Opportunities for Students', 
    excerpt: 'Exciting new scholarship opportunities are available for students pursuing higher education in various fields.' 
  },
  { 
    id: 5, 
    date: 'August 15, 2024', 
    category: 'Education', 
    title: 'Scholarship Opportunities for Students', 
    excerpt: 'Exciting new scholarship opportunities are available for students pursuing higher education in various fields.' 
  }, 
  { 
    id: 6, 
    date: 'August 15, 2024', 
    category: 'Education', 
    title: 'Scholarship Opportunities for Students', 
    excerpt: 'Exciting new scholarship opportunities are available for students pursuing higher education in various fields.' 
  }, 
  { 
    id: 7, 
    date: 'August 15, 2024', 
    category: 'Education', 
    title: 'Scholarship Opportunities for Students', 
    excerpt: 'Exciting new scholarship opportunities are available for students pursuing higher education in various fields.' 
  },
];

const NewsUpdates = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Back Button */}
      <div className="bg-blue-900 inline-flex items-center p-4 cursor-pointer " onClick={handleBackClick}>
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>
      {/* Title */}
      <div className="container mx-auto px-4 mt-8 mb-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
          News & Updates
        </h2>
      </div>

      {/* News Items */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">{item.date}</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                  {item.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.excerpt}</p>
            </div>
          
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NewsUpdates;
