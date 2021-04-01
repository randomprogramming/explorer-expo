import axios from "axios";
import { LOGIN_URL, ME_URL } from "../../apiLinks";
import {
  startFetchingLoginData,
  stopFetchingLoginData,
  setToken,
  setInitialState,
  setUser,
  setLoggedInStatus,
} from "../reducers/personReducer";
import * as SecureStore from "expo-secure-store";

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
      dispatch(fetchUserFromToken(token, true));
    } catch (err) {
      console.log("Error when fetching token:", err);
    }

    dispatch(stopFetchingLoginData());
  };
}

export function fetchUserFromToken(token, useOnLoginSuccessCallback) {
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

      // if the token is valid, this request will not fail
      // we want to store the token in SecureStore and the redux store
      // and we want to set the login status to true
      SecureStore.setItemAsync("token", token);
      dispatch(setToken(token));
      dispatch(setLoggedInStatus(true));

      // set the default auth token so that we don't have to do it manually on every request
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      const { onLoginSuccess } = getState().person;
      if (useOnLoginSuccessCallback && onLoginSuccess) {
        onLoginSuccess();
      }

      dispatch(setUser(response.data));
    } catch (err) {
      // If we get an error here, it means that the token is not valid
      dispatch(setInitialState());
      console.log("Error when fetching username.");
    }
  };
}

export function checkSecureStorageForToken() {
  return async (dispatch) => {
    try {
      const token = await SecureStore.getItemAsync("token");

      if (token && token.length > 0) {
        // this action will check if the token is valid and set all the necessary data
        dispatch(fetchUserFromToken(token, false));
      } else {
        SecureStore.deleteItemAsync("token");
      }
    } catch (err) {
      SecureStore.deleteItemAsync("token");
      console.log("Error when checking for the token: ", err);
    }
  };
}
