import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { WeatherJSON } from "src/types/weather"
import { RootState, store } from "./store"

// 型定義
type Weather = {
  weatherData: WeatherJSON | null
  weeklyWeatherData: any
  coordinate: {
    lat: number | null
    lng: number | null
  }
  isEnableGeo: boolean | null
}

// 初期値
const initialState: Weather = {
  weatherData: null,
  weeklyWeatherData: null,
  coordinate: {
    lat: null,
    lng: null,
  },
  isEnableGeo: null,
}

// 位置情報に合わせて天気情報を取得
export const fetchWeather = createAsyncThunk("weather/fetch", async () => {
  console.log("fetchWeather Start")
  const coordinate = store.getState().weather.coordinate
  const URL = `${process.env.NEXT_PUBLIC_OW_API_URL}/weather?lat=${coordinate.lat}&lon=${coordinate.lng}&appid=${process.env.NEXT_PUBLIC_OW_API_KEY}&units=metric`
  const res = await axios.get(URL)
  console.log("res.data", res.data)

  return res.data
})

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    // 天気予報
    setWeatherData: (state, action) => {
      state.weatherData = action.payload
    },
    // 週間天気予報
    setWeeklyWeatherData: (state, action) => {
      state.weeklyWeatherData = action.payload
    },
    // 位置情報
    setCoordinate: (state, action) => {
      state.coordinate = action.payload
    },
    // 位置情報がセットされているかどうか
    setIsEnableGeo: (state, action) => {
      state.isEnableGeo = action.payload
    },
  },
  // 非同期に天気予報を取得
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.weatherData = action.payload
    }),
      builder.addCase(fetchWeather.fulfilled, (state, action) => {
        console.log("error")
      })
  },
})

export const { setWeatherData, setWeeklyWeatherData, setCoordinate, setIsEnableGeo } = weatherSlice.actions

export const selectWeatherData = (state: RootState): Weather["weatherData"] => state.weather.weatherData
export const selectWeeklyWeatherData = (state: RootState): Weather["weeklyWeatherData"] =>
  state.weather.weeklyWeatherData
export const selectCoordinate = (state: RootState): Weather["coordinate"] => state.weather.coordinate
export const selectIsEnableGeo = (state: RootState): Weather["isEnableGeo"] => state.weather.isEnableGeo

export default weatherSlice.reducer
