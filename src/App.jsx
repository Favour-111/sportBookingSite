import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Landing from "./Pages/Landing/Landing";
import { ShopProvider } from "./components/shopContext";
import Recommendation from "./Pages/Recommendation";
import About from "./Pages/About";
import DashBoard from "./Pages/DashBoard";
import toast, { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import Settings from "./Pages/Settings";
import ResetPass from "./Pages/ResetPass";
import "./styles/Buttons.css";
import Managment from "./Pages/Managment/Managment";
import Tips from "./Pages/Managment/Tips";
import Users from "./Pages/Managment/Users";
import BroadCast from "./Pages/Managment/BroadCast";
function App() {
  const user = localStorage.getItem("userId");
  AOS.init({
    duration: 500, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
    once: false,
  });
  return (
    <ShopProvider>
      <Routes>
        {!user && <Route path="/" element={<Landing />} />}
        <Route path="/recommendations" element={<Recommendation />} />
        <Route path="/about" element={<About />} />
        <Route path="/management/:token" element={<Managment />} />
        <Route path="/tips-management" element={<Tips />} />
        <Route path="/users" element={<Users />} />
        <Route path="/broadcast-message" element={<BroadCast />} />
        <Route
          path="/api/auth/reset-password/:id/:token"
          element={<ResetPass />}
        />
        <Route path="/settings/:id" element={<Settings />} />
        <Route path={user ? "" : "/"} element={<DashBoard />} />
      </Routes>
      <Toaster
        containerStyle={{
          fontSize: "12px",
        }}
      />
    </ShopProvider>
  );
}

export default App;
