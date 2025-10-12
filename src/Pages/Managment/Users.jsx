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
import { PiUsersFourLight } from "react-icons/pi";

const Users = () => {
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
          <div className="mt-5 px-4">
            <h1 className="text-[25px] font-[700] ">users</h1>
            <div className="grid md:grid-cols-3 grid-cols-2 items-center gap-3  mt-5">
              <div className=" bg-white border-[#f1d1d1] shadow-sm  px-5 py-5 rounded-[10px]">
                <div className="bg-[#f6f6f6] p-2 rounded-[10px] w-[fit-content]">
                  <FiUsers className="text-[#787878] text-[2em]" />
                </div>
                <div className="mt-2 font-[700] text-2xl">120</div>
                <div className="flex items-center justify-between">
                  <div className="sm:text-[sm] text-[11px] text-[#787878]">
                    Total Users
                  </div>
                </div>
              </div>
              <div className=" bg-white border-[#f1d1d1] shadow-sm  px-5 py-5 rounded-[10px]">
                <div className="bg-[#f6f6f6] p-2 rounded-[10px] w-[fit-content]">
                  <MdBlock className="text-[#787878] text-[2em]" />
                </div>
                <div className="mt-2 font-[700] text-2xl">120</div>
                <div className="flex items-center justify-between">
                  <div className="sm:text-[sm] text-[11px] text-[#787878]">
                    Blocked Users
                  </div>
                </div>
              </div>
              <div className="md:col-span-1 col-span-2 bg-white border-[#f1d1d1] shadow-sm  px-5 py-5 rounded-[10px]">
                <div className="bg-[#f6f6f6] p-2 rounded-[10px] w-[fit-content]">
                  <PiUsersFourLight className="text-[#787878] text-[2em]" />
                </div>
                <div className="mt-2 font-[700] text-2xl">120</div>
                <div className="flex items-center justify-between">
                  <div className="sm:text-[sm] text-[11px] text-[#787878]">
                    Active Users
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <input
                type="text"
                name="first-name"
                placeholder="search user by name"
                class="placeholder:text-[12px] block w-[100%] sm:w-[300px] mt-3 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-amber-200 sm:text-sm/6"
              />
            </div>
            <div className="overflow-x-auto mt-5">
              <table className="min-w-full bg-white border overflow-hidden border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                      Total Spent
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
                          <div className="bg-[#f6f6f6] rounded-full w-[fit-content] p-2">
                            <TbUser />
                          </div>
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
                          Block
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
        <Footer />
      </div>
    </div>
  );
};

export default Users;
