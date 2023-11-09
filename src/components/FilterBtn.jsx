import React from "react";

const FilterBtn = ({ text, isActive = false, value, handleChange }) => {
  const activeStyles = isActive
    ? "bg-black hover:bg-black-hover text-white"
    : "bg-gray-10 hover:bg-gray-200 text-gray-50";
  return (
    <div
    onClick={() => handleChange(value)}
      className={`${activeStyles} flex-1 text-sm transition-colors ease-in-out duration-300 cursor-pointer text-center py-2 px-1 rounded-full`}
    >
      {text}
    </div>
  );
};

export default FilterBtn;
