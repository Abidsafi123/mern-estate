 import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStart,loginSuccess,loginFailure } from "../redux/user/User.js";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Oauth from "../components/Oauth.jsx";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const{loading,error,user} = useSelector((state)=>state.user)

  // ✅ Yup Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email credentials")
      .required("Email is required!"),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters long")
      .matches(/[a-z]/, "Password should contain small letters")
      .matches(/[A-Z]/, "Password should contain capital letters")
      .matches(/[0-9]/, "Password should contain numbers")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password should contain special characters")
      .required("Password is required!"),
  });

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
   onSubmit: async (values, { setSubmitting, resetForm }) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3000/api/login", values);

    if (res.data.success) {
      dispatch(loginSuccess(res.data.user));
      console.log("token", res.data.token);
      resetForm();
      navigate("/");
    } else {
      dispatch(loginFailure(res.data.message || "User Login Failed!"));
    }
  } catch (error) {
    console.log("error", error);
    dispatch(loginFailure(error.response?.data?.message || "Login Failed"));
  } finally {
    setSubmitting(false);
  }
},

  });

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        {/* Email Input */}
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border p-3 rounded-lg focus:outline-none"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
        )}

        {/* Password Input */}
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border p-3 rounded-lg focus:outline-none"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-slate-700 text-white p-3 rounded-lg font-semibold uppercase hover:opacity-95 disabled:opacity-80 flex justify-center items-center"
        >
          {formik.isSubmitting ? "Logging..." : "Login"}
        </button>
        <Oauth/>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Don’t have an account?</p>
        <Link to={"/register"}>
          <span className="text-blue-700">Register</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
