import React, { useEffect, useState } from "react";

import { getPlacesData } from "../api";

import { calculateDistance } from "../utils/utils";

import useLocationStore from "../store/useLocationStore";
import useLikedStore from "../store/useLikedStore";

import Header from "../components/Header";
import Map from "../components/Map";
import Footer from "../components/Footer";
import List from "../components/List";
import FilterContainer from "../components/FilterContainer";

const MainPage = ({ setNearbyPlaces }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState("map");
  const [data, setData] = useState([]);
  const [listedPlaces, setListedPlaces] = useState([]);
  const [showLikeList, setShowLikeList] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const { latitude, longitude } = useLocationStore((state) => state);
  const { liked } = useLikedStore((state) => state);
  const [center, setCenter] = useState({ latitude, longitude });
  const setLocation = useLocationStore((state) => state.setLocation);

  const [filter, setFilter] = useState({
    type: "restaurants",
    sortBy: "rating",
    accesible: false,
  });

  useEffect(() => {
    setIsLoading(true);
    const params = {
      lat: center.lat,
      lng: center.lng,
      radius: 1000,
      type: filter.type,
    };
    (latitude || longitude) && //Espera a que los valores de latitud y longitud estén disponibles
      getPlacesData(params)
        .then((response) => {
          setData(response);
          setListedPlaces(response);
          setNearbyPlaces(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });

    handleFilter();
  }, [center, filter.type]);

  useEffect(() => {
    handleFilter();
  }, [showLikeList, liked, data, filter]); //Agregar liked si quiero eliminar de la lista al deslikear

  /* Filter places by name */
  const handleSearch = (e) => {
    const showingList = showLikeList ? liked : data;
    const value = e.target.value.toLowerCase();
    const filteredPlaces = showingList.filter((place) =>
      place.displayName?.text?.toLowerCase().includes(value)
    );
    setListedPlaces(filteredPlaces);
  };

  const onPlaceSelected = (place) => {
    const { geometry } = place;
    const lat = geometry.location.lat();
    const lng = geometry.location.lng();

    setCenter({ lat, lng });
    setLocation(lat, lng);

    const params = {
      lat: lat,
      lng: lng,
      radius: 1000,
      type: filter.type,
    };

    getPlacesData(params).then((response) => {
      setData(response);
      setListedPlaces(response);
    });
  };

  const handleFilter = () => {
    const showingList = showLikeList ? liked : data;

    // Filtra por accesibilidad para sillas de ruedas
    let filteredPlaces = showingList?.filter((place) =>
      filter.accesible
        ? place.accessibilityOptions?.wheelchairAccessibleEntrance
        : true
    );

    // Desupués ordena por calificación
    filteredPlaces?.sort((a, b) => {
      if (filter.sortBy === "rating") {
        // Si el filtro es 'rating', ordena de mayor a menor calificación
        return b.rating - a.rating;
      } else {
        // Si el filtro es 'closest' / default, ordena de más cercano a más lejano
        const distanceA = calculateDistance(a.location, center);
        const distanceB = calculateDistance(b.location, center);
        return distanceA - distanceB;
      }
    });

    setListedPlaces(filteredPlaces);
  };

  return (
    <div className="w-full h-[100svh] flex flex-col relative overflow-hidden">
      <Header
        toggleFilter={() => setFilterOpen(!filterOpen)}
        onPlaceSelected={onPlaceSelected}
        handleSearch={handleSearch}
        showLikeList={showLikeList}
        isMap={tab === "map"}
        toggleLikedList={() => {
          setTab("list");
          setShowLikeList(!showLikeList);
        }}
      />
      <div className="h-full flex relative overflow-hidden">
        <List
          places={listedPlaces}
          isLoading={isLoading}
          className={`${
            tab === "list" ? "w-full pt-2" : "w-0 pt-0 px-0 overflow-hidden"
          } lg:w-1/3 lg:px-10 h-full p-10 !overflow-y-scroll flex flex-col gap-2 items-center transition-all duration-300 ease-in-out`}
        />
        <Map
          center={center}
          setCenter={setCenter}
          places={data}
          category={filter.type}
          className={`${
            tab === "map" ? "w-full" : "w-0"
          } lg:w-2/3 h-full transition-all duration-300 ease-in-out`}
        />
      </div>
      <FilterContainer
        filter={filter}
        setFilter={setFilter}
        isOpen={filterOpen}
        closeFilter={() => setFilterOpen(!filterOpen)}
      />

      <Footer tab={tab} setTab={setTab} setShowLikeList={setShowLikeList} />
    </div>
  );
};

export default MainPage;
