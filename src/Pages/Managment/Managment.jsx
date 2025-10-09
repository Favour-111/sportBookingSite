import React, { useContext, useState } from "react";
import { ShopContext } from "../../components/shopContext";
import { BsCartCheck } from "react-icons/bs";
import { TbUsers } from "react-icons/tb";

import { GiMoneyStack } from "react-icons/gi";
import { MdTipsAndUpdates } from "react-icons/md";
import Funds from "../../components/Funds/Funds";

import SideBar from "../../components/SideBar/SideBar";
import LineChart from "../../components/Charts/Line";

const Managment = () => {
  const [open, setOpen] = useState(false);
  const { isDarkMode, compareUser, fetchUser } = useContext(ShopContext);
  return (
    <div className={`${isDarkMode ? "dark" : ""} dark:bg-[var(--default)] `}>
      <SideBar setOpen={setOpen} />
      <div>
        <div className="px-6 pt-25">
          <div className="text-3xl text-[#2c2c2c] font-bold dark:text-[#fff]">
            Welcome back, Admin!
          </div>
          <p className="text-sm text-[#787878] dark:text-[#d3d3d3] mt-2">
            Manage your platform efficiently monitor users, update content, and
            keep everything running smoothly.
          </p>

          <h1 className="text-[14px] font-[600] dark:text-[#d3d3d3] mt-5">
            Quick Statistics
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 flex-wrap items-center gap-y-10 gap-0 mt-3">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-[#ebeeff] text-white flex items-center justify-center rounded-[10px]">
                <TbUsers className="text-[#6e81f0] text-[20px]" />
              </div>
              <div>
                <div className="font-[500] text-[14px] dark:text-[#f1f1f1]">
                  Users
                </div>
                <div className="text-[#787878] text-[12px] font-[400] dark:text-[#d3d3d3]">
                  16
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-[#e1f0f3] text-white flex items-center justify-center rounded-[10px]">
                <MdTipsAndUpdates className="text-[#2c8394] text-[20px]" />
              </div>
              <div>
                <div className="font-[500] text-[14px] dark:text-[#f1f1f1]">
                  Tips
                </div>
                <div className="text-[#787878] text-[12px] font-[400] dark:text-[#d3d3d3]">
                  3
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-[#ffecea] text-white flex items-center justify-center rounded-[10px]">
                <BsCartCheck className="text-[#ff584e] text-[20px]" />
              </div>
              <div>
                <div className="font-[500] text-[14px] dark:text-[#f1f1f1]">
                  Purchases
                </div>
                <div className="text-[#787878] text-[12px] font-[400] dark:text-[#d3d3d3]">
                  5
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-[#e4f6f3] text-white flex items-center justify-center rounded-[10px]">
                <GiMoneyStack className="text-[#03a791] text-[20px]" />
              </div>
              <div>
                <div className="font-[500] text-[14px] dark:text-[#f1f1f1]">
                  Revenue
                </div>
                <div className="text-[#787878] text-[12px] font-[400] dark:text-[#d3d3d3]">
                  $118
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center flex-wrap justify-between p-10">
          <div className="w-[100%] sm:w-[48%]">
            <LineChart />
          </div>
          <div className="w-[100%] sm:w-[48%]">ss</div>
        </div>
        <Funds open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Managment;
