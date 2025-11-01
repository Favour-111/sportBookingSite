import React, { useContext } from "react";
import Item from "../components/Item";
import { GoArrowRight } from "react-icons/go";
import { ShopContext } from "../components/shopContext";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import BackToTop from "../components/BackToTop";
import image from "../assets/female-student-listening-webinar-online.png";
import backimg from "../assets/—Pngtree—creative vector dotted line dotted_6030768.png";
import Login from "../components/Login/Login";
import { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Recommendation = () => {
  const [form, setForm] = useState(false);
  const { isDarkMode, gameFilter, games, gameLoad } = useContext(ShopContext);
  return (
    <div className={`${isDarkMode ? "dark" : ""} dark:bg-[var(--default)]`}>
      <NavBar />
      <div>
        <div
          className="bg-[radial-gradient(circle_at_40%_10%,rgba(255,215,100,0.15),transparent_70%)]
    dark:bg-[radial-gradient(circle_at_40%_10%,rgba(255,255,255,0.08),transparent_10%)]"
        >
          <div className="home-banner-container flex items-center justify-between w-[100%] overflow-hidden px-6 sm:px-20 pt-15 md:pt-40">
            <div data-aos="fade-left" className="container1 sm:mt-2 mt-20">
              <div className="container-headersm dark:text-[#d3d3d3]">
                Sports Recommendations
              </div>

              <div className="container-headerBG text-[#111c54] dark:text-[#d3d3d3]">
                Expert Betting Tips & Game Insights
              </div>

              <div className="container-content text-[#111c54] dark:text-[#f6f6f6]">
                Stay ahead of the game with real-time predictions, expert
                analysis, and data-backed recommendations designed to help you
                make smarter bets and maximize your wins.
              </div>

              <div className="trusted-text">
                <div>
                  <IoMdCheckmarkCircleOutline color="green" />
                </div>
                <div> Expert-Backed Predictions </div>
              </div>
              <div className="trusted-text">
                <div>
                  <IoMdCheckmarkCircleOutline color="green" />
                </div>
                <div> Real-Time Game Insights </div>
              </div>
              <div className="trusted-text">
                <div>
                  <IoMdCheckmarkCircleOutline color="green" />
                </div>
                <div> Proven Winning Strategies </div>
              </div>
            </div>

            <div data-aos="fade-right" className="image-container-content">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/man-earning-online-money-illustration-svg-download-png-2621084.png"
                alt="Sports insights"
              />
              <div className="text-on-image2 shadow">
                <div className="text-head">Accurate</div>
                <div className="flex items-center justify-between mt-1">
                  <div className="text1">Game Predictions</div>
                  <div className="percentage">98%</div>
                </div>
              </div>

              <div className="blob1">
                <img src={backimg} alt="" />
              </div>
              <div className="blob2">
                <img src={backimg} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          className=" text-center flex flex-col items-center mt-20 justify-center"
        >
          <p className="text-[12px] mt-10 dark:text-[#f1f1f1] text-[#787878] tracking-wider uppercase mb-2">
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
          <p className="md:w-[50%] dark:text-[#d3d3d3] w-[100%] px-10 md:px-0 text-center text-sm text-[#787878] mt-2">
            Check out All our recommendations with high success rates. Join
            thousands of winning bettors today.
          </p>
        </div>
        {/* i am to put the featured games here */}
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
          <div className="flex mt-20 justify-center items-center flex-col gap-3">
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
                ?.reverse()
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
      <div>
        <BackToTop />
        <Footer />
        {form && <Login state={setForm} />}
      </div>
    </div>
  );
};

export default Recommendation;
