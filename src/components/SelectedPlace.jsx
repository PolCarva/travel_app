import React from "react";
import { FaWheelchair, FaStar } from "react-icons/fa";
import { FaPersonWalking } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SelectedPlace = ({ place }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const photoName = place.photos && place.photos[0].name;
  const url = `https://places.googleapis.com/v1/${photoName}/media?key=${apiKey}&maxWidthPx=400` || "/img/sample.jpg";
  //const url = "/img/sample.jpg";

  function renderStars(rating = 0) {
    const fullStars = Array(Math.floor(rating))
      .fill()
      .map((_, index) => (
        <FaStar key={`full_${index}`} className="text-tertiary" />
      ));
    const emptyStars = Array(5 - Math.floor(rating))
      .fill()
      .map((_, index) => (
        <FaStar key={`empty_${index}`} className="text-gray-10" />
      ));
    return [...fullStars, ...emptyStars];
  }

  return (
    <Link
      to={`/detail/${place.id}`}
      className="absolute flex gap-4 bottom-5 right-1/2 translate-x-[50%] bg-white w-11/12 md:w-3/5 lg:w-1/2 h-1/4 rounded-lg py-2 px-3"
    >
      <div className="flex-1 flex flex-col justify-around">
        <div className="flex flex-col gap-0.5">
          <h2 className="font-bold text-black text-lg leading-5 line-clamp-2">
            {place.displayName.text}
          </h2>
          <span className="text-sm line-clamp-1 text-gray-50">
            {place.formattedAddress}
          </span>
          <div className="flex gap-1">
            <FaPersonWalking />
            <span className="text-sm line-clamp-1 text-gray-50">
              {place.walkingTime}
            </span>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <span>{place.rating}</span>
            <div className="flex">{renderStars(place.rating)}</div>
            <span className="text-gray-50">({place.userRatingCount})</span>
          </div>
          <FaWheelchair
            className={`${
              place.accessibilityOptions?.wheelchairAccessibleEntrance
                ? "text-green-500"
                : "text-red-500"
            }`}
          />
        </div>
      </div>
      <img
        src={url}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/img/sample.jpg";
        }}
        alt={place.displayName || "Place"}
        className="h-full object-cover aspect-square rounded-lg bg-gray-50"
      />
    </Link>
  );
};

export default SelectedPlace;
