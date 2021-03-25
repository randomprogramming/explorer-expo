import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  password: "",
  repeatedPassword: "",

  isCreatingAccount: false,
  statusCode: 0,
  statusText: "",
};

const registrationDataSlice = createSlice({
  name: "registrationData",
  initialState,
  reducers: {
    wipeState: () => initialState,
    setUsername: (state, action) => {
      if (typeof action.payload === "string") {
        state.username = action.payload;
      }
    },
    setEmail: (state, action) => {
      if (typeof action.payload === "string") {
        state.email = action.payload;
      }
    },
    setPassword: (state, action) => {
      if (typeof action.payload === "string") {
        state.password = action.payload;
      }
    },
    setRepeatedPassword: (state, action) => {
      if (typeof action.payload === "string") {
        state.repeatedPassword = action.payload;
      }
    },
    setIsCreatingAccount: (state, action) => {
      if (typeof action.payload === "boolean") {
        state.isCreatingAccount = action.payload;
      }
    },
    setRequestStatus: (state, action) => {
      state.statusCode = action.payload.statusCode;
      state.statusText = action.payload.statusText;
    },
  },
});

export const {
  setUsername,
  setEmail,
  setPassword,
  setRepeatedPassword,
  wipeState,
  setIsCreatingAccount,
  setRequestStatus,
} = registrationDataSlice.actions;

export default registrationDataSlice.reducer;
