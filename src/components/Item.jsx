import React, { useContext, useState, useEffect } from "react";
import { IoCheckmarkSharp, IoTrendingUp } from "react-icons/io5";
import { MdCancel, MdOutlineAddShoppingCart } from "react-icons/md";
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
import axios from "axios";
import { FaStar } from "react-icons/fa6";

// Custom star icon component (use your own SVG or icon here)
const StarIcon = ({ filled }) => (
  <FaStar size={14} color={`${filled ? "gold" : "#f1f1f1"}`} />
);

const Item = ({ item, setForm, setOpens }) => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const { compareUser, user, balLoader, updateBalance, fetchAllGames } =
    useContext(ShopContext);
  const active = true;
  const totalValue = item?.purchaseLimit;
  const currentValue = item?.CurrentLimit;
  const progress = (currentValue / totalValue) * 100;

  console.log(item.createdAt);

  useEffect(() => {
    if (item?.createdAt && item?.duration) {
      const createdAt = new Date(item.createdAt);
      const endTime = createdAt.getTime() + item.duration * 60000;

      const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeLeft = endTime - currentTime;

        if (timeLeft <= 0) {
          clearInterval(interval);
          setRemainingTime("Game expired");

          // Trigger an action when time has elapsed
          handleTimeElapsed(); // Example of a function that performs an action when time is up
        } else {
          const minutes = Math.floor(timeLeft / 60000);
          const seconds = Math.floor((timeLeft % 60000) / 1000);
          setRemainingTime(`${minutes}m ${seconds}s`);

          // Check if there are 10 minutes or less remaining
          if (minutes <= 10) {
            setIsBlinking(true); // Start blinking effect
          } else {
            setIsBlinking(false); // Stop blinking
          }
        }
      }, 1000); // Update every second

      return () => clearInterval(interval);
    }
  }, [item]);

  // Example function to handle action when time has elapsed
  const handleTimeElapsed = async () => {
    // Trigger an action when time has elapsed
    toast.error("The game has expired!");

    // Example API call to deactivate the game
    try {
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/api/games/${
          item._id
        }/toggle-active`
      );
      toast(`${item.tipTitle} has ben deactivated`);
      fetchAllGames();
      console.log("Game deactivated after time expiration");
    } catch (error) {
      console.error("Error deactivating game:", error);
    }

    // Set isExpired to true so the UI reflects the change
    setIsExpired(true);
  };
  const handleBuyBet = async () => {
    if (!user) {
      setForm(true); // If not logged in, prompt the user to log in
    } else {
      const amountToSubtract = item?.tipPrice;

      if (compareUser?.availableBalance < amountToSubtract) {
        setOpen(true); // If balance is insufficient, open the "insufficient balance" modal
      } else {
        try {
          await updateBalance(amountToSubtract); // Deduct amount from balance

          const response = await axios.put(
            `${import.meta.env.VITE_REACT_APP_API}/api/games/${item._id}/buy`,
            { userId: compareUser?._id }
          );

          const response2 = await axios.put(
            `${import.meta.env.VITE_REACT_APP_API}/api/games/${
              item._id
            }/increment-current-limit`
          );

          if (response.status === 200 && response2.status === 200) {
            setOpenModal(true); // Open the success modal after a successful purchase

            // Create a bet entry for the history
            const betEntry = {
              gameId: item?._id,
              gameContent: item?.contentAfterPurchase,
              gameName: item?.tipTitle,
              gameDate: new Date(),
              tipPrice: item?.tipPrice,
              tipName: item.bettingType,
              tipOdd: item.oddRatio,
              status: item.status,
            };

            // Add bet entry to user's history
            const updateHistoryResponse = await axios.put(
              `${import.meta.env.VITE_REACT_APP_API}/api/auth/addBetHistory/${
                compareUser._id
              }`,
              betEntry
            );

            if (updateHistoryResponse.status === 200) {
              console.log("Bet added to history");
            } else {
              toast.error("Failed to update bet history");
            }
          } else {
            toast.error("Failed to purchase game");
          }
        } catch (error) {
          console.error("Error buying bet:", error);
          toast.error("An error occurred while purchasing the game");
        } finally {
          fetchAllGames();
        }
      }
    }
  };

  // Render stars based on confidenceLevel
  const renderStars = (confidenceLevel) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<StarIcon key={i} filled={i < confidenceLevel} />);
    }
    return stars;
  };

  return (
    <div>
      <div className="border-1 p-5 border-gray-100 dark:border-gray-600 rounded-[15px] w-[100%] h-[fit-content] flex flex-col gap-2 cursor-pointer hover:shadow-lg shadow-sm duration-200">
        <div className="flex justify-between">
          <h1 className="font-[600] text-[18px] text-start dark:text-[white] w-[80%]">
            {item?.tipTitle}
          </h1>
          <div className="text-green-700 dark:text-green-400 font-bold text-[20px]">
            ${item?.tipPrice}
          </div>
        </div>
        {/* Render the custom star rating */}
        <div className="flex gap-1 ">
          {renderStars(item?.confidenceLevel || 0)}
        </div>

        <div className=" text-red-400 flex items-center gap-1">
          <div>
            <CiLock />
          </div>
          <div className="text-[12px] font-500">Buy game to unlock</div>
        </div>

        <div>
          <div className="flex items-center gap-1 text-sm text-green-500">
            <IoTrendingUp />
            <div>odds: {item?.oddRatio} +</div>
          </div>
        </div>
        <div>
          <div
            className={`bg-[#f1f1f1] p-2 rounded-[10px] text-[11px] text-[#787878] ${
              isBlinking ? "blinking" : ""
            }`}
          >
            {remainingTime} : Minutes remaining
          </div>
          <div className="text-start text-[12px] text-[orangered] dark:text-[tomato] opacity-80 mt-2 dark:opacity-100">
            Available on : {item?.bettingSites}
          </div>
        </div>

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
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        ) : null}

        {!item?.purchasedBy.includes(user) && totalValue === currentValue ? (
          <button
            className=" mt-2 w-[100%] bg-red-100 rounded flex items-center gap-2 py-2 justify-center"
            onClick={() => toast.error("this game has been sold out")}
            disabled={balLoader}
          >
            <MdCancel className="dark:text-white text-red-600" />{" "}
            <div className="dark:text-white text-red-500 text-[12px]">
              Game is Sold out
            </div>
          </button>
        ) : (
          <div className="flex items-center justify-between mt-3">
            {!item?.purchasedBy.includes(user) ? (
              <button
                className="buy-btn"
                onClick={handleBuyBet}
                disabled={balLoader}
              >
                <MdOutlineAddShoppingCart className="dark:text-white" />{" "}
                <div className="dark:text-white">
                  {balLoader ? "Loading..." : "Buy Bet Now"}
                </div>
              </button>
            ) : null}
          </div>
        )}

        <Dialog open={open} onClose={setOpen} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity"
          />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <CiWarning className="size-6 text-red-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle className="text-base font-semibold text-gray-900">
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
                      setOpen(false); // Close insufficient balance modal
                      setOpens(true); // Prompt user to add funds (this may be your fund modal)
                    }}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Add Funds
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)} // Close modal
                    className="inline-flex w-full justify-center rounded-md bg-zinc-300 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-zinc-500 sm:ml-3 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>

        <Dialog
          open={openModal}
          onClose={setOpenModal}
          className="relative z-10"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity"
          />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                      <IoCheckmarkSharp className="size-6 text-green-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle className="text-base font-semibold text-gray-900">
                        Game Purchase Successful!
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Your game has been successfully purchased. You can now
                          access the game and start playing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={() => setOpenModal(false)}
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                  >
                    Go to Game
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenModal(false)} // Close the modal directly
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs"
                  >
                    Close
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
