import axios from "axios";
import { SEARCH_REGION_FOR_LOCATIONS_URL } from "../../apiLinks";
import { setLocations } from "../reducers/mapReducer";

export function getLocationsForRegion(region) {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "POST",
        url: SEARCH_REGION_FOR_LOCATIONS_URL,
        data: {
          // We have to modify the deltas because we otherwise have loads of
          // off-screen locations
          latitude: region.latitude,
          latitudeDelta: region.latitudeDelta * 0.55,
          longitude: region.longitude,
          longitudeDelta: region.longitudeDelta * 0.55,
        },
      });

      dispatch(setLocations(response.data.content));
    } catch (err) {
      console.log("Error when fetching locations for region: ", err);
    }
  };
}
