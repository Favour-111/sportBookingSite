import React, { useEffect, useState } from "react";
import "./PopUp.css";
import { MdOutlineClose } from "react-icons/md";
import { IoTrophyOutline } from "react-icons/io5";

const PopUP = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const modalShown = localStorage.getItem("modalShown");
    if (modalShown) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        // localStorage.setItem("modalShown", "true"); // Set flag to prevent future display
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    localStorage.clear("modalShown");
  };

  // if (!showPopup) return null;

  return (
    showPopup && (
      <div className="pop-up-overlay">
        <div className="pop-up-container">
          <div className="pop-up-img">
            <img
              src="https://assets.goal.com/images/v3/bltfb814def0907fc19/Social-16x9%20(12).jpg?auto=webp&format=pjpg&width=3840&quality=60"
              alt="Promo Gift"
            />
          </div>

          <div className="px-4  text-corner ">
            <div className="days">Sign Up Bonus</div>
            <div className="promo-head">Special Bonus!</div>
            <p>
              Sign up to our platform now to get{" "}
              <span className="highlight"> 100% discount</span> bonus on first
              deposit
            </p>
            <button onClick={handleClose}>
              <div>
                <IoTrophyOutline />
              </div>
              <div>Get Started now</div>
            </button>
            <div
              className="text-center text-sm text-[#787878] mt-3 w-[100%] cursor-pointer"
              onClick={handleClose}
            >
              close now
            </div>
            <div className="close-icon" onClick={handleClose}>
              <MdOutlineClose />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PopUP;
