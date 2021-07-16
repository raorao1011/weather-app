import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type GeolocationData = {
  coordinate: {
    lat: number;
    lng: number;
  };
  hasCoordinate: boolean;
};

const initialState: GeolocationData = {
  // 初期値；東京駅
  coordinate: {
    lat: 35.6809591,
    lng: 139.7673068,
  },
  hasCoordinate: false,
};

export const geolocationSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {
    setCoordinate: (state, action) => {
      state.coordinate = action.payload;
    },
    hasCoordinate: (state, action) => {
      state.hasCoordinate = action.payload;
    },
  },
});

export const { setCoordinate, hasCoordinate } = geolocationSlice.actions;

export const selectCoordinate = (state: RootState): GeolocationData["coordinate"] => state.geolocation.coordinate;
export const selectHasCoordinate = (state: RootState): GeolocationData["hasCoordinate"] =>
  state.geolocation.hasCoordinate;

export default geolocationSlice.reducer;
