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
import { FiDownload, FiUser } from "react-icons/fi";

const Settings = () => {
  const [page, setPage] = useState("live");
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const { isDarkMode, compareUser, fetchUser, user } = useContext(ShopContext);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);

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
          toast.success("החשבון נמחק בהצלחה");
          window.location.replace("/");
        } else {
          toast.error("שגיאה במחיקת החשבון");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("הקלט שגוי");
    }
  };

  return (
    <div>
      <div className={`${isDarkMode ? "dark" : ""} dark:bg-[var(--default)] `}>
        <NavBar setOpen={setOpen} />
        <div className="w-[100%] p-5 flex items-center justify-center">
          <div className="w-[500px] dark:bg-[#242b3d]  rounded-[20px] shadow-md sm:shadow-lg h-[fill-content] mt-20 p-6 sm:p-10">
            <div className="border-b border-b-[#f6f6f6] dark:border-b-[#f1f1f129] flex items-center gap-2 py-3">
              <div className="bg-[#f6f6f6] rounded-full flex items-center justify-center h-12 w-12">
                <FiUser />
              </div>
              <div>
                <p className="text-[13px] dark:text-[#f1f1f1] text-[#787878]">
                  {compareUser?.userName}
                </p>
                <p className="text-[13px] dark:text-[#f1f1f1] text-[#787878]">
                  {compareUser?.email}
                </p>
              </div>
            </div>

            <div className="border-b border-b-[#f6f6f6] dark:border-b-[#f1f1f129] flex items-center justify-between gap-2 py-3">
              <div>
                <p className="text-[13px] text-[#787878] dark:text-[#d3d3d3]">
                  יתרה זמינה
                </p>
                <p className="text-[14px] font-[500] dark:text-[#f1f1f1] text-[#030303]">
                  ${compareUser?.availableBalance.toLocaleString()}
                </p>
              </div>
              <div>
                <button
                  onClick={() => setOpen(true)}
                  className="flex items-center gap-1 p-[3px] w-26 bg-[#f6f6f6] rounded-full"
                >
                  <div className="bg-[#f1f1f1] h-9 w-9 flex items-center justify-center rounded-full">
                    <FiDownload />
                  </div>
                  <div className="text-sm">טעינת יתרה</div>
                </button>
              </div>
            </div>

            <div className="border-b border-b-[#f6f6f6] dark:border-b-[#f1f1f129] flex items-center justify-between gap-2 py-4">
              <div>
                <p className="text-[13px] text-[#494949] dark:text-[#d3d3d3]">
                  שם מלא
                </p>
              </div>
              <div>
                <p className="text-[13px] dark:text-[#f1f1f1] text-[#787878]">
                  {compareUser?.userName}
                </p>
              </div>
            </div>

            <div className="border-b border-b-[#f6f6f6] dark:border-b-[#f1f1f129] flex items-center justify-between gap-2 py-4">
              <div>
                <p className="text-[13px] text-[#494949] dark:text-[#d3d3d3]">
                  אימייל
                </p>
              </div>
              <div>
                <p className="text-[13px] dark:text-[#f1f1f1] text-[#787878]">
                  {compareUser?.email}
                </p>
              </div>
            </div>

            <div className="border-b border-b-[#f6f6f6] dark:border-b-[#f1f1f129] flex items-center justify-between gap-2 py-4">
              <div>
                <p className="text-[13px] text-[#494949] dark:text-[#d3d3d3]">
                  סיסמה
                </p>
              </div>
              <div>
                <p className="text-[13px] text-[#787878] dark:text-[#f1f1f1]">
                  *****
                </p>
              </div>
            </div>

            <div className="mt-5 flex-col flex justify-between gap-3 py-4">
              <div>
                <p className="text-[13px] text-[#494949] dark:text-[#d3d3d3]">
                  למחיקת החשבון
                </p>
              </div>
              <div>
                <p className="text-[13px] text-[#787878] dark:text-[#f1f1f1]">
                  החשבון שלך מכיל $
                  {compareUser?.availableBalance.toLocaleString()} ו-
                  {compareUser?.betHistory.length} משחקים שנרכשו מחיקת החשבון
                  תסיר לצמיתות את כל המשחקים והיתרה
                </p>
              </div>
              <button
                onClick={() => setOpenDel(true)}
                className="my-3 w-[fit-content] mb-8 rounded-[10px] border text-[12px] font-[500] border-red-600 p-2 px-4 text-red-500 hover:bg-red-500 duration-200 hover:text-[#fff]"
              >
                מחק את החשבון שלי
              </button>
            </div>
          </div>
        </div>

        {openDel && (
          <div className="bg-[#00000059] p-5 flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-10000">
            <div className="relative dark:bg-[var(--default)] dark:border-[#787878] border dark:border-none border-[white] bg-white rounded-[15px] sm:w-[400px] w-[100%] p-4">
              <h1 className="font-[600] fs-[15px] dark:text-[#d3d3d3] text-[#2f2f2f]">
                אשר מחיקת חשבון
              </h1>
              <p className="font-[400] mt-3 text-[14px] dark:text-[#f1f1f1] text-[#787878]">
                הקלד <span className="font-[800]">delete this account</span> כדי
                לאשר מחיקה
              </p>
              <div className="mt-4">
                <label
                  htmlFor=""
                  className="font-[400] mt-3 text-[14px] dark:text-[#d3d3d3] text-[#787878]"
                >
                  סיסמה
                </label>
                <br />
                <input
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  placeholder="הקלד delete this account"
                  className="p-2 px-3 rounded-[10px] mt-3 w-[100%] border dark:placeholder:text-[#d3d3d3] dark:text-[#d3d3d3] border-[#d3d3d3] text-sm placeholder:text-[12px]"
                />
              </div>
              <div className="h-[1px] w-[100%] dark:bg-[#7878783d] bg-[#f1f1f1] my-4"></div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setOpenDel(false)}
                  className="bg-[#f1f1f1] p-2 px-4 hover:opacity-70 text-black text-sm rounded-[10px]"
                >
                  ביטול
                </button>
                <button
                  disabled={loading}
                  onClick={() => deleteUser()}
                  className={`bg-red-600 p-2 px-4 hover:opacity-70 text-white text-[12px] rounded-[10px] ${
                    loading ? "opacity-60" : ""
                  }`}
                >
                  {loading ? "טוען..." : "מחק"}
                </button>
              </div>
              <button
                onClick={() => setOpenDel(false)}
                className="absolute top-0 dark:text-[#f1f1f1] right-0 p-3"
              >
                <IoClose />
              </button>
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
