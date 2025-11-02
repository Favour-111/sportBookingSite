import React, { useContext, useEffect, useState } from "react";
import { IoSunny } from "react-icons/io5";
import { BiExit, BiLink, BiMoon, BiPlus, BiWallet } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { ShopContext } from "../shopContext";
import { AiOutlineClose } from "react-icons/ai";
import Login from "../Login/Login";
import { Link, useNavigate } from "react-router-dom";
import { RiUser3Line } from "react-icons/ri";
import { FiSettings, FiUser } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { FaAngleDown } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";
const NavBar = ({ setOpen }) => {
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
            קבל 100% בונוס על ההפקדה הראשונה
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
        <div className="hidden md:flex items-center justify-between py-1 px-10  backdrop-blur-xl  border-gray-200 dark:border-gray-600  dark:bg-[#1c233085] ">
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
          <div>
            <ul className="flex items-center gap-4 ">
              {compareUser?.role === "admin" && (
                <li>
                  <Link
                    to={`/management/${compareUser._id}`}
                    className="text-[var(--default)] dark:text-[#d3d3d3] dark:hover:text-[white] text-sm hover:text-[var(--Primary)] duration-200"
                  >
                    ניהול
                  </Link>
                </li>
              )}
              {!user && (
                <li>
                  <Link
                    to="/"
                    className="text-[var(--default)] dark:text-[#d3d3d3] dark:hover:text-[white] text-sm hover:text-[var(--Primary)] duration-200"
                  >
                    בית
                  </Link>
                </li>
              )}
              {user && (
                <li>
                  <Link
                    to="/"
                    className="text-[var(--default)] dark:text-[#d3d3d3] dark:hover:text-[white] text-sm hover:text-[var(--Primary)] duration-200"
                  >
                    דשבורד משתמש
                  </Link>
                </li>
              )}

              <li>
                <Link
                  to="/recommendations"
                  className="text-[var(--default)] dark:text-[#d3d3d3] dark:hover:text-[white] text-sm hover:text-[var(--Primary)] duration-200"
                >
                  המלצות
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-[var(--default)] dark:text-[#d3d3d3] dark:hover:text-[white] text-sm hover:text-[var(--Primary)] duration-200"
                >
                  אודות
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-5">
            {/* <div className="text-[16px] font-[500] dark:text-emerald-300 text-emerald-600 ">
            יתרה : <span className=" font-[600]">$300</span>
          </div> */}
            {!user ? (
              <button
                onClick={() => {
                  setForm(true);
                  setMenu(false);
                }}
                className="custom-btn "
                // className="bg-[var(--Primary)] mt-2 shadow-sm shadow-amber-300 text-white px-4 py-2.5 rounded-[10px] text-sm"
              >
                התחברות
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => SetDrop(!drop)}
                  className="dark:text-[#f6f6f6] overflow-hidden dark:bg-[var(--default)] border dark:border-[#d3d3d3]  w-9 h-9 flex items-center justify-center rounded-full bg-[#f6f6f6] border-white"
                >
                  <FiUser />
                </button>
                <div
                  className={`${
                    drop
                      ? "translate-y-0 opacity-100"
                      : "translate-y-[-10px] opacity-0 pointer-events-none"
                  } fixed mt-2 w-[200px] right-[120px] dark:bg-[var(--default)] border dark:border-[#787878] border-[#d3d3d3] bg-[#fbfbfb] z-50 shadow rounded-[8px] transition-all duration-300 ease-in-out`}
                >
                  <button className="dark:hover:bg-[#202736] w-[100%] flex items-center gap-2 p-3 dark:text-[#d3d3d3] border-b dark:border-[#787878] hover:bg-[#f1f1f1] duration-200 border-b-[#0000000a]">
                    <div>
                      <BiWallet />
                    </div>
                    <div className="text-sm">
                      יתרה: ${compareUser?.availableBalance.toLocaleString()}
                    </div>
                  </button>
                  <button
                    onClick={() => setOpen(true)}
                    className="text-sm text-[#c3422b]  dark:bg-transparent bg-[#ff634716] dark:hover:bg-[#202736] w-[100%] flex items-center gap-1 p-2 dark:text-[#d3d3d3] px-3 hover:bg-[#f1f1f1] duration-200"
                  >
                    <div>
                      <BiPlus />
                    </div>
                    הוסף כספים
                  </button>
                  <Link
                    to={`settings/${user}`}
                    className=" dark:hover:bg-[#202736] w-[100%] flex items-center gap-2 p-2 dark:text-[#d3d3d3] px-3 hover:bg-[#f1f1f1] duration-200"
                  >
                    <div>
                      <FiSettings />
                    </div>
                    <div className="text-sm">הגדרות</div>
                  </Link>
                  {compareUser?.telegramId !== "" ? (
                    <div
                      onClick={() => {
                        const botUsername = "SportTipsPayBot"; // no @
                        const telegramUrl = `https://t.me/${botUsername}`;
                        window.open(telegramUrl, "_blank");
                      }}
                      className="cursor-pointer text-[13px] px-3 p-2 bg-green-50 text-green-500 flex items-center gap-2"
                    >
                      <BiLink />
                      טלגרם מחובר
                    </div>
                  ) : (
                    <button
                      className="dark:hover:bg-[#202736] w-[100%] flex items-center gap-2 p-2 dark:text-[#d3d3d3] px-3 hover:bg-[#f1f1f1] duration-200"
                      onClick={async () => {
                        try {
                          const res = await axios.post(
                            `${
                              import.meta.env.VITE_REACT_APP_API
                            }/api/auth/connect/telegram`,
                            { userId: localStorage.getItem("userId") }
                          );
                          window.open(res.data.deepLink, "_blank");
                        } catch (err) {
                          toast.error("שגיאה ביצירת קישור לטלגרם");
                        }
                      }}
                    >
                      <div>
                        <BiLink />
                      </div>
                      <div className="text-sm">חבר לטלגרם</div>
                    </button>
                  )}

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
                    <div className="text-sm">התנתקות</div>
                  </button>
                </div>
              </div>
            )}
            <div
              className={`${
                !isDarkMode ? "bg-gray-300" : "bg-[#e27c2c]"
              } p-1 rounded-full flex items-center gap-1`}
            >
              <IoSunny
                size={14}
                className={`${
                  isDarkMode
                    ? "text-[#d3d3d3] dark:text-[#d3d3d3]"
                    : "text-[var(--Primary)]"
                }`}
              />
              <div
                className={`relative w-8 h-4 ${
                  !isDarkMode ? "bg-white" : "bg-[var(--Primary)]"
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
          </div>
        </div>
        <div
          className={`${
            isDarkMode ? "dark" : ""
          } dark:bg-[#1c233085] flex items-center justify-between px-5 py-2 md:hidden backdrop-blur-xl border-b border-gray-200 dark:border-gray-600`}
        >
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://github.com/Favour-111/my-asset/blob/main/image.jpg?raw=true"
              alt=""
              className="w-10 h-10 rounded-[12px] object-contain"
            />
            <div className="font-[700] text-[14px] bg-gradient-to-r from-[#f7b822] via-[#ff7300] to-[#f7b822] bg-clip-text text-transparent">
              SportsTips
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div
              className={`${
                !isDarkMode ? "bg-gray-300" : "bg-[#e27c2c]"
              } p-1 rounded-full flex items-center gap-1`}
            >
              <IoSunny
                size={14}
                className={`${
                  isDarkMode
                    ? "text-[#d3d3d3] dark:text-[#d3d3d3]"
                    : "text-[var(--Primary)]"
                }`}
              />
              <div
                className={`relative w-8 h-4 ${
                  !isDarkMode ? "bg-white" : "bg-[var(--Primary)]"
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
            {user && (
              <div className="relative">
                <button
                  onClick={() => SetDrop(!drop)}
                  className="dark:text-[#f6f6f6] overflow-hidden dark:bg-[var(--default)] border dark:border-[#d3d3d3]  w-9 h-9 flex items-center justify-center rounded-full bg-[#f6f6f6] border-white"
                >
                  <FiUser />
                </button>
                <div
                  className={`${
                    drop
                      ? "translate-y-0 opacity-100 visibility-visible"
                      : "translate-y-[-10px] opacity-0 visibility-hidden pointer-events-none"
                  } fixed mt-2 w-[200px] right-[50px] dark:bg-[var(--default)] border dark:border-[#787878] border-[#d3d3d3] bg-[#fbfbfb] z-[9999] shadow rounded-[8px] transition-all duration-300 ease-in-out`}
                >
                  <button className="dark:hover:bg-[#202736] w-[100%] flex items-center gap-2 p-3 dark:text-[#d3d3d3] border-b dark:border-[#787878] hover:bg-[#f1f1f1] duration-200 border-b-[#0000000a]">
                    <div>
                      <BiWallet />
                    </div>
                    <div className="text-[12px]">
                      יתרה: ${compareUser?.availableBalance.toLocaleString()}
                    </div>
                  </button>
                  <button
                    onClick={() => setOpen(true)}
                    className="text-sm text-[#c3422b]  dark:bg-transparent bg-[#ff634716] dark:hover:bg-[#202736] w-[100%] flex items-center gap-1 p-2 dark:text-[#d3d3d3] px-3 hover:bg-[#f1f1f1] duration-200"
                  >
                    <div>
                      <BiPlus />
                    </div>
                    הטען יתרה
                  </button>
                  <Link
                    to={`settings/${user}`}
                    className=" dark:hover:bg-[#202736] w-[100%] flex items-center gap-2 p-2 dark:text-[#d3d3d3] px-3 hover:bg-[#f1f1f1] duration-200"
                  >
                    <div>
                      <FiSettings />
                    </div>
                    <div className="text-[12px]">הגדרות</div>
                  </Link>
                  {compareUser?.telegramId !== "" ? (
                    <div
                      onClick={() => {
                        const botUsername = "SportTipsPayBot"; // no @
                        const telegramUrl = `https://t.me/${botUsername}`;
                        window.open(telegramUrl, "_blank");
                      }}
                      className="cursor-pointer text-[13px] px-3 p-2 bg-green-50 text-green-500 flex items-center gap-2"
                    >
                      <BiLink />
                      טלגרם מחובר
                    </div>
                  ) : (
                    <button
                      className="dark:hover:bg-[#202736] w-[100%] flex items-center gap-2 p-2 dark:text-[#d3d3d3] px-3 hover:bg-[#f1f1f1] duration-200"
                      onClick={async () => {
                        try {
                          const res = await axios.post(
                            `${
                              import.meta.env.VITE_REACT_APP_API
                            }/api/auth/connect/telegram`,
                            { userId: localStorage.getItem("userId") }
                          );
                          window.open(res.data.deepLink, "_blank");
                        } catch (err) {
                          toast.error("שגיאה ביצירת קישור לטלגרם");
                        }
                      }}
                    >
                      <div>
                        <BiLink />
                      </div>
                      <div className="text-[12px]">חבר לטלגרם</div>
                    </button>
                  )}

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
                    <div className="text-[12px]">התנתקות</div>
                  </button>
                </div>
              </div>
            )}

            <div className="cursor-pointer" onClick={() => setMenu(!menu)}>
              {menu ? (
                <AiOutlineClose size={22} className="dark:text-[#d3d3d3]" />
              ) : (
                <RxHamburgerMenu size={22} className="dark:text-[#d3d3d3]" />
              )}
            </div>
          </div>
        </div>
        <div
          className={` backdrop-blur-lg z-10000 dark:bg-[#1c233076] fixed w-[100%] top-14 ${
            menu ? "max-h-[500px]" : "max-h-0"
          } shadow-sm overflow-hidden transition-all duration-200 ease-in-out`}
        >
          <ul className="p-5 gap-1 flex flex-col">
            {compareUser?.role === "admin" && (
              <li className="h-8 w-[100%] ">
                <Link
                  to={`/management/${compareUser._id}`}
                  className="w-[100%] text-[13px] dark:text-[#d3d3d3] text-[#787878]"
                >
                  ניהול
                </Link>
              </li>
            )}
            {!user && (
              <li onClick={() => navigate("/")} className="h-8 w-[100%] ">
                <Link className="w-[100%] text-[13px] dark:text-[#d3d3d3] text-[#787878]">
                  בית
                </Link>
              </li>
            )}

            {user && (
              <li onClick={() => navigate("/")} className="h-8 w-[100%]">
                <Link className="w-[100%] text-[13px] text-[#787878]  dark:text-[#d3d3d3] py-2">
                  דשבורד משתמש
                </Link>
              </li>
            )}

            <li
              onClick={() => navigate("/recommendations")}
              className="h-8 w-[100%]"
            >
              <Link className="w-[100%] text-[13px] text-[#787878]  dark:text-[#d3d3d3] py-2">
                המלצות
              </Link>
            </li>

            <li onClick={() => navigate("/about")} className="h-8 w-[100%]">
              <Link className=" w-[100%]  text-[13px] text-[#787878]  dark:text-[#d3d3d3] py-2">
                אודות
              </Link>
            </li>
            {!user && (
              <button
                onClick={() => {
                  setForm(true);
                  setMenu(false);
                }}
                className="custom-btn mt-2"
                // className="bg-[var(--Primary)] mt-2 shadow-sm shadow-amber-300 text-white px-4 py-2.5 rounded-[10px] text-sm"
              >
                התחברות
              </button>
            )}
          </ul>
        </div>
        {form && <Login state={setForm} />}
      </div>
    </div>
  );
};

export default NavBar;
