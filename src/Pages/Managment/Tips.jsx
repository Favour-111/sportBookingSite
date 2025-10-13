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
import { IoAdd, IoClose } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";

const Tips = () => {
  const [open, setOpen] = useState(false);
  const [addTipModal, setAddTipModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    tipTitle: "",
    tipPrice: "",
    bettingType: "",
    oddRatio: "",
    bettingSites: "", // assuming an array of betting sites
    confidenceLevel: "", // you could also use Number if it's a rating
    contentAfterPurchase: "",
    duration: "", // assuming duration is in minutes or hours
    purchaseLimit: "",
    active: false,
  });
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const { isDarkMode, games, gameLoad, fetchAllGames } =
    useContext(ShopContext);
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };
  const SubmitForm = async () => {
    try {
      setLoading(true);
      if (
        form.tipPrice === "" ||
        form.tipTitle === "" ||
        form.oddRatio === "" ||
        form.bettingType === "" ||
        form.confidenceLevel === "" ||
        form.contentAfterPurchase === "" ||
        form.duration === ""
      ) {
        toast.error("inputs are required");
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API}/api/games/add`,
          form
        );
        if (response) {
          setMessage(true);
          setError(false);
          fetchAllGames();
          // toast.success("tips has been successfully added");
        } else {
          setError(true);
          setMessage(false);
          // toast.error("error adding tips");
        }
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setMessage(false);
    } finally {
      setLoading(false);
    }
  };
  console.log(games);

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
            <h1 className="font-[600] text-[20px] text-[#545160] ">
              Tips Management
            </h1>
            <div className="grid md:grid-cols-4 grid-cols-2  items-center gap-3  mt-5">
              <div className=" bg-white border-[#f1d1d1] shadow-sm  px-5 py-5 rounded-[10px]">
                <div className="bg-[#f6f6f6] p-2 rounded-[10px] w-[fit-content]">
                  <MdTipsAndUpdates className="text-[#787878] text-[2em]" />
                </div>
                <div className="mt-2 font-[700] text-2xl">{games.length}</div>
                <div className="flex items-center justify-between">
                  <div className="sm:text-[sm] text-[11px] text-[#787878]">
                    Total Tips
                  </div>
                  <div className="rounded-full p-1 text-[11px] bg-green-100 text-green-700">
                    +11.4%
                  </div>
                </div>
              </div>
              <div className="bg-white border-[#f1d1d1] shadow-sm px-5 py-5 rounded-[10px]">
                <div className="bg-[#f6f6f6] p-2 rounded-[10px] w-[fit-content]">
                  <TbRadioactive className="text-[#787878] text-[2em]" />
                </div>
                <div className="mt-2 font-[700] text-2xl">
                  {games.filter((item) => item.active === true).length || 0}
                </div>
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
                <div className="mt-2 font-[700] text-2xl">
                  {games.filter((item) => item.active === false).length || 0}
                </div>
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
                <div className="mt-2 font-[700] text-2xl">
                  $
                  {games
                    .reduce((total, item) => total + item.tipPrice, 0)
                    .toLocaleString()}
                </div>
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
              <h1 className="font-[600] text-[20px] text-[#545160]">
                Recently Added Tips
              </h1>
              <button
                onClick={() => setAddTipModal(true)}
                className="text-white text-[12px] px-4 py-2 bg-amber-400 rounded-[10px] shadow-sm flex items-center gap-1"
              >
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
              placeholder="Search game by title"
              class="placeholder:text-[13px] block w-[100%] sm:w-[300px] mt-4 rounded-[10px] bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-100 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-amber-200 sm:text-sm/6"
            />
            {gameLoad ? (
              <div className="h-100 gap-2 flex flex-col items-center justify-center">
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

          {/* //modal */}
          {addTipModal && (
            <div className="p-5 flex items-center justify-center fixed backdrop-blur-sm top-0 right-0 bottom-0 left-0 z-100000 bg-[#000000a5]">
              <div className="h-[fit-content] relative rounded-[10px] bg-white shadow-sm p-5 w-[550px]">
                <h1 className="text-[20px] font-[600]">Add a new tips</h1>
                <div className="mt-4">
                  <div className="grid gap-2 grid-cols-2">
                    <div>
                      <label htmlFor="" className="text-[#787878] text-sm">
                        Tip Title
                      </label>
                      <input
                        placeholder="input tip title"
                        type="text"
                        name="tipTitle"
                        onChange={handleInput}
                        class="placeholder:text-[12px] block w-[100%] mt-1 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-amber-200 sm:text-sm/6"
                      />
                    </div>

                    <div>
                      <label htmlFor="" className="text-[#787878] text-sm">
                        Tip Price
                      </label>
                      <input
                        name="tipPrice"
                        type="text"
                        onChange={handleInput}
                        placeholder="input tips price"
                        class="placeholder:text-[12px] block  w-[100%]  mt-1 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-amber-200 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div className="mt-3 grid gap-2 grid-cols-2">
                    <div>
                      <label htmlFor="" className="text-[#787878] text-sm">
                        Odd Ratio
                      </label>
                      <input
                        placeholder="input Odd Ratio "
                        type="text"
                        name="oddRatio"
                        onChange={handleInput}
                        class="placeholder:text-[12px] block w-[100%] mt-1 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-amber-200 sm:text-sm/6"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="text-[#787878] text-sm">
                        Purchase Limit
                      </label>
                      <input
                        type="number"
                        name="purchaseLimit"
                        onChange={handleInput}
                        placeholder="Purchase limit"
                        class="placeholder:text-[12px] block  w-[100%]  mt-1 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-amber-200 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div className="mt-3 grid gap-2 grid-cols-2">
                    <div>
                      <label htmlFor="" className="text-[#787878] text-sm">
                        Betting Sites
                      </label>
                      <input
                        name="bettingSites"
                        placeholder="input betting sites "
                        type="text"
                        onChange={handleInput}
                        class="placeholder:text-[12px] block w-[100%] mt-1 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-amber-200 sm:text-sm/6"
                      />
                    </div>

                    <div>
                      <label htmlFor="" className="text-[#787878] text-sm">
                        bettingType
                      </label>
                      <input
                        placeholder="input betting type"
                        type="text"
                        name="bettingType"
                        onChange={handleInput}
                        class="placeholder:text-[12px] block w-[100%] mt-1 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-amber-200 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div className="mt-3 grid gap-2 grid-cols-2">
                    <div>
                      <label htmlFor="" className="text-[#787878] text-sm">
                        Confidence Level
                      </label>
                      <input
                        name="confidenceLevel"
                        placeholder="input no from 1-5 "
                        type="number"
                        onChange={handleInput}
                        class="placeholder:text-[12px] block w-[100%] mt-1 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-amber-200 sm:text-sm/6"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="text-[#787878] text-sm">
                        Duration
                      </label>
                      <input
                        type="number"
                        name="duration"
                        onChange={handleInput}
                        placeholder="Set time limit"
                        class="placeholder:text-[12px] block  w-[100%]  mt-1 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-amber-200 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="" className="text-[#787878] text-sm mt-3">
                      Content after purchase
                    </label>
                    <textarea
                      name="contentAfterPurchase"
                      onChange={handleInput}
                      class="placeholder:text-[12px] block resize-none h-20 w-[100%]  mt-1 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-amber-200 sm:text-sm/6"
                      id=""
                      placeholder="contents to be displayed after purchase"
                    ></textarea>
                  </div>
                  <div className="flex items-center justify-end mt-5 gap-3">
                    <button
                      onClick={() => setAddTipModal(false)}
                      className="text-[#787878] bg-[#f6f6f6] rounded p-2 text-sm hover:bg-[#d3d3d3] duration-200"
                    >
                      Discard
                    </button>
                    <button
                      onClick={() => SubmitForm()}
                      className="text-green-800 bg-green-100 rounded p-2 text-sm hover:bg-[#d3d3d3] duration-200"
                    >
                      {loading ? "loading....." : " Add Tips"}
                    </button>
                  </div>
                  {message && (
                    <p className="text-[12px] text-green-500 ">
                      Tips has been successfully added
                    </p>
                  )}
                  {error && (
                    <p className="text-[12px] text-red-500">
                      Error adding tips try again
                    </p>
                  )}
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => setAddTipModal(false)}
                      className="p-3"
                    >
                      <IoClose className="text-black" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Tips;
