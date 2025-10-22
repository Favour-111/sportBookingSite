import React, { useContext, useState } from "react";
import { ShopContext } from "../../components/shopContext";
import { BsCartCheck } from "react-icons/bs";
import { TbUsers } from "react-icons/tb";

import { GiMoneyStack } from "react-icons/gi";
import { MdCardTravel, MdTipsAndUpdates } from "react-icons/md";
import Funds from "../../components/Funds/Funds";

import LineChart from "../../components/Charts/Line";
import BarChat from "../../components/Charts/Bar";
import ItemManage from "./ItemManage";
import Footer from "./Footer";
import Sidebar from "./SideBar";
import TopBar from "./TopBar";

const Managment = () => {
  const [open, setOpen] = useState(false);
  const { isDarkMode, allUser, games, gameLoad, fetchUser } =
    useContext(ShopContext);
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
          <div className="px-4 sm:px-6 pt-5">
            <div className="text-3xl text-[#2c2c2c] font-bold dark:text-[#fff]">
              Welcome back, Admin!
            </div>
            <p className="text-sm text-[#787878] dark:text-[#d3d3d3] mt-2">
              Manage your platform efficiently monitor users, update content,
              and keep everything running smoothly.
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
                    {allUser?.length || 0}
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
                    {games?.length || 0}
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

          <div className="flex items-center flex-wrap justify-between px-4 sm:px-6 gap-y-10 mt-10">
            <div className="w-[100%]   shadow shadow-[0, 10px, 10px, #000] p-5">
              <h1 className="text-[18px] font-[500] flex items-center gap-2 dark:text-white">
                <GiMoneyStack /> <div>Revenue Overview</div>
              </h1>
              <h1 className="text-[13px] text-[#787878] dark:text-[#d3d3d3]">
                Weekly Revenue Insights
              </h1>
              <p className="text-[11px] text-[#787878] mt-1 dark:text-[#d3d3d3]">
                {" "}
                Total revenue generated over the past week. This metric tracks
                how much income your business has earned during this period.
              </p>
              <LineChart />
            </div>
          </div>
          <div className="mt-10 px-4 sm:px-6">
            <h1 className="text-[#333333] font-[700] text-lg  capitalize">
              recently added tips
            </h1>
            {gameLoad ? (
              <div className="h-150 gap-2 flex flex-col items-center justify-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="text-sm">Loading...</div>
              </div>
            ) : games.length <= 0 ? (
              <div className="flex justify-center items-center flex-col gap-3">
                <div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2039/2039083.png"
                    alt=""
                    width={100}
                  />
                </div>
                <div className="text-center text-20 text-gray-500">
                  No Games available
                </div>
              </div>
            ) : (
              <div className="mt-5 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                {games.map((item) => {
                  return (
                    <div key={item._id}>
                      <ItemManage item={item} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Managment;
