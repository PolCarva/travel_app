import { FiSearch } from "react-icons/fi";
import { PiSlidersHorizontalBold } from "react-icons/pi";

const SearchInput = ({ onFilterClick, enableFilter = true, handleSearch }) => {
  return (
    <div className="flex items-center px-4 py-2 rounded-full bg-white shadow-custom">
      <FiSearch className="text-gray-100 h-6 w-6 mr-4" />

      <input
        onChange={(e) => handleSearch(e)}
        type="text"
        className="flex-1 py-2 bg-white outline-none"
        placeholder="Search Places"
        aria-label="Search places"
      />

      {enableFilter && (
        <div
          className="h-8 w-8 aspect-square ml-4 grid place-items-center rounded-full border border-gray-100"
          onClick={onFilterClick}
        >
          <PiSlidersHorizontalBold className="text-gray-100 h-4 w-4  cursor-pointer" />
        </div>
      )}
    </div>
  );
};

export default SearchInput;
