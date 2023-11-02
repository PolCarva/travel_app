import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import SearchInput from "./SearchInput";

const Header = () => {
  const handleFilterClick = () => {};
  return (
    <header className="h-24">
      <div className="flex justify-around items-center h-full bg-white gap-5 px-5">
        <div className="p-3 shadow-custom rounded-full group hover:scale-110 transition-transform">
          <FaHeart className="h-6 w-6 group-hover:text-secondary transition-colors" />
        </div>
        <SearchInput onFilterClick={handleFilterClick} />
      </div>
    </header>
  );
};

export default Header;
