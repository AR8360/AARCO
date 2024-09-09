import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import AddNews from "../component/addNews";
import AddMembers from "../component/addMembers";
import AddRetirment from "../component/addRetirment";
import AddAdmin from "../component/addAdmin";
import AddCommitteMember from "../component/addCommitte.jsx";
import AddGalary from "../component/addGalary";
import AddPdf from "../component/addPdf.jsx";

const Admin = ({ admin, isLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin || !isLogin) {
      navigate("/");
    }
  }, [admin, isLogin, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Back Button */}
      <div
        className="bg-blue-900 inline-flex items-center p-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Admin Dashboard
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <AddAdmin />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <AddNews />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <AddMembers />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <AddCommitteMember />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <AddRetirment />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <AddGalary />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <AddPdf />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
