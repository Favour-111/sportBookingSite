import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./util/i18n.js"; // 👈 Import this line
import { GoogleOAuthProvider } from "@react-oauth/google";
// Theme initialization: prefer saved value, otherwise system preference
(function initTheme() {
  try {
    const saved = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#fff");
    } else {
      document.documentElement.classList.remove("dark");
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#fff");
    }
  } catch (e) {
    // ignore
  }
})();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  const mode = localStorage.getItem("darkMode");
  const itm = document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", "#fff");
  useEffect(() => {
    if (mode === "true") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#fff");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#fff");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div>
      {/* Pass down the toggle function to your app */}
      {children({ toggleTheme, isDarkMode })}
    </div>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={
        "172929669773-uudqhgvejm3qq213n0spnei9ru0voq9v.apps.googleusercontent.com"
      }
    >
      <BrowserRouter>
        <ThemeProvider>
          {({ toggleTheme, isDarkMode }) => (
            <App toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          )}
        </ThemeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
