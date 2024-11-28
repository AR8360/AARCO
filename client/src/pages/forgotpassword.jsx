import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { generateOtp, newPassword } from "../utils/ApiRoutes.js";
import axios from "axios"; // Importing Axios for making API calls

// Login component handles the user authentication process (OTP generation and verification)
const Forgotpassword = () => {
  // State variables for handling input, loading state, and form errors
  const [email, setEmail] = useState(""); // To store the user's email
  const [password, setPassword] = useState(""); // To store the user's password
  const [confirmPassword, setConfirmPassword] = useState(""); // To store the user's password confirmation
  const [otp, setOtp] = useState(""); // To store the OTP entered by the user
  const [forgotPass, setForgotPass] = useState(false);
  const [message, setMessage] = useState(""); // Displays success or error messages
  const [errors, setErrors] = useState({}); // Stores form validation errors
  const navigate = useNavigate(); // Hook to navigate between routes

  // Function to validate email format and ensure fields are filled
  const validateForm = () => {
    setErrors({}); // Clear any previous errors
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email format is invalid";
    }
    if (forgotPass) {
      if (!password) newErrors.password = "Password is required";
      if (password.length < 6)
        newErrors.password = "Password must be at least 6 characters long";
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    return newErrors;
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(newPassword, { email, password, otp });
      console.log(response);

      if (response.data.status) {
        setMessage("Password reset successful!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setErrors({ otp: "Invalid OTP. Please try again." });
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: "Error verifying OTP." });
    }
  };
  const handleOtp = async () => {
    try {
      const res = await axios.post(generateOtp, { email });
      console.log(res.data);

      if (res.data.status) {
        setForgotPass(true);
        setMessage(res.data.msg);
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrors({ general: "An error occurred. Please try again." });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    console.log(forgotPass);

    if (forgotPass) {
      if (otp) {
        handleVerifyOtp();
      }
    } else {
      handleOtp();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Back Button to go back to the previous page */}
      <div
        className="bg-blue-900 inline-flex items-center p-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>

      {/* Title for the SignUp Page */}
      <div className="container mx-auto px-4 mt-8 mb-8">
        <h2
          className="text-4xl font-bold mb-8 text-center text-gray-800"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Generate new Password
        </h2>
      </div>

      {/* Login Form */}
      <div className="container mx-auto px-4 flex justify-center items-center flex-grow">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit}>
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
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* OTP Field, shown only after email is verified */}
            {forgotPass && (
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="otp"
                >
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter your OTP"
                  className={`w-full p-3 border ${
                    errors.otp ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                )}
              </div>
            )}

            {forgotPass && (
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  placeholder="Enter your password"
                  className={`w-full p-3 border ${
                    errors.otp ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            )}
            {forgotPass && (
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="confirmpassword"
                >
                  Confirm Password
                </label>
                <input
                  type="text"
                  id="confirm-password"
                  placeholder="Enter your password"
                  className={`w-full p-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                  value={confirmPassword} // Corrected here
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            )}

            {/* Error and Success Messages */}
            {errors.general && (
              <p className="text-red-500 text-sm mb-4">{errors.general}</p>
            )}
            {message && (
              <p className="text-green-500 text-sm mb-4">{message}</p>
            )}

            {/* Submit Button */}
            {true ? (
              <button
                type="submit"
                className="w-full bg-blue-900 text-xl text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300"
              >
                {forgotPass ? "Register" : "Generate OTP"}
              </button>
            ) : (
              <button
                className="w-full bg-slate-500 text-xl text-white py-3 rounded-lg"
                disabled
              >
                Generating OTP...
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
