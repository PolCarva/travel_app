import React, { useState } from "react";
import TabButton from "./TabButton";

const Footer = ({ setTab, tab }) => {
  return (
    <footer className="h-24 md:hidden">
      <div className="flex p-5 justify-center items-center h-full w-full gap-5">
        <TabButton
          toggleActive={() => setTab("list")}
          type={"list"}
          text="View Places"
          isActive={tab === "list"}
        />
        <TabButton
          toggleActive={() => setTab("map")}
          type={"map"}
          text="View Map"
          isActive={tab === "map"}
        />
      </div>
    </footer>
  );
};

export default Footer;
