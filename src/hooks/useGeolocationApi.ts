import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCoordinate, setCoordinate, setIsEnableGeo } from "src/store/geolocationSlice";
import { Position } from "../types/geolocation";

export const useGeolocation = () => {
  const [hasCoords, sethasCoords] = useState();
  const dispatch = useDispatch();
  const position = useSelector(selectCoordinate);

  // ユーザの位置情報を取得
  const fetchGeolocationData = useCallback(async () => {
    console.log("fetchGeolocationData start");
    // 位置情報が使用できない場合
    if (!navigator.geolocation) {
      dispatch(setIsEnableGeo(false));
      return;
    }

    new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((p) => {
        const coordinate: Position = {
          lat: p.coords.latitude,
          lng: p.coords.longitude,
        };
        resolve(dispatch(setCoordinate(coordinate)));
      });
    });
  }, []);

  return { fetchGeolocationData };
};
