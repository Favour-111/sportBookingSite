import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../components/shopContext";
import { PiTelegramLogoLight } from "react-icons/pi";
import toast from "react-hot-toast";
import axios from "axios";
import Footer from "./Footer";
import Sidebar from "./SideBar";
import TopBar from "./TopBar";

const BroadCast = () => {
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const { isDarkMode, allUser } = useContext(ShopContext);
  const [allMessage, setAllMessage] = useState([]);
  const [form, setForm] = useState({
    title: "",
    message: "",
    visibility: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  // Send message to users
  const sendMessage = async () => {
    setLoader(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/message/addMessage`,
        form
      );
      toast.success("Broadcast message has been added");
      fetchMessage();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Error sending message");
    } finally {
      setLoader(false);
    }
  };

  // Delete message function
  const deleteMessage = async (id) => {
    setLoader(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API}/api/message/deleteMessage/${id}`
      );
      if (response) {
        toast.success("Message deleted successfully");
        fetchMessage();
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Error deleting message");
    } finally {
      setLoader(false);
    }
  };

  // Fetch all messages
  const fetchMessage = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/message/getallMessage`
      );
      if (response) {
        setAllMessage(response.data.response);
      } else {
        toast.error("Error fetching messages");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  // Deactivate message function (toggle visibility)
  const deactivateMessage = async (id, currentVisibility) => {
    setLoader(true);
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/message/deactivateMessage/${id}`
      );
      toast.success("Message visibility updated successfully");

      // Toggle the message visibility in the UI immediately
      setAllMessage((prevMessages) =>
        prevMessages.map((message) =>
          message._id === id
            ? {
                ...message,
                visibility:
                  currentVisibility === "Visible" ? "Hidden" : "Visible",
              }
            : message
        )
      );
    } catch (error) {
      console.error("Error updating message visibility:", error);
      toast.error("Error updating message visibility");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div
      className={`${isDarkMode ? "dark" : ""} flex dark:bg-[var(--default)]`}
    >
      <div>
        <Sidebar setOpen={setOpen} />
      </div>
      <div className="h-[100vh] w-[100%] overflow-y-scroll">
        <div className="mb-10">
          <TopBar />
          <div className="mt-5 p-4">
            <h1 className="font-[600] text-[20px] text-[#545160]">
              Broadcast a message
            </h1>
            <p className="mt-1 text-[#787878] text-sm">
              Here you can check and share messages with users
            </p>
            <div className="mt-10">
              <div className="px-4 sm:px-6 py-6 rounded-[10px] shadow-sm">
                <div className="block md:flex items-center gap-10">
                  <div>
                    <label htmlFor="" className="text-sm text-[#787878]">
                      Message Title
                    </label>
                    <br />
                    <input
                      onChange={handleInput}
                      type="text"
                      name="title"
                      placeholder="Input message title"
                      className="text-[#545160] border border-[#ebebeb] p-2 rounded-[6px] w-[100%] md:w-[200px] outline-none text-sm"
                    />
                  </div>
                  <div className="mt-5 md:mt-0">
                    <label htmlFor="" className="text-sm text-[#787878]">
                      Message Visibility
                    </label>
                    <br />
                    <select
                      name="visibility"
                      onChange={handleInput}
                      className="text-[#545160] border border-[#ebebeb] p-2 rounded-[6px] w-[100%] md:w-[200px] outline-none text-sm"
                    >
                      <option value="">Visibility</option>
                      <option value="Visible">Visible</option>
                      <option value="Hidden">Hidden</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="" className="text-sm text-[#787878]">
                    Compose Message
                  </label>
                  <br />
                  <textarea
                    name="message"
                    onChange={handleInput}
                    className="w-[100%] border-[#ebebeb] p-2 rounded-[6px] outline-none text-sm resize-none border h-40"
                    placeholder="Input message for users"
                  ></textarea>
                </div>
                <div className="w-[100%] flex justify-end">
                  <button
                    onClick={sendMessage}
                    className="flex items-center gap-1 bg-amber-400 text-white rounded-[10px] p-2 px-4 mt-3 text-sm shadow-sm"
                  >
                    {loader ? "Loading ..." : "Send Now"}
                    <PiTelegramLogoLight />
                  </button>
                </div>
              </div>
              <div className="mt-10">
                <h1 className="font-[600] text-[20px] text-[#545160]">
                  All Messages
                </h1>
                {loader ? (
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
                ) : allMessage.length <= 0 ? (
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
                      No Message available
                    </div>
                  </div>
                ) : (
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
                            Visibility
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
                        {/* Replace with actual messages from your DB */}
                        {allMessage.map((user) => (
                          <tr
                            key={user.id}
                            className="border-b border-b-[#f1f1f1] hover:bg-gray-50"
                          >
                            <td className="py-3 px-6 text-sm text-gray-800 whitespace-nowrap">
                              {user.title}
                            </td>
                            <td className="py-3 px-6 text-sm text-gray-800 whitespace-nowrap">
                              {user.message.slice(0, 20)}......
                            </td>
                            <td className="py-3 px-6 text-sm text-gray-800 whitespace-nowrap">
                              {user.visibility}
                            </td>
                            <td className="py-3 px-6 text-sm text-gray-800 whitespace-nowrap">
                              {user.createdAt.slice(0, 10)}
                            </td>
                            <td className="py-3 px-6 text-sm text-gray-800 whitespace-nowrap">
                              <button
                                onClick={() =>
                                  deactivateMessage(user._id, user.visibility)
                                }
                                className={
                                  user.visibility === "Visible"
                                    ? "mr-4 text-red-500 hover:text-red-700"
                                    : "mr-4 text-green-500 hover:text-green-700"
                                }
                              >
                                {user.visibility === "Visible"
                                  ? "Hide"
                                  : "Show"}
                              </button>
                              <button
                                onClick={() => deleteMessage(user._id)}
                                className="ml-4 text-red-500 hover:text-red-700"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
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
