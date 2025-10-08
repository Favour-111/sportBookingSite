import React, { useContext } from "react";
import Item from "../components/Item";
import { GoArrowRight } from "react-icons/go";
import { ShopContext } from "../components/shopContext";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import BackToTop from "../components/BackToTop";

const Recommendation = () => {
  const { isDarkMode } = useContext(ShopContext);
  return (
    <div className={`${isDarkMode ? "dark" : ""} dark:bg-[var(--default)]`}>
      <NavBar />
      <div>
        <div class="bg-[url('https://www.mancity.com/meta/media/0hae1zok/tf308376-f-1920x1080-6d627c1.jpg?width=2560')] h-80 bg-cover bg-top">
          <div className="w-full h-full bg-black/60 flex flex-col items-center justify-center">
            <p
              data-aos="fade-down"
              className="text-[15px] md:text-[20px] font-[600] mt-15 dark:text-[#f1f1f1] text-[#fff] tracking-wider capitalize mb-2"
            >
              Available Bal : <span className="text-[tomato]">$300</span>
            </p>
            <p
              data-aos="fade-down"
              className="text-3xl text-center text-[#f1f1f1] md:text-5xl font-bold"
            >
              Get Hot Betting <br />
              <span className="text-[var(--Primary)]">Recommendation</span>
            </p>
          </div>
        </div>
        <div
          data-aos="fade-up"
          className=" text-center flex flex-col items-center justify-center"
        >
          <p className="text-[12px] mt-10 dark:text-[#f1f1f1] text-[#787878] tracking-wider uppercase mb-2">
            Games
          </p>
          <h1
            data-aos="fade-up"
            className="text-2xl dark:text-[#f1f1f1] md:text-4xl font-bold"
          >
            Featured <span className="text-[var(--Primary)]">Premium Tips</span>
          </h1>
          <p className="md:w-[50%] dark:text-[#d3d3d3] w-[100%] px-10 md:px-0 text-center text-sm text-[#787878] mt-2">
            Check out All our recommendations with high success rates. Join
            thousands of winning bettors today.
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
          </div>
        </div>
      </div>
      <div>
        <BackToTop />
        <Footer />
      </div>
    </div>
  );
};

export default Recommendation;
