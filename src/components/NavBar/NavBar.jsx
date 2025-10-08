import React, { useContext, useState } from "react";
import { IoSunny } from "react-icons/io5";
import { BiExit, BiMoon, BiPlus, BiWallet } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { ShopContext } from "../shopContext";
import { AiOutlineClose } from "react-icons/ai";
import Login from "../Login/Login";
import { Link, useNavigate } from "react-router-dom";
import { RiUser3Line } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";

const NavBar = ({ setOpen }) => {
  // Consume the dark mode context
  const { isDarkMode, toggleDarkMode, user, compareUser } =
    useContext(ShopContext);
  const [menu, setMenu] = useState(false);
  const [form, setForm] = useState(false);
  const [drop, SetDrop] = useState(false);
  const navigate = useNavigate();
  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="hidden md:flex items-center justify-between py-3 px-10 border-b-1 border-gray-200 bg-white dark:bg-[var(--default)] fixed top-0 left-0 right-0 z-50">
        <div>
          <img
            src="https://github.com/Favour-111/my-asset/blob/main/image.jpg?raw=true"
            alt=""
            className="w-12 h-12 rounded-[12px] object-contain"
          />
        </div>
        <div>
          <ul className="flex items-center gap-4 ">
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
              className="bg-[var(--Primary)] shadow-sm shadow-amber-300 text-white px-4 py-2.5 rounded-[10px] text-sm"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => SetDrop(!drop)}
                className="dark:bg-[var(--default)] border  w-9 h-9 flex items-center justify-center rounded-full bg-[#f1f1f1] border-none"
              >
                <RiUser3Line className="dark:text-[#d3d3d3]" />
              </button>
              <div
                className={`${
                  drop
                    ? "translate-y-0 opacity-100"
                    : "translate-y-[-10px] opacity-0"
                } fixed mt-2 w-[200px] overflow-hidden right-[120px] dark:bg-[var(--default)] border dark:border-[#787878] border-[#d3d3d3] bg-[#fbfbfb] z-50 shadow rounded-[8px] transition-all duration-300 ease-in-out`}
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
            <IoSunny size={14} className="text-[#787878] dark:text-[#d3d3d3]" />
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
            <BiMoon size={14} className="text-[#787878] dark:text-[#d3d3d3]" />
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="relative">
        <div
          className={`fixed dark:bg-[#1c2330] flex md:hidden items-center justify-between py-1 px-5 border-b-1 border-gray-200 bg-white dark:border-gray-500  fixed top-0 left-0 right-0 z-50`}
        >
          <div>
            <img
              src="https://github.com/Favour-111/my-asset/blob/main/image.jpg?raw=true"
              alt=""
              className="wmd:-12 md:h-12 w-10 h-10 rounded-[12px] object-contain"
            />
          </div>
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
                  className="dark:bg-[var(--default)] border  w-9 h-9 flex items-center justify-center rounded-full bg-[#f1f1f1] border-[#d3d3d3]"
                >
                  <RiUser3Line className="dark:text-[#d3d3d3]" />
                </button>
                <div
                  className={`${
                    drop
                      ? "translate-y-0 opacity-100"
                      : "translate-y-[-10px] opacity-0"
                  } fixed mt-2 w-[200px] overflow-hidden right-[50px] dark:bg-[var(--default)] border dark:border-[#787878] border-none bg-[#fbfbfb] z-50 shadow rounded-[8px] transition-all duration-300 ease-in-out`}
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
          className={`bg-white z-10000 dark:bg-[#1c2330] fixed w-[100%] top-12 ${
            menu ? "max-h-[500px]" : "max-h-0"
          } shadow-sm overflow-hidden transition-all duration-200 ease-in-out`}
        >
          <ul className="p-5 gap-1 flex flex-col">
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
                className="bg-[var(--Primary)] mt-2 shadow-sm shadow-amber-300 text-white px-4 py-2.5 rounded-[10px] text-sm"
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
