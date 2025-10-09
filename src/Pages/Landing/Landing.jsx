import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { RiExchangeDollarFill } from "react-icons/ri";
import { LuClock, LuLoader2 } from "react-icons/lu";
import { GiReceiveMoney } from "react-icons/gi";
import { BiSolidQuoteLeft } from "react-icons/bi";
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
const Landing = () => {
  const { isDarkMode, user } = useContext(ShopContext);
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
    console.log(login);
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
            className="w-full relative overflow-hidden h-[95vh] md:h-[100vh] flex flex-col items-center justify-center
  bg-[radial-gradient(circle_at_40%_10%,rgba(255,215,100,0.15),transparent_70%)]
  dark:bg-[radial-gradient(circle_at_40%_10%,rgba(255,255,255,0.08),transparent_10%)]"
          >
            <img
              data-aos="fade-left"
              data-aos-once="true"
              style={{ opacity: 0.25 }}
              src="https://png.pngtree.com/png-vector/20250708/ourmid/pngtree-orange-basketball-png-image_16721120.webp"
              alt=""
              loading="lazy"
              className="absolute left-[-40px] md:left-[-60px] bottom-0 w-40 md:w-60"
            />

            <img
              data-aos="fade-right"
              data-aos-once="true"
              style={{ opacity: 0.25 }}
              src="https://static.vecteezy.com/system/resources/thumbnails/035/733/654/small_2x/ai-generated-american-football-ball-isolated-on-transparent-background-png.png"
              alr=""
              loading="lazy"
              className="absolute opacity-25 right-[-10px] md:right-[0] top-0 w-40 md:w-60"
            />

            <p
              data-aos="fade-up"
              className="text-sm dark:bg-zinc-600 dark:text-white bg-[#f1f1f1] p-1 px-4 rounded-[5px]"
            >
              ⚽Best Sport Recommendation
            </p>
            <h1
              data-aos="fade-up"
              className="text-3xl md:w-[70%] w-[90%] dark:text-white sm:text-5xl md:text-6xl font-bold mt-5 text-center"
            >
              <span className="bg-gradient-to-r from-[#f7b822] via-[#ff7300] to-[#f7b822] bg-clip-text text-transparent">
                Premium Sports Betting
              </span>{" "}
              <span className="text-[var(--Primary)]">Intelligence.</span>
            </h1>
            <p
              data-aos="fade-up"
              className="mt-5 dark:text-[#d3d3d3] text-center text-[14px] md:text-[16px] md:w-[53%] w-[90%]"
            >
              Get exclusive recommendations from professional analysts with{" "}
              <span>
                proven track records.{" "}
                <span className="text-[tomato] font-medium">
                  {" "}
                  Start winning today🏆.
                </span>
              </span>
            </p>
            <div className="flex md:flex-row flex-col  items-center gap-5 mt-8 ">
              <button
                onClick={() => !user && setForm(true)}
                data-aos="fade-down"
                className="btn"
              >
                Start Winning Now
              </button>
              <button
                data-aos="fade-down"
                onClick={() => !user && setForm(true)}
                className="text-sm flex items-center gap-2 justify-center border dark:shadow-none bg:border-[#787878] dark:text-[#d3d3d3] dark:hover:shadow-none dark:bg-[#ffffff18] border-zinc-300 bg-zinc-200  sm:py-[10px] sm:px-8 px-5 py-[9px]  rounded-[12px] shadow-md hover:shadow-lg hover:bg-zinc-500 duration-300 hover:text-[#fff] shadow-zinc-200"
              >
                <div>Get started Now </div>
                <div>
                  <FaArrowRightLong />
                </div>
              </button>
            </div>
          </div>
          <div className="text-center">
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
            className=" md:px-10 px-6 w-full flex-wrap flex items-center justify-between gap-y-5 mt-10"
          >
            <div className="md:w-[32%] w-[100%] px-5 h-[220px] border-1 border-none dark:border-gray-600 shadow-lg rounded-[20px] flex flex-col items-center justify-center gap-3 hover:shadow-lg duration-200 cursor-pointer">
              <div className="w-15 h-15 bg-amber-100 shadow-sm shadow-amber-100 text-white flex items-center justify-center rounded-full">
                <RiExchangeDollarFill size={25} className="text-amber-600 " />
              </div>
              <h1 className="text-1xl font-[600] dark:text-[#f1f1f1] uppercase text-[var(--Default)]">
                Sign up & add funds
              </h1>
              <p className="text-sm text-[#787878] dark:text-[#d3d3d3] w-[80%] text-center">
                Create your account and add funds to your wallet securely. Get
                ₹25 welcome bonus!
              </p>
            </div>
            <div className="md:w-[32%] w-[100%] px-5 h-[220px] border-1 border-none dark:border-gray-600 shadow-lg rounded-[20px] flex flex-col items-center justify-center gap-3 hover:shadow-lg duration-200 cursor-pointer">
              <div className="w-15 h-15 bg-[#ff63472a] shadow-sm shadow-red-100 text-white flex items-center justify-center rounded-full">
                <IoAnalytics size={25} className="text-[tomato]" />
              </div>
              <h1 className="text-1xl font-[600] dark:text-[#f1f1f1] uppercase color-[var(--Default)]">
                Browse Menu Tips
              </h1>
              <p className="text-sm text-[#787878] dark:text-[#d3d3d3] w-[80%] text-center">
                Explore our curated recommendations from professional analysts
                with proven track records.
              </p>
            </div>
            <div className="md:w-[32%] w-[100%] px-5 h-[220px] border-1 border-none dark:border-gray-600 shadow-lg rounded-[20px] flex flex-col items-center justify-center gap-3 hover:shadow-lg duration-200 cursor-pointer">
              <div className="w-15 h-15 bg-emerald-100 shadow-sm shadow-emerald-100 text-white flex items-center justify-center rounded-full">
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
          </div>
          {/* i am to put the featured games here */}
          <div className="w-full ">
            <div className="mt-10 w-[90%]  mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 place-items-center">
              <div data-aos="fade-up" className="w-full max-w-sm">
                <Item />
              </div>
              <div data-aos="fade-up" className="w-full max-w-sm">
                <Item />
              </div>
              <div data-aos="fade-up" className="w-full max-w-sm">
                <Item />
              </div>
              <div data-aos="fade-up" className="w-full max-w-sm">
                <Item />
              </div>
              <div data-aos="fade-up" className="w-full max-w-sm">
                <Item />
              </div>
              <div data-aos="fade-up" className="w-full max-w-sm">
                <Item />
              </div>
              {/* <Link
            data-aos="fade-down"
            to="/recommendations"
            className="col-span-full mx-auto bg-[var(--Primary)] text-[12px] shadow shadow-amber-300 text-white px-5 py-2 rounded-[10px] flex items-center gap-2 hover:shadow-lg hover:shadow-amber-300 duration-200"
          >
            View all Recommendation <GoArrowRight />
          </Link> */}
              <div className="col-span-full" data-aos="fade-down">
                <button class="cssbuttons-io-button">
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
          <BackToTop />
          {form && <Login state={setForm} />}
        </div>
      )}{" "}
    </div>
  );
};

export default Landing;
