import React from 'react';

const Goals = () => {
  return (
    <section id="goals" className="mb-12 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-4xl font-bold mb-8 text-blue-600 text-center">Our Goals</h2>
      <div className="max-w-100 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="goal-item">
            <h3 className="text-2xl font-semibold mb-2 text-blue-500">Enhance Community Engagement</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              We aim to foster a vibrant, connected community through innovative initiatives. 
              Our events, online platforms, and local meetups are designed to bring people together, 
              encouraging dialogue and collaboration across diverse groups.
            </p>
          </div>
          <div className="goal-item">
            <h3 className="text-2xl font-semibold mb-2 text-blue-500">Promote Sustainability</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Environmental stewardship is at the core of our mission. We're committed to implementing 
              eco-friendly practices in all our operations, educating our community on sustainable living, 
              and partnering with organizations that share our green vision.
            </p>
          </div>
          <div className="goal-item">
            <h3 className="text-2xl font-semibold mb-2 text-blue-500">Foster Educational Growth</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe in lifelong learning and professional development. Through workshops, 
              webinars, and mentorship programs, we provide our members with opportunities to 
              expand their knowledge, skills, and networks in an ever-evolving landscape.
            </p>
          </div>
          <div className="goal-item">
            <h3 className="text-2xl font-semibold mb-2 text-blue-500">Drive Innovation</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Embracing cutting-edge technologies and fresh ideas is crucial for progress. 
              We actively support research initiatives, hackathons, and start-up incubators 
              to nurture innovation and push the boundaries of what's possible in our field.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .goal-item {
          opacity: 0;
          transform: translateY(20px);
          animation: slide-in 0.8s forwards;
        }
        .goal-item:nth-child(1) { animation-delay: 0.2s; }
        .goal-item:nth-child(2) { animation-delay: 0.4s; }
        .goal-item:nth-child(3) { animation-delay: 0.6s; }
        .goal-item:nth-child(4) { animation-delay: 0.8s; }
        @keyframes slide-in {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Goals;
