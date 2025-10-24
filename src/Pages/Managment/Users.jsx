import React, { useContext, useState } from "react";
import { ShopContext } from "../../components/shopContext";
import { TbUser, TbUsers } from "react-icons/tb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { MdBlock, MdCardTravel, MdTipsAndUpdates } from "react-icons/md";
import Funds from "../../components/Funds/Funds";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { TiWarning } from "react-icons/ti";

import Footer from "./Footer";
import Sidebar from "./SideBar";
import TopBar from "./TopBar";
import { FiUsers } from "react-icons/fi";
import { PiUsersFourLight } from "react-icons/pi";
import axios from "axios";
import toast from "react-hot-toast";

const Users = () => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [delLoader, setDeleteLoader] = useState(false);
  const { isDarkMode, loading, setLoading, allUser, compareUser, fetchUser } =
    useContext(ShopContext);
  const deactivateUser = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/auth/deactivateUser/${userId}`
      );
      if (response) {
        toast.success("User deactivated successfully");
        fetchUser(); // Refresh users list
      }
    } catch (error) {
      toast.error("Error deactivating user");
    } finally {
      setLoading(false);
    }
  };
  const HandleAdd = (user) => {
    Swal.fire({
      title: `Add funds to ${user.userName}`,
      input: "number",
      inputLabel: "Enter amount to deposit",
      inputPlaceholder: "Enter amount",
      inputAttributes: {
        min: 1,
        step: 1,
      },
      showCancelButton: true,
      confirmButtonText: "Add Balance",
      showLoaderOnConfirm: true,
      preConfirm: async (amount) => {
        try {
          if (!amount || isNaN(amount) || amount <= 0) {
            Swal.showValidationMessage("Please enter a valid amount");
            return;
          }

          const response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_API}/api/auth/deposit`,
            {
              userId: user._id,
              amount: parseFloat(amount),
            }
          );

          if (response.status === 200) {
            return response.data;
          } else {
            throw new Error("Deposit failed");
          }
        } catch (error) {
          Swal.showValidationMessage(
            `Request failed: ${error.response?.data?.message || error.message}`
          );
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Balance Added",
          text: `Successfully added to ${user.userName}'s account.`,
        });
        fetchUser(); // Refresh user list to reflect updated balance
      }
    });
  };

  // Function to reactivate user
  const reactivateUser = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/auth/reactivateUser/${userId}`
      );
      if (response) {
        toast.success("User reactivated successfully");
        fetchUser(); // Refresh users list
      }
    } catch (error) {
      toast.error("Error reactivating user");
    } finally {
      setLoading(false);
    }
  };
  // function to delete user
  const deleteUser = async (userId) => {
    try {
      setDeleteLoader(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API}/api/auth/deleteUser/${userId}`
      );
      if (response) {
        toast.success("Account has been deleted successfully");
        fetchUser();
      } else {
        toast.error("error deleting");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoader(false);
      setOpenModal(false);
    }
  };
  // Add this inside your `Users` component
  const handleRoleChange = async (userId, newRole) => {
    setLoading(true); // Set loading state while the update is being processed
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/auth/updateUserRole/${userId}`, // Make sure this route exists on your server
        { role: newRole }
      );

      if (response.status === 200) {
        toast.success("User role updated successfully");
        fetchUser(); // Refresh the users list to show the updated roles
      }
    } catch (error) {
      toast.error("Error updating user role");
      console.error(error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };
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
            <h1 className="font-[600] text-[20px] text-[#545160] ">users</h1>

            <div className="grid md:grid-cols-3 grid-cols-2 items-center gap-3  mt-5">
              <div className=" bg-white border-[#f1d1d1] shadow-sm  px-5 py-5 rounded-[10px]">
                <div className="bg-[#f6f6f6] p-2 rounded-[10px] w-[fit-content]">
                  <FiUsers className="text-[#787878] text-[2em]" />
                </div>
                <div className="mt-2 font-[700] text-2xl">
                  {allUser?.length}
                </div>
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
                <div className="mt-2 font-[700] text-2xl  text-[#545160]">
                  {allUser.filter((item) => item?.active === false).length || 0}
                </div>
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
                <div className="mt-2 font-[700] text-2xl text-[#545160]">
                  {allUser.filter((item) => item?.active === true).length || 0}
                </div>
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
                class="placeholder:text-[12px] block w-[100%] sm:w-[300px] mt-3 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-100 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-amber-200 sm:text-sm/6"
              />
            </div>
            {loading ? (
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
            ) : allUser.length <= 0 ? (
              <div className="flex justify-center items-center flex-col gap-3">
                <div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2039/2039083.png"
                    alt="No User"
                    width={100}
                  />
                </div>
                <div className="text-center text-20 text-gray-500">
                  No User available
                </div>
              </div>
            ) : (
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
                        Role
                      </th>
                      <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                        Total Bal
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
                    {allUser.map((user) => (
                      <>
                        <tr
                          key={user._id}
                          className={`border-b border-b-[#f1f1f1] hover:bg-gray-50 ${
                            !user.active ? "text-red-500" : "text-gray-800"
                          }`}
                        >
                          <td className="py-3 px-6 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <div className="bg-[#f6f6f6] rounded-full w-[fit-content] p-2">
                                <TbUser />
                              </div>
                              {user.userName}
                            </div>
                          </td>
                          <td className="py-3 px-6 text-sm whitespace-nowrap">
                            {user.email}
                          </td>
                          <td className="py-3 px-6 text-sm whitespace-nowrap">
                            {user.role}
                          </td>

                          <td className="py-3 px-6 text-sm whitespace-nowrap">
                            ${user?.availableBalance.toLocaleString()}
                          </td>
                          <td className="py-3 px-6 text-sm whitespace-nowrap">
                            $
                            {user?.betHistory.reduce(
                              (acc, item) => acc + item.tipPrice,
                              0
                            )}
                          </td>

                          <td className="py-3 px-6 text-sm whitespace-nowrap">
                            <button
                              onClick={() => HandleAdd(user)}
                              className="text-orange-600 hover:text-orange-700"
                            >
                              Add Bal
                            </button>
                            {user.active ? (
                              <button
                                onClick={() => deactivateUser(user._id)}
                                className="text-blue-500 ml-3 hover:text-red-700"
                              >
                                Deactivate
                              </button>
                            ) : (
                              <button
                                onClick={() => reactivateUser(user._id)}
                                className="text-green-500 ml-3 hover:text-green-700"
                              >
                                Reactivate
                              </button>
                            )}
                            <button
                              onClick={() => setOpenModal(true)}
                              className="ml-4 text-red-500 hover:text-red-700"
                            >
                              Delete
                            </button>
                            <select
                              value={user.role} // Display current role
                              onChange={(e) =>
                                handleRoleChange(user._id, e.target.value)
                              } // Trigger role update on change
                              className="ml-4 text-cyan-500 outline-none hover:text-cyan-700"
                            >
                              <option value="customer">Customer</option>
                              <option value="admin">Admin</option>
                              {/* Add more roles if necessary */}
                            </select>
                          </td>
                        </tr>
                        <Dialog
                          open={openModal}
                          onClose={setOpenModal}
                          className="relative z-10"
                        >
                          {" "}
                          <DialogBackdrop
                            transition
                            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                          />{" "}
                          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            {" "}
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                              {" "}
                              <DialogPanel
                                transition
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                              >
                                {" "}
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                  {" "}
                                  <div className="sm:flex sm:items-start">
                                    {" "}
                                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                      {" "}
                                      <TiWarning color="red" />{" "}
                                    </div>{" "}
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                      {" "}
                                      <DialogTitle
                                        as="h3"
                                        className="text-base font-semibold text-gray-900"
                                      >
                                        {" "}
                                        Delete account{" "}
                                      </DialogTitle>{" "}
                                      <div className="mt-2">
                                        {" "}
                                        <p className="text-sm text-gray-500">
                                          {" "}
                                          Are you sure you want to delete this
                                          account? All of your data will be
                                          temporary removed.all actions cannot
                                          be undone{" "}
                                        </p>{" "}
                                      </div>{" "}
                                    </div>{" "}
                                  </div>{" "}
                                </div>{" "}
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                  {" "}
                                  <button
                                    type="button"
                                    onClick={() => deleteUser(user?._id)}
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                                  >
                                    {" "}
                                    {delLoader ? "Loading..." : "Delete"}{" "}
                                  </button>{" "}
                                  <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpenModal(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                  >
                                    {" "}
                                    Cancel{" "}
                                  </button>{" "}
                                </div>{" "}
                              </DialogPanel>{" "}
                            </div>{" "}
                          </div>{" "}
                        </Dialog>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Users;
