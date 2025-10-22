import React from "react";
import { IoTrophyOutline } from "react-icons/io5";
import { LuCrown } from "react-icons/lu";
import Login from "../Login/Login";
import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [form, setForm] = useState(false);
  return (
    <div className="mt-20">
      <div className="w-full dark:bg-[#1c2330] bg-[#f1f1f1] text-white py-20 px-5 flex flex-col  justify-center items-center gap-2">
        <LuCrown
          data-aos="fade-down"
          className="md:text-[80px] text-[60px] text-[var(--Primary)]"
        />
        <h1
          data-aos="fade-up"
          className="dark:text-[#fff] md:text-[50px] text-[30px] font-bold text-center text-[var(--default)]"
        >
          Ready to Start{" "}
          <span className="bg-gradient-to-r from-[#f7b822] via-[#ff7300] to-[#f7b822] bg-clip-text text-transparent">
            Winning?
          </span>{" "}
        </h1>
        <p
          data-aos="fade-up"
          className="text-center md:text-sm text-[14px] text-[#787878] w-[100%] md:w-[50%]"
        >
          Join SportsTips today and get access to premium sports betting tips
          from expert analysts. Your winning streak starts here!
        </p>
        <div className="flex items-center gap-5 mt-5">
          <button
            onClick={() => setForm(true)}
            data-aos="fade-down"
            className="flex gap-3 items-center text-sm text-white bg-[var(--Primary)] px-7 py-3 shadow-sm rounded-[10px] font-medium"
          >
            <div>
              <IoTrophyOutline />
            </div>{" "}
            <div>Get Started now</div>
          </button>
        </div>
        <p
          data-aos="fade-up"
          className="text-sm text-center dark:text-[#d3d3d3] text-[#787878] mt-3"
        >
          {" "}
          Get ₹25 welcome bonus • No hidden fees • Cancel anytime
        </p>
      </div>
      <div className="h-[.5px]  w-full bg-[#787878] "></div>
      <div className="bg-[#f1f1f1] dark:text-[#d3d3d3]  dark:bg-[#1c2330] flex flex-col md:flex-row justify-between md:px-10 px-5 gap-y-10 py-10 ">
        <div className="md:w-[30%] w-[100%] ">
          <div>
            {" "}
            <img
              src="https://github.com/Favour-111/my-asset/blob/main/image.jpg?raw=true"
              alt=""
              className="w-12 h-12 rounded-[12px] object-contain"
            />
          </div>
          <p className="text-sm text-[#787878] mt-3 dark:text-[#d3d3d3] ">
            Premium sports betting recommendations from professional analysts at
            SportsTips.
          </p>
        </div>
        <div className="md:w-[23%] w-[100%] ">
          <h1 className="font-[600]">Platform</h1>
          <ul className="text-sm dark:text-[#d3d3d3]  text-[#787878] mt-2 flex flex-col gap-2">
            <li>How it works</li>
            <li>Pricing</li>
            <li>Success stories</li>
          </ul>
        </div>
        <div className="md:w-[23%] w-[100%] ">
          <h1 className="font-[600]">Sports</h1>
          <ul className="text-sm dark:text-[#d3d3d3]  text-[#787878] mt-2 flex flex-col gap-2">
            <li>FootBall</li>
            <li>BasketBall</li>
            <li>Tennis</li>
            <li>Cricket</li>
          </ul>
        </div>
        <div className="md:w-[23%] w-[100%] ">
          <h1 className="font-[600]">Supports</h1>
          <ul className="text-sm dark:text-[#d3d3d3]  text-[#787878] mt-2 flex flex-col gap-2">
            <li>Help Us</li>
            <li>Contact Us</li>
            <li>Term Of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div className="h-[.5px] w-full dark:bg-[#787878] bg-[#c2c2c2]"></div>
      <div className="bg-[#f1f1f1] dark:text-[#d3d3d3]  dark:bg-[#1c2330] p-5 text-center text-sm text-[#787878]">
        <a target="blank" href="https://favour-111.github.io/my-portfolio/">
          © 2024 SportsTips. All rights reserved by Horbah's Tech.
        </a>
      </div>
      {form && <Login state={setForm} />}
    </div>
  );
};

export default Footer;
