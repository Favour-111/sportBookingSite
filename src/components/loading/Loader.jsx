import React from "react";
import "./Loader.css";
import vid from "../../assets/video_2025-10-09_13-22-51.mp4";
const LoadingScreen = () => {
  const text = "..........";

  return (
    <div>
      <div className="loading-container ">
        <div className="fixed top-0 left-0 right-0 shadow-sm px-5 py-3">
          <div className="flex items-center gap-2">
            <img
              src="https://github.com/Favour-111/my-asset/blob/main/image.jpg?raw=true"
              alt=""
              className="w-12 h-12 rounded-[12px] object-contain"
            />
            <div className="font-[700] text-[18px] bg-gradient-to-r from-[#f7b822] via-[#ff7300] to-[#f7b822] bg-clip-text text-transparent">
              SportsTips
            </div>
          </div>
        </div>
        <div to="/" className="flex items-center gap-2">
          <img
            src="https://github.com/Favour-111/my-asset/blob/main/image.jpg?raw=true"
            alt=""
            className="w-12 h-12 rounded-full object-contain"
          />
          <div className="font-[700] text-[38px] bg-gradient-to-r from-[#f7b822] via-[#ff7300] to-[#f7b822] bg-clip-text text-transparent animate-opacity-pulse">
            SportsTips
          </div>
        </div>
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
    </div>
  );
};

export default LoadingScreen;
