import { useState } from 'react';
import { SlLocationPin } from 'react-icons/sl';
import { Autocomplete } from '@react-google-maps/api';

const SearchCityInput = ({ onPlaceSelected }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      onPlaceSelected(place);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <div className="flex items-center px-4 py-2 w-10/12 rounded-full bg-white shadow-custom relative">
      <div className="flex gap-2 items-center flex-1 pr-8">
        <SlLocationPin className="text-gray-100 h-6 w-6" />
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            className="flex-1 py-2 bg-white outline-none w-full"
            placeholder="Search City"
            aria-label="Search City"
          />
        </Autocomplete>
      </div>
    </div>
  );
};

export default SearchCityInput;
