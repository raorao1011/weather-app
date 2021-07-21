import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCoordinate, setCoordinate, setIsEnableGeo } from "src/store/weatherSlice";
import { Position } from "../types/geolocation";

export const useGeolocation = () => {
  const dispatch = useDispatch();

  // ユーザの位置情報を取得
  const fetchGeolocationData = useCallback(async () => {
    console.log("fetchGeolocationData start");
    // 位置情報が使用できない場合
    if (!navigator.geolocation) {
      dispatch(setIsEnableGeo(false));
      return;
    }

    navigator.geolocation.getCurrentPosition((p) => {
      const coordinate: Position = {
        lat: p.coords.latitude,
        lng: p.coords.longitude,
      };
      console.log(coordinate);
      dispatch(setCoordinate(coordinate));
    });
  }, []);

  return { fetchGeolocationData };
};
