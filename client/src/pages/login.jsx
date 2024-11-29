import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { login, verify } from "../utils/ApiRoutes.js"; // Importing required API routes
import axios from "axios"; // Importing Axios for making API calls

// Login component handles the user authentication process (OTP generation and verification)
const Login = ({ isLogin, setAdmin, setIsLogin }) => {
  // State variables for handling input, loading state, and form errors
  const [email, setEmail] = useState(""); // To store the user's email
  const [password, setPassword] = useState(""); // To store the user's password
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // To track loading state during API requests
  const [message, setMessage] = useState(""); // Displays success or error messages
  const [errors, setErrors] = useState({}); // Stores form validation errors
  const navigate = useNavigate(); // Hook to navigate between routes

  // Function to validate email format and ensure fields are filled
  const validateForm = () => {
    const newErrors = {}; // Object to hold validation errors
    if (!email) newErrors.email = "Email is required"; // Check if email is not empty
    if (email && !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Email format is invalid"; // Basic regex to check email format
    if (!password) newErrors.password = "Password is required"; // Check if password is not empty
    if (password.length < 6)
      newErrors.password = "Password must be atleast 6 characters long"; // Check if password is atleast 6 characters long
    return newErrors; // Return errors object
  };

  // Function to request OTP by making a POST request to the server
  const handleLogin = async (event) => {
    event.preventDefault();
    const formErrors = validateForm(); // Validate the form
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set validation errors if found
      return;
    }
    setErrors({}); // Clear any previous errors
    setLoading(true); // Set loading state
    try {
      const response = await axios.post(
        login,
        { email, password },
        { withCredentials: true }
      ); // Send email to the server to request OTP
      if (response.data.status) {
        setMessage("Login successful!"); // If successful, display message
        await verifyAdmin(); // Verify if the user is an admin
        setIsLogin(true); // Set login state to true
        navigate("/"); // Redirect to the home page after login
      } else {
        setErrors({ general: response.data.msg }); // Handle failure to login
      }
    } catch (error) {
      console.error("Error during login:", error); // Log errors for debugging
      setErrors({ general: "An error occurred. Please try again." }); // General error message
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  // Function to verify if the logged-in user is an admin
  const verifyAdmin = async () => {
    try {
      const response = await axios.get(verify, { withCredentials: true }); // Send request to verify admin status
      if (response.data.success && response.data.decoded.status === "admin") {
        setAdmin(true); // Set admin status if verified
        return;
      }
    } catch (error) {
      console.error("Error during admin verification:", error); // Log error if verification fails
    }
  };

  // Function to handle form submission, either OTP request or login
  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(event); // Call the handleLogin function
  };

  // Redirect to home if the user is already logged in
  useEffect(() => {
    if (isLogin) {
      navigate("/"); // If logged in, redirect to the home page
    }
  }, [isLogin, navigate]);

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

      {/* Title for the Login/SignUp Page */}
      <div className="container mx-auto px-4 mt-8 mb-8">
        <h2
          className="text-4xl font-bold mb-8 text-center text-gray-800"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Login
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
            <div className="mb-6">
              <label
                className="block text-gray-700 text-xl font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className={`w-full p-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <BiHide size={20} className="text-gray-600" />
                  ) : (
                    <BiShow size={20} className="text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Error and Success Messages */}
            {errors.general && (
              <p className="text-red-500 text-sm mb-4">{errors.general}</p>
            )}
            {message && (
              <p className="text-green-500 text-sm mb-4">{message}</p>
            )}

            {/* Submit Button */}

            <button
              type="submit"
              className="w-full bg-blue-900 text-xl text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300"
            >
              Log In
            </button>

            {/*for register link*/}
            <div className="mt-4 text-center">
              <a href="/signup" className="text-blue-900 hover:underline">
                Don't have an account? Register
              </a>
            </div>
            {/*for forget password*/}
            <div className="mt-4 text-center">
              <a
                href="/forgotpassword"
                className="text-blue-900 hover:underline"
              >
                Forget Password
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
