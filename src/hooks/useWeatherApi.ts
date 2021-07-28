import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchWeather, setWeatherData } from "src/store/weatherSlice";

// WeatherAPIを用いて天気情報を取得
export const useWeatherApi = () => {
  const dispatch = useDispatch();

  // 位置情報が使用できない際に東京の天気情報を取得
  const getTokyoWeatherData = useCallback(async () => {
    const URL = `${process.env.NEXT_PUBLIC_OW_API_URL}/weather/?q=Tokyo&APPID=${process.env.NEXT_PUBLIC_OW_API_KEY}&units=metric`;

    try {
      const res = await axios.get(URL);
      dispatch(setWeatherData(res.data));
    } catch (err) {
      console.warn(err.message);
    }
  }, []);

  // 位置情報を利用して天気情報を取得
  const fetchWeatherData = useCallback(() => {    
    dispatch(fetchWeather());
  }, []);

  return { getTokyoWeatherData, fetchWeatherData };
};
