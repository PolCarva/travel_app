import axios from "axios";
import { BASE_PLACES_URL } from "../constants/config";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const getPlacesData = async ({ lat, lng, radius, category }) => {
  try {
    const data = {
      includedTypes: [category],
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
      "X-Goog-FieldMask": "places.displayName,places.location", // ajusta los campos según tus necesidades
    };

    const response = await axios.post(
      `${BASE_PLACES_URL}/v1/places:searchNearby`,
      data,
      { headers: headers }
    );

    if (response.data.places) {
      return response.data.places;
    } else {
      throw new Error(`Error: ${response.data.error}`);
    }
  } catch (error) {
    console.error("Error al hacer la solicitud a la API:", error);
    throw error;
  }
};
