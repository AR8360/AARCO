import React from 'react';

const NewsUpdates = () => {
  // Sample news data - replace with actual data from your source
  const newsItems = [
    {
      id: 1,
      title: "AARCO Annual Conference 2024 Dates Announced",
      date: "2024-05-15",
      excerpt: "Mark your calendars! The AARCO Annual Conference 2024 will be held from October 15-16 at the University Campus.",
      category: "Event"
    },
    {
      id: 2,
      title: "New Research Findings on Sustainable Energy Published",
      date: "2024-05-10",
      excerpt: "Groundbreaking research on sustainable energy sources has been published by AARCO members in the International Journal of Energy Research.",
      category: "Research"
    },
    {
      id: 3,
      title: "AARCO Welcomes New Board Members",
      date: "2024-05-05",
      excerpt: "We are pleased to announce the appointment of three new board members, bringing diverse expertise to our organization.",
      category: "Organization"
    },
    {
      id: 4,
      title: "Upcoming Webinar: The Future of AI in Research",
      date: "2024-05-01",
      excerpt: "Join us for an insightful webinar on how AI is shaping the future of academic research, featuring leading experts in the field.",
      category: "Event"
    }
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">News & Updates</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
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
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Read more →</a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
            View All News
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsUpdates;