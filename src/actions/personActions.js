import axios from "axios";
import {
  startFetchingLoginData,
  stopFetchingLoginData,
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
        url: "http://192.168.1.106:8080/api/login",
        method: "POST",
        data: loginData,
      });
      const { token } = response.data;
      console.log(token);
    } catch (err) {
      console.log("error", err);
    }

    dispatch(stopFetchingLoginData());
  };
}
