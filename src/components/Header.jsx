import React from "react";
import { FaHeart } from "react-icons/fa6";
import SearchInput from "./SearchInput";

const Header = ({ toggleLikedList, showLikeList, handleSearch }) => {
  const handleFilterClick = () => {};

  return (
    <header className="h-[20vh] p-4">
      <div className="flex justify-around items-center h-full bg-white gap-5 px-5">
        <div
          className="p-3 shadow-custom rounded-full"
          onClick={toggleLikedList}
        >
          <FaHeart className={`h-6 w-6 ${showLikeList ? "text-secondary" : "text-black"}`} />
        </div>
        <SearchInput onFilterClick={handleFilterClick} handleSearch={handleSearch} />
      </div>
    </header>
  );
};

export default Header;
