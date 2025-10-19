import { RiErrorWarningLine } from "react-icons/ri";

const InfoToast = ({ message, className }) => {
  return (
    <div className={`w-fit ${className}`}>
      <div className="flex items-center gap-3 bg-[#3c423766] backdrop-blur-xs border border-gray-300 text-black px-4 py-3 rounded-2xl shadow-lg">
        <RiErrorWarningLine className="w-5 h-5 text-gray-800" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default InfoToast;
