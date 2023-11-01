import React, { useState } from "react";
import TabButton from "./TabButton";

const Footer = () => {
  const [activeTab, setActiveTab] = useState("list");
  return (
    <footer className="h-24">
      <div className="flex p-5 justify-center items-center h-full w-full gap-5">
        <TabButton
          toggleActive={() => setActiveTab("list")}
          type={"list"}
          text="View Places"
          isActive={activeTab === "list"}
        />
        <TabButton
          toggleActive={() => setActiveTab("map")}
          type={"map"}
          text="View Map"
          isActive={activeTab === "map"}
        />
      </div>
    </footer>
  );
};

export default Footer;
