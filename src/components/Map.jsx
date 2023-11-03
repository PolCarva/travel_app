import {
  GoogleMap,
  useLoadScript,
  MarkerF,
} from "@react-google-maps/api";

import useLocationStore from "../store/locationStore";
import { useState } from "react";

const Map = ({ className, places }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const { latitude, longitude } = useLocationStore((state) => state);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const userCoordinates = { lat: latitude, lng: longitude };

  if (loadError)
    return (
      <div className="grid place-items-center flex-1">Error loading map</div>
    );
  if (!isLoaded)
    return <div className="grid place-items-center flex-1">Loading...</div>;

  const mapOptions = {
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit.station.bus",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
    streetViewControl: false, // deshabilita Street View
    mapTypeControl: false, // deshabilita la opción de cambiar a vista satelital
    fullscreenControl: false, // deshabilita la opción de pantalla completa
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP, // Mueve los controles de zoom a la esquina superior derecha
    },
  };

  return (
    <div className={className}>
      <GoogleMap
        center={userCoordinates}
        mapContainerClassName="w-full h-full"
        zoom={15}
        options={mapOptions}
      >
        <MarkerF
          animation={google.maps.Animation.DROP}
          position={userCoordinates}
          icon={{
            url: "/img/user-location.png",
            scaledSize: { width: 60, height: 60 },
          }}
        />
        {places.map((place) => (
          <MarkerF
            animation={google.maps.Animation.DROP}
            key={place.id}
            position={{
              lat: place.location.latitude,
              lng: place.location.longitude,
            }}
            onClick={() => {
              setSelectedPlace(place);
            }}
          />
        ))}

        {selectedPlace && (
          <div><h1>Selected place: {selectedPlace.displayName}</h1></div>
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
