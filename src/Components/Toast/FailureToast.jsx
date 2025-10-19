import React from "react";
import { RxCross2 } from "react-icons/rx";

const FailureToast = ({ message, className }) => {
  return (
    <div className={`w-fit ${className}`}>
      <div className="flex items-center gap-3 bg-[#cf657166] backdrop-blur-xs border border-red-300 text-black px-4 py-3 rounded-2xl">
        <RxCross2 className="w-5 h-5 text-red-500" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default FailureToast;
