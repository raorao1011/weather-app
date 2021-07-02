import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

type WeatherStateType = {
  flag: boolean;
  weatherData: any;
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

// store.tsのweatherReducerになる
export default weatherSlice.reducer;

