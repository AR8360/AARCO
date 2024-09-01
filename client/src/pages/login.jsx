import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Login= () => {
  const [isMember, setIsMember] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    // Additional email format validation
    if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email format is invalid';
    return newErrors;
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    // Mock login logic
    if (email === 'admin@example.com' && password === 'admin123' && !isMember) {
      navigate('/admin-dashboard'); // Replace with your admin dashboard route
    } else if (email === 'member@example.com' && password === 'member123' && isMember) {
      navigate('/member-dashboard'); // Replace with your member dashboard route
    } else {
      setErrors({ ...errors, login: 'Invalid email or password' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Back Button */}
      <div className="bg-blue-900 inline-flex items-center p-4 cursor-pointer" onClick={() => navigate('/')}>
        <FaArrowLeft className="text-white text-2xl" />
        <span className="ml-2 text-white text-lg hover:underline">Back</span>
      </div>

      {/* Title */}
      <div className="container mx-auto px-4 mt-8 mb-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
          Login
        </h2>
      </div>

      {/* Login Form */}
      <div className="container mx-auto px-4 flex justify-center items-center flex-grow">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Role Selection */}
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="role"
                checked={isMember}
                onChange={() => setIsMember(!isMember)}
                className="mr-2"
              />
              <label htmlFor="role" className="text-gray-700 text-sm font-bold">
                {isMember ? 'Member' : 'Admin'}
              </label>
            </div>

            {/* Error Message */}
            {errors.login && <p className="text-red-500 text-sm mb-4">{errors.login}</p>}

            <button
              type="submit"
              className="w-full bg-blue-900 text-xl text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
