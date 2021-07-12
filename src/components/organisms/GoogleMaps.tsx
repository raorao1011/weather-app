import { VFC } from "react";
import { LoadScript, GoogleMap, useLoadScript } from "@react-google-maps/api";
import { InitPosition } from "src/hooks/useGeolocation";

const mapContainerStyle = {
  width: "100vh",
  height: "100vh",
};

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "";

export const GoogleMaps: VFC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
  });

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap id="map" mapContainerStyle={mapContainerStyle} zoom={11} center={InitPosition} />
    </LoadScript>
  );
};
