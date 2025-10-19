import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Toast = ({ message, className }) => {
  return (
    <div className={`w-fit ${className}`}>
      <div className="flex items-center gap-3 bg-[#BBDD9A66] backdrop-blur-xs border border-green-300 text-black px-4 py-3 rounded-2xl shadow-lg">
        <AiOutlineCheckCircle className="w-5 h-5 text-green-500" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
