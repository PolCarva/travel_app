import React, { useState } from "react";

import { FaAngleLeft, FaAngleRight, FaXmark } from "react-icons/fa6";

const ModalPhotoSlider = ({ hideSlider, photos, index }) => {
  const [activeIndex, setActiveIndex] = useState(index);

  const handleNextPhoto = () => {
    if (activeIndex === photos.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrevPhoto = () => {
    if (activeIndex === 0) {
      setActiveIndex(photos.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div className="w-full h-full bg-black bg-opacity-70 font-bold z-10 fixed">
      <button
        className="fixed top-4 right-4 text-white font-bold"
        onClick={hideSlider}
      >
        <FaXmark className="w-8 h-8" />
      </button>
      <FaAngleLeft
        onClick={handlePrevPhoto}
        className="fixed top-1/2 translate-y-[-50%] left-4 text-white w-8 h-8"
      />
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-fit min-w-[70%] h-96 flex justify-center items-center object-cover z-50">
        <img src={photos[activeIndex]} alt={photos[activeIndex]}/>
      </div>
      <FaAngleRight
        className="fixed top-1/2 translate-y-[-50%] right-4 text-white w-8 h-8"
        onClick={handleNextPhoto}
      />
    </div>
  );
};

export default ModalPhotoSlider;
