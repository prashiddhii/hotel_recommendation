import React, { useState } from "react";
import axios from "axios";
import { login } from "../utils/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login/", form);
      login(res.data.token);
      window.location.href = "/";
    } catch (err) {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md cursor-pointer">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="submit"
          className="bg-blue-900 text-white px-4 py-2 rounded w-full hover:bg-blue-800 transition cursor-pointer"
        >
          Login
        </button>

        <div className="text-center pt-4">
          <p className="text-gray-600">
            Not registered yet?{" "}
            <Link to="/register" className="text-blue-900 hover:underline font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
