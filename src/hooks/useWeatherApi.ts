import axios from "axios";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCoordinate, setCoordinate } from "src/store/geolocationSlice";
import { changeFlag } from "../store/weatherSlice";

// WeatherApiを用いて天気情報を取得します。
export const useWeatherApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState([]);
  const dispatch = useDispatch();
  const coordinate = useSelector(selectCoordinate);

  // 位置情報が使用できない際に東京の天気を表示する
  const getTokyoWeatherData = useCallback(async () => {
    console.log("getTokyoWeatherData start");

    // 末尾に&units=metricをつけると摂氏表記になる
    const URL = `${process.env.NEXT_PUBLIC_OW_API_URL}/weather/?q=Tokyo&APPID=${process.env.NEXT_PUBLIC_OW_API_KEY}&units=metric`;
    dispatch(changeFlag(true));

    try {
      const res = await axios.get(URL);
      setWeatherData(res.data);
    } catch (err) {
      console.warn(err.message);
    } finally {
      setIsLoading(false);
      dispatch(changeFlag(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWeatherData = useCallback(async () => {
    console.log("fetchWeatherDataStart");

    const URL = `${process.env.NEXT_PUBLIC_OW_API_URL}/weather/?lat=${coordinate.lat}&lon=${coordinate.lng}appid=${process.env.NEXT_PUBLIC_OW_API_KEY}&units=metric`;

    try {
      const res = await axios.get(URL);
      setWeatherData(res.data)
    } catch (error) {
      console.warn(error.message)
    }
  }, []);;

  return { getTokyoWeatherData, fetchWeatherData, isLoading, weatherData };
};
