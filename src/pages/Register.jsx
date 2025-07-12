import React, { useState } from "react";
import axios from "axios";
import { login } from "../utils/auth"; // your login util to save tokens
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:8000/api/register/", form);

      // If backend returns token after registration, store it
      if (res.data.access) {
        // Assuming backend returns JWT tokens after registration
        login(res.data.access, res.data.refresh);
        navigate("/"); // Redirect to home after login
      } else {
        setSuccess("Registration successful! Please login.");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;

        // If backend returns an object with field errors like { username: [...], email: [...] }
        if (typeof data === "object") {
          // Extract first error message from the first field
          const firstKey = Object.keys(data)[0];
          const firstErrorMsg = Array.isArray(data[firstKey])
            ? data[firstKey][0]
            : data[firstKey];
          setError(firstErrorMsg || "Registration failed.");
        } else if (typeof data === "string") {
          // If backend sends a string error message
          setError(data);
        } else {
          setError("Registration failed.");
        }
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Register</h2>

        {error && <p className="text-red-600 mb-3">{error}</p>}
        {success && <p className="text-green-600 mb-3">{success}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition cursor-pointer"
        >
          Register
        </button>

        <p className="text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-900 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
