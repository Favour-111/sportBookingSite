import React, { useContext } from "react";
import { IoTrendingUp } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { ShopContext } from "./shopContext";

const Item = () => {
  const { compareUser } = useContext(ShopContext);
  return (
    <div>
      <div className="border-1 p-5 border-gray-100 dark:border-gray-600  rounded-[15px] w-[100%] h-[fit-content] flex flex-col  gap-2 cursor-pointer hover:shadow-lg shadow-sm duration-200">
        <div className="flex  justify-between">
          <h1 className="font-[600] text-[18px] dark:text-[white] w-[80%]">
            Manchester Untied vs Asernal
          </h1>
          <div className="text-green-700 dark:text-green-400 font-bold text-[20px]">
            $20
          </div>
        </div>
        <div className="text-sm font-[500] text-[tomato]">Over 2.5 Goal</div>
        <div>
          <div className="flex items-center gap-1 text-sm text-green-500 ">
            <IoTrendingUp />
            <div>odds:1.85 +</div>
          </div>
        </div>
        <div>
          <div className="bg-[#f1f1f1]  p-2 rounded-[10px] text-[13px] text-[#787878]">
            5h 59min remaining
          </div>
          <div className="text-[12px] text-[orangered] dark:text-[tomato] opacity-80 mt-2 dark:opacity-100">
            Available on : Bet9ja SportyBet BetFair
          </div>
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
            <br />${compareUser?.availableBalance.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
