import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import MemberList from './pages/memberpage';
import RetireList from './pages/retire';
import News from './pages/news';
import Login from './pages/login';


const App = () => {
  return (
    <Router>
        
     
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/members" element={<MemberList />} />
        <Route path="/news" element={<News />} />
        <Route path="/retire" element={<RetireList />} />
        <Route path = "/login" element={<Login/>} />

      </Routes>
    </Router>
  );
};

export default App;
