import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

const Loader = () => {
  return (
    <div className="text-[70px] flex items-center justify-center w-screen h-screen bg-zinc-900 animate-spin z-20">
      <BiLoaderAlt />
    </div>
  );
};

export default Loader;
