import React, { useContext, useState } from "react";
import Item from "../components/Item";
import { GoArrowRight } from "react-icons/go";
import { ShopContext } from "../components/shopContext";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import BackToTop from "../components/BackToTop";
import { BsGraphUpArrow } from "react-icons/bs";
import Testimonial from "../components/Testimonial";
import {
  IoAdd,
  IoAnalytics,
  IoCheckmarkCircleOutline,
  IoClose,
  IoShieldHalfSharp,
  IoTrophyOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { TbShoppingCartStar } from "react-icons/tb";
import { RiExchangeDollarFill, RiShoppingCart2Line } from "react-icons/ri";
import { VscGraphLine } from "react-icons/vsc";
import { LuClock, LuTrendingDown } from "react-icons/lu";
import { GiReceiveMoney } from "react-icons/gi";
import { FaCoins } from "react-icons/fa6";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import Funds from "../components/Funds/Funds";
import { BiPlus, BiRefresh } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";

const Settings = () => {
  const [page, setPage] = useState("live");
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const { isDarkMode, compareUser, fetchUser, user } = useContext(ShopContext);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //function for deleting a user
  const text = "delete this account";
  const deleteUser = async () => {
    if (password === text.toLocaleLowerCase()) {
      try {
        setLoading(true);
        const response = await axios.delete(
          `${import.meta.env.VITE_REACT_APP_API}/api/auth/deleteUser/${user}`
        );
        if (response) {
          localStorage.clear();
          toast.success("account deleted");
          window.location.replace("/");
        } else {
          toast.error("error deleting account");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("incorrect input");
    }
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""} dark:bg-[var(--default)] `}>
      <NavBar setOpen={setOpen} />

      <div className="md:pt-30 pt-20 sm:px-10 px-5">
        <div className="rounded-full bg-[#f1f1f1] overflow-hidden w-[fit-content]">
          <img
            src="https://png.pngtree.com/png-vector/20250514/ourmid/pngtree-3d-profile-icon-png-image_16279302.png"
            alt=""
            className="w-30"
          />
        </div>
        <h1 className="text-[16px] mt-4 font-[600] dark:text-[#d3d3d3] text-[#2f2f2f]">
          Available Bal:${compareUser?.availableBalance.toLocaleString()}
        </h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 p-2 bg-[var(--Primary)] rounded-[10px] text-sm text-[white] shadow shadow-amber-500 mt-3 px-6"
        >
          <BiPlus /> <div>Add Funds</div>
        </button>
        <h1 className="font-[600] dark:text-[white] text-[#787878] text-[18px] mt-6">
          Account Details
        </h1>
        <div className="mt-5">
          <label
            htmlFor=""
            className="dark:text-[#f1f1f1] text-[#787878] font-[400] text-sm"
          >
            Name
          </label>
          <br />
          <input
            type="text"
            value={compareUser?.userName}
            className="rounded-[10px] dark:border-[#d3d3d3] mt-2 dark:text-[#f1f1f1] border border-[#d3d3d3] px-3 py-2 w-[100%] sm:w-[300px] text-sm text-[#787878] tracking-wide"
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor=""
            className="dark:text-[#f1f1f1] text-[#787878] font-[400] text-sm"
          >
            Email
          </label>
          <br />
          <input
            type="text"
            value={compareUser?.email}
            className="rounded-[10px] dark:border-[#d3d3d3] mt-2 dark:text-[#f1f1f1] border border-[#d3d3d3] px-3 py-2 w-[100%] sm:w-[300px]  text-sm text-[#787878] tracking-wide"
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor=""
            className="dark:text-[#f1f1f1] text-[#787878] font-[400] text-sm"
          >
            Password
          </label>
          <br />
          <input
            type="text"
            value="*******"
            className="rounded-[10px] dark:border-[#d3d3d3] mt-2 dark:text-[#f1f1f1] border border-[#d3d3d3] px-3 py-2  w-[100%] sm:w-[300px] text-sm text-[#787878] tracking-wide"
          />
        </div>
        <div className="h-[1px] w-[100%] bg-[#d3d3d3] my-10"></div>
        <h1 className="dark:text-[#f1f1f1] text-[15px] font-[500] text-[#2f2f2f]">
          Delete Account
        </h1>
        <p className="dark:text-white mt-2 text-[#787878] font-[500] text-sm">
          i want to delete this account
        </p>
        <p className="mt-3 dark:text-[#d3d3d3] text-[#787878] font-[500] text-sm">
          This account contains $12 and 4 bought games. Deleting your account
          will remove all bought games and balance.
        </p>
        <button
          onClick={() => setOpenDel(true)}
          className="my-3 mb-8 rounded-[10px] border text-sm font-[600]  border-red-600 p-2 px-4 text-red-500 hover:bg-red-500 duration-200 hover:text-[#fff]"
        >
          I want to delete my account
        </button>
        {openDel && (
          <div className="bg-[#00000059] p-5 flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-10000 ">
            <div className="relative dark:bg-[var(--default)] dark:border-[#787878] border border-[white] bg-white rounded-[15px] sm:w-[400px] w-[100%] p-4">
              <h1 className="font-[600] fs-[15px] dark:text-[#d3d3d3] text-[#2f2f2f]">
                Confirm account deletion
              </h1>
              <p className="font-[400] mt-3 text-[14px] dark:text-[#f1f1f1] text-[#787878]">
                input <span className="font-[800]">delete this account</span> to
                delete account.
              </p>
              <div className="mt-4">
                <label
                  htmlFor=""
                  className="font-[400] mt-3 text-[14px] dark:text-[#d3d3d3] text-[#787878]"
                >
                  Password
                </label>
                <br />
                <input
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  placeholder="input password"
                  className="p-2 px-3 rounded-[10px] mt-3 w-[100%] border dark:text-[#d3d3d3] border-[#d3d3d3] text-sm placeholder:text-sm"
                />
              </div>
              <div className="h-[1px] w-[100%] dark:bg-[#787878] bg-[#f1f1f1] my-4"></div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setOpenDel(false)}
                  className="bg-[#f1f1f1] p-2 px-4 hover:opacity-70 text-black text-sm rounded-[10px]"
                >
                  Discard
                </button>
                <button
                  disabled={loading}
                  onClick={() => deleteUser()}
                  className={`bg-red-600 p-2 px-4 hover:opacity-70 text-white text-sm rounded-[10px] ${
                    loading ? "opacity-60" : ""
                  }`}
                >
                  {loading ? "loading...." : "Drop"}
                </button>
              </div>
              <div className="absolute top-0 right-0 p-3">
                <IoClose />
              </div>
            </div>
          </div>
        )}

        <div>
          <Funds open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
