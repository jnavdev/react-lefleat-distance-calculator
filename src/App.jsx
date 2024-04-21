import { useState } from "react";
import MapComponent from "./components/MapComponent";

function App() {
  const [userLocation, setUserLocation] = useState([]);
  const [clearMap, setClearMap] = useState(false);

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setUserLocation([latitude, longitude]);
        },
        (error) => alert(error.message)
      );
    } else {
      console.log("Geolocation not supported");
    }
  }

  function handleClearMap() {
    setClearMap(true);
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex justify-between w-1/2 gap-2">
        <button
          onClick={handleLocationClick}
          className="p-2 mb-4 bg-sky-500 text-white rounded-lg"
        >
          Usar mi ubicación
        </button>
        <button
          onClick={handleClearMap}
          className="p-2 mb-4 bg-amber-400 text-white rounded-lg"
        >
          Limpiar mapa
        </button>
      </div>
      <div className="w-1/2">
        <MapComponent
          userLocation={userLocation}
          clearMap={clearMap}
          setClearMap={setClearMap}
        />
      </div>
    </div>
  );
}

export default App;
