import axios from "axios";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { changeFlag } from "../store/weatherSlice";

export const useWeatherApi = (): any => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState([]);
  const dispatch = useDispatch();

  // WeatherApiを用いて天気情報を取得します。
  const getWeatherData = useCallback(async () => {
    console.log("getWeatherData start");
    
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

  return { getWeatherData, isLoading, weatherData };
};
