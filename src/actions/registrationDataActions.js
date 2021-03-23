import axios from "axios";
import {
  setIsCreatingAccount,
  setRequestStatus,
} from "../reducers/registrationDataReducer";
import { REGISTER_URL } from "../../apiLinks";

export function handleRegister() {
  return async (dispatch, getState) => {
    dispatch(setIsCreatingAccount(true));

    try {
      const response = await axios({
        url: REGISTER_URL,
        method: "POST",
        data: getState().registrationData,
      });

      dispatch(
        setRequestStatus({
          statusCode: response.status,
          statusText: response.data,
        })
      );
    } catch (err) {
      console.log("Error when creating account:", err.response);
      dispatch(
        setRequestStatus({
          statusCode: err.response.status,
          statusText: err.response.data,
        })
      );
    } finally {
      dispatch(setIsCreatingAccount(false));
    }
  };
}
