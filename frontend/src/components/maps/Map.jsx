import GoogleMapReact from "google-map-react";
import { useEffect } from "react";
import LocationMarker from "./LocationMarker";

function Map({ center, zoom }) {
  return (
    <div className='w-full h-full'>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_API,
          language: "es",
        }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <LocationMarker lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    </div>
  );
}

Map.defaultProps = {
  center: {
    lat: 10.354780077752705,
    lng: -84.57022487006816,
  },
  zoom: 14,
};

export default Map;
