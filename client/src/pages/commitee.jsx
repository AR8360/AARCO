import React, { useEffect, useState } from "react";
import defaultImg from "../images/default.jpeg"; // Default image for committee members
import { FaArrowLeft } from "react-icons/fa"; // Back icon
import { MdDelete } from "react-icons/md"; // Delete icon
import { getCommitteeRoute, deleteCommitteeRoute } from "../utils/ApiRoutes"; // API routes
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../component/footer";

const CommitteeList = ({ isAdmin, isLogin }) => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(getCommitteeRoute, {
        withCredentials: true,
      });
      if (response.data.status) {
        setMembers(response.data.committee);
      }
    } catch (error) {
      console.error("Error fetching committee members:", error);
      setError("An error occurred while fetching the committee members.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(deleteCommitteeRoute, {
        data: { _id },
        withCredentials: true,
      });
      fetchMembers(); // Refresh members list after deletion
    } catch (error) {
      console.error("Error deleting member:", error);
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
          Our Committee Members
        </h2>
      </div>
      {loading && <div className="text-center text-2xl">Loading...</div>}

      {/* Member Cards */}
      <div
        className={`container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8 text-center ${
          members.length === 0 ? `pb-72` : `pb-14`
        }`}
      >
        {!loading && members.length > 0
          ? members.map((member) => (
              <div
                key={member._id}
                className="bg-white relative rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                {/* Admin Controls */}
                {isAdmin && (
                  <>
                    <div className="absolute top-4 left-4 bg-blue-900 text-white px-2 py-1 rounded-full z-10">
                      {member.order || 10}
                    </div>
                    <MdDelete
                      className="text-red-800 absolute text-xl top-4 right-4 cursor-pointer z-10"
                      onClick={() => handleDelete(member._id)}
                      aria-label="Delete Member"
                    />
                  </>
                )}

                {/* Member Image */}
                <div className="w-full h-60 flex items-center justify-center bg-gray-100 overflow-hidden">
                  <img
                    src={member.image || defaultImg}
                    alt={member.name || "Member Image"}
                    className="w-56 h-56 rounded-lg object-contain"
                  />
                </div>

                {/* Member Details */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                    {member.name}
                  </h3>
                  <h4 className="text-xl text-gray-600 mb-4">{member.email}</h4>
                  {member.contact && (
                    <p className="text-gray-600 mb-2">
                      Contact: {member.contact}
                    </p>
                  )}
                </div>
              </div>
            ))
          : !loading && (
              <div className="text-center text-3xl font-bold text-red-500">
                No members available
              </div>
            )}
      </div>

      {/* Footer */}
      <Footer isLogin={isLogin} />
    </div>
  );
};

export default CommitteeList;
