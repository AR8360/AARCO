import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { loginorSinupRoute } from "../utils/ApiRoutes";
import { verifyotp } from "../utils/ApiRoutes";
import axios from "axios";
const Login = ({ isLogin, setAdmin, setIsLogin }) => {
  const [isMember, setIsMember] = useState(true);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Renamed for clarity
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (email && !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Email format is invalid";
    return newErrors;
  };

  const handleOtp = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    try {
      const response = await axios.post(loginorSinupRoute, { email });
      if (response.data.status) {
        setIsLoggedIn(true);
        setMessage(response.data.msg);
      } else {
        setErrors({ login: response.data.message });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrors({ general: "An error occurred. Please try again." });
    }
  };

  const handleLogin = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    if (!otp || otp.length < 6) {
      setErrors({ otp: "OTP must be 6 digits long" });
      return;
    }
    try {
      const response = await axios.post(
        verifyotp,
        { email, otp },
        { withCredentials: true }
      );
      console.log(response.data);

      if (response.data.status) {
        setMessage("Login successful!");
        setIsLogin(true);
        navigate("/");
        // navigate("/dashboard"); // Redirect after successful login
      } else {
        setErrors({ otp: response.data.msg || "OTP verification failed" });
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      setErrors({
        general: "An error occurred while verifying OTP. Please try again.",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      handleLogin(event);
    } else {
      handleOtp(event);
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Back Button */}
      <div
        className="bg-blue-900 inline-flex items-center p-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>

      {/* Title */}
      <div className="container mx-auto px-4 mt-8 mb-8">
        <h2
          className="text-4xl font-bold mb-8 text-center text-gray-800"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Login/SignUp
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

            {/* OTP Field */}
            {isLoggedIn && (
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
              {isLoggedIn ? "Login/SignUp" : "Generate OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
