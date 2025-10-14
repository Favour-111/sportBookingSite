import React, { useContext, useState, useEffect } from "react";
import { IoTrendingUp } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { ShopContext } from "./shopContext";
import { LuUsers } from "react-icons/lu";
import { CiLock, CiWarning } from "react-icons/ci";
import toast from "react-hot-toast";
import Login from "./Login/Login";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
const Item = ({ item, setForm, Bal, setOpens }) => {
  const [open, setOpen] = useState(true);
  const { compareUser, user, updateBalance } = useContext(ShopContext);
  const active = true;
  // Example of total value and current value
  const totalValue = item?.purchaseLimit; // This could be dynamic, e.g., 20, 40, etc.
  const currentValue = item?.CurrentLimit; // This could be dynamic as well, representing progress
  // const [form, setForm] = useState(false);
  const progress = (currentValue / totalValue) * 100; // Calculate percentage
  const handleBuyBet = () => {
    if (!user) {
      setForm(true);
    } else {
      // Check if the user has sufficient balance
      const amountToSubtract = item?.tipPrice;

      if (compareUser?.availableBalance < amountToSubtract) {
        setOpen(true);
      } else {
        // If balance is sufficient, update the balance
        updateBalance(amountToSubtract);
        toast.success("Bet purchased successfully!");
      }
    }
  };

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
            onClick={handleBuyBet}
            // className="w-[80%] bg-[var(--Primary)] text-white flex items-center justify-center gap-2 p-[10px] rounded text-[12px]"
          >
            <MdOutlineAddShoppingCart className="dark:text-white" />{" "}
            <div className="dark:text-white">Buy Bet Now</div>
          </button>
        </div>
        {/* // If balance is insufficient, show an error message */}
        <Dialog open={open} onClose={setOpen} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <CiWarning className="size-6 text-red-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        Insufficient Balance
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          You do not have enough balance to make this purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setOpens(true);
                    }}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Add Funds
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Item;
