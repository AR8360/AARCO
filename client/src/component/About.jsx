import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to install react-router-dom if using routing

const Home = () => {
  return (
    <div className="font-sans text-gray-900">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-3xl font-bold">
            <Link to="/">AARCO</Link>
          </h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="#news-updates" className="hover:text-gray-300">News & Updates</Link></li>
              <li><Link to="#members" className="hover:text-gray-300">Members</Link></li>
              <li><Link to="#about" className="hover:text-gray-300">About</Link></li>
              <li><Link to="#retirements" className="hover:text-gray-300">Retirements</Link></li>
              <li><Link to="/admin-login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Admin Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <section id="president-message" className="my-6">
          <h2 className="text-2xl font-semibold">President/Secretary Message</h2>
          <p className="mt-2">Welcome message goes here...</p>
        </section>
        
        <section id="goals" className="my-6">
          <h2 className="text-2xl font-semibold">Goals</h2>
          <p className="mt-2">Our goals...</p>
        </section>
        
        <section id="news-updates" className="my-6">
          <h2 className="text-2xl font-semibold">News & Updates</h2>
          <p className="mt-2">Latest news...</p>
        </section>
        
        <section id="retirements" className="my-6">
          <h2 className="text-2xl font-semibold">Retirements</h2>
          <p className="mt-2">Details on retirements...</p>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 AARCO. All rights reserved.</p>
          <p className="mt-2 text-sm">Contact Us: <a href="mailto:info@aarco.org" className="text-blue-300 hover:underline">info@aarco.org</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
