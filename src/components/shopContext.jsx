import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // ✅ Initialize socket once
  const [socket, setSocket] = useState(null);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [mainLoading, setMainLoading] = useState(false);
  const [balLoader, setBalLoader] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [games, setAllGames] = useState([]);
  const [gameLoad, setGameLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const user = localStorage.getItem("userId");

  // ✅ Initialize Socket connection
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_REACT_APP_API, {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("🟢 Connected to socket:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("🔴 Disconnected from socket");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // ✅ Fetch users from backend
  const fetchUser = async () => {
    try {
      setMainLoading(true);
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/auth/getUsers`
      );
      if (response) {
        setAllUser(response.data.users);
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

  // ✅ Fetch all games
  const fetchAllGames = async () => {
    try {
      setMainLoading(true);
      setGameLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/games/allGame`
      );
      if (response) {
        setAllGames(response.data);
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
  const gameFilterName = games.map((item) => item._id);
  // ✅ Listen for socket events
  useEffect(() => {
    if (!socket) return;

    // Game added
    // Game added
    socket.on("gameAdded", (newGame) => {
      setAllGames((prev) => [...prev, newGame]);
      setModalMessage(
        `${
          newGame.tipTitle || "A new game"
        } has been added! Start winning today🎉🎉`
      );
      setOpenModal(true);
    });

    // Game updated
    socket.on("gameUpdated", (updatedGame) => {
      setAllGames((prev) =>
        prev.map((g) => (g._id === updatedGame._id ? updatedGame : g))
      );
      setModalMessage(
        `${
          updatedGame.tipTitle || "A game"
        } has been updated! Refresh Page To View Updated Status🔃`
      );
      setOpenModal(true);
    });

    // Game toggled
    // Game toggled
    socket.on("gameToggled", (game) => {
      setAllGames((prev) => prev.map((g) => (g._id === game._id ? game : g)));

      if (game.active) {
        setModalMessage(
          `✅ "${
            game.tipTitle || "A game"
          }" is now *active* and visible to users.`
        );
      } else {
        setModalMessage(
          `🚫 "${
            game.tipTitle || "A game"
          }" has been *deactivated* and is no longer visible.`
        );
      }

      setOpenModal(true);
    });

    // Game status updated
    socket.on("gameStatusUpdated", ({ gameId, gameStatus }) => {
      setAllGames((prev) =>
        prev.map((g) => (g._id === gameId ? { ...g, gameStatus } : g))
      );

      // Find the updated game to access its title
      const updatedGame = games?.find((g) => g?._id === Number(gameId));

      if (gameStatus === "Hit✅") {
        console.log(updatedGame);
        console.log(gameFilter);

        setModalMessage(
          `🎯 Great news! ${
            updatedGame?.tipTitle || "Check History Now,a game"
          } was a Hit✅! Congratulations on your win!`
        );
      } else if (gameStatus === "Miss❌") {
        setModalMessage(
          `💔 Unfortunately, ${
            updatedGame?.tipTitle || "a game"
          } resulted in a Loss❌. Don’t worry—better luck next time!`
        );
      } else {
        setModalMessage(
          `ℹ️ ${
            updatedGame?.tipTitle || "A game"
          } status updated to ${gameStatus}.`
        );
      }

      setOpenModal(true);
    });

    // Game deleted
    socket.on("gameDeleted", ({ id }) => {
      setAllGames((prev) => prev.filter((g) => g._id !== id));
    });

    // Game purchased
    socket.on("gamePurchased", ({ gameId, userId }) => {
      // toast.success(`This Game has purchased by`);
    });

    // Limit incremented
    socket.on("limitIncremented", ({ id, CurrentLimit }) => {
      setAllGames((prev) =>
        prev.map((g) => (g._id === id ? { ...g, CurrentLimit } : g))
      );
      // toast(`Game limit increased to ${CurrentLimit}`);
    });

    return () => {
      socket.off("gameAdded");
      socket.off("gameUpdated");
      socket.off("gameToggled");
      socket.off("gameDeleted");
      socket.off("gamePurchased");
      socket.off("gameStatusUpdated");
      socket.off("limitIncremented");
    };
  }, [socket]);

  // ✅ Initial fetch
  useEffect(() => {
    fetchUser();
    fetchAllGames();
  }, []);

  const compareUser = allUser?.find((item) => item._id == user);

  // ✅ Dark mode settings
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setIsDarkMode(true);
    } else if (savedMode === "false") {
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    localStorage.setItem("darkMode", !isDarkMode);
  };

  const gameFilter = games.filter((item) => item.active === true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // ✅ Update balance
  const updateBalance = async (amount) => {
    try {
      const updatedUser = {
        ...compareUser,
        availableBalance: compareUser?.availableBalance - amount,
      };

      setAllUser(
        allUser.map((u) => (u._id === compareUser._id ? updatedUser : u))
      );

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/auth/updateBalance`,
        {
          userId: compareUser?._id,
          amount,
        }
      );

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
        openModal,
        setOpenModal,
        modalMessage,
        games,
        gameLoad,
        balLoader,
        fetchAllGames,
        socket, // ✅ expose socket globally
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
