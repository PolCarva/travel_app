import { SlLocationPin } from "react-icons/sl";
import { FaStar, FaAngleLeft, FaImages } from "react-icons/fa6";
import { ImSpinner3 } from "react-icons/im";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getPlaceDetail, getPriceLevel } from "../api";

import { placeDetail } from "../constants/data";
import ModalPhotoSlider from "../components/ModalPhotoSlider";

const days = ["Sun", "Mon", "Tue", "Thu", "Wed", "Fri", "Sat"];

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

  const accessibilityOptions = place?.accessibilityOptions || {};
  const accessibilityEntries = Object.entries(accessibilityOptions);

  const formatOpeningHours = () => {
    if (
      !place ||
      !place.regularOpeningHours ||
      !place.regularOpeningHours.periods
    ) {
      return "No opening hours data available";
    }

    const convertTo12HourFormat = (hour, minute) => {
      const suffix = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const formattedMinute = String(minute).padStart(2, "0");

      if (!formattedHour || !formattedMinute)
        return null;

      return `${formattedHour}:${formattedMinute} ${suffix}`;
    };

    return place?.regularOpeningHours?.periods?.map((period) => {
      const openDay = days[period?.open?.day];
      let closeDay = days[period?.close?.day];

      const openTime = convertTo12HourFormat(
        period?.open?.hour,
        period?.open?.minute
      );
      let closeTime = convertTo12HourFormat(
        period?.close?.hour,
        period?.close?.minute
      );

      // Convertir a formato 24 horas para comparar
      const openHour24 =
        period?.open?.hour +
        (period?.open?.hour < 12 && openDay !== closeDay ? 12 : 0);
      const closeHour24 =
        period?.close?.hour + (period.close?.hour < 12 ? 12 : 0);

      // Si el horario de cierre es al día siguiente
      if (closeHour24 <= openHour24) {
        closeDay = openDay;
        closeTime = `11:59 PM`;
      }

      if (typeof openTime !== "string" || typeof closeTime !== "string")
        return "No opening hours data available";

      return `${openTime} - ${closeTime}`;
    });
  };

  if (!place)
    return (
      <div className="w-full h-[100svh] grid place-content-center">
        <ImSpinner3 className="w-24 h-24 text-primary animate-spin" />
      </div>
    );
  return (
    <div
      className="bg-cover bg-center h-full relative"
      style={{ backgroundImage: `url(${place.photoUrls[0]})` }}
    >
      <div className="absolute inset-0 backdrop-blur-lg"></div>
      <div className="relative min-h-[100svh] overflow-y-auto mx-auto md:max-w-2xl">
        <div
          onClick={handleBackBtn}
          className="absolute grid hover:scale-110 backdrop-blur-md transition-transform ease-in-out cursor-pointer content-center w-10 h-10 p-2 top-4 left-4 border bg-white rounded-full z-10 bg-opacity-30 shadow-custom"
        >
          <FaAngleLeft className="w-full h-full text-white" />
        </div>
        <img
          src={place.photoUrls[0] || "/img/sample.jpg"}
          alt={place.displayName.text}
          className="absolute top-0 right-1/2 translate-x-[50%] w-full h-2/5 object-cover z-0 bg-gray-50"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/img/sample.jpg";
          }}
        />
        <div className="absolute z-10 top-1/3 h-fit min-h-[66.66%] w-full rounded-t-3xl p-6 pt-5 bg-white flex flex-col gap-3">
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
            <h1 className="text-2xl font-bold w-3/4">
              {place.displayName.text}
            </h1>
            <span className="text-xl text-gray-50 font-medium tracking-[0.08rem] text-end">
              {getPriceLevel(place.priceLevel)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <SlLocationPin className="w-10 h-full md:w-5 aspect-square" />
            <span className="text-sm">{place.formattedAddress}</span>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <h2 className="font-bold text-2xl text-start">Accessibility</h2>
            <ul>
              {accessibilityEntries.map(([key, value]) => (
                <li key={key} className="flex gap-5 items-center">
                  <span className="font-medium w-16 mr-5">
                    {key.replace("wheelchairAccessible", "")}:
                  </span>
                  <span
                    className={`font-bold ${
                      value ? "text-green-500" : "text-secondary"
                    }`}
                  >
                    {value ? "True" : "False"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {place?.regularOpeningHours?.periods && (
            <div className="flex flex-col justify-center gap-2">
              <h2 className="font-bold text-2xl text-start">
                Horarios de Apertura
              </h2>
              <ul>
                {formatOpeningHours().map((hours, index) => (
                  <li className="flex gap-5 items-center" key={index}>
                    <span className="font-medium w-16 text-lg mr-5">
                      {days[index]}
                    </span>
                    <span className="text-sm text-gray-100">{hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-5 mt-3">
            {place.photoUrls?.length > 4 ? (
              <>
                <h2 className="text-2xl font-bold">Gallery Photo</h2>
                <div className="grid grid-cols-2 gap-2 grid-rows-2 h-40">
                  <div
                    className="w-full h-full row-span-2 rounded-lg bg-center bg-cover grayscale cursor-pointer hover:grayscale-0 transition-all ease-in-out duration-300 "
                    onClick={() => showSlider(1)}
                    style={{ backgroundImage: `url(${place.photoUrls[1]})` }}
                  ></div>
                  <div
                    className="w-full h-full rounded-lg bg-center bg-cover  grayscale cursor-pointer hover:grayscale-0 transition-all ease-in-out duration-300"
                    onClick={() => showSlider(2)}
                    style={{ backgroundImage: `url(${place.photoUrls[2]})` }}
                  ></div>
                  <div
                    className="w-full h-full relative rounded-lg bg-center bg-cover  grayscale cursor-pointer hover:grayscale-0 transition-all ease-in-out duration-300"
                    onClick={() => showSlider(3)}
                    style={{ backgroundImage: `url(${place.photoUrls[3]})` }}
                  >
                    <div className="absolute w-10 h-6 py-0.5 bg-black bg-opacity-30 rounded-br-none rounded-md bottom-2 right-2">
                      <FaImages className="w-full h-full text-white" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <h2 className="text-2xl text-center text-gray-300 font-bold">
                No photo available
              </h2>
            )}
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
    </div>
  );
};

export default DetailPage;
