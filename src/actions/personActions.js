import axios from "axios";
import { LOGIN_URL, ME_URL } from "../../apiLinks";
import {
  startFetchingLoginData,
  stopFetchingLoginData,
  setToken,
  setInitialState,
  setUsername,
} from "../reducers/personReducer";

export const SET_LOGGED_IN = "SET_LOGGED_IN";

export function handleLogin(loginData) {
  return async (dispatch) => {
    // If the login data is not defined, don't make a request
    if (!loginData || !loginData.username || !loginData.password) {
      return;
    }
    dispatch(startFetchingLoginData());

    try {
      const response = await axios({
        url: LOGIN_URL,
        method: "POST",
        data: loginData,
      });

      const { token } = response.data;
      dispatch(fetchUsernameFromToken(token));
      dispatch(setToken(token));
    } catch (err) {
      console.log("Error when fetching token:", err);
    }

    dispatch(stopFetchingLoginData());
  };
}

export function fetchUsernameFromToken(token) {
  return async (dispatch, getState) => {
    // If we want to fetch username right after logging in,
    // The token might not be saved in the redux state yet, so we have to pass the token
    // As an argument manually
    if (!token || token.length === 0) {
      token = getState().person.token;
    }

    try {
      const response = await axios({
        url: ME_URL,
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const { username } = response.data;
      dispatch(setUsername(username));
    } catch (err) {
      // If we get an error here, it means that the token is not valid
      dispatch(setInitialState());
      console.log("Error when fetching username.");
    }
  };
}
