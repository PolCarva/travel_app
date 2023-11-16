import { SlLocationPin } from "react-icons/sl";
import { FaStar, FaAngleLeft, FaImages } from "react-icons/fa6";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getPlaceDetail, getPriceLevel } from "../api";

import { placeDetail } from "../constants/data";
import ModalPhotoSlider from "../components/ModalPhotoSlider";

const DetailPage = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const navigate = useNavigate();
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    /* setPlace(placeDetail);
    return; */
    getPlaceDetail(id).then((response) => {
      if (response.photos) {
        const updatedPlace = {
          ...response,
          photoUrls: response.photos?.map(
            (photo) =>
              `https://places.googleapis.com/v1/${photo.name}/media?key=${apiKey}&maxWidthPx=400`
          ),
        };
        setPlace(updatedPlace);
      } else {
        setPlace({
          ...response,
          photoUrls: [
            `https://places.googleapis.com/v1/${response.name}/media?key=${apiKey}&maxWidthPx=400`,
          ],
        });
      }
    });
  }, [id]);

  const handleBackBtn = () => {
    navigate(-1);
  };

  const showSlider = (photoIndex) => {
    setActiveImage(photoIndex);
    setIsSliderVisible(true);
  };
  const hideSlider = () => setIsSliderVisible(false);

  if (!place) return <div>Loading...</div>;
  return (
    <div className="relative min-h-[100svh]">
      <div
        onClick={handleBackBtn}
        className="absolute grid content-center w-10 h-10 p-2 top-4 left-4 bg-white rounded-full z-10 bg-opacity-30"
      >
        <FaAngleLeft className="w-full h-full text-white" />
      </div>
      <img
        src={place.photoUrls[0]}
        alt={place.displayName.text}
        className="absolute top-0 right-1/2 translate-x-[50%] w-full h-2/5 object-cover z-0"
      />
      <div className="absolute z-10 top-1/3 h-full w-full rounded-3xl p-6 pt-5 bg-white flex flex-col gap-2">
        <div className="flex justify-between">
          <span
            className={`text-sm text-center font-bold ${
              place.regularOpeningHours?.openNow
                ? "text-green-500"
                : "text-secondary-hover"
            }`}
          >
            {place.regularOpeningHours?.openNow
              ? "Open Now"
              : "Closed" || "Closed"}
          </span>
          <div className="flex gap-1 justify-end items-center w-fit min-w-[20%]">
            <span className="text-xl font-medium">{place.rating}</span>
            <FaStar className="text-tertiary" />
          </div>
        </div>

        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold w-3/4">{place.displayName.text}</h1>
          <span className="text-xl text-gray-50 font-medium tracking-[0.08rem] text-end">
            {getPriceLevel(place.priceLevel)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <SlLocationPin className="w-10 h-full aspect-square" />
          <span className="text-sm">{place.formattedAddress}</span>
        </div>
        <div className="flex flex-col gap-5 mt-3">
          <h2 className="text-2xl font-bold">Gallery Photo</h2>
          <div className="grid grid-cols-2 gap-2 grid-rows-2 h-40">
            <div
              className="w-full h-full row-span-2 rounded-lg bg-center bg-cover"
              onClick={() => showSlider(1)}
              style={{ backgroundImage: `url(${place.photoUrls[1]})` }}
            ></div>
            <div
              className="w-full h-full rounded-lg bg-center bg-cover"
              onClick={() => showSlider(2)}
              style={{ backgroundImage: `url(${place.photoUrls[2]})` }}
            ></div>
            <div
              className="w-full h-full relative rounded-lg bg-center bg-cover"
              onClick={() => showSlider(3)}
              style={{ backgroundImage: `url(${place.photoUrls[3]})` }}
            >
              <div className="absolute w-10 h-6 py-0.5 bg-black bg-opacity-30 rounded-br-none rounded-md bottom-2 right-2">
                <FaImages className="w-full h-full text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSliderVisible && (
        <ModalPhotoSlider
          hideSlider={hideSlider}
          photos={place.photoUrls}
          index={activeImage}
        />
      )}
    </div>
  );
};

export default DetailPage;
