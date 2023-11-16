import React, { useState } from "react";
import { FaStar, FaWheelchair } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useLikedStore from "../store/useLikedStore";
import { Link } from "react-router-dom";

const ListCard = ({ place }) => {
  const { addLiked, removeLiked, liked } = useLikedStore((state) => state);
  const [isLiked, setIsLiked] = useState(liked.some((p) => p.id === place.id));

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const photoName =
    (place.photos && place.photos[0].name) || "https://via.placeholder.com/150";
  const url = `https://places.googleapis.com/v1/${photoName}/media?key=${apiKey}&maxWidthPx=400` || "https://via.placeholder.com/150";
  //const url = "https://via.placeholder.com/150";

  function renderStars(rating) {
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

  const handleLike = (e, place) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    if (isLiked) {
      removeLiked(place);
    } else {
      addLiked(place);
    }
  };

  return (
    <Link
      to={`/detail/${place.id}`}
      className="bg-white rounded-lg shadow-lg p-4 w-full lg:hover:scale-105 transition-transform ease-in-out cursor-pointer duration-300"
    >
      <div className="relative">
        <img
          src={url}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/150";
          }}
          alt={place.displayName || "Place"}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2">
          <div
            className="bg-white shadow-custom rounded-full p-2"
            onClick={(e) => handleLike(e, place)}
          >
            {isLiked ? (
              <AiFillHeart className="text-secondary w-6 h-6" />
            ) : (
              <AiOutlineHeart className="text-black w-6 h-6" />
            )}
          </div>
        </div>
        <div className="absolute top-2 left-2">
          {place.accessibilityOptions?.wheelchairAccessibleEntrance && (
            <div className="bg-tertiary rounded-full p-2">
              <FaWheelchair className="text-white w-6 h-6" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <h2 className="font-bold text-black text-lg leading-5 line-clamp-2">
          {place.displayName.text}
        </h2>
        <div className="flex gap-2 justify-between items-center">
          <span className="text-sm line-clamp-1 text-gray-50">
            {place.formattedAddress}
          </span>
          <div className="flex gap-1 items-center">
            <span className="text-gray-50">{place.rating || 0}</span>
            <div className="flex">{renderStars(place.rating || 0)}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListCard;
