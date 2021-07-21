// OpenWeatherAPIで東京の天気を取得する時のURL
export const TOKYO_WEATHER_URL = `${process.env.NEXT_PUBLIC_OW_API_URL}/weather/?q=Tokyo&APPID=${process.env.NEXT_PUBLIC_OW_API_KEY}&units=metric`
