import { createSlice } from "@reduxjs/toolkit";
import { WeatherJSON } from "src/types/weather";
import { RootState } from "./store";

type WeatherStateType = {
  weatherData: WeatherJSON | null;
  hasWeatherData: boolean;
};

const initialState: WeatherStateType = {
  weatherData: null,
  hasWeatherData: false,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    setHasWeatherData: (state, action) => {
      state.hasWeatherData = action.payload;
    },
  },
});

export const { setWeatherData, setHasWeatherData } = weatherSlice.actions;

export const selectWeatherData = (state: RootState): WeatherStateType["weatherData"] => state.weather.weatherData;
export const selectHasWeatherData = (state: RootState): WeatherStateType["hasWeatherData"] =>
  state.weather.hasWeatherData;

// store.tsのweatherReducerになる
export default weatherSlice.reducer;
