import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCoordinate, setIsEnableGeo } from "src/store/weatherSlice";
import { Position } from "../lib/models/geolocation";
import { useWeatherApi } from "./useWeatherApi";

export const useGeolocation = () => {
  const dispatch = useDispatch();
  const { getTokyoWeatherData } = useWeatherApi();

  const successFunc = (p: any) => {    
    const coordinate: Position = { lat: p.coords.latitude, lng: p.coords.longitude };

    if (coordinate) {
      dispatch(setCoordinate(coordinate));
      dispatch(setIsEnableGeo(true));
    } else {
      console.log("coordsが入ってないゾ");
    }
  };

  const errorFunc = () => {
    console.log("位置情報の取得に失敗しました。");
  };

  // ユーザの位置情報を取得
  const fetchGeolocationData = useCallback(() => {    
    if (!navigator.geolocation) {
      toast.error("位置情報を利用することができません 東京の天気を表示します。");
      dispatch(getTokyoWeatherData());
      return;
    }

    navigator.geolocation.getCurrentPosition(successFunc, errorFunc);
  }, []);

  return { fetchGeolocationData };
};
