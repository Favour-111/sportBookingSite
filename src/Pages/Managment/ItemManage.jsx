import React, { useContext, useState } from "react";
import { IoTrendingUp } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import axios from "axios"; // Import axios for making API requests
import toast from "react-hot-toast";
import { LuUsers } from "react-icons/lu";
import { ShopContext } from "../../components/shopContext";

const ItemManage = ({ item }) => {
  const [isActive, setIsActive] = useState(item.active); // Track active status
  const { fetchAllGames } = useContext(ShopContext);
  // Toggle active status (Activate/Deactivate game)
  // Example of total value and current value
  const totalValue = item.purchaseLimit; // This could be dynamic, e.g., 20, 40, etc.
  const currentValue = item.CurrentLimit || 0; // This could be dynamic as well, representing progress

  const progress = (currentValue / totalValue) * 100;
  const toggleActiveStatus = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/api/games/${
          item._id
        }/toggle-active`
      );
      fetchAllGames();
      setIsActive(!isActive); // Update the active status in the UI
      toast.success(response.data.message); // Display success message
    } catch (error) {
      console.error("Error toggling active status:", error);
      toast.error("error activating game");
    }
  };

  // Delete the game
  const deleteGame = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/games/${item._id}`
      );
      toast.success(response.data.message); // Display success message
      fetchAllGames();
    } catch (error) {
      console.error("Error deleting game:", error);
      toast.error("Failed to delete game.");
    }
  };

  return (
    <div className="border-1 p-5 border-gray-100 dark:border-gray-600 rounded-[15px] w-[100%] h-[fit-content] flex flex-col gap-2 cursor-pointer hover:shadow-lg shadow-sm duration-200">
      <div className="flex justify-between">
        <h1 className="font-[600] text-[18px] dark:text-[white] w-[80%]">
          {item.tipTitle}
        </h1>
        <div className="text-green-700 dark:text-green-400 font-bold text-[20px]">
          ${item.tipPrice}
        </div>
      </div>
      <div className="text-sm font-[500] text-[tomato]">{item.bettingType}</div>
      <div>
        <div className="flex items-center gap-1 text-sm text-green-500">
          <IoTrendingUp />
          <div>odds: {item.oddRatio} +</div>
        </div>
      </div>
      <div>
        <div className="bg-[#f1f1f1] p-2 rounded-[10px] text-[13px] text-[#787878]">
          {item.duration} Miniutes remaining
        </div>
        <div className="text-[12px] text-[orangered] dark:text-[tomato] opacity-80 mt-2 dark:opacity-100">
          Available on : {item.bettingSites}
        </div>
      </div>
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
      <div className="flex items-center flex-col gap-3">
        <button
          className="w-[100%] bg-red-400 hover:bg-red-600 duration-300 text-white flex items-center justify-center gap-2 p-[10px] rounded text-[12px]"
          onClick={deleteGame} // Handle delete game action
        >
          <MdOutlineAddShoppingCart className="dark:text-white" />
          <div className="dark:text-white">Delete bet now</div>
        </button>
        <button
          className="w-[100%] bg-orange-200 hover:bg-orange-600 duration-300 text-white flex items-center justify-center gap-2 p-[10px] rounded text-[12px]"
          onClick={toggleActiveStatus} // Handle toggle active status
        >
          <MdOutlineAddShoppingCart className="dark:text-white" />
          <div className="dark:text-white">
            {isActive ? "Deactivate Game" : "Activate Game"}
          </div>
        </button>
      </div>
    </div>
  );
};

export default ItemManage;
