import React, { useEffect, useState } from "react";
import defaultImg from "../images/default.jpeg"; // Update the path as needed
import { FaArrowLeft } from "react-icons/fa"; // Ensure you have this import
import { MdDelete } from "react-icons/md";
import { getMembersRoute, deleteMemberRoute } from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../component/footer";

const MemberList = ({ isadmin }) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/");
  };
  const [members1, setMembers] = useState([]);
  const getMembers = async () => {
    try {
      const response = await axios.get(getMembersRoute);
      setMembers(response.data.members);
    } catch (error) {
      console.error(error);
    }
  };
  const handledelete = async (_id) => {
    try {
      const response = await axios.delete(deleteMemberRoute, {
        data: { _id },
        withCredentials: true,
      });
      console.log(response.data);
      getMembers();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

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
          Our Members
        </h2>
      </div>

      {/* Member Cards */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 text-center">
        {members1.length > 0 ? (
          members1.map((member1) => (
            <div
              key={member1._id}
              className="bg-white relative rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              {isadmin && (
                <div className="absolute top-4 left-4 bg-blue-900 text-white px-2 py-1 rounded-full">
                  {member1.order || 10}
                </div>
              )}
              {isadmin && (
                <MdDelete
                  className="text-red-800 absolute text-xl top-4 right-4 cursor-pointer"
                  onClick={() => handledelete(member1._id)}
                />
              )}
              <div className="w-full h-48 overflow-hidden flex items-center justify-center">
                <img
                  src={member1.image || defaultImg}
                  alt={member1.name}
                  className="w-40 h-40 rounded-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                  {member1.name}
                </h3>
                <h4 className="text-xl text-gray-600 mb-4">{member1.email}</h4>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-3xl font-bold text-red-500">
            No members available
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MemberList;
