import axios from "axios";
import { LOCATION_URL } from "../../apiLinks";
import { setLocations } from "../reducers/locationSearchReducer";

export function fetchLocationsWithQuery(searchQuery) {
  return async (dispatch) => {
    if (typeof searchQuery === "string" && searchQuery.length >= 3) {
      try {
        const response = await axios({
          method: "GET",
          url: LOCATION_URL,
          params: {
            searchQuery,
          },
        });

        dispatch(setLocations(response.data.content));
      } catch (err) {
        console.log("Error when searching for locations: ", err);
      }
    } else {
      console.log("Can't parse locations with query: ", searchQuery);
      return;
    }
  };
}
