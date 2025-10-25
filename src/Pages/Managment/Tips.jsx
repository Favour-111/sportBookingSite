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
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { FiMessageSquare } from "react-icons/fi";

const Tips = () => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [addTipModal, setAddTipModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    tipTitle: "",
    tipPrice: "",
    bettingType: "",
    image: "",
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
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleViewClick = (message) => {
    setSelectedMessage(message);
    setStatus(message.status || "Pending"); // sync status to the selected game
    setOpenModal(true);
  };
  const { isDarkMode, games, gameLoad, fetchAllGames, allUser } =
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

  // Handle toggling the active status of a specific tip
  const toggleActiveStatus = async (itemId, currentStatus) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/games/${itemId}/toggle-active`
      );
      fetchAllGames(); // Refresh the games list
      toast.success(response.data.message); // Show success message

      // Update the status of the specific item
    } catch (error) {
      console.error("Error toggling active status:", error);
      toast.error("Error activating/deactivating tip.");
    } finally {
      setLoading(false);
    }
  };

  // Delete the game
  const deleteGame = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API}/api/games/${id}`
      );
      toast.success(response.data.message); // Display success message
      fetchAllGames();
    } catch (error) {
      console.error("Error deleting game:", error);
      toast.error("Failed to delete game.");
    }
  };
  const [status, setStatus] = useState(selectedMessage?.status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    console.log("Selected Status:", newStatus); // Debugging log

    setStatus(newStatus);

    if (!selectedMessage) {
      return;
    } else if (selectedMessage.active) {
      toast.error("game is still active deactivate game before setting status");
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API}/api/games/updategameStatus/${
            selectedMessage._id
          }`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ gameStatus: newStatus }), // Ensure this matches the backend's expected field
          }
        );

        const data = await response.json();
        console.log("Backend Response:", data); // Debugging log

        if (!response.ok) throw new Error("Failed to update Game status");

        // Update selectedMessage state to reflect the new status
        setSelectedMessage((prev) => ({
          ...prev,
          status: newStatus, // Ensure this matches the updated field in the game model
        }));
      } catch (error) {
        console.error(error);
        alert("Failed to update status");
      }
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
              <>
                <h1 className="mt-5 text-bold text-zinc-600 text-[20px] capitalize font-[600]">
                  All Games
                </h1>
                <div>
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
                  ) : games.length <= 0 ? (
                    <div className="flex justify-center items-center flex-col gap-3">
                      <div>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2039/2039083.png"
                          alt=""
                          className="mt-10"
                          width={100}
                        />
                      </div>
                      <div className="text-center text-20 text-gray-500">
                        No Tip available
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto mt-5">
                      <table className="min-w-full bg-white border overflow-hidden border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                              Tip Title
                            </th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                              Tips Price
                            </th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                              TIps Ratio
                            </th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                              Durations
                            </th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {games
                            .slice()
                            .reverse()
                            .map((user) => (
                              <tr
                                key={user.id}
                                className="border-b border-b-[#f1f1f1] hover:bg-gray-50"
                              >
                                <td className="py-3 px-6 text-[15px] text-gray-800 font-[600] whitespace-nowrap">
                                  {user.status === "Hit✅"
                                    ? "✅"
                                    : user.status === "Miss❌"
                                    ? "❌"
                                    : "⏳"}{" "}
                                  {user.tipTitle}
                                </td>
                                <td className="py-3 px-6 text-sm text-gray-800 whitespace-nowrap">
                                  ${user.tipPrice.toLocaleString()}
                                </td>
                                <td className="py-3 px-6 text-sm text-gray-800 whitespace-nowrap">
                                  {user.oddRatio}
                                </td>
                                <td className="py-3 px-6 text-sm text-gray-800 whitespace-nowrap">
                                  {user.duration}: min
                                </td>
                                <td className="py-3 px-6 text-sm text-gray-800 whitespace-nowrap">
                                  <button
                                    onClick={() => handleViewClick(user)} // Open the modal with user info
                                    className="mr-4 text-blue-500 hover:text-blue-700"
                                  >
                                    View
                                  </button>
                                  <button
                                    onClick={
                                      () =>
                                        toggleActiveStatus(
                                          user._id,
                                          user.active
                                        ) // Toggle the active status for this tip
                                    }
                                    className={
                                      user.active
                                        ? "mr-4 text-red-500 hover:text-red-700"
                                        : "mr-4 text-green-500 hover:text-green-700"
                                    }
                                  >
                                    {user.active ? "Hide" : "Show"}{" "}
                                    {/* Display the appropriate label */}
                                  </button>
                                  <button
                                    onClick={() => deleteGame(user._id)} // Delete the game
                                    className="ml-4 text-red-500 hover:text-red-700"
                                  >
                                    Delete
                                  </button>
                                </td>

                                {/* Modal */}
                                <Dialog
                                  open={openModal}
                                  onClose={() => setOpenModal(false)}
                                  className="relative z-10"
                                >
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
                                            <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                                              <FiMessageSquare color="blue" />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                              <DialogTitle
                                                as="h3"
                                                className="text-base font-semibold text-gray-900"
                                              >
                                                Message Details
                                              </DialogTitle>
                                              <div className="mt-2">
                                                {/* Displaying selected message content */}
                                                {selectedMessage && (
                                                  <div>
                                                    <p className="text-sm text-gray-500">
                                                      <strong>
                                                        Tip Status:
                                                      </strong>{" "}
                                                      {selectedMessage?.status}
                                                    </p>
                                                    <p className="text-sm mt-3 text-gray-500">
                                                      <strong>
                                                        Status Edit:
                                                      </strong>{" "}
                                                      <select
                                                        className="p-1 rounded border border-[#d3d3d3]"
                                                        value={status} // This should bind the select value to the state
                                                        onChange={(e) =>
                                                          handleStatusChange(e)
                                                        } // Update on change
                                                      >
                                                        <option value="Pending">
                                                          Pending⏳
                                                        </option>
                                                        <option value="Hit✅">
                                                          Hit✅
                                                        </option>
                                                        <option value="Miss❌">
                                                          Miss❌
                                                        </option>
                                                      </select>
                                                    </p>
                                                    <p className="text-sm mt-3 text-gray-500">
                                                      <strong>
                                                        Tip Title:
                                                      </strong>{" "}
                                                      {selectedMessage.tipTitle}
                                                    </p>
                                                    <p className="text-sm mt-3 text-gray-500">
                                                      <strong>
                                                        Tip Price:
                                                      </strong>{" "}
                                                      {selectedMessage.tipPrice}
                                                    </p>
                                                    <p className="text-sm mt-3 text-gray-500">
                                                      <strong>
                                                        Tip ImageLink:
                                                      </strong>{" "}
                                                      {selectedMessage.image}
                                                    </p>
                                                    <p className="text-sm mt-3 text-gray-500">
                                                      <strong>
                                                        odd Ratio:
                                                      </strong>{" "}
                                                      {selectedMessage.oddRatio}
                                                    </p>
                                                    <p className="text-sm mt-3 text-gray-500">
                                                      <strong>
                                                        Betting Sites:
                                                      </strong>{" "}
                                                      {
                                                        selectedMessage.bettingSites
                                                      }
                                                    </p>
                                                    <p className="text-sm mt-3 text-gray-500">
                                                      <strong>
                                                        Confidence Level:
                                                      </strong>{" "}
                                                      {
                                                        selectedMessage.confidenceLevel
                                                      }
                                                    </p>
                                                    <p className="text-sm mt-3 text-gray-500">
                                                      <strong>
                                                        Content after Purchase:
                                                      </strong>{" "}
                                                      {
                                                        selectedMessage.contentAfterPurchase
                                                      }
                                                    </p>
                                                    <p className="text-sm mt-3 text-gray-500">
                                                      <strong>duration:</strong>{" "}
                                                      {selectedMessage.duration}
                                                    </p>
                                                    <p className="text-sm mt-3 text-gray-500">
                                                      <strong>
                                                        purchase Limit:
                                                      </strong>{" "}
                                                      {
                                                        selectedMessage.purchaseLimit
                                                      }
                                                    </p>

                                                    <p className="text-sm mt-3 text-gray-500">
                                                      <strong>
                                                        Purchase By:
                                                      </strong>{" "}
                                                      {selectedMessage
                                                        .purchasedBy.length > 0
                                                        ? selectedMessage.purchasedBy
                                                            .map((userId) => {
                                                              const user =
                                                                allUser.find(
                                                                  (item) =>
                                                                    item._id ===
                                                                    userId
                                                                );
                                                              return user
                                                                ? user.userName
                                                                : "Unknown User"; // Fallback if user not found
                                                            })
                                                            .join(", ") // Join all usernames if there are multiple
                                                        : "No users"}
                                                    </p>
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setOpenModal(false);
                                              fetchAllGames();
                                            }}
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                                          >
                                            Close
                                          </button>
                                        </div>
                                      </DialogPanel>
                                    </div>
                                  </div>
                                </Dialog>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
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
                  <div className="mt-3  grid gap-2 grid-cols-2">
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
                        Tip Image Link
                      </label>
                      <input
                        name="image"
                        placeholder="Paste image Link "
                        type="text"
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
                        placeholder="Set time limit (in minute)"
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
