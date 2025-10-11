import React, { useContext, useState } from "react";
import { ShopContext } from "../../components/shopContext";
import { BsCartCheck } from "react-icons/bs";
import { TbRadioactive, TbUser, TbUsers } from "react-icons/tb";

import { GiMoneyStack } from "react-icons/gi";
import { MdBlock, MdCardTravel, MdTipsAndUpdates } from "react-icons/md";
import Funds from "../../components/Funds/Funds";

import LineChart from "../../components/Charts/Line";
import BarChat from "../../components/Charts/Bar";
import ItemManage from "./ItemManage";
import Footer from "./Footer";
import Sidebar from "./SideBar";
import TopBar from "./TopBar";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FiUsers } from "react-icons/fi";
import { PiTelegramLogoLight, PiUsersFourLight } from "react-icons/pi";

const BroadCast = () => {
  const [open, setOpen] = useState(false);
  const { isDarkMode, compareUser, fetchUser } = useContext(ShopContext);
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Alice Brown", email: "alice@example.com", role: "User" },
    { id: 4, name: "Bob Johnson", email: "bob@example.com", role: "Admin" },
  ];
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
          <div className=" mt-5 p-4">
            <h1 className="font-[700] text-[25px]">Broad cast a message</h1>
            <p className="mt-1 text-[#787878] text-sm">
              Here you can check and share messages with users
            </p>
            <div className="mt-10">
              <div className=" block justify-end md:flex items-center gap-10">
                <div>
                  <label htmlFor="" className="text-sm text-[#787878]">
                    Users
                  </label>
                  <br />
                  <select
                    name=""
                    className="border border-[#d3d3d3] p-2 rounded w-[100%] md:w-[200px] outline-none text-sm"
                    id=""
                  >
                    <option value="">All Users</option>
                    <option value="">Obaloluwa</option>
                    <option value="">Favour</option>
                  </select>
                </div>
                <div className=" mt-5 md:mt-0">
                  <label htmlFor="" className="text-sm text-[#787878]">
                    Message Visibility
                  </label>
                  <br />
                  <select
                    name=""
                    className="border border-[#d3d3d3] p-2 rounded w-[100%] md:w-[200px] outline-none text-sm"
                    id=""
                  >
                    <option value="">Visibility</option>
                    <option value="">Visible</option>
                    <option value="">Hidden</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="" className="text-sm text-[#787878] ">
                  Compose Message
                </label>
                <br />
                <textarea
                  name=""
                  className=" w-[100%] p-4 outline-none text-sm resize-none rounded border border-[#d3d3d3] h-40"
                  placeholder="input message for users"
                  id=""
                ></textarea>
              </div>
              <div className="w-[100%] flex justify-end">
                <button className="flex items-center gap-1 bg-amber-400 text-white rounded-[10px] p-2 px-4 mt-3 text-sm shadow-sm">
                  Send Now{" "}
                  <div>
                    <PiTelegramLogoLight />
                  </div>
                </button>
              </div>
              <div className="mt-10">
                <h1 className="font-[700] text-[25px]">All Messages</h1>
                <div className="overflow-x-auto mt-5">
                  <table className="min-w-full bg-white border overflow-hidden border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                          Title
                        </th>
                        <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                          Message
                        </th>
                        <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                          Date Uploaded
                        </th>
                        <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b border-b-[#f1f1f1] hover:bg-gray-50"
                        >
                          <td className="py-3 px-6 text-sm text-gray-800">
                            <div className="flex items-center gap-1">
                              <div className="bg-green-600 rounded-full w-[fit-content] p-1"></div>
                              {user.name}
                            </div>
                          </td>
                          <td className="py-3 px-6 text-sm text-gray-800">
                            {user.email}
                          </td>
                          <td className="py-3 px-6 text-sm text-gray-800">
                            {user.role}
                          </td>
                          <td className="py-3 px-6 text-sm text-gray-800">
                            <button className="text-blue-500 hover:text-blue-700">
                              Deactivate
                            </button>
                            <button className="ml-4 text-red-500 hover:text-red-700">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default BroadCast;
