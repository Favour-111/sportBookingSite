import React from "react";
import testimonials from "../data/testimonials";
import { BiSolidQuoteLeft } from "react-icons/bi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/slick-fix.css";
const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    centerMode: false,
  };
  const settings2 = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    centerMode: false,
  };
  const settings3 = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    centerMode: false,
  };

  return (
    <div>
      {" "}
      <div className="text-center  mt-20">
        <p
          data-aos="fade-up"
          className="text-[12px] dark:text-[#d3d3d3] text-[#787878] tracking-wider uppercase mb-2"
        >
          Testimonial
        </p>
        <h1
          data-aos="fade-up"
          className="text-2xl md:text-4xl font-bold dark:text-[#fff]"
        >
          Trusted by <span className="text-[tomato]">10,000+ </span> Bettors
        </h1>
        <p
          data-aos="fade-up"
          className="md:px-0 px-6 text-sm dark:text-[#d3d3d3] text-[#787878] mt-2"
        >
          See what our community is saying about SportsTips premium tips
        </p>
      </div>
      <div data-aos="fade-up" className="hidden md:block mt-10 px-1 md:px-20">
        <Slider {...settings}>
          {testimonials.map((item) => {
            return (
              <div key={item.id}>
                <article className="w-full box-border shadow-lg rounded-[15px] p-5 bg-white/80 dark:bg-slate-800/60 h-full">
                  <div className="flex items-center justify-center border border-gray-200 rounded-full p-3 w-max ">
                    <BiSolidQuoteLeft color="#d3d3d3" size={22} />
                  </div>
                  <div className="mt-3 text-[15px] text-slate-700 dark:text-slate-200">
                    {item.text.slice(0, 100)}
                  </div>
                  <div className="h-px w-full bg-gray-100 dark:bg-gray-400 mt-5"></div>
                  <div className="flex items-center gap-3 mt-3">
                    <div>
                      <img
                        src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold dark:text-[white]">
                        {item.name}
                      </div>
                      <div className="text-[12px] text-[#787878] dark:text-[#d3d3d3]">
                        {item.role}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </Slider>
      </div>
      <div data-aos="fade-up" className="sm:hidden block mt-10 px-1 md:px-20">
        <Slider {...settings3}>
          {testimonials.map((item) => {
            return (
              <div key={item.id}>
                <article className="w-full box-border shadow-lg rounded-[15px] p-5 bg-white/80 dark:bg-slate-800/60 h-full">
                  <div className="flex items-center justify-center border border-gray-200 rounded-full p-3 w-max ">
                    <BiSolidQuoteLeft color="#d3d3d3" size={22} />
                  </div>
                  <div className="mt-3 text-[15px] text-slate-700 dark:text-slate-200">
                    {item.text.slice(0, 100)}
                  </div>
                  <div className="h-px w-full bg-gray-100 dark:bg-gray-400 mt-5"></div>
                  <div className="flex items-center gap-3 mt-3">
                    <div>
                      <img
                        src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold dark:text-[white]">
                        {item.name}
                      </div>
                      <div className="text-[12px] text-[#787878] dark:text-[#d3d3d3]">
                        {item.role}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
