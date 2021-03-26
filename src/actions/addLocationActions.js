import axios from "axios";
import { LOCATION_URL } from "../../apiLinks";
import { getFileNameFromPath } from "../helpers/getFileNameFromPath";
import {
  setIsUploadingLocation,
  wipeState,
} from "../reducers/addLocationReducer";

export function handleAddLocation(coordinates) {
  return async (dispatch, getState) => {
    const {
      title,
      selectedLatitude,
      selectedLongitude,
      media,
    } = getState().addLocation;
    dispatch(setIsUploadingLocation(true));

    const token = getState().person.token;

    const data = new FormData();
    data.append("title", title);

    // If we got some coordinated provided, use them instead of the selected ones
    if (
      coordinates &&
      typeof coordinates.latitude === "number" &&
      typeof coordinates.longitude === "number"
    ) {
      data.append("latitude", coordinates.latitude);
      data.append("longitude", coordinates.longitude);
    } else {
      if (
        typeof selectedLongitude === "number" &&
        typeof selectedLongitude === "number"
      ) {
        data.append("latitude", selectedLatitude);
        data.append("longitude", selectedLongitude);
      } else {
        alert("Please select a location.");
        dispatch(setIsUploadingLocation(false));
        return;
      }
    }

    for (let i = 0; i < media.length; i++) {
      data.append("media", {
        name: getFileNameFromPath(media[i].uri),
        type: "image/jpeg",
        uri:
          Platform.OS === "android"
            ? media[i].uri
            : media[i].uri.replace("file://", ""),
      });
    }

    try {
      const response = await axios({
        url: LOCATION_URL,
        method: "POST",
        data,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === "200") {
        alert("Location successfully added.");
        dispatch(wipeState());
      }
    } catch (err) {
      console.log("Error when creating location: ", err);
      alert("Can't add location, please try again.");
    } finally {
      dispatch(setIsUploadingLocation(false));
    }
  };
}
