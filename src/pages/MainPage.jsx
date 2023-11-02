import React, { useState } from "react";
import Header from "../components/Header";
import Map from "../components/Map";
import Footer from "../components/Footer";

const MainPage = () => {
  const [tab, setTab] = useState("map");
  return (
    <div className="w-full h-[100svh] flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <div
          className={`${tab === "list" ? "w-full" : "w-0"} md:w-1/3 h-full bg-red-300 transition-all duration-300 ease-in-out`}
        ></div>
        <Map className={`${tab === "map" ? "w-full" : "w-0"} md:w-2/3 h-full transition-all duration-300 ease-in-out`} />
      </div>
      <Footer tab={tab} setTab={setTab}/>
    </div>
  );
};

export default MainPage;
