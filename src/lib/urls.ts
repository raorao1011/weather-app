// 東京の天気を取得URL
export const TOKYO_WEATHER_URL = `${process.env.NEXT_PUBLIC_OW_API_URL}/weather/?q=Tokyo&APPID=${process.env.NEXT_PUBLIC_OW_API_KEY}&units=metric`;

// Geocoding URL
export const GEOCODING_URL = "https://maps.google.com/maps/api/geocode/json?address=";

// ONECALL API
export const ONEALLAPI_URL = "https://api.openweathermap.org/data/2.5/onecall";

// OPEN WEATHER ICON URL 語尾に`${iconID}@2x.png`を付与
export const OPEN_WEATHER_ICON_URL = "http://openweathermap.org/img/wn";