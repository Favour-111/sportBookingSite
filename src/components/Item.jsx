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
  const [loader, setLoader] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const {
    compareUser,
    user,
    balLoader,
    updateBalance,
    fetchAllUser,
    fetchAllGames,
  } = useContext(ShopContext);
  const active = true;
  const totalValue = item?.purchaseLimit;
  const currentValue = item?.CurrentLimit;
  const progress = (currentValue / totalValue) * 100;

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
    // Step 1: Check if user is logged in
    if (!user) {
      setForm(true); // Show login form if not logged in
      return;
    }

    const amountToSubtract = item?.tipPrice;

    // Step 2: Check if the user has enough balance
    if (compareUser?.availableBalance < amountToSubtract) {
      setOpen(true); // Open the balance modal if funds are insufficient
      return;
    }

    try {
      setLoader(item._id);
      // Step 3: Deduct the bet price from the user's balance
      await updateBalance(amountToSubtract);

      // Step 4: Make the purchase request to the server
      const purchaseResponse = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/api/games/${item._id}/buy`,
        { userId: compareUser?._id }
      );

      // Step 5: Increment the current limit for the game (or perform other game-related updates)
      const incrementResponse = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/api/games/${
          item._id
        }/increment-current-limit`
      );

      // Step 6: Check if the purchase was successful and proceed with adding the bet history
      if (purchaseResponse.status === 200 && incrementResponse.status === 200) {
        // Add bet entry to the user's bet history
        const betEntry = {
          gameId: item?._id,
          gameContent: item?.contentAfterPurchase,
          gameName: item?.tipTitle,
          gameDate: new Date(),
          tipPrice: item?.tipPrice,
          tipName: item?.bettingType,
          tipOdd: item?.oddRatio,
          status: item?.status,
          image: item?.image,
        };

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

        // Step 7: Show the success modal after the purchase and bet history update
        setOpenModal(true); // Open the modal
      } else {
        toast.error("Failed to purchase game");
      }
    } catch (error) {
      console.error("Error buying bet:", error);
      toast.error("An error occurred while purchasing the game");
    } finally {
      setLoader(null);
      // Optionally, close the modal if it's open in case of error
      setOpenModal(true); // Open the success modal if needed
    }
  };

  useEffect(() => {
    console.log("Modal open state:", openModal);
  }, [openModal]);

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
                  <LuUsers className="dark:text-[#d3d3d3]" />
                </div>
                <div className="text-sm text-[#787878] dark:text-[#d3d3d3]">
                  Purchase
                </div>
              </div>
              <div className="text-black dark:text-[#d3d3d3] text-sm">
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
                disabled={loader}
              >
                {!loader && (
                  <MdOutlineAddShoppingCart className="dark:text-white" />
                )}

                <div className="dark:text-white">
                  {loader && (
                    <svg
                      aria-hidden="true"
                      role="status"
                      class="inline w-4 h-4 me-3 text-amber-100 animate-spin dark:text-amber-100"
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
                        fill="#f7b822"
                      />
                    </svg>
                  )}
                  {loader ? "Loading...." : "Buy Bet Now"}
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
                        Game Purchased Successfully
                      </DialogTitle>

                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          You have successfully purchased the game:{" "}
                          {item?.tipTitle}.
                        </p>
                      </div>

                      {/* Display relevant details */}
                      <div className="mt-2 flex items-center gap-1">
                        <p className="text-sm font-[600] text-gray-500">
                          Tip Price:{" "}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item?.tipPrice}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <p className="text-sm font-[600] text-gray-500">
                          Odd Ratio:{" "}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item?.oddRatio}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <p className="text-sm font-[600] text-gray-500">
                          Full Content:{" "}
                        </p>
                      </div>
                      <p className="text-sm mt-2 font-[700] text-green-600">
                        {item?.contentAfterPurchase}
                      </p>

                      {/* Other important instructions */}
                      <p className="mt-3 text-sm font-[600] text-gray-500 whitespace-nowrap">
                        ⚠ Important instructions:
                      </p>
                      <div className="mt-2 flex items-center gap-1">
                        <p>
                          🔃 Please Click continue then refresh page after
                          successful purchase
                        </p>
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <p>🎲 Place bet on betting site listed above</p>
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <p>🔒 This content is for your use only</p>
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <p>🧭 Navigate to My Purchase to see game status</p>
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <p>🚫 Do not share content with others</p>
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <p>
                          📞 For any issues or questions, please click the
                          support button to contact us{" "}
                          <a
                            href=""
                            className="text-sm font-[700] text-blue-700 underline"
                          >
                            Support
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenModal(false); // Close the modal
                      fetchAllGames(); // Refresh games list
                      fetchAllUser(); // Refresh user data (including balance)
                    }}
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                  >
                    Continue
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
