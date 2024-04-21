import { useState } from 'react';
import MapComponent from './components/MapComponent';
import L from 'leaflet';
import { FaPersonWalking } from 'react-icons/fa6';
import { FaCar } from 'react-icons/fa';

function App() {
  const [userLocation, setUserLocation] = useState([]);
  const [clearMap, setClearMap] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [markerPositions, setMarkerPositions] = useState([]);
  const [markersDistance, setMarkersDistance] = useState(0);
  const [walkingTime, setWalkingTime] = useState(0);
  const [drivingTime, setDrivingTime] = useState(0);

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setUserLocation([latitude, longitude]);
        },
        (error) => alert(error.message),
      );
    } else {
      console.log('Geolocation not supported');
    }
  }

  function handleClearMap() {
    setClearMap(true);
    setDisabledButton(true);
    setMarkersDistance(0);
  }

  function handleCalculateDistance() {
    // Calculate Distance beetween two markers
    const markerOne = markerPositions[0].position;
    const markerTwo = markerPositions[1].position;
    const distance = L.latLng(markerOne).distanceTo(markerTwo).toFixed(2);

    setMarkersDistance(distance);

    // calculate time to arrival
    const walkingSpeed = 1.4;
    const walkingTimeInSeconds = distance / walkingSpeed;
    const walkingTimeInMinutes = walkingTimeInSeconds / 60;
    setWalkingTime(Math.round(walkingTimeInMinutes));

    const drivingSpeed = 40;
    const drivingDistance = distance / 1000;
    const drivingTimeInHours = drivingDistance / drivingSpeed;
    const drivingTimeInMinutes = drivingTimeInHours * 60;
    setDrivingTime(Math.round(drivingTimeInMinutes));
  }

  return (
    <div className="flex flex-col p-4 items-center h-screen ">
      <h5 className="text-4xl mb-12">Calculadora de distancias</h5>
      <div className="flex justify-between w-1/2 gap-2">
        <button
          onClick={handleLocationClick}
          className="p-2 mb-4 bg-sky-500 text-white rounded-lg hover:bg-sky-400 transition ease-in-out"
        >
          Usar mi ubicación
        </button>
        <button
          onClick={handleClearMap}
          className="p-2 mb-4 bg-amber-400 text-white rounded-lg hover:bg-amber-300 transition ease-in-out"
        >
          Limpiar mapa
        </button>
      </div>
      <div className="w-1/2">
        <MapComponent
          userLocation={userLocation}
          clearMap={clearMap}
          setClearMap={setClearMap}
          setDisabledButton={setDisabledButton}
          markerPositions={setMarkerPositions}
        />
      </div>
      <button
        disabled={disabledButton}
        onClick={handleCalculateDistance}
        className="p-2 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-400 transition ease-in-out w-1/2 disabled:bg-green-200"
      >
        Calcular distancia
      </button>
      <div className="bg-gradient-to-r from-blue-200 to-cyan-200 w-1/2 h-48 mt-8 p-2 grid grid-cols-2 rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-gray-600 text-2xl">
            La distancia entre ambos puntos es
          </h2>
          <h3 className="text-gray-700 text-xl font-semibold">
            {markersDistance} mts
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex gap-2 items-center">
            <h2 className="text-gray-600 text-2xl">
              <FaPersonWalking />
            </h2>
            <h3 className="text-gray-700 text-xl font-semibold">
              {walkingTime} min
            </h3>
          </div>
          <div className="flex gap-2 items-center">
            <h2 className="text-gray-600 text-2xl">
              <FaCar />
            </h2>
            <h3 className="text-gray-700 text-xl font-semibold">
              {drivingTime} min
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
