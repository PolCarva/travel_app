import React from "react";

const ListCard = ({ data }) => {
  const imageUrl =
    data.photo && data.photo.images ? data.photo.images.small.url : "";
  const caption = data.photo && data.photo.caption ? data.photo.caption : "";

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-72">
      <img
        src={imageUrl}
        alt={data.name}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{data.name}</h2>
        <p className="text-gray-600 mb-2">
          <span className="font-bold">Location:</span> {data.location_string}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-bold">Ranking:</span> {data.ranking}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-bold">Reviews:</span> {data.num_reviews}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Description:</span> {caption}
        </p>
      </div>
    </div>
  );
};

export default ListCard;
