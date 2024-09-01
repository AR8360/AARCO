import React, { useState } from 'react';
import defaultImg from '../images/default.jpeg';

const MemberCarousel = () => {
  const members = [
    { name: 'John Doe', role: 'Software Engineer', image: defaultImg },
    { name: 'Jane Smith', role: 'UX Designer', image: defaultImg },
    { name: 'Mike Johnson', role: 'Project Manager', image: defaultImg },
    { name: 'Emily Brown', role: 'Data Scientist', image: defaultImg },
    { name: 'Chris Lee', role: 'Marketing Specialist', image: defaultImg },
    { name: 'Sarah Wilson', role: 'HR Manager', image: defaultImg },
    { name: 'David Chen', role: 'Financial Analyst', image: defaultImg },
    { name: 'Lisa Taylor', role: 'Product Owner', image: defaultImg },
    // Add more members as needed
  ];

  const [startIndex, setStartIndex] = useState(0);
  const membersPerPage = 4;

  const nextMembers = () => {
    setStartIndex((prevIndex) => 
      (prevIndex + membersPerPage >= members.length) ? 0 : prevIndex + membersPerPage
    );
  };

  const prevMembers = () => {
    setStartIndex((prevIndex) => 
      (prevIndex - membersPerPage < 0) ? Math.max(members.length - membersPerPage, 0) : prevIndex - membersPerPage
    );
  };

  return (
    <section id="members" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-white bg-[rgb(5,90,181)] py-2 rounded-lg">
          Our Members
        </h2>
        
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {members.slice(startIndex, startIndex + membersPerPage).map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4 shadow-lg"
                />
                <p className="font-semibold">{member.name}</p>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
          
          <button 
            onClick={prevMembers} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
          >
            &#8592;
          </button>
          <button 
            onClick={nextMembers} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
};

export default MemberCarousel;