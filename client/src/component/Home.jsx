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
import RetiredCarousel from './retried';

const Home = () => {
  return (
    <div className="font-sans text-gray-900">
      {/* Navbar */}
      <Navbar />
 <Header/>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pt-20"> {/* Add padding-top to account for fixed navbar */}
      <PresidentMessage id="president-message"/>
        <Goals id="goals"/>
        <AboutAARCO id="about-aarco"/>
        <MemberCarousel id="member-carousel"/>
        <NewsUpdates id="news-updates"/>
        <RetiredCarousel id="retired-carousel"/>
        
   
        
        {/* About Section */}
        
      </main>

      {/* Footer */}
     
      <Footer/>
    </div>
  );
}

export default Home;
