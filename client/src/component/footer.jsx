import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Leadership', 'Seniority', 'Constitution', 'Bulletin Board', 'Gallery', 'RTI', 'Judgements'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-blue-300 transition duration-300">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="mb-2">Saurabh Swami</p>
            <p className="mb-2">Regional P.F. Commissioner - I (NFSG)</p>
            <p className="mb-2">Secretary General</p>
            <p className="mb-2">0161-2440559</p>
            <p className="mb-2">0161-2402206</p>
            <a href="mailto:epfooa@gmail.com" className="hover:text-blue-300 transition duration-300">epfooa@gmail.com</a>
          </div>

          {/* Gallery */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-gray-600 h-20 rounded-md overflow-hidden">
                  <img 
                    src={`/api/placeholder/80/80`} 
                    alt={`Gallery image ${item}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">Sign up for the Newsletter</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email address"
                className="px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} AARCO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;