import React, { useState } from "react";
import { FaTelegram } from "react-icons/fa6";
import { IoLockClosed, IoMailOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
import toast from "react-hot-toast";

const InputField = ({ label, name, type, value, onChange, icon }) => (
  <div className="w-[100%]">
    <label
      htmlFor={name}
      className="text-sm text-[#787878] dark:text-[#d3d3d3]"
    >
      {label}
    </label>
    <div className="w-[100%] border-[1px] rounded dark:bg-transparent dark:border-[#d3d3d365] border-gray-200 mt-1 outline-none focus:border-[var(--Primary)] duration-200 dark:bg-slate-700 dark:text-white flex items-center gap-2 px-3">
      <div>{icon}</div>
      <input
        placeholder={`Enter your ${label}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-[100%] p-2 placeholder:text-sm rounded-[10px] border-0 bg-transparent outline-none"
      />
    </div>
  </div>
);

const Login = ({ state }) => {
  const [type, setType] = useState("login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      userName: "",
      email: "",
      password: "",
    });
  };

  const login = async () => {
    if (form.email === "" || form.password === "") {
      toast.error("Both email and password are required.");
    } else {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API}/api/auth/login`,
          {
            email: form.email,
            password: form.password,
          }
        );

        // Ensure response contains token and other necessary data
        if (response) {
          // Store JWT token in localStorage
          localStorage.setItem("token", response.data.token);

          // If newUser is part of the response, store the user ID as well
          if (response.data.user && response.data.user._id) {
            localStorage.setItem("userId", response.data.user._id);
          }

          toast.success("Login successful");
          console.log(response);
          window.location.replace("/");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } catch (error) {
        // Handle error when invalid credentials are provided
        if (error.response && error.response.data.message) {
          toast.error(error.response.data.message); // Display the error message from backend
        } else {
          toast.error("Error logging in. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const signUp = async () => {
    if (form.userName === "" || form.email === "" || form.password === "") {
      toast.error("input field is required");
    } else {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API}/api/auth/signup`,
          {
            userName: form.userName,
            email: form.email,
            password: form.password,
          }
        );

        // Check if response is successful
        if (response) {
          toast.success(response.data.message);
          localStorage.setItem("userId", response.data.newUser._id);
          console.log(response);
          window.location.replace("/dashboard");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } catch (error) {
        // Check if the error response exists and has a message
        if (error.response && error.response.data.message) {
          toast.error(error.response.data.message); // Show the error message from the backend
        } else {
          toast.error("Error registering user. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#0000004e] bg-opacity-50 flex items-center justify-center z-50">
        <div className="relative bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-[90vw] max-w-md flex items-center flex-col">
          <h1 className="text-2xl text-[var(--Primary)] font-[600]">
            SportsTips
          </h1>
          <p className="text-sm text-[#787878] dark:text-[#d3d3d3] font-[400] mt-2">
            Join the winning team - Get premium betting tips
          </p>

          {/* Button for switching between Login and Sign Up */}
          <div className="w-full mt-5 rounded-[10px] flex bg-[#f8f7f7] dark:bg-[#202d43cc] gap-4 p-1">
            <button
              onClick={() => {
                setType("login");
                resetForm();
              }}
              className={`text-sm p-2 rounded-[10px] w-[50%] flex items-center justify-center dark:text-[#d3d3d3] ${
                type === "login" ? "dark:bg-[var(--default)] bg-[#e6e6e6]" : ""
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setType("signUp");
                resetForm();
              }}
              className={`text-sm p-2 rounded-[10px] w-[50%] flex items-center justify-center dark:text-[#d3d3d3] ${
                type === "signUp" ? "dark:bg-[var(--default)] bg-[#e6e6e6]" : ""
              }`}
            >
              Register
            </button>
          </div>

          {/* Telegram Login Button */}
          <div className="w-[100%] mt-3">
            <button className="flex justify-center items-center gap-4 w-[100%] mt-1 p-3 rounded-[10px] border-[#d3d3d3] dark:bg-[transparent] dark:text-[#d3d3d3] dark:border dark:border-[white] bg-[#f1f1f1]">
              <div>
                <FaTelegram />
              </div>
              Login via Telegram
            </button>
          </div>

          {/* Separator */}
          <div className="text-center mt-2 text-sm uppercase font-[300] dark:text-[#d3d3d3]">
            or
          </div>

          {/* Form Inputs */}
          <div className="flex flex-col gap-3 w-[100%]">
            {type === "signUp" && (
              <InputField
                label="Username"
                name="userName"
                type="text"
                value={form.userName}
                onChange={handleInput}
                icon={<FiUser />}
              />
            )}
            <InputField
              label="Email"
              name="email"
              type="text"
              value={form.email}
              onChange={handleInput}
              icon={<IoMailOutline />}
            />
            <InputField
              label="Password"
              name="password"
              type="password" // Changed to password type
              value={form.password}
              onChange={handleInput}
              icon={<IoLockClosed />}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={() => (type === "login" ? login() : signUp())}
            className="p-2 shadow shadow-amber-400 bg-[var(--Primary)] rounded-[10px] text-white w-[100%] mt-5 font-[500] text-sm"
          >
            {loading ? "loading....." : type === "login" ? "Login" : "Sign up"}
          </button>

          {/* Close Buttons */}
          <button
            className="mt-3 text-sm dark:text-[#d3d3d3] text-[#787878]"
            onClick={() => state(false)}
          >
            close
          </button>
          <button
            className="absolute top-3 right-3 text-[#787878] dark:text-[#d3d3d3]"
            onClick={() => state(false)}
          >
            <MdOutlineClose size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
