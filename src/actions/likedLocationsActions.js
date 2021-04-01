import axios from "axios";
import { LIKED_LOCATIONS_URL } from "../../apiLinks";
import {
  setAllLocations,
  setIsFetchingData,
} from "../reducers/likedLocationsReducer";

export function getLikedLocations() {
  return async (dispatch) => {
    dispatch(setIsFetchingData(true));

    try {
      const response = await axios({
        method: "GET",
        url: LIKED_LOCATIONS_URL,
      });

      dispatch(setAllLocations(response.data));
    } catch (err) {
      console.log("Error when fetching liked locations: ", err);
      if (err.response) console.log(err.response);
    } finally {
      dispatch(setIsFetchingData(false));
    }
  };
}
