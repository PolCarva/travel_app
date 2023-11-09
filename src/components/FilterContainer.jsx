import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import Slider from "@mui/material/Slider";

import FilterBtn from "./FilterBtn";

const FilterContainer = ({ isOpen, closeFilter }) => {
  const [filter, setFilter] = useState({
    type: "restaurants",
    rating: "bests",
    distance: 2000,
  });

  const handleTypeChange = (value) => {
    setFilter({ ...filter, type: value });
  };

  const handleRatingChange = (value) => {
    setFilter({ ...filter, rating: value });
  };

  const handleDistanceChange = (value) => {
    setFilter({ ...filter, distance: value });
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
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <h3 className="text-black font-bold">Type:</h3>
              <div className="flex gap-2 justify-stretch">
                <FilterBtn
                  value={"attractions"}
                  isActive={filter.type === "attractions"}
                  text={"Attractions"}
                  handleChange={handleTypeChange}
                />
                <FilterBtn
                  value={"restaurants"}
                  isActive={filter.type === "restaurants"}
                  text={"Restaurants"}
                  handleChange={handleTypeChange}
                />
                <FilterBtn
                  value={"hotels"}
                  isActive={filter.type === "hotels"}
                  text={"Hotels"}
                  handleChange={handleTypeChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-black font-bold">Raiting:</h3>
              <div className="flex gap-2 justify-stretch">
                <FilterBtn
                  value={"worsts"}
                  isActive={filter.rating === "worsts"}
                  text={"Worsts"}
                  handleChange={handleRatingChange}
                />
                <FilterBtn
                  value={"all"}
                  isActive={filter.rating === "all"}
                  text={"All"}
                  handleChange={handleRatingChange}
                />
                <FilterBtn
                  value={"bests"}
                  isActive={filter.rating === "bests"}
                  text={"Bests"}
                  handleChange={handleRatingChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-black font-bold">Raiting:</h3>
              <div className="flex gap-2 justify-stretch">
                <FilterBtn
                  value={"worsts"}
                  isActive={filter.rating === "worsts"}
                  text={"Worsts"}
                  handleChange={handleRatingChange}
                />
                <FilterBtn
                  value={"all"}
                  isActive={filter.rating === "all"}
                  text={"All"}
                  handleChange={handleRatingChange}
                />
                <FilterBtn
                  value={"bests"}
                  isActive={filter.rating === "bests"}
                  text={"Bests"}
                  handleChange={handleRatingChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-black font-bold">Distance:</h3>
              <div className="flex flex-col px-2">
                <Slider
                  defaultValue={1000}
                  getAriaValueText={(value) => `${value}m`}
                  aria-labelledby="discrete-slider"
                  step={100}
                  min={1000}
                  max={5000}
                  valueLabelDisplay="auto"
                  onChange={(event, newValue) => handleDistanceChange(newValue)}
                />
              <div>
                <span className="text-gray-50">1000m</span>
                <span className="text-gray-50 float-right">5000m</span>
              </div>
              </div>
            </div>
          </div>
          <div className=" flex-shrink-0 text-white">
            <div className="flex gap-5 flex-col md:flex-row">
              <button className="border bg-white hover:bg-white-hover transition-colors duration-300 ease-in-out text-black border-black flex-1 py-2 px-1 rounded-lg">
                Clear Filters
              </button>
              <button className="bg-black flex-1 py-2 px-1 rounded-lg hover:bg-black-hover transition-colors duration-300 ease-in-out">
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
