import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

// Create the context
export const ShopContext = createContext();

// Create a provider component
export const ShopProvider = ({ children }) => {
  // Track dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem("userId");
  const [allUser, setAllUser] = useState([]);
  const fetchUser = async () => {
    try {
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
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
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

  // Update the class on <html> when dark mode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <ShopContext.Provider
      value={{
        isDarkMode,
        loading,
        compareUser,
        fetchUser,
        allUser,
        user,
        toggleDarkMode,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
