import React from "react";
import "./Loading.css";
const Loading = () => {
  return (
    <div className="loaderContainer">
      <div>
        <div className="loading">SportXTips</div>
      </div>
      <div class="spinner">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    </div>
  );
};

export default Loading;
