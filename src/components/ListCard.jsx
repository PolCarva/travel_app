import React, { useState } from "react";
import { FaStar, FaWheelchair } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ListCard = ({ place }) => {
  const [isLiked, setIsLiked] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const photoName =
    (place.photos && place.photos[0].name) || "https://via.placeholder.com/150";
  //const url = `https://places.googleapis.com/v1/${photoName}/media?key=${apiKey}&maxWidthPx=400` || "https://via.placeholder.com/150";
  const url = "https://via.placeholder.com/150";

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

  function getFormattedAddress(addressComponents) {
    let streetName = "";
    let streetNumber = "";

    // Encontrar el nombre de la calle y el número de la calle
    for (let i = 0; i < addressComponents.length; i++) {
      const component = addressComponents[i];
      if (component.types.includes("route")) {
        streetName = component.longText;
      }
      if (component.types.includes("street_number")) {
        streetNumber = component.longText;
      }
    }

    // Formatear la dirección
    const formattedAddress = `${streetName} ${streetNumber}`;

    return formattedAddress.trim(); // trim para asegurar que no haya espacios extra si falta el número de la calle
  }

  const handleLike = (id) => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full">
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
            onClick={() => handleLike(place.id)}
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
            {getFormattedAddress(place.addressComponents)}
          </span>
          <div className="flex gap-1 items-center">
            <span className="text-gray-50">{place.rating}</span>
            <div className="flex">{renderStars(place.rating)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;