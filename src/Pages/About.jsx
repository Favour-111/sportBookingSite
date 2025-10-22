import React, { useContext } from "react";
import Item from "../components/Item";
import { GoArrowRight } from "react-icons/go";
import { ShopContext } from "../components/shopContext";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import BackToTop from "../components/BackToTop";
import Testimonial from "../components/Testimonial";
import {
  IoAnalytics,
  IoShieldHalfSharp,
  IoTrophyOutline,
} from "react-icons/io5";
import { RiExchangeDollarFill } from "react-icons/ri";
import { VscGraphLine } from "react-icons/vsc";
import { LuClock } from "react-icons/lu";
import { GiReceiveMoney } from "react-icons/gi";

const About = () => {
  const { isDarkMode } = useContext(ShopContext);
  return (
    <div className={`${isDarkMode ? "dark" : ""} dark:bg-[var(--default)]`}>
      <NavBar />
      <div>
        <div class="bg-[url('https://www.mancity.com/meta/media/0hae1zok/tf308376-f-1920x1080-6d627c1.jpg?width=2560')] h-80 bg-cover bg-top">
          <div className="w-full h-full bg-black/60 flex flex-col items-center justify-center">
            {/* <p className="text-[15px] md:text-[20px] font-[600] mt-15 dark:text-[#f1f1f1] text-[#fff] tracking-wider capitalize mb-2">
              Available Bal : <span className="text-[tomato]">$300</span>
            </p> */}
            <p
              data-aos="fade-up"
              className="text-3xl text-center text-[#f1f1f1] md:text-5xl font-bold"
            >
              Get Hot Betting <br />
              <span className="bg-gradient-to-r from-[#f7b822] via-[#ff7300] to-[#f7b822] bg-clip-text text-transparent">
                Recommendation
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 flex-wrap items-center gap-y-10 gap-0 mt-10">
        <div
          data-aos="fade-up"
          className="flex flex-col justify-center items-center"
        >
          <h1 className="font-bold text-green-600 text-2xl">85%</h1>
          <p className="text-sm text-[#787878]">Win Rate</p>
        </div>
        <div
          data-aos="fade-up"
          className="flex flex-col justify-center items-center"
        >
          <h1 className="font-bold text-[tomato] text-2xl">10000+</h1>
          <p className="text-sm text-[#787878]">Happy Users</p>
        </div>
        <div
          data-aos="fade-up"
          className="flex flex-col justify-center items-center"
        >
          <h1 className="font-bold text-blue-500 text-2xl">24/7 </h1>
          <p className="text-sm text-[#787878]">support</p>
        </div>
        <div
          data-aos="fade-up"
          className="flex flex-col justify-center items-center"
        >
          <h1 className="font-bold text-fuchsia-500 text-2xl">5 Star</h1>
          <p className="text-sm text-[#787878]">Rating</p>
        </div>
      </div>
      <div className="mt-15 md:mt-20 text-center">
        <p
          data-aos="fade-up"
          className="text-[12px] dark:text-[#d3d3d3] text-[#787878] tracking-wider uppercase mb-1"
        >
          Games
        </p>
        <h1
          data-aos="fade-down"
          className="text-2xl dark:text-[#f1f1f1] md:text-4xl font-bold"
        >
          Why Choose{" "}
          <span className="bg-gradient-to-r from-[#f7b822] via-[#ff7300] to-[#f7b822] bg-clip-text text-transparent">
            SportsTips?
          </span>
        </h1>
      </div>
      <div className="mt-10 md:mt-15 flex-wrap flex gap-y-10 items-center justify-center ">
        <div
          data-aos="fade-up"
          className="px-13 md:px-0 w-[100%] sm:w-[50%] md:w-[23%] text-center flex flex-col justify-center items-center gap-2  cursor-pointer"
        >
          <div className="bg-green-100 p-2 rounded-2xl">
            <VscGraphLine className="text-emerald-700" size={40} />
          </div>
          <h1 className="text-[15px] font-[600] uppercase dark:text-[#f1f1f1]">
            Expert Analytics
          </h1>
          <p className="text-[15px] text-[#787878] dark:text-[#d3d3d3]">
            Professional analysts with years of experience in sports betting
          </p>
        </div>
        <div
          data-aos="fade-up"
          className="px-13 md:px-0 w-[100%] sm:w-[50%] md:w-[23%] text-center flex flex-col justify-center items-center gap-2  cursor-pointer"
        >
          <div className="bg-blue-100 p-2 rounded-2xl">
            <IoShieldHalfSharp className="text-blue-500" size={40} />
          </div>
          <h1 className="text-[14px] font-medium uppercase dark:text-[#f1f1f1]">
            Secure Platform
          </h1>
          <p className="text-sm text-[#787878] dark:text-[#d3d3d3]">
            Bank-grade security with encrypted transactions and data protection
          </p>
        </div>
        <div
          data-aos="fade-up"
          className="px-13 md:px-0 w-[100%] sm:w-[50%] md:w-[23%] text-center flex flex-col justify-center items-center gap-2  cursor-pointer"
        >
          <div className="bg-amber-100 p-2 rounded-2xl">
            <LuClock className="text-[var(--Primary)]" size={40} />
          </div>
          <h1 className="text-[14px] font-medium uppercase dark:text-[#f1f1f1]">
            Real-time Updates
          </h1>
          <p className="text-sm text-[#787878] dark:text-[#d3d3d3]">
            Get instant notifications for new tips and live match updates
          </p>
        </div>
        <div
          data-aos="fade-up"
          className="px-13 md:px-0 w-[100%] sm:w-[50%] md:w-[23%] text-center flex flex-col justify-center items-center gap-2  cursor-pointer"
        >
          <div className="bg-amber-100 p-2 rounded-2xl">
            <GiReceiveMoney className=" text-amber-600" size={40} />
          </div>
          <h1 className="text-[14px] font-medium uppercase dark:text-[#f1f1f1]">
            High Success Rate
          </h1>
          <p className="text-sm text-[#787878] dark:text-[#d3d3d3]">
            Proven track record with 78% average success rate across all sports
          </p>
        </div>
      </div>{" "}
      <div className="text-center mt-20">
        <p
          data-aos="fade-up"
          className="text-[12px] dark:text-[#f1f1f1] text-[#787878] tracking-wider uppercase mb-1"
        >
          Quick Overview
        </p>
        <h1
          data-aos="fade-up"
          className="text-2xl md:text-4xl font-bold dark:text-[#f1f1f1]"
        >
          How{" "}
          <span className="bg-gradient-to-r from-[#f7b822] via-[#ff7300] to-[#f7b822] bg-clip-text text-transparent">
            SportsTips
          </span>{" "}
          Works
        </h1>
        <p
          data-aos="fade-down"
          className="md:px-0 px-10 dark:text-[#f1f1f1] md:text-sm text-[#787878] mt-1"
        >
          Get started with premium sports betting tips in just 3 simple steps
        </p>
      </div>
      <div className=" md:px-10 px-6 w-full flex-wrap flex items-center justify-between gap-y-5 mt-10">
        <div
          data-aos="fade-up"
          className="md:w-[32%] w-[100%] px-5 h-[220px] border-1 border-gray-100 dark:border-gray-600 shadow-sm rounded-[15px] flex flex-col items-center justify-center gap-3 hover:shadow-lg duration-200 cursor-pointer"
        >
          <div className="w-15 h-15 bg-amber-100 text-white flex items-center justify-center rounded-full">
            <RiExchangeDollarFill size={25} className="text-amber-600" />
          </div>
          <h1 className="text-1xl font-[600] dark:text-[#f1f1f1] uppercase text-[var(--Default)]">
            Sign up & add funds
          </h1>
          <p className="text-sm text-[#787878] dark:text-[#d3d3d3] w-[80%] text-center">
            Create your account and add funds to your wallet securely. Get ₹25
            welcome bonus!
          </p>
        </div>
        <div
          data-aos="fade-up"
          className="md:w-[32%] w-[100%] px-5 h-[220px] border-1 border-gray-100 dark:border-gray-600 shadow-sm  rounded-[15px] flex flex-col items-center justify-center gap-3 hover:shadow-lg duration-200 cursor-pointer"
        >
          <div className="w-15 h-15 bg-[#ff63472a] text-white flex items-center justify-center rounded-full">
            <IoAnalytics size={25} className="text-[tomato]" />
          </div>
          <h1 className="text-1xl font-[600] dark:text-[#f1f1f1] uppercase color-[var(--Default)]">
            Browse Menu Tips
          </h1>
          <p className="text-sm text-[#787878] dark:text-[#d3d3d3] w-[80%] text-center">
            Explore our curated recommendations from professional analysts with
            proven track records.
          </p>
        </div>
        <div
          data-aos="fade-up"
          className="md:w-[32%]  w-[100%] px-5 h-[220px] border-1 border-gray-100 dark:border-gray-600 shadow-sm  rounded-[15px] flex flex-col items-center justify-center gap-3 hover:shadow-lg duration-200 cursor-pointer"
        >
          <div className="w-15 h-15 bg-emerald-100 text-white flex items-center justify-center rounded-full">
            <IoTrophyOutline size={25} className="text-emerald-800" />
          </div>
          <h1 className="text-1xl font-[600] dark:text-[#f1f1f1] uppercase color-[var(--Default)]">
            Place Bets & Win
          </h1>
          <p className="text-sm text-[#787878] dark:text-[#d3d3d3] w-[80%] text-center">
            Follow our expert analysis and place your bets with confidence.
            Track your success!
          </p>
        </div>
      </div>
      <div>
        <BackToTop />
        <Testimonial />
        <Footer />
      </div>
    </div>
  );
};

export default About;
