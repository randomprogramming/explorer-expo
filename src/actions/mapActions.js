import axios from "axios";
import { SEARCH_REGION_FOR_LOCATIONS_URL } from "../../apiLinks";
import { setLocations } from "../reducers/mapReducer";

export function getLocationsForRegion(region) {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "POST",
        url: SEARCH_REGION_FOR_LOCATIONS_URL,
        data: region,
      });

      dispatch(setLocations(response.data.content));
    } catch (err) {
      console.log("Error when fetching locations for region: ", err);
    }
  };
}
