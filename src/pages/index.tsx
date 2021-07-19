import { useEffect } from "react";
import { useWeatherApi } from "../hooks/useWeatherApi";
import { useGeolocation } from "../hooks/useGeolocationApi";
import { GoogleMaps } from "src/components/organisms/GoogleMaps";
import { useDispatch, useSelector } from "react-redux";
import { selectWeatherData } from "src/store/weatherSlice";
import { selectCoordinate, selectIsEnableGeo, setCoordinate } from "src/store/geolocationSlice";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "";

export default function Home() {
  const { getTokyoWeatherData, fetchWeatherData } = useWeatherApi();
  const { fetchGeolocationData } = useGeolocation();
  const dispatch = useDispatch();
  const weatherInfo = useSelector(selectWeatherData);
  const isEnableGeo = useSelector(selectIsEnableGeo);

  // 01:初期ロードで位置情報を取得
  useEffect(() => {
    console.log("1");
    fetchGeolocationData();
  }, []);

  // 02: 位置情報が取得できなかった場合、東京の天気を取得, else 現在地の天気を取得
  useEffect(() => {
    if (isEnableGeo === false) {
      console.log("3");
      getTokyoWeatherData();
    } else  {
      console.log("3");
      fetchWeatherData();
    }
  }, [isEnableGeo]);

  // 03: 取得した天気情報を表示する
  useEffect(() => {
    // 天気情報があれば実行
    console.log(weatherInfo);

    if (weatherInfo) {
      console.log("4");
      console.log("weatherInfo", weatherInfo);
    }
  }, [weatherInfo]);

  return (
    <div className="w-screen h-screen">
      <GoogleMaps />
    </div>
  );
}
