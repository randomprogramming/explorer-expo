// import { SET_LOGGED_IN } from "../actions/personActions";

// const initialState = {
//   username: "",
//   token: "",
//   isLoggedIn: false,
// };

// export default (state = initialState, { type, payload }) => {
//   switch (type) {
//     case SET_LOGGED_IN:
//       return {
//         ...state,
//         isLoggedIn: payload,
//       };
//     default:
//       return state;
//   }
// };

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  token: "",
  isLoggedIn: false,

  isFetchingLoginData: false,
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    setLoggedInStatus(state, action) {
      const newState = action.payload;

      if (typeof newState !== "boolean") {
        state.isLoggedIn = false;
      } else {
        state.isLoggedIn = newState;
      }
    },
    startFetchingLoginData(state) {
      state.isFetchingLoginData = true;
    },
    stopFetchingLoginData(state) {
      state.isFetchingLoginData = false;
    },
  },
});

export const {
  setLoggedInStatus,
  startFetchingLoginData,
  stopFetchingLoginData,
} = personSlice.actions;

export default personSlice.reducer;
