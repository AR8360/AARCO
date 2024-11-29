import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { MdDelete, MdCheckCircle } from "react-icons/md";
import {
  getallUnregisterUser,
  deleteUnregisterUser,
  approverMember,
} from "../utils/ApiRoutes";
import Loading from "../component/loading";

const UnregisterMemberPage = ({ admin }) => {
  const navigate = useNavigate();
  const [unregisterMembers, setUnregisterMembers] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]); // To store selected users for approval
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all unregistered members
  const fetchUnregisterMembers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(getallUnregisterUser, {
        withCredentials: true,
      });
      setUnregisterMembers(response.data.unregister);
    } catch (err) {
      console.error("Error fetching unregistered users:", err);
      setError(
        "Failed to fetch unregistered members. Please try again later or try relogin."
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete a user by email
  const deleteMember = async (email) => {
    try {
      await axios.delete(`${deleteUnregisterUser}?email=${email}`, {
        withCredentials: true,
      });
      setUnregisterMembers((prev) =>
        prev.filter((member) => member.email !== email)
      );
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete the user. Please try again.");
    }
  };

  // Approve selected users
  const approveMembers = async () => {
    try {
      await axios.post(
        approverMember,
        { emails: selectedEmails },
        { withCredentials: true }
      );
      setUnregisterMembers((prev) =>
        prev.filter((member) => !selectedEmails.includes(member.email))
      );
      setSelectedEmails([]); // Clear selection
    } catch (err) {
      console.error("Error approving users:", err);
      setError("Failed to approve users. Please try again.");
    }
  };

  // Handle checkbox selection
  const toggleSelection = (email) => {
    setSelectedEmails((prev) =>
      prev.includes(email)
        ? prev.filter((selected) => selected !== email)
        : [...prev, email]
    );
  };

  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
    fetchUnregisterMembers();
  }, [admin, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-full">
      <div
        className="bg-blue-900 inline-flex items-center p-4 cursor-pointer"
        onClick={() => navigate("/admin")}
      >
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>
      <h1 className="text-3xl font-bold mb-4 mt-4 text-center">
        Unregistered Members
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {loading ? (
        <Loading />
      ) : unregisterMembers.length > 0 ? (
        <div className="flex-1 px-4 py-6 bg-white shadow-lg rounded-md mx-4">
          {/* Table rendering logic remains the same */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Select</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Employee</th>
                  <th className="border border-gray-300 px-4 py-2">Unit</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {unregisterMembers.map((member) => (
                  <tr key={member.email} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedEmails.includes(member.email)}
                        onChange={() => toggleSelection(member.email)}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {member.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {member.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {member.Employee}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {member.Unit}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => deleteMember(member.email)}
                        className="text-red-500 hover:text-red-700 mx-2"
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={approveMembers}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={selectedEmails.length === 0}
            >
              Approve Selected <MdCheckCircle className="inline ml-1" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-2xl text-center font-bold text-red-500 mt-6">
          No unregistered members
        </div>
      )}
    </div>
  );
};

export default UnregisterMemberPage;
