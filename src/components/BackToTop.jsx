import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { PiTelegramLogo } from "react-icons/pi";
const BackToTop = () => {
  return (
    <div className="fixed bottom-1 right-1">
      <ul class="wrapper">
        <li class="icon instagram">
          <span class="tooltip">Telegram</span>
          <PiTelegramLogo />
        </li>
      </ul>
    </div>
  );
};

export default BackToTop;
