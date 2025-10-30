import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { RiExchangeDollarFill } from "react-icons/ri";
import { LuClock, LuLoader2 } from "react-icons/lu";
import { GiReceiveMoney } from "react-icons/gi";
import { HiOutlineShieldCheck } from "react-icons/hi";
import image from "../../assets/Bitcoin-bro.png";
import backimg from "../../assets/—Pngtree—creative vector dotted line dotted_6030768.png";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { LiaTrophySolid } from "react-icons/lia";
import {
  IoAnalytics,
  IoShieldHalfSharp,
  IoTrendingUp,
  IoTrophyOutline,
} from "react-icons/io5";
import { GoArrowRight } from "react-icons/go";
import { VscGraphLine } from "react-icons/vsc";
import testimonials from "../../data/testimonials";
import Testimonial from "../../components/Testimonial";
import Footer from "../../components/Footer/Footer";
import PopUP from "../../components/PopUp/PopUP";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Item from "../../components/Item";
import { ShopContext } from "../../components/shopContext";
import BackToTop from "../../components/BackToTop";
import Login from "../../components/Login/Login";
import LoadingScreen from "../../components/loading/Loader";
import { FaArrowRightLong } from "react-icons/fa6";
import { PiSoccerBallThin } from "react-icons/pi";
const Landing = () => {
  const { isDarkMode, user, games, gameFilter, gameLoad } =
    useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // cleanup
  }, []);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [form, setForm] = useState(false);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogin({ ...login, [name]: value });
  };
  const submitForm = () => {
    // console.log(login);
  };
  localStorage.setItem("modalShown", true);
  const mode = localStorage.getItem("darkMode");

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className={`${isDarkMode ? "dark" : ""} dark:bg-[var(--default)]`}>
          <NavBar />
          <div
            className="  bg-[radial-gradient(circle_at_40%_10%,rgba(255,215,100,0.15),transparent_70%)]
  dark:bg-[radial-gradient(circle_at_40%_10%,rgba(255,255,255,0.08),transparent_10%)]"
          >
            <div className="home-banner-container flex items-center justify-between w-[100%] overflow-hidden px-6 sm:px-20 pt-15 md:pt-40">
              <div data-aos="fade-left" className="container1 sm:mt-2 mt-20">
                <div className="container-headersm dark:text-[#d3d3d3]">
                  our service
                </div>
                <div className="container-headerBG text-[#111c54] dark:text-[#d3d3d3]">
                  Join the winning community of smart bettors
                </div>
                <div className="container-content text-[#111c54] dark:text-[#f6f6f6]">
                  Get exclusive tips, real-time game analysis, and expert
                  betting recommendations all designed to help you win more.
                </div>
                <div className="button-group">
                  <button
                    className="Read-More"
                    onClick={() => !user && setForm(true)}
                  >
                    Start winning Now
                  </button>
                  <button
                    className="contact-button"
                    onClick={() => !user && setForm(true)}
                  >
                    Get Started
                  </button>
                </div>
                <div className="trusted-text">
                  <div>
                    <HiOutlineShieldCheck className="mb-1" color="green" />
                  </div>
                  <div>Trusted Betting Recommendations</div>
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
          <div className="mt-20  text-center flex flex-col items-center justify-center">
            <p
              data-aos="fade-up"
              className="text-[12px] dark:text-[#f1f1f1] text-[#787878] tracking-wider uppercase mb-2"
            >
              Games
            </p>
            <h1
              data-aos="fade-up"
              className="text-2xl dark:text-[#f1f1f1] md:text-4xl font-bold"
            >
              Featured{" "}
              <span className="bg-gradient-to-r from-[#f7b822] via-[#ff7300] to-[#f7b822] bg-clip-text text-transparent">
                Premium Tips
              </span>
            </h1>
            <p
              data-aos="fade-up"
              className="md:w-[50%] dark:text-[#d3d3d3] w-[100%] px-10 md:px-0 text-center text-sm text-[#787878] mt-2"
            >
              Check out our most popular recommendations with high success
              rates. Join thousands of winning bettors today.
            </p>
            {gameLoad ? (
              <div className="h-150 gap-2 flex flex-col items-center justify-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="text-sm">Loading...</div>
              </div>
            ) : gameFilter.length <= 0 ? (
              <div className="my-20 flex justify-center items-center flex-col gap-3">
                <div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2039/2039083.png"
                    alt=""
                    width={100}
                  />
                </div>
                <div className="text-center text-20 text-gray-500">
                  No Games available
                </div>
              </div>
            ) : (
              <div className="w-full ">
                <div className="mt-10 w-[90%]  mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 place-items-center">
                  {gameFilter
                    .reverse()
                    .slice(0, 6)
                    .map((item) => {
                      return (
                        <div data-aos="fade-up" className="w-full max-w-sm">
                          <Item item={item} setForm={setForm} />
                        </div>
                      );
                    })}

                  {/* <Link
                  data-aos="fade-down"
                  to="/recommendations"
                  className="col-span-full mx-auto bg-[var(--Primary)] text-[12px] shadow shadow-amber-300 text-white px-5 py-2 rounded-[10px] flex items-center gap-2 hover:shadow-lg hover:shadow-amber-300 duration-200"
                >
                  View all Recommendation <GoArrowRight />
                </Link> */}
                  <div className="col-span-full" data-aos="fade-down">
                    <button
                      onClick={() => setForm(true)}
                      class="cssbuttons-io-button"
                    >
                      View all Recommendation
                      <div class="icon">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* i am to put the featured games here */}
          <div className="dark:bg-slate-800 bg-[#f8f9fa] mt-20 md:px-[40px] py-20 px-[5px]">
            <div className="text-center ">
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
                data-aos="fade-up"
                className="md:px-0 px-10 dark:text-[#f1f1f1] md:text-sm text-[#787878] mt-1"
              >
                Get started with premium sports betting tips in just 3 simple
                steps
              </p>
            </div>
            <div
              data-aos="fade-up"
              className=" md:px-10 px-2 w-full grid sm:grid-cols-2 grid-cols-1 justify-between md:gap-y-5 gap-y-0 mt-10"
            >
              <div className=" md:w-[80%] w-[100%] px-5 h-[220px] border-1 border-none dark:border-gray-600  rounded-[20px] flex flex-col  justify-center gap-3  duration-200 cursor-pointer">
                <div className="w-13 h-13 bg-[#e3e5ea] text-white flex items-center justify-center rounded-full">
                  <RiExchangeDollarFill size={25} className="text-[#212529] " />
                </div>
                <h1 className="text-1xl font-[600] dark:text-[#f1f1f1] uppercase text-[var(--Default)]">
                  Sign up & add funds
                </h1>
                <p className="text-sm text-[#787878] dark:text-[#d3d3d3] md:w-[80%] w-[100%] ">
                  Create your account and add funds to your wallet securely. Get
                  ₹25 welcome bonus!
                </p>
              </div>
              <div className=" md:w-[80%] w-[100%] px-5 h-[220px] border-1 border-none dark:border-gray-600  rounded-[20px] flex flex-col  justify-center gap-3  duration-200 cursor-pointer">
                <div className="w-13 h-13 bg-[#e3e5ea] text-white flex items-center justify-center rounded-full">
                  <IoAnalytics size={25} className="text-[#212529] " />
                </div>
                <h1 className="text-1xl font-[600] dark:text-[#f1f1f1] uppercase text-[var(--Default)]">
                  Browse Menu Tips
                </h1>
                <p className="text-sm text-[#787878] dark:text-[#d3d3d3] md:w-[80%] w-[100%] ">
                  Explore our curated recommendations from professional analysts
                  with proven track records.
                </p>
              </div>
              <div className="md:w-[80%] w-[100%] px-5 h-[220px] border-1 border-none dark:border-gray-600  rounded-[20px] flex flex-col  justify-center gap-3  duration-200 cursor-pointer">
                <div className="w-13 h-13 bg-[#e3e5ea] text-white flex items-center justify-center rounded-full">
                  <IoTrophyOutline size={25} className="text-[#212529] " />
                </div>
                <h1 className="text-1xl font-[600] dark:text-[#f1f1f1] uppercase text-[var(--Default)]">
                  Place Bets & Win
                </h1>
                <p className="text-sm text-[#787878] dark:text-[#d3d3d3] md:w-[80%] w-[100%] ">
                  Follow our expert analysis and place your bets with
                  confidence. Track your success!
                </p>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" className="mt-20 text-center">
            <p className="text-[12px] dark:text-[#d3d3d3] text-[#787878] tracking-wider uppercase mb-1">
              Games
            </p>
            <h1
              data-aos="fade-up"
              className="text-2xl dark:text-[#f1f1f1] md:text-4xl font-bold"
            >
              Why Choose{" "}
              <span className="bg-gradient-to-r from-[#f7b822] via-[#ff7300] to-[#f7b822] bg-clip-text text-transparent">
                SportsTips?
              </span>
            </h1>
          </div>
          <div
            data-aos="fade-up"
            className="mt-10 md:mt-15 flex-wrap flex gap-y-10 items-center justify-center "
          >
            <div className="px-13 md:px-0 w-[100%] sm:w-[50%] md:w-[23%] text-center flex flex-col justify-center items-center gap-2  cursor-pointer">
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
            <div className="px-13 md:px-0 w-[100%] sm:w-[50%] md:w-[23%] text-center flex flex-col justify-center items-center gap-2  cursor-pointer">
              <div className="bg-blue-100 p-2 rounded-2xl">
                <IoShieldHalfSharp className="text-blue-500" size={40} />
              </div>
              <h1 className="text-[14px] font-medium uppercase dark:text-[#f1f1f1]">
                Secure Platform
              </h1>
              <p className="text-sm text-[#787878] dark:text-[#d3d3d3]">
                Bank-grade security with encrypted transactions and data
                protection
              </p>
            </div>
            <div className="px-13 md:px-0 w-[100%] sm:w-[50%] md:w-[23%] text-center flex flex-col justify-center items-center gap-2  cursor-pointer">
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
            <div className="px-13 md:px-0 w-[100%] sm:w-[50%] md:w-[23%] text-center flex flex-col justify-center items-center gap-2  cursor-pointer">
              <div className="bg-amber-100 p-2 rounded-2xl">
                <GiReceiveMoney className=" text-amber-600" size={40} />
              </div>
              <h1 className="text-[14px] font-medium uppercase dark:text-[#f1f1f1]">
                High Success Rate
              </h1>
              <p className="text-sm text-[#787878] dark:text-[#d3d3d3]">
                Proven track record with 78% average success rate across all
                sports
              </p>
            </div>
          </div>{" "}
          <div>
            <Testimonial />
          </div>
          <div>
            <Footer />
          </div>
          <PopUP />
          {form && <Login state={setForm} />}
        </div>
      )}{" "}
    </div>
  );
};

export default Landing;
