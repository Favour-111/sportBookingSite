import React, { useContext } from "react";
import Item from "../components/Item";
import { GoArrowRight } from "react-icons/go";
import { ShopContext } from "../components/shopContext";
import NavBar from "../components/NavBar/NavBar";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { BsPercent } from "react-icons/bs";
import image from "../assets/female-student-listening-webinar-online.png";
import backimg from "../assets/—Pngtree—creative vector dotted line dotted_6030768.png";
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
import { LuClock, LuUsers } from "react-icons/lu";
import { GiReceiveMoney } from "react-icons/gi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdSupportAgent } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";

const About = () => {
  const { isDarkMode } = useContext(ShopContext);
  return (
    <div className={`${isDarkMode ? "dark" : ""} dark:bg-[var(--default)]`}>
      <NavBar />
      <div
        className="  bg-[radial-gradient(circle_at_40%_10%,rgba(255,215,100,0.15),transparent_70%)]
        dark:bg-[radial-gradient(circle_at_40%_10%,rgba(255,255,255,0.08),transparent_10%)]"
      >
        <div className="home-banner-container flex items-center justify-between w-[100%] overflow-hidden px-6 sm:px-20 pt-15 md:pt-40">
          <div data-aos="fade-left" className="container1 sm:mt-2 mt-20">
            <div className="container-headersm dark:text-[#d3d3d3]">
              About Us
            </div>
            <div className="container-headerBG text-[#111c54] dark:text-[#d3d3d3]">
              About SportsTips Your trusted guide to smarter betting
            </div>

            <div className="container-content text-[#111c54] dark:text-[#f6f6f6]">
              SportsTips is your trusted source for expert sports insights,
              match analysis, and winning strategies. We’re dedicated to helping
              fans and bettors make smarter, more confident decisions.
            </div>

            <div className="trusted-text">
              <div>
                <IoMdCheckmarkCircleOutline color="green" />
              </div>
              <div>Reliable</div>
            </div>
            <div className="trusted-text">
              <div>
                <IoMdCheckmarkCircleOutline color="green" />
              </div>
              <div> Transparent </div>
            </div>
            <div className="trusted-text">
              <div>
                <IoMdCheckmarkCircleOutline color="green" />
              </div>
              <div> Insight-Driven</div>
            </div>
          </div>
          <div data-aos="fade-right" className="image-container-content">
            <img src={image} alt="" />
            <div className="text-on-image2 shadow">
              <div className="text-head">Trusted</div>
              <div className="flex items-center justify-between mt-1">
                <div className="text1">Betting Tips</div>
                <div className="percentage">100%</div>
              </div>
            </div>
            {/* <div className="text-on-image2 shadow">
                      <div className="text-head">Trusted</div>
                      <div className="d-flex align-items-center justify-content-between mt-1">
                        <div className="text1">Fast Payment</div>
                        <div className="percentage">100%</div>
                      </div>
                    </div> */}
            <div className="blob1">
              <img src={backimg} alt="" />
            </div>
            <div className="blob2">
              <img src={backimg} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-15 md:mt-20 text-center">
        <p
          data-aos="fade-up"
          className="text-[12px] dark:text-[#d3d3d3] text-[#787878] tracking-wider uppercase mb-1"
        >
          OUR SERVICE
        </p>
        <h1
          data-aos="fade-down"
          className="text-2xl dark:text-[#f1f1f1] md:text-4xl font-bold"
        >
          Who{" "}
          <span className="bg-gradient-to-r from-[#f7b822] via-[#ff7300] to-[#f7b822] bg-clip-text text-transparent">
            we are
          </span>
        </h1>
      </div>
      <div className="md:flex block space-y-7 gap-10 md:px-25 px-7 mt-10 md:mt-15">
        <div className="md:w-[48%] w-[100%]">
          <h1 className="font-bold text-[#111c54] dark:text-[#d3d3d3] text-[25px] sm:text-[35px] w-[100%] md:w-[60%]">
            Empowering Bettors with Smart Insights
          </h1>
          <p className="md:w-[80%] w-[100%] text-[#787878] mt-5">
            At SportsTips, we believe betting should be about strategy, not
            luck. Our mission is to provide data-driven insights, expert
            recommendations, and real-time analysis to help you make informed
            decisions and maximize your winnings. Whether you're a beginner or a
            pro, we’re here to guide you every step of the way.
          </p>
          <div className="flex items-center gap-1 mt-10">
            <div>
              <IoShieldHalfSharp color="green" />
            </div>
            <div className="text-[#787878] text-[12px]">
              100% trusted betting recommendations site
            </div>
          </div>
        </div>
        <div className="w-[100%] md:w-[48%]">
          <img
            src="https://img.freepik.com/premium-photo/online-sports-betting-dollars-are-falling-background-hand-with-smartphone-soccer-ball-creative-background-gambling_99433-5018.jpg"
            alt=""
            className="rounded-[15px]"
          />
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
      <div className="w-[100%] bg-amber-50 dark:bg-[#141b2b5a] sm:p-20 p-10 mt-20 grid space-y-10  grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-items-center ">
        <div className="text-center flex flex-col items-center">
          <div>
            <LuUsers className="text-[50px] text-[var(--Primary)]" />
          </div>
          <div className="font-[800] text-[30px] dark:text-white sm:text-[40px]">
            1000+
          </div>
          <h1 className="text-sm text-[#787878]">Happy Customers</h1>
        </div>
        <div className="text-center flex flex-col items-center">
          <div>
            <MdSupportAgent className="text-[50px] text-[var(--Primary)]" />
          </div>
          <div className="font-[800] text-[30px] dark:text-white sm:text-[40px]">
            24/7
          </div>
          <h1 className="text-sm text-[#787878]"> Support</h1>
        </div>
        <div className="text-center flex flex-col items-center">
          <div>
            <BiCommentDetail className="text-[50px] text-[var(--Primary)]" />
          </div>
          <div className="font-[800] dark:text-white flex items-center gap-1 text-[30px] sm:text-[40px]">
            <span>5</span>{" "}
            <span>
              <FaStar color="tomato" />
            </span>
          </div>
          <h1 className="text-sm text-[#787878]">Customer Rating</h1>
        </div>
      </div>
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
          className="md:w-[32%] w-[100%] px-5 h-[220px]  rounded-[15px] flex flex-col items-center justify-center gap-3  duration-200 cursor-pointer"
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
          className="md:w-[32%] w-[100%] px-5 h-[220px]   rounded-[15px] flex flex-col items-center justify-center gap-3  duration-200 cursor-pointer"
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
          className="md:w-[32%]  w-[100%] px-5 h-[220px]   rounded-[15px] flex flex-col items-center justify-center gap-3  duration-200 cursor-pointer"
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
