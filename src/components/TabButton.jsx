import React from "react";
import { FaLocationDot, FaListUl } from "react-icons/fa6";

const TabButton = ({ isActive, type, text, toggleActive }) => {
  let icon;
  switch (type) {
    case "map":
      icon = <FaLocationDot className="w-5 h-5" />;
      break;
    case "list":
      icon = <FaListUl className="w-5 h-5" />;
      break;
    default:
      icon = null;
  }
  return (
    <div
      onClick={toggleActive}
      className={`
      py-2 rounded-xl flex-1 flex items-center justify-center text-xl gap-2 font-medium
      ${isActive ? "bg-black text-white" : "bg-gray-10 text-gray-50"}`}
    >
      {icon}
      {text}
    </div>
  );
};

export default TabButton;
