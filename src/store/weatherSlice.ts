import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { WeatherJSON } from "src/types/weather";
import { selectCoordinate } from "./geolocationSlice";
import { RootState } from "./store";

// 型定義
type WeatherStateType = {
  weatherData: WeatherJSON | null;
  weeklyWeatherData: any;
};

// 初期値
const initialState: WeatherStateType = {
  weatherData: null,
  weeklyWeatherData: null,
};

// 位置情報に合わせて天気情報を取得
export const fetchWeather = createAsyncThunk("weather/fetch", async () => {
  console.log("fetchWeather Start");
  const coordinate = useSelector(selectCoordinate);
  const URL = `${process.env.NEXT_PUBLIC_OW_API_URL}/weather?lat=${coordinate.lat}&lon=${coordinate.lng}&appid=${process.env.NEXT_PUBLIC_OW_API_KEY}&units=metric`;
  const res = await axios.get(URL);
  console.log("res.data", res.data);

  return res.data;
});

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    // 天気予報
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    // 週間天気予報
    setWeeklyWeatherData: (state, action) => {
      state.weeklyWeatherData = action.payload;
    },
  },
  // 非同期に天気予報を取得
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.weatherData = action.payload;
    });
  },
});

export const { setWeatherData, setWeeklyWeatherData } = weatherSlice.actions;

export const selectWeatherData = (state: RootState): WeatherStateType["weatherData"] => state.weather.weatherData;
export const selectWeeklyWeatherData = (state: RootState): WeatherStateType["weeklyWeatherData"] =>
  state.weather.weeklyWeatherData;

export default weatherSlice.reducer;
