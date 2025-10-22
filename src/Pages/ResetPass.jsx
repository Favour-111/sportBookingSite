import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import axios from "axios";
import toast from "react-hot-toast";

const ResetPass = () => {
  const navigate = useNavigate();
  const { id, token } = useParams(); // Extract token from URL params
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    setLoading(true);

    try {
      // Send a POST request to the backend with the new password
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/auth/reset-password/${id}/${token}`, // Include token in the URL
        {
          password: newPassword, // Send the new password in the request body
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successful!");
        navigate("/"); // Redirect to home page after successful reset
      } else {
        toast.error(response.data.message || "Error resetting password");
      }
    } catch (error) {
      toast.error("Error resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav className="flex sm:flex-row flex-col items-center justify-between py-2 px-5 shadow-sm">
        <div>
          <img
            src="https://github.com/Favour-111/my-asset/blob/main/image.jpg?raw=true"
            alt="Logo"
            width={50}
            className="rounded-[12px]"
          />
        </div>
        <div className="sm:mt-1 mt-3 text-[#787878] font-[600] text-[13px]">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-700">
            Sign Up
          </a>
        </div>
      </nav>
      <div className="h-[80vh] px-5 md:px-10 flex md:flex-row flex-col-reverse mt-20 md:mt-1 items-center justify-between">
        <div className="w-[50%]">
          <img
            src="https://media.istockphoto.com/id/1342248182/vector/forgot-password.jpg?s=612x612&w=0&k=20&c=QcgRWfrNWRtC3N2qISWbU-EsdOTI_h442TJEHgGERJw="
            alt="Forgot password"
            className="md:flex hidden"
          />
        </div>
        <div className="md:w-[50%] w-[100%]">
          <h1 className="text-2xl font-[600] tracking-wide">
            Reset your password?
          </h1>
          <p className="mt-2 text-sm w-[100%] md:w-[50%] text-[#787878]">
            Enter a new password with at least 8 characters, including letters,
            numbers, or symbols.
          </p>
          <div>
            <input
              type="password"
              className="border outline-none border-[#d3d3d3] px-3 py-2 rounded-[8px] placeholder:text-sm sm:w-80 w-[100%] mt-5"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              className="border outline-none border-[#d3d3d3] px-3 py-2 rounded-[8px] placeholder:text-sm sm:w-80 w-[100%] mt-5"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={handlePasswordChange}
              className="mt-4 w-[100%] sm:w-80 bg-[var(--Primary)] py-2.5 rounded-[10px] shadow shadow-amber-300 text-white"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Now"}
            </button>
          </div>
          <div>
            <button
              onClick={() => navigate("/")}
              className="mt-4 w-[100%] sm:w-80 bg-zinc-100 py-2.5 rounded-[10px] shadow text-sm text-black"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
