import React from "react";
import "./Loader.css";

const LoadingScreen = () => {
  const text = "SportsTips";

  return (
    <div className="loading-container">
      <div className="loading-text">
        {text.split("").map((letter, index) => (
          <span
            key={index}
            className="loading-letter"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="wave-loader">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
