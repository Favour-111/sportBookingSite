import React, { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import { faqData } from "./faq";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, i) => {
      if (ref) {
        if (openIndex === i) {
          ref.style.maxHeight = ref.scrollHeight + "px";
        } else {
          ref.style.maxHeight = "0px";
        }
      }
    });
  }, [openIndex]);

  return (
    <div className="max-w-3xl mt-20 mx-auto px-5 py-10">
      {/* כותרת */}
      <div className="text-center mb-10">
        <h1 className="dark:text-white text-3xl md:text-4xl font-bold text-[var(--Default)]">
          🏆 שאלות{" "}
          <span className="bg-gradient-to-r from-[#f7b822] via-[#ff7300] to-[#f7b822] bg-clip-text text-transparent">
            נפוצות
          </span>
        </h1>
        <p className="text-gray-600 text-[14px] dark:text-gray-300 mt-2">
          יש שאלות? יש תשובות! כל מה שרציתם לדעת על עלינו במקום אחד.
        </p>
      </div>

      {/* אקורדיון */}
      <div className="space-y-3">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border dark:border-gray-700 border-white rounded-xl bg-white dark:bg-[#1b1f29] overflow-hidden shadow-sm transition-all duration-300"
          >
            <button
              className="w-full flex justify-between items-center px-5 py-4 text-left focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {faq.question}
              </span>
              <IoChevronDown
                className={`text-gray-500 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
                size={20}
              />
            </button>

            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className="px-5 text-gray-600 text-sm dark:text-gray-400 overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: "0px" }}
            >
              <div className="pb-4">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;