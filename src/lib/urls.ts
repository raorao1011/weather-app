// 東京の天気を取得URL
export const TOKYO_WEATHER_URL = `${process.env.NEXT_PUBLIC_OW_API_URL}/weather/?q=Tokyo&APPID=${process.env.NEXT_PUBLIC_OW_API_KEY}&units=metric`

// Geocoding URL
export const GEOCODING_URL = "https://maps.google.com/maps/api/geocode/json?address="