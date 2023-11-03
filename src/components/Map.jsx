import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerF,
} from "@react-google-maps/api";

import { useState } from "react";
import useLocationStore from "../store/locationStore";

const Map = ({ className }) => {
  const [data, setData] = useState([]);
  const { latitude, longitude } = useLocationStore((state) => state);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const coordinates = { lat: latitude, lng: longitude };

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
        center={coordinates}
        mapContainerClassName="w-full h-full"
        zoom={15}
        options={mapOptions}
      >
        <MarkerF
          position={coordinates}
          icon={{
            url: "/img/user-location.png",
            scaledSize: { width: 60, height: 60 },
          }}
        />
        {data.map((place) => (
          <Marker
            key={place.location_id}
            position={{
              lat: parseFloat(place.latitude),
              lng: parseFloat(place.longitude),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
