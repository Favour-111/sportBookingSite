import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbBrandGoogleAnalytics, TbSmartHome } from "react-icons/tb";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import { ShopContext } from "../../components/shopContext";
import { IoClose } from "react-icons/io5";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current route
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const token = localStorage.getItem("adminToken");
  // Function to check if the current route matches the link
  const isActive = (path) => location.pathname === path;
  const { navOpen, setNavOpen } = useContext(ShopContext);
  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-20 md:z-10 md:relative md:translate-x-0 md:block hidden transform transition-transform duration-300 bg-white border-r border-r-[#e8e8e8] text-white w-64 h-[100vh]  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center gap-2 bg-white py-3 mt-3 px-3">
          <img
            src="https://github.com/Favour-111/my-asset/blob/main/image.jpg?raw=true"
            alt=""
            className="w-10 h-10 rounded-[12px] object-contain"
          />
          <div className="font-[700] text-[18px] text-[#000] ">SportsTips</div>
        </div>
        <h1 className="text-[11px] uppercase text-[#d3d3d3] p-4">Menu</h1>
        <ul className=" flex flex-col gap-2 px-4">
          <li
            className={`block text-sm rounded-[10px] text-[#787878] rounded hover:bg-[#f5f5f5] duration-200 ${
              isActive(`/management/${token}`) ? "bg-[#f5f5f5]" : ""
            }`}
          >
            <Link
              to={`/management/${token}`}
              className="flex p-2 items-center gap-2"
            >
              <div>
                <TbSmartHome />
              </div>
              Dashboard
            </Link>
          </li>
          <li
            className={`block text-sm  rounded-[10px] text-[#787878] rounded hover:bg-[#f5f5f5] duration-200 ${
              isActive("/tips-management") ? "bg-[#f5f5f5]" : ""
            }`}
          >
            <Link to="/tips-management" className="p-2 flex items-center gap-2">
              <div>
                <MdOutlineTipsAndUpdates />
              </div>
              Manage Tips
            </Link>
          </li>
          {/* <li
            className={`block text-sm rounded-[10px] text-[#787878] rounded hover:bg-[#f5f5f5] duration-200 ${
              isActive("/analytics") ? "bg-[#f5f5f5]" : ""
            }`}
          >
            <Link to="/analytics" className="p-2 flex items-center gap-2">
              <div>
                <TbBrandGoogleAnalytics />
              </div>
              Analytics
            </Link>
          </li> */}
          <li
            className={`block text-sm rounded-[10px] text-[#787878] rounded hover:bg-[#f5f5f5] duration-200 ${
              isActive("/users") ? "bg-[#f5f5f5]" : ""
            }`}
          >
            <Link to="/users" className="p-2 flex items-center gap-2">
              <div>
                <FiUser />
              </div>
              Users
            </Link>
          </li>
          <li
            className={`block text-sm rounded-[10px] text-[#787878] rounded hover:bg-[#f5f5f5] duration-200 ${
              isActive("/broadcast-message") ? "bg-[#f5f5f5]" : ""
            }`}
          >
            <Link
              to="/broadcast-message"
              className="p-2 flex items-center gap-2"
            >
              <div>
                <HiOutlineMegaphone />
              </div>
              Broadcast message
            </Link>
          </li>
          <li
            className={`block text-sm p-2 rounded-[10px] text-[#787878] rounded hover:bg-[#f5f5f5] duration-200 ${
              isActive("/logout") ? "bg-[#f5f5f5]" : ""
            }`}
          >
            <Link to="/" className="flex items-center gap-2">
              <div>
                <CiLogout />
              </div>
              Go back
            </Link>
          </li>
        </ul>
      </div>
      {/* {mobile view} */}
      <div
        className={`fixed inset-0 z-20 md:z-10 md:relative md:translate-x-0 md:hidden block transform transition-transform duration-300 bg-white border-r border-r-[#e8e8e8] text-white w-64 h-[100vh]  ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-white py-3 mt-3 px-3">
            <img
              src="https://github.com/Favour-111/my-asset/blob/main/image.jpg?raw=true"
              alt=""
              className="w-10 h-10 rounded-[12px] object-contain"
            />
            <div className="font-[700] text-[18px] text-[#000] ">
              SportsTips
            </div>
          </div>
        </div>
        <button
          onClick={() => setNavOpen(false)}
          className="absolute top-5 right-5"
        >
          <IoClose className=" text-black" />
        </button>

        <h1 className="text-[11px] uppercase text-[#d3d3d3] p-4">Menu</h1>
        <ul className=" flex flex-col gap-2 px-4">
          <li
            onClick={() => setNavOpen(false)}
            className={`block text-sm rounded-[10px] text-[#787878] rounded hover:bg-[#f5f5f5] duration-200 ${
              isActive(`/management/${token}`) ? "bg-[#f5f5f5]" : ""
            }`}
          >
            <Link
              to={`/management/${token}`}
              className="p-2 flex items-center gap-2"
            >
              <div>
                <TbSmartHome />
              </div>
              Dashboard
            </Link>
          </li>
          <li
            onClick={() => setNavOpen(false)}
            className={`block text-sm rounded-[10px] text-[#787878] rounded hover:bg-[#f5f5f5] duration-200 ${
              isActive("/tips-management") ? "bg-[#f5f5f5]" : ""
            }`}
          >
            <Link to="/tips-management" className="p-2 flex items-center gap-2">
              <div>
                <MdOutlineTipsAndUpdates />
              </div>
              Manage Tips
            </Link>
          </li>
          {/* <li
            onClick={() => setNavOpen(false)}
            className={`block text-sm rounded-[10px] text-[#787878] rounded hover:bg-[#f5f5f5] duration-200 ${
              isActive("/analytics") ? "bg-[#f5f5f5]" : ""
            }`}
          >
            <Link to="/analytics" className="p-2 flex items-center gap-2">
              <div>
                <TbBrandGoogleAnalytics />
              </div>
              Analytics
            </Link>
          </li> */}
          <li
            onClick={() => setNavOpen(false)}
            className={`block text-sm rounded-[10px] text-[#787878] rounded hover:bg-[#f5f5f5] duration-200 ${
              isActive("/users") ? "bg-[#f5f5f5]" : ""
            }`}
          >
            <Link to="/users" className="p-2 flex items-center gap-2">
              <div>
                <FiUser />
              </div>
              Users
            </Link>
          </li>
          <li
            onClick={() => setNavOpen(false)}
            className={`block text-sm rounded-[10px] text-[#787878] rounded hover:bg-[#f5f5f5] duration-200 ${
              isActive("/broadcast-message") ? "bg-[#f5f5f5]" : ""
            }`}
          >
            <Link
              to="/broadcast-message"
              className="p-2 flex items-center gap-2"
            >
              <div>
                <HiOutlineMegaphone />
              </div>
              Broadcast message
            </Link>
          </li>
          <li
            onClick={() => setNavOpen(false)}
            className={`block text-sm rounded-[10px] text-[#787878] rounded hover:bg-[#f5f5f5] duration-200 ${
              isActive("/logout") ? "bg-[#f5f5f5]" : ""
            }`}
          >
            <button
              onClick={() => {
                navigate("/");
              }}
              className="p-2 flex items-center gap-2"
            >
              <div>
                <CiLogout />
              </div>
              Go back
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
