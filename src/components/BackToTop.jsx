import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { PiTelegramLogo } from "react-icons/pi";
import { FaTelegramPlane } from "react-icons/fa";
const BackToTop = () => {
  return (
    <div className="fixed bottom-1 right-1">
      <button
        onClick={() =>
          window.open(
            "https://t.me/Addictedgames2025",
            "_blank",
            "noopener,noreferrer"
          )
        }
        class="wrapper"
      >
        <li class="icon instagram ">
          <span class="tooltip">Telegram</span>
          <FaTelegramPlane size={20} />
        </li>
      </button>
    </div>
  );
};

export default BackToTop;
