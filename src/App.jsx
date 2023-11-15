import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import ErrorPage from "./pages/ErrorPage";
import { useEffect } from "react";
import useLocationStore from "./store/useLocationStore";

function App() {
  const setLocation = useLocationStore((state) => state.setLocation);

  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation(latitude, longitude);
      });
    };

    getUserLocation();
  }, [setLocation]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
