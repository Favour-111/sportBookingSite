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
                    Management
                  </Link>
                </li>
              )}
              {!user && (
                <li>
                  <Link
                    to="/"
                    className="text-[var(--default)] dark:text-[#d3d3d3] dark:hover:text-[white] text-sm hover:text-[var(--Primary)] duration-200"
                  >
                    Home
                  </Link>
                </li>
              )}
              {user && (
                <li>
                  <Link
                    to="/"
                    className="text-[var(--default)] dark:text-[#d3d3d3] dark:hover:text-[white] text-sm hover:text-[var(--Primary)] duration-200"
                  >
                    Dashboard
                  </Link>
                </li>
              )}

              <li>
                <Link
                  to="/recommendations"
                  className="text-[var(--default)] dark:text-[#d3d3d3] dark:hover:text-[white] text-sm hover:text-[var(--Primary)] duration-200"
                >
                  Recommendations
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-[var(--default)] dark:text-[#d3d3d3] dark:hover:text-[white] text-sm hover:text-[var(--Primary)] duration-200"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-5">
            {/* <div className="text-[16px] font-[500] dark:text-emerald-300 text-emerald-600 ">
            Bal : <span className=" font-[600]">$300</span>
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
                Login
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
                      Balance:${compareUser?.availableBalance.toLocaleString()}
                    </div>
                  </button>
                  <button
                    onClick={() => setOpen(true)}
                    className="text-sm text-[#c3422b]  dark:bg-transparent bg-[#ff634716] dark:hover:bg-[#202736] w-[100%] flex items-center gap-1 p-2 dark:text-[#d3d3d3] px-3 hover:bg-[#f1f1f1] duration-200"
                  >
                    <div>
                      <BiPlus />
                    </div>
                    Add Funds
                  </button>
                  <Link
                    to={`settings/${user}`}
                    className=" dark:hover:bg-[#202736] w-[100%] flex items-center gap-2 p-2 dark:text-[#d3d3d3] px-3 hover:bg-[#f1f1f1] duration-200"
                  >
                    <div>
                      <FiSettings />
                    </div>
                    <div className="text-[12px]">Settings</div>
                  </Link>
                  {compareUser?.telegramId ? (
                    <div
                      className="cursor-pointer text-[13px] px-3 p-2 bg-green-50 text-green-500 flex items-center gap-2 cursor-pointer hover:bg-green-100 duration-200"
                      onClick={() => {
                        const botUsername = "spoiqunbot"; // no @
                        const telegramUrl = `https://t.me/${botUsername}`;
                        window.open(telegramUrl, "_blank");
                      }}
                    >
                      <BiLink />
                      Telegram Connected
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
                          toast.error("Failed to generate Telegram link");
                        }
                      }}
                    >
                      <BiLink />
                      <div className="text-[12px]">Connect to Telegram</div>
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
                    <div className="text-sm">LogOut</div>
                  </button>
                </div>
              </div>
            )}

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
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="relative">
        <div
          className={`fixed dark:bg-[#1c233085] flex md:hidden items-center justify-between py-1 px-5 border-b-1 border-gray-200 backdrop-blur-xl  dark:border-gray-500  fixed top-0 left-0 right-0 z-50`}
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
                      Balance:${compareUser?.availableBalance.toLocaleString()}
                    </div>
                  </button>
                  <button
                    onClick={() => setOpen(true)}
                    className="text-sm text-[#c3422b]  dark:bg-transparent bg-[#ff634716] dark:hover:bg-[#202736] w-[100%] flex items-center gap-1 p-2 dark:text-[#d3d3d3] px-3 hover:bg-[#f1f1f1] duration-200"
                  >
                    <div>
                      <BiPlus />
                    </div>
                    Add Funds
                  </button>
                  <Link
                    to={`settings/${user}`}
                    className=" dark:hover:bg-[#202736] w-[100%] flex items-center gap-2 p-2 dark:text-[#d3d3d3] px-3 hover:bg-[#f1f1f1] duration-200"
                  >
                    <div>
                      <FiSettings />
                    </div>
                    <div className="text-[12px]">Settings</div>
                  </Link>
                  {compareUser?.telegramId !== "" ? (
                    <div
                      onClick={() => {
                        const botUsername = "spoiqunbot"; // no @
                        const telegramUrl = `https://t.me/${botUsername}`;
                        window.open(telegramUrl, "_blank");
                      }}
                      className="cursor-pointer text-[13px] px-3 p-2 bg-green-50 text-green-500 flex items-center gap-2"
                    >
                      <BiLink />
                      Telegram Connected
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
                          toast.error("Failed to generate Telegram link");
                        }
                      }}
                    >
                      <div>
                        <BiLink />
                      </div>
                      <div className="text-[12px]">Connect to Telegram</div>
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
                    <div className="text-[12px]">LogOut</div>
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
                  Management
                </Link>
              </li>
            )}
            {!user && (
              <li onClick={() => navigate("/")} className="h-8 w-[100%] ">
                <Link className="w-[100%] text-[13px] dark:text-[#d3d3d3] text-[#787878]">
                  Home
                </Link>
              </li>
            )}

            {user && (
              <li onClick={() => navigate("/")} className="h-8 w-[100%]">
                <Link className="w-[100%] text-[13px] text-[#787878]  dark:text-[#d3d3d3] py-2">
                  Dashboard
                </Link>
              </li>
            )}

            <li
              onClick={() => navigate("/recommendations")}
              className="h-8 w-[100%]"
            >
              <Link className="w-[100%] text-[13px] text-[#787878]  dark:text-[#d3d3d3] py-2">
                Recommendations
              </Link>
            </li>

            <li onClick={() => navigate("/about")} className="h-8 w-[100%]">
              <Link className=" w-[100%]  text-[13px] text-[#787878]  dark:text-[#d3d3d3] py-2">
                About
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
                Login
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
