import React, { useEffect, useState } from "react";

import { getPlacesData } from "../api";

import Header from "../components/Header";
import Map from "../components/Map";
import Footer from "../components/Footer";
import List from "../components/List";


const MainPage = () => {
  const [tab, setTab] = useState("map");
  const [data, setData] = useState([]);

  useEffect(() => {
    const params = {
      lat: 40.4165,
      lng: -3.70256,
      radius: 1000,
      category: "restaurant",
    }

   getPlacesData(params).then((response) => {
    console.log(response);
    setData(response);
   });
  }, []);

  return (
    <div className="w-full h-[100svh] flex flex-col">
      <Header />
      <div className="h-[70vh] flex">
        <List
          data={data}
          className={`${
            tab === "list" ? "w-full" : "w-0 overflow-hidden"
          } md:w-1/3 h-full !overflow-y-scroll bg-red-400 transition-all duration-300 ease-in-out`}
        />
        <Map
          className={`${
            tab === "map" ? "w-full" : "w-0"
          } md:w-2/3 h-full transition-all duration-300 ease-in-out`}
        />
      </div>
      <Footer tab={tab} setTab={setTab} />
    </div>
  );
};

export default MainPage;
