import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import ErrorPage from "./pages/ErrorPage";
import { useEffect, useState } from "react";
import useLocationStore from "./store/useLocationStore";
import { Toaster } from "react-hot-toast";

function App() {
  const setLocation = useLocationStore((state) => state.setLocation);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation(latitude, longitude);
      });
    };

    getUserLocation();
  }, []);

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<MainPage setNearbyPlaces={setNearbyPlaces} />}
          />
          <Route
            path="/detail/:id"
            element={<DetailPage nearbyPlaces={nearbyPlaces} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
