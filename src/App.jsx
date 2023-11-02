<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import ErrorPage from "./pages/ErrorPage";
=======
import Map from "./components/Map";
import Header from "./components/Header";
>>>>>>> main

function App() {
  return (
    <>
<<<<<<< HEAD
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
=======
      <Header />
      <Map />
>>>>>>> main
    </>
  );
}

export default App;
