import React, { useContext, useState } from "react";
import { ShopContext } from "../../components/shopContext";
import { TbRadioactive } from "react-icons/tb";

import { MdTipsAndUpdates } from "react-icons/md";
import { IoIosRemoveCircleOutline } from "react-icons/io";

import Footer from "./Footer";
import Sidebar from "./SideBar";
import TopBar from "./TopBar";
import ItemManage from "./ItemManage";
import { GiMoneyStack } from "react-icons/gi";
import { IoAdd } from "react-icons/io5";

const Tips = () => {
  const [open, setOpen] = useState(false);
  const { isDarkMode, compareUser, fetchUser } = useContext(ShopContext);
  return (
    <div
      className={`${isDarkMode ? "dark" : ""}flex  dark:bg-[var(--default)] `}
    >
      <div>
        <Sidebar setOpen={setOpen} />
      </div>
      <div className="h-[100vh] w-[100%] overflow-y-scroll">
        <div className="mb-10">
          <TopBar />
          <div className="p-4 mt-5">
            <h1 className="text-[19px] font-[600] text-black ">
              Tips Management
            </h1>
            <div className="grid md:grid-cols-4 grid-cols-2  items-center gap-3  mt-5">
              <div className=" bg-white border-[#f1d1d1] shadow-sm  px-5 py-5 rounded-[10px]">
                <div className="bg-[#f6f6f6] p-2 rounded-[10px] w-[fit-content]">
                  <MdTipsAndUpdates className="text-[#787878] text-[2em]" />
                </div>
                <div className="mt-2 font-[700] text-2xl">120</div>
                <div className="flex items-center justify-between">
                  <div className="sm:text-[sm] text-[11px] text-[#787878]">
                    Total Tips
                  </div>
                  <div className="rounded-full p-1 text-[11px] bg-green-100 text-green-700">
                    +11.4%
                  </div>
                </div>
              </div>
              <div className=" bg-white border-[#f1d1d1] shadow-sm  px-5 py-5 rounded-[10px]">
                <div className="bg-[#f6f6f6] p-2 rounded-[10px] w-[fit-content]">
                  <TbRadioactive className="text-[#787878] text-[2em]" />
                </div>
                <div className="mt-2 font-[700] text-2xl">120</div>
                <div className="flex items-center justify-between">
                  <div className="sm:text-[sm] text-[11px] text-[#787878]">
                    Activated Tips
                  </div>
                  <div className="rounded-full p-1 text-[11px] bg-green-100 text-green-700">
                    +11.4%
                  </div>
                </div>
              </div>
              <div className=" bg-white border-[#f1d1d1] shadow-sm  px-5 py-5 rounded-[10px]">
                <div className="bg-[#f6f6f6] p-2 rounded-[10px] w-[fit-content]">
                  <IoIosRemoveCircleOutline className="text-[#787878] text-[2em]" />
                </div>
                <div className="mt-2 font-[700] text-2xl">120</div>
                <div className="flex items-center justify-between">
                  <div className="sm:text-[sm] text-[11px] text-[#787878]">
                    Deactivated Tips
                  </div>
                  <div className="rounded-full p-1 text-[11px] bg-red-100 text-red-700">
                    -11.4%
                  </div>
                </div>
              </div>
              <div className=" bg-white border-[#f1d1d1] shadow-sm  px-5 py-5 rounded-[10px]">
                <div className="bg-[#f6f6f6] p-2 rounded-[10px] w-[fit-content]">
                  <GiMoneyStack className="text-[#787878] text-[2em]" />
                </div>
                <div className="mt-2 font-[700] text-2xl">$2,000</div>
                <div className="flex items-center justify-between">
                  <div className="sm:text-[sm] text-[11px] text-[#787878]">
                    Total Tips Price
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 mt-5">
            <div className="flex items-center justify-between">
              <h1 className="text-[19px] font-[600] text-black ">
                Recently Added Tips
              </h1>
              <button className="text-white text-sm px-4 py-2 bg-amber-400 rounded-[10px] shadow-sm flex items-center gap-1">
                <span>
                  {" "}
                  <IoAdd />
                </span>{" "}
                <span>Add New Tips</span>
              </button>
            </div>
            <input
              type="text"
              name="first-name"
              placeholder="search game by title"
              class="block w-[300px] mt-3 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-amber-200 sm:text-sm/6"
            />
            <div className="mt-5 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-6">
              <div>
                <ItemManage />
              </div>
              <div>
                <ItemManage />
              </div>
              <div>
                <ItemManage />
              </div>
              <div>
                <ItemManage />
              </div>
              <div>
                <ItemManage />
              </div>
              <div>
                <ItemManage />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Tips;
