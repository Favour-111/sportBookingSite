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

const Tips = () => {
  const [open, setOpen] = useState(false);
  const [addTipModal, setAddTipModal] = useState(false);
  const { isDarkMode, compareUser, fetchUser } = useContext(ShopContext);
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
                <div className="mt-2 font-[700] text-2xl">120</div>
                <div className="flex items-center justify-between">
                  <div className="sm:text-[sm] text-[11px] text-[#787878]">
                    Total Tips
                  </div>
                  <div className="rounded-full p-1 text-[11px] bg-green-100 text-green-700">
                    +11.4%
                  </div>
                </div>
              </div>
              <div className=" bg-white border-[#f1d1d1] shadow-sm  px-5 py-5 rounded-[10px]">
                <div className="bg-[#f6f6f6] p-2 rounded-[10px] w-[fit-content]">
                  <TbRadioactive className="text-[#787878] text-[2em]" />
                </div>
                <div className="mt-2 font-[700] text-2xl">120</div>
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
                <div className="mt-2 font-[700] text-2xl">120</div>
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
                <div className="mt-2 font-[700] text-2xl">$2,000</div>
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
            <div className="mt-5 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-6">
              <div>
                <ItemManage />
              </div>
              <div>
                <ItemManage />
              </div>
              <div>
                <ItemManage />
              </div>
              <div>
                <ItemManage />
              </div>
              <div>
                <ItemManage />
              </div>
              <div>
                <ItemManage />
              </div>
            </div>
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
                        class="placeholder:text-[12px] block w-[100%] mt-1 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-amber-200 sm:text-sm/6"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="text-[#787878] text-sm">
                        Tip Price
                      </label>
                      <input
                        type="text"
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
                        class="placeholder:text-[12px] block w-[100%] mt-1 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-amber-200 sm:text-sm/6"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="text-[#787878] text-sm">
                        Purchase Limit
                      </label>
                      <input
                        type="number"
                        placeholder="Purchase limit"
                        class="placeholder:text-[12px] block  w-[100%]  mt-1 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-amber-200 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="" className="text-[#787878] text-sm">
                      Betting Sites
                    </label>
                    <input
                      placeholder="input Odd Ratio "
                      type="text"
                      class="placeholder:text-[12px] block w-[100%] mt-1 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-amber-200 sm:text-sm/6"
                    />
                  </div>
                  <div className="mt-3 grid gap-2 grid-cols-2">
                    <div>
                      <label htmlFor="" className="text-[#787878] text-sm">
                        Confidence Level
                      </label>
                      <input
                        placeholder="input no from 1-5 "
                        type="number"
                        class="placeholder:text-[12px] block w-[100%] mt-1 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-amber-200 sm:text-sm/6"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="text-[#787878] text-sm">
                        Duration
                      </label>
                      <input
                        type="number"
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
                      name=""
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
                    <button className="text-green-800 bg-green-100 rounded p-2 text-sm hover:bg-[#d3d3d3] duration-200">
                      Add Tips
                    </button>
                  </div>
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
