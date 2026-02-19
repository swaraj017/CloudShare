import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../API/axios.js";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/auth/register", {
        username,
        email,
        pass,
      });

      setMessage("Registered successfully!");
      setIsError(false);
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-gray-900 shadow-lg rounded-lg p-8 border border-gray-800">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">CloudShare</h1>
          <p className="text-gray-400 mt-1 text-sm">Create a new account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Message */}
          {message && (
            <div
              className={`flex items-center gap-2 text-sm p-2 rounded-md ${
                isError ? "bg-red-800 text-red-300" : "bg-green-900 text-green-300"
              }`}
            >
              <span>{message}</span>
            </div>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          &copy; 2026 CloudShare. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
