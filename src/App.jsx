import Map from "./components/Map";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="w-full h-[100svh] flex flex-col">
        <Header />
        <Map />
        <Footer />
      </div>
    </>
  );
}

export default App;
