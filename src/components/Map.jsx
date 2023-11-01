import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const coordinates = { lat: -34.90309469570489, lng: -56.15626041660778 };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="w-full bg-red-50 h-full flex-1">
      <GoogleMap
        center={coordinates}
        mapContainerClassName="w-100 h-[100svh]"
        zoom={17}
      >
        <Marker position={coordinates} />
      </GoogleMap>
    </div>
  );
};

export default Map;
