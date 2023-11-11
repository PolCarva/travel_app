import { FiSearch } from "react-icons/fi";
import { PiSlidersHorizontalBold } from "react-icons/pi";

const SearchInput = ({
  onFilterClick,
  enableFilter = true,
  handleSearch,
  placeholder,
}) => {
  return (
    <div className="flex items-center px-4 py-2 rounded-full bg-white shadow-custom relative">
      <div className="flex gap-2 items-center flex-1 pr-8">
        <FiSearch className="text-gray-100 h-6 w-6" />

        <input
          onChange={(e) => handleSearch(e)}
          type="text"
          className="flex-1 py-2 bg-white outline-none w-full select-none"
          placeholder={placeholder}
          aria-label="Search places"
        />
      </div>

      {enableFilter && (
        <div
          className="h-8 w-8 aspect-square grid place-items-center rounded-full cursor-pointer absolute right-3 border border-gray-100 hover:bg-gray-10 transition-colors duration-300 ease-in-out"
          onClick={onFilterClick}
        >
          <PiSlidersHorizontalBold className="text-gray-100 h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export default SearchInput;
