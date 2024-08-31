import React from 'react';
import Navbar from './Navbar'; 
import Header from './header'
import Goals from './Goals';
import AboutAARCO from './aarco';
import MemberCarousel from './member';
import NewsUpdates from './update';
// Import the Navbar component
import PresidentMessage from './presidentMessage';
import Footer from './footer';
import { Link } from 'react-router-dom'; // Make sure to have react-router-dom installed

const Home = () => {
  return (
    <div className="font-sans text-gray-900">
      {/* Navbar */}
      <Navbar />
 <Header/>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pt-20"> {/* Add padding-top to account for fixed navbar */}
      <PresidentMessage/>
        
       <Goals/>
       <AboutAARCO/>
       <MemberCarousel/>
       <NewsUpdates/>
        
        
        <section id="retirements" className="my-6">
          <h2 className="text-2xl font-semibold">Retirements</h2>
          <p className="mt-2">Details on retirements...</p>
        </section>
        
        {/* About Section */}
        
      </main>

      {/* Footer */}
     
      <Footer/>
    </div>
  );
}

export default Home;
