import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import geolocationReducer from "./geolocationSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    geolocation: geolocationReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
