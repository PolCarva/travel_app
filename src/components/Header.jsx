import React from "react";
import { FaHeart } from "react-icons/fa6";
import SearchInput from "./SearchInput";
import SearchCityInput from "./SearchCityInput";

const Header = ({
  toggleLikedList,
  showLikeList,
  handleSearch,
  toggleFilter,
  onPlaceSelected,
}) => {
  return (
    <header className="h-[20vh] flex justify-between">
      <div className="flex justify-between gap-5 items-center h-full w-full lg:w-1/3 px-5 lg:px-10">
        <div
          className="p-3 shadow-custom rounded-full cursor-pointer hover:scale-110 transition-transform ease-in-out duration-300 group"
          onClick={toggleLikedList}
        >
          <FaHeart
            className={`h-6 w-6 group-hover:text-secondary-hover transition-colors ease-in-out ${
              showLikeList ? "text-secondary" : "text-black"
            }`}
          />
        </div>
        <div></div>
        <SearchInput
          placeholder={"Search Places"}
          onFilterClick={toggleFilter}
          handleSearch={handleSearch}
        />
      </div>
      <div className="hidden lg:flex gap-5 justify-center items-center h-full lg:w-1/3">
        <img
          src="/img/logo.svg"
          alt="Hotel & Travel"
          className="h-12 aspect-square select-none"
        />
        <span className="font-bold text-2xl select-none">Hotel & Travel</span>
      </div>
      <div className="hidden lg:flex justify-end gap-5 items-center h-full lg:w-1/3 px-10">
        <SearchCityInput
          onPlaceSelected={onPlaceSelected}
          enableFilter={false}
          placeholder={"Search City"}
        />
      </div>
    </header>
  );
};

export default Header;
