import { useCallback } from "react";
import { useSelector } from "react-redux";
import { selectCoordinate, setCoordinate } from "src/store/geolocationSlice";
import { Position } from "../types/geolocation";

export const useGeolocation = () => {
  const position = useSelector(selectCoordinate);
  const isEnableGeo = useSelector

  // ユーザの位置情報を取得します。
  const fetchGeolocationData = useCallback(async () => {
    console.log("fetchGeolocationData start");
    if (!navigator.geolocation) {

    }
    await navigator.geolocation.getCurrentPosition((p) => {
      const coordinate: Position = {
        lat: p.coords.latitude,
        lng: p.coords.longitude,
      };
      setCoordinate(coordinate);
    });
  }, []);

  return { fetchGeolocationData };
};
