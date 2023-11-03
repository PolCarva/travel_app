import React from "react";

const ListCard = ({ place }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const photoName = place.photos[0].name;

  //const url = `https://places.googleapis.com/v1/${photoName}/media?key=${apiKey}&maxWidthPx=400`;
  const url = "https://via.placeholder.com/150"
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-72">
      <img
        src={url}
        alt={place.displayName || "Place"}
        className="w-full h-40 object-cover rounded-t-lg"
      />
    </div>
  );
};

export default ListCard;
