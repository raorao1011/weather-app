import axios from "axios";
import { RootState, store } from "./store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WeatherJSON } from "src/lib/models/weather";
import { ONEALLAPI_URL, TOKYO_WEATHER_URL } from "src/lib/urls";

type Weather = {
  weatherData: WeatherJSON | undefined;
  weeklyWeatherData: any;
  coordinate: {
    lat: number | undefined;
    lng: number | undefined;
  };
  isEnableGeo: boolean;
};

const initialState: Weather = {
  weatherData: undefined,
  weeklyWeatherData: undefined,
  coordinate: {
    lat: undefined,
    lng: undefined,
  },
  isEnableGeo: false,
};

// 位置情報に合わせて天気情報を取得
export const fetchWeather = createAsyncThunk("weather/fetch", async () => {
  const coordinate = store.getState().weather.coordinate;
  const URL = `${process.env.NEXT_PUBLIC_OW_API_URL}/weather?lat=${coordinate.lat}&lon=${coordinate.lng}&appid=${process.env.NEXT_PUBLIC_OW_API_KEY}&units=metric`;

  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

// 位置情報に合わせて週間天気を取得
export const getWeeklyWeather = createAsyncThunk("weather/weekly", async () => {
  const coordinate = store.getState().weather.coordinate;
  const URL = `${ONEALLAPI_URL}?lat=${coordinate.lat}&lon=${coordinate.lng}&exclude=daily,hourly&appid=${process.env.NEXT_PUBLIC_OW_API_KEY}&units=metric`;

  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

// 東京の天気情報を取得
export const fetchTokyoWeather = createAsyncThunk("weather/fetchTokyo", async () => {
  try {
    const res = await axios.get(TOKYO_WEATHER_URL);
    return res.data;
  } catch (err) {
    console.warn(err.message);
  }
});

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    // 天気情報
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    // 週間天気情報
    setWeeklyWeatherData: (state, action) => {
      state.weeklyWeatherData = action.payload;
    },
    // 位置情報
    setCoordinate: (state, action) => {
      state.coordinate = action.payload;
    },
    setIsEnableGeo: (state, action) => {
      state.isEnableGeo = action.payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * 現在地の天気を取得
     */
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.weatherData = action.payload;
    });
    builder.addCase(fetchWeather.rejected, (e) => {
      console.log("fetchWeather Rejected", e);
    });
    builder.addCase(getWeeklyWeather.fulfilled, (state, action) => {
      state.weeklyWeatherData = action.payload;
    });
  },
});

export const { setWeatherData, setWeeklyWeatherData, setCoordinate, setIsEnableGeo } = weatherSlice.actions;

export const selectWeatherData = (state: RootState): Weather["weatherData"] => state.weather.weatherData;
export const selectWeeklyWeatherData = (state: RootState): Weather["weeklyWeatherData"] =>
  state.weather.weeklyWeatherData;
export const selectCoordinate = (state: RootState): Weather["coordinate"] => state.weather.coordinate;
export const selectIsEnableGeo = (state: RootState): Weather["isEnableGeo"] => state.weather.isEnableGeo;

export default weatherSlice.reducer;
