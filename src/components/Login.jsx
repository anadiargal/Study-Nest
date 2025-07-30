// src/components/Login.jsx
import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="bg-gray-900 text-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-purple-400 text-center mb-6">
          Welcome Back to StudyNest
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between text-sm text-gray-400">
            <a href="#" className="hover:text-purple-300">Forgot password?</a>
            <a href="#" className="hover:text-purple-300">Sign up</a>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
