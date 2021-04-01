import axios from "axios";
import {
  DISLIKE_LOCATION,
  IS_LOCATION_LIKED,
  MARK_LOCATION_AS_LIKED,
} from "../../apiLinks";

export async function markLocationAsLiked(locationId) {
  if (typeof locationId === "string" && locationId.length > 0) {
    try {
      const response = await axios({
        method: "GET",
        url: MARK_LOCATION_AS_LIKED(locationId),
      });

      // If location successfully liked return true
      return response.status === 200;
    } catch (err) {
      console.log("Error when marking location as liked: ", err);
      return false;
    }
  }
}

export async function dislikeLocation(locationId) {
  if (typeof locationId === "string" && locationId.length > 0) {
    try {
      const response = await axios({
        method: "GET",
        url: DISLIKE_LOCATION(locationId),
      });

      // If location successfully disliked return true
      return response.status === 200;
    } catch (err) {
      console.log("Error when disliking location: ", err);
      return false;
    }
  }
}

export async function checkIfLocationIsLiked(locationId) {
  if (typeof locationId === "string" && locationId.length > 0) {
    try {
      const response = await axios({
        method: "GET",
        url: IS_LOCATION_LIKED(locationId),
      });

      return response.data;
    } catch (err) {
      console.log("Error when checking if location is liked: ", err);
      return false;
    }
  }
}
