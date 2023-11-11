import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";

import FilterBtn from "./FilterBtn";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

const FilterContainer = ({
  isOpen,
  closeFilter,
  filter: initialFilter,
  setFilter,
}) => {
  const [tempFilter, setTempFilter] = useState({ ...initialFilter });
  const [isWheelchairAccessible, setIsWheelchairAccessible] = useState(
    tempFilter.accesible
  );

  const handleTypeChange = (value) => {
    setTempFilter({ ...tempFilter, type: value });
  };

  const handleSortByChange = (value) => {
    setTempFilter({ ...tempFilter, sortBy: value });
  };

  const handleWheelchairAccessibleChange = (event) => {
    const isChecked = event.target.checked;
    setIsWheelchairAccessible(isChecked);
    setTempFilter({ ...tempFilter, accesible: isChecked });
  };

  const handleClearFilter = () => {
    setTempFilter({
      type: "restaurants",
      sortBy: "rating",
      accesible: false,
    });
    setIsWheelchairAccessible(false);
  };

  const applyFilters = () => {
    setFilter({ ...tempFilter });
    closeFilter(); // Cierra el contenedor de filtros
  };

  return (
    <div
      className={`${
        isOpen ? "bottom-0" : "-bottom-full"
      } absolute h-full w-full lg:h-[80vh] lg:w-1/3 bg-white border-t-2 z-100 transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        <div className="w-full p-5 relative">
          <div
            className="bg-gray-10 absolute top-1/2 p-3 lg:p-2 translate-y-[-50%] rounded-full h-12 lg:h-10 aspect-square grid place-items-center cursor-pointer hover:scale-110 transition-transform ease-in-out"
            onClick={closeFilter}
          >
            <FaAngleLeft className="w-full h-full" />
          </div>
          <h1 className="text-2xl font-bold text-center h-full">Filters</h1>
        </div>
        <div className="w-full px-5 pb-5 h-full flex flex-col gap-5">
          <div className="flex-1 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h3 className="text-black font-bold">Type:</h3>
              <div className="flex gap-2 justify-stretch">
                <FilterBtn
                  value={"attractions"}
                  isActive={tempFilter.type === "attractions"}
                  text={"Attractions"}
                  handleChange={handleTypeChange}
                />
                <FilterBtn
                  value={"restaurants"}
                  isActive={tempFilter.type === "restaurants"}
                  text={"Restaurants"}
                  handleChange={handleTypeChange}
                />
                <FilterBtn
                  value={"hotels"}
                  isActive={tempFilter.type === "hotels"}
                  text={"Hotels"}
                  handleChange={handleTypeChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-black font-bold">Sort by:</h3>
              <div className="flex gap-2 justify-stretch">
                <FilterBtn
                  value={"closest"}
                  isActive={tempFilter.sortBy === "closest"}
                  text={"Closest"}
                  handleChange={handleSortByChange}
                />
                <FilterBtn
                  value={"rating"}
                  isActive={tempFilter.sortBy === "rating"}
                  text={"Higher Raiting"}
                  handleChange={handleSortByChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-black font-bold">Accesibility:</h3>
              <div className="flex gap-2 justify-stretch">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isWheelchairAccessible}
                        onChange={handleWheelchairAccessibleChange}
                      />
                    }
                    label="Wheelchair Accessible"
                    labelPlacement="end"
                  />
                </FormGroup>
              </div>
            </div>
            <div className="flex flex-col gap-2"></div>
          </div>
          <div className=" flex-shrink-0 text-white">
            <div className="flex gap-5 flex-col md:flex-row">
              <button
                onClick={handleClearFilter}
                className="border bg-white hover:bg-white-hover transition-colors duration-300 ease-in-out text-black border-black flex-1 py-2 px-1 rounded-lg"
              >
                Clear Filters
              </button>
              <button
                onClick={applyFilters}
                className="bg-black flex-1 py-2 px-1 rounded-lg hover:bg-black-hover transition-colors duration-300 ease-in-out"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterContainer;
