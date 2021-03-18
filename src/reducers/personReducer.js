import { SET_LOGGED_IN } from "../actions/personActions";

const initialState = {
  username: "",
  token: "",
  isLoggedIn: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: payload,
      };
    default:
      return state;
  }
};
