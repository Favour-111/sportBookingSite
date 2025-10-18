import React, { useState } from "react";
import { FaTelegram } from "react-icons/fa6";
import { IoLockClosed, IoMailOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoMdFingerPrint } from "react-icons/io";

const InputField = ({ label, name, type, value, onChange, icon }) => (
  <div className="w-[100%]">
    <label
      htmlFor={name}
      className="text-sm text-[#787878] dark:text-[#d3d3d3]"
    >
      {label}
    </label>
    <div className="w-[100%] border-[1px] rounded-[10px] dark:bg-transparent dark:border-[#d3d3d365] border-gray-200 mt-1 outline-none focus:border-[var(--Primary)] duration-200 dark:bg-slate-700 dark:text-white flex items-center gap-2 px-3">
      <div className="text-[#787878]">{icon}</div>
      <input
        placeholder={`Enter your ${label}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-[100%] p-2 placeholder:text-[12px] rounded-[10px] border-0 bg-transparent outline-none"
      />
    </div>
  </div>
);

const Login = ({ state }) => {
  const navigate = useNavigate();

  const [type, setType] = useState("login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [resetPass, setResetPass] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

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
  const generateRandomToken = () => {
    return (
      "admin-" +
      Math.random().toString(36).substr(2, 9) + // Generate random string
      "-" +
      Date.now() // Append current timestamp for uniqueness
    );
  };

  const login = async () => {
    if (form.email === "" || form.password === "") {
      toast.error("Both email and password are required.");
    } else if (
      form.email === "admin@gmail.com" &&
      form.password === "Admin100"
    ) {
      const randomToken = generateRandomToken();
      navigate(`/management/${randomToken}`);

      localStorage.setItem("adminToken", randomToken);
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

        if (response) {
          localStorage.setItem("token", response.data.token);
          if (response.data.user && response.data.user._id) {
            localStorage.setItem("userId", response.data.user._id);
          }

          toast.success("Login successful");
          window.location.replace("/");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } catch (error) {
        if (error.response && error.response.data.message) {
          toast.error(error.response.data.message);
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
      toast.error("Input field is required");
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

        if (response) {
          toast.success(response.data.message);
          localStorage.setItem("userId", response.data.newUser._id);
          window.location.replace("/");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } catch (error) {
        if (error.response && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Error registering user. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const resetPassword = async () => {
    if (resetEmail === "") {
      toast.error("Please enter your email to reset the password.");
    } else {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API}/api/auth/forgot-password`,
          {
            email: resetEmail,
          }
        );

        if (response) {
          toast.success("Password reset instructions sent to your email.");
          setResetPass(false); // Hide reset password form after success
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } catch (error) {
        if (error.response && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Error resetting password. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#0000004e] bg-opacity-50 flex items-center justify-center z-50">
        <div className="relative bg-white dark:bg-slate-800 p-6 rounded-[20px] shadow-lg w-[90vw] max-w-md flex flex-col">
          <div className="border-2 border-[#f1f1f1] w-[fit-content] rounded-[11px] p-[1px]">
            <div className="text-3xl bg-[var(--Primary)]  p-1 rounded-[10px] text-white">
              <IoMdFingerPrint />
            </div>
          </div>
          <h1 className="text-2xl text-[var(--Primary)] font-[600]">
            SportsTips
          </h1>
          <p className="text-sm text-[#787878] dark:text-[#d3d3d3] font-[400] mt-2">
            Join the winning team - Get premium betting tips
          </p>
          {/* Button for switching between Login and Sign Up */}
          {!resetPass && (
            <div className="w-full mt-5 rounded-[12px] flex bg-[#f8f7f7] dark:bg-[#202d43cc] gap-4 p-1">
              <button
                onClick={() => {
                  setType("login");
                  resetForm();
                }}
                className={`text-[13px] p-2 rounded-[10px] w-[50%] flex items-center justify-center dark:text-[#d3d3d3] ${
                  type === "login"
                    ? "dark:bg-[var(--default)] bg-[#e6e6e6]"
                    : ""
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setType("signUp");
                  resetForm();
                }}
                className={`text-[13px]  p-2 rounded-[10px] w-[50%] flex items-center justify-center dark:text-[#d3d3d3] ${
                  type === "signUp"
                    ? "dark:bg-[var(--default)] bg-[#e6e6e6]"
                    : ""
                }`}
              >
                Register
              </button>
            </div>
          )}
          {/* Telegram Login Button
          {!resetPass && (
            <div className="w-[100%] mt-3 text-sm">
              <button className="flex justify-center items-center gap-4 w-[100%] mt-1 p-3 rounded-[10px] border-[#d3d3d3] dark:bg-[transparent] dark:text-[#d3d3d3] dark:border dark:border-[white] bg-[#f1f1f1]">
                <div>
                  <FaTelegram />
                </div>
                Login via Telegram
              </button>
            </div>
          )} */}
          {/* Separator */}
          {/* {!resetPass && (
            <div className="text-center mt-2 text-sm uppercase font-[300] dark:text-[#d3d3d3]">
              or
            </div>
          )} */}
          {/* Form Inputs */}
          <div className="flex flex-col gap-3 w-[100%] mt-4">
            {/* Only show these fields when resetPass is false */}
            {!resetPass && type === "signUp" && (
              <InputField
                label="Username"
                name="userName"
                type="text"
                value={form.userName}
                onChange={handleInput}
                icon={<FiUser />}
              />
            )}
            {!resetPass && (
              <InputField
                label="Email"
                name="email"
                type="text"
                value={form.email}
                onChange={handleInput}
                icon={<IoMailOutline />}
              />
            )}
            {!resetPass && (
              <InputField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleInput}
                icon={<IoLockClosed />}
              />
            )}
            {type === "login" && !resetPass && (
              <div>
                <button
                  onClick={() => setResetPass(true)}
                  className="text-blue-600 text-[12px]"
                >
                  Forgot password?
                </button>
              </div>
            )}
          </div>
          {/* Reset Password Form */}
          {resetPass && (
            <div className="flex flex-col gap-3 w-[100%] mt-4">
              <h1 className="text-[16px] font-[600] text-[#2e2d2d] dark:text-[#d3d3d3]">
                Forgot your password?
              </h1>
              <p className="w-[90%] text-sm text-[#787878] dark:text-[#d3d3d3]">
                Enter your email and we'll send you instructions to reset it.
              </p>
              <InputField
                label="Enter your Email"
                name="email"
                type="text"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                icon={<IoMailOutline />}
              />
              <button
                onClick={resetPassword}
                className="p-2 shadow shadow-amber-400 bg-[var(--Primary)] rounded-[10px] text-white w-[100%] mt-5 font-[500] text-sm"
              >
                {loading ? "Sending..." : "Reset Password"}
              </button>
              <button
                onClick={() => setResetPass(false)}
                className="text-blue-600 text-sm mt-3"
              >
                Back to Login
              </button>
            </div>
          )}
          {/* Submit Button */}
          {!resetPass && (
            <button
              onClick={() =>
                !resetPass
                  ? type === "login"
                    ? login()
                    : signUp()
                  : resetPassword()
              }
              class="login"

              // className="p-2 shadow shadow-amber-400 bg-[var(--Primary)] rounded-[10px] text-white w-[100%] mt-5 font-[500] text-sm"
            >
              {loading && (
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1b212f"
                  />
                </svg>
              )}

              <span>
                {loading
                  ? "loading....."
                  : type === "login"
                  ? "Login"
                  : "Sign up"}
              </span>
            </button>
          )}
          {/* Close Buttons */}
          {/* <button
            className="mt-3 text-sm dark:text-[#d3d3d3] text-[#787878]"
            onClick={() => state(false)}
          >
            close
          </button> */}
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
