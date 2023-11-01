import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const coordinates = { lat: -34.90309469570489, lng: -56.15626041660778 };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading...</div>;

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
    <div className="w-full bg-red-50 h-full flex-1">
      <GoogleMap
        center={coordinates}
        mapContainerClassName="w-100 h-full"
        zoom={17}
        options={mapOptions}
      ></GoogleMap>
    </div>
  );
};

export default Map;
