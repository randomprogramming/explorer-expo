export const SET_LOGGED_IN = "SET_LOGGED_IN";

export function setLoggedInStatus(newStatus) {
  if (typeof newStatus !== "boolean") {
    return {
      type: SET_LOGGED_IN,
      payload: false,
    };
  }

  return {
    type: SET_LOGGED_IN,
    payload: newStatus,
  };
}
