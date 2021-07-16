import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type GeolocationData = {
  coordinate: {
    lat: number;
    lng: number;
  };
};

const initialState: GeolocationData = {
  coordinate: {
    lat: 35.6809591,
    lng: 139.7673068,
  },
};

export const geolocationSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {
    setCoordinate: (state, action) => {
      state.coordinate = action.payload;
    },
  },
});

export const { setCoordinate } = geolocationSlice.actions;

export const selectCoordinate = (state: RootState): GeolocationData["coordinate"] => state.geolocation.coordinate;

export default geolocationSlice.reducer;
