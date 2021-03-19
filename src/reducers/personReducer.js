import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  token: "",
  isLoggedIn: false,

  isFetchingLoginData: false,
  onLoginSuccess: function () {},
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    setInitialState(state) {
      state = initialState;
    },
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
    setToken(state, action) {
      state.token = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setOnLoginSuccess(state, action) {
      state.onLoginSuccess = action.payload;
    },
  },
});

export const {
  setLoggedInStatus,
  startFetchingLoginData,
  stopFetchingLoginData,
  setToken,
  setInitialState,
  setUsername,
  setOnLoginSuccess,
} = personSlice.actions;

export default personSlice.reducer;
