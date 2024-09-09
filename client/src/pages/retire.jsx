import React, { useEffect, useState } from "react";
import defaultImg from "../images/default.jpeg"; // Default image in case of missing image
import { FaArrowLeft } from "react-icons/fa"; // Back icon
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Footer from "../component/footer";
import { getRetrimentRoute, deleteRetrimentRoute } from "../utils/ApiRoutes"; // Ensure correct path

const RetireList = ({ isadmin }) => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");

  const fetchMembers = async () => {
    try {
      const response = await axios.get(getRetrimentRoute, {
        withCredentials: true,
      });
      if (response.data.status) {
        setMembers(response.data.retirments);
      } else {
        setError("No members found.");
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      setError("An error occurred while fetching members.");
    }
  };

  const handledelete = async (_id) => {
    try {
      const response = await axios.delete(deleteRetrimentRoute, {
        data: { _id },
        withCredentials: true,
      });
      fetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
      setError("An error occurred while deleting member.");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleBackClick = () => {
    navigate("/");
  };

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10 text-2xl">{error}</div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Back Icon */}
      <div
        className="bg-blue-900 inline-flex items-center p-4 cursor-pointer"
        onClick={handleBackClick}
      >
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>

      {/* Title */}
      <div className="container mx-auto px-4 mt-8 mb-8">
        <h2
          className="text-5xl font-bold text-center text-blue-900"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Retired Members
        </h2>
      </div>

      {/* Member List */}
      <div className="container mx-auto px-4 mb-8">
        {members.length > 0 ? (
          members.map((member) => (
            <div
              key={member._id}
              className="bg-white relative   rounded-lg shadow-lg overflow-hidden mb-8 flex flex-col md:flex-row p-6 transition-transform duration-300 hover:scale-105"
            >
              {isadmin && (
                <div className="absolute top-4 right-14 bg-blue-900 text-white px-2 py-1 rounded-full">
                  order : {member.order || 10}
                </div>
              )}
              {isadmin && (
                <MdDelete
                  className="text-red-800 absolute text-xl top-5 right-4 cursor-pointer w-5 h-5"
                  onClick={() => handledelete(member._id)}
                />
              )}
              {/* Image Section */}
              <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-center items-center">
                <img
                  src={member.image || defaultImg}
                  alt={member.name}
                  className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-cover rounded-lg border-4 border-blue-400 shadow-md"
                />
              </div>
              {/* Content Section */}
              <div className="w-full md:w-2/3 flex flex-col justify-center md:pl-6">
                <h3 className="text-4xl font-semibold  text-gray-800 text-center md:text-left">
                  {member.name}
                </h3>
                <h3 className="text-lg  text-gray-800 text-center md:text-left">
                  mail : {member.email}
                </h3>
                <h3 className="text-lg mb-2 text-gray-800 text-center md:text-left">
                  Contact : {member.contact}
                </h3>
                {member.content && (
                  <div className="flex items-center justify-between">
                    <h4 className="text-2xl font-semibold text-blue-600 mb-2">
                      words of wisdom
                    </h4>
                  </div>
                )}
                <p className="text-lg text-gray-600 leading-relaxed">
                  {member.content}
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  <span className="font-semibold">Active From:</span>{" "}
                  {member.date}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-3xl font-bold text-red-500">
            No retired members available
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RetireList;
