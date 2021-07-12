import { useCallback, useState } from "react";
import { Position } from "../types/geolocation";

export const InitPosition = { lat: 35.6809591, lng: 139.7673068 };

export const useGeolocation = () => {
  console.log("useGeolocation start");
  
  const [position, setPosition] = useState<Position>(InitPosition);

  // ユーザの位置情報を取得します。
  const fetchGeolocationData = useCallback(() => {
    navigator.geolocation.getCurrentPosition((p) => {
      const lat: number = p.coords.latitude;
      const lng: number = p.coords.longitude;
      setPosition({ lat, lng });
    });
    console.log("position", position);
  }, []);

  return { fetchGeolocationData };
};
