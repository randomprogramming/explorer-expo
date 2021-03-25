import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  email: "",
  profilePictureUrl: "",
  addedLocations: [],

  token: "",
  isLoggedIn: false,

  isFetchingLoginData: false,
  onLoginSuccess: function () {},
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    setInitialState: () => initialState,
    setLoggedInStatus: (state, action) => {
      const newState = action.payload;

      if (typeof newState !== "boolean") {
        state.isLoggedIn = false;
      } else {
        state.isLoggedIn = newState;
      }
    },
    startFetchingLoginData: (state) => {
      state.isFetchingLoginData = true;
    },
    stopFetchingLoginData: (state) => {
      state.isFetchingLoginData = false;
    },
    setToken: (state, action) => {
      if (typeof action.payload === "string") {
        state.token = action.payload;
      }
    },
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    setOnLoginSuccess: (state, action) => {
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
  setUser,
  setOnLoginSuccess,
} = personSlice.actions;

export default personSlice.reducer;
