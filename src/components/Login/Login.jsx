import React, { useState } from "react";
import { FaTelegram } from "react-icons/fa6";
import {
  IoLockClosed,
  IoMailOutline,
  IoMailUnreadOutline,
} from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
// import jwtDecode from "jwt-decode";
import { MdOutlineClose } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoMdFingerPrint } from "react-icons/io";
import { CiLock } from "react-icons/ci";

const InputField = ({ label, name, type, value, onChange, icon }) => (
  <div className="w-[100%]">
    <div className="w-[100%] bg-[#f6f5f8] py-2 rounded-[15px] dark:bg-[var(--default)]  border-gray-200 mt-1 outline-none  duration-200  dark:text-white flex items-center gap-2 px-3">
      <div className="text-[#787878]">{icon}</div>
      <input
        placeholder={`Enter your ${label}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-[100%] p-2 dark:bg placeholder:text-[12px] rounded-[10px] border-0 outline-none"
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

  const loginBtn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Decode JWT to get user info
        const decoded = jwtDecode(tokenResponse.credential);
        console.log("Google user:", decoded);

        // Optionally send token to backend
        const res = await axios.post("http://localhost:5000/api/auth/google", {
          token: tokenResponse.credential,
        });

        toast.success("Login successful!");
        localStorage.setItem("token", res.data.token);
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    onError: () => toast.error("Login failed"),
  });

  return (
    <div>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-[#0000004e] bg-opacity-50 flex items-center justify-center z-50"
        dir="rtl"
      >
        <div className="relative bg-white dark:bg-slate-800 px-6 sm:px-8 py-7 rounded-[20px] shadow-lg w-[90vw] max-w-md flex flex-col">
          {!resetPass && (
            <>
              {(type === "login" || type === "signUp") && (
                <h1 className="flex dark:text-[#d3d3d3] items-center gap-2 text-[20px] sm:text-2xl text-[var(--default)] font-[700]">
                  ברוכים הבאים ל-Sports Tips
                  <div>
                    <img
                      src="https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/512/Waving-Hand-3d-Default-icon.png"
                      alt=""
                      width={40}
                    />
                  </div>
                </h1>
              )}
              <p className="text-[13px] text-[#939393] dark:text-[#d3d3d3] font-[300] mt-1">
                הצטרפו לקבוצה המנצחת וקבלו טיפים מקצועיים להימורים
              </p>
            </>
          )}

          {!resetPass && (
            <>
              <div className="grid gap-3 mt-3 grid-cols-2">
                <button
                  onClick={() => loginBtn()}
                  className="dark:bg-[var(--default)] dark:hover-opacity-70 dark:hover:bg-[var(--default)] hover:bg-[#f1f1f1] duration-200 bg-[#f6f6f6] rounded-[15px] py-5 flex items-center justify-center"
                >
                  <img
                    src="https://png.pngtree.com/png-vector/20230817/ourmid/pngtree-google-internet-icon-vector-png-image_9183287.png"
                    width={25}
                    alt="Google"
                  />
                </button>
                <button
                  onClick={() => toast.error("האפשרות הזו אינה זמינה כרגע")}
                  className="dark:bg-[var(--default)] dark:hover-opacity-70 dark:hover:bg-[var(--default)] hover:bg-[#f1f1f1] duration-200 bg-[#f6f6f6] rounded-[15px] py-5 flex items-center justify-center"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png"
                    width={25}
                    alt=""
                  />
                </button>
              </div>
              <div className="my-3 text-[#d3d3d3] text-sm text-center">או</div>
            </>
          )}

          <div className="flex flex-col gap-3 w-[100%]">
            {!resetPass && type === "signUp" && (
              <InputField
                label="שם משתמש"
                name="userName"
                type="text"
                value={form.userName}
                onChange={handleInput}
                icon={<FiUser />}
              />
            )}
            {!resetPass && (
              <InputField
                label="אימייל"
                name="email"
                type="text"
                value={form.email}
                onChange={handleInput}
                icon={<IoMailUnreadOutline />}
              />
            )}
            {!resetPass && (
              <InputField
                label="סיסמה"
                name="password"
                type="password"
                value={form.password}
                onChange={handleInput}
                icon={<CiLock />}
              />
            )}
            {type === "login" && !resetPass && (
              <div>
                <button
                  onClick={() => setResetPass(true)}
                  className="text-blue-600 text-[12px]"
                >
                  שכחת סיסמה?
                </button>
              </div>
            )}
          </div>

          {resetPass && (
            <div className="flex flex-col gap-3 w-[100%]">
              <div className="border-2 border-[#f1f1f1] w-[fit-content] rounded-[11px] p-[1px]">
                <div className="text-3xl bg-[var(--Primary)] p-1 rounded-[10px] text-white">
                  <IoMdFingerPrint />
                </div>
              </div>
              <h1 className="text-2xl font-[700] text-[#2e2d2d] dark:text-[#d3d3d3]">
                שכחת את הסיסמה שלך?
              </h1>
              <p className="w-[90%] text-sm text-[#787878] dark:text-[#d3d3d3]">
                הזן את כתובת האימייל שלך ואנו נשלח הוראות לאיפוס הסיסמה.
              </p>
              <InputField
                label="הכנס את כתובת האימייל שלך"
                name="email"
                type="text"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                icon={<IoMailOutline />}
              />
              <button
                onClick={resetPassword}
                className="p-3 shadow shadow-amber-400 bg-[var(--Primary)] rounded-[10px] text-white w-[100%] mt-5 font-[500] text-sm"
              >
                {loading ? "שולח..." : "אפס סיסמה"}
              </button>
              <button
                onClick={() => setResetPass(false)}
                className="text-blue-600 text-sm mt-3"
              >
                חזרה להתחברות
              </button>
            </div>
          )}

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
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539..."
                    fill="#1b212f"
                  />
                </svg>
              )}
              <span>
                {loading
                  ? "טוען..."
                  : type === "login"
                  ? "התחברות"
                  : "התחל לנצח"}
              </span>
            </button>
          )}

          {type === "login" ? (
            <div className="text-center font-[400] mt-3 text-[13px] text-[#939393]">
              חדש ב-SportsTips?{" "}
              <button
                onClick={() => setType("signUp")}
                className="text-blue-500 font-[600]"
              >
                הרשמה
              </button>
            </div>
          ) : (
            <div className="text-center font-[400] mt-3 text-[13px] text-[#939393]">
              כבר יש לך חשבון?{" "}
              <button
                onClick={() => setType("login")}
                className="text-blue-500 font-[600]"
              >
                התחבר
              </button>
            </div>
          )}

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
