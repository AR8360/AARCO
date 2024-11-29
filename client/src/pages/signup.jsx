import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import { register, verifyUnregisterEmail } from "../utils/ApiRoutes.js";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [employee, setEmployee] = useState("");
  const [unit, setUnit] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [officeIntercom, setOfficeIntercom] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [verifyotp, setVerifyOtp] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {}; // Object to hold validation errors
    setErrors({}); // Clear any previous errors
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (email && !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Email format is invalid";
    if (!password) newErrors.password = "Password is required";
    if (password.length < 6)
      newErrors.password = "Password must be atleast 6 characters long";
    if (!employee) newErrors.employee = "Employee ID is required";
    if (!unit) newErrors.unit = "Unit is required";
    if (!officeIntercom)
      newErrors.officeIntercom = "Office Intercom is required";
    return newErrors; // Return errors object
  };
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set validation errors if found
      return;
    }
    setErrors({}); // Clear any previous errors
    // If no errors, make the API request for registration
    try {
      const response = await axios.post(
        register,
        {
          name,
          Employee: employee,
          Unit: unit,
          email,
          password,
          OfficeIntercom: officeIntercom,
          otp,
        },
        { withCredentials: true }
      );
      if (response.data.status) {
        setVerifyOtp(true);
        setMessage(response.data.msg);

        return;
      }
      setErrors({ general: response.data.msg });
    } catch (error) {
      setErrors({ general: "An error occurred. Please try again." });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div
        className="bg-blue-900 inline-flex items-center p-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>
      <div className="container mx-auto px-4 mt-8 mb-8">
        <h2
          className="text-4xl font-bold mb-8 text-center text-gray-80"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Register
        </h2>
        <div className="container mx-auto px-4 flex justify-center items-center flex-grow">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className={`w-full p-3 border border-gray-300 rounded-lg`}
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Employee */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="employee"
                >
                  Employee ID
                </label>
                <input
                  type="text"
                  id="employee"
                  className={`w-full p-3 border border-gray-300 rounded-lg`}
                  placeholder="Enter your employee ID"
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                />
                {errors.employee && (
                  <p className="text-red-500 text-sm mt-1">{errors.employee}</p>
                )}
              </div>

              {/* Unit */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="unit"
                >
                  Unit
                </label>
                <input
                  type="text"
                  id="unit"
                  className={`w-full p-3 border border-gray-300 rounded-lg`}
                  placeholder="Enter your unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                />
                {errors.unit && (
                  <p className="text-red-500 text-sm mt-1">{errors.unit}</p>
                )}
              </div>

              {/* Email */}
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
                  className={`w-full p-3 border border-gray-300 rounded-lg`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
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
                    placeholder="Create your password"
                    className={`w-full p-3 border border-gray-300 rounded-lg`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handlePasswordToggle}
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

              {/* Office Intercom */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="officeIntercom"
                >
                  Office Intercom
                </label>
                <input
                  type="text"
                  id="officeIntercom"
                  className={`w-full p-3 border border-gray-300 rounded-lg`}
                  placeholder="Enter your office intercom number"
                  value={officeIntercom}
                  onChange={(e) => setOfficeIntercom(e.target.value)}
                />
                {errors.officeIntercom && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.officeIntercom}
                  </p>
                )}
              </div>
              {verifyotp && (
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-xl font-bold mb-2"
                    htmlFor="otp"
                  >
                    OTP
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="otp"
                      placeholder="Enter OTP"
                      className={`w-full p-3 border border-gray-300 rounded-lg`}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  {errors.otp && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
              )}
              {errors.general && (
                <p className="text-red-500 text-sm mb-4">{errors.general}</p>
              )}
              {message && (
                <p className="text-green-500 text-sm mb-4">{message}</p>
              )}

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                >
                  {verifyotp ? "Verify Email" : "Register"}
                </button>
              </div>
              <div className="mt-4 text-center">
                <a href="/login" className="text-blue-900 hover:underline">
                  Already have an account? Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
