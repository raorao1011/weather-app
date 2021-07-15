import { useCallback, useState } from "react";
import { setCoordinate } from "src/store/geolocationSlice";
import { Position } from "../types/geolocation";

export const InitPosition = { lat: 35.6809591, lng: 139.7673068 };

export const useGeolocation = () => {
  console.log("useGeolocation start");
  
  const [position, setPosition] = useState<Position>(InitPosition);

  // ユーザの位置情報を取得します。
  const fetchGeolocationData = useCallback(() => {
    navigator.geolocation.getCurrentPosition((p) => {
      const coordinate = {
        lat: p.coords.latitude,
        lng: p.coords.longitude,
      }
      setPosition(coordinate);
      setCoordinate(coordinate)
    });
    console.log("position", position);
  }, []);

  return { fetchGeolocationData };
};
