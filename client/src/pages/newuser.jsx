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

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (email && !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Email format is invalid";
    if (!name) newErrors.name = "Name is required";
    if (!contact) newErrors.contact = "Contact is required";
    if (!address) newErrors.address = "Address is required";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    try {
      const response = await axios.post(addNewMemberRoute, {
        name,
        email,
        contact,
        address,
      });
      if (response.data.status) {
        setMessage("Login successful!");
        navigate("/");
      } else {
        setErrors({ general: response.data.msg });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrors({ general: "An error occurred. Please try again." });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div
        className="bg-blue-900 inline-flex items-center justify-between p-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="flex items-center">
          <FaArrowLeft className="text-white text-xl sm:text-2xl" />
          <span className="ml-2 text-white text-base sm:text-lg hover:underline">Back</span>
        </div>
        
        {/* Toggle View Button for Small Screens */}
        <button 
          className="md:hidden text-white"
          onClick={(e) => {
            e.stopPropagation();
            setIsCompactView(!isCompactView);
          }}
        >
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Title */}
      <div className="container mx-auto px-4 mt-6 sm:mt-8 mb-6 sm:mb-8">
        <h2
          className="text-3xl sm:text-4xl font-bold text-center text-gray-800"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          New Member
        </h2>
      </div>

      {/* Form Container */}
      <div className="container mx-auto px-4 flex justify-center items-center flex-grow">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 sm:p-8">
          <form onSubmit={handleSubmit}>
            <div className={`
              grid 
              ${isCompactView ? 'grid-cols-1' : 'grid-cols-2'}
              md:grid-cols-2 
              gap-4 sm:gap-6
            `}>
              {/* Name Field */}
              <div className="col-span-2 md:col-span-1">
                <label
                  className="block text-gray-700 text-base sm:text-lg font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className={`w-full p-2 sm:p-3 border ${
                    error.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg text-sm sm:text-base`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {error.name && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{error.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="col-span-2 md:col-span-1">
                <label
                  className="block text-gray-700 text-base sm:text-lg font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className={`w-full p-2 sm:p-3 border ${
                    error.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg text-sm sm:text-base`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{error.email}</p>
                )}
              </div>

              {/* Contact Field */}
              <div className="col-span-2 md:col-span-1">
                <label
                  className="block text-gray-700 text-base sm:text-lg font-bold mb-2"
                  htmlFor="contact"
                >
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  placeholder="Enter your contact"
                  className={`w-full p-2 sm:p-3 border ${
                    error.contact ? "border-red-500" : "border-gray-300"
                  } rounded-lg text-sm sm:text-base`}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                {error.contact && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{error.contact}</p>
                )}
              </div>

              {/* Address Field */}
              <div className="col-span-2 md:col-span-1">
                <label
                  className="block text-gray-700 text-base sm:text-lg font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Enter your address"
                  className={`w-full p-2 sm:p-3 border ${
                    error.address ? "border-red-500" : "border-gray-300"
                  } rounded-lg text-sm sm:text-base`}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {error.address && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{error.address}</p>
                )}
              </div>

              {/* General Errors and Messages */}
              <div className="col-span-2">
                {error.general && (
                  <p className="text-red-500 text-xs sm:text-sm">{error.general}</p>
                )}
                {message && (
                  <p className="text-green-500 text-xs sm:text-sm">{message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-900 text-base sm:text-xl text-white py-2 sm:py-3 rounded-lg hover:bg-blue-800 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default Newuser;
