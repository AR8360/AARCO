import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import MemberList from "./pages/memberpage";
import RetireList from "./pages/retire";
import News from "./pages/news";
import Login from "./pages/login";
import Admin from "./pages/admin";
import Downloads from "./pages/downloads";
import CommitteeList from "./pages/commitee";
import Gallery from "./pages/gallery";
import { verify } from "./utils/ApiRoutes.js";
import axios from "axios";

const App = () => {
  const [isadmin, setadmin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleadminvrification = async () => {
    try {
      const response = await axios.get(verify, { withCredentials: true });

      if (response.data.success) {
        if (response.data.decoded.status === "admin") {
          setadmin(true);
        }
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Error during admin verification:", error);
    }
  };
  useEffect(() => {
    handleadminvrification();
  }, []);
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
        <Route path="/news" element={<News isadmin={isadmin} />} />
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
        <Route path="/downloads" element={<Downloads isadmin={isadmin} />} />
        <Route
          path="/committee"
          element={<CommitteeList isAdmin={isadmin} />}
        />
        <Route path="/gallery" element={<Gallery isadmin={isadmin} />} />
      </Routes>
    </Router>
  );
};

export default App;
