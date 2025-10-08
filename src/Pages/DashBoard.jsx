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
import { BiRefresh } from "react-icons/bi";

const DashBoard = () => {
  const [page, setPage] = useState("live");
  const [open, setOpen] = useState(false);
  const { isDarkMode, compareUser, fetchUser } = useContext(ShopContext);
  return (
    <div className={`${isDarkMode ? "dark" : ""} dark:bg-[var(--default)] `}>
      <NavBar setOpen={setOpen} />
      <div>
        <div className="px-6 pt-25">
          <div className="text-3xl text-[#2c2c2c] font-bold dark:text-[#fff]">
            Welcome back{" "}
            <span className="text-[var(--Primary)]">
              {compareUser?.userName}
            </span>
            !{" "}
          </div>
          <p className="text-sm text-[#787878] dark:text-[#d3d3d3] mt-2">
            Ready to make some winning bets? Check out our latest
            recommendations below.
          </p>

          <h1 className="text-[14px] font-[600] dark:text-[#d3d3d3] mt-5">
            Statistics
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 flex-wrap items-center gap-y-10 gap-0 mt-3">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-[#ebeeff] text-white flex items-center justify-center rounded-[10px]">
                <RiShoppingCart2Line className="text-[#6e81f0] text-[20px]" />
              </div>
              <div>
                <div className="font-[500] text-[14px] dark:text-[#f1f1f1]">
                  Purchases
                </div>
                <div className="text-[#787878] text-[12px] font-[400] dark:text-[#d3d3d3]">
                  {compareUser?.totalBetsBought}
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-[#e1f0f3] text-white flex items-center justify-center rounded-[10px]">
                <BsGraphUpArrow className="text-[#2c8394] text-[20px]" />
              </div>
              <div>
                <div className="font-[500] text-[14px] dark:text-[#f1f1f1]">
                  success Rate
                </div>
                <div className="text-[#787878] text-[12px] font-[400] dark:text-[#d3d3d3]">
                  3%
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-[#ffecea] text-white flex items-center justify-center rounded-[10px]">
                <FaCoins className="text-[#ff584e] text-[20px]" />
              </div>
              <div>
                <div className="font-[500] text-[14px] dark:text-[#f1f1f1]">
                  Total Spent
                </div>
                <div className="text-[#787878] text-[12px] font-[400] dark:text-[#d3d3d3]">
                  ${compareUser?.totalMoneySpent}
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-[#e4f6f3] text-white flex items-center justify-center rounded-[10px]">
                <MdOutlineTipsAndUpdates className="text-[#03a791] text-[20px]" />
              </div>
              <div>
                <div className="font-[500] text-[14px] dark:text-[#f1f1f1]">
                  Active Tips
                </div>
                <div className="text-[#787878] text-[12px] font-[400] dark:text-[#d3d3d3]">
                  3
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between px-5 md:px-6 mt-15">
          <div className="w-[100%] md:w-[23%] border border-[#eaeaea] h-[fit-content] dark:border-zinc-600 dark:bg-[#1b2336] px-6 py-5 rounded-[10px] ">
            <h1 className="text-[20px] text-[#282828] font-[600] dark:text-[#fff] mb-3 flex items-center gap-2">
              <div className="bg-[tomato] text-white p-2 rounded-[10px]">
                <IoWalletOutline />{" "}
              </div>
              Your wallet
            </h1>
            <div className="flex flex-col gap-2 items-center dark:bg-[#1b273c] bg-[#f1f1f1] py-4 rounded-[10px] mt-6">
              <p className="text-[13px] text-[#787878] dark:text-[#d3d3d3]">
                Available balance
              </p>
              <div className="flex items-center gap-1 ">
                <button
                  onClick={() => fetchUser()}
                  className="dark:text-white text-[25px]"
                >
                  <BiRefresh />
                </button>
                <h1 className="text-2xl dark:text-white font-[700]">
                  ${compareUser?.availableBalance.toLocaleString()}
                </h1>
              </div>
              <div className="bg-green-100 w-[fit-content] text-[12px] px-2 rounded text-[#3a3a3a]">
                Active account
              </div>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="text-sm flex gap-1 items-center justify-center mt-3 p-2.5 rounded-[10px] w-[100%] bg-green-500 text-white"
            >
              <div>
                {" "}
                <IoAdd />{" "}
              </div>
              Add Funds
            </button>
            <div className="flex items-center justify-between">
              <h1 className="mt-3 text-[13px] dark:text-[#f1f1f1] text-[#787878]">
                Recent Activity
              </h1>
              <h1 className="mt-3 text-[11px] text-blue-500 flex items-center gap-1 cursor-pointer">
                View All <GoArrowRight />{" "}
              </h1>
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <div className="bg-[#f7f7f7] rounded-[10px] dark:bg-[#1b273c] py-4 px-3 flex gap-4 items-center justify-between ">
                <div className="w-[15%]">
                  <div className="bg-red-100 p-2 rounded-[5px]">
                    <LuTrendingDown className="text-red-600" />
                  </div>
                </div>
                <div className="w-[85%]">
                  <div>
                    <div className="text-[16px] font-[600] text-red-600 mt-2">
                      $15.5
                    </div>
                    <div className="text-[13px] font-[500] dark:text-[#fff]">
                      Purchased: Chelsea vs Liverpool - Both Teams to Score
                    </div>
                    <div className="dark:text-[#d3d3d3] text-[12px] font-light">
                      2025-10-06T13:46:41.453
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#f7f7f7] rounded-[10px] dark:bg-[#1b273c] py-4 px-3 flex gap-4 items-center justify-between ">
                <div className="w-[15%]">
                  <div className="bg-red-100 p-2 rounded-[5px]">
                    <LuTrendingDown className="text-red-600" />
                  </div>
                </div>
                <div className="w-[85%]">
                  <div>
                    <div className="text-[16px] font-[600] text-red-600 mt-2">
                      $15.5
                    </div>
                    <div className="text-[13px] font-[500] dark:text-[#fff]">
                      Purchased: Chelsea vs Liverpool - Both Teams to Score
                    </div>
                    <div className="dark:text-[#d3d3d3] text-[12px] font-light">
                      2025-10-06T13:46:41.453
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#f7f7f7] rounded-[10px] dark:bg-[#1b273c] py-4 px-3 flex gap-4 items-center justify-between ">
                <div className="w-[15%]">
                  <div className="bg-red-100 p-2 rounded-[5px]">
                    <LuTrendingDown className="text-red-600" />
                  </div>
                </div>
                <div className="w-[85%]">
                  <div>
                    <div className="text-[16px] font-[600] text-red-600 mt-2">
                      $15.5
                    </div>
                    <div className="text-[13px] font-[500] dark:text-[#fff]">
                      Purchased: Chelsea vs Liverpool - Both Teams to Score
                    </div>
                    <div className="dark:text-[#d3d3d3] text-[12px] font-light">
                      2025-10-06T13:46:41.453
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] md:mt-0 mt-10 md:w-[75%]">
            <div className="w-[100%] bg-[#f1f1f1] dark:bg-[#222a3a] rounded-[10px] p-1 flex gap-1 items-center justify-between">
              <button
                onClick={() => setPage("live")}
                className={`w-[50%]  text-[12px] rounded-[10px] h-10 flex items-center justify-center dark:bg-[#222a3a] dark:text-[#d3d3d3] cursor-pointer ${
                  page === "live" ? "bg-[#e2e2e2] dark:bg-[var(--default)]" : ""
                }`}
              >
                Live Recommendations
              </button>
              <button
                onClick={() => setPage("purchase")}
                className={`w-[50%]  text-[12px] rounded-[10px] h-10 flex items-center justify-center dark:bg-[#222a3a] dark:text-[#d3d3d3] cursor-pointer ${
                  page === "purchase"
                    ? "bg-[#e2e2e2] dark:bg-[var(--default)]"
                    : ""
                }`}
              >
                My Purchases
              </button>
            </div>
            {page === "live" ? (
              <div className="mt-5 ">
                <h1 className="text-2xl font-bold dark:text-[#f1f1f1]">
                  🏆 Live Recommendations
                </h1>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                  <div>
                    <Item />
                  </div>
                  <div>
                    <Item />
                  </div>
                  <div>
                    <Item />
                  </div>
                  <div>
                    <Item />
                  </div>
                  <div>
                    <Item />
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-5 ">
                <h1 className="text-2xl font-bold dark:text-[#f1f1f1] flex items-center gap-2">
                  <div>
                    <TbShoppingCartStar />
                  </div>{" "}
                  My Purchase
                </h1>

                <div className="flex flex-col gap-3 mt-5">
                  <div className="p-4 rounded-[10px] border border-[#eaeaea] dark:border-zinc-600 dark:bg-[#1b2336]">
                    <div className="flex items-center justify-between">
                      <h1 className="font-[700] dark:text-[#f1f1f1]">
                        Lakers vs Addidas
                      </h1>
                      <div>
                        <div className="text-[12px] font-[400] flex items-center gap-1 dark:text-[#f1f1f1] dark:bg-[#222a3a] bg-[#f1f1f1] rounded px-1 py-[3px] text-[#787878] dark:text-[#d3d3d3]">
                          <div>
                            <IoCheckmarkCircleOutline className="text-green-400" />
                          </div>{" "}
                          successful
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-20 mt-4">
                      <div className="text-[12px] font-[500] flex items-center gap-2 text-[#787878] dark:text-[#d3d3d3]">
                        Price
                        <span className="font-[600] text-[14px] text-[black] dark:text-[white]">
                          $15.00
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#f1f1f1] p-3 rounded-[10px] text-[13px] text-[#787878] dark:text-[#d3d3d3] dark:bg-[#222a3a] mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Aspernatur quae voluptas similique culpa perferendis.
                      Inventore illo ullam maxime accusantium libero?
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-5">
                  <div className="p-4 rounded-[10px] border border-[#eaeaea] dark:border-zinc-600 dark:bg-[#1b2336]">
                    <div className="flex items-center justify-between">
                      <h1 className="font-[700] dark:text-[#f1f1f1]">
                        Lakers vs Addidas
                      </h1>
                      <div>
                        <div className="text-[12px] font-[400] flex items-center gap-1 dark:text-[#f1f1f1] dark:bg-[#222a3a] bg-[#f1f1f1] rounded px-1 py-[3px] text-[#787878] dark:text-[#d3d3d3]">
                          <div>
                            <IoCheckmarkCircleOutline className="text-green-400" />
                          </div>{" "}
                          successful
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-20 mt-4">
                      <div className="text-[12px] font-[500] flex items-center gap-2 text-[#787878] dark:text-[#d3d3d3]">
                        Price
                        <span className="font-[600] text-[14px] text-[black] dark:text-[white]">
                          $15.00
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#f1f1f1] p-3 rounded-[10px] text-[13px] text-[#787878] dark:text-[#d3d3d3] dark:bg-[#222a3a] mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Aspernatur quae voluptas similique culpa perferendis.
                      Inventore illo ullam maxime accusantium libero?
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Funds open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default DashBoard;
