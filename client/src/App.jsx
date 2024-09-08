import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import MemberList from "./pages/memberpage";
import RetireList from "./pages/retire";
import News from "./pages/news";
import Login from "./pages/login";
import Admin from "./pages/admin";
import Downloads from "./pages/downloads";
import Commitee from "./pages/commitee";
import Gallery from "./pages/gallery";

const App = () => {
  const [isadmin, setadmin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              admin={isadmin}
              isLogin={isLogin}
              setadmin={setadmin}
              setIsLogin={setIsLogin}
            />
          }
        />
        <Route path="/members" element={<MemberList isadmin={isadmin} />} />
        <Route path="/news" element={<News />} />
        <Route path="/retire" element={<RetireList />} />
        <Route
          path="/login"
          element={
            <Login
              admin={isadmin}
              isLogin={isLogin}
              setadmin={setadmin}
              setIsLogin={setIsLogin}
            />
          }
        />
        <Route
          path="/admin"
          element={<Admin admin={isadmin} isLogin={isLogin} />}
        />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/commitee" element={<Commitee />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
};

export default App;
