import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import MemberList from "./pages/memberpage";
import RetireList from "./pages/retire";
import News from "./pages/news";
import Login from "./pages/login";
import Admin from "./pages/admin";
import Downloads from "./pages/downloads";
import Commitee from "./pages/commitee";
import Gallery   from "./pages/gallery"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<MemberList />} />
        <Route path="/news" element={<News />} />
        <Route path="/retire" element={<RetireList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/commitee" element={<Commitee />} />
        <Route path="/gallery" element={<Gallery />} />

      </Routes>
    </Router>
  );
};

export default App;
