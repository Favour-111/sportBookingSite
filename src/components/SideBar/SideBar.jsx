import React, { useContext, useEffect, useState } from "react";
import { IoSunny } from "react-icons/io5";
import { BiExit, BiMoon, BiPlus, BiWallet } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { ShopContext } from "../shopContext";
import { AiOutlineClose } from "react-icons/ai";
import Login from "../Login/Login";
import { Link, useNavigate } from "react-router-dom";
import { RiMessage3Line, RiUser3Line } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { FaAngleDown } from "react-icons/fa6";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { TbUsers } from "react-icons/tb";
const SideBar = ({ setOpen }) => {
  const { t, i18n } = useTranslation();
  // Consume the dark mode context
  const { isDarkMode, toggleDarkMode, user, compareUser } =
    useContext(ShopContext);
  const [menu, setMenu] = useState(false);
  const [form, setForm] = useState(false);
  const [drop, SetDrop] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const navigate = useNavigate();
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setLangOpen(false);
  };

  // ✅ Auto direction switch (RTL/LTR)
  useEffect(() => {
    document.body.dir = i18n.language === "he" ? "ltr" : "ltr";
  }, [i18n.language]);

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* <div className="w-[100%] bg-amber-50  px-10 flex items-center justify-between">
          <div className="text-[13px] text-[#787878]">
            Get 100% discount on first deposit
          </div>
          <div className="relative">
            <h1
              className="text-[#787878] font-[600] flex items-center gap-1 cursor-pointer"
              onClick={() => setLangOpen(!langOpen)}
            >
              {i18n.language === "he" ? "עב" : "Eng"}{" "}
              <FaAngleDown size={12} className="mt-1" />
            </h1>

            {langOpen && (
              <div className="absolute right-0 mt-2 flex flex-col shadow-sm z-[9999] bg-white rounded-[10px] border border-gray-100">
                <button
                  onClick={() => changeLanguage("en")}
                  className="hover:bg-[#f1f1f1] duration-200 p-2 px-6 text-sm text-[#787878] border-b border-b-zinc-100 text-left"
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage("he")}
                  className="hover:bg-[#f1f1f1] duration-200 p-2 px-6 text-sm text-[#787878] text-left"
                >
                  עברית
                </button>
              </div>
            )}
          </div>
        </div> */}
        <div className="hidden md:flex items-center justify-between py-1 px-10 border-b-1 border-gray-200 bg-white dark:bg-[var(--default)] ">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://github.com/Favour-111/my-asset/blob/main/image.jpg?raw=true"
              alt=""
              className="w-12 h-12 rounded-[12px] object-contain"
            />
            <div className="font-[700] text-[18px] bg-gradient-to-r from-[#f7b822] via-[#ff7300] to-[#f7b822] bg-clip-text text-transparent">
              SportsTips
            </div>
          </Link>

          <div className="flex items-center gap-5">
            {/* <div className="text-[16px] font-[500] dark:text-emerald-300 text-emerald-600 ">
            Bal : <span className=" font-[600]">$300</span>
          </div> */}

            <div className="flex gap-2 items-center">
              <IoSunny
                size={14}
                className="text-[#787878] dark:text-[#d3d3d3]"
              />
              <div
                className={`relative inline-block w-9 h-4 ${
                  isDarkMode ? "bg-blue-500" : "bg-gray-300"
                } rounded-full`}
                onClick={toggleDarkMode}
              >
                <span
                  className={`absolute left-[2px] top-[2px] w-3 h-3 bg-white rounded-full transition-transform ${
                    isDarkMode ? "transform translate-x-5" : ""
                  }`}
                ></span>
              </div>
              <BiMoon
                size={14}
                className="text-[#787878] dark:text-[#d3d3d3]"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => SetDrop(!drop)}
                className="overflow-hidden dark:bg-[var(--default)] border dark:border-[#d3d3d3]  w-9 h-9 flex items-center justify-center rounded-full bg-[#f1f1f1] border-white"
              >
                <img
                  src="https://cdn3d.iconscout.com/3d/free/thumb/free-businessman-3d-icon-png-download-10523306.png"
                  alt=""
                  className="w-10"
                />
              </button>
              <div
                className={`${
                  drop
                    ? "translate-y-0 opacity-100"
                    : "translate-y-[-10px] opacity-0"
                } fixed mt-2 w-[200px] overflow-hidden right-[40px] dark:bg-[var(--default)] border dark:border-[#787878] border-[#d3d3d3] bg-[#fbfbfb] z-50 shadow rounded-[8px] transition-all duration-300 ease-in-out`}
              >
                <Link
                  to={`settings/${user}`}
                  className=" dark:hover:bg-[#202736] w-[100%] flex items-center gap-2 p-2 dark:text-[#d3d3d3] px-3 hover:bg-[#f1f1f1] duration-200"
                >
                  <div>
                    <MdOutlineTipsAndUpdates />
                  </div>
                  <div className="text-[12px]">Add Tips</div>
                </Link>
                <Link
                  to={`settings/${user}`}
                  className=" dark:hover:bg-[#202736] w-[100%] flex items-center gap-2 p-2 dark:text-[#d3d3d3] px-3 hover:bg-[#f1f1f1] duration-200"
                >
                  <div>
                    <TbUsers />
                  </div>
                  <div className="text-[12px]">Manage Users</div>
                </Link>
                <Link
                  to={`settings/${user}`}
                  className=" dark:hover:bg-[#202736] w-[100%] flex items-center gap-2 p-2 dark:text-[#d3d3d3] px-3 hover:bg-[#f1f1f1] duration-200"
                >
                  <div>
                    <RiMessage3Line />
                  </div>
                  <div className="text-[12px]">Broadcast Messages</div>
                </Link>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.replace("/");
                  }}
                  className=" dark:hover:bg-[#202736] w-[100%] flex items-center gap-2 p-2 dark:text-[#d3d3d3] px-3 hover:bg-[#f1f1f1] duration-200"
                >
                  <div>
                    <BiExit />
                  </div>
                  <div className="text-sm">LogOut</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile SideBar */}
      <div className="relative">
        <div
          className={`fixed dark:bg-[#1c2330] flex md:hidden items-center justify-between py-1 px-5 border-b-1 border-gray-200 bg-white dark:border-gray-500  fixed top-0 left-0 right-0 z-50`}
        >
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://github.com/Favour-111/my-asset/blob/main/image.jpg?raw=true"
              alt=""
              className="w-12 h-12 rounded-[12px] object-contain"
            />
            <div className="font-[700] text-[18px] bg-gradient-to-r from-[#f7b822] via-[#ff7300] to-[#f7b822] bg-clip-text text-transparent">
              SportsTips
            </div>
          </Link>
          <div className="flex items-center gap-4">
            {/* <div className="text-sm font-[500] dark:text-emerald-300 text-emerald-600 ">
              Bal : <span className="text-[15px] font-[600]">$300</span>
            </div> */}
            <div className="flex gap-2 items-center">
              <IoSunny
                size={14}
                className="text-[#787878] dark:text-[#d3d3d3]"
              />
              <div
                className={`relative inline-block w-9 h-4 ${
                  isDarkMode ? "bg-blue-500" : "bg-gray-300"
                } rounded-full`}
                onClick={toggleDarkMode}
              >
                <span
                  className={`absolute left-[2px] top-[2px] w-3 h-3 bg-white rounded-full transition-transform ${
                    isDarkMode ? "transform translate-x-5" : ""
                  }`}
                ></span>
              </div>
              <BiMoon
                size={14}
                className="text-[#787878] dark:text-[#d3d3d3]"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => SetDrop(!drop)}
                className="overflow-hidden dark:bg-[var(--default)] border dark:border-[#d3d3d3]  w-9 h-9 flex items-center justify-center rounded-full bg-[#f1f1f1] border-white"
              >
                <img
                  src="https://cdn3d.iconscout.com/3d/free/thumb/free-businessman-3d-icon-png-download-10523306.png"
                  alt=""
                  className="w-10"
                />
              </button>
              <div
                className={`${
                  drop
                    ? "translate-y-0 opacity-100"
                    : "translate-y-[-10px] opacity-0"
                } fixed mt-2 w-[200px] overflow-hidden right-[40px] dark:bg-[var(--default)] border dark:border-[#787878] border-[#d3d3d3] bg-[#fbfbfb] z-50 shadow rounded-[8px] transition-all duration-300 ease-in-out`}
              >
                <Link
                  to={`settings/${user}`}
                  className=" dark:hover:bg-[#202736] w-[100%] flex items-center gap-2 p-2 dark:text-[#d3d3d3] px-3 hover:bg-[#f1f1f1] duration-200"
                >
                  <div>
                    <MdOutlineTipsAndUpdates />
                  </div>
                  <div className="text-[12px]">Add Tips</div>
                </Link>
                <Link
                  to={`settings/${user}`}
                  className=" dark:hover:bg-[#202736] w-[100%] flex items-center gap-2 p-2 dark:text-[#d3d3d3] px-3 hover:bg-[#f1f1f1] duration-200"
                >
                  <div>
                    <TbUsers />
                  </div>
                  <div className="text-[12px]">Manage Users</div>
                </Link>
                <Link
                  to={`settings/${user}`}
                  className=" dark:hover:bg-[#202736] w-[100%] flex items-center gap-2 p-2 dark:text-[#d3d3d3] px-3 hover:bg-[#f1f1f1] duration-200"
                >
                  <div>
                    <RiMessage3Line />
                  </div>
                  <div className="text-[12px]">Broadcast Messages</div>
                </Link>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.replace("/");
                  }}
                  className=" dark:hover:bg-[#202736] w-[100%] flex items-center gap-2 p-2 dark:text-[#d3d3d3] px-3 hover:bg-[#f1f1f1] duration-200"
                >
                  <div>
                    <BiExit />
                  </div>
                  <div className="text-sm">LogOut</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {form && <Login state={setForm} />}
      </div>
    </div>
  );
};

export default SideBar;
