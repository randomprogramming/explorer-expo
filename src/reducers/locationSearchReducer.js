import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: [],
};

const locationSearchSlice = createSlice({
  name: "locationSearch",
  initialState,
  reducers: {
    setLocations: (state, action) => {
      return { ...state, locations: action.payload };
    },
    clearLocations: (state) => {
      return { ...state, locations: [] };
    },
  },
});

export const { setLocations, clearLocations } = locationSearchSlice.actions;

export default locationSearchSlice.reducer;
