import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { addNewMemberRoute } from "../utils/ApiRoutes.js";
import axios from "axios";
const Newuser = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [error, setErrors] = React.useState("");

  // Function to validate email format and ensure fields are filled
  const validateForm = () => {
    const newErrors = {}; // Object to hold validation errors
    if (!email) newErrors.email = "Email is required"; // Check if email is not empty
    if (email && !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Email format is invalid"; // Basic regex to check email format
    if (!name) newErrors.name = "Name is required";
    if (!contact) newErrors.contact = "Contact is required";
    if (!address) newErrors.address = "Address is required";
    return newErrors; // Return errors object
  };

  // Function to request OTP by making a POST request to the server
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm(); // Validate the form
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set validation errors if found
      return;
    }
    setErrors({}); // Clear any previous errors
    try {
      const response = await axios.post(addNewMemberRoute, {
        name,
        email,
        contact,
        address,
      }); // Send email to the server to request OTP
      if (response.data.status) {
        setMessage("Login successful!"); // If successful, display message
        navigate("/"); // Redirect to the home page after login
      } else {
        setErrors({ general: response.data.msg }); // Handle failure to login
      }
    } catch (error) {
      console.error("Error during login:", error); // Log errors for debugging
      setErrors({ general: "An error occurred. Please try again." }); // General error message
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div
        className="bg-blue-900 inline-flex items-center p-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        {/* Back Arrow Icon */}
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>

      <div className="container mx-auto px-4 mt-8 mb-8">
        <h2
          className="text-4xl font-bold mb-8 text-center text-gray-800"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          New Member
        </h2>
      </div>

      {/* Login Form */}
      <div className="container mx-auto px-4 flex justify-center items-center flex-grow">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-xl font-bold mb-2"
                htmlFor="name"
              >
                name
              </label>
              <input
                type="name"
                id="name"
                placeholder="Enter your name"
                className={`w-full p-3 border ${
                  error.name ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {error.name && (
                <p className="text-red-500 text-sm mt-1">{error.name}</p>
              )}
            </div>
            {/* Email Field */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-xl font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`w-full p-3 border ${
                  error.email ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error.email && (
                <p className="text-red-500 text-sm mt-1">{error.email}</p>
              )}
            </div>
            {/* Email Field */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-xl font-bold mb-2"
                htmlFor="contact"
              >
                Contact
              </label>
              <input
                type="contact"
                id="contact"
                placeholder="Enter your contact"
                className={`w-full p-3 border ${
                  error.contact ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              {error.contact && (
                <p className="text-red-500 text-sm mt-1">{error.contact}</p>
              )}
            </div>

            {/* Address Field */}
            {/* Email Field */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-xl font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                type="address"
                id="address"
                placeholder="Enter your address"
                className={`w-full p-3 border ${
                  error.address ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {error.address && (
                <p className="text-red-500 text-sm mt-1">{error.address}</p>
              )}
            </div>

            {/* Error and Success Messages */}
            {error.general && (
              <p className="text-red-500 text-sm mb-4">{error.general}</p>
            )}
            {message && (
              <p className="text-green-500 text-sm mb-4">{message}</p>
            )}

            {/* Submit Button */}

            <button
              type="submit"
              className="w-full bg-blue-900 text-xl text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300"
            >
              Click here
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newuser;
