import React, { useState, useEffect } from "react";
import {
  getallNewMemberRoute,
  deleteNewMemberRoute,
} from "../utils/ApiRoutes.js";
import { MdDelete } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../component/loading.jsx";

const NewUserpage = ({ admin }) => {
  const navigate = useNavigate(); // Navigation object to redirect users
  const [newMembers, setNewMembers] = useState([]);
  const [error, setError] = useState(""); // State to store errors
  const [loading, setLoading] = useState(false); // State to store loading status

  // Fetch all members
  const getdata = async () => {
    try {
      setLoading(true);
      const res = await axios.get(getallNewMemberRoute, {
        withCredentials: true,
      });
      setNewMembers(res.data.users);
    } catch (err) {
      console.error("Error fetching new members:", err);
      setError("Failed to fetch new members. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a member
  const deleteMember = async (id) => {
    try {
      await axios.delete(`${deleteNewMemberRoute}/${id}`, {
        withCredentials: true,
      });
      setNewMembers((prevMembers) =>
        prevMembers.filter((member) => member._id !== id)
      );
    } catch (err) {
      console.error("Error deleting member:", err);
      setError("Failed to delete member. Please try again.");
    }
  };

  useEffect(() => {
    if (!admin) {
      navigate("/login"); // Redirect to login page if not an admin
    }
    getdata();
  }, [admin, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-full">
      <div
        className="bg-blue-900 inline-flex items-center p-4 cursor-pointer"
        onClick={() => navigate("/admin")}
      >
        {/* Back Arrow Icon */}
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>
      <h1 className="text-3xl font-bold mb-4 mt-4 text-center justify-center w-full">
        New Members
      </h1>

      {!loading ? (
        <div className="flex-1 px-4 py-6 bg-white shadow-lg rounded-md mx-4">
          {newMembers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Contact
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Address
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {newMembers.map((member) => (
                    <tr key={member._id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">
                        {member.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {member.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {member.contact}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {member.address}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          onClick={() => deleteMember(member._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <MdDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-2xl text-center font-bold text-red-500 mt-6">
              No new user
            </div>
          )}
          {error && (
            <div className="text-2xl text-center font-bold text-red-500 mt-6">
              {error}
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default NewUserpage;
