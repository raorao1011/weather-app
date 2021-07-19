import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

type GeolocationData = {
  coordinate: {
    lat: number | null;
    lng: number | null;
  };
  isEnableGeo: boolean | null;
};

const initialState: GeolocationData = {
  coordinate: {
    lat: null,
    lng: null,
  },
  isEnableGeo: null,
};

export const geolocationSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {
    setCoordinate: (state, action) => {
      state.coordinate = action.payload;
    },
    setIsEnableGeo: (state, action) => {
      state.isEnableGeo = action.payload;
    },
  },
});

export const { setCoordinate, setIsEnableGeo } = geolocationSlice.actions;

export const selectCoordinate = (state: RootState): GeolocationData["coordinate"] => state.geolocation.coordinate;
export const selectIsEnableGeo = (state: RootState): GeolocationData["isEnableGeo"] => state.geolocation.isEnableGeo;

export default geolocationSlice.reducer;
