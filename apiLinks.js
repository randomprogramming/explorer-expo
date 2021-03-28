const SERVER_URL = "http://192.168.1.106:8080";

export const LOGIN_URL = SERVER_URL + "/api/login";
export const REGISTER_URL = SERVER_URL + "/api/register";
export const ME_URL = SERVER_URL + "/api/person/me";

export const LOCATION_URL = SERVER_URL + "/api/location";
export const MARK_LOCATION_AS_LIKED = (locationId) => {
  if (typeof locationId === "string" && locationId.length > 0) {
    return LOCATION_URL + `/like/${locationId}`;
  } else {
    return "Error.";
  }
};
export const LIKED_LOCATIONS_URL = LOCATION_URL + "/liked";
export const SEARCH_REGION_FOR_LOCATIONS_URL = LOCATION_URL + "/region";
