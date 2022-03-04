import { FaMapMarkerAlt } from "react-icons/fa";

function LocationMarker({ lat, lng, onClick }) {
  return (
    <div className='location-marker' onClick={onClick}>
      <FaMapMarkerAlt className='location-icon cursor-pointer' />
    </div>
  );
}

export default LocationMarker;
