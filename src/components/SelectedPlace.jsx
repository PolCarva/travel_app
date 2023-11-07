import React from "react";
import { FaWheelchair, FaStar } from "react-icons/fa";

const SelectedPlace = ({ place }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const photoName = place.photos && place.photos[0].name;
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

  return (
    <div className="absolute flex gap-4 bottom-5 right-1/2 translate-x-[50%] bg-white w-11/12 h-1/5 rounded-lg py-2 px-3">
      <div className="flex-1 flex flex-col justify-around">
        <div className="flex flex-col gap-0.5">
          <h2 className="font-bold text-black text-lg leading-5 line-clamp-2">
            {place.displayName.text}
          </h2>
          <span className="text-sm line-clamp-1 text-gray-50">
            {getFormattedAddress(place.addressComponents)}
          </span>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <span>{place.rating}</span>
            <div className="flex">{renderStars(place.rating)}</div>
          </div>
          <div className="flex gap-1 items-center">
            {place.accessibilityOptions?.wheelchairAccessibleEntrance ? (
              <span className="text-sm">Accessible</span>
            ) : (
              <span className="text-sm">Not accessible</span>
            )}

            <FaWheelchair
              className={`${
                place.accessibilityOptions?.wheelchairAccessibleEntrance
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            />
          </div>
        </div>
      </div>
      <img
        src={url}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/150";
        }}
        alt={place.displayName || "Place"}
        className="h-full object-cover aspect-square rounded-lg"
      />
    </div>
  );
};

export default SelectedPlace;
