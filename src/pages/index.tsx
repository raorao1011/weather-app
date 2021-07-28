import { useEffect } from "react";
import { useWeatherApi } from "../hooks/useWeatherApi";
import { useGeolocation } from "../hooks/useGeolocationApi";
import { GoogleMaps } from "src/components/organisms/GoogleMaps";
import { useSelector } from "react-redux";
import { selectCoordinate, selectIsEnableGeo, selectWeatherData } from "src/store/weatherSlice";
import { useGeocoding } from "../hooks/useGeocoding";

export default function Home() {
  const { fetchWeatherData } = useWeatherApi();
  const { fetchGeolocationData } = useGeolocation();
  const weather = useSelector(selectWeatherData);
  const coodinate = useSelector(selectCoordinate);
  const isEnableGeo = useSelector(selectIsEnableGeo);

  // 初期ロードで位置情報を取得
  useEffect(() => {
    fetchGeolocationData();
    // getCoords("東京");
  }, []);

  // 現在地の天気を取得
  useEffect(() => {
    if (!isEnableGeo) return;

    fetchWeatherData();
  }, [isEnableGeo]);

  // 取得した天気情報を表示する
  useEffect(() => {
    // 天気情報があれば実行
    if (weather) {
      console.log("weather", weather);
    }
  }, [weather]);

  return (
    <div className="w-screen h-screen">
      <div className="w-80%">
        <div>
          <input type="text" />
          <PrimaryButton>検索</PrimaryButton>
        </div>
        <div className="w-200px h-100px">
          <GoogleMaps />
        </div>
      </div>
    </div>
  );
}
