import { useEffect, useRef, useState } from "react";
import { SlLocationPin } from "react-icons/sl";
import { Autocomplete } from "@react-google-maps/api";

import { FaXmark } from "react-icons/fa6";

const SearchCityInput = ({ onPlaceSelected }) => {
  //Espera un segundo a que ~algo~ cargue y luego muestra el autocomplete
  const [timeoutFlag, setTimeoutFlag] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setTimeoutFlag(true);
    }, 1000);
  }, []);

  const inpRef = useRef(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      onPlaceSelected(place);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const handleClear = () => {
    inpRef.current.value = "";
  };

  return (
    <div className="flex w-full items-center px-4 py-2 rounded-full bg-white shadow-custom relative">
      <div className="flex gap-2 items-center flex-1 pr-8">
        <SlLocationPin className="text-gray-100 h-6 w-6" />
        {timeoutFlag ? (
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
              type="text"
              ref={inpRef}
              className="flex-1 py-2 bg-white outline-none w-full"
              placeholder="Search City"
              aria-label="Search City"
            />
          </Autocomplete>
        ) : (
          <input
            type="text"
            className="flex-1 py-2 bg-white outline-none w-full"
            placeholder="Search City"
            aria-label="Search City"
          />
        )}
      </div>
      <FaXmark
        className="hover:text-red-500 cursor-pointer transition-colors ease-in-out"
        onClick={handleClear}
      />
    </div>
  );
};

export default SearchCityInput;
