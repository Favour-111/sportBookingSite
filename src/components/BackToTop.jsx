import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const BackToTop = () => {
  return (
    <div>
      <div
        onClick={() => window.scrollTo(0, 0)}
        className="fixed bottom-5 right-5 bg-[var(--Primary)] p-4 rounded-full cursor-pointer hover:shadow-lg shadow-sm shadow-amber-300 duration-200"
      >
        <AiOutlineArrowUp color="white" />
      </div>
    </div>
  );
};

export default BackToTop;
