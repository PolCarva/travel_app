import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

import { BiTargetLock } from "react-icons/bi";

import useLocationStore from "../store/useLocationStore";
import { useEffect, useMemo, useRef, useState } from "react";
import SelectedPlace from "./SelectedPlace";

import { getDistance } from "../utils/utils";

const libraries = ["places"];

const Map = ({
  className,
  places,
  category = "restaurants",
  setCenter,
  center,
}) => {
  const { latitude, longitude } = useLocationStore((state) => state);
  const userCoordinates = { lat: latitude, lng: longitude };
  const mapRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    setCenter({ lat: latitude, lng: longitude });
  }, [latitude, longitude]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: useMemo(() => libraries, []),
  });

  const handleMarkerClick = (place) => {
    const location = {
      lat: place.location.latitude,
      lng: place.location.longitude,
    };

    getDistance(userCoordinates, location).then((time) => {
      setSelectedPlace({ ...place, walkingTime: time });
    });

    const newCenter = {
      lat: place.location.latitude,
      lng: place.location.longitude,
    };

    if (mapRef.current) {
      mapRef.current.panTo(newCenter);
      if (mapRef.current.getZoom() !== 17) {
        mapRef.current.setZoom(17);
      }
      setTimeout(() => {
        mapRef.current.setZoom(18);
      }, 200);
    }
  };

  if (loadError) {
    return (
      <div className="grid place-items-center flex-1">Error loading map</div>
    );
  }

  if (!isLoaded) {
    return <div className="grid place-items-center flex-1">Loading...</div>;
  }

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

  const handleCenterUser = () => {
    setCenter({ lat: latitude, lng: longitude });
    mapRef.current.setZoom(17);
  };

  return (
    <div className={className}>
      <GoogleMap
        disableDefaultUI={true}
        center={center}
        mapContainerClassName="w-full h-full"
        zoom={15}
        options={mapOptions}
        onLoad={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <div
          onClick={handleCenterUser}
          className="bg-white hover:bg-white-hover cursor-pointer transition-colors ease-in-out p-2 rounded-full absolute top-2 left-2 shadow-custom"
        >
          <BiTargetLock className="w-8 h-8 lg:w-6 lg:h-6" />
        </div>
        <MarkerF
          animation={google.maps.Animation.DROP}
          position={center}
          icon={{
            url: "/img/user-location.png",
            scaledSize: { width: 60, height: 60 },
          }}
        />
        {places?.map((place) => (
          <MarkerF
            icon={{
              url: `/img/${category}-location.png`,
              scaledSize: { width: 60, height: 60 },
            }}
            animation={google.maps.Animation.DROP}
            key={place.id}
            position={{
              lat: place.location.latitude,
              lng: place.location.longitude,
            }}
            onClick={() => handleMarkerClick(place)}
          />
        ))}
        {selectedPlace && <SelectedPlace place={selectedPlace} />}
      </GoogleMap>
    </div>
  );
};

export default Map;
