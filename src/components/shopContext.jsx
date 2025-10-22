import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

// Create the context
export const ShopContext = createContext();

// Create a provider component
export const ShopProvider = ({ children }) => {
  // Track dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [mainLoading, setMainLoading] = useState(false);
  const user = localStorage.getItem("userId");
  const [balLoader, setBalLoader] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [games, setAllGames] = useState([]);
  const [gameLoad, setGameLoading] = useState([]);
  const fetchUser = async () => {
    try {
      setMainLoading(true);
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/auth/getUsers`
      );
      if (response) {
        setAllUser(response.data.users);
        console.log(response.data.users);
      } else {
        console.log("Error Fetching Users");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMainLoading(false);
      setLoading(false);
    }
  };
  const fetchAllGames = async () => {
    try {
      setMainLoading(true);
      setGameLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/games/allGame`
      );
      if (response) {
        setAllGames(response.data);
        console.log(response.data);
      } else {
        console.log("Error Fetching Games");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMainLoading(false);
      setGameLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchAllGames();
  }, []);
  console.log(allUser);

  //checking for a single user
  const compareUser = allUser?.find((item) => item._id == user);
  console.log(compareUser); // This will log the user object if found, or `undefined` if not found.

  // Check localStorage for saved theme
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setIsDarkMode(true);
    } else if (savedMode === "false") {
      setIsDarkMode(false);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    localStorage.setItem("darkMode", !isDarkMode); // Save to localStorage
  };

  const gameFilter = games.filter((item) => item.active === true);
  // Update the class on <html> when dark mode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  const updateBalance = async (amount) => {
    try {
      // setBalLoader(true);
      // setMainLoading(true);
      // Update the balance on the frontend
      const updatedUser = {
        ...compareUser,
        availableBalance: compareUser?.availableBalance - amount,
      };

      // Update the user state in the frontend
      setAllUser(
        allUser.map((user) =>
          user._id === compareUser._id ? updatedUser : user
        )
      );

      // Send the balance update to the backend
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/auth/updateBalance`,
        {
          userId: compareUser?._id,
          amount: amount,
        }
      );

      // Check if the response is successful
      if (response.status === 200) {
        toast.success("Balance updated successfully!");
      } else {
        toast.error("Failed to update balance on server.");
      }
    } catch (error) {
      console.error("Error updating balance:", error);
      toast.error("An error occurred while updating balance.");
    } finally {
      setBalLoader(false);
      setMainLoading(false);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        isDarkMode,
        loading,
        compareUser,
        fetchUser,
        allUser,
        gameFilter,
        mainLoading,
        user,
        toggleDarkMode,
        navOpen,
        updateBalance,
        setLoading,
        setNavOpen,
        games,
        allUser,
        gameLoad,
        balLoader,
        fetchAllGames,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
