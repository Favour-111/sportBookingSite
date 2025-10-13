import React, { useContext, useState, useEffect } from "react";
import { IoTrendingUp } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { ShopContext } from "./shopContext";
import { LuUsers } from "react-icons/lu";
const Item = () => {
  const { compareUser } = useContext(ShopContext);

  // Example of total value and current value
  const totalValue = 20; // This could be dynamic, e.g., 20, 40, etc.
  const currentValue = 5; // This could be dynamic as well, representing progress

  const progress = (currentValue / totalValue) * 100; // Calculate percentage

  return (
    <div>
      <div className="border-1 p-5 border-gray-100 dark:border-gray-600 rounded-[15px] w-[100%] h-[fit-content] flex flex-col gap-2 cursor-pointer hover:shadow-lg shadow-sm duration-200">
        <div className="flex justify-between">
          <h1 className="font-[600] text-[18px] dark:text-[white] w-[80%]">
            Manchester United vs Arsenal
          </h1>
          <div className="text-green-700 dark:text-green-400 font-bold text-[20px]">
            $20
          </div>
        </div>
        <div className="text-sm font-[500] text-[tomato]">Over 2.5 Goal</div>
        <div>
          <div className="flex items-center gap-1 text-sm text-green-500">
            <IoTrendingUp />
            <div>odds:1.85 +</div>
          </div>
        </div>
        <div>
          <div className="bg-[#f1f1f1] p-2 rounded-[10px] text-[13px] text-[#787878]">
            {Math.max(0, Math.floor(totalValue - currentValue))}h remaining
          </div>
          <div className="text-[12px] text-[orangered] dark:text-[tomato] opacity-80 mt-2 dark:opacity-100">
            Available on: Bet9ja, SportyBet, BetFair
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div>
              <LuUsers />
            </div>
            <div className="text-sm text-[#787878]">Purchase</div>
          </div>
          <div className="text-black text-sm">67/74</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 ">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${progress}%` }} // Dynamic width based on current/total value
          />
        </div>

        <div className="flex items-center justify-between mt-3">
          <button
            className="buy-btn"
            // className="w-[80%] bg-[var(--Primary)] text-white flex items-center justify-center gap-2 p-[10px] rounded text-[12px]"
          >
            <MdOutlineAddShoppingCart className="dark:text-white" />{" "}
            <div className="dark:text-white">Buy Bet Now</div>
          </button>
          <div className="text-[#787878] dark:text-[#b6b6b6] text-[12px] text-center">
            your bal:
            <br />${compareUser?.availableBalance.toLocaleString() || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
