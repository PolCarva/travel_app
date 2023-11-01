import React from "react";
import { FaLocationPin, FaLocationDot } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";

const LocationIcon = ({ category, isActive = false }) => {
  let icon;
  switch (category) {
    case "hotel":
      icon = (
        <FaBed className="absolute top-2.5 text-white right-1/2 translate-x-[50%]" />
      );

      break;

    default:
      icon = null;
      break;
  }
  return (
    <div>
      {isActive ? (
        <div className="relative w-fit">
          <FaLocationPin className="w-12 h-12 text-primary" />
          {icon}
        </div>
      ) : (
        <FaLocationDot className="w-12 h-12 text-secondary" />
      )}
    </div>
  );
};

export default LocationIcon;
