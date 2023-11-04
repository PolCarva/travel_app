import axios from "axios";
import { BASE_PLACES_URL } from "../constants/config";

import { data } from "../constants/data";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const getPlacesData = async ({ lat, lng, radius, type }) => {
  return data; //Remove line on production
  try {
    let category = [];

    switch (type) {
      case "restaurant":
        category = [
          "restaurant",
          "cafe",
          "bar",
          "meal_delivery",
          "meal_takeaway",
          "bakery",
        ];
        break;
      case "hotel":
        category = ["lodging"];
        break;
      case "attraction":
        category = [
          "amusement_park",
          "aquarium",
          "art_gallery",
          "casino",
          "movie_theater",
          "museum",
          "night_club",
          "park",
          "tourist_attraction",
          "zoo",
        ];
        break;
      default:
        category = ["lodging"];
    }

    const data = {
      includedTypes: category,
      locationRestriction: {
        circle: {
          center: {
            latitude: lat,
            longitude: lng,
          },
          radius: radius,
        },
      },
    };

    const headers = {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "places.displayName,places.location,places.accessibilityOptions,places.rating,places.photos,places.primaryTypeDisplayName,places.userRatingCount,places.id,places.formattedAddress,places.addressComponents", // ajusta los campos según tus necesidades
    };

    const response = await axios.post(
      `${BASE_PLACES_URL}/v1/places:searchNearby`,
      data,
      { headers: headers }
    );

    if (response.data.places) {
      console.log(response.data);
      return response.data.places;
    }
  } catch (error) {
    console.error("Error al hacer la solicitud a la API:", error);
    throw error;
  }
};
