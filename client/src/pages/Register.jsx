import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading
    try {
      const res = await axios.post(
        "http://localhost:3000/api/register",
        formData
      );

      if (res.data.success) {
        alert(res.data.message || "User Registered Successfully!");
        navigate('/login')
        setFormData({ username: "", email: "", password: "" });
       
      } else {
        alert(res.data.message || "User Registration Failed!");
      }
    } catch (error) {
      console.log("error", error);
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false); // stop loading after request finishes
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none "
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          value={formData.email}
          className="border p-3 rounded-lg focus:outline-none "
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          value={formData.password}
          className="border p-3 rounded-lg focus:outline-none "
          onChange={handleChange}
          id="password"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg font-semibold uppercase hover:opacity-95 disabled:opacity-80 flex justify-center items-center"
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/login"}>
          <span className="text-blue-700">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
