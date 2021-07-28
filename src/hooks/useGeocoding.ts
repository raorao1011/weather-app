import axios from "axios";

export const useGeocoding = () => {
  const getCoords = async (str: string) => {
    // const URL = `${GEOCODING_URL}${str}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
    const URL =
      "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDLmUBdMpH0x5SaQqwA0s8Q410OVLpILmg";

    const res = await axios.get(URL);

    if ((res.data.status = "OK")) {
      console.log(res.data);
    }
  };

  return { getCoords };
};
