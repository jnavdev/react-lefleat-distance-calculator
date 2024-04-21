import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import ChangeView from "./map/ChangeView";
import AddMarkersOnClick from "./map/AddMarkersOnClick";

const MapComponent = ({ userLocation, clearMap, setClearMap }) => {
  const [location, setLocation] = useState([
    -41.316834584357984, -72.98294934863232,
  ]);
  const [markers, setMarkers] = useState([]);

  function handleMarkerAdd(position) {
    const newMarker = {
      position,
    };

    if (markers.length < 2) {
      setMarkers([...markers, newMarker]);
    }
  }

  function handleDeleteMarker(index) {
    setMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers.splice(index, 1);
      return newMarkers;
    });
  }

  function handleLocation() {
    if (userLocation.length > 0) {
      setLocation(userLocation);
    }
  }

  useEffect(() => {
    handleLocation();
  }, [userLocation]);

  useEffect(() => {
    if (clearMap) {
      setMarkers([]);
      setClearMap(false);
    }
  }, [clearMap, setClearMap]);

  return (
    <div className="w-full bg-sky-500 p-1 rounded-lg">
      <MapContainer
        center={location}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ChangeView center={location} zoom={16} />
        <AddMarkersOnClick onMarkerAdd={handleMarkerAdd} />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            eventHandlers={{ click: () => handleDeleteMarker(index) }}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
