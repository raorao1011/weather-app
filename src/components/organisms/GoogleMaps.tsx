import { VFC } from "react";
import { LoadScript, GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { setCoordinate } from "src/store/geolocationSlice";

// 初期値：東京駅
const InitPosition = { lat: 35.6809591, lng: 139.7673068 };

const mapContainerStyle = {
  width: "100vh",
  height: "100vh",
};

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "";

export const GoogleMaps: VFC = () => {
  const coordinate = useSelector(setCoordinate);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
  });

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={InitPosition}
      />
    </LoadScript>
  );
};
