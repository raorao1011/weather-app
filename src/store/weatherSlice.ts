import { createSlice } from "@reduxjs/toolkit";
import { WeatherJSON } from "src/types/weather";
import { RootState } from "./store";

type WeatherStateType = {
  flag: boolean;
  weatherData: WeatherJSON | null;
};

const initialState: WeatherStateType = {
  flag: false,
  weatherData: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    changeFlag: (state, action) => {
      state.flag = action.payload
    },
    setWeatherData: (state, action) => {
      state.weatherData = action.payload
    }
  },
});

export const { changeFlag, setWeatherData } = weatherSlice.actions;

export const selectWeatherData = (state: RootState): WeatherStateType["weatherData"] => state.weather.weatherData;
export const selectChangeFlag = (state: RootState): WeatherStateType["flag"] => state.weather.flag;

// store.tsのweatherReducerになる
export default weatherSlice.reducer;

