import React, { useContext, useState, useEffect } from "react";
import { IoTrendingUp } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { ShopContext } from "./shopContext";
import { LuUsers } from "react-icons/lu";
import { CiLock } from "react-icons/ci";
import toast from "react-hot-toast";
import Login from "./Login/Login";
const Item = ({ item, setForm, Bal }) => {
  const { compareUser, user } = useContext(ShopContext);
  const active = true;
  // Example of total value and current value
  const totalValue = item?.purchaseLimit; // This could be dynamic, e.g., 20, 40, etc.
  const currentValue = item?.CurrentLimit; // This could be dynamic as well, representing progress
  // const [form, setForm] = useState(false);
  const progress = (currentValue / totalValue) * 100; // Calculate percentage

  return (
    <div>
      <div className="border-1 p-5 border-gray-100 dark:border-gray-600 rounded-[15px] w-[100%] h-[fit-content] flex flex-col gap-2 cursor-pointer hover:shadow-lg shadow-sm duration-200">
        <div className="flex justify-between">
          <h1 className="font-[600] text-[18px] dark:text-[white] w-[80%]">
            {item?.tipTitle}
          </h1>
          <div className="text-green-700 dark:text-green-400 font-bold text-[20px]">
            ${item?.tipPrice}
          </div>
        </div>
        {active ? (
          <div className=" text-red-400 flex items-center gap-1">
            <div>
              <CiLock />
            </div>
            <div className="text-[12px] font-500">Buy game to unlock</div>
          </div>
        ) : (
          <div className="text-sm font-[500] text-[tomato] ">
            {item?.bettingType}
          </div>
        )}

        <div>
          <div className="flex items-center gap-1 text-sm text-green-500">
            <IoTrendingUp />
            <div>odds: {item?.oddRatio} +</div>
          </div>
        </div>
        <div>
          <div className="bg-[#f1f1f1] p-2 rounded-[10px] text-[13px] text-[#787878]">
            {item?.duration}:00 hours remaining
          </div>
          <div className="text-[12px] text-[orangered] dark:text-[tomato] opacity-80 mt-2 dark:opacity-100">
            Available on : {item?.bettingSites}
          </div>
        </div>

        {/* Progress Bar */}
        {totalValue ? (
          <>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div>
                  <LuUsers />
                </div>
                <div className="text-sm text-[#787878]">Purchase</div>
              </div>
              <div className="text-black text-sm">
                {currentValue}/{totalValue}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 ">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${progress}%` }} // Dynamic width based on current/total value
              />
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="flex items-center justify-between mt-3">
          <button
            className="buy-btn"
            onClick={() => {
              if (!user) {
                setForm(true);
              } else {
                toast.success("bought");
              }
            }}
            // className="w-[80%] bg-[var(--Primary)] text-white flex items-center justify-center gap-2 p-[10px] rounded text-[12px]"
          >
            <MdOutlineAddShoppingCart className="dark:text-white" />{" "}
            <div className="dark:text-white">Buy Bet Now</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
