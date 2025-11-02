import React from "react";
import { IoMailUnreadOutline, IoTrophyOutline } from "react-icons/io5";
import { LuCrown } from "react-icons/lu";
import Login from "../Login/Login";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiLogoTelegram } from "react-icons/bi";
import { GoTrophy } from "react-icons/go";

const Footer = () => {
  const [form, setForm] = useState(false);
  return (
    <div className="mt-20">
      <div className="w-full dark:bg-[#1c2330] bg-[#f6f6f6] py-10 px-5 md:flex flex-col space-y-5 justify-center items-center gap-2">
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center">
            <IoMailUnreadOutline className="text-[var(--Primary)] text-center text-[50px]" />
          </div>
          <h1 className="font-[700] dark:text-white text-[25px]">
            הצטרפו למועדון החברים
          </h1>
          <div className="text-[#787878] text-sm">
            קבלו עדכונים ישר למייל
          </div>
        </div>
        <div className="flex items-center justify-between bg-white p-1 rounded-[25px]">
          <input
            type="text"
            placeholder="הכניסו כתובת מייל"
            className="px-3 placeholder:text-sm outline-none"
          />
          <button className="bg-[tomato] px-4 py-2.5 rounded-[20px] text-[11px] whitespace-nowrap text-white">
            שלח
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-[var(--Primary)] gap-2 shadow-sm hover:opacity-70 flex items-center  mt-5 px-4 py-2.5 rounded-[7px] text-sm text-white">
            <div>
              <GoTrophy />
            </div>{" "}
            <div>בואו נתחיל להרוויח!</div>
          </button>
        </div>
      </div>
      <div className="h-[1px]  w-full bg-[#e5e5e5] "></div>
      <div className="bg-[#f6f6f6] dark:text-[#d3d3d3]  dark:bg-[#1c2330] flex flex-col md:flex-row justify-between md:px-10 px-5 gap-y-10 py-10 ">
        <div className="md:w-[30%] w-[100%] ">
          <div>
            {" "}
            <img
              src="https://github.com/Favour-111/my-asset/blob/main/image.jpg?raw=true"
              alt=""
              className="w-12 h-12 rounded-[12px] object-contain"
            />
          </div>
          <p className="text-sm text-[#787878] mt-3 dark:text-[#d3d3d3] ">
            הפלטפורמה המובילה לטיפים והמלצות בהימורי ספורט.
          </p>
        </div>

        <div className="md:w-[33%] w-[100%] ">
          <h1 className="font-[600]">תמיכה</h1>
          <ul className="text-sm dark:text-[#d3d3d3]  text-[#787878] mt-2 flex flex-col gap-2">
            <li>מרכז עזרה</li>
            <li>
              <button
                onClick={() =>
                  window.open(
                    "https://t.me/Addictedgames2025",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="flex items-center gap-1"
              >
                <div>
                  {" "}
                  <BiLogoTelegram />
                </div>
                <div>דברו איתנו</div>
              </button>
            </li>
            <li>תנאי שימוש</li>
            <li>פרטיות</li>
          </ul>
        </div>
      </div>
      <div className="h-[.5px] w-full dark:bg-[#e5e5e5] bg-[#e5e5e5]"></div>
      <div className="bg-[#f1f1f1] dark:text-[#d3d3d3]  dark:bg-[#1c2330] p-5 text-center text-sm text-[#787878]">
        <a target="blank" href="https://favour-111.github.io/my-portfolio/">
          © 2024 SportTips כל הזכויות שמורות | פותח ע״י Horbah's Tech
        </a>
      </div>
      {form && <Login state={setForm} />}
    </div>
  );
};

export default Footer;