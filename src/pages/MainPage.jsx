import React, { useEffect, useState } from "react";

import { getPlacesData } from "../api";

import useLocationStore from "../store/locationStore";
import useLikedStore from "../store/likedStore";

import Header from "../components/Header";
import Map from "../components/Map";
import Footer from "../components/Footer";
import List from "../components/List";

const MainPage = () => {


  const [tab, setTab] = useState("map");
  const [data, setData] = useState([]);
  const [listedPlaces, setListedPlaces] = useState([]);
  const [showLikeList, setShowLikeList] = useState(false);
  const { latitude, longitude } = useLocationStore((state) => state);
  const { liked } = useLikedStore((state) => state);

  useEffect(() => {
    const params = {
      lat: latitude,
      lng: longitude,
      radius: 1000,
      type: "restaurants",
    };
    (latitude || longitude) && //Espera a que los valores de latitud y longitud estén disponibles
      getPlacesData(params).then((response) => {
        setData(response);
        setListedPlaces(response);
      });
  }, [latitude, longitude]);


  useEffect(() => {
    if(showLikeList){
      setListedPlaces(liked)
    } else {
      setListedPlaces(data)
    }
  },[showLikeList, liked]) //Agregar liked si quiero eliminar de la lista al deslikear

  return (
    <div className="w-full h-[100svh] flex flex-col">
      <Header
        showLikeList={showLikeList}
        toggleLikedList={() => {
          setTab("list");
          setShowLikeList(!showLikeList);
        }}
      />
      <div className="h-[70vh] flex">
        <List
          places={listedPlaces}
          className={`${
            tab === "list" ? "w-full p-5" : "w-0 p-0 overflow-hidden"
          } md:w-1/3 h-full !overflow-y-scroll flex flex-col gap-2 items-center transition-all duration-300 ease-in-out`}
        />
        <Map
          places={listedPlaces}
          category="restaurants"
          className={`${
            tab === "map" ? "w-full" : "w-0"
          } md:w-2/3 h-full transition-all duration-300 ease-in-out`}
        />
      </div>
      <Footer tab={tab} setTab={setTab} setShowLikeList={setShowLikeList} />
    </div>
  );
};

export default MainPage;
