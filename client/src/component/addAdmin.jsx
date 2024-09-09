import React, { useState } from "react";
import { setAdmin } from "../utils/ApiRoutes";
import axios from "axios";
const AddAdmin = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (email === "") {
      setError("Email is required");
      return;
    }
    const data = {
      email,
    };
    try {
      const res = await axios.post(setAdmin, data, { withCredentials: true });
      console.log(res.data);
      if (res.data.status === false) {
        setError(res.data.msg);
      } else {
        setEmail("");
        setError("");
        setMessage("Member status changed to admin successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
     
      
          <div className="mb-4">
            <h1 className="text-center font-bold text-2xl">Add Admin</h1>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />
          </div>
          {error && <p className="text-red-500 text-xl italic">{error}</p>}
          {message && (
            <p className="text-green-500 text-xl italic">{message}</p>
          )}
          <div className="mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                handleSubmit();
              }}
            >
              Add Admin
            </button>
          </div>
    
     
    </div>
  );
};

export default AddAdmin;
