import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  flag: boolean;
};

const initialState: InitialStateType = {
  flag: false,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    changeFlag: (state, action) => {
      state.flag = action.payload
    }
  },
});

export default weatherSlice.reducer;
