import { useMapEvents } from "react-leaflet";

function AddMarkersOnClick({ onMarkerAdd }) {
  useMapEvents({
    click(event) {
      onMarkerAdd(event.latlng);
    },
  });

  return null;
}

export default AddMarkersOnClick;
