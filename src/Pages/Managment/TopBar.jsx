import React, { useContext } from "react";
import { FiUser } from "react-icons/fi";
import { TbMenu } from "react-icons/tb";
import { ShopContext } from "../../components/shopContext";
const TopBar = () => {
  const { navOpen, setNavOpen } = useContext(ShopContext);
  return (
    <div>
      <div className="bg-white px-6 border-b border-b-[#f1f1f1] py-2 flex items-end justify-between ">
        <button
          onClick={() => setNavOpen(true)}
          className="bg-[#f6f6f6] rounded-[10px] p-3"
        >
          <TbMenu />
        </button>
        <div className="flex items-center gap-2">
          <div className="bg-[#f6f6f6] p-3 rounded-full hover:bg-zinc-300 duration-200 relative">
            <FiUser />
            <div className="w-2 h-2 rounded-full bg-green-400 absolute bottom-1 right-[3px] border-1 border-[#f6f6f6]"></div>
          </div>
          {/* <div>
            <div className="text-[15px] text-[#252525]">Omojola obaloluwa</div>
            <div className="text-[11px] text-[#787878]">Administrator!</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
