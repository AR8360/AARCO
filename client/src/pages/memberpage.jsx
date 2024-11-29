import React, { useEffect, useState } from "react"; // Importing React to define and use components
import { FaArrowLeft } from "react-icons/fa"; // Importing 'FaArrowLeft' icon for back navigation
import { useNavigate } from "react-router-dom"; // Hook to navigate between different routes
import Footer from "../component/footer"; // Importing Footer component
import axios from "axios";
import { allMembers } from "../utils/ApiRoutes.js";
import Loading from "../component/loading.jsx"; // Importing Loading component for better UX

const MemberList = ({ isLogin }) => {
  const navigate = useNavigate();

  const [data, setData] = useState([]); // State for storing member data
  const [loading, setLoading] = useState(true); // State for managing loading state
  const [error, setError] = useState(""); // State for error messages

  const handleBackClick = () => {
    navigate("/"); // Navigate to the homepage
  };

  // Function to fetch member data
  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(allMembers, {
        withCredentials: true,
      });
      setData(response.data.members); // Assuming `members` is returned in the response
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Unable to fetch member data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Back button */}
      <div
        className="bg-blue-900 inline-flex items-center p-4 cursor-pointer"
        onClick={handleBackClick}
      >
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>

      {/* Member list section */}
      <div className="flex-grow container mx-auto p-4">
        {loading ? (
          <Loading /> // Show loading spinner
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white shadow-md rounded-lg">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Employee ID</th>
                  <th className="px-4 py-2">Unit</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Office Intercom</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((member, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-2">{member.name}</td>
                    <td className="px-4 py-2">{member.Employee}</td>
                    <td className="px-4 py-2">{member.Unit}</td>
                    <td className="px-4 py-2">{member.email}</td>
                    <td className="px-4 py-2">{member.OfficeIntercom}</td>
                    <td
                      className={`px-4 py-2 font-semibold ${
                        member.status === "admin"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {member.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer isLogin={isLogin} />
    </div>
  );
};

export default MemberList;
